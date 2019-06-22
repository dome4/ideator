import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrHeader = /** @class */ (function () {
    function ClrHeader(responsiveNavService, commonStrings) {
        var _this = this;
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            },
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    ClrHeader.prototype.resetNavTriggers = function () {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    };
    // decides which triggers to show on the header
    ClrHeader.prototype.initializeNavTriggers = function (navList) {
        var _this = this;
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(function (navLevel) {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        });
    };
    // closes the nav that is open
    ClrHeader.prototype.closeOpenNav = function () {
        this.responsiveNavService.closeAllNavs();
    };
    // toggles the nav that is open
    ClrHeader.prototype.toggleNav = function (navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    };
    ClrHeader.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ClrHeader = tslib_1.__decorate([
        Component({
            selector: 'clr-header',
            template: "\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel1OnPage\"\n            class=\"header-hamburger-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.open : commonStrings.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_1)\">\n            <span></span>\n        </button>\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel2OnPage\"\n            class=\"header-overflow-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.open : commonStrings.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_2)\">\n            <span></span>\n        </button>\n        <div class=\"header-backdrop\" (click)=\"closeOpenNav()\"></div>\n    ",
            host: { '[class.header]': 'true' }
        }),
        tslib_1.__metadata("design:paramtypes", [ResponsiveNavigationService, ClrCommonStrings])
    ], ClrHeader);
    return ClrHeader;
}());
export { ClrHeader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBMEI3RTtJQU9FLG1CQUFvQixvQkFBaUQsRUFBUyxhQUErQjtRQUE3RyxpQkFNQztRQU5tQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBTjdHLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsaUJBQVksR0FBVyxJQUFJLENBQUM7UUFDNUIsdUJBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFJdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUN0RSxJQUFJLEVBQUUsVUFBQyxZQUFzQjtnQkFDM0IsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUdBQWlHO0lBQ2pHLG9DQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsK0NBQStDO0lBQy9DLHlDQUFxQixHQUFyQixVQUFzQixPQUFpQjtRQUF2QyxpQkFhQztRQVpDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1lBQ3RCLElBQUksUUFBUSxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDL0MsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7YUFDL0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBOEI7SUFDOUIsZ0NBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLDZCQUFTLEdBQVQsVUFBVSxRQUFnQjtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBbERVLFNBQVM7UUF4QnJCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxzMkJBbUJQO1lBQ0gsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFO1NBQ25DLENBQUM7aURBUTBDLDJCQUEyQixFQUF3QixnQkFBZ0I7T0FQbEcsU0FBUyxDQW1EckI7SUFBRCxnQkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jlc3BvbnNpdmUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZDb2RlcyB9IGZyb20gJy4vcmVzcG9uc2l2ZS1uYXYtY29kZXMnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgKm5nSWY9XCJpc05hdkxldmVsMU9uUGFnZVwiXG4gICAgICAgICAgICBjbGFzcz1cImhlYWRlci1oYW1idXJnZXItdHJpZ2dlclwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIihvcGVuTmF2TGV2ZWwgIT09IHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkgPyBjb21tb25TdHJpbmdzLm9wZW4gOiBjb21tb25TdHJpbmdzLmNsb3NlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVOYXYocmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKVwiPlxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNOYXZMZXZlbDJPblBhZ2VcIlxuICAgICAgICAgICAgY2xhc3M9XCJoZWFkZXItb3ZlcmZsb3ctdHJpZ2dlclwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIihvcGVuTmF2TGV2ZWwgIT09IHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikgPyBjb21tb25TdHJpbmdzLm9wZW4gOiBjb21tb25TdHJpbmdzLmNsb3NlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVOYXYocmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8yKVwiPlxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1iYWNrZHJvcFwiIChjbGljayk9XCJjbG9zZU9wZW5OYXYoKVwiPjwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5oZWFkZXJdJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckhlYWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGlzTmF2TGV2ZWwxT25QYWdlID0gZmFsc2U7XG4gIGlzTmF2TGV2ZWwyT25QYWdlID0gZmFsc2U7XG4gIG9wZW5OYXZMZXZlbDogbnVtYmVyID0gbnVsbDtcbiAgcmVzcG9uc2l2ZU5hdkNvZGVzID0gUmVzcG9uc2l2ZU5hdkNvZGVzO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3BvbnNpdmVOYXZTZXJ2aWNlOiBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5yZWdpc3RlcmVkTmF2cy5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG5hdkxldmVsTGlzdDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplTmF2VHJpZ2dlcnMobmF2TGV2ZWxMaXN0KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyByZXNldCB0cmlnZ2Vycy4gaGFuZGxlcyBjYXNlcyB3aGVuIGFuIGFwcGxpY2F0aW9uIGhhcyBkaWZmZXJlbnQgbmF2IGxldmVscyBvbiBkaWZmZXJlbnQgcGFnZXMuXG4gIHJlc2V0TmF2VHJpZ2dlcnMoKSB7XG4gICAgdGhpcy5pc05hdkxldmVsMU9uUGFnZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNOYXZMZXZlbDJPblBhZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGRlY2lkZXMgd2hpY2ggdHJpZ2dlcnMgdG8gc2hvdyBvbiB0aGUgaGVhZGVyXG4gIGluaXRpYWxpemVOYXZUcmlnZ2VycyhuYXZMaXN0OiBudW1iZXJbXSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXROYXZUcmlnZ2VycygpO1xuICAgIGlmIChuYXZMaXN0Lmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01vcmUgdGhhbiAyIE5hdiBMZXZlbHMgZGV0ZWN0ZWQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5hdkxpc3QuZm9yRWFjaChuYXZMZXZlbCA9PiB7XG4gICAgICBpZiAobmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkge1xuICAgICAgICB0aGlzLmlzTmF2TGV2ZWwxT25QYWdlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikge1xuICAgICAgICB0aGlzLmlzTmF2TGV2ZWwyT25QYWdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsb3NlcyB0aGUgbmF2IHRoYXQgaXMgb3BlblxuICBjbG9zZU9wZW5OYXYoKSB7XG4gICAgdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5jbG9zZUFsbE5hdnMoKTtcbiAgfVxuXG4gIC8vIHRvZ2dsZXMgdGhlIG5hdiB0aGF0IGlzIG9wZW5cbiAgdG9nZ2xlTmF2KG5hdkxldmVsOiBudW1iZXIpIHtcbiAgICB0aGlzLm9wZW5OYXZMZXZlbCA9IHRoaXMub3Blbk5hdkxldmVsID09PSBuYXZMZXZlbCA/IG51bGwgOiBuYXZMZXZlbDtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnNlbmRDb250cm9sTWVzc2FnZShSZXNwb25zaXZlTmF2Q29kZXMuTkFWX1RPR0dMRSwgbmF2TGV2ZWwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==