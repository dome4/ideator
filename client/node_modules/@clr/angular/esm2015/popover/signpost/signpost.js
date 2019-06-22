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
let ClrSignpost = 
/*********
 *
 * @class ClrSignpost
 *
 * @description
 * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
 * It supports the clrPosition with a 'right-middle' default.
 *
 */
class ClrSignpost {
    constructor(commonStrings) {
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
    /**********
     * @property signPostTrigger
     *
     * @description
     * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
     *
     */
    set customTrigger(trigger) {
        this.useCustomTrigger = !!trigger;
    }
};
tslib_1.__decorate([
    ContentChild(ClrSignpostTrigger, { static: false }),
    tslib_1.__metadata("design:type", ClrSignpostTrigger),
    tslib_1.__metadata("design:paramtypes", [ClrSignpostTrigger])
], ClrSignpost.prototype, "customTrigger", null);
ClrSignpost = tslib_1.__decorate([
    Component({
        selector: 'clr-signpost',
        template: `
        <ng-container *ngIf="!useCustomTrigger">
            <button
                type="button"
                class="signpost-action btn btn-small btn-link"
                clrSignpostTrigger>
                <clr-icon shape="info" [attr.title]="commonStrings.info"></clr-icon>
            </button>
        </ng-container>
        
        <ng-content></ng-content>
    `,
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
export { ClrSignpost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL3NpZ25wb3N0L3NpZ25wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQTZCN0UsSUFBYSxXQUFXO0FBVHhCOzs7Ozs7OztHQVFHO0FBQ0gsTUFBYSxXQUFXO0lBQ3RCLFlBQW1CLGFBQStCO1FBQS9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUVsRDs7Ozs7O1dBTUc7UUFDSSxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7SUFUWSxDQUFDO0lBV3REOzs7Ozs7T0FNRztJQUVILElBQUksYUFBYSxDQUFDLE9BQTJCO1FBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3BDLENBQUM7Q0FDRixDQUFBO0FBSEM7SUFEQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQ3pCLGtCQUFrQjs2Q0FBbEIsa0JBQWtCO2dEQUU1QztBQXRCVSxXQUFXO0lBM0J2QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0tBV1A7UUFDSCxJQUFJLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUU7UUFDcEMsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQztLQUN0RixDQUFDO0lBRUY7Ozs7Ozs7O09BUUc7OzZDQUVpQyxnQkFBZ0I7R0FEdkMsV0FBVyxDQXVCdkI7U0F2QlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUE9QT1ZFUl9IT1NUX0FOQ0hPUiB9IGZyb20gJy4uL2NvbW1vbi9wb3BvdmVyLWhvc3QtYW5jaG9yLnRva2VuJztcblxuaW1wb3J0IHsgQ2xyU2lnbnBvc3RUcmlnZ2VyIH0gZnJvbSAnLi9zaWducG9zdC10cmlnZ2VyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1zaWducG9zdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdXNlQ3VzdG9tVHJpZ2dlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwic2lnbnBvc3QtYWN0aW9uIGJ0biBidG4tc21hbGwgYnRuLWxpbmtcIlxuICAgICAgICAgICAgICAgIGNsclNpZ25wb3N0VHJpZ2dlcj5cbiAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJpbmZvXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5pbmZvXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3Muc2lnbnBvc3RdJzogJ3RydWUnIH0sXG4gIHByb3ZpZGVyczogW0lmT3BlblNlcnZpY2UsIHsgcHJvdmlkZTogUE9QT1ZFUl9IT1NUX0FOQ0hPUiwgdXNlRXhpc3Rpbmc6IEVsZW1lbnRSZWYgfV0sXG59KVxuXG4vKioqKioqKioqXG4gKlxuICogQGNsYXNzIENsclNpZ25wb3N0XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDbGFzcyB1c2VkIHRvIGNvbmZpZ3VyZSBhbmQgY29udHJvbCB0aGUgc3RhdGUgb2YgYSBDbHJTaWducG9zdCBhbmQgaXRzIGFzc29jaWF0ZWQgQ2xyU2lnbnBvc3RDb250ZW50LlxuICogSXQgc3VwcG9ydHMgdGhlIGNsclBvc2l0aW9uIHdpdGggYSAncmlnaHQtbWlkZGxlJyBkZWZhdWx0LlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENsclNpZ25wb3N0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHt9XG5cbiAgLyoqKioqKioqKipcbiAgICogQHByb3BlcnR5IHVzZUN1c3RvbVRyaWdnZXJcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEZsYWcgdXNlZCB0byBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byB1c2UgdGhlIGRlZmF1bHQgdHJpZ2dlciBvciBhIHVzZXIgc3VwcGxpZWQgdHJpZ2dlciBlbGVtZW50LlxuICAgKlxuICAgKi9cbiAgcHVibGljIHVzZUN1c3RvbVRyaWdnZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKioqKioqKioqKlxuICAgKiBAcHJvcGVydHkgc2lnblBvc3RUcmlnZ2VyXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBVc2VzIENvbnRlbnRDaGlsZCB0byBjaGVjayBmb3IgYSB1c2VyIHN1cHBsaWVkIGVsZW1lbnQgd2l0aCB0aGUgQ2xyU2lnbnBvc3RUcmlnZ2VyIG9uIGl0LlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJTaWducG9zdFRyaWdnZXIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgY3VzdG9tVHJpZ2dlcih0cmlnZ2VyOiBDbHJTaWducG9zdFRyaWdnZXIpIHtcbiAgICB0aGlzLnVzZUN1c3RvbVRyaWdnZXIgPSAhIXRyaWdnZXI7XG4gIH1cbn1cbiJdfQ==