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
var ClrDatagridColumn = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatagridColumn, _super);
    function ClrDatagridColumn(_sort, filters, vcr, commonStrings) {
        var _this = _super.call(this, filters) || this;
        _this._sort = _sort;
        _this.vcr = vcr;
        _this.commonStrings = commonStrings;
        /*
          * What type is this column?  This defaults to STRING, but can also be
          * set to NUMBER.  Unsupported types default to STRING. Users can set it
          * via the [clrDgColType] input by setting it to 'string' or 'number'.
          */
        // TODO: We might want to make this an enum in the future
        _this.colType = 'string';
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        _this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        _this.customFilter = false;
        _this.filterValueChange = new EventEmitter();
        _this._sortSubscription = _sort.change.subscribe(function (sort) {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (_this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== _this._sortBy) {
                _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                _this.sortOrderChange.emit(_this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                _this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (_this.sorted && sort.comparator !== _this._sortBy) {
                _this._sorted = false;
                _this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
        return _this;
    }
    ClrDatagridColumn.prototype.ngOnDestroy = function () {
        this._sortSubscription.unsubscribe();
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "field", {
        get: function () {
            return this._field;
        },
        set: function (field) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortBy", {
        get: function () {
            return this._sortBy;
        },
        set: function (comparator) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortable", {
        /**
         * Indicates if the column is sortable
         */
        get: function () {
            return !!this._sortBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sorted", {
        get: function () {
            return this._sorted;
        },
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        set: function (value) {
            if (!value && this.sorted) {
                this._sorted = false;
                this._sort.clear();
            }
            else if (value && !this.sorted) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "ariaSort", {
        get: function () {
            switch (this._sortOrder) {
                default:
                case ClrDatagridSortOrder.UNSORTED:
                    return 'none';
                case ClrDatagridSortOrder.ASC:
                    return 'ascending';
                case ClrDatagridSortOrder.DESC:
                    return 'descending';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sorts the datagrid based on this column
     */
    ClrDatagridColumn.prototype.sort = function (reverse) {
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
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "projectedFilter", {
        set: function (custom) {
            if (custom) {
                this.deleteFilter();
                this.customFilter = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "filterValue", {
        get: function () {
            if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
                return this.filter.value;
            }
        },
        set: function (newValue) {
            if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
                this.updateFilterValue = newValue;
                this.filterValueChange.emit(this.filter.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "updateFilterValue", {
        set: function (newValue) {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumn.prototype.ngOnInit = function () {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "_view", {
        get: function () {
            return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n      <div class=\"datagrid-column-flex\">\n          <!-- I'm really not happy with that select since it's not very scalable -->\n          <ng-content select=\"clr-dg-filter, clr-dg-string-filter, clr-dg-numeric-filter\"></ng-content>\n\n          <clr-dg-string-filter\n                  *ngIf=\"field && !customFilter && (colType=='string')\"\n                  [clrDgStringFilter]=\"registered\"\n                  [(clrFilterValue)]=\"filterValue\"></clr-dg-string-filter>\n          \n          <clr-dg-numeric-filter\n                  *ngIf=\"field && !customFilter && (colType=='number')\"\n                  [clrDgNumericFilter]=\"registered\"\n                  [(clrFilterValue)]=\"filterValue\"></clr-dg-numeric-filter>\n\n          <ng-template #columnTitle>\n              <ng-content></ng-content>\n          </ng-template>\n\n          <button \n            class=\"datagrid-column-title\" \n            [attr.aria-label]=\"commonStrings.sortColumn\"\n            *ngIf=\"sortable\" \n            (click)=\"sort()\" \n            type=\"button\">\n              <ng-container  *ngTemplateOutlet=\"columnTitle\"></ng-container>\n              <clr-icon\n                      *ngIf=\"sortIcon\"\n                      [attr.shape]=\"sortIcon\"\n                      class=\"sort-icon\"></clr-icon>\n          </button>\n\n          <span class=\"datagrid-column-title\" *ngIf=\"!sortable\">\n              <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n          </span>\n\n          <clr-dg-column-separator></clr-dg-column-separator>\n      </div>\n  ",
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
    return ClrDatagridColumn;
}(DatagridFilterRegistrar));
export { ClrDatagridColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBRVosS0FBSyxFQUdMLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQWlEN0U7SUFBZ0QsNkNBQXlEO0lBRXZHLDJCQUNVLEtBQWMsRUFDdEIsT0FBMkIsRUFDbkIsR0FBcUIsRUFDdEIsYUFBK0I7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SUFhRDtRQURDLEtBQUssQ0FBQyxhQUFhLENBQUM7OzttREFlcEI7SUFTc0I7UUFBdEIsS0FBSyxDQUFDLGNBQWMsQ0FBQzs7c0RBQXlDO0lBd0IvRDtRQURDLEtBQUssQ0FBQyxhQUFhLENBQUM7OzttREFRcEI7SUFLNEI7UUFBNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDOzsyREFBbUQ7SUFhL0U7UUFEQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7OztzREF3QnZCO0lBYytCO1FBQS9CLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzs7OERBQW1FO0lBZ0NsRztRQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7Ozs0REFNN0M7SUFTRDtRQURDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7OzhEQW9CdkI7SUFTK0I7UUFBL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDOztnRUFBd0M7SUEvUDVELGlCQUFpQjtRQS9DN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLHlqREFzQ1Q7WUFDRCxJQUFJLEVBQUU7Z0JBQ0oseUJBQXlCLEVBQUUsTUFBTTtnQkFDakMsa0JBQWtCLEVBQUUsVUFBVTtnQkFDOUIsSUFBSSxFQUFFLGNBQWM7YUFDckI7U0FDRixDQUFDO2lEQUlpQixJQUFJO1lBQ1YsZUFBZTtZQUNYLGdCQUFnQjtZQUNQLGdCQUFnQjtPQU43QixpQkFBaUIsQ0EwUTdCO0lBQUQsd0JBQUM7Q0FBQSxBQTFRRCxDQUFnRCx1QkFBdUIsR0EwUXRFO1NBMVFZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvciB9IGZyb20gJy4vYnVpbHQtaW4vY29tcGFyYXRvcnMvZGF0YWdyaWQtcHJvcGVydHktY29tcGFyYXRvcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXByb3BlcnR5LXN0cmluZy1maWx0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXN0cmluZy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLW51bWVyaWMtZmlsdGVyLWltcGwnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTb3J0T3JkZXIgfSBmcm9tICcuL2VudW1zL3NvcnQtb3JkZXIuZW51bSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tcGFyYXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3Byb3ZpZGVycy9zb3J0JztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV3JhcHBlZENvbHVtbiB9IGZyb20gJy4vd3JhcHBlZC1jb2x1bW4nO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLWZsZXhcIj5cbiAgICAgICAgICA8IS0tIEknbSByZWFsbHkgbm90IGhhcHB5IHdpdGggdGhhdCBzZWxlY3Qgc2luY2UgaXQncyBub3QgdmVyeSBzY2FsYWJsZSAtLT5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctZmlsdGVyLCBjbHItZGctc3RyaW5nLWZpbHRlciwgY2xyLWRnLW51bWVyaWMtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgICAgPGNsci1kZy1zdHJpbmctZmlsdGVyXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImZpZWxkICYmICFjdXN0b21GaWx0ZXIgJiYgKGNvbFR5cGU9PSdzdHJpbmcnKVwiXG4gICAgICAgICAgICAgICAgICBbY2xyRGdTdHJpbmdGaWx0ZXJdPVwicmVnaXN0ZXJlZFwiXG4gICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLXN0cmluZy1maWx0ZXI+XG4gICAgICAgICAgXG4gICAgICAgICAgPGNsci1kZy1udW1lcmljLWZpbHRlclxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWVsZCAmJiAhY3VzdG9tRmlsdGVyICYmIChjb2xUeXBlPT0nbnVtYmVyJylcIlxuICAgICAgICAgICAgICAgICAgW2NsckRnTnVtZXJpY0ZpbHRlcl09XCJyZWdpc3RlcmVkXCJcbiAgICAgICAgICAgICAgICAgIFsoY2xyRmlsdGVyVmFsdWUpXT1cImZpbHRlclZhbHVlXCI+PC9jbHItZGctbnVtZXJpYy1maWx0ZXI+XG5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbHVtblRpdGxlPlxuICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiIFxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLnNvcnRDb2x1bW5cIlxuICAgICAgICAgICAgKm5nSWY9XCJzb3J0YWJsZVwiIFxuICAgICAgICAgICAgKGNsaWNrKT1cInNvcnQoKVwiIFxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICAqbmdUZW1wbGF0ZU91dGxldD1cImNvbHVtblRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxjbHItaWNvblxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic29ydEljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnNoYXBlXT1cInNvcnRJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNvcnQtaWNvblwiPjwvY2xyLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwiIXNvcnRhYmxlXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxjbHItZGctY29sdW1uLXNlcGFyYXRvcj48L2Nsci1kZy1jb2x1bW4tc2VwYXJhdG9yPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbl0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtc29ydF0nOiAnYXJpYVNvcnQnLFxuICAgIHJvbGU6ICdjb2x1bW5oZWFkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtbjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc29ydDogU29ydDxUPixcbiAgICBmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgc3VwZXIoZmlsdGVycyk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmlwdGlvbiA9IF9zb3J0LmNoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICAvLyBXZSdyZSBvbmx5IGxpc3RlbmluZyB0byBtYWtlIHN1cmUgd2UgZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjb2x1bW4gZ29lcyBmcm9tIHNvcnRlZCB0byB1bnNvcnRlZFxuICAgICAgaWYgKHRoaXMuc29ydE9yZGVyICE9PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRCAmJiBzb3J0LmNvbXBhcmF0b3IgIT09IHRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLl9zb3J0T3JkZXIpO1xuICAgICAgICAvLyByZW1vdmVzIHRoZSBzb3J0SWNvbiB3aGVuIGNvbHVtbiBiZWNvbWVzIHVuc29ydGVkXG4gICAgICAgIHRoaXMuc29ydEljb24gPSBudWxsO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc29ydCBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAgICAqIFNpbXBsZSBvYmplY3QgcHJvcGVydHkgc2hvcnRjdXQsIGFjdGl2YXRlcyBib3RoIHNvcnRpbmcgYW5kIGZpbHRlcmluZ1xuICAgICAqIGJhc2VkIG9uIG5hdGl2ZSBjb21wYXJpc29uIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIGl0ZW1zLlxuICAgICAqL1xuICBwcml2YXRlIF9maWVsZDogc3RyaW5nO1xuICBwdWJsaWMgZ2V0IGZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWVsZCcpXG4gIHB1YmxpYyBzZXQgZmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbUZpbHRlcikge1xuICAgICAgICBpZiAodGhpcy5jb2xUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlcihmaWVsZCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyKGZpZWxkKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgdG8gdXNlIHdoZW4gc29ydGluZyB0aGUgY29sdW1uXG4gICAqL1xuXG4gIHByaXZhdGUgX3NvcnRCeTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+O1xuXG4gIHB1YmxpYyBnZXQgc29ydEJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydEJ5JylcbiAgcHVibGljIHNldCBzb3J0QnkoY29tcGFyYXRvcjogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+IHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBjb21wYXJhdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGNvbXBhcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29tcGFyYXRvcikge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkKSB7XG4gICAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKHRoaXMuX2ZpZWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fc29ydEJ5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICAqIFdoYXQgdHlwZSBpcyB0aGlzIGNvbHVtbj8gIFRoaXMgZGVmYXVsdHMgdG8gU1RSSU5HLCBidXQgY2FuIGFsc28gYmVcbiAgICAqIHNldCB0byBOVU1CRVIuICBVbnN1cHBvcnRlZCB0eXBlcyBkZWZhdWx0IHRvIFNUUklORy4gVXNlcnMgY2FuIHNldCBpdFxuICAgICogdmlhIHRoZSBbY2xyRGdDb2xUeXBlXSBpbnB1dCBieSBzZXR0aW5nIGl0IHRvICdzdHJpbmcnIG9yICdudW1iZXInLlxuICAgICovXG5cbiAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byBtYWtlIHRoaXMgYW4gZW51bSBpbiB0aGUgZnV0dXJlXG4gIEBJbnB1dCgnY2xyRGdDb2xUeXBlJykgY29sVHlwZTogJ3N0cmluZycgfCAnbnVtYmVyJyA9ICdzdHJpbmcnO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBpcyBzb3J0YWJsZVxuICAgKi9cbiAgcHVibGljIGdldCBzb3J0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWRcbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZCA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHNvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU29ydGVkJylcbiAgcHVibGljIHNldCBzb3J0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NvcnQuY2xlYXIoKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmICF0aGlzLnNvcnRlZCkge1xuICAgICAgdGhpcy5zb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBAT3V0cHV0KCdjbHJEZ1NvcnRlZENoYW5nZScpIHB1YmxpYyBzb3J0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydE9yZGVyOiBDbHJEYXRhZ3JpZFNvcnRPcmRlciA9IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEO1xuICBwdWJsaWMgZ2V0IHNvcnRPcmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydE9yZGVyO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NvcnRPcmRlcicpXG4gIHB1YmxpYyBzZXQgc29ydE9yZGVyKHZhbHVlOiBDbHJEYXRhZ3JpZFNvcnRPcmRlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gb25seSBpZiB0aGUgaW5jb21pbmcgb3JkZXIgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKHRoaXMuX3NvcnRPcmRlciA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAvLyB0aGUgVW5zb3J0ZWQgY2FzZSBoYXBwZW5zIHdoZW4gdGhlIGN1cnJlbnQgc3RhdGUgaXMgZWl0aGVyIEFzYyBvciBEZXNjXG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICB0aGlzLnNvcnQoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgdGhpcy5zb3J0KHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFyaWFTb3J0KCkge1xuICAgIHN3aXRjaCAodGhpcy5fc29ydE9yZGVyKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkRFU0M6XG4gICAgICAgIHJldHVybiAnZGVzY2VuZGluZyc7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTb3J0T3JkZXJDaGFuZ2UnKSBwdWJsaWMgc29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJEYXRhZ3JpZFNvcnRPcmRlcj4oKTtcblxuICAvKipcbiAgICogU29ydHMgdGhlIGRhdGFncmlkIGJhc2VkIG9uIHRoaXMgY29sdW1uXG4gICAqL1xuICBwdWJsaWMgc29ydChyZXZlcnNlPzogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NvcnQudG9nZ2xlKHRoaXMuX3NvcnRCeSwgcmV2ZXJzZSk7XG5cbiAgICAvLyBzZXR0aW5nIHRoZSBwcml2YXRlIHZhcmlhYmxlIHRvIG5vdCByZXRyaWdnZXIgdGhlIHNldHRlciBsb2dpY1xuICAgIHRoaXMuX3NvcnRPcmRlciA9IHRoaXMuX3NvcnQucmV2ZXJzZSA/IENsckRhdGFncmlkU29ydE9yZGVyLkRFU0MgOiBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M7XG4gICAgLy8gU2V0cyB0aGUgY29ycmVjdCBpY29uIGZvciBjdXJyZW50IHNvcnQgb3JkZXJcbiAgICB0aGlzLnNvcnRJY29uID0gdGhpcy5fc29ydE9yZGVyID09PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDID8gJ2Fycm93IGRvd24nIDogJ2Fycm93JztcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG5cbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgcHVibGljIHNvcnRJY29uO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBmaWx0ZXIgZm9yIHRoaXMgY29sdW1uIHRoYXQgY2FuIGJlIHByb3ZpZGVkIGluIHRoZSBwcm9qZWN0ZWQgY29udGVudFxuICAgKi9cbiAgcHVibGljIGN1c3RvbUZpbHRlciA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ3VzdG9tRmlsdGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHNldCBwcm9qZWN0ZWRGaWx0ZXIoY3VzdG9tOiBhbnkpIHtcbiAgICBpZiAoY3VzdG9tKSB7XG4gICAgICB0aGlzLmRlbGV0ZUZpbHRlcigpO1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZmlsdGVyVmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIHx8IHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmlsdGVyVmFsdWUnKVxuICBwdWJsaWMgc2V0IHVwZGF0ZUZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcgfCBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwpIHtcbiAgICAgIGlmICghbmV3VmFsdWUgfHwgdHlwZW9mIG5ld1ZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBuZXdWYWx1ZSA9ICcnO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKSB7XG4gICAgICBpZiAoIW5ld1ZhbHVlIHx8ICEobmV3VmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBbbnVsbCwgbnVsbF07XG4gICAgICB9XG4gICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID09PSAyICYmIChuZXdWYWx1ZVswXSAhPT0gdGhpcy5maWx0ZXIudmFsdWVbMF0gfHwgbmV3VmFsdWVbMV0gIT09IHRoaXMuZmlsdGVyLnZhbHVlWzFdKSkge1xuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgZmlsdGVyVmFsdWUobmV3VmFsdWU6IHN0cmluZyB8IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfHwgdGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlclZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXIudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckZpbHRlclZhbHVlQ2hhbmdlJykgZmlsdGVyVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRDb2x1bW4sIHRoaXMudmNyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgX3ZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMud3JhcHBlZEluamVjdG9yLmdldChXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcikuY29sdW1uVmlldztcbiAgfVxufVxuIl19