import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ElementRef, HostBinding, Injectable, Injector, Renderer2, SkipSelf, } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ESC } from '../../utils/key-codes/key-codes';
import { Popover } from './popover';
// Literally any annotation would work here, but writing our own @HoneyBadger annotation feels overkill.
let AbstractPopover = class AbstractPopover {
    constructor(injector, parentHost) {
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        /*
           * Until https://github.com/angular/angular/issues/8785 is supported, we don't have any way to instantiate
           * a separate directive on the host. So let's do dirty but performant for now.
           */
        this.closeOnOutsideClick = false;
        this.el = injector.get(ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe(change => {
            if (change) {
                this.anchor();
                this.attachESCListener();
            }
            else {
                this.release();
                this.detachESCListener();
            }
        });
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    anchor() {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    }
    release() {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    }
    ngAfterViewChecked() {
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(() => {
                // if a scroll event is detected, close the popover
                this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    }
    ngOnDestroy() {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    }
    /*
       * Fallback to hide when *clrIfOpen is not being used
       */
    get isOffScreen() {
        return this.ifOpenService.open ? false : true;
    }
    attachESCListener() {
        this.documentESCListener = this.renderer.listen('document', 'keydown', event => {
            if (event && event.keyCode === ESC) {
                this.ifOpenService.open = false;
            }
        });
    }
    detachESCListener() {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    }
    attachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', event => (this.ignore = event));
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', event => (this.ignore = event));
            }
            this.documentClickListener = this.renderer.listen('document', 'click', event => {
                if (event === this.ignore) {
                    delete this.ignore;
                }
                else {
                    this.ifOpenService.open = false;
                }
            });
        }
    }
    detachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            if (this.hostClickListener) {
                this.hostClickListener();
                delete this.hostClickListener;
            }
            if (this.ignoredElementClickListener) {
                this.ignoredElementClickListener();
                delete this.ignoredElementClickListener;
            }
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    }
};
tslib_1.__decorate([
    HostBinding('class.is-off-screen'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], AbstractPopover.prototype, "isOffScreen", null);
AbstractPopover = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, SkipSelf()),
    tslib_1.__metadata("design:paramtypes", [Injector, ElementRef])
], AbstractPopover);
export { AbstractPopover };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvY29tbW9uL2Fic3RyYWN0LXBvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBRUwsVUFBVSxFQUNWLFdBQVcsRUFDWCxVQUFVLEVBQ1YsUUFBUSxFQUVSLFNBQVMsRUFDVCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV0RCxPQUFPLEVBQVMsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzNDLHdHQUF3RztBQUV4RyxJQUFzQixlQUFlLEdBQXJDLE1BQXNCLGVBQWU7SUFDbkMsWUFBWSxRQUFrQixFQUF3QixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBOEJwRSxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUtuQixtQkFBYyxHQUFtQixFQUFFLENBQUM7UUEyQzlDOzs7YUFHSztRQUNFLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQWpGakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUUzQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkUsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFrQlMsTUFBTTtRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLE1BQU07UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQ2pELENBQUM7SUFFUyxPQUFPO1FBQ2YsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZTtpQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7aUJBQ2pGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsbURBQW1EO2dCQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O1NBRUs7SUFHTCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNoRCxDQUFDO0lBYU8saUJBQWlCO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzdFLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDakM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5RyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDckQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsT0FBTyxFQUNQLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUMvQixDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDN0UsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7aUJBQ2pDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTywwQkFBMEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzthQUMvQjtZQUNELElBQUksSUFBSSxDQUFDLDJCQUEyQixFQUFFO2dCQUNwQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUM7YUFDekM7WUFDRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO2FBQ25DO1NBQ0Y7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWxFQztJQURDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQzs7O2tEQUdsQztBQTdFbUIsZUFBZTtJQURwQyxVQUFVLEVBQUU7SUFFc0IsbUJBQUEsUUFBUSxFQUFFLENBQUE7NkNBQXJCLFFBQVEsRUFBb0MsVUFBVTtHQUR4RCxlQUFlLENBNklwQztTQTdJcUIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcbmltcG9ydCB7IEVTQyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleS1jb2Rlcy9rZXktY29kZXMnO1xuXG5pbXBvcnQgeyBQb2ludCwgUG9wb3ZlciB9IGZyb20gJy4vcG9wb3Zlcic7XG5pbXBvcnQgeyBQb3BvdmVyT3B0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci1vcHRpb25zLmludGVyZmFjZSc7XG5cbi8vIExpdGVyYWxseSBhbnkgYW5ub3RhdGlvbiB3b3VsZCB3b3JrIGhlcmUsIGJ1dCB3cml0aW5nIG91ciBvd24gQEhvbmV5QmFkZ2VyIGFubm90YXRpb24gZmVlbHMgb3ZlcmtpbGwuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RQb3BvdmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBAU2tpcFNlbGYoKSBwcm90ZWN0ZWQgcGFyZW50SG9zdDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWwgPSBpbmplY3Rvci5nZXQoRWxlbWVudFJlZik7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KElmT3BlblNlcnZpY2UpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBpbmplY3Rvci5nZXQoUmVuZGVyZXIyKTtcbiAgICAvLyBEZWZhdWx0IGFuY2hvciBpcyB0aGUgcGFyZW50IGhvc3RcbiAgICB0aGlzLmFuY2hvckVsZW0gPSBwYXJlbnRIb3N0Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnBvcG92ZXJJbnN0YW5jZSA9IG5ldyBQb3BvdmVyKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUoY2hhbmdlID0+IHtcbiAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5hbmNob3IoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hFU0NMaXN0ZW5lcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlKCk7XG4gICAgICAgIHRoaXMuZGV0YWNoRVNDTGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4pIHtcbiAgICAgIHRoaXMuYW5jaG9yKCk7XG4gICAgICB0aGlzLmF0dGFjaEVTQ0xpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmO1xuICBwcm90ZWN0ZWQgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZTtcbiAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgcHJpdmF0ZSBwb3BvdmVySW5zdGFuY2U6IFBvcG92ZXI7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSB1cGRhdGVBbmNob3IgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgYW5jaG9yRWxlbTogYW55O1xuICBwcm90ZWN0ZWQgYW5jaG9yUG9pbnQ6IFBvaW50O1xuICBwcm90ZWN0ZWQgcG9wb3ZlclBvaW50OiBQb2ludDtcbiAgcHJvdGVjdGVkIHBvcG92ZXJPcHRpb25zOiBQb3BvdmVyT3B0aW9ucyA9IHt9O1xuXG4gIHByb3RlY3RlZCBpZ25vcmVkRWxlbWVudDogYW55O1xuXG4gIHByb3RlY3RlZCBhbmNob3IoKSB7XG4gICAgdGhpcy51cGRhdGVBbmNob3IgPSB0cnVlO1xuICAgIC8vIFVnaFxuICAgIHRoaXMuaWdub3JlID0gdGhpcy5pZk9wZW5TZXJ2aWNlLm9yaWdpbmFsRXZlbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVsZWFzZSgpIHtcbiAgICB0aGlzLmRldGFjaE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgdGhpcy5wb3BvdmVySW5zdGFuY2UucmVsZWFzZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnVwZGF0ZUFuY2hvcikge1xuICAgICAgdGhpcy51cGRhdGVBbmNob3IgPSBmYWxzZTtcbiAgICAgIHRoaXMucG9wb3Zlckluc3RhbmNlXG4gICAgICAgIC5hbmNob3IodGhpcy5hbmNob3JFbGVtLCB0aGlzLmFuY2hvclBvaW50LCB0aGlzLnBvcG92ZXJQb2ludCwgdGhpcy5wb3BvdmVyT3B0aW9ucylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgYSBzY3JvbGwgZXZlbnQgaXMgZGV0ZWN0ZWQsIGNsb3NlIHRoZSBwb3BvdmVyXG4gICAgICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLmF0dGFjaE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWxlYXNlKCk7XG4gICAgdGhpcy5kZXRhY2hFU0NMaXN0ZW5lcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAgICAqIEZhbGxiYWNrIHRvIGhpZGUgd2hlbiAqY2xySWZPcGVuIGlzIG5vdCBiZWluZyB1c2VkXG4gICAgICovXG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pcy1vZmYtc2NyZWVuJylcbiAgZ2V0IGlzT2ZmU2NyZWVuKCkge1xuICAgIHJldHVybiB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuXG4gIC8qXG4gICAgICogVW50aWwgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvODc4NSBpcyBzdXBwb3J0ZWQsIHdlIGRvbid0IGhhdmUgYW55IHdheSB0byBpbnN0YW50aWF0ZVxuICAgICAqIGEgc2VwYXJhdGUgZGlyZWN0aXZlIG9uIHRoZSBob3N0LiBTbyBsZXQncyBkbyBkaXJ0eSBidXQgcGVyZm9ybWFudCBmb3Igbm93LlxuICAgICAqL1xuICBwdWJsaWMgY2xvc2VPbk91dHNpZGVDbGljayA9IGZhbHNlO1xuICBwcml2YXRlIGhvc3RDbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBkb2N1bWVudEVTQ0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIGlnbm9yZWRFbGVtZW50Q2xpY2tMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBpZ25vcmU6IGFueTtcblxuICBwcml2YXRlIGF0dGFjaEVTQ0xpc3RlbmVyKCk6IHZvaWQge1xuICAgIHRoaXMuZG9jdW1lbnRFU0NMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQykge1xuICAgICAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hFU0NMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kb2N1bWVudEVTQ0xpc3RlbmVyKSB7XG4gICAgICB0aGlzLmRvY3VtZW50RVNDTGlzdGVuZXIoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmRvY3VtZW50RVNDTGlzdGVuZXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrKSB7XG4gICAgICB0aGlzLmhvc3RDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCBldmVudCA9PiAodGhpcy5pZ25vcmUgPSBldmVudCkpO1xuICAgICAgaWYgKHRoaXMuaWdub3JlZEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5pZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICB0aGlzLmlnbm9yZWRFbGVtZW50LFxuICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgZXZlbnQgPT4gKHRoaXMuaWdub3JlID0gZXZlbnQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSB0aGlzLmlnbm9yZSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmlnbm9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGFjaE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgIGlmICh0aGlzLmhvc3RDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuaG9zdENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaG9zdENsaWNrTGlzdGVuZXI7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5pZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaWdub3JlZEVsZW1lbnRDbGlja0xpc3RlbmVyO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==