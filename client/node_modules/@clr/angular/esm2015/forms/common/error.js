/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Optional, HostBinding, Input } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
let ClrControlError = class ClrControlError {
    constructor(controlIdService) {
        this.controlIdService = controlIdService;
        this.describedByAttr = null;
        this.subscriptions = [];
    }
    ngOnInit() {
        if (this.controlIdService && !this.describedByAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe(id => (this.describedByAttr = id)));
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    Input('aria-describedby'),
    HostBinding('attr.aria-describedby'),
    tslib_1.__metadata("design:type", String)
], ClrControlError.prototype, "describedByAttr", void 0);
ClrControlError = tslib_1.__decorate([
    Component({
        selector: 'clr-control-error',
        template: `
    <ng-content></ng-content>
    `,
        host: {
            '[class.clr-subtext]': 'true',
            '[attr.aria-live]': '"polite"',
        }
    }),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [ControlIdService])
], ClrControlError);
export { ClrControlError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBYWxFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFPMUIsWUFBZ0MsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFKbEUsb0JBQWUsR0FBVyxJQUFJLENBQUM7UUFFdkIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBRTBCLENBQUM7SUFFdEUsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEc7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNGLENBQUE7QUFmQztJQUZDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztJQUN6QixXQUFXLENBQUMsdUJBQXVCLENBQUM7O3dEQUNOO0FBSHBCLGVBQWU7SUFWM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7O0tBRVA7UUFDSCxJQUFJLEVBQUU7WUFDSixxQkFBcUIsRUFBRSxNQUFNO1lBQzdCLGtCQUFrQixFQUFFLFVBQVU7U0FDL0I7S0FDRixDQUFDO0lBUWEsbUJBQUEsUUFBUSxFQUFFLENBQUE7NkNBQTJCLGdCQUFnQjtHQVB2RCxlQUFlLENBa0IzQjtTQWxCWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItY29udHJvbC1lcnJvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1zdWJ0ZXh0XSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1saXZlXSc6ICdcInBvbGl0ZVwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ29udHJvbEVycm9yIHtcbiAgQElucHV0KCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGVzY3JpYmVkYnknKVxuICBkZXNjcmliZWRCeUF0dHI6IHN0cmluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbElkU2VydmljZTogQ29udHJvbElkU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sSWRTZXJ2aWNlICYmICF0aGlzLmRlc2NyaWJlZEJ5QXR0cikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkQ2hhbmdlLnN1YnNjcmliZShpZCA9PiAodGhpcy5kZXNjcmliZWRCeUF0dHIgPSBpZCkpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=