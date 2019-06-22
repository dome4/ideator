/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CalendarModel } from './calendar.model';
export class DayModel {
    constructor(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    /**
     * Returns the Calendar for the current DayModel.
     */
    get calendar() {
        return new CalendarModel(this.year, this.month);
    }
    /**
     * Checks if the passed CalendarDate is equal to itself.
     */
    isEqual(day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    }
    /**
     * Converts the CalendarDate into the Javascript Date object.
     */
    toDate() {
        return new Date(this.year, this.month, this.date);
    }
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     */
    incrementBy(value) {
        // Creating new Javascript Date object to increment because
        // it will automatically take care of switching to next or previous
        // months & years without we having to worry about it.
        const date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    }
    /**
     * Clones the current day model.
     */
    clone() {
        return new DayModel(this.year, this.month, this.date);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9tb2RlbC9kYXkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLE9BQU8sUUFBUTtJQUNuQixZQUE0QixJQUFZLEVBQWtCLEtBQWEsRUFBa0IsSUFBWTtRQUF6RSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQWtCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBa0IsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFFekc7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxHQUFhO1FBQ25CLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztTQUNyRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBYTtRQUN2QiwyREFBMkQ7UUFDM0QsbUVBQW1FO1FBQ25FLHNEQUFzRDtRQUN0RCxNQUFNLElBQUksR0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN0RSxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENhbGVuZGFyTW9kZWwgfSBmcm9tICcuL2NhbGVuZGFyLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIERheU1vZGVsIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHllYXI6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IG1vbnRoOiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBkYXRlOiBudW1iZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIENhbGVuZGFyIGZvciB0aGUgY3VycmVudCBEYXlNb2RlbC5cbiAgICovXG4gIGdldCBjYWxlbmRhcigpOiBDYWxlbmRhck1vZGVsIHtcbiAgICByZXR1cm4gbmV3IENhbGVuZGFyTW9kZWwodGhpcy55ZWFyLCB0aGlzLm1vbnRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBDYWxlbmRhckRhdGUgaXMgZXF1YWwgdG8gaXRzZWxmLlxuICAgKi9cbiAgaXNFcXVhbChkYXk6IERheU1vZGVsKSB7XG4gICAgaWYgKGRheSkge1xuICAgICAgcmV0dXJuIHRoaXMueWVhciA9PT0gZGF5LnllYXIgJiYgdGhpcy5tb250aCA9PT0gZGF5Lm1vbnRoICYmIHRoaXMuZGF0ZSA9PT0gZGF5LmRhdGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgQ2FsZW5kYXJEYXRlIGludG8gdGhlIEphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG4gICAqL1xuICB0b0RhdGUoKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IERheU1vZGVsIHdoaWNoIGlzIGluY3JlbWVudGVkIGJhc2VkIG9uIHRoZSB2YWx1ZSBwYXNzZWQuXG4gICAqL1xuICBpbmNyZW1lbnRCeSh2YWx1ZTogbnVtYmVyKTogRGF5TW9kZWwge1xuICAgIC8vIENyZWF0aW5nIG5ldyBKYXZhc2NyaXB0IERhdGUgb2JqZWN0IHRvIGluY3JlbWVudCBiZWNhdXNlXG4gICAgLy8gaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHRha2UgY2FyZSBvZiBzd2l0Y2hpbmcgdG8gbmV4dCBvciBwcmV2aW91c1xuICAgIC8vIG1vbnRocyAmIHllYXJzIHdpdGhvdXQgd2UgaGF2aW5nIHRvIHdvcnJ5IGFib3V0IGl0LlxuICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuZGF0ZSArIHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IERheU1vZGVsKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmVzIHRoZSBjdXJyZW50IGRheSBtb2RlbC5cbiAgICovXG4gIGNsb25lKCk6IERheU1vZGVsIHtcbiAgICByZXR1cm4gbmV3IERheU1vZGVsKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXRlKTtcbiAgfVxufVxuIl19