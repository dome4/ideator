import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
var ClrSignpostTrigger = /** @class */ (function () {
    function ClrSignpostTrigger(ifOpenService, renderer, el) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe(function (isOpen) {
            if (isOpen) {
                _this.renderer.addClass(_this.el.nativeElement, 'active');
            }
            else {
                _this.renderer.removeClass(_this.el.nativeElement, 'active');
            }
        }));
    }
    ClrSignpostTrigger.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    ClrSignpostTrigger.prototype.onSignpostTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
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
    return ClrSignpostTrigger;
}());
export { ClrSignpostTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBV3hFO0lBR0UsNEJBQW9CLGFBQTRCLEVBQVUsUUFBbUIsRUFBVSxFQUFjO1FBQXJHLGlCQVVDO1FBVm1CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFGN0Ysa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBR3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFlO1lBQ3RELElBQUksTUFBTSxFQUFFO2dCQUNWLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVEO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFpQixJQUFLLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxtREFBc0IsR0FBdEIsVUFBdUIsS0FBWTtRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRkQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUNKLEtBQUs7O29FQUVsQztJQTNCVSxrQkFBa0I7UUFUOUIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUM7UUFFckY7Ozs7OztXQU1HOztpREFJa0MsYUFBYSxFQUFvQixTQUFTLEVBQWMsVUFBVTtPQUgxRixrQkFBa0IsQ0E0QjlCO0lBQUQseUJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTVCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclNpZ25wb3N0VHJpZ2dlcl0nLCBob3N0OiB7IGNsYXNzOiAnc2lnbnBvc3QtdHJpZ2dlcicgfSB9KVxuXG4vKioqKioqKioqXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIERpcmVjdGl2ZSBhZGRlZCB0byB0aGUgQ2xyU2lnbnBvc3QgVHJpZ2dlciBidXR0b24gdGhhdCB3aWxsIGNhbGwgdGhlIENsclNpZ25wb3N0LnRvZ2dsZSgpIGZ1bmN0aW9uIHRvIGhpZGUvc2hvdyB0aGVcbiAqIENsclNpZ25wb3N0Q29udGVudC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDbHJTaWducG9zdFRyaWdnZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZSgoaXNPcGVuOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIGNsaWNrIGhhbmRsZXIgZm9yIHRoZSBDbHJTaWducG9zdCB0cmlnZ2VyIGJ1dHRvbiB1c2VkIHRvIGhpZGUvc2hvdyBDbHJTaWducG9zdENvbnRlbnQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uU2lnbnBvc3RUcmlnZ2VyQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gIH1cbn1cbiJdfQ==