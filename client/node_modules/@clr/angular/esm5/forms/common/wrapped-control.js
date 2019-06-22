import * as tslib_1 from "tslib";
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { HostBinding, HostListener, Input, } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { ControlIdService } from './providers/control-id.service';
import { NgControlService } from './providers/ng-control.service';
import { IfErrorService } from './if-error/if-error.service';
import { ControlClassService } from './providers/control-class.service';
import { MarkControlService } from './providers/mark-control.service';
var WrappedFormControl = /** @class */ (function () {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    function WrappedFormControl(vcr, wrapperType, injector, ngControl, renderer, el) {
        var _this = this;
        this.vcr = vcr;
        this.wrapperType = wrapperType;
        this.ngControl = ngControl;
        this.subscriptions = [];
        this.index = 0;
        try {
            this.ngControlService = injector.get(NgControlService);
            this.ifErrorService = injector.get(IfErrorService);
            this.controlClassService = injector.get(ControlClassService);
            this.markControlService = injector.get(MarkControlService);
        }
        catch (e) { }
        if (this.controlClassService) {
            this.controlClassService.initControlClass(renderer, el.nativeElement);
        }
        if (this.markControlService) {
            this.subscriptions.push(this.markControlService.touchedChange.subscribe(function () {
                _this.ngControl.control.markAsTouched();
                _this.ngControl.control.updateValueAndValidity();
            }));
        }
    }
    Object.defineProperty(WrappedFormControl.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            if (this.controlIdService) {
                this.controlIdService.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    WrappedFormControl.prototype.triggerValidation = function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    WrappedFormControl.prototype.getProviderFromContainer = function (token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
    };
    WrappedFormControl.prototype.ngOnInit = function () {
        this._containerInjector = new HostWrapper(this.wrapperType, this.vcr, this.index);
        this.controlIdService = this._containerInjector.get(ControlIdService);
        if (this._id) {
            this.controlIdService.id = this._id;
        }
        else {
            this._id = this.controlIdService.id;
        }
        if (this.ngControlService) {
            this.ngControlService.setControl(this.ngControl);
        }
    };
    WrappedFormControl.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        HostBinding(),
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], WrappedFormControl.prototype, "id", null);
    tslib_1.__decorate([
        HostListener('blur'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], WrappedFormControl.prototype, "triggerValidation", null);
    return WrappedFormControl;
}());
export { WrappedFormControl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFDTCxXQUFXLEVBRVgsWUFBWSxFQUVaLEtBQUssR0FPTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFHckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3RFO0lBWUUsNkdBQTZHO0lBQzdHLGtFQUFrRTtJQUNsRSw0QkFDWSxHQUFxQixFQUNyQixXQUFvQixFQUM5QixRQUFrQixFQUNWLFNBQW9CLEVBQzVCLFFBQW1CLEVBQ25CLEVBQWM7UUFOaEIsaUJBMEJDO1FBekJXLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBRXRCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFacEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLFVBQUssR0FBRyxDQUFDLENBQUM7UUFlbEIsSUFBSTtZQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxtQkFBbUIsR0FB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dGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdGlvblRva2VuLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5cbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtDb250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL21hcmstY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgV3JhcHBlZEZvcm1Db250cm9sPFcgZXh0ZW5kcyBEeW5hbWljV3JhcHBlcj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZTtcbiAgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2U7XG4gIHByaXZhdGUgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZTtcbiAgcHJpdmF0ZSBtYXJrQ29udHJvbFNlcnZpY2U6IE1hcmtDb250cm9sU2VydmljZTtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJvdGVjdGVkIGluZGV4ID0gMDtcbiAgcHJvdGVjdGVkIGNvbnRyb2xJZFNlcnZpY2U6IENvbnRyb2xJZFNlcnZpY2U7XG5cbiAgX2lkOiBzdHJpbmc7XG5cbiAgLy8gSSBsb3N0IHdheSB0b28gbXVjaCB0aW1lIHRyeWluZyB0byBtYWtlIHRoaXMgd29yayB3aXRob3V0IGluamVjdGluZyB0aGUgVmlld0NvbnRhaW5lclJlZiBhbmQgdGhlIEluamVjdG9yLFxuICAvLyBJJ20gZ2l2aW5nIHVwLiBTbyB3ZSBoYXZlIHRvIGluamVjdCB0aGVzZSB0d28gbWFudWFsbHkgZm9yIG5vdy5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgd3JhcHBlclR5cGU6IFR5cGU8Vz4sXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KE5nQ29udHJvbFNlcnZpY2UpO1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZSA9IGluamVjdG9yLmdldChJZkVycm9yU2VydmljZSk7XG4gICAgICB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UgPSBpbmplY3Rvci5nZXQoQ29udHJvbENsYXNzU2VydmljZSk7XG4gICAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZSA9IGluamVjdG9yLmdldChNYXJrQ29udHJvbFNlcnZpY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICBpZiAodGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuaW5pdENvbnRyb2xDbGFzcyhyZW5kZXJlciwgZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1hcmtDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMubWFya0NvbnRyb2xTZXJ2aWNlLnRvdWNoZWRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKClcbiAgQElucHV0KClcbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2lkID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuY29udHJvbElkU2VydmljZSkge1xuICAgICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIGlmICh0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnRyaWdnZXJTdGF0dXNDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluZXJJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgLy8gQFRPRE8gVGhpcyBtZXRob2QgaGFzIGEgdHJ5L2NhdGNoIGR1ZSB0byBhbiB1bmtub3duIGlzc3VlIHRoYXQgY2FtZSB3aGVuIGJ1aWxkaW5nIHRoZSBjbHJUb2dnbGUgZmVhdHVyZVxuICAvLyBXZSBuZWVkIHRvIGZpZ3VyZSBvdXQgd2h5IHRoaXMgZmFpbHMgZm9yIHRoZSBDbHJUb2dnbGUgc2NlbmFyaW8gYnV0IHdvcmtzIGZvciBEYXRlIHBpY2tlci4uLlxuICAvLyBUbyBzZWUgdGhlIGVycm9yLCByZW1vdmUgdGhlIHRyeS9jYXRjaCBoZXJlIGFuZCBydW4gdGhlIENsclRvZ2dsZSBzdWl0ZSB0byBzZWUgaXNzdWVzIGdldHRpbmcgdGhlIGNvbnRhaW5lclxuICAvLyBpbmplY3RvciBpbiB0aW1lLCBhbmQgdGhpcyBPTkxZIEhBUFBFTlMgaW4gdGVzdHMgYW5kIG5vdCBpbiBkZXYvcHJvZCBtb2RlLlxuICBwcm90ZWN0ZWQgZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyPFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBUKTogVCB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXJJbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBub3RGb3VuZFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2NvbnRhaW5lckluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKHRoaXMud3JhcHBlclR5cGUsIHRoaXMudmNyLCB0aGlzLmluZGV4KTtcbiAgICB0aGlzLmNvbnRyb2xJZFNlcnZpY2UgPSB0aGlzLl9jb250YWluZXJJbmplY3Rvci5nZXQoQ29udHJvbElkU2VydmljZSk7XG4gICAgaWYgKHRoaXMuX2lkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQgPSB0aGlzLl9pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faWQgPSB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLnNldENvbnRyb2wodGhpcy5uZ0NvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==