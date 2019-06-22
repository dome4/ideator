/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CalendarModel } from './calendar.model';
var DayModel = /** @class */ (function () {
    function DayModel(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    Object.defineProperty(DayModel.prototype, "calendar", {
        /**
         * Returns the Calendar for the current DayModel.
         */
        get: function () {
            return new CalendarModel(this.year, this.month);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if the passed CalendarDate is equal to itself.
     */
    DayModel.prototype.isEqual = function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    };
    /**
     * Converts the CalendarDate into the Javascript Date object.
     */
    DayModel.prototype.toDate = function () {
        return new Date(this.year, this.month, this.date);
    };
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     */
    DayModel.prototype.incrementBy = function (value) {
        // Creating new Javascript Date object to increment because
        // it will automatically take care of switching to next or previous
        // months & years without we having to worry about it.
        var date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    };
    /**
     * Clones the current day model.
     */
    DayModel.prototype.clone = function () {
        return new DayModel(this.year, this.month, this.date);
    };
    return DayModel;
}());
export { DayModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9tb2RlbC9kYXkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDtJQUNFLGtCQUE0QixJQUFZLEVBQWtCLEtBQWEsRUFBa0IsSUFBWTtRQUF6RSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQWtCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBa0IsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFLekcsc0JBQUksOEJBQVE7UUFIWjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0gsMEJBQU8sR0FBUCxVQUFRLEdBQWE7UUFDbkIsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3JGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCx5QkFBTSxHQUFOO1FBQ0UsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNILDhCQUFXLEdBQVgsVUFBWSxLQUFhO1FBQ3ZCLDJEQUEyRDtRQUMzRCxtRUFBbUU7UUFDbkUsc0RBQXNEO1FBQ3RELElBQU0sSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3QkFBSyxHQUFMO1FBQ0UsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ2FsZW5kYXJNb2RlbCB9IGZyb20gJy4vY2FsZW5kYXIubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgRGF5TW9kZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgeWVhcjogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgbW9udGg6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IGRhdGU6IG51bWJlcikge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgQ2FsZW5kYXIgZm9yIHRoZSBjdXJyZW50IERheU1vZGVsLlxuICAgKi9cbiAgZ2V0IGNhbGVuZGFyKCk6IENhbGVuZGFyTW9kZWwge1xuICAgIHJldHVybiBuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLnllYXIsIHRoaXMubW9udGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgcGFzc2VkIENhbGVuZGFyRGF0ZSBpcyBlcXVhbCB0byBpdHNlbGYuXG4gICAqL1xuICBpc0VxdWFsKGRheTogRGF5TW9kZWwpIHtcbiAgICBpZiAoZGF5KSB7XG4gICAgICByZXR1cm4gdGhpcy55ZWFyID09PSBkYXkueWVhciAmJiB0aGlzLm1vbnRoID09PSBkYXkubW9udGggJiYgdGhpcy5kYXRlID09PSBkYXkuZGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBDYWxlbmRhckRhdGUgaW50byB0aGUgSmF2YXNjcmlwdCBEYXRlIG9iamVjdC5cbiAgICovXG4gIHRvRGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgRGF5TW9kZWwgd2hpY2ggaXMgaW5jcmVtZW50ZWQgYmFzZWQgb24gdGhlIHZhbHVlIHBhc3NlZC5cbiAgICovXG4gIGluY3JlbWVudEJ5KHZhbHVlOiBudW1iZXIpOiBEYXlNb2RlbCB7XG4gICAgLy8gQ3JlYXRpbmcgbmV3IEphdmFzY3JpcHQgRGF0ZSBvYmplY3QgdG8gaW5jcmVtZW50IGJlY2F1c2VcbiAgICAvLyBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgdGFrZSBjYXJlIG9mIHN3aXRjaGluZyB0byBuZXh0IG9yIHByZXZpb3VzXG4gICAgLy8gbW9udGhzICYgeWVhcnMgd2l0aG91dCB3ZSBoYXZpbmcgdG8gd29ycnkgYWJvdXQgaXQuXG4gICAgY29uc3QgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXRlICsgdmFsdWUpO1xuICAgIHJldHVybiBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIGN1cnJlbnQgZGF5IG1vZGVsLlxuICAgKi9cbiAgY2xvbmUoKTogRGF5TW9kZWwge1xuICAgIHJldHVybiBuZXcgRGF5TW9kZWwodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRhdGUpO1xuICB9XG59XG4iXX0=