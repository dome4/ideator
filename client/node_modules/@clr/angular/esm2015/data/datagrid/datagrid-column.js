import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, EventEmitter, Input, Output, ViewContainerRef, } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { DatagridPropertyComparator } from './built-in/comparators/datagrid-property-comparator';
import { DatagridPropertyStringFilter } from './built-in/filters/datagrid-property-string-filter';
import { DatagridPropertyNumericFilter } from './built-in/filters/datagrid-property-numeric-filter';
import { DatagridStringFilterImpl } from './built-in/filters/datagrid-string-filter-impl';
import { DatagridNumericFilterImpl } from './built-in/filters/datagrid-numeric-filter-impl';
import { ClrDatagridSortOrder } from './enums/sort-order.enum';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider } from './providers/filters';
import { Sort } from './providers/sort';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { WrappedColumn } from './wrapped-column';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
let ClrDatagridColumn = class ClrDatagridColumn extends DatagridFilterRegistrar {
    constructor(_sort, filters, vcr, commonStrings) {
        super(filters);
        this._sort = _sort;
        this.vcr = vcr;
        this.commonStrings = commonStrings;
        /*
          * What type is this column?  This defaults to STRING, but can also be
          * set to NUMBER.  Unsupported types default to STRING. Users can set it
          * via the [clrDgColType] input by setting it to 'string' or 'number'.
          */
        // TODO: We might want to make this an enum in the future
        this.colType = 'string';
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        this.customFilter = false;
        this.filterValueChange = new EventEmitter();
        this._sortSubscription = _sort.change.subscribe(sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
                this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                this.sortOrderChange.emit(this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
    }
    ngOnDestroy() {
        this._sortSubscription.unsubscribe();
    }
    get field() {
        return this._field;
    }
    set field(field) {
        if (typeof field === 'string') {
            this._field = field;
            if (!this.customFilter) {
                if (this.colType === 'number') {
                    this.setFilter(new DatagridNumericFilterImpl(new DatagridPropertyNumericFilter(field)));
                }
                else {
                    this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
                }
            }
            if (!this._sortBy) {
                this._sortBy = new DatagridPropertyComparator(field);
            }
        }
    }
    get sortBy() {
        return this._sortBy;
    }
    set sortBy(comparator) {
        if (typeof comparator === 'string') {
            this._sortBy = new DatagridPropertyComparator(comparator);
        }
        else {
            if (comparator) {
                this._sortBy = comparator;
            }
            else {
                if (this._field) {
                    this._sortBy = new DatagridPropertyComparator(this._field);
                }
                else {
                    delete this._sortBy;
                }
            }
        }
    }
    /**
     * Indicates if the column is sortable
     */
    get sortable() {
        return !!this._sortBy;
    }
    get sorted() {
        return this._sorted;
    }
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    set sorted(value) {
        if (!value && this.sorted) {
            this._sorted = false;
            this._sort.clear();
        }
        else if (value && !this.sorted) {
            this.sort();
        }
    }
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(value) {
        if (typeof value === 'undefined') {
            return;
        }
        // only if the incoming order is different from the current one
        if (this._sortOrder === value) {
            return;
        }
        switch (value) {
            // the Unsorted case happens when the current state is either Asc or Desc
            default:
            case ClrDatagridSortOrder.UNSORTED:
                this._sort.clear();
                break;
            case ClrDatagridSortOrder.ASC:
                this.sort(false);
                break;
            case ClrDatagridSortOrder.DESC:
                this.sort(true);
                break;
        }
    }
    get ariaSort() {
        switch (this._sortOrder) {
            default:
            case ClrDatagridSortOrder.UNSORTED:
                return 'none';
            case ClrDatagridSortOrder.ASC:
                return 'ascending';
            case ClrDatagridSortOrder.DESC:
                return 'descending';
        }
    }
    /**
     * Sorts the datagrid based on this column
     */
    sort(reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        // setting the private variable to not retrigger the setter logic
        this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        // Sets the correct icon for current sort order
        this.sortIcon = this._sortOrder === ClrDatagridSortOrder.DESC ? 'arrow down' : 'arrow';
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    set projectedFilter(custom) {
        if (custom) {
            this.deleteFilter();
            this.customFilter = true;
        }
    }
    get filterValue() {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            return this.filter.value;
        }
    }
    set updateFilterValue(newValue) {
        if (!this.filter) {
            return;
        }
        if (this.filter instanceof DatagridStringFilterImpl) {
            if (!newValue || typeof newValue !== 'string') {
                newValue = '';
            }
            if (newValue !== this.filter.value) {
                this.filter.value = newValue;
            }
        }
        else if (this.filter instanceof DatagridNumericFilterImpl) {
            if (!newValue || !(newValue instanceof Array)) {
                newValue = [null, null];
            }
            if (newValue.length === 2 && (newValue[0] !== this.filter.value[0] || newValue[1] !== this.filter.value[1])) {
                this.filter.value = newValue;
            }
        }
    }
    set filterValue(newValue) {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            this.updateFilterValue = newValue;
            this.filterValueChange.emit(this.filter.value);
        }
    }
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    }
    get _view() {
        return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
    }
};
tslib_1.__decorate([
    Input('clrDgField'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrDatagridColumn.prototype, "field", null);
tslib_1.__decorate([
    Input('clrDgSortBy'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "sortBy", null);
tslib_1.__decorate([
    Input('clrDgColType'),
    tslib_1.__metadata("design:type", String)
], ClrDatagridColumn.prototype, "colType", void 0);
tslib_1.__decorate([
    Input('clrDgSorted'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagridColumn.prototype, "sorted", null);
tslib_1.__decorate([
    Output('clrDgSortedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridColumn.prototype, "sortedChange", void 0);
tslib_1.__decorate([
    Input('clrDgSortOrder'),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], ClrDatagridColumn.prototype, "sortOrder", null);
tslib_1.__decorate([
    Output('clrDgSortOrderChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridColumn.prototype, "sortOrderChange", void 0);
tslib_1.__decorate([
    ContentChild(CustomFilter, { static: false }),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "projectedFilter", null);
tslib_1.__decorate([
    Input('clrFilterValue'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "updateFilterValue", null);
tslib_1.__decorate([
    Output('clrFilterValueChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridColumn.prototype, "filterValueChange", void 0);
ClrDatagridColumn = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-column',
        template: `
      <div class="datagrid-column-flex">
          <!-- I'm really not happy with that select since it's not very scalable -->
          <ng-content select="clr-dg-filter, clr-dg-string-filter, clr-dg-numeric-filter"></ng-content>

          <clr-dg-string-filter
                  *ngIf="field && !customFilter && (colType=='string')"
                  [clrDgStringFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-string-filter>
          
          <clr-dg-numeric-filter
                  *ngIf="field && !customFilter && (colType=='number')"
                  [clrDgNumericFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-numeric-filter>

          <ng-template #columnTitle>
              <ng-content></ng-content>
          </ng-template>

          <button 
            class="datagrid-column-title" 
            [attr.aria-label]="commonStrings.sortColumn"
            *ngIf="sortable" 
            (click)="sort()" 
            type="button">
              <ng-container  *ngTemplateOutlet="columnTitle"></ng-container>
              <clr-icon
                      *ngIf="sortIcon"
                      [attr.shape]="sortIcon"
                      class="sort-icon"></clr-icon>
          </button>

          <span class="datagrid-column-title" *ngIf="!sortable">
              <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
          </span>

          <clr-dg-column-separator></clr-dg-column-separator>
      </div>
  `,
        host: {
            '[class.datagrid-column]': 'true',
            '[attr.aria-sort]': 'ariaSort',
            role: 'columnheader',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Sort,
        FiltersProvider,
        ViewContainerRef,
        ClrCommonStrings])
], ClrDatagridColumn);
export { ClrDatagridColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBRVosS0FBSyxFQUdMLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQWlEN0UsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBMkIsU0FBUSx1QkFBeUQ7SUFFdkcsWUFDVSxLQUFjLEVBQ3RCLE9B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LE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzs7dURBQW1EO0FBYS9FO0lBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7a0RBd0J2QjtBQWMrQjtJQUEvQixNQUFNLENBQUMsc0JBQXNCLENBQUM7OzBEQUFtRTtBQWdDbEc7SUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7d0RBTTdDO0FBU0Q7SUFEQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7OzswREFvQnZCO0FBUytCO0lBQS9CLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzs7NERBQXdDO0FBL1A1RCxpQkFBaUI7SUEvQzdCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7UUFDRCxJQUFJLEVBQUU7WUFDSix5QkFBeUIsRUFBRSxNQUFNO1lBQ2pDLGtCQUFrQixFQUFFLFVBQVU7WUFDOUIsSUFBSSxFQUFFLGNBQWM7U0FDckI7S0FDRixDQUFDOzZDQUlpQixJQUFJO1FBQ1YsZUFBZTtRQUNYLGdCQUFnQjtRQUNQLGdCQUFnQjtHQU43QixpQkFBaUIsQ0EwUTdCO1NBMVFZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvciB9IGZyb20gJy4vYnVpbHQtaW4vY29tcGFyYXRvcnMvZGF0YWdyaWQtcHJvcGVydHktY29tcGFyYXRvcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXByb3BlcnR5LXN0cmluZy1maWx0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXN0cmluZy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLW51bWVyaWMtZmlsdGVyLWltcGwnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTb3J0T3JkZXIgfSBmcm9tICcuL2VudW1zL3NvcnQtb3JkZXIuZW51bSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tcGFyYXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3Byb3ZpZGVycy9zb3J0JztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV3JhcHBlZENvbHVtbiB9IGZyb20gJy4vd3JhcHBlZC1jb2x1bW4nO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLWZsZXhcIj5cbiAgICAgICAgICA8IS0tIEknbSByZWFsbHkgbm90IGhhcHB5IHdpdGggdGhhdCBzZWxlY3Qgc2luY2UgaXQncyBub3QgdmVyeSBzY2FsYWJsZSAtLT5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctZmlsdGVyLCBjbHItZGctc3RyaW5nLWZpbHRlciwgY2xyLWRnLW51bWVyaWMtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgICAgPGNsci1kZy1zdHJpbmctZmlsdGVyXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImZpZWxkICYmICFjdXN0b21GaWx0ZXIgJiYgKGNvbFR5cGU9PSdzdHJpbmcnKVwiXG4gICAgICAgICAgICAgICAgICBbY2xyRGdTdHJpbmdGaWx0ZXJdPVwicmVnaXN0ZXJlZFwiXG4gICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLXN0cmluZy1maWx0ZXI+XG4gICAgICAgICAgXG4gICAgICAgICAgPGNsci1kZy1udW1lcmljLWZpbHRlclxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWVsZCAmJiAhY3VzdG9tRmlsdGVyICYmIChjb2xUeXBlPT0nbnVtYmVyJylcIlxuICAgICAgICAgICAgICAgICAgW2NsckRnTnVtZXJpY0ZpbHRlcl09XCJyZWdpc3RlcmVkXCJcbiAgICAgICAgICAgICAgICAgIFsoY2xyRmlsdGVyVmFsdWUpXT1cImZpbHRlclZhbHVlXCI+PC9jbHItZGctbnVtZXJpYy1maWx0ZXI+XG5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbHVtblRpdGxlPlxuICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiIFxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLnNvcnRDb2x1bW5cIlxuICAgICAgICAgICAgKm5nSWY9XCJzb3J0YWJsZVwiIFxuICAgICAgICAgICAgKGNsaWNrKT1cInNvcnQoKVwiIFxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICAqbmdUZW1wbGF0ZU91dGxldD1cImNvbHVtblRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxjbHItaWNvblxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic29ydEljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnNoYXBlXT1cInNvcnRJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNvcnQtaWNvblwiPjwvY2xyLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwiIXNvcnRhYmxlXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxjbHItZGctY29sdW1uLXNlcGFyYXRvcj48L2Nsci1kZy1jb2x1bW4tc2VwYXJhdG9yPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbl0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtc29ydF0nOiAnYXJpYVNvcnQnLFxuICAgIHJvbGU6ICdjb2x1bW5oZWFkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtbjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc29ydDogU29ydDxUPixcbiAgICBmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgc3VwZXIoZmlsdGVycyk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmlwdGlvbiA9IF9zb3J0LmNoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICAvLyBXZSdyZSBvbmx5IGxpc3RlbmluZyB0byBtYWtlIHN1cmUgd2UgZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjb2x1bW4gZ29lcyBmcm9tIHNvcnRlZCB0byB1bnNvcnRlZFxuICAgICAgaWYgKHRoaXMuc29ydE9yZGVyICE9PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRCAmJiBzb3J0LmNvbXBhcmF0b3IgIT09IHRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLl9zb3J0T3JkZXIpO1xuICAgICAgICAvLyByZW1vdmVzIHRoZSBzb3J0SWNvbiB3aGVuIGNvbHVtbiBiZWNvbWVzIHVuc29ydGVkXG4gICAgICAgIHRoaXMuc29ydEljb24gPSBudWxsO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc29ydCBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAgICAqIFNpbXBsZSBvYmplY3QgcHJvcGVydHkgc2hvcnRjdXQsIGFjdGl2YXRlcyBib3RoIHNvcnRpbmcgYW5kIGZpbHRlcmluZ1xuICAgICAqIGJhc2VkIG9uIG5hdGl2ZSBjb21wYXJpc29uIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIGl0ZW1zLlxuICAgICAqL1xuICBwcml2YXRlIF9maWVsZDogc3RyaW5nO1xuICBwdWJsaWMgZ2V0IGZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWVsZCcpXG4gIHB1YmxpYyBzZXQgZmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbUZpbHRlcikge1xuICAgICAgICBpZiAodGhpcy5jb2xUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlcihmaWVsZCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyKGZpZWxkKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgdG8gdXNlIHdoZW4gc29ydGluZyB0aGUgY29sdW1uXG4gICAqL1xuXG4gIHByaXZhdGUgX3NvcnRCeTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+O1xuXG4gIHB1YmxpYyBnZXQgc29ydEJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydEJ5JylcbiAgcHVibGljIHNldCBzb3J0QnkoY29tcGFyYXRvcjogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+IHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBjb21wYXJhdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGNvbXBhcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29tcGFyYXRvcikge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkKSB7XG4gICAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKHRoaXMuX2ZpZWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fc29ydEJ5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICAqIFdoYXQgdHlwZSBpcyB0aGlzIGNvbHVtbj8gIFRoaXMgZGVmYXVsdHMgdG8gU1RSSU5HLCBidXQgY2FuIGFsc28gYmVcbiAgICAqIHNldCB0byBOVU1CRVIuICBVbnN1cHBvcnRlZCB0eXBlcyBkZWZhdWx0IHRvIFNUUklORy4gVXNlcnMgY2FuIHNldCBpdFxuICAgICogdmlhIHRoZSBbY2xyRGdDb2xUeXBlXSBpbnB1dCBieSBzZXR0aW5nIGl0IHRvICdzdHJpbmcnIG9yICdudW1iZXInLlxuICAgICovXG5cbiAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byBtYWtlIHRoaXMgYW4gZW51bSBpbiB0aGUgZnV0dXJlXG4gIEBJbnB1dCgnY2xyRGdDb2xUeXBlJykgY29sVHlwZTogJ3N0cmluZycgfCAnbnVtYmVyJyA9ICdzdHJpbmcnO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBpcyBzb3J0YWJsZVxuICAgKi9cbiAgcHVibGljIGdldCBzb3J0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWRcbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZCA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHNvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU29ydGVkJylcbiAgcHVibGljIHNldCBzb3J0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NvcnQuY2xlYXIoKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmICF0aGlzLnNvcnRlZCkge1xuICAgICAgdGhpcy5zb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBAT3V0cHV0KCdjbHJEZ1NvcnRlZENoYW5nZScpIHB1YmxpYyBzb3J0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydE9yZGVyOiBDbHJEYXRhZ3JpZFNvcnRPcmRlciA9IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEO1xuICBwdWJsaWMgZ2V0IHNvcnRPcmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydE9yZGVyO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NvcnRPcmRlcicpXG4gIHB1YmxpYyBzZXQgc29ydE9yZGVyKHZhbHVlOiBDbHJEYXRhZ3JpZFNvcnRPcmRlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gb25seSBpZiB0aGUgaW5jb21pbmcgb3JkZXIgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKHRoaXMuX3NvcnRPcmRlciA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAvLyB0aGUgVW5zb3J0ZWQgY2FzZSBoYXBwZW5zIHdoZW4gdGhlIGN1cnJlbnQgc3RhdGUgaXMgZWl0aGVyIEFzYyBvciBEZXNjXG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICB0aGlzLnNvcnQoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgdGhpcy5zb3J0KHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFyaWFTb3J0KCkge1xuICAgIHN3aXRjaCAodGhpcy5fc29ydE9yZGVyKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkRFU0M6XG4gICAgICAgIHJldHVybiAnZGVzY2VuZGluZyc7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTb3J0T3JkZXJDaGFuZ2UnKSBwdWJsaWMgc29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJEYXRhZ3JpZFNvcnRPcmRlcj4oKTtcblxuICAvKipcbiAgICogU29ydHMgdGhlIGRhdGFncmlkIGJhc2VkIG9uIHRoaXMgY29sdW1uXG4gICAqL1xuICBwdWJsaWMgc29ydChyZXZlcnNlPzogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NvcnQudG9nZ2xlKHRoaXMuX3NvcnRCeSwgcmV2ZXJzZSk7XG5cbiAgICAvLyBzZXR0aW5nIHRoZSBwcml2YXRlIHZhcmlhYmxlIHRvIG5vdCByZXRyaWdnZXIgdGhlIHNldHRlciBsb2dpY1xuICAgIHRoaXMuX3NvcnRPcmRlciA9IHRoaXMuX3NvcnQucmV2ZXJzZSA/IENsckRhdGFncmlkU29ydE9yZGVyLkRFU0MgOiBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M7XG4gICAgLy8gU2V0cyB0aGUgY29ycmVjdCBpY29uIGZvciBjdXJyZW50IHNvcnQgb3JkZXJcbiAgICB0aGlzLnNvcnRJY29uID0gdGhpcy5fc29ydE9yZGVyID09PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDID8gJ2Fycm93IGRvd24nIDogJ2Fycm93JztcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG5cbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgcHVibGljIHNvcnRJY29uO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBmaWx0ZXIgZm9yIHRoaXMgY29sdW1uIHRoYXQgY2FuIGJlIHByb3ZpZGVkIGluIHRoZSBwcm9qZWN0ZWQgY29udGVudFxuICAgKi9cbiAgcHVibGljIGN1c3RvbUZpbHRlciA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ3VzdG9tRmlsdGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHNldCBwcm9qZWN0ZWRGaWx0ZXIoY3VzdG9tOiBhbnkpIHtcbiAgICBpZiAoY3VzdG9tKSB7XG4gICAgICB0aGlzLmRlbGV0ZUZpbHRlcigpO1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZmlsdGVyVmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIHx8IHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmlsdGVyVmFsdWUnKVxuICBwdWJsaWMgc2V0IHVwZGF0ZUZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcgfCBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwpIHtcbiAgICAgIGlmICghbmV3VmFsdWUgfHwgdHlwZW9mIG5ld1ZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBuZXdWYWx1ZSA9ICcnO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKSB7XG4gICAgICBpZiAoIW5ld1ZhbHVlIHx8ICEobmV3VmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBbbnVsbCwgbnVsbF07XG4gICAgICB9XG4gICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID09PSAyICYmIChuZXdWYWx1ZVswXSAhPT0gdGhpcy5maWx0ZXIudmFsdWVbMF0gfHwgbmV3VmFsdWVbMV0gIT09IHRoaXMuZmlsdGVyLnZhbHVlWzFdKSkge1xuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgZmlsdGVyVmFsdWUobmV3VmFsdWU6IHN0cmluZyB8IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfHwgdGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlclZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXIudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckZpbHRlclZhbHVlQ2hhbmdlJykgZmlsdGVyVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRDb2x1bW4sIHRoaXMudmNyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgX3ZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMud3JhcHBlZEluamVjdG9yLmdldChXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcikuY29sdW1uVmlldztcbiAgfVxufVxuIl19