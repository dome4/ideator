import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
// providers
import { AlertIconAndTypesService } from './providers/icon-and-types.service';
import { MultiAlertService } from './providers/multi-alert.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrAlert = /** @class */ (function () {
    function ClrAlert(iconService, cdr, multiAlertService, commonStrings) {
        this.iconService = iconService;
        this.cdr = cdr;
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        this._closed = false;
        this._closedChanged = new EventEmitter(false);
        this.previouslyHidden = false;
        this.hidden = false;
    }
    Object.defineProperty(ClrAlert.prototype, "alertType", {
        get: function () {
            return this.iconService.alertType;
        },
        set: function (val) {
            this.iconService.alertType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertIconShape", {
        set: function (value) {
            this.iconService.alertIconShape = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertClass", {
        get: function () {
            return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.detectChangesIfNeeded = function () {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    };
    Object.defineProperty(ClrAlert.prototype, "isHidden", {
        get: function () {
            if (this.multiAlertService) {
                // change detection issue in production mode causes currentAlert to be undefined when only the first alert exists
                // https://github.com/vmware/clarity/issues/2430
                if (this.multiAlertService.currentAlert === this || this.multiAlertService.count === 0) {
                    if (this.hidden === true) {
                        this.previouslyHidden = true;
                        this.hidden = false;
                    }
                }
                else if (this.hidden === false) {
                    this.previouslyHidden = false;
                    this.hidden = true;
                }
                this.detectChangesIfNeeded();
            }
            return this.hidden;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.close = function () {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    };
    ClrAlert.prototype.open = function () {
        this._closed = false;
        this._closedChanged.emit(false);
    };
    tslib_1.__decorate([
        Input('clrAlertSizeSmall'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "isSmall", void 0);
    tslib_1.__decorate([
        Input('clrAlertClosable'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "closable", void 0);
    tslib_1.__decorate([
        Input('clrAlertAppLevel'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "isAppLevel", void 0);
    tslib_1.__decorate([
        Input('clrAlertClosed'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "_closed", void 0);
    tslib_1.__decorate([
        Output('clrAlertClosedChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrAlert.prototype, "_closedChanged", void 0);
    tslib_1.__decorate([
        Input('clrAlertType'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrAlert.prototype, "alertType", null);
    tslib_1.__decorate([
        Input('clrAlertIcon'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrAlert.prototype, "alertIconShape", null);
    ClrAlert = tslib_1.__decorate([
        Component({
            selector: 'clr-alert',
            providers: [AlertIconAndTypesService],
            template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\"\n    role=\"alert\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n    </button>\n</div>\n",
            styles: [':host { display: block; }']
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__metadata("design:paramtypes", [AlertIconAndTypesService,
            ChangeDetectorRef,
            MultiAlertService,
            ClrCommonStrings])
    ], ClrAlert);
    return ClrAlert;
}());
export { ClrAlert };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJlbXBoYXNpcy9hbGVydC9hbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBHLFlBQVk7QUFDWixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQVE3RTtJQUNFLGtCQUNTLFdBQXFDLEVBQ3JDLEdBQXNCLEVBQ1YsaUJBQW9DLEVBQ2hELGFBQStCO1FBSC9CLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtRQUNyQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDaEQsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBR1osWUFBTyxHQUFZLEtBQUssQ0FBQztRQUMxQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFOUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUNsQixtQkFBYyxHQUEwQixJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztRQW1CakcscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFdBQU0sR0FBRyxLQUFLLENBQUM7SUEzQnBCLENBQUM7SUFVSixzQkFBSSwrQkFBUzthQUdiO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxDQUFDO2FBTEQsVUFBYyxHQUFXO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FB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LFFBQVEsQ0E0RXBCO0lBQUQsZUFBQztDQUFBLEFBNUVELElBNEVDO1NBNUVZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPcHRpb25hbCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIHByb3ZpZGVyc1xuaW1wb3J0IHsgQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaWNvbi1hbmQtdHlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBNdWx0aUFsZXJ0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL211bHRpLWFsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWFsZXJ0JyxcbiAgcHJvdmlkZXJzOiBbQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0Lmh0bWwnLFxuICBzdHlsZXM6IFsnOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfSddLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJBbGVydCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpY29uU2VydmljZTogQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBtdWx0aUFsZXJ0U2VydmljZTogTXVsdGlBbGVydFNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7fVxuXG4gIEBJbnB1dCgnY2xyQWxlcnRTaXplU21hbGwnKSBpc1NtYWxsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyQWxlcnRDbG9zYWJsZScpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJBbGVydEFwcExldmVsJykgaXNBcHBMZXZlbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgnY2xyQWxlcnRDbG9zZWQnKSBfY2xvc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2NsckFsZXJ0Q2xvc2VkQ2hhbmdlJykgX2Nsb3NlZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY2xyQWxlcnRUeXBlJylcbiAgc2V0IGFsZXJ0VHlwZSh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRUeXBlID0gdmFsO1xuICB9XG4gIGdldCBhbGVydFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pY29uU2VydmljZS5hbGVydFR5cGU7XG4gIH1cblxuICBASW5wdXQoJ2NsckFsZXJ0SWNvbicpXG4gIHNldCBhbGVydEljb25TaGFwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5pY29uU2VydmljZS5hbGVydEljb25TaGFwZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGFsZXJ0Q2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pY29uU2VydmljZS5pY29uSW5mb0Zyb21UeXBlKHRoaXMuaWNvblNlcnZpY2UuYWxlcnRUeXBlKS5jc3NDbGFzcztcbiAgfVxuXG4gIHByaXZhdGUgcHJldmlvdXNseUhpZGRlbiA9IGZhbHNlO1xuICBwcml2YXRlIGhpZGRlbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZGV0ZWN0Q2hhbmdlc0lmTmVlZGVkKCkge1xuICAgIGlmICh0aGlzLnByZXZpb3VzbHlIaWRkZW4gIT09IHRoaXMuaGlkZGVuKSB7XG4gICAgICB0aGlzLnByZXZpb3VzbHlIaWRkZW4gPSB0aGlzLmhpZGRlbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgaWYgKHRoaXMubXVsdGlBbGVydFNlcnZpY2UpIHtcbiAgICAgIC8vIGNoYW5nZSBkZXRlY3Rpb24gaXNzdWUgaW4gcHJvZHVjdGlvbiBtb2RlIGNhdXNlcyBjdXJyZW50QWxlcnQgdG8gYmUgdW5kZWZpbmVkIHdoZW4gb25seSB0aGUgZmlyc3QgYWxlcnQgZXhpc3RzXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdm13YXJlL2NsYXJpdHkvaXNzdWVzLzI0MzBcbiAgICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCA9PT0gdGhpcyB8fCB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmNvdW50ID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMucHJldmlvdXNseUhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmhpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c2x5SGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0lmTmVlZGVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGlkZGVuO1xuICB9XG5cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNsb3NhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2Nsb3NlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMubXVsdGlBbGVydFNlcnZpY2UpIHtcbiAgICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY2xvc2UoKTtcbiAgICB9XG4gICAgdGhpcy5fY2xvc2VkQ2hhbmdlZC5lbWl0KHRydWUpO1xuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLl9jbG9zZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9jbG9zZWRDaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICB9XG59XG4iXX0=