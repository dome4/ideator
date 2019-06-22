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
let ClrAlert = class ClrAlert {
    constructor(iconService, cdr, multiAlertService, commonStrings) {
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
    set alertType(val) {
        this.iconService.alertType = val;
    }
    get alertType() {
        return this.iconService.alertType;
    }
    set alertIconShape(value) {
        this.iconService.alertIconShape = value;
    }
    get alertClass() {
        return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
    }
    detectChangesIfNeeded() {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    }
    get isHidden() {
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
    }
    close() {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    }
    open() {
        this._closed = false;
        this._closedChanged.emit(false);
    }
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
export { ClrAlert };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJlbXBoYXNpcy9hbGVydC9hbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBHLFlBQVk7QUFDWixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQVE3RSxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBQ25CLFlBQ1MsV0FBcUMsRUFDckMsR0FBc0IsRUFDVixpQkFBb0MsRUFDaEQsYUFBK0I7UUFIL0IsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO1FBQ3JDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNoRCxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFHWixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQzFCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU5QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBbUJqRyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsV0FBTSxHQUFHLEtBQUssQ0FBQztJQTNCcEIsQ0FBQztJQVVKLElBQUksU0FBUyxDQUFDLEdBQVc7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ25DLENBQUM7SUFDRCxJQUFJLFNBQVM7UUFDWCxPQUFP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bnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3B0aW9uYWwsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBwcm92aWRlcnNcbmltcG9ydCB7IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2ljb24tYW5kLXR5cGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTXVsdGlBbGVydFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hbGVydCcsXG4gIHByb3ZpZGVyczogW0FsZXJ0SWNvbkFuZFR5cGVzU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC5odG1sJyxcbiAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTogYmxvY2s7IH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWNvblNlcnZpY2U6IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBASW5wdXQoJ2NsckFsZXJ0U2l6ZVNtYWxsJykgaXNTbWFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2NsckFsZXJ0Q2xvc2FibGUnKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnY2xyQWxlcnRBcHBMZXZlbCcpIGlzQXBwTGV2ZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2NsckFsZXJ0Q2xvc2VkJykgX2Nsb3NlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJBbGVydENsb3NlZENoYW5nZScpIF9jbG9zZWRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NsckFsZXJ0VHlwZScpXG4gIHNldCBhbGVydFR5cGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZSA9IHZhbDtcbiAgfVxuICBnZXQgYWxlcnRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRUeXBlO1xuICB9XG5cbiAgQElucHV0KCdjbHJBbGVydEljb24nKVxuICBzZXQgYWxlcnRJY29uU2hhcGUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRJY29uU2hhcGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBhbGVydENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvblNlcnZpY2UuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZSkuY3NzQ2xhc3M7XG4gIH1cblxuICBwcml2YXRlIHByZXZpb3VzbHlIaWRkZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBoaWRkZW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGRldGVjdENoYW5nZXNJZk5lZWRlZCgpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c2x5SGlkZGVuICE9PSB0aGlzLmhpZGRlbikge1xuICAgICAgdGhpcy5wcmV2aW91c2x5SGlkZGVuID0gdGhpcy5oaWRkZW47XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlKSB7XG4gICAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uIGlzc3VlIGluIHByb2R1Y3Rpb24gbW9kZSBjYXVzZXMgY3VycmVudEFsZXJ0IHRvIGJlIHVuZGVmaW5lZCB3aGVuIG9ubHkgdGhlIGZpcnN0IGFsZXJ0IGV4aXN0c1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yNDMwXG4gICAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQgPT09IHRoaXMgfHwgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jb3VudCA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzbHlIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNseUhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNJZk5lZWRlZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhpZGRlbjtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jbG9zYWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jbG9zZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmNsb3NlKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nsb3NlZENoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY2xvc2VkID0gZmFsc2U7XG4gICAgdGhpcy5fY2xvc2VkQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgfVxufVxuIl19