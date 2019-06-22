import * as tslib_1 from "tslib";
var ClrDatagridFilter_1;
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider } from './providers/filters';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
let ClrDatagridFilter = ClrDatagridFilter_1 = class ClrDatagridFilter extends DatagridFilterRegistrar {
    constructor(_filters, commonStrings) {
        super(_filters);
        this.commonStrings = commonStrings;
        this.anchorPoint = Point.RIGHT_BOTTOM;
        this.popoverPoint = Point.RIGHT_TOP;
        this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
    }
    get open() {
        return this._open;
    }
    set open(open) {
        const boolOpen = !!open;
        if (boolOpen !== this._open) {
            this._open = boolOpen;
            this.openChanged.emit(boolOpen);
        }
    }
    set customFilter(filter) {
        this.setFilter(filter);
    }
    /**
     * Indicates if the filter is currently active
     */
    get active() {
        return !!this.filter && this.filter.isActive();
    }
    /**
     * Shows/hides the filter dropdown
     */
    toggle() {
        this.open = !this.open;
    }
};
tslib_1.__decorate([
    Input('clrDgFilterOpen'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagridFilter.prototype, "open", null);
tslib_1.__decorate([
    Output('clrDgFilterOpenChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridFilter.prototype, "openChanged", void 0);
tslib_1.__decorate([
    Input('clrDgFilter'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagridFilter.prototype, "customFilter", null);
ClrDatagridFilter = ClrDatagridFilter_1 = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-filter',
        // We register this component as a CustomFilter, for the parent column to detect it.
        providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter_1 }],
        template: `
        <button #anchor 
                (click)="toggle()"
                class="datagrid-filter-toggle"
                [class.datagrid-filter-open]="open" 
                [class.datagrid-filtered]="active"
                type="button">
            <clr-icon [attr.shape]="active ? 'filter-grid-circle': 'filter-grid'" class="is-solid"></clr-icon>
        </button>

        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
             [clrPopoverOldPopoverPoint]="popoverPoint" [clrPopoverOldOptions]="popoverOptions">
            <div class="datagrid-filter">
                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->
                <div class="datagrid-filter-close-wrapper">
                    <button type="button" class="close" (click)="open = false">
                        <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
                    </button>
                </div>
    
                <ng-content></ng-content>
            </div>
        </ng-template>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [FiltersProvider, ClrCommonStrings])
], ClrDatagridFilter);
export { ClrDatagridFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFJckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQW9CLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0U7Ozs7R0FJRztBQThCSCxJQUFhLGlCQUFpQix5QkFBOUIsTUFBYSxpQkFBMkIsU0FBUSx1QkFBeUQ7SUFFdkcsWUFBWSxRQUE0QixFQUFTLGFBQStCO1FBQzlFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUQrQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFJekUsZ0JBQVcsR0FBVSxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3hDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxtQkFBYyxHQUFtQixFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3BFOztXQUVHO1FBQ0ssVUFBSyxHQUFHLEtBQUssQ0FBQztRQWNrQixnQkFBVyxHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBdEJ2RixDQUFDO0lBU0QsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFHRCxJQUFXLElBQUksQ0FBQyxJQUFhO1FBQzNCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFLRCxJQUFXLFlBQVksQ0FBQyxNQUEwRjtRQUNoSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsTUFBTTtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUE7QUE1QkM7SUFEQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Ozs2Q0FPeEI7QUFFZ0M7SUFBaEMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOztzREFBdUQ7QUFHdkY7SUFEQyxLQUFLLENBQUMsYUFBYSxDQUFDOzs7cURBR3BCO0FBL0JVLGlCQUFpQjtJQTdCN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGVBQWU7UUFDekIsb0ZBQW9GO1FBQ3BGLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQWlCLEVBQUUsQ0FBQztRQUN0RSxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJQO0tBQ0osQ0FBQzs2Q0FHc0IsZUFBZSxFQUEyQixnQkFBZ0I7R0FGckUsaUJBQWlCLENBOEM3QjtTQTlDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuaW1wb3J0IHsgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciwgUmVnaXN0ZXJlZEZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBDdXN0b20gZmlsdGVyIHRoYXQgY2FuIGJlIGFkZGVkIGluIGFueSBjb2x1bW4gdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb2JqZWN0IHByb3BlcnR5IHN0cmluZyBmaWx0ZXIuXG4gKiBUaGUgcmVhc29uIHRoaXMgaXMgbm90IGp1c3QgYW4gaW5wdXQgb24gRGF0YWdyaWRDb2x1bW4gaXMgYmVjYXVzZSB3ZSBuZWVkIHRoZSBmaWx0ZXIncyB0ZW1wbGF0ZSB0byBiZSBwcm9qZWN0ZWQsXG4gKiBzaW5jZSBpdCBjYW4gYmUgYW55dGhpbmcgKG5vdCBqdXN0IGEgdGV4dCBpbnB1dCkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1maWx0ZXInLFxuICAvLyBXZSByZWdpc3RlciB0aGlzIGNvbXBvbmVudCBhcyBhIEN1c3RvbUZpbHRlciwgZm9yIHRoZSBwYXJlbnQgY29sdW1uIHRvIGRldGVjdCBpdC5cbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDdXN0b21GaWx0ZXIsIHVzZUV4aXN0aW5nOiBDbHJEYXRhZ3JpZEZpbHRlciB9XSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiAjYW5jaG9yIFxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoKVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkYXRhZ3JpZC1maWx0ZXItdG9nZ2xlXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZGF0YWdyaWQtZmlsdGVyLW9wZW5dPVwib3BlblwiIFxuICAgICAgICAgICAgICAgIFtjbGFzcy5kYXRhZ3JpZC1maWx0ZXJlZF09XCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgIDxjbHItaWNvbiBbYXR0ci5zaGFwZV09XCJhY3RpdmUgPyAnZmlsdGVyLWdyaWQtY2lyY2xlJzogJ2ZpbHRlci1ncmlkJ1wiIGNsYXNzPVwiaXMtc29saWRcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgWyhjbHJQb3BvdmVyT2xkKV09XCJvcGVuXCIgW2NsclBvcG92ZXJPbGRBbmNob3JdPVwiYW5jaG9yXCIgW2NsclBvcG92ZXJPbGRBbmNob3JQb2ludF09XCJhbmNob3JQb2ludFwiXG4gICAgICAgICAgICAgW2NsclBvcG92ZXJPbGRQb3BvdmVyUG9pbnRdPVwicG9wb3ZlclBvaW50XCIgW2NsclBvcG92ZXJPbGRPcHRpb25zXT1cInBvcG92ZXJPcHRpb25zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPCEtLSBGSVhNRTogdGhpcyB3aG9sZSBmaWx0ZXIgcGFydCBuZWVkcyBhIGZpbmFsIGRlc2lnbiBiZWZvcmUgd2UgY2FuIHRyeSB0byBoYXZlIGEgY2xlYW5lciBET00gLS0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWZpbHRlci1jbG9zZS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiAoY2xpY2spPVwib3BlbiA9IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICBcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZEZpbHRlcjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PlxuICBpbXBsZW1lbnRzIEN1c3RvbUZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7XG4gICAgc3VwZXIoX2ZpbHRlcnMpO1xuICB9XG5cbiAgcHVibGljIGFuY2hvclBvaW50OiBQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5SSUdIVF9UT1A7XG4gIHB1YmxpYyBwb3BvdmVyT3B0aW9uczogUG9wb3Zlck9wdGlvbnMgPSB7IGFsbG93TXVsdGlwbGVPcGVuOiB0cnVlIH07XG4gIC8qKlxuICAgKiBUcmFja3Mgd2hldGhlciB0aGUgZmlsdGVyIGRyb3Bkb3duIGlzIG9wZW4gb3Igbm90XG4gICAqL1xuICBwcml2YXRlIF9vcGVuID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWx0ZXJPcGVuJylcbiAgcHVibGljIHNldCBvcGVuKG9wZW46IGJvb2xlYW4pIHtcbiAgICBjb25zdCBib29sT3BlbiA9ICEhb3BlbjtcbiAgICBpZiAoYm9vbE9wZW4gIT09IHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX29wZW4gPSBib29sT3BlbjtcbiAgICAgIHRoaXMub3BlbkNoYW5nZWQuZW1pdChib29sT3Blbik7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdGaWx0ZXJPcGVuQ2hhbmdlJykgcHVibGljIG9wZW5DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgQElucHV0KCdjbHJEZ0ZpbHRlcicpXG4gIHB1YmxpYyBzZXQgY3VzdG9tRmlsdGVyKGZpbHRlcjogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4gfCBSZWdpc3RlcmVkRmlsdGVyPFQsIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+Pikge1xuICAgIHRoaXMuc2V0RmlsdGVyKGZpbHRlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgaXMgY3VycmVudGx5IGFjdGl2ZVxuICAgKi9cbiAgcHVibGljIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIuaXNBY3RpdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cy9oaWRlcyB0aGUgZmlsdGVyIGRyb3Bkb3duXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==