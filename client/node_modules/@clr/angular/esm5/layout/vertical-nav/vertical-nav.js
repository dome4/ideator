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
var ClrVerticalNav = /** @class */ (function () {
    function ClrVerticalNav(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        var _this = this;
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(function (value) {
            _this._collapsedChanged.emit(value);
        });
    }
    Object.defineProperty(ClrVerticalNav.prototype, "collapsible", {
        get: function () {
            return this._navService.collapsible;
        },
        set: function (value) {
            this._navService.collapsible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "collapsed", {
        get: function () {
            return this._navService.collapsed;
        },
        set: function (value) {
            this._navService.collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasNavGroups", {
        get: function () {
            return this._navGroupRegistrationService.navGroupCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasIcons", {
        get: function () {
            return this._navIconService.hasIcons;
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNav.prototype.toggleByButton = function () {
        this.collapsed = !this.collapsed;
    };
    ClrVerticalNav.prototype.ngOnDestroy = function () {
        this._sub.unsubscribe();
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
    return ClrVerticalNav;
}());
export { ClrVerticalNav };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi92ZXJ0aWNhbC1uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xGLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBYTdFO0lBZ0NFLHdCQUNVLFdBQStCLEVBQy9CLGVBQXVDLEVBQ3ZDLDRCQUFpRSxFQUNsRSxhQUErQjtRQUp4QyxpQkFTQztRQVJTLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFxQztRQUNsRSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFoQmhDLHNCQUFpQixHQUEwQixJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUMsQ0FBQztRQWtCakYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDM0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF4Q0Qsc0JBQUksdUNBQVc7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDdEMsQ0FBQzthQUdELFVBQWdCLEtBQWM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLENBQUM7OztPQUxBO0lBT0Qsc0JBQUkscUNBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDcEMsQ0FBQzthQUdELFVBQWMsS0FBYztZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDckMsQ0FBQzs7O09BTEE7SUFVRCxzQkFBSSx3Q0FBWTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBUTthQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQWVELHVDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTNDRDtRQURDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQzs7O3FEQUdsQztJQU9EO1FBREMsS0FBSyxDQUFDLHlCQUF5QixDQUFDOzs7bURBR2hDO0lBR0Q7UUFEQyxNQUFNLENBQUMsK0JBQStCLENBQUM7MENBQ2IsWUFBWTs2REFBNEM7SUFwQnhFLGNBQWM7UUFYMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixxNEJBQWtDO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixFQUFFLG1DQUFtQyxDQUFDO1lBQzVGLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixzQkFBc0IsRUFBRSxXQUFXO2dCQUNuQyx3QkFBd0IsRUFBRSxjQUFjO2dCQUN4QyxtQkFBbUIsRUFBRSxVQUFVO2FBQ2hDO1NBQ0YsQ0FBQztpREFrQ3VCLGtCQUFrQjtZQUNkLHNCQUFzQjtZQUNULG1DQUFtQztZQUNuRCxnQkFBZ0I7T0FwQzdCLGNBQWMsQ0FrRDFCO0lBQUQscUJBQUM7Q0FBQSxBQWxERCxJQWtEQztTQWxEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYtZ3JvdXAtcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmVydGljYWxOYXZJY29uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1pY29uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmVydGljYWxOYXZTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXZlcnRpY2FsLW5hdicsXG4gIHRlbXBsYXRlVXJsOiAnLi92ZXJ0aWNhbC1uYXYuaHRtbCcsXG4gIHByb3ZpZGVyczogW1ZlcnRpY2FsTmF2U2VydmljZSwgVmVydGljYWxOYXZJY29uU2VydmljZSwgVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdjbHItdmVydGljYWwtbmF2JyxcbiAgICAnW2NsYXNzLmlzLWNvbGxhcHNlZF0nOiAnY29sbGFwc2VkJyxcbiAgICAnW2NsYXNzLmhhcy1uYXYtZ3JvdXBzXSc6ICdoYXNOYXZHcm91cHMnLFxuICAgICdbY2xhc3MuaGFzLWljb25zXSc6ICdoYXNJY29ucycsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclZlcnRpY2FsTmF2IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgZ2V0IGNvbGxhcHNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNpYmxlO1xuICB9XG5cbiAgQElucHV0KCdjbHJWZXJ0aWNhbE5hdkNvbGxhcHNpYmxlJylcbiAgc2V0IGNvbGxhcHNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzaWJsZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGNvbGxhcHNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQ7XG4gIH1cblxuICBASW5wdXQoJ2NsclZlcnRpY2FsTmF2Q29sbGFwc2VkJylcbiAgc2V0IGNvbGxhcHNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkID0gdmFsdWU7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJWZXJ0aWNhbE5hdkNvbGxhcHNlZENoYW5nZScpXG4gIHByaXZhdGUgX2NvbGxhcHNlZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgZ2V0IGhhc05hdkdyb3VwcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlLm5hdkdyb3VwQ291bnQgPiAwO1xuICB9XG5cbiAgZ2V0IGhhc0ljb25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uYXZJY29uU2VydmljZS5oYXNJY29ucztcbiAgfVxuXG4gIHByaXZhdGUgX3N1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX25hdlNlcnZpY2U6IFZlcnRpY2FsTmF2U2VydmljZSxcbiAgICBwcml2YXRlIF9uYXZJY29uU2VydmljZTogVmVydGljYWxOYXZJY29uU2VydmljZSxcbiAgICBwcml2YXRlIF9uYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2U6IFZlcnRpY2FsTmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge1xuICAgIHRoaXMuX3N1YiA9IHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkQ2hhbmdlZC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5lbWl0KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZUJ5QnV0dG9uKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==