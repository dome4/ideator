/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PageCollectionService } from './providers/page-collection.service';
let ClrWizardStepnav = class ClrWizardStepnav {
    constructor(pageService) {
        this.pageService = pageService;
    }
};
ClrWizardStepnav = tslib_1.__decorate([
    Component({
        selector: 'clr-wizard-stepnav',
        template: `
        <ol class="clr-wizard-stepnav-list" role="tablist">
            <li *ngFor="let page of pageService.pages" clr-wizard-stepnav-item 
            [page]="page" class="clr-wizard-stepnav-item"></li>
        </ol>
    `,
        host: { class: 'clr-wizard-stepnav' }
    }),
    tslib_1.__metadata("design:paramtypes", [PageCollectionService])
], ClrWizardStepnav);
export { ClrWizardStepnav };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXN0ZXBuYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBWTVFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLFlBQW1CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtJQUFHLENBQUM7Q0FDMUQsQ0FBQTtBQUZZLGdCQUFnQjtJQVY1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFFBQVEsRUFBRTs7Ozs7S0FLUDtRQUNILElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTtLQUN0QyxDQUFDOzZDQUVnQyxxQkFBcUI7R0FEMUMsZ0JBQWdCLENBRTVCO1NBRlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXdpemFyZC1zdGVwbmF2JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG9sIGNsYXNzPVwiY2xyLXdpemFyZC1zdGVwbmF2LWxpc3RcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBwYWdlIG9mIHBhZ2VTZXJ2aWNlLnBhZ2VzXCIgY2xyLXdpemFyZC1zdGVwbmF2LWl0ZW0gXG4gICAgICAgICAgICBbcGFnZV09XCJwYWdlXCIgY2xhc3M9XCJjbHItd2l6YXJkLXN0ZXBuYXYtaXRlbVwiPjwvbGk+XG4gICAgICAgIDwvb2w+XG4gICAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2Nsci13aXphcmQtc3RlcG5hdicgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkU3RlcG5hdiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlU2VydmljZTogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlKSB7fVxufVxuIl19