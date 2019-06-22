import * as tslib_1 from "tslib";
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
var ClrDatagridFilter = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatagridFilter, _super);
    function ClrDatagridFilter(_filters, commonStrings) {
        var _this = _super.call(this, _filters) || this;
        _this.commonStrings = commonStrings;
        _this.anchorPoint = Point.RIGHT_BOTTOM;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        _this._open = false;
        _this.openChanged = new EventEmitter(false);
        return _this;
    }
    ClrDatagridFilter_1 = ClrDatagridFilter;
    Object.defineProperty(ClrDatagridFilter.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            var boolOpen = !!open;
            if (boolOpen !== this._open) {
                this._open = boolOpen;
                this.openChanged.emit(boolOpen);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "customFilter", {
        set: function (filter) {
            this.setFilter(filter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "active", {
        /**
         * Indicates if the filter is currently active
         */
        get: function () {
            return !!this.filter && this.filter.isActive();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows/hides the filter dropdown
     */
    ClrDatagridFilter.prototype.toggle = function () {
        this.open = !this.open;
    };
    var ClrDatagridFilter_1;
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
            template: "\n        <button #anchor \n                (click)=\"toggle()\"\n                class=\"datagrid-filter-toggle\"\n                [class.datagrid-filter-open]=\"open\" \n                [class.datagrid-filtered]=\"active\"\n                type=\"button\">\n            <clr-icon [attr.shape]=\"active ? 'filter-grid-circle': 'filter-grid'\" class=\"is-solid\"></clr-icon>\n        </button>\n\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n             [clrPopoverOldPopoverPoint]=\"popoverPoint\" [clrPopoverOldOptions]=\"popoverOptions\">\n            <div class=\"datagrid-filter\">\n                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->\n                <div class=\"datagrid-filter-close-wrapper\">\n                    <button type=\"button\" class=\"close\" (click)=\"open = false\">\n                        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                    </button>\n                </div>\n    \n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [FiltersProvider, ClrCommonStrings])
    ], ClrDatagridFilter);
    return ClrDatagridFilter;
}(DatagridFilterRegistrar));
export { ClrDatagridFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUlyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RTs7OztHQUlHO0FBOEJIO0lBQWdELDZDQUF5RDtJQUV2RywyQkFBWSxRQUE0QixFQUFTLGFBQStCO1FBQWhGLFlBQ0Usa0JBQU0sUUFBUSxDQUFDLFNBQ2hCO1FBRmdELG1CQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUl6RSxpQkFBVyxHQUFVLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDeEMsa0JBQVksR0FBVSxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3RDLG9CQUFjLEdBQW1CLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEU7O1dBRUc7UUFDSyxXQUFLLEdBQUcsS0FBSyxDQUFDO1FBY2tCLGlCQUFXLEdBQUcsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7O0lBdEJ2RixDQUFDOzBCQUpVLGlCQUFpQjtJQWE1QixzQkFBVyxtQ0FBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7YUFHRCxVQUFnQixJQUFhO1lBQzNCLElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQzs7O09BVEE7SUFjRCxzQkFBVywyQ0FBWTthQUF2QixVQUF3QixNQUEwRjtZQUNoSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcscUNBQU07UUFIakI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0ksa0NBQU0sR0FBYjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7O0lBM0JEO1FBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDOzs7aURBT3hCO0lBRWdDO1FBQWhDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzs7MERBQXVEO0lBR3ZGO1FBREMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7O3lEQUdwQjtJQS9CVSxpQkFBaUI7UUE3QjdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLG9GQUFvRjtZQUNwRixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFpQixFQUFFLENBQUM7WUFDdEUsUUFBUSxFQUFFLHNxQ0F1QlA7U0FDSixDQUFDO2lEQUdzQixlQUFlLEVBQTJCLGdCQUFnQjtPQUZyRSxpQkFBaUIsQ0E4QzdCO0lBQUQsd0JBQUM7Q0FBQSxBQTlDRCxDQUFnRCx1QkFBdUIsR0E4Q3RFO1NBOUNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5pbXBvcnQgeyBQb3BvdmVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXItb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbS1maWx0ZXInO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyLCBSZWdpc3RlcmVkRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4vdXRpbHMvZGF0YWdyaWQtZmlsdGVyLXJlZ2lzdHJhcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEN1c3RvbSBmaWx0ZXIgdGhhdCBjYW4gYmUgYWRkZWQgaW4gYW55IGNvbHVtbiB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvYmplY3QgcHJvcGVydHkgc3RyaW5nIGZpbHRlci5cbiAqIFRoZSByZWFzb24gdGhpcyBpcyBub3QganVzdCBhbiBpbnB1dCBvbiBEYXRhZ3JpZENvbHVtbiBpcyBiZWNhdXNlIHdlIG5lZWQgdGhlIGZpbHRlcidzIHRlbXBsYXRlIHRvIGJlIHByb2plY3RlZCxcbiAqIHNpbmNlIGl0IGNhbiBiZSBhbnl0aGluZyAobm90IGp1c3QgYSB0ZXh0IGlucHV0KS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWZpbHRlcicsXG4gIC8vIFdlIHJlZ2lzdGVyIHRoaXMgY29tcG9uZW50IGFzIGEgQ3VzdG9tRmlsdGVyLCBmb3IgdGhlIHBhcmVudCBjb2x1bW4gdG8gZGV0ZWN0IGl0LlxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEN1c3RvbUZpbHRlciwgdXNlRXhpc3Rpbmc6IENsckRhdGFncmlkRmlsdGVyIH1dLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uICNhbmNob3IgXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLWZpbHRlci10b2dnbGVcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5kYXRhZ3JpZC1maWx0ZXItb3Blbl09XCJvcGVuXCIgXG4gICAgICAgICAgICAgICAgW2NsYXNzLmRhdGFncmlkLWZpbHRlcmVkXT1cImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPGNsci1pY29uIFthdHRyLnNoYXBlXT1cImFjdGl2ZSA/ICdmaWx0ZXItZ3JpZC1jaXJjbGUnOiAnZmlsdGVyLWdyaWQnXCIgY2xhc3M9XCJpcy1zb2xpZFwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbKGNsclBvcG92ZXJPbGQpXT1cIm9wZW5cIiBbY2xyUG9wb3Zlck9sZEFuY2hvcl09XCJhbmNob3JcIiBbY2xyUG9wb3Zlck9sZEFuY2hvclBvaW50XT1cImFuY2hvclBvaW50XCJcbiAgICAgICAgICAgICBbY2xyUG9wb3Zlck9sZFBvcG92ZXJQb2ludF09XCJwb3BvdmVyUG9pbnRcIiBbY2xyUG9wb3Zlck9sZE9wdGlvbnNdPVwicG9wb3Zlck9wdGlvbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8IS0tIEZJWE1FOiB0aGlzIHdob2xlIGZpbHRlciBwYXJ0IG5lZWRzIGEgZmluYWwgZGVzaWduIGJlZm9yZSB3ZSBjYW4gdHJ5IHRvIGhhdmUgYSBjbGVhbmVyIERPTSAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLWNsb3NlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIChjbGljayk9XCJvcGVuID0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5jbG9zZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgIFxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkRmlsdGVyPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+XG4gIGltcGxlbWVudHMgQ3VzdG9tRmlsdGVyIHtcbiAgY29uc3RydWN0b3IoX2ZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPiwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHtcbiAgICBzdXBlcihfZmlsdGVycyk7XG4gIH1cblxuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuUklHSFRfQk9UVE9NO1xuICBwdWJsaWMgcG9wb3ZlclBvaW50OiBQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgcHVibGljIHBvcG92ZXJPcHRpb25zOiBQb3BvdmVyT3B0aW9ucyA9IHsgYWxsb3dNdWx0aXBsZU9wZW46IHRydWUgfTtcbiAgLyoqXG4gICAqIFRyYWNrcyB3aGV0aGVyIHRoZSBmaWx0ZXIgZHJvcGRvd24gaXMgb3BlbiBvciBub3RcbiAgICovXG4gIHByaXZhdGUgX29wZW4gPSBmYWxzZTtcbiAgcHVibGljIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9vcGVuO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0ZpbHRlck9wZW4nKVxuICBwdWJsaWMgc2V0IG9wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIGNvbnN0IGJvb2xPcGVuID0gISFvcGVuO1xuICAgIGlmIChib29sT3BlbiAhPT0gdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IGJvb2xPcGVuO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlZC5lbWl0KGJvb2xPcGVuKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0ZpbHRlck9wZW5DaGFuZ2UnKSBwdWJsaWMgb3BlbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NsckRnRmlsdGVyJylcbiAgcHVibGljIHNldCBjdXN0b21GaWx0ZXIoZmlsdGVyOiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPiB8IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+KSB7XG4gICAgdGhpcy5zZXRGaWx0ZXIoZmlsdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBpcyBjdXJyZW50bHkgYWN0aXZlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5pc0FjdGl2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzL2hpZGVzIHRoZSBmaWx0ZXIgZHJvcGRvd25cbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgfVxufVxuIl19