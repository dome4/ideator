/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Optional, HostBinding, Input } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
var ClrControlError = /** @class */ (function () {
    function ClrControlError(controlIdService) {
        this.controlIdService = controlIdService;
        this.describedByAttr = null;
        this.subscriptions = [];
    }
    ClrControlError.prototype.ngOnInit = function () {
        var _this = this;
        if (this.controlIdService && !this.describedByAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe(function (id) { return (_this.describedByAttr = id); }));
        }
    };
    ClrControlError.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        Input('aria-describedby'),
        HostBinding('attr.aria-describedby'),
        tslib_1.__metadata("design:type", String)
    ], ClrControlError.prototype, "describedByAttr", void 0);
    ClrControlError = tslib_1.__decorate([
        Component({
            selector: 'clr-control-error',
            template: "\n    <ng-content></ng-content>\n    ",
            host: {
                '[class.clr-subtext]': 'true',
                '[attr.aria-live]': '"polite"',
            }
        }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [ControlIdService])
    ], ClrControlError);
    return ClrControlError;
}());
export { ClrControlError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBYWxFO0lBT0UseUJBQWdDLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSmxFLG9CQUFlLEdBQVcsSUFBSSxDQUFDO1FBRXZCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztJQUUwQixDQUFDO0lBRXRFLGtDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhDLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLENBQUM7U0FDdEc7SUFDSCxDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQWREO1FBRkMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1FBQ3pCLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQzs7NERBQ047SUFIcEIsZUFBZTtRQVYzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSx1Q0FFUDtZQUNILElBQUksRUFBRTtnQkFDSixxQkFBcUIsRUFBRSxNQUFNO2dCQUM3QixrQkFBa0IsRUFBRSxVQUFVO2FBQy9CO1NBQ0YsQ0FBQztRQVFhLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUEyQixnQkFBZ0I7T0FQdkQsZUFBZSxDQWtCM0I7SUFBRCxzQkFBQztDQUFBLEFBbEJELElBa0JDO1NBbEJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9wdGlvbmFsLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1jb250cm9sLWVycm9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLXN1YnRleHRdJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWxpdmVdJzogJ1wicG9saXRlXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJDb250cm9sRXJyb3Ige1xuICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1kZXNjcmliZWRieScpXG4gIGRlc2NyaWJlZEJ5QXR0cjogc3RyaW5nID0gbnVsbDtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250cm9sSWRTZXJ2aWNlOiBDb250cm9sSWRTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNvbnRyb2xJZFNlcnZpY2UgJiYgIXRoaXMuZGVzY3JpYmVkQnlBdHRyKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWRDaGFuZ2Uuc3Vic2NyaWJlKGlkID0+ICh0aGlzLmRlc2NyaWJlZEJ5QXR0ciA9IGlkKSkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==