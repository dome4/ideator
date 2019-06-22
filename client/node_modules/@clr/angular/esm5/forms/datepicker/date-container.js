import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Optional, ContentChild } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrLabel } from '../common/label';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrDateContainer = /** @class */ (function () {
    function ClrDateContainer(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, ngControlService) {
        var _this = this;
        this._ifOpenService = _ifOpenService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.commonStrings = commonStrings;
        this.ifErrorService = ifErrorService;
        this.focusService = focusService;
        this.controlClassService = controlClassService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this._dynamic = false;
        this.invalid = false;
        this.focus = false;
        this.subscriptions = [];
        this.subscriptions.push(this._ifOpenService.openChange.subscribe(function (open) {
            if (open) {
                _this.initializeCalendar();
            }
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(function (state) {
            _this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    ClrDateContainer.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
    };
    /**
     * Returns the classes to apply to the control
     */
    ClrDateContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * Determines if the control needs to add grid classes
     */
    ClrDateContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrDateContainer.prototype, "isEnabled", {
        /**
         * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
         */
        get: function () {
            return this._datepickerEnabledService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    ClrDateContainer.prototype.initializeCalendar = function () {
        this._dateNavigationService.initializeCalendar();
    };
    /**
     * Toggles the Datepicker Popover.
     */
    ClrDateContainer.prototype.toggleDatepicker = function (event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    };
    /**
     * Unsubscribe from subscriptions.
     */
    ClrDateContainer.prototype.ngOnDestroy = function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        ContentChild(ClrLabel, { static: false }),
        tslib_1.__metadata("design:type", ClrLabel)
    ], ClrDateContainer.prototype, "label", void 0);
    ClrDateContainer = tslib_1.__decorate([
        Component({
            selector: 'clr-date-container',
            template: "\n      <ng-content select=\"label\"></ng-content>\n      <label *ngIf=\"!label && addGrid()\"></label>\n      <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n        <div class=\"clr-input-wrapper\">\n          <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n            <ng-content select=\"[clrDate]\"></ng-content>\n            <button type=\"button\" class=\"clr-input-group-icon-action\" (click)=\"toggleDatepicker($event)\" *ngIf=\"isEnabled\" [attr.title]=\"commonStrings.open\" [disabled]=\"control?.disabled\">\n              <clr-icon shape=\"calendar\"></clr-icon>\n            </button>\n            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>\n          </div>\n          <clr-icon class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n        </div>\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    ",
            providers: [
                ControlIdService,
                IfOpenService,
                LocaleHelperService,
                IfErrorService,
                ControlClassService,
                FocusService,
                NgControlService,
                DateIOService,
                DateNavigationService,
                DatepickerEnabledService,
                DateFormControlService,
            ],
            host: {
                '[class.clr-form-control-disabled]': 'control?.disabled',
                '[class.clr-form-control]': 'true',
                '[class.clr-row]': 'addGrid()',
            }
        }),
        tslib_1.__param(8, Optional()),
        tslib_1.__metadata("design:paramtypes", [IfOpenService,
            DateNavigationService,
            DatepickerEnabledService,
            DateFormControlService,
            ClrCommonStrings,
            IfErrorService,
            FocusService,
            ControlClassService,
            LayoutService,
            NgControlService])
    ], ClrDateContainer);
    return ClrDateContainer;
}());
export { ClrDateContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGUtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTdFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBeUM3RTtJQVVFLDBCQUNVLGNBQTZCLEVBQzdCLHNCQUE2QyxFQUM3Qyx5QkFBbUQsRUFDbkQsc0JBQThD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QUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBdkZEO1FBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FDbkMsUUFBUTttREFBQztJQU5MLGdCQUFnQjtRQXZDNUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsaWhDQWlCUDtZQUNILFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2IsbUJBQW1CO2dCQUNuQixjQUFjO2dCQUNkLG1CQUFtQjtnQkFDbkIsWUFBWTtnQkFDWixnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2IscUJBQXFCO2dCQUNyQix3QkFBd0I7Z0JBQ3hCLHNCQUFzQjthQUN2QjtZQUNELElBQUksRUFBRTtnQkFDSixtQ0FBbUMsRUFBRSxtQkFBbUI7Z0JBQ3hELDBCQUEwQixFQUFFLE1BQU07Z0JBQ2xDLGlCQUFpQixFQUFFLFdBQVc7YUFDL0I7U0FDRixDQUFDO1FBb0JHLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQVJhLGFBQWE7WUFDTCxxQkFBcUI7WUFDbEIsd0JBQXdCO1lBQzNCLHNCQUFzQjtZQUNoQyxnQkFBZ0I7WUFDZCxjQUFjO1lBQ2hCLFlBQVk7WUFDTCxtQkFBbUI7WUFDYixhQUFhO1lBQ3RCLGdCQUFnQjtPQXBCakMsZ0JBQWdCLENBOEY1QjtJQUFELHVCQUFDO0NBQUEsQUE5RkQsSUE4RkM7U0E5RlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwnO1xuXG5pbXBvcnQgeyBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlSU9TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZW5hYmxlZC5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsZUhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sb2NhbGUtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGUtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xyLWNvbnRyb2wtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwiY29udHJvbENsYXNzKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC13cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC1ncm91cFwiIFtjbGFzcy5jbHItZm9jdXNdPVwiZm9jdXNcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJEYXRlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xyLWlucHV0LWdyb3VwLWljb24tYWN0aW9uXCIgKGNsaWNrKT1cInRvZ2dsZURhdGVwaWNrZXIoJGV2ZW50KVwiICpuZ0lmPVwiaXNFbmFibGVkXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5vcGVuXCIgW2Rpc2FibGVkXT1cImNvbnRyb2w/LmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNhbGVuZGFyXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGNsci1kYXRlcGlja2VyLXZpZXctbWFuYWdlciAqY2xySWZPcGVuIGNsckZvY3VzVHJhcD48L2Nsci1kYXRlcGlja2VyLXZpZXctbWFuYWdlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Y2xyLWljb24gY2xhc3M9XCJjbHItdmFsaWRhdGUtaWNvblwiIHNoYXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWVycm9yXCIgKm5nSWY9XCJpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29udHJvbElkU2VydmljZSxcbiAgICBJZk9wZW5TZXJ2aWNlLFxuICAgIExvY2FsZUhlbHBlclNlcnZpY2UsXG4gICAgSWZFcnJvclNlcnZpY2UsXG4gICAgQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBGb2N1c1NlcnZpY2UsXG4gICAgTmdDb250cm9sU2VydmljZSxcbiAgICBEYXRlSU9TZXJ2aWNlLFxuICAgIERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UsXG4gICAgRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbC1kaXNhYmxlZF0nOiAnY29udHJvbD8uZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jbHItcm93XSc6ICdhZGRHcmlkKCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlQ29udGFpbmVyIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIsIE9uRGVzdHJveSB7XG4gIF9keW5hbWljOiBib29sZWFuID0gZmFsc2U7XG4gIGludmFsaWQgPSBmYWxzZTtcbiAgZm9jdXMgPSBmYWxzZTtcbiAgY29udHJvbDogTmdDb250cm9sO1xuICBAQ29udGVudENoaWxkKENsckxhYmVsLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgbGFiZWw6IENsckxhYmVsO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9pZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncyxcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5faWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShvcGVuID0+IHtcbiAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c0NoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzID0gc3RhdGU7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKGludmFsaWQgPT4ge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBpbnZhbGlkO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIGNvbnRyb2xcbiAgICovXG4gIGNvbnRyb2xDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmNvbnRyb2xDbGFzcyh0aGlzLmludmFsaWQsIHRoaXMuYWRkR3JpZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb250cm9sIG5lZWRzIHRvIGFkZCBncmlkIGNsYXNzZXNcbiAgICovXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHRoZSBEYXRlcGlja2VyIGlzIGVuYWJsZWQgb3Igbm90LiBJZiBkaXNhYmxlZCwgaGlkZXMgdGhlIGRhdGVwaWNrZXIgdHJpZ2dlci5cbiAgICovXG4gIGdldCBpc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIHRoZSB1c2VyIGlucHV0IGFuZCBJbml0aWFsaXplcyB0aGUgQ2FsZW5kYXIgZXZlcnl0aW1lIHRoZSBkYXRlcGlja2VyIHBvcG92ZXIgaXMgb3Blbi5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5pbml0aWFsaXplQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBEYXRlcGlja2VyIFBvcG92ZXIuXG4gICAqL1xuICB0b2dnbGVEYXRlcGlja2VyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5faWZPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS5tYXJrQXNUb3VjaGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSBzdWJzY3JpcHRpb25zLlxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=