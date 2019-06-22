/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ClrControlHelper = class ClrControlHelper {
};
ClrControlHelper = tslib_1.__decorate([
    Component({
        selector: 'clr-control-helper',
        template: `
    <ng-content></ng-content>
    `,
        host: { '[class.clr-subtext]': 'true' }
    })
], ClrControlHelper);
export { ClrControlHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTMUMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7Q0FBRyxDQUFBO0FBQW5CLGdCQUFnQjtJQVA1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFFBQVEsRUFBRTs7S0FFUDtRQUNILElBQUksRUFBRSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRTtLQUN4QyxDQUFDO0dBQ1csZ0JBQWdCLENBQUc7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1jb250cm9sLWhlbHBlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jbHItc3VidGV4dF0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ29udHJvbEhlbHBlciB7fVxuIl19