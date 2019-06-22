/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarModel } from '../model/calendar.model';
import { DayModel } from '../model/day.model';
/**
 * This service is responsible for:
 * 1. Initializing the displayed calendar.
 * 2. Moving the calendar to the next, previous or current months
 * 3. Managing the focused and selected day models.
 */
var DateNavigationService = /** @class */ (function () {
    function DateNavigationService() {
        /**
         * Variable to store today's date.
         */
        this._todaysFullDate = new Date();
        this._selectedDayChange = new Subject();
        this._displayedCalendarChange = new Subject();
        this._focusOnCalendarChange = new Subject();
        this._focusedDayChange = new Subject();
    }
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendar", {
        get: function () {
            return this._displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    // not a setter because i want this to remain private
    DateNavigationService.prototype.setDisplayedCalendar = function (value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    };
    DateNavigationService.prototype.initializeTodaysDate = function () {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    };
    Object.defineProperty(DateNavigationService.prototype, "today", {
        get: function () {
            return this._today;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "selectedDayChange", {
        get: function () {
            return this._selectedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     */
    DateNavigationService.prototype.notifySelectedDayChanged = function (dayModel) {
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    };
    /**
     * Initializes the calendar based on the selected day.
     */
    DateNavigationService.prototype.initializeCalendar = function () {
        this.focusedDay = null; // Can be removed later on the store focus
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    };
    DateNavigationService.prototype.changeMonth = function (month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    };
    DateNavigationService.prototype.changeYear = function (year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    };
    /**
     * Moves the displayed calendar to the next month.
     */
    DateNavigationService.prototype.moveToNextMonth = function () {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    };
    /**
     * Moves the displayed calendar to the previous month.
     */
    DateNavigationService.prototype.moveToPreviousMonth = function () {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    };
    /**
     * Moves the displayed calendar to the current month and year.
     */
    DateNavigationService.prototype.moveToCurrentMonth = function () {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    };
    DateNavigationService.prototype.incrementFocusDay = function (value) {
        this.focusedDay = this.focusedDay.incrementBy(value);
        if (this._displayedCalendar.isDayInCalendar(this.focusedDay)) {
            this._focusedDayChange.next(this.focusedDay);
        }
        else {
            this.setDisplayedCalendar(this.focusedDay.calendar);
        }
        this._focusOnCalendarChange.next();
    };
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendarChange", {
        /**
         * This observable lets the subscriber know that the displayed calendar has changed.
         */
        get: function () {
            return this._displayedCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusOnCalendarChange", {
        /**
         * This observable lets the subscriber know that the focus should be applied on the calendar.
         */
        get: function () {
            return this._focusOnCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusedDayChange", {
        /**
         * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
         */
        get: function () {
            return this._focusedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateNavigationService = tslib_1.__decorate([
        Injectable()
    ], DateNavigationService);
    return DateNavigationService;
}());
export { DateNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlDOzs7OztHQUtHO0FBRUg7SUFEQTtRQWdCRTs7V0FFRztRQUNLLG9CQUFlLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQWtCbkMsdUJBQWtCLEdBQXNCLElBQUksT0FBTyxFQUFZLENBQUM7UUF3RWhFLDZCQUF3QixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzlELDJCQUFzQixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzVELHNCQUFpQixHQUFzQixJQUFJLE9BQU8sRUFBWSxDQUFDO0lBUXpFLENBQUM7SUFuSUMsc0JBQUksb0RBQWlCO2FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFRCxxREFBcUQ7SUFDN0Msb0RBQW9CLEdBQTVCLFVBQTZCLEtBQW9CO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQVFPLG9EQUFvQixHQUE1QjtRQUNFLElB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QyxFQUFFO1lBQzVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBT0Qsc0JBQUksMERBQXVCO1FBSDNCOztXQUVHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0RCxDQUFDOzs7T0FBQTtJQU9ELHNCQUFJLHdEQUFxQjtRQUh6Qjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSxtREFBZ0I7UUFIcEI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBcklVLHFCQUFxQjtRQURqQyxVQUFVLEVBQUU7T0FDQSxxQkFBcUIsQ0FzSWpDO0lBQUQsNEJBQUM7Q0FBQSxBQXRJRCxJQXNJQztTQXRJWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhbGVuZGFyTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9jYWxlbmRhci5tb2RlbCc7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4uL21vZGVsL2RheS5tb2RlbCc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGlzIHJlc3BvbnNpYmxlIGZvcjpcbiAqIDEuIEluaXRpYWxpemluZyB0aGUgZGlzcGxheWVkIGNhbGVuZGFyLlxuICogMi4gTW92aW5nIHRoZSBjYWxlbmRhciB0byB0aGUgbmV4dCwgcHJldmlvdXMgb3IgY3VycmVudCBtb250aHNcbiAqIDMuIE1hbmFnaW5nIHRoZSBmb2N1c2VkIGFuZCBzZWxlY3RlZCBkYXkgbW9kZWxzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZGlzcGxheWVkQ2FsZW5kYXI6IENhbGVuZGFyTW9kZWw7XG5cbiAgZ2V0IGRpc3BsYXllZENhbGVuZGFyKCk6IENhbGVuZGFyTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhcjtcbiAgfVxuXG4gIC8vIG5vdCBhIHNldHRlciBiZWNhdXNlIGkgd2FudCB0aGlzIHRvIHJlbWFpbiBwcml2YXRlXG4gIHByaXZhdGUgc2V0RGlzcGxheWVkQ2FsZW5kYXIodmFsdWU6IENhbGVuZGFyTW9kZWwpIHtcbiAgICBpZiAoIXRoaXMuX2Rpc3BsYXllZENhbGVuZGFyLmlzRXF1YWwodmFsdWUpKSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhciA9IHZhbHVlO1xuICAgICAgdGhpcy5fZGlzcGxheWVkQ2FsZW5kYXJDaGFuZ2UubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYXJpYWJsZSB0byBzdG9yZSB0b2RheSdzIGRhdGUuXG4gICAqL1xuICBwcml2YXRlIF90b2RheXNGdWxsRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHByaXZhdGUgX3RvZGF5OiBEYXlNb2RlbDtcblxuICBwcml2YXRlIGluaXRpYWxpemVUb2RheXNEYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3RvZGF5c0Z1bGxEYXRlID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLl90b2RheSA9IG5ldyBEYXlNb2RlbChcbiAgICAgIHRoaXMuX3RvZGF5c0Z1bGxEYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICB0aGlzLl90b2RheXNGdWxsRGF0ZS5nZXRNb250aCgpLFxuICAgICAgdGhpcy5fdG9kYXlzRnVsbERhdGUuZ2V0RGF0ZSgpXG4gICAgKTtcbiAgfVxuXG4gIGdldCB0b2RheSgpOiBEYXlNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZGF5O1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGVkRGF5OiBEYXlNb2RlbDtcblxuICBwcml2YXRlIF9zZWxlY3RlZERheUNoYW5nZTogU3ViamVjdDxEYXlNb2RlbD4gPSBuZXcgU3ViamVjdDxEYXlNb2RlbD4oKTtcblxuICBnZXQgc2VsZWN0ZWREYXlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxEYXlNb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZERheUNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB0aGF0IHRoZSBzZWxlY3RlZCBkYXkgaGFzIGNoYW5nZWQgc28gdGhhdCB0aGUgZGF0ZSBjYW4gYmUgZW1pdHRlZCB0byB0aGUgdXNlci5cbiAgICogTm90ZTogT25seSB0byBiZSBjYWxsZWQgZnJvbSBkYXkudHNcbiAgICovXG4gIG5vdGlmeVNlbGVjdGVkRGF5Q2hhbmdlZChkYXlNb2RlbDogRGF5TW9kZWwpIHtcbiAgICB0aGlzLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgdGhpcy5fc2VsZWN0ZWREYXlDaGFuZ2UubmV4dChkYXlNb2RlbCk7XG4gIH1cblxuICBwdWJsaWMgZm9jdXNlZERheTogRGF5TW9kZWw7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjYWxlbmRhciBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgZGF5LlxuICAgKi9cbiAgaW5pdGlhbGl6ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNlZERheSA9IG51bGw7IC8vIENhbiBiZSByZW1vdmVkIGxhdGVyIG9uIHRoZSBzdG9yZSBmb2N1c1xuICAgIHRoaXMuaW5pdGlhbGl6ZVRvZGF5c0RhdGUoKTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZERheSkge1xuICAgICAgdGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLnNlbGVjdGVkRGF5LnllYXIsIHRoaXMuc2VsZWN0ZWREYXkubW9udGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhciA9IG5ldyBDYWxlbmRhck1vZGVsKHRoaXMudG9kYXkueWVhciwgdGhpcy50b2RheS5tb250aCk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIobmV3IENhbGVuZGFyTW9kZWwodGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIueWVhciwgbW9udGgpKTtcbiAgfVxuXG4gIGNoYW5nZVllYXIoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcihuZXcgQ2FsZW5kYXJNb2RlbCh5ZWFyLCB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5tb250aCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIgdG8gdGhlIG5leHQgbW9udGguXG4gICAqL1xuICBtb3ZlVG9OZXh0TW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcih0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5uZXh0TW9udGgoKSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIGRpc3BsYXllZCBjYWxlbmRhciB0byB0aGUgcHJldmlvdXMgbW9udGguXG4gICAqL1xuICBtb3ZlVG9QcmV2aW91c01vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIodGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIucHJldmlvdXNNb250aCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIHRvIHRoZSBjdXJyZW50IG1vbnRoIGFuZCB5ZWFyLlxuICAgKi9cbiAgbW92ZVRvQ3VycmVudE1vbnRoKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNwbGF5ZWRDYWxlbmRhci5pc0RheUluQ2FsZW5kYXIodGhpcy50b2RheSkpIHtcbiAgICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIobmV3IENhbGVuZGFyTW9kZWwodGhpcy50b2RheS55ZWFyLCB0aGlzLnRvZGF5Lm1vbnRoKSk7XG4gICAgfVxuICAgIHRoaXMuX2ZvY3VzT25DYWxlbmRhckNoYW5nZS5uZXh0KCk7XG4gIH1cblxuICBpbmNyZW1lbnRGb2N1c0RheSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkRGF5ID0gdGhpcy5mb2N1c2VkRGF5LmluY3JlbWVudEJ5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIuaXNEYXlJbkNhbGVuZGFyKHRoaXMuZm9jdXNlZERheSkpIHtcbiAgICAgIHRoaXMuX2ZvY3VzZWREYXlDaGFuZ2UubmV4dCh0aGlzLmZvY3VzZWREYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERpc3BsYXllZENhbGVuZGFyKHRoaXMuZm9jdXNlZERheS5jYWxlbmRhcik7XG4gICAgfVxuICAgIHRoaXMuX2ZvY3VzT25DYWxlbmRhckNoYW5nZS5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNwbGF5ZWRDYWxlbmRhckNoYW5nZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgb2JzZXJ2YWJsZSBsZXRzIHRoZSBzdWJzY3JpYmVyIGtub3cgdGhhdCB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgZ2V0IGRpc3BsYXllZENhbGVuZGFyQ2hhbmdlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhckNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZvY3VzT25DYWxlbmRhckNoYW5nZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgb2JzZXJ2YWJsZSBsZXRzIHRoZSBzdWJzY3JpYmVyIGtub3cgdGhhdCB0aGUgZm9jdXMgc2hvdWxkIGJlIGFwcGxpZWQgb24gdGhlIGNhbGVuZGFyLlxuICAgKi9cbiAgZ2V0IGZvY3VzT25DYWxlbmRhckNoYW5nZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNPbkNhbGVuZGFyQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9jdXNlZERheUNoYW5nZTogU3ViamVjdDxEYXlNb2RlbD4gPSBuZXcgU3ViamVjdDxEYXlNb2RlbD4oKTtcblxuICAvKipcbiAgICogVGhpcyBvYnNlcnZhYmxlIGxldHMgdGhlIHN1YnNjcmliZXIga25vdyB0aGF0IHRoZSBmb2N1c2VkIGRheSBpbiB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgZ2V0IGZvY3VzZWREYXlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxEYXlNb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkRGF5Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG4iXX0=