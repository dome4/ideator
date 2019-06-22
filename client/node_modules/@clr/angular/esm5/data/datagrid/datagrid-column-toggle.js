import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
var ClrDatagridColumnToggle = /** @class */ (function () {
    function ClrDatagridColumnToggle(commonStrings, columnsService) {
        this.commonStrings = commonStrings;
        this.columnsService = columnsService;
        /***
         * Popover init
         */
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
    }
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "hideableColumnStates", {
        get: function () {
            var hideables = this.columnsService.columns.filter(function (column) { return column.value.hideable; });
            return hideables.map(function (column) { return column.value; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "hasOnlyOneVisibleColumn", {
        get: function () {
            var nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
            // this should only return true when there is no non-hideable columns.
            return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter(function (columnState) { return !columnState.hidden; }).length === 1);
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumnToggle.prototype.toggleColumnState = function (columnState, event) {
        var columnToToggle = this.columnsService.columns.filter(function (column) { return column.value === columnState; })[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    };
    ClrDatagridColumnToggle.prototype.toggleSwitchPanel = function () {
        this.open = !this.open;
    };
    tslib_1.__decorate([
        ContentChild(ClrDatagridColumnToggleTitle, { static: false }),
        tslib_1.__metadata("design:type", ClrDatagridColumnToggleTitle)
    ], ClrDatagridColumnToggle.prototype, "customToggleTitle", void 0);
    tslib_1.__decorate([
        ContentChild(ClrDatagridColumnToggleButton, { static: false }),
        tslib_1.__metadata("design:type", ClrDatagridColumnToggleButton)
    ], ClrDatagridColumnToggle.prototype, "customToggleButton", void 0);
    ClrDatagridColumnToggle = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-column-toggle',
            template: "\n    <button\n      #anchor\n      (click)=\"toggleSwitchPanel()\"\n      class=\"btn btn-sm btn-link column-toggle--action\"\n      type=\"button\">\n      <clr-icon shape=\"view-columns\" [attr.title]=\"commonStrings.pickColumns\"></clr-icon>\n    </button>\n    <div class=\"column-switch\"\n         *clrPopoverOld=\"open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint\">\n      <div class=\"switch-header\">\n        <ng-container *ngIf=\"!customToggleTitle\">{{commonStrings.showColumns}}</ng-container>\n        <ng-content select=\"clr-dg-column-toggle-title\"></ng-content>\n        <button\n          class=\"btn btn-sm btn-link toggle-switch-close-button\"\n          (click)=\"toggleSwitchPanel()\"\n          type=\"button\">\n          <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n        </button>\n      </div>\n      <ul class=\"switch-content list-unstyled\">\n        <li *ngFor=\"let columnState of hideableColumnStates;\">\n          <clr-checkbox-wrapper>\n            <input clrCheckbox type=\"checkbox\"\n                   [disabled]=\"hasOnlyOneVisibleColumn && !columnState.hidden\"\n                   [ngModel]=\"!columnState.hidden\"\n                   (ngModelChange)=\"toggleColumnState(columnState, !$event)\">\n            <label>\n              <ng-template [ngTemplateOutlet]=\"columnState.titleTemplateRef\"></ng-template>\n            </label>\n          </clr-checkbox-wrapper>\n        </li>\n      </ul>\n      <div class=\"switch-footer\">\n        <ng-content select=\"clr-dg-column-toggle-button\"></ng-content>\n        <clr-dg-column-toggle-button *ngIf=\"!customToggleButton\">{{commonStrings.selectAll}}</clr-dg-column-toggle-button>\n      </div>\n    </div>\n  ",
            host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
        })
        /** @deprecated since 2.0, remove in 3.0 */
        ,
        tslib_1.__metadata("design:paramtypes", [ClrCommonStrings, ColumnsService])
    ], ClrDatagridColumnToggle);
    return ClrDatagridColumnToggle;
}());
export { ClrDatagridColumnToggle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUE4Q3BFO0lBYUUsaUNBQW1CLGFBQStCLEVBQVUsY0FBOEI7UUFBdkUsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBWjFGOztXQUVHO1FBQ0ksZ0JBQVcsR0FBVSxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3BDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxTQUFJLEdBQVksS0FBSyxDQUFDO0lBT2dFLENBQUM7SUFFOUYsc0JBQUkseURBQW9CO2FBQXhCO1lBQ0UsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQXJCLENBQXFCLENBQUMsQ0FBQztZQUN0RixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxFQUFaLENBQVksQ0FBQyxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNERBQXVCO2FBQTNCO1lBQ0UsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztZQUNuRyxzRUFBc0U7WUFDdEUsT0FBTyxDQUNMLG9CQUFvQixLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFVBQUEsV0FBVyxJQUFJLE9BQUEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFuQixDQUFtQixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FDaEgsQ0FBQztRQUNKLENBQUM7OztPQUFBO0lBRUQsbURBQWlCLEdBQWpCLFVBQWtCLFdBQXdCLEVBQUUsS0FBYztRQUN4RCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxLQUFLLFdBQVcsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRTtZQUNsRCxNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsbURBQWlCLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQTdCRDtRQURDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FDM0MsNEJBQTRCO3NFQUFDO0lBRWhEO1FBREMsWUFBWSxDQUFDLDZCQUE2QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUMzQyw2QkFBNkI7dUVBQUM7SUFYdkMsdUJBQXVCO1FBNUNuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSx5dURBc0NUO1lBQ0QsSUFBSSxFQUFFLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTtTQUM1RSxDQUFDO1FBQ0YsMkNBQTJDOztpREFjUCxnQkFBZ0IsRUFBMEIsY0FBYztPQWIvRSx1QkFBdUIsQ0F1Q25DO0lBQUQsOEJBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXZDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbiB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS1idXR0b24nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZSB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS10aXRsZSc7XG5cbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4tdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uXG4gICAgICAjYW5jaG9yXG4gICAgICAoY2xpY2spPVwidG9nZ2xlU3dpdGNoUGFuZWwoKVwiXG4gICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgY29sdW1uLXRvZ2dsZS0tYWN0aW9uXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgIDxjbHItaWNvbiBzaGFwZT1cInZpZXctY29sdW1uc1wiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MucGlja0NvbHVtbnNcIj48L2Nsci1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tc3dpdGNoXCJcbiAgICAgICAgICpjbHJQb3BvdmVyT2xkPVwib3BlbjsgYW5jaG9yOiBhbmNob3I7IGFuY2hvclBvaW50OiBhbmNob3JQb2ludDsgcG9wb3ZlclBvaW50OiBwb3BvdmVyUG9pbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtaGVhZGVyXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY3VzdG9tVG9nZ2xlVGl0bGVcIj57e2NvbW1vblN0cmluZ3Muc2hvd0NvbHVtbnN9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayB0b2dnbGUtc3dpdGNoLWNsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVN3aXRjaFBhbmVsKClcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHVsIGNsYXNzPVwic3dpdGNoLWNvbnRlbnQgbGlzdC11bnN0eWxlZFwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNvbHVtblN0YXRlIG9mIGhpZGVhYmxlQ29sdW1uU3RhdGVzO1wiPlxuICAgICAgICAgIDxjbHItY2hlY2tib3gtd3JhcHBlcj5cbiAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJoYXNPbmx5T25lVmlzaWJsZUNvbHVtbiAmJiAhY29sdW1uU3RhdGUuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCIhY29sdW1uU3RhdGUuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ0b2dnbGVDb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZSwgISRldmVudClcIj5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtblN0YXRlLnRpdGxlVGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Nsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbiAqbmdJZj1cIiFjdXN0b21Ub2dnbGVCdXR0b25cIj57e2NvbW1vblN0cmluZ3Muc2VsZWN0QWxsfX08L2Nsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7ICdbY2xhc3MuY29sdW1uLXN3aXRjaC13cmFwcGVyXSc6ICd0cnVlJywgJ1tjbGFzcy5hY3RpdmVdJzogJ29wZW4nIH0sXG59KVxuLyoqIEBkZXByZWNhdGVkIHNpbmNlIDIuMCwgcmVtb3ZlIGluIDMuMCAqL1xuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIHtcbiAgLyoqKlxuICAgKiBQb3BvdmVyIGluaXRcbiAgICovXG4gIHB1YmxpYyBhbmNob3JQb2ludDogUG9pbnQgPSBQb2ludC5UT1BfTEVGVDtcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgcHVibGljIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBjdXN0b21Ub2dnbGVUaXRsZTogQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZTtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1c3RvbVRvZ2dsZUJ1dHRvbjogQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b247XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MsIHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlKSB7fVxuXG4gIGdldCBoaWRlYWJsZUNvbHVtblN0YXRlcygpOiBDb2x1bW5TdGF0ZVtdIHtcbiAgICBjb25zdCBoaWRlYWJsZXMgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUuaGlkZWFibGUpO1xuICAgIHJldHVybiBoaWRlYWJsZXMubWFwKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUpO1xuICB9XG5cbiAgZ2V0IGhhc09ubHlPbmVWaXNpYmxlQ29sdW1uKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5iTm9uSGlkZWFibGVDb2x1bW5zID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmxlbmd0aCAtIHRoaXMuaGlkZWFibGVDb2x1bW5TdGF0ZXMubGVuZ3RoO1xuICAgIC8vIHRoaXMgc2hvdWxkIG9ubHkgcmV0dXJuIHRydWUgd2hlbiB0aGVyZSBpcyBubyBub24taGlkZWFibGUgY29sdW1ucy5cbiAgICByZXR1cm4gKFxuICAgICAgbmJOb25IaWRlYWJsZUNvbHVtbnMgPT09IDAgJiYgdGhpcy5oaWRlYWJsZUNvbHVtblN0YXRlcy5maWx0ZXIoY29sdW1uU3RhdGUgPT4gIWNvbHVtblN0YXRlLmhpZGRlbikubGVuZ3RoID09PSAxXG4gICAgKTtcbiAgfVxuXG4gIHRvZ2dsZUNvbHVtblN0YXRlKGNvbHVtblN0YXRlOiBDb2x1bW5TdGF0ZSwgZXZlbnQ6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjb2x1bW5Ub1RvZ2dsZSA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5maWx0ZXIoY29sdW1uID0+IGNvbHVtbi52YWx1ZSA9PT0gY29sdW1uU3RhdGUpWzBdO1xuICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuZW1pdFN0YXRlQ2hhbmdlKGNvbHVtblRvVG9nZ2xlLCB7XG4gICAgICBoaWRkZW46IGV2ZW50LFxuICAgICAgY2hhbmdlczogW0RhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU5dLFxuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlU3dpdGNoUGFuZWwoKSB7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgfVxufVxuIl19