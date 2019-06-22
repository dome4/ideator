import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { RowActionService } from './providers/row-action-service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrDatagridActionOverflow = /** @class */ (function () {
    function ClrDatagridActionOverflow(rowActionService, commonStrings) {
        this.rowActionService = rowActionService;
        this.commonStrings = commonStrings;
        this.anchorPoint = Point.RIGHT_CENTER;
        this.popoverPoint = Point.LEFT_CENTER;
        /**
         * Tracks whether the action overflow menu is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
        this.rowActionService.register();
    }
    ClrDatagridActionOverflow.prototype.ngOnDestroy = function () {
        this.rowActionService.unregister();
    };
    Object.defineProperty(ClrDatagridActionOverflow.prototype, "open", {
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
    /**
     * Shows/hides the action overflow menu
     */
    ClrDatagridActionOverflow.prototype.toggle = function (event) {
        this.openingEvent = event;
        this.open = !this.open;
    };
    ClrDatagridActionOverflow.prototype.close = function (event) {
        /*
             * Because this listener is added synchonously, before the event finishes bubbling up the DOM,
             * we end up firing on the very click that just opened the menu, p
             * otentially closing it immediately every time. So we just ignore it.
             */
        if (event === this.openingEvent) {
            delete this.openingEvent;
            return;
        }
        this.open = false;
    };
    tslib_1.__decorate([
        Input('clrDgActionOverflowOpen'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrDatagridActionOverflow.prototype, "open", null);
    tslib_1.__decorate([
        Output('clrDgActionOverflowOpenChange'),
        tslib_1.__metadata("design:type", Object)
    ], ClrDatagridActionOverflow.prototype, "openChanged", void 0);
    ClrDatagridActionOverflow = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-action-overflow',
            template: "\n        <button (click)=\"toggle($event)\" type=\"button\" class=\"datagrid-action-toggle\" #anchor>\n            <clr-icon shape=\"ellipsis-vertical\" [attr.title]=\"commonStrings.rowActions\"></clr-icon>\n        </button>\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n                     [clrPopoverOldPopoverPoint]=\"popoverPoint\">\n            <div #menu class=\"datagrid-action-overflow\" (clrOutsideClick)=\"close($event)\" [clrStrict]=\"true\">\n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [RowActionService, ClrCommonStrings])
    ], ClrDatagridActionOverflow);
    return ClrDatagridActionOverflow;
}());
export { ClrDatagridActionOverflow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1hY3Rpb24tb3ZlcmZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQWdCN0U7SUFJRSxtQ0FBb0IsZ0JBQWtDLEVBQVMsYUFBK0I7UUFBMUUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUh2RixnQkFBVyxHQUFVLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDeEMsaUJBQVksR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDO1FBVS9DOztXQUVHO1FBQ0ssVUFBSyxHQUFHLEtBQUssQ0FBQztRQWMwQixnQkFBVyxHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBeEI3RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELCtDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQU1ELHNCQUFXLDJDQUFJO2FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzthQUdELFVBQWdCLElBQWE7WUFDM0IsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDOzs7T0FUQTtJQW1CRDs7T0FFRztJQUNJLDBDQUFNLEdBQWIsVUFBYyxLQUFVO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFTSx5Q0FBSyxHQUFaLFVBQWEsS0FBaUI7UUFDNUI7Ozs7ZUFJTztRQUNQLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFuQ0Q7UUFEQyxLQUFLLENBQUMseUJBQXlCLENBQUM7Ozt5REFPaEM7SUFFd0M7UUFBeEMsTUFBTSxDQUFDLCtCQUErQixDQUFDOztrRUFBdUQ7SUE3QnBGLHlCQUF5QjtRQWRyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSx1bkJBVVA7U0FDSixDQUFDO2lEQUtzQyxnQkFBZ0IsRUFBd0IsZ0JBQWdCO09BSm5GLHlCQUF5QixDQXlEckM7SUFBRCxnQ0FBQztDQUFBLEFBekRELElBeURDO1NBekRZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyJztcblxuaW1wb3J0IHsgUm93QWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jvdy1hY3Rpb24tc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctYWN0aW9uLW92ZXJmbG93JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkYXRhZ3JpZC1hY3Rpb24tdG9nZ2xlXCIgI2FuY2hvcj5cbiAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImVsbGlwc2lzLXZlcnRpY2FsXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5yb3dBY3Rpb25zXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbKGNsclBvcG92ZXJPbGQpXT1cIm9wZW5cIiBbY2xyUG9wb3Zlck9sZEFuY2hvcl09XCJhbmNob3JcIiBbY2xyUG9wb3Zlck9sZEFuY2hvclBvaW50XT1cImFuY2hvclBvaW50XCJcbiAgICAgICAgICAgICAgICAgICAgIFtjbHJQb3BvdmVyT2xkUG9wb3ZlclBvaW50XT1cInBvcG92ZXJQb2ludFwiPlxuICAgICAgICAgICAgPGRpdiAjbWVudSBjbGFzcz1cImRhdGFncmlkLWFjdGlvbi1vdmVyZmxvd1wiIChjbHJPdXRzaWRlQ2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIFtjbHJTdHJpY3RdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQWN0aW9uT3ZlcmZsb3cgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuUklHSFRfQ0VOVEVSO1xuICBwdWJsaWMgcG9wb3ZlclBvaW50OiBQb2ludCA9IFBvaW50LkxFRlRfQ0VOVEVSO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm93QWN0aW9uU2VydmljZTogUm93QWN0aW9uU2VydmljZSwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHtcbiAgICB0aGlzLnJvd0FjdGlvblNlcnZpY2UucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucm93QWN0aW9uU2VydmljZS51bnJlZ2lzdGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogVHJhY2tzIHdoZXRoZXIgdGhlIGFjdGlvbiBvdmVyZmxvdyBtZW51IGlzIG9wZW4gb3Igbm90XG4gICAqL1xuICBwcml2YXRlIF9vcGVuID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdBY3Rpb25PdmVyZmxvd09wZW4nKVxuICBwdWJsaWMgc2V0IG9wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIGNvbnN0IGJvb2xPcGVuID0gISFvcGVuO1xuICAgIGlmIChib29sT3BlbiAhPT0gdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IGJvb2xPcGVuO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlZC5lbWl0KGJvb2xPcGVuKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0FjdGlvbk92ZXJmbG93T3BlbkNoYW5nZScpIHB1YmxpYyBvcGVuQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qXG4gICAgICogV2UgbmVlZCB0byByZW1lbWJlciB0aGUgY2xpY2sgdGhhdCBvcGVucyB0aGUgbWVudSwgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3QgY2xvc2UgdGhlIG1lbnUgaW5zdGFudGx5XG4gICAgICogd2hlbiB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aGUgRE9NIGFsbCB0aGUgd2F5IHRvIHRoZSBkb2N1bWVudCwgd2hpY2ggd2UgYWxzbyBsaXN0ZW4gdG8uXG4gICAgICovXG4gIHByaXZhdGUgb3BlbmluZ0V2ZW50OiBhbnk7XG5cbiAgLyoqXG4gICAqIFNob3dzL2hpZGVzIHRoZSBhY3Rpb24gb3ZlcmZsb3cgbWVudVxuICAgKi9cbiAgcHVibGljIHRvZ2dsZShldmVudDogYW55KSB7XG4gICAgdGhpcy5vcGVuaW5nRXZlbnQgPSBldmVudDtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLypcbiAgICAgICAgICogQmVjYXVzZSB0aGlzIGxpc3RlbmVyIGlzIGFkZGVkIHN5bmNob25vdXNseSwgYmVmb3JlIHRoZSBldmVudCBmaW5pc2hlcyBidWJibGluZyB1cCB0aGUgRE9NLFxuICAgICAgICAgKiB3ZSBlbmQgdXAgZmlyaW5nIG9uIHRoZSB2ZXJ5IGNsaWNrIHRoYXQganVzdCBvcGVuZWQgdGhlIG1lbnUsIHBcbiAgICAgICAgICogb3RlbnRpYWxseSBjbG9zaW5nIGl0IGltbWVkaWF0ZWx5IGV2ZXJ5IHRpbWUuIFNvIHdlIGp1c3QgaWdub3JlIGl0LlxuICAgICAgICAgKi9cbiAgICBpZiAoZXZlbnQgPT09IHRoaXMub3BlbmluZ0V2ZW50KSB7XG4gICAgICBkZWxldGUgdGhpcy5vcGVuaW5nRXZlbnQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICB9XG59XG4iXX0=