import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { DateNavigationService } from './providers/date-navigation.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ViewManagerService } from './providers/view-manager.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrDaypicker = /** @class */ (function () {
    function ClrDaypicker(_viewManagerService, _dateNavigationService, _localeHelperService, commonStrings) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
        this.commonStrings = commonStrings;
    }
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     */
    ClrDaypicker.prototype.changeToMonthView = function () {
        this._viewManagerService.changeToMonthView();
    };
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     */
    ClrDaypicker.prototype.changeToYearView = function () {
        this._viewManagerService.changeToYearView();
    };
    Object.defineProperty(ClrDaypicker.prototype, "calendarMonth", {
        /**
         * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
         */
        get: function () {
            return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "calendarYear", {
        /**
         * Returns the year value of the calendar.
         */
        get: function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the DateNavigationService to move to the next month.
     */
    ClrDaypicker.prototype.nextMonth = function () {
        this._dateNavigationService.moveToNextMonth();
    };
    /**
     * Calls the DateNavigationService to move to the previous month.
     */
    ClrDaypicker.prototype.previousMonth = function () {
        this._dateNavigationService.moveToPreviousMonth();
    };
    /**
     * Calls the DateNavigationService to move to the current month.
     */
    ClrDaypicker.prototype.currentMonth = function () {
        this._dateNavigationService.moveToCurrentMonth();
    };
    ClrDaypicker = tslib_1.__decorate([
        Component({ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div class=\"calendar-pickers\">\n        <button class=\"calendar-btn monthpicker-trigger\" type=\"button\" (click)=\"changeToMonthView()\">\n            {{calendarMonth}}\n        </button>\n        <button class=\"calendar-btn yearpicker-trigger\" type=\"button\" (click)=\"changeToYearView()\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"previousMonth()\">\n            <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"currentMonth()\">\n            <clr-icon shape=\"event\" [attr.title]=\"commonStrings.current\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"nextMonth()\">\n            <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } }),
        tslib_1.__metadata("design:paramtypes", [ViewManagerService,
            DateNavigationService,
            LocaleHelperService,
            ClrCommonStrings])
    ], ClrDaypicker);
    return ClrDaypicker;
}());
export { ClrDaypicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5cGlja2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9kYXlwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRzdFO0lBQ0Usc0JBQ1UsbUJBQXVDLEVBQ3ZDLHNCQUE2QyxFQUM3QyxvQkFBeUMsRUFDMUMsYUFBK0I7UUFIOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDMUMsa0JBQWEsR0FBYixhQUFhLENBQWtCO0lBQ3JDLENBQUM7SUFFSjs7T0FFRztJQUNILHdDQUFpQixHQUFqQjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNILHVDQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFLRCxzQkFBSSx1Q0FBYTtRQUhqQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hILENBQUM7OztPQUFBO0lBS0Qsc0JBQUksc0NBQVk7UUFIaEI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUM1RCxDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0gsZ0NBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUNBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUF2RFUsWUFBWTtRQUR4QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLDBtQ0FBK0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2lEQUdoRixrQkFBa0I7WUFDZixxQkFBcUI7WUFDdkIsbUJBQW1CO1lBQzNCLGdCQUFnQjtPQUw3QixZQUFZLENBd0R4QjtJQUFELG1CQUFDO0NBQUEsQUF4REQsSUF3REM7U0F4RFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZpZXctbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoeyBzZWxlY3RvcjogJ2Nsci1kYXlwaWNrZXInLCB0ZW1wbGF0ZVVybDogJy4vZGF5cGlja2VyLmh0bWwnLCBob3N0OiB7ICdbY2xhc3MuZGF5cGlja2VyXSc6ICd0cnVlJyB9IH0pXG5leHBvcnQgY2xhc3MgQ2xyRGF5cGlja2VyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdmlld01hbmFnZXJTZXJ2aWNlOiBWaWV3TWFuYWdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfbG9jYWxlSGVscGVyU2VydmljZTogTG9jYWxlSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHt9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBWaWV3TWFuYWdlclNlcnZpY2UgdG8gY2hhbmdlIHRvIHRoZSBtb250aHBpY2tlciB2aWV3LlxuICAgKi9cbiAgY2hhbmdlVG9Nb250aFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmNoYW5nZVRvTW9udGhWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIFZpZXdNYW5hZ2VyU2VydmljZSB0byBjaGFuZ2UgdG8gdGhlIHllYXJwaWNrZXIgdmlldy5cbiAgICovXG4gIGNoYW5nZVRvWWVhclZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmNoYW5nZVRvWWVhclZpZXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBtb250aCB2YWx1ZSBvZiB0aGUgY2FsZW5kYXIgaW4gdGhlIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWQgZm9ybWF0LlxuICAgKi9cbiAgZ2V0IGNhbGVuZGFyTW9udGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlSGVscGVyU2VydmljZS5sb2NhbGVNb250aHNBYmJyZXZpYXRlZFt0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheWVkQ2FsZW5kYXIubW9udGhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHllYXIgdmFsdWUgb2YgdGhlIGNhbGVuZGFyLlxuICAgKi9cbiAgZ2V0IGNhbGVuZGFyWWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheWVkQ2FsZW5kYXIueWVhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHRvIG1vdmUgdG8gdGhlIG5leHQgbW9udGguXG4gICAqL1xuICBuZXh0TW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLm1vdmVUb05leHRNb250aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBEYXRlTmF2aWdhdGlvblNlcnZpY2UgdG8gbW92ZSB0byB0aGUgcHJldmlvdXMgbW9udGguXG4gICAqL1xuICBwcmV2aW91c01vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5tb3ZlVG9QcmV2aW91c01vbnRoKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZSB0byBtb3ZlIHRvIHRoZSBjdXJyZW50IG1vbnRoLlxuICAgKi9cbiAgY3VycmVudE1vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5tb3ZlVG9DdXJyZW50TW9udGgoKTtcbiAgfVxufVxuIl19