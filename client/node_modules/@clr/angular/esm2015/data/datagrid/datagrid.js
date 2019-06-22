import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewContainerRef, } from '@angular/core';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { DatagridDisplayMode } from './enums/display-mode.enum';
import { DisplayModeService } from './providers/display-mode.service';
import { FiltersProvider } from './providers/filters';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { Items } from './providers/items';
import { Page } from './providers/page';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { Sort } from './providers/sort';
import { StateDebouncer } from './providers/state-debouncer.provider';
import { StateProvider } from './providers/state.provider';
import { TableSizeService } from './providers/table-size.service';
import { DatagridRenderOrganizer } from './render/render-organizer';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { SelectionType } from './enums/selection-type';
import { ColumnsService } from './providers/columns.service';
let ClrDatagrid = class ClrDatagrid {
    constructor(organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, commonStrings) {
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
        this.displayMode = displayMode;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        /**
         * Output emitted whenever the data needs to be refreshed, based on user action or external ones
         */
        this.refresh = new EventEmitter(false);
        this.selectedChanged = new EventEmitter(false);
        this.singleSelectedChanged = new EventEmitter(false);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
    }
    /**
     * Freezes the datagrid while data is loading
     */
    get loading() {
        return this.items.loading;
    }
    set loading(value) {
        this.items.loading = value;
    }
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    dataChanged() {
        this.items.refresh();
    }
    /**
     * Array of all selected items
     */
    set selected(value) {
        if (value) {
            this.selection.selectionType = SelectionType.Multi;
        }
        else {
            this.selection.selectionType = SelectionType.None;
        }
        this.selection.updateCurrent(value, false);
    }
    /**
     * Selected item in single-select mode
     */
    set singleSelected(value) {
        this.selection.selectionType = SelectionType.Single;
        // the clrDgSingleSelected is updated in one of two cases:
        // 1. an explicit value is passed
        // 2. is being set to null or undefined, where previously it had a value
        if (value) {
            this.selection.currentSingle = value;
        }
        else if (this.selection.currentSingle) {
            this.selection.currentSingle = null;
        }
    }
    /**
     * @deprecated since 2.0, remove in 3.0
     *
     * Selection/Deselection on row click mode
     */
    set rowSelectionMode(value) {
        this.selection.rowSelectionMode = value;
    }
    /**
     * Indicates if all currently displayed items are selected
     */
    get allSelected() {
        return this.selection.isAllSelected();
    }
    /**
     * Selects/deselects all currently displayed items
     * @param value
     */
    set allSelected(value) {
        /*
             * This is a setter but we ignore the value.
             * It's strange, but it lets us have an indeterminate state where only
             * some of the items are selected.
             */
        this.selection.toggleAll();
    }
    ngAfterContentInit() {
        if (!this.items.smart) {
            this.items.all = this.rows.map((row) => row.item);
        }
        this._subscriptions.push(this.rows.changes.subscribe(() => {
            if (!this.items.smart) {
                this.items.all = this.rows.map((row) => row.item);
            }
            this.rows.forEach(row => {
                this._displayedRows.insert(row._view);
            });
        }));
    }
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ngAfterViewInit() {
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(state => this.refresh.emit(state)));
        this._subscriptions.push(this.selection.change.subscribe(s => {
            if (this.selection.selectionType === SelectionType.Single) {
                this.singleSelectedChanged.emit(s);
            }
            else if (this.selection.selectionType === SelectionType.Multi) {
                this.selectedChanged.emit(s);
            }
        }));
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe(viewChange => {
            // Remove any projected columns from the projectedDisplayColumns container
            for (let i = this._projectedDisplayColumns.length; i > 0; i--) {
                this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (let i = this._projectedCalculationColumns.length; i > 0; i--) {
                this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (let i = this._calculationRows.length; i > 0; i--) {
                this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (let i = this._displayedRows.length; i > 0; i--) {
                this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach(column => {
                    this._projectedDisplayColumns.insert(column._view);
                });
                this.rows.forEach(row => {
                    this._displayedRows.insert(row._view);
                });
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                this.renderer.addClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach(column => {
                    this._projectedCalculationColumns.insert(column._view);
                });
                this.rows.forEach(row => {
                    this._calculationRows.insert(row._view);
                });
            }
        });
    }
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
    resize() {
        this.organizer.resize();
    }
};
tslib_1.__decorate([
    Input('clrDgLoading'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagrid.prototype, "loading", null);
tslib_1.__decorate([
    Output('clrDgRefresh'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagrid.prototype, "refresh", void 0);
tslib_1.__decorate([
    ContentChild(ClrDatagridItems, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridItems)
], ClrDatagrid.prototype, "iterator", void 0);
tslib_1.__decorate([
    Input('clrDgSelected'),
    tslib_1.__metadata("design:type", Array),
    tslib_1.__metadata("design:paramtypes", [Array])
], ClrDatagrid.prototype, "selected", null);
tslib_1.__decorate([
    Output('clrDgSelectedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagrid.prototype, "selectedChanged", void 0);
tslib_1.__decorate([
    Input('clrDgSingleSelected'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagrid.prototype, "singleSelected", null);
tslib_1.__decorate([
    Output('clrDgSingleSelectedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagrid.prototype, "singleSelectedChanged", void 0);
tslib_1.__decorate([
    Input('clrDgRowSelection'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagrid.prototype, "rowSelectionMode", null);
tslib_1.__decorate([
    ContentChild(ClrDatagridPlaceholder, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridPlaceholder)
], ClrDatagrid.prototype, "placeholder", void 0);
tslib_1.__decorate([
    ContentChildren(ClrDatagridColumn),
    tslib_1.__metadata("design:type", QueryList)
], ClrDatagrid.prototype, "columns", void 0);
tslib_1.__decorate([
    ContentChildren(ClrDatagridRow),
    tslib_1.__metadata("design:type", QueryList)
], ClrDatagrid.prototype, "rows", void 0);
tslib_1.__decorate([
    ViewChild('scrollableColumns', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "scrollableColumns", void 0);
tslib_1.__decorate([
    ViewChild('projectedDisplayColumns', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_projectedDisplayColumns", void 0);
tslib_1.__decorate([
    ViewChild('projectedCalculationColumns', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_projectedCalculationColumns", void 0);
tslib_1.__decorate([
    ViewChild('displayedRows', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_displayedRows", void 0);
tslib_1.__decorate([
    ViewChild('calculationRows', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_calculationRows", void 0);
ClrDatagrid = tslib_1.__decorate([
    Component({
        selector: 'clr-datagrid',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-content select=\"clr-dg-action-bar\"></ng-content>\n<div class=\"datagrid\" #datagrid>\n    <div class=\"datagrid-table-wrapper\">\n      <div role=\"grid\" class=\"datagrid-table\">\n        <div role=\"rowgroup\" class=\"datagrid-header\">\n          <div role=\"row\" class=\"datagrid-row\">\n            <div class=\"datagrid-row-master datagrid-row-flex\">\n              <div class=\"datagrid-row-sticky\">\n                <!-- Sticky elements here -->\n              </div>\n              <div class=\"datagrid-row-scrollable\">\n                <!--header for datagrid where you can select multiple rows -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                            <span class=\"datagrid-column-title\">\n                                <input clrCheckbox type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                       [attr.aria-label]=\"commonStrings.selectAll\">\n                            </span>\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for datagrid where you can select one row only -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for single row action; only displayType if we have at least one actionable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                     *ngIf=\"rowActionService.hasActionableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for carets; only displayType if we have at least one expandable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                     *ngIf=\"expandableRows.hasExpandableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <ng-container #projectedDisplayColumns></ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n        <ng-container #displayedRows></ng-container>\n        <!-- Custom placeholder overrides the default empty one -->\n        <ng-content select=\"clr-dg-placeholder\"></ng-content>\n        <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n      </div>\n    </div>\n</div>\n<ng-content select=\"clr-dg-footer\"></ng-content>\n<div class=\"datagrid-spinner\" *ngIf=\"loading\">\n    <div class=\"spinner spinner-md\">Loading...</div>\n</div>\n\n<div class=\"datagrid-calculation-table\">\n    <div class=\"datagrid-calculation-header\">\n        <ng-container #projectedCalculationColumns></ng-container>\n    </div>\n    <ng-container #calculationRows></ng-container>\n</div>\n",
        providers: [
            Selection,
            Sort,
            FiltersProvider,
            Page,
            Items,
            DatagridRenderOrganizer,
            RowActionService,
            ExpandableRowsCount,
            StateDebouncer,
            StateProvider,
            TableSizeService,
            ColumnsService,
            DisplayModeService,
        ],
        host: { '[class.datagrid-host]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [DatagridRenderOrganizer,
        Items,
        ExpandableRowsCount,
        Selection,
        RowActionService,
        StateProvider,
        DisplayModeService,
        Renderer2,
        ElementRef,
        ClrCommonStrings])
], ClrDatagrid);
export { ClrDatagrid };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUdMLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxD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Q0FBQzs2Q0FHcUIsdUJBQXVCO1FBQzVCLEtBQUs7UUFDSSxtQkFBbUI7UUFDeEIsU0FBUztRQUNGLGdCQUFnQjtRQUNsQixhQUFhO1FBQ2Ysa0JBQWtCO1FBQ3JCLFNBQVM7UUFDZixVQUFVO1FBQ0EsZ0JBQWdCO0dBWDdCLFdBQVcsQ0FpT3ZCO1NBak9ZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW4gfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEl0ZW1zIH0gZnJvbSAnLi9kYXRhZ3JpZC1pdGVtcyc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyIH0gZnJvbSAnLi9kYXRhZ3JpZC1wbGFjZWhvbGRlcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFJvdyB9IGZyb20gJy4vZGF0YWdyaWQtcm93JztcbmltcG9ydCB7IERhdGFncmlkRGlzcGxheU1vZGUgfSBmcm9tICcuL2VudW1zL2Rpc3BsYXktbW9kZS5lbnVtJztcbmltcG9ydCB7IENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERpc3BsYXlNb2RlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Rpc3BsYXktbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRXhwYW5kYWJsZVJvd3NDb3VudCB9IGZyb20gJy4vcHJvdmlkZXJzL2dsb2JhbC1leHBhbmRhYmxlLXJvd3MnO1xuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuL3Byb3ZpZGVycy9pdGVtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9wcm92aWRlcnMvc29ydCc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vcHJvdmlkZXJzL3N0YXRlLWRlYm91bmNlci5wcm92aWRlcic7XG5pbXBvcnQgeyBTdGF0ZVByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RhdGUucHJvdmlkZXInO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYmxlLXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuL2VudW1zL3NlbGVjdGlvbi10eXBlJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGFncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGFncmlkLmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZWxlY3Rpb24sXG4gICAgU29ydCxcbiAgICBGaWx0ZXJzUHJvdmlkZXIsXG4gICAgUGFnZSxcbiAgICBJdGVtcyxcbiAgICBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIEV4cGFuZGFibGVSb3dzQ291bnQsXG4gICAgU3RhdGVEZWJvdW5jZXIsXG4gICAgU3RhdGVQcm92aWRlcixcbiAgICBUYWJsZVNpemVTZXJ2aWNlLFxuICAgIENvbHVtbnNTZXJ2aWNlLFxuICAgIERpc3BsYXlNb2RlU2VydmljZSxcbiAgXSxcbiAgaG9zdDogeyAnW2NsYXNzLmRhdGFncmlkLWhvc3RdJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkPFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIHB1YmxpYyBpdGVtczogSXRlbXM8VD4sXG4gICAgcHVibGljIGV4cGFuZGFibGVSb3dzOiBFeHBhbmRhYmxlUm93c0NvdW50LFxuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbjxUPixcbiAgICBwdWJsaWMgcm93QWN0aW9uU2VydmljZTogUm93QWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHN0YXRlUHJvdmlkZXI6IFN0YXRlUHJvdmlkZXI8VD4sXG4gICAgcHJpdmF0ZSBkaXNwbGF5TW9kZTogRGlzcGxheU1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgLyoqXG4gICAqIEZyZWV6ZXMgdGhlIGRhdGFncmlkIHdoaWxlIGRhdGEgaXMgbG9hZGluZ1xuICAgKi9cbiAgcHVibGljIGdldCBsb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmxvYWRpbmc7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnTG9hZGluZycpXG4gIHB1YmxpYyBzZXQgbG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuaXRlbXMubG9hZGluZyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE91dHB1dCBlbWl0dGVkIHdoZW5ldmVyIHRoZSBkYXRhIG5lZWRzIHRvIGJlIHJlZnJlc2hlZCwgYmFzZWQgb24gdXNlciBhY3Rpb24gb3IgZXh0ZXJuYWwgb25lc1xuICAgKi9cbiAgQE91dHB1dCgnY2xyRGdSZWZyZXNoJykgcHVibGljIHJlZnJlc2ggPSBuZXcgRXZlbnRFbWl0dGVyPENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2U8VD4+KGZhbHNlKTtcblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byByZS10cmlnZ2VyIHRoZSBjb21wdXRhdGlvbiBvZiBkaXNwbGF5ZWQgaXRlbXMgbWFudWFsbHlcbiAgICovXG4gIHB1YmxpYyBkYXRhQ2hhbmdlZCgpIHtcbiAgICB0aGlzLml0ZW1zLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBncmFiIHRoZSBzbWFydCBpdGVyYXRvciBmcm9tIHByb2plY3RlZCBjb250ZW50XG4gICAqL1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkSXRlbXMsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgaXRlcmF0b3I6IENsckRhdGFncmlkSXRlbXM8VD47XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGFsbCBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgQElucHV0KCdjbHJEZ1NlbGVjdGVkJylcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUW10pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLk11bHRpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5Ob25lO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbi51cGRhdGVDdXJyZW50KHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NlbGVjdGVkQ2hhbmdlJykgc2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUW10+KGZhbHNlKTtcblxuICAvKipcbiAgICogU2VsZWN0ZWQgaXRlbSBpbiBzaW5nbGUtc2VsZWN0IG1vZGVcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTaW5nbGVTZWxlY3RlZCcpXG4gIHNldCBzaW5nbGVTZWxlY3RlZCh2YWx1ZTogVCkge1xuICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLlNpbmdsZTtcbiAgICAvLyB0aGUgY2xyRGdTaW5nbGVTZWxlY3RlZCBpcyB1cGRhdGVkIGluIG9uZSBvZiB0d28gY2FzZXM6XG4gICAgLy8gMS4gYW4gZXhwbGljaXQgdmFsdWUgaXMgcGFzc2VkXG4gICAgLy8gMi4gaXMgYmVpbmcgc2V0IHRvIG51bGwgb3IgdW5kZWZpbmVkLCB3aGVyZSBwcmV2aW91c2x5IGl0IGhhZCBhIHZhbHVlXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NpbmdsZVNlbGVjdGVkQ2hhbmdlJykgc2luZ2xlU2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHNpbmNlIDIuMCwgcmVtb3ZlIGluIDMuMFxuICAgKlxuICAgKiBTZWxlY3Rpb24vRGVzZWxlY3Rpb24gb24gcm93IGNsaWNrIG1vZGVcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdSb3dTZWxlY3Rpb24nKVxuICBzZXQgcm93U2VsZWN0aW9uTW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuc2VsZWN0aW9uLnJvd1NlbGVjdGlvbk1vZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFsbFNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5pc0FsbFNlbGVjdGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cy9kZXNlbGVjdHMgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbXNcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc2V0IGFsbFNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgLypcbiAgICAgICAgICogVGhpcyBpcyBhIHNldHRlciBidXQgd2UgaWdub3JlIHRoZSB2YWx1ZS5cbiAgICAgICAgICogSXQncyBzdHJhbmdlLCBidXQgaXQgbGV0cyB1cyBoYXZlIGFuIGluZGV0ZXJtaW5hdGUgc3RhdGUgd2hlcmUgb25seVxuICAgICAgICAgKiBzb21lIG9mIHRoZSBpdGVtcyBhcmUgc2VsZWN0ZWQuXG4gICAgICAgICAqL1xuICAgIHRoaXMuc2VsZWN0aW9uLnRvZ2dsZUFsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBwbGFjZWhvbGRlciBkZXRlY3Rpb25cbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRQbGFjZWhvbGRlciwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogQ2xyRGF0YWdyaWRQbGFjZWhvbGRlcjxUPjtcblxuICAvKipcbiAgICogSGlkZWFibGUgQ29sdW1uIGRhdGEgc291cmNlIC8gZGV0ZWN0aW9uLlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZENvbHVtbikgcHVibGljIGNvbHVtbnM6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZENvbHVtbjxUPj47XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGRhdGFncmlkIGlzIHVzZXItbWFuYWdlZCB3aXRob3V0IHRoZSBzbWFydCBpdGVyYXRvciwgd2UgZ2V0IHRoZSBpdGVtcyBkaXNwbGF5ZWRcbiAgICogYnkgcXVlcnlpbmcgdGhlIHByb2plY3RlZCBjb250ZW50LiBUaGlzIGlzIG5lZWRlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBtb2RlbHMgY3VycmVudGx5XG4gICAqIGRpc3BsYXllZCwgdHlwaWNhbGx5IGZvciBzZWxlY3Rpb24uXG4gICAqL1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyRGF0YWdyaWRSb3cpIHJvd3M6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZFJvdzxUPj47XG4gIEBWaWV3Q2hpbGQoJ3Njcm9sbGFibGVDb2x1bW5zJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIHNjcm9sbGFibGVDb2x1bW5zOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXRlbXMuc21hcnQpIHtcbiAgICAgIHRoaXMuaXRlbXMuYWxsID0gdGhpcy5yb3dzLm1hcCgocm93OiBDbHJEYXRhZ3JpZFJvdzxUPikgPT4gcm93Lml0ZW0pO1xuICAgIH1cblxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucm93cy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtcy5zbWFydCkge1xuICAgICAgICAgIHRoaXMuaXRlbXMuYWxsID0gdGhpcy5yb3dzLm1hcCgocm93OiBDbHJEYXRhZ3JpZFJvdzxUPikgPT4gcm93Lml0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgdGhpcy5fZGlzcGxheWVkUm93cy5pbnNlcnQocm93Ll92aWV3KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogT3VyIHNldHVwIGhhcHBlbnMgaW4gdGhlIHZpZXcgb2Ygc29tZSBvZiBvdXIgY29tcG9uZW50cywgc28gd2Ugd2FpdCBmb3IgaXQgdG8gYmUgZG9uZSBiZWZvcmUgc3RhcnRpbmdcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUT0RPOiBkZXRlcm1pbmUgaWYgd2UgY2FuIGdldCByaWQgb2YgcHJvdmlkZXIgd2lyaW5nIGluIHZpZXcgaW5pdCBzbyB0aGF0IHN1YnNjcmlwdGlvbnMgY2FuIGJlIGRvbmUgZWFybGllclxuICAgIHRoaXMucmVmcmVzaC5lbWl0KHRoaXMuc3RhdGVQcm92aWRlci5zdGF0ZSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuc3RhdGVQcm92aWRlci5jaGFuZ2Uuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMucmVmcmVzaC5lbWl0KHN0YXRlKSkpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNoYW5nZS5zdWJzY3JpYmUocyA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgICAgIHRoaXMuc2luZ2xlU2VsZWN0ZWRDaGFuZ2VkLmVtaXQoPFQ+cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2VkLmVtaXQoPFRbXT5zKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIC8vIEEgc3Vic2NyaXB0aW9uIHRoYXQgbGlzdGVucyBmb3IgZGlzcGxheU1vZGUgY2hhbmdlcyBvbiB0aGUgZGF0YWdyaWRcbiAgICB0aGlzLmRpc3BsYXlNb2RlLnZpZXcuc3Vic2NyaWJlKHZpZXdDaGFuZ2UgPT4ge1xuICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgY29sdW1ucyBmcm9tIHRoZSBwcm9qZWN0ZWREaXNwbGF5Q29sdW1ucyBjb250YWluZXJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9wcm9qZWN0ZWREaXNwbGF5Q29sdW1ucy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdGVkRGlzcGxheUNvbHVtbnMuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCBjb2x1bW5zIGZyb20gdGhlIHByb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucyBjb250YWluZXJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBhbnkgcHJvamVjdGVkIHJvd3MgZnJvbSB0aGUgY2FsY3VsYXRpb25Sb3dzIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2NhbGN1bGF0aW9uUm93cy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRpb25Sb3dzLmRldGFjaCgpO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgcm93cyBmcm9tIHRoZSBkaXNwbGF5ZWRSb3dzIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2Rpc3BsYXllZFJvd3MubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXllZFJvd3MuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICBpZiAodmlld0NoYW5nZSA9PT0gRGF0YWdyaWREaXNwbGF5TW9kZS5ESVNQTEFZKSB7XG4gICAgICAgIC8vIFNldCBzdGF0ZSwgc3R5bGUgZm9yIHRoZSBkYXRhZ3JpZCB0byBESVNQTEFZIGFuZCBpbnNlcnQgcm93ICYgY29sdW1ucyBpbnRvIGNvbnRhaW5lcnNcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1jYWxjdWxhdGUtbW9kZScpO1xuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIHRoaXMuX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zLmluc2VydChjb2x1bW4uX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICB0aGlzLl9kaXNwbGF5ZWRSb3dzLmluc2VydChyb3cuX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNldCBzdGF0ZSwgc3R5bGUgZm9yIHRoZSBkYXRhZ3JpZCB0byBDQUxDVUxBVEUgYW5kIGluc2VydCByb3cgJiBjb2x1bW5zIGludG8gY29udGFpbmVyc1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLWNhbGN1bGF0ZS1tb2RlJyk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgdGhpcy5fcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zLmluc2VydChjb2x1bW4uX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICB0aGlzLl9jYWxjdWxhdGlvblJvd3MuaW5zZXJ0KHJvdy5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlcyBhbmQgcXVlcmllcyBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9yZ2FuaXplci5yZXNpemUoKTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3Byb2plY3RlZERpc3BsYXlDb2x1bW5zJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9wcm9qZWN0ZWREaXNwbGF5Q29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgncHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2Rpc3BsYXllZFJvd3MnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX2Rpc3BsYXllZFJvd3M6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NhbGN1bGF0aW9uUm93cycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfY2FsY3VsYXRpb25Sb3dzOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19