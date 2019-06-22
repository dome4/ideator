/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavIconService } from './providers/vertical-nav-icon.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
let ClrVerticalNav = class ClrVerticalNav {
    constructor(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(value => {
            this._collapsedChanged.emit(value);
        });
    }
    get collapsible() {
        return this._navService.collapsible;
    }
    set collapsible(value) {
        this._navService.collapsible = value;
    }
    get collapsed() {
        return this._navService.collapsed;
    }
    set collapsed(value) {
        this._navService.collapsed = value;
    }
    get hasNavGroups() {
        return this._navGroupRegistrationService.navGroupCount > 0;
    }
    get hasIcons() {
        return this._navIconService.hasIcons;
    }
    toggleByButton() {
        this.collapsed = !this.collapsed;
    }
    ngOnDestroy() {
        this._sub.unsubscribe();
    }
};
tslib_1.__decorate([
    Input('clrVerticalNavCollapsible'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrVerticalNav.prototype, "collapsible", null);
tslib_1.__decorate([
    Input('clrVerticalNavCollapsed'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrVerticalNav.prototype, "collapsed", null);
tslib_1.__decorate([
    Output('clrVerticalNavCollapsedChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrVerticalNav.prototype, "_collapsedChanged", void 0);
ClrVerticalNav = tslib_1.__decorate([
    Component({
        selector: 'clr-vertical-nav',
        template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<button type=\"button\" class=\"nav-trigger\"\n        [class.on-collapse]=\"collapsed\"\n        (click)=\"toggleByButton()\"\n        *ngIf=\"collapsible\">\n    <clr-icon shape=\"angle-double\"\n              class=\"nav-trigger-icon\"\n              [attr.dir]=\"(this.collapsed) ? 'right' : 'left'\"\n              [attr.title]=\"(this.collapsed) ? commonStrings.expand : commonStrings.collapse\"></clr-icon>\n</button>\n<!-- Click handler on .nav-content is bad but required :-( -->\n<div class=\"nav-content\">\n    <ng-content></ng-content>\n    <button (click)=\"collapsed = false\" class=\"nav-btn\" *ngIf=\"collapsible && collapsed\"></button>\n</div>\n",
        providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
        host: {
            class: 'clr-vertical-nav',
            '[class.is-collapsed]': 'collapsed',
            '[class.has-nav-groups]': 'hasNavGroups',
            '[class.has-icons]': 'hasIcons',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [VerticalNavService,
        VerticalNavIconService,
        VerticalNavGroupRegistrationService,
        ClrCommonStrings])
], ClrVerticalNav);
export { ClrVerticalNav };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi92ZXJ0aWNhbC1uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xGLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBYTdFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFnQ3pCLFlBQ1UsV0FBK0IsRUFDL0IsZUFBdUMsRUFDdkMsNEJBQWlFLEVBQ2xFLGFBQStCO1FBSDlCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFxQztRQUNsRSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFoQmhDLHNCQUFpQixHQUEwQixJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUMsQ0FBQztRQWtCakYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXhDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ3RDLENBQUM7SUFHRCxJQUFJLFdBQVcsQ0FBQyxLQUFjO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBR0QsSUFBSSxTQUFTLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUtELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsQ0FBQztJQWVELGNBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUE7QUE1Q0M7SUFEQyxLQUFLLENBQUMsMkJBQTJCLENBQUM7OztpREFHbEM7QUFPRDtJQURDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQzs7OytDQUdoQztBQUdEO0lBREMsTUFBTSxDQUFDLCtCQUErQixDQUFDO3NDQUNiLFlBQVk7eURBQTRDO0FBcEJ4RSxjQUFjO0lBWDFCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIscTRCQUFrQztRQUNsQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxtQ0FBbUMsQ0FBQztRQUM1RixJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLHNCQUFzQixFQUFFLFdBQVc7WUFDbkMsd0JBQXdCLEVBQUUsY0FBYztZQUN4QyxtQkFBbUIsRUFBRSxVQUFVO1NBQ2hDO0tBQ0YsQ0FBQzs2Q0FrQ3VCLGtCQUFrQjtRQUNkLHNCQUFzQjtRQUNULG1DQUFtQztRQUNuRCxnQkFBZ0I7R0FwQzdCLGNBQWMsQ0FrRDFCO1NBbERZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBWZXJ0aWNhbE5hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1ncm91cC1yZWdpc3RyYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LWljb24uc2VydmljZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbE5hdlNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdmVydGljYWwtbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZlcnRpY2FsLW5hdi5odG1sJyxcbiAgcHJvdmlkZXJzOiBbVmVydGljYWxOYXZTZXJ2aWNlLCBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlLCBWZXJ0aWNhbE5hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2Nsci12ZXJ0aWNhbC1uYXYnLFxuICAgICdbY2xhc3MuaXMtY29sbGFwc2VkXSc6ICdjb2xsYXBzZWQnLFxuICAgICdbY2xhc3MuaGFzLW5hdi1ncm91cHNdJzogJ2hhc05hdkdyb3VwcycsXG4gICAgJ1tjbGFzcy5oYXMtaWNvbnNdJzogJ2hhc0ljb25zJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVmVydGljYWxOYXYgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBnZXQgY29sbGFwc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2libGU7XG4gIH1cblxuICBASW5wdXQoJ2NsclZlcnRpY2FsTmF2Q29sbGFwc2libGUnKVxuICBzZXQgY29sbGFwc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNpYmxlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY29sbGFwc2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyVmVydGljYWxOYXZDb2xsYXBzZWQnKVxuICBzZXQgY29sbGFwc2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsclZlcnRpY2FsTmF2Q29sbGFwc2VkQ2hhbmdlJylcbiAgcHJpdmF0ZSBfY29sbGFwc2VkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBnZXQgaGFzTmF2R3JvdXBzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UubmF2R3JvdXBDb3VudCA+IDA7XG4gIH1cblxuICBnZXQgaGFzSWNvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdkljb25TZXJ2aWNlLmhhc0ljb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbmF2U2VydmljZTogVmVydGljYWxOYXZTZXJ2aWNlLFxuICAgIHByaXZhdGUgX25hdkljb25TZXJ2aWNlOiBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX25hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZTogVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgdGhpcy5fc3ViID0gdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWRDaGFuZ2VkLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLl9jb2xsYXBzZWRDaGFuZ2VkLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlQnlCdXR0b24oKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSAhdGhpcy5jb2xsYXBzZWQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19