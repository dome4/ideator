/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
export const TOGGLE_SERVICE = new InjectionToken(undefined);
export function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
export const TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
let ClrPasswordContainer = class ClrPasswordContainer {
    constructor(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.focusService = focusService;
        this.ngControlService = ngControlService;
        this.toggleService = toggleService;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.show = false;
        this.focus = false;
        this._toggle = true;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(state => {
            this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    set clrToggle(state) {
        this._toggle = state;
        if (!state) {
            this.show = false;
        }
    }
    get clrToggle() {
        return this._toggle;
    }
    toggle() {
        this.show = !this.show;
        this.toggleService.next(this.show);
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map(sub => sub.unsubscribe());
        }
    }
};
tslib_1.__decorate([
    Input('clrToggle'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrPasswordContainer.prototype, "clrToggle", null);
tslib_1.__decorate([
    ContentChild(ClrLabel, { static: false }),
    tslib_1.__metadata("design:type", ClrLabel)
], ClrPasswordContainer.prototype, "label", void 0);
ClrPasswordContainer = tslib_1.__decorate([
    Component({
        selector: 'clr-password-container',
        template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [ngClass]="controlClass()">
      <div class="clr-input-wrapper">
        <div class="clr-input-group" [class.clr-focus]="focus">
          <ng-content select="[clrPassword]"></ng-content>
          <button
            *ngIf="clrToggle"
            (click)="toggle()"
            [disabled]="control?.disabled"
            class="clr-input-group-icon-action"
            type="button">
            <clr-icon
            [attr.shape]="show ? 'eye-hide' : 'eye'"
            [attr.title]="show ? commonStrings.hide : commonStrings.show"></clr-icon>
          </button>
        </div>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
      </div>
      <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
      <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
    </div>
    `,
        host: {
            '[class.clr-form-control]': 'true',
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-row]': 'addGrid()',
        },
        providers: [
            IfErrorService,
            NgControlService,
            ControlIdService,
            ControlClassService,
            FocusService,
            TOGGLE_SERVICE_PROVIDER,
        ]
    }),
    tslib_1.__param(1, Optional()),
    tslib_1.__param(5, Inject(TOGGLE_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [IfErrorService,
        LayoutService,
        ControlClassService,
        FocusService,
        NgControlService,
        BehaviorSubject,
        ClrCommonStrings])
], ClrPasswordContainer);
export { ClrPasswordContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcGFzc3dvcmQvcGFzc3dvcmQtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQTJCLFNBQVMsQ0FBQyxDQUFDO0FBQ3RGLE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBQ0QsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO0FBMENyRyxJQUFhLG9CQUFvQixHQUFqQyxNQUFh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UyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJQO1FBQ0gsSUFBSSxFQUFFO1lBQ0osMEJBQTBCLEVBQUUsTUFBTTtZQUNsQyxtQ0FBbUMsRUFBRSxtQkFBbUI7WUFDeEQsaUJBQWlCLEVBQUUsV0FBVztTQUMvQjtRQUNELFNBQVMsRUFBRTtZQUNULGNBQWM7WUFDZCxnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtZQUNuQixZQUFZO1lBQ1osdUJBQXVCO1NBQ3hCO0tBQ0YsQ0FBQztJQXlCRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUlWLG1CQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTs2Q0FMQyxjQUFjO1FBQ0gsYUFBYTtRQUNuQixtQkFBbUI7UUFDM0IsWUFBWTtRQUNQLGdCQUFnQjtRQUNLLGVBQWU7UUFDeEMsZ0JBQWdCO0dBN0I3QixvQkFBb0IsQ0FxRWhDO1NBckVZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuXG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFX1NFUlZJQ0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+Pih1bmRlZmluZWQpO1xuZXhwb3J0IGZ1bmN0aW9uIFRvZ2dsZVNlcnZpY2VGYWN0b3J5KCkge1xuICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG59XG5leHBvcnQgY29uc3QgVE9HR0xFX1NFUlZJQ0VfUFJPVklERVIgPSB7IHByb3ZpZGU6IFRPR0dMRV9TRVJWSUNFLCB1c2VGYWN0b3J5OiBUb2dnbGVTZXJ2aWNlRmFjdG9yeSB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItcGFzc3dvcmQtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICA8bGFiZWwgKm5nSWY9XCIhbGFiZWwgJiYgYWRkR3JpZCgpXCI+PC9sYWJlbD5cbiAgICA8ZGl2IGNsYXNzPVwiY2xyLWNvbnRyb2wtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwiY29udHJvbENsYXNzKClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbHItaW5wdXQtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xyLWlucHV0LWdyb3VwXCIgW2NsYXNzLmNsci1mb2N1c109XCJmb2N1c1wiPlxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJQYXNzd29yZF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nSWY9XCJjbHJUb2dnbGVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sPy5kaXNhYmxlZFwiXG4gICAgICAgICAgICBjbGFzcz1cImNsci1pbnB1dC1ncm91cC1pY29uLWFjdGlvblwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8Y2xyLWljb25cbiAgICAgICAgICAgIFthdHRyLnNoYXBlXT1cInNob3cgPyAnZXllLWhpZGUnIDogJ2V5ZSdcIlxuICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwic2hvdyA/IGNvbW1vblN0cmluZ3MuaGlkZSA6IGNvbW1vblN0cmluZ3Muc2hvd1wiPjwvY2xyLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Y2xyLWljb24gKm5nSWY9XCJpbnZhbGlkXCIgY2xhc3M9XCJjbHItdmFsaWRhdGUtaWNvblwiIHNoYXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtaGVscGVyXCIgKm5nSWY9XCIhaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWVycm9yXCIgKm5nSWY9XCJpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2xdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbC1kaXNhYmxlZF0nOiAnY29udHJvbD8uZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuY2xyLXJvd10nOiAnYWRkR3JpZCgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSWZFcnJvclNlcnZpY2UsXG4gICAgTmdDb250cm9sU2VydmljZSxcbiAgICBDb250cm9sSWRTZXJ2aWNlLFxuICAgIENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgRm9jdXNTZXJ2aWNlLFxuICAgIFRPR0dMRV9TRVJWSUNFX1BST1ZJREVSLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJQYXNzd29yZENvbnRhaW5lciBpbXBsZW1lbnRzIER5bmFtaWNXcmFwcGVyLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIGludmFsaWQgPSBmYWxzZTtcbiAgY29udHJvbDogTmdDb250cm9sO1xuICBfZHluYW1pYyA9IGZhbHNlO1xuICBzaG93ID0gZmFsc2U7XG4gIGZvY3VzID0gZmFsc2U7XG4gIHByaXZhdGUgX3RvZ2dsZSA9IHRydWU7XG5cbiAgQElucHV0KCdjbHJUb2dnbGUnKVxuICBzZXQgY2xyVG9nZ2xlKHN0YXRlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdG9nZ2xlID0gc3RhdGU7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldCBjbHJUb2dnbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZ2dsZTtcbiAgfVxuICBAQ29udGVudENoaWxkKENsckxhYmVsLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgbGFiZWw6IENsckxhYmVsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgcHVibGljIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFRPR0dMRV9TRVJWSUNFKSBwcml2YXRlIHRvZ2dsZVNlcnZpY2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c0NoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzID0gc3RhdGU7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3c7XG4gICAgdGhpcy50b2dnbGVTZXJ2aWNlLm5leHQodGhpcy5zaG93KTtcbiAgfVxuXG4gIGNvbnRyb2xDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmNvbnRyb2xDbGFzcyh0aGlzLmludmFsaWQsIHRoaXMuYWRkR3JpZCgpKTtcbiAgfVxuXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==