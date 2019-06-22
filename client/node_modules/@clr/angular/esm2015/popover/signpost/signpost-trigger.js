import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
let ClrSignpostTrigger = 
/*********
 *
 * @description
 * A Directive added to the ClrSignpost Trigger button that will call the ClrSignpost.toggle() function to hide/show the
 * ClrSignpostContent.
 *
 */
class ClrSignpostTrigger {
    constructor(ifOpenService, renderer, el) {
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe((isOpen) => {
            if (isOpen) {
                this.renderer.addClass(this.el.nativeElement, 'active');
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, 'active');
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    onSignpostTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
};
tslib_1.__decorate([
    HostListener('click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Event]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrSignpostTrigger.prototype, "onSignpostTriggerClick", null);
ClrSignpostTrigger = tslib_1.__decorate([
    Directive({ selector: '[clrSignpostTrigger]', host: { class: 'signpost-trigger' } })
    /*********
     *
     * @description
     * A Directive added to the ClrSignpost Trigger button that will call the ClrSignpost.toggle() function to hide/show the
     * ClrSignpostContent.
     *
     */
    ,
    tslib_1.__metadata("design:paramtypes", [IfOpenService, Renderer2, ElementRef])
], ClrSignpostTrigger);
export { ClrSignpostTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBV3hFLElBQWEsa0JBQWtCO0FBUC9COzs7Ozs7R0FNRztBQUNILE1BQWEsa0JBQWtCO0lBRzdCLFlBQW9CLGFBQTRCLEVBQVUsUUFBbUIsRUFBVSxFQUFjO1FBQWpGLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFGN0Ysa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBR3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFlLEVBQUUsRUFBRTtZQUMxRCxJQUFJLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1RDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBaUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxzQkFBc0IsQ0FBQyxLQUFZO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFBO0FBSEM7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUNKLEtBQUs7O2dFQUVsQztBQTNCVSxrQkFBa0I7SUFUOUIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUM7SUFFckY7Ozs7OztPQU1HOzs2Q0FJa0MsYUFBYSxFQUFvQixTQUFTLEVBQWMsVUFBVTtHQUgxRixrQkFBa0IsQ0E0QjlCO1NBNUJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyU2lnbnBvc3RUcmlnZ2VyXScsIGhvc3Q6IHsgY2xhc3M6ICdzaWducG9zdC10cmlnZ2VyJyB9IH0pXG5cbi8qKioqKioqKipcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgRGlyZWN0aXZlIGFkZGVkIHRvIHRoZSBDbHJTaWducG9zdCBUcmlnZ2VyIGJ1dHRvbiB0aGF0IHdpbGwgY2FsbCB0aGUgQ2xyU2lnbnBvc3QudG9nZ2xlKCkgZnVuY3Rpb24gdG8gaGlkZS9zaG93IHRoZVxuICogQ2xyU2lnbnBvc3RDb250ZW50LlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENsclNpZ25wb3N0VHJpZ2dlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKChpc09wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogY2xpY2sgaGFuZGxlciBmb3IgdGhlIENsclNpZ25wb3N0IHRyaWdnZXIgYnV0dG9uIHVzZWQgdG8gaGlkZS9zaG93IENsclNpZ25wb3N0Q29udGVudC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25TaWducG9zdFRyaWdnZXJDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIl19