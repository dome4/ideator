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
var ClrAlertsPager = /** @class */ (function () {
    function ClrAlertsPager(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
    }
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlert", {
        get: function () {
            return this.multiAlertService.currentAlert;
        },
        /**
         * Input/Output to support two way binding on current alert instance
         */
        set: function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlertIndex", {
        get: function () {
            return this.multiAlertService.current;
        },
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlertsPager.prototype.ngOnInit = function () {
        var _this = this;
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.emit(index);
            _this.currentAlertChange.emit(_this.multiAlertService.activeAlerts[index]);
        });
    };
    ClrAlertsPager.prototype.pageUp = function () {
        this.multiAlertService.next();
    };
    ClrAlertsPager.prototype.pageDown = function () {
        this.multiAlertService.previous();
    };
    ClrAlertsPager.prototype.ngOnDestroy = function () {
        this.multiAlertServiceChanges.unsubscribe();
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
    return ClrAlertsPager;
}());
export { ClrAlertsPager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLXBhZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLXBhZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQU83RTtJQStCRSx3QkFBbUIsaUJBQW9DLEVBQVMsYUFBK0I7UUFBNUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQWY5RCx1QkFBa0IsR0FBRyxJQUFJLFlBQVksQ0FBVyxLQUFLLENBQUMsQ0FBQztRQWFsRCw0QkFBdUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRU8sQ0FBQztJQXhCbkcsc0JBQUksd0NBQVk7YUFLaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7UUFDN0MsQ0FBQztRQVhEOztXQUVHO2FBRUgsVUFBaUIsS0FBZTtZQUM5QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUM3QztRQUNILENBQUM7OztPQUFBO0lBV0Qsc0JBQUksNkNBQWlCO2FBR3JCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQ3hDLENBQUM7UUFURDs7V0FFRzthQUVILFVBQXNCLEtBQWE7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFTRCxpQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzVFLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBM0NEO1FBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDOzBDQUNELFFBQVE7aURBQVIsUUFBUTtzREFJL0I7SUFLZ0M7UUFBaEMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOzs4REFBd0Q7SUFNeEY7UUFEQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7OzsyREFHN0I7SUFLcUM7UUFBckMsTUFBTSxDQUFDLDRCQUE0QixDQUFDOzttRUFBc0Q7SUE3QmhGLGNBQWM7UUFMMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixnM0JBQWtDO1lBQ2xDLElBQUksRUFBRSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRTtTQUN6QyxDQUFDO2lEQWdDc0MsaUJBQWlCLEVBQXdCLGdCQUFnQjtPQS9CcEYsY0FBYyxDQW1EMUI7SUFBRCxxQkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJBbGVydCB9IGZyb20gJy4vYWxlcnQnO1xuaW1wb3J0IHsgTXVsdGlBbGVydFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hbGVydHMtcGFnZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnRzLXBhZ2VyLmh0bWwnLFxuICBob3N0OiB7ICdbY2xhc3MuYWxlcnRzLXBhZ2VyXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJBbGVydHNQYWdlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBtdWx0aUFsZXJ0U2VydmljZUNoYW5nZXM6IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5zdGFuY2VcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0JylcbiAgc2V0IGN1cnJlbnRBbGVydChhbGVydDogQ2xyQWxlcnQpIHtcbiAgICBpZiAoYWxlcnQpIHtcbiAgICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0ID0gYWxlcnQ7XG4gICAgfVxuICB9XG4gIGdldCBjdXJyZW50QWxlcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0O1xuICB9XG5cbiAgQE91dHB1dCgnY2xyQ3VycmVudEFsZXJ0Q2hhbmdlJykgY3VycmVudEFsZXJ0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJBbGVydD4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBJbnB1dC9PdXRwdXQgdG8gc3VwcG9ydCB0d28gd2F5IGJpbmRpbmcgb24gY3VycmVudCBhbGVydCBpbmRleFxuICAgKi9cbiAgQElucHV0KCdjbHJDdXJyZW50QWxlcnRJbmRleCcpXG4gIHNldCBjdXJyZW50QWxlcnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50ID0gaW5kZXg7XG4gIH1cbiAgZ2V0IGN1cnJlbnRBbGVydEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQ7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJDdXJyZW50QWxlcnRJbmRleENoYW5nZScpIGN1cnJlbnRBbGVydEluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG11bHRpQWxlcnRTZXJ2aWNlOiBNdWx0aUFsZXJ0U2VydmljZSwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZUNoYW5nZXMgPSB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmNoYW5nZXMuc3Vic2NyaWJlKGluZGV4ID0+IHtcbiAgICAgIHRoaXMuY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UuZW1pdChpbmRleCk7XG4gICAgICB0aGlzLmN1cnJlbnRBbGVydENoYW5nZS5lbWl0KHRoaXMubXVsdGlBbGVydFNlcnZpY2UuYWN0aXZlQWxlcnRzW2luZGV4XSk7XG4gICAgfSk7XG4gIH1cblxuICBwYWdlVXAoKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5uZXh0KCk7XG4gIH1cblxuICBwYWdlRG93bigpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLnByZXZpb3VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=