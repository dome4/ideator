/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardPage } from './wizard-page';
let ClrWizardStepnavItem = class ClrWizardStepnavItem {
    constructor(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    pageGuard() {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    }
    get id() {
        this.pageGuard();
        return this.pageCollection.getStepItemIdForPage(this.page);
    }
    get isDisabled() {
        this.pageGuard();
        return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
    }
    get isCurrent() {
        this.pageGuard();
        return this.page.current;
    }
    get isComplete() {
        this.pageGuard();
        return this.page.completed;
    }
    get canNavigate() {
        this.pageGuard();
        return this.pageCollection.previousPageIsCompleted(this.page);
    }
    click() {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    }
};
tslib_1.__decorate([
    Input('page'),
    tslib_1.__metadata("design:type", ClrWizardPage)
], ClrWizardStepnavItem.prototype, "page", void 0);
ClrWizardStepnavItem = tslib_1.__decorate([
    Component({
        selector: '[clr-wizard-stepnav-item]',
        template: `
        <button type="button" class="btn btn-link clr-wizard-stepnav-link" (click)="click()" [attr.disabled]="isDisabled ? '' : null">
            <ng-template [ngTemplateOutlet]="page.navTitle"></ng-template>
        </button>
    `,
        host: {
            '[id]': 'id',
            '[attr.aria-selected]': 'isCurrent',
            '[attr.aria-controls]': 'id',
            role: 'tab',
            '[class.clr-nav-link]': 'true',
            '[class.nav-item]': 'true',
            '[class.active]': 'isCurrent',
            '[class.disabled]': 'isDisabled',
            '[class.no-click]': '!canNavigate',
            '[class.complete]': 'isComplete',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [WizardNavigationService, PageCollectionService])
], ClrWizardStepnavItem);
export { ClrWizardStepnavItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtc3RlcG5hdi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNCOUMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFHL0IsWUFBbUIsVUFBbUMsRUFBUyxjQUFxQztRQUFqRixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtJQUFHLENBQUM7SUFFaEcsU0FBUztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQztJQUVELElBQVcsRUFBRTtRQUNYLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDO0lBQzVHLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLHFGQUFxRjtRQUNyRixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNyQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNGLENBQUE7QUE3Q2dCO0lBQWQsS0FBSyxDQUFDLE1BQU0sQ0FBQztzQ0FBYyxhQUFhO2tEQUFDO0FBRC9CLG9CQUFvQjtJQXBCaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxRQUFRLEVBQUU7Ozs7S0FJUDtRQUNILElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxJQUFJO1lBQ1osc0JBQXNCLEVBQUUsV0FBVztZQUNuQyxzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLElBQUksRUFBRSxLQUFLO1lBQ1gsc0JBQXNCLEVBQUUsTUFBTTtZQUM5QixrQkFBa0IsRUFBRSxNQUFNO1lBQzFCLGdCQUFnQixFQUFFLFdBQVc7WUFDN0Isa0JBQWtCLEVBQUUsWUFBWTtZQUNoQyxrQkFBa0IsRUFBRSxjQUFjO1lBQ2xDLGtCQUFrQixFQUFFLFlBQVk7U0FDakM7S0FDRixDQUFDOzZDQUkrQix1QkFBdUIsRUFBeUIscUJBQXFCO0dBSHpGLG9CQUFvQixDQThDaEM7U0E5Q1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi93aXphcmQtcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tjbHItd2l6YXJkLXN0ZXBuYXYtaXRlbV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBjbHItd2l6YXJkLXN0ZXBuYXYtbGlua1wiIChjbGljayk9XCJjbGljaygpXCIgW2F0dHIuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZCA/ICcnIDogbnVsbFwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhZ2UubmF2VGl0bGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdpc0N1cnJlbnQnLFxuICAgICdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICdpZCcsXG4gICAgcm9sZTogJ3RhYicsXG4gICAgJ1tjbGFzcy5jbHItbmF2LWxpbmtdJzogJ3RydWUnLFxuICAgICdbY2xhc3MubmF2LWl0ZW1dJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdpc0N1cnJlbnQnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2lzRGlzYWJsZWQnLFxuICAgICdbY2xhc3Mubm8tY2xpY2tdJzogJyFjYW5OYXZpZ2F0ZScsXG4gICAgJ1tjbGFzcy5jb21wbGV0ZV0nOiAnaXNDb21wbGV0ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZFN0ZXBuYXZJdGVtIHtcbiAgQElucHV0KCdwYWdlJykgcHVibGljIHBhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5hdlNlcnZpY2U6IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLCBwdWJsaWMgcGFnZUNvbGxlY3Rpb246IFBhZ2VDb2xsZWN0aW9uU2VydmljZSkge31cblxuICBwcml2YXRlIHBhZ2VHdWFyZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaXphcmQgc3RlcG5hdiBpdGVtIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYSB3aXphcmQgcGFnZS4nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXRTdGVwSXRlbUlkRm9yUGFnZSh0aGlzLnBhZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMucGFnZUd1YXJkKCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5kaXNhYmxlZCB8fCB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkU3RvcE5hdmlnYXRpb24gfHwgdGhpcy5uYXZTZXJ2aWNlLndpemFyZERpc2FibGVTdGVwbmF2O1xuICB9XG5cbiAgcHVibGljIGdldCBpc0N1cnJlbnQoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzQ29tcGxldGUoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmNvbXBsZXRlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuTmF2aWdhdGUoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5wcmV2aW91c1BhZ2VJc0NvbXBsZXRlZCh0aGlzLnBhZ2UpO1xuICB9XG5cbiAgY2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcblxuICAgIC8vIGlmIHdlIGNsaWNrIG9uIG91ciBvd24gc3RlcG5hdiBvciBhIGRpc2FibGVkIHN0ZXBuYXYsIHdlIGRvbid0IHdhbnQgdG8gZG8gYW55dGhpbmdcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkIHx8IHRoaXMuaXNDdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uYXZTZXJ2aWNlLmdvVG8odGhpcy5wYWdlKTtcbiAgfVxufVxuIl19