import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrAlert } from './alert';
import { MultiAlertService } from './providers/multi-alert.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
let ClrAlertsPager = class ClrAlertsPager {
    constructor(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
    }
    /**
     * Input/Output to support two way binding on current alert instance
     */
    set currentAlert(alert) {
        if (alert) {
            this.multiAlertService.currentAlert = alert;
        }
    }
    get currentAlert() {
        return this.multiAlertService.currentAlert;
    }
    /**
     * Input/Output to support two way binding on current alert index
     */
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    ngOnInit() {
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.emit(index);
            this.currentAlertChange.emit(this.multiAlertService.activeAlerts[index]);
        });
    }
    pageUp() {
        this.multiAlertService.next();
    }
    pageDown() {
        this.multiAlertService.previous();
    }
    ngOnDestroy() {
        this.multiAlertServiceChanges.unsubscribe();
    }
};
tslib_1.__decorate([
    Input('clrCurrentAlert'),
    tslib_1.__metadata("design:type", ClrAlert),
    tslib_1.__metadata("design:paramtypes", [ClrAlert])
], ClrAlertsPager.prototype, "currentAlert", null);
tslib_1.__decorate([
    Output('clrCurrentAlertChange'),
    tslib_1.__metadata("design:type", Object)
], ClrAlertsPager.prototype, "currentAlertChange", void 0);
tslib_1.__decorate([
    Input('clrCurrentAlertIndex'),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], ClrAlertsPager.prototype, "currentAlertIndex", null);
tslib_1.__decorate([
    Output('clrCurrentAlertIndexChange'),
    tslib_1.__metadata("design:type", Object)
], ClrAlertsPager.prototype, "currentAlertIndexChange", void 0);
ClrAlertsPager = tslib_1.__decorate([
    Component({
        selector: 'clr-alerts-pager',
        template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"alerts-pager-control\">\n    <div class=\"alerts-page-down\">\n        <button class=\"alerts-pager-button\" (click)=\"pageDown()\">\n            <clr-icon shape=\"caret left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n        </button>\n    </div>\n    <div class=\"alerts-pager-text\">\n        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}\n    </div>\n    <div class=\"alerts-page-up\">\n        <button class=\"alerts-pager-button\" (click)=\"pageUp()\">\n            <clr-icon shape=\"caret right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n",
        host: { '[class.alerts-pager]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [MultiAlertService, ClrCommonStrings])
], ClrAlertsPager);
export { ClrAlertsPager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLXBhZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLXBhZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQU83RSxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBK0J6QixZQUFtQixpQkFBb0MsRUFBUyxhQUErQjtRQUE1RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBZjlELHVCQUFrQixHQUFHLElBQUksWUFBWSxDQUFXLEtBQUssQ0FBQyxDQUFDO1FBYWxELDRCQUF1QixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFTyxDQUFDO0lBNUJuRzs7T0FFRztJQUVILElBQUksWUFBWSxDQUFDLEtBQWU7UUFDOUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QztJQUNILENBQUM7SUFDRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUlEOztPQUVHO0lBRUgsSUFBSSxpQkFBaUIsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0UsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFBO0FBNUNDO0lBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO3NDQUNELFFBQVE7NkNBQVIsUUFBUTtrREFJL0I7QUFLZ0M7SUFBaEMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOzswREFBd0Q7QUFNeEY7SUFEQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7Ozt1REFHN0I7QUFLcUM7SUFBckMsTUFBTSxDQUFDLDRCQUE0QixDQUFDOzsrREFBc0Q7QUE3QmhGLGNBQWM7SUFMMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixnM0JBQWtDO1FBQ2xDLElBQUksRUFBRSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRTtLQUN6QyxDQUFDOzZDQWdDc0MsaUJBQWlCLEVBQXdCLGdCQUFnQjtHQS9CcEYsY0FBYyxDQW1EMUI7U0FuRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckFsZXJ0IH0gZnJvbSAnLi9hbGVydCc7XG5pbXBvcnQgeyBNdWx0aUFsZXJ0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL211bHRpLWFsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWFsZXJ0cy1wYWdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydHMtcGFnZXIuaHRtbCcsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5hbGVydHMtcGFnZXJdJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckFsZXJ0c1BhZ2VyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIG11bHRpQWxlcnRTZXJ2aWNlQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJbnB1dC9PdXRwdXQgdG8gc3VwcG9ydCB0d28gd2F5IGJpbmRpbmcgb24gY3VycmVudCBhbGVydCBpbnN0YW5jZVxuICAgKi9cbiAgQElucHV0KCdjbHJDdXJyZW50QWxlcnQnKVxuICBzZXQgY3VycmVudEFsZXJ0KGFsZXJ0OiBDbHJBbGVydCkge1xuICAgIGlmIChhbGVydCkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQgPSBhbGVydDtcbiAgICB9XG4gIH1cbiAgZ2V0IGN1cnJlbnRBbGVydCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQ7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJDdXJyZW50QWxlcnRDaGFuZ2UnKSBjdXJyZW50QWxlcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckFsZXJ0PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIElucHV0L091dHB1dCB0byBzdXBwb3J0IHR3byB3YXkgYmluZGluZyBvbiBjdXJyZW50IGFsZXJ0IGluZGV4XG4gICAqL1xuICBASW5wdXQoJ2NsckN1cnJlbnRBbGVydEluZGV4JylcbiAgc2V0IGN1cnJlbnRBbGVydEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQgPSBpbmRleDtcbiAgfVxuICBnZXQgY3VycmVudEFsZXJ0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudDtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydEluZGV4Q2hhbmdlJykgY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlLCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlQ2hhbmdlcyA9IHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY2hhbmdlcy5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRJbmRleENoYW5nZS5lbWl0KGluZGV4KTtcbiAgICAgIHRoaXMuY3VycmVudEFsZXJ0Q2hhbmdlLmVtaXQodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5hY3RpdmVBbGVydHNbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhZ2VVcCgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLm5leHQoKTtcbiAgfVxuXG4gIHBhZ2VEb3duKCkge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UucHJldmlvdXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2VDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==