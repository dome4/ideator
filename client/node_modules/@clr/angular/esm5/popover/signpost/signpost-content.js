import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Inject, Injector, Input, Optional } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { SIGNPOST_POSITIONS } from './signpost-positions';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
// aka where the arrow / pointer is at in relation to the anchor
var POSITIONS = [
    'top-left',
    'top-middle',
    'top-right',
    'right-top',
    'right-middle',
    'right-bottom',
    'bottom-right',
    'bottom-middle',
    'bottom-left',
    'left-bottom',
    'left-middle',
    'left-top',
];
var ClrSignpostContent = /** @class */ (function (_super) {
    tslib_1.__extends(ClrSignpostContent, _super);
    function ClrSignpostContent(injector, parentHost, commonStrings) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        _this = _super.call(this, injector, parentHost) || this;
        _this.commonStrings = commonStrings;
        // Defaults
        _this.position = 'right-middle';
        _this.closeOnOutsideClick = true;
        return _this;
    }
    /**********
     *
     * @description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     */
    ClrSignpostContent.prototype.close = function () {
        this.ifOpenService.open = false;
    };
    Object.defineProperty(ClrSignpostContent.prototype, "position", {
        get: function () {
            return this._position;
        },
        /*********
         *
         * @description
         * A setter for the position of the ClrSignpostContent popover. This is a combination of the following:
         * - anchorPoint - where on the trigger to anchor the ClrSignpostContent
         * - popoverPoint - where on the ClrSignpostContent container to align with the anchorPoint
         * - offsetY - where on the Y axis to align the ClrSignpostContent so it meets specs
         * - offsetX - where on the X axis to align the ClrSignpostContent so it meets specs
         * There are 12 possible positions to place a ClrSignpostContent container:
         * - top-left
         * - top-middle
         * - top-right
         * - right-top
         * - right-middle
         * - right-bottom
         * - bottom-right
         * - bottom-middle
         * - bottom-left
         * - left-bottom
         * - left-middle
         * - left-top
         *
         * I think of it as follows for 'top-left' -> CONTAINER_SIDE-SIDE_POSITION. In this case CONTAINER_SIDE is 'top'
         * meaning the top of the trigger icon (above the icon that hides/shows) the ClrSignpostContent. And, SIDE_POSITION
         * is 'left' meaning two things: 1) the ClrSignpostContent container extends to the left and 2) the 'arrow/pointer'
         * linking the SingpostContent to the trigger points down at the horizontal center of the trigger icon.
         *
         * @param newPosition
         */
        set: function (position) {
            // Ugh
            this.renderer.removeClass(this.el.nativeElement, this.position);
            if (position && POSITIONS.indexOf(position) > -1) {
                this._position = position;
            }
            else {
                this._position = 'right-middle';
            }
            // Ugh
            this.renderer.addClass(this.el.nativeElement, this.position);
            var setPosition = SIGNPOST_POSITIONS[this.position];
            this.anchorPoint = setPosition.anchorPoint;
            this.popoverPoint = setPosition.popoverPoint;
            this.popoverOptions.offsetY = setPosition.offsetY;
            this.popoverOptions.offsetX = setPosition.offsetX;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input('clrPosition'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrSignpostContent.prototype, "position", null);
    ClrSignpostContent = tslib_1.__decorate([
        Component({
            selector: 'clr-signpost-content',
            template: "\n        <div class=\"signpost-flex-wrap\">\n            <div class=\"popover-pointer\"></div>\n            <div class=\"signpost-content-header\">\n                <button type=\"button\" class=\"signpost-action close\" (click)=\"close()\">\n                    <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                </button>\n            </div>\n            <div class=\"signpost-content-body\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
            host: { '[class.signpost-content]': 'true' }
        }),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(1, Inject(POPOVER_HOST_ANCHOR)),
        tslib_1.__metadata("design:paramtypes", [Injector,
            ElementRef,
            ClrCommonStrings])
    ], ClrSignpostContent);
    return ClrSignpostContent;
}(AbstractPopover));
export { ClrSignpostContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0UsZ0VBQWdFO0FBQ2hFLElBQU0sU0FBUyxHQUFhO0lBQzFCLFVBQVU7SUFDVixZQUFZO0lBQ1osV0FBVztJQUNYLFdBQVc7SUFDWCxjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxlQUFlO0lBQ2YsYUFBYTtJQUNiLGFBQWE7SUFDYixhQUFhO0lBQ2IsVUFBVTtDQUNYLENBQUM7QUFtQkY7SUFBd0MsOENBQWU7SUFDckQsNEJBQ0UsUUFBa0IsRUFHbEIsVUFBc0IsRUFDdEIsYUFBK0I7UUFMakMsaUJBZUM7UUFSQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO1NBQ3RGO1FBQ0QsUUFBQSxrQkFBTSxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBQUM7UUFDNUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsV0FBVztRQUNYLEtBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7O0lBQ2xDLENBQUM7SUFJRDs7Ozs7T0FLRztJQUNILGtDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUlELHNCQUFJLHdDQUFRO2FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNEJHO2FBRUgsVUFBYSxRQUFnQjtZQUMzQixNQUFNO1lBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hFLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO2FBQ2pDO1lBQ0QsTUFBTTtZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU3RCxJQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztZQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDcEQsQ0FBQzs7O09BaERBO0lBZ0NEO1FBREMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7O3NEQWlCcEI7SUFsRlUsa0JBQWtCO1FBakI5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSwyZ0JBWVA7WUFDSCxJQUFJLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUU7U0FDN0MsQ0FBQztRQUlHLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsbUJBQUEsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7aURBRmxCLFFBQVE7WUFHTixVQUFVO1lBQ1AsZ0JBQWdCO09BTnRCLGtCQUFrQixDQW1GOUI7SUFBRCx5QkFBQztDQUFBLEFBbkZELENBQXdDLGVBQWUsR0FtRnREO1NBbkZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RvciwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFic3RyYWN0UG9wb3ZlciB9IGZyb20gJy4uL2NvbW1vbi9hYnN0cmFjdC1wb3BvdmVyJztcbmltcG9ydCB7IFBPUE9WRVJfSE9TVF9BTkNIT1IgfSBmcm9tICcuLi9jb21tb24vcG9wb3Zlci1ob3N0LWFuY2hvci50b2tlbic7XG5cbmltcG9ydCB7IFNJR05QT1NUX1BPU0lUSU9OUyB9IGZyb20gJy4vc2lnbnBvc3QtcG9zaXRpb25zJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbi8vIGFrYSB3aGVyZSB0aGUgYXJyb3cgLyBwb2ludGVyIGlzIGF0IGluIHJlbGF0aW9uIHRvIHRoZSBhbmNob3JcbmNvbnN0IFBPU0lUSU9OUzogc3RyaW5nW10gPSBbXG4gICd0b3AtbGVmdCcsXG4gICd0b3AtbWlkZGxlJyxcbiAgJ3RvcC1yaWdodCcsXG4gICdyaWdodC10b3AnLFxuICAncmlnaHQtbWlkZGxlJywgLy8gZGVmYXVsdFxuICAncmlnaHQtYm90dG9tJyxcbiAgJ2JvdHRvbS1yaWdodCcsXG4gICdib3R0b20tbWlkZGxlJyxcbiAgJ2JvdHRvbS1sZWZ0JyxcbiAgJ2xlZnQtYm90dG9tJyxcbiAgJ2xlZnQtbWlkZGxlJyxcbiAgJ2xlZnQtdG9wJyxcbl07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1zaWducG9zdC1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNpZ25wb3N0LWZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvcG92ZXItcG9pbnRlclwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZ25wb3N0LWNvbnRlbnQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzaWducG9zdC1hY3Rpb24gY2xvc2VcIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lnbnBvc3QtY29udGVudC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5zaWducG9zdC1jb250ZW50XSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJTaWducG9zdENvbnRlbnQgZXh0ZW5kcyBBYnN0cmFjdFBvcG92ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KFBPUE9WRVJfSE9TVF9BTkNIT1IpXG4gICAgcGFyZW50SG9zdDogRWxlbWVudFJlZixcbiAgICBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge1xuICAgIGlmICghcGFyZW50SG9zdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbHItc2lnbnBvc3QtY29udGVudCBzaG91bGQgb25seSBiZSB1c2VkIGluc2lkZSBvZiBhIGNsci1zaWducG9zdCcpO1xuICAgIH1cbiAgICBzdXBlcihpbmplY3RvciwgcGFyZW50SG9zdCk7XG4gICAgdGhpcy5jb21tb25TdHJpbmdzID0gY29tbW9uU3RyaW5ncztcbiAgICAvLyBEZWZhdWx0c1xuICAgIHRoaXMucG9zaXRpb24gPSAncmlnaHQtbWlkZGxlJztcbiAgICB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgPSB0cnVlO1xuICB9XG5cbiAgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncztcblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQ2xvc2UgZnVuY3Rpb24gdGhhdCB1c2VzIHRoZSBzaWducG9zdCBpbnN0YW5jZSB0byB0b2dnbGUgdGhlIHN0YXRlIG9mIHRoZSBjb250ZW50IHBvcG92ZXIuXG4gICAqXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcG9zaXRpb246IHN0cmluZztcblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBzZXR0ZXIgZm9yIHRoZSBwb3NpdGlvbiBvZiB0aGUgQ2xyU2lnbnBvc3RDb250ZW50IHBvcG92ZXIuIFRoaXMgaXMgYSBjb21iaW5hdGlvbiBvZiB0aGUgZm9sbG93aW5nOlxuICAgKiAtIGFuY2hvclBvaW50IC0gd2hlcmUgb24gdGhlIHRyaWdnZXIgdG8gYW5jaG9yIHRoZSBDbHJTaWducG9zdENvbnRlbnRcbiAgICogLSBwb3BvdmVyUG9pbnQgLSB3aGVyZSBvbiB0aGUgQ2xyU2lnbnBvc3RDb250ZW50IGNvbnRhaW5lciB0byBhbGlnbiB3aXRoIHRoZSBhbmNob3JQb2ludFxuICAgKiAtIG9mZnNldFkgLSB3aGVyZSBvbiB0aGUgWSBheGlzIHRvIGFsaWduIHRoZSBDbHJTaWducG9zdENvbnRlbnQgc28gaXQgbWVldHMgc3BlY3NcbiAgICogLSBvZmZzZXRYIC0gd2hlcmUgb24gdGhlIFggYXhpcyB0byBhbGlnbiB0aGUgQ2xyU2lnbnBvc3RDb250ZW50IHNvIGl0IG1lZXRzIHNwZWNzXG4gICAqIFRoZXJlIGFyZSAxMiBwb3NzaWJsZSBwb3NpdGlvbnMgdG8gcGxhY2UgYSBDbHJTaWducG9zdENvbnRlbnQgY29udGFpbmVyOlxuICAgKiAtIHRvcC1sZWZ0XG4gICAqIC0gdG9wLW1pZGRsZVxuICAgKiAtIHRvcC1yaWdodFxuICAgKiAtIHJpZ2h0LXRvcFxuICAgKiAtIHJpZ2h0LW1pZGRsZVxuICAgKiAtIHJpZ2h0LWJvdHRvbVxuICAgKiAtIGJvdHRvbS1yaWdodFxuICAgKiAtIGJvdHRvbS1taWRkbGVcbiAgICogLSBib3R0b20tbGVmdFxuICAgKiAtIGxlZnQtYm90dG9tXG4gICAqIC0gbGVmdC1taWRkbGVcbiAgICogLSBsZWZ0LXRvcFxuICAgKlxuICAgKiBJIHRoaW5rIG9mIGl0IGFzIGZvbGxvd3MgZm9yICd0b3AtbGVmdCcgLT4gQ09OVEFJTkVSX1NJREUtU0lERV9QT1NJVElPTi4gSW4gdGhpcyBjYXNlIENPTlRBSU5FUl9TSURFIGlzICd0b3AnXG4gICAqIG1lYW5pbmcgdGhlIHRvcCBvZiB0aGUgdHJpZ2dlciBpY29uIChhYm92ZSB0aGUgaWNvbiB0aGF0IGhpZGVzL3Nob3dzKSB0aGUgQ2xyU2lnbnBvc3RDb250ZW50LiBBbmQsIFNJREVfUE9TSVRJT05cbiAgICogaXMgJ2xlZnQnIG1lYW5pbmcgdHdvIHRoaW5nczogMSkgdGhlIENsclNpZ25wb3N0Q29udGVudCBjb250YWluZXIgZXh0ZW5kcyB0byB0aGUgbGVmdCBhbmQgMikgdGhlICdhcnJvdy9wb2ludGVyJ1xuICAgKiBsaW5raW5nIHRoZSBTaW5ncG9zdENvbnRlbnQgdG8gdGhlIHRyaWdnZXIgcG9pbnRzIGRvd24gYXQgdGhlIGhvcml6b250YWwgY2VudGVyIG9mIHRoZSB0cmlnZ2VyIGljb24uXG4gICAqXG4gICAqIEBwYXJhbSBuZXdQb3NpdGlvblxuICAgKi9cbiAgQElucHV0KCdjbHJQb3NpdGlvbicpXG4gIHNldCBwb3NpdGlvbihwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgLy8gVWdoXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMucG9zaXRpb24pO1xuICAgIGlmIChwb3NpdGlvbiAmJiBQT1NJVElPTlMuaW5kZXhPZihwb3NpdGlvbikgPiAtMSkge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSAncmlnaHQtbWlkZGxlJztcbiAgICB9XG4gICAgLy8gVWdoXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMucG9zaXRpb24pO1xuXG4gICAgY29uc3Qgc2V0UG9zaXRpb24gPSBTSUdOUE9TVF9QT1NJVElPTlNbdGhpcy5wb3NpdGlvbl07XG4gICAgdGhpcy5hbmNob3JQb2ludCA9IHNldFBvc2l0aW9uLmFuY2hvclBvaW50O1xuICAgIHRoaXMucG9wb3ZlclBvaW50ID0gc2V0UG9zaXRpb24ucG9wb3ZlclBvaW50O1xuICAgIHRoaXMucG9wb3Zlck9wdGlvbnMub2Zmc2V0WSA9IHNldFBvc2l0aW9uLm9mZnNldFk7XG4gICAgdGhpcy5wb3BvdmVyT3B0aW9ucy5vZmZzZXRYID0gc2V0UG9zaXRpb24ub2Zmc2V0WDtcbiAgfVxufVxuIl19