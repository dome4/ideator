import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ElementRef } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { ClrSignpostTrigger } from './signpost-trigger';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrSignpost = /** @class */ (function () {
    function ClrSignpost(commonStrings) {
        this.commonStrings = commonStrings;
        /**********
         * @property useCustomTrigger
         *
         * @description
         * Flag used to determine if we need to use the default trigger or a user supplied trigger element.
         *
         */
        this.useCustomTrigger = false;
    }
    Object.defineProperty(ClrSignpost.prototype, "customTrigger", {
        /**********
         * @property signPostTrigger
         *
         * @description
         * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
         *
         */
        set: function (trigger) {
            this.useCustomTrigger = !!trigger;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ContentChild(ClrSignpostTrigger, { static: false }),
        tslib_1.__metadata("design:type", ClrSignpostTrigger),
        tslib_1.__metadata("design:paramtypes", [ClrSignpostTrigger])
    ], ClrSignpost.prototype, "customTrigger", null);
    ClrSignpost = tslib_1.__decorate([
        Component({
            selector: 'clr-signpost',
            template: "\n        <ng-container *ngIf=\"!useCustomTrigger\">\n            <button\n                type=\"button\"\n                class=\"signpost-action btn btn-small btn-link\"\n                clrSignpostTrigger>\n                <clr-icon shape=\"info\" [attr.title]=\"commonStrings.info\"></clr-icon>\n            </button>\n        </ng-container>\n        \n        <ng-content></ng-content>\n    ",
            host: { '[class.signpost]': 'true' },
            providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
        })
        /*********
         *
         * @class ClrSignpost
         *
         * @description
         * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
         * It supports the clrPosition with a 'right-middle' default.
         *
         */
        ,
        tslib_1.__metadata("design:paramtypes", [ClrCommonStrings])
    ], ClrSignpost);
    return ClrSignpost;
}());
export { ClrSignpost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL3NpZ25wb3N0L3NpZ25wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQTZCN0U7SUFDRSxxQkFBbUIsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBRWxEOzs7Ozs7V0FNRztRQUNJLHFCQUFnQixHQUFZLEtBQUssQ0FBQztJQVRZLENBQUM7SUFtQnRELHNCQUFJLHNDQUFhO1FBUmpCOzs7Ozs7V0FNRzthQUVILFVBQWtCLE9BQTJCO1lBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRkQ7UUFEQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQ3pCLGtCQUFrQjtpREFBbEIsa0JBQWtCO29EQUU1QztJQXRCVSxXQUFXO1FBM0J2QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsZ1pBV1A7WUFDSCxJQUFJLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUU7WUFDcEMsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQztTQUN0RixDQUFDO1FBRUY7Ozs7Ozs7O1dBUUc7O2lEQUVpQyxnQkFBZ0I7T0FEdkMsV0FBVyxDQXVCdkI7SUFBRCxrQkFBQztDQUFBLEFBdkJELElBdUJDO1NBdkJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBPUE9WRVJfSE9TVF9BTkNIT1IgfSBmcm9tICcuLi9jb21tb24vcG9wb3Zlci1ob3N0LWFuY2hvci50b2tlbic7XG5cbmltcG9ydCB7IENsclNpZ25wb3N0VHJpZ2dlciB9IGZyb20gJy4vc2lnbnBvc3QtdHJpZ2dlcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItc2lnbnBvc3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXVzZUN1c3RvbVRyaWdnZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInNpZ25wb3N0LWFjdGlvbiBidG4gYnRuLXNtYWxsIGJ0bi1saW5rXCJcbiAgICAgICAgICAgICAgICBjbHJTaWducG9zdFRyaWdnZXI+XG4gICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiaW5mb1wiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuaW5mb1wiPjwvY2xyLWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnNpZ25wb3N0XSc6ICd0cnVlJyB9LFxuICBwcm92aWRlcnM6IFtJZk9wZW5TZXJ2aWNlLCB7IHByb3ZpZGU6IFBPUE9WRVJfSE9TVF9BTkNIT1IsIHVzZUV4aXN0aW5nOiBFbGVtZW50UmVmIH1dLFxufSlcblxuLyoqKioqKioqKlxuICpcbiAqIEBjbGFzcyBDbHJTaWducG9zdFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ2xhc3MgdXNlZCB0byBjb25maWd1cmUgYW5kIGNvbnRyb2wgdGhlIHN0YXRlIG9mIGEgQ2xyU2lnbnBvc3QgYW5kIGl0cyBhc3NvY2lhdGVkIENsclNpZ25wb3N0Q29udGVudC5cbiAqIEl0IHN1cHBvcnRzIHRoZSBjbHJQb3NpdGlvbiB3aXRoIGEgJ3JpZ2h0LW1pZGRsZScgZGVmYXVsdC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDbHJTaWducG9zdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7fVxuXG4gIC8qKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSB1c2VDdXN0b21UcmlnZ2VyXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBGbGFnIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gdXNlIHRoZSBkZWZhdWx0IHRyaWdnZXIgb3IgYSB1c2VyIHN1cHBsaWVkIHRyaWdnZXIgZWxlbWVudC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyB1c2VDdXN0b21UcmlnZ2VyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqKioqKioqKipcbiAgICogQHByb3BlcnR5IHNpZ25Qb3N0VHJpZ2dlclxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVXNlcyBDb250ZW50Q2hpbGQgdG8gY2hlY2sgZm9yIGEgdXNlciBzdXBwbGllZCBlbGVtZW50IHdpdGggdGhlIENsclNpZ25wb3N0VHJpZ2dlciBvbiBpdC5cbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyU2lnbnBvc3RUcmlnZ2VyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IGN1c3RvbVRyaWdnZXIodHJpZ2dlcjogQ2xyU2lnbnBvc3RUcmlnZ2VyKSB7XG4gICAgdGhpcy51c2VDdXN0b21UcmlnZ2VyID0gISF0cmlnZ2VyO1xuICB9XG59XG4iXX0=