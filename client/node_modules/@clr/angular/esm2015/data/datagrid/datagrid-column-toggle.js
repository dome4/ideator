import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
let ClrDatagridColumnToggle = 
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggle {
    constructor(commonStrings, columnsService) {
        this.commonStrings = commonStrings;
        this.columnsService = columnsService;
        /***
         * Popover init
         */
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
    }
    get hideableColumnStates() {
        const hideables = this.columnsService.columns.filter(column => column.value.hideable);
        return hideables.map(column => column.value);
    }
    get hasOnlyOneVisibleColumn() {
        const nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
        // this should only return true when there is no non-hideable columns.
        return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter(columnState => !columnState.hidden).length === 1);
    }
    toggleColumnState(columnState, event) {
        const columnToToggle = this.columnsService.columns.filter(column => column.value === columnState)[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    }
    toggleSwitchPanel() {
        this.open = !this.open;
    }
};
tslib_1.__decorate([
    ContentChild(ClrDatagridColumnToggleTitle, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridColumnToggleTitle)
], ClrDatagridColumnToggle.prototype, "customToggleTitle", void 0);
tslib_1.__decorate([
    ContentChild(ClrDatagridColumnToggleButton, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridColumnToggleButton)
], ClrDatagridColumnToggle.prototype, "customToggleButton", void 0);
ClrDatagridColumnToggle = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-column-toggle',
        template: `
    <button
      #anchor
      (click)="toggleSwitchPanel()"
      class="btn btn-sm btn-link column-toggle--action"
      type="button">
      <clr-icon shape="view-columns" [attr.title]="commonStrings.pickColumns"></clr-icon>
    </button>
    <div class="column-switch"
         *clrPopoverOld="open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint">
      <div class="switch-header">
        <ng-container *ngIf="!customToggleTitle">{{commonStrings.showColumns}}</ng-container>
        <ng-content select="clr-dg-column-toggle-title"></ng-content>
        <button
          class="btn btn-sm btn-link toggle-switch-close-button"
          (click)="toggleSwitchPanel()"
          type="button">
          <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
        </button>
      </div>
      <ul class="switch-content list-unstyled">
        <li *ngFor="let columnState of hideableColumnStates;">
          <clr-checkbox-wrapper>
            <input clrCheckbox type="checkbox"
                   [disabled]="hasOnlyOneVisibleColumn && !columnState.hidden"
                   [ngModel]="!columnState.hidden"
                   (ngModelChange)="toggleColumnState(columnState, !$event)">
            <label>
              <ng-template [ngTemplateOutlet]="columnState.titleTemplateRef"></ng-template>
            </label>
          </clr-checkbox-wrapper>
        </li>
      </ul>
      <div class="switch-footer">
        <ng-content select="clr-dg-column-toggle-button"></ng-content>
        <clr-dg-column-toggle-button *ngIf="!customToggleButton">{{commonStrings.selectAll}}</clr-dg-column-toggle-button>
      </div>
    </div>
  `,
        host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
    })
    /** @deprecated since 2.0, remove in 3.0 */
    ,
    tslib_1.__metadata("design:paramtypes", [ClrCommonStrings, ColumnsService])
], ClrDatagridColumnToggle);
export { ClrDatagridColumnToggle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUE4Q3BFLElBQWEsdUJBQXVCO0FBRHBDLDJDQUEyQztBQUMzQyxNQUFhLHVCQUF1QjtJQWFsQyxZQUFtQixhQUErQixFQUFVLGNBQThCO1FBQXZFLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVoxRjs7V0FFRztRQUNJLGdCQUFXLEdBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxpQkFBWSxHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDeEMsU0FBSSxHQUFZLEtBQUssQ0FBQztJQU9nRSxDQUFDO0lBRTlGLElBQUksb0JBQW9CO1FBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEYsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJLHVCQUF1QjtRQUN6QixNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1FBQ25HLHNFQUFzRTtRQUN0RSxPQUFPLENBQ0wsb0JBQW9CLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUNoSCxDQUFDO0lBQ0osQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQXdCLEVBQUUsS0FBYztRQUN4RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRTtZQUNsRCxNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUE7QUE5QkM7SUFEQyxZQUFZLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQzNDLDRCQUE0QjtrRUFBQztBQUVoRDtJQURDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FDM0MsNkJBQTZCO21FQUFDO0FBWHZDLHVCQUF1QjtJQTVDbkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUO1FBQ0QsSUFBSSxFQUFFLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTtLQUM1RSxDQUFDO0lBQ0YsMkNBQTJDOzs2Q0FjUCxnQkFBZ0IsRUFBMEIsY0FBYztHQWIvRSx1QkFBdUIsQ0F1Q25DO1NBdkNZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLWJ1dHRvbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLXRpdGxlJztcblxuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbHVtblN0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbi10b2dnbGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b25cbiAgICAgICNhbmNob3JcbiAgICAgIChjbGljayk9XCJ0b2dnbGVTd2l0Y2hQYW5lbCgpXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayBjb2x1bW4tdG9nZ2xlLS1hY3Rpb25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgPGNsci1pY29uIHNoYXBlPVwidmlldy1jb2x1bW5zXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5waWNrQ29sdW1uc1wiPjwvY2xyLWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtbi1zd2l0Y2hcIlxuICAgICAgICAgKmNsclBvcG92ZXJPbGQ9XCJvcGVuOyBhbmNob3I6IGFuY2hvcjsgYW5jaG9yUG9pbnQ6IGFuY2hvclBvaW50OyBwb3BvdmVyUG9pbnQ6IHBvcG92ZXJQb2ludFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1oZWFkZXJcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21Ub2dnbGVUaXRsZVwiPnt7Y29tbW9uU3RyaW5ncy5zaG93Q29sdW1uc319PC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rIHRvZ2dsZS1zd2l0Y2gtY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU3dpdGNoUGFuZWwoKVwiXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5jbG9zZVwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8dWwgY2xhc3M9XCJzd2l0Y2gtY29udGVudCBsaXN0LXVuc3R5bGVkXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY29sdW1uU3RhdGUgb2YgaGlkZWFibGVDb2x1bW5TdGF0ZXM7XCI+XG4gICAgICAgICAgPGNsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICAgICAgPGlucHV0IGNsckNoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImhhc09ubHlPbmVWaXNpYmxlQ29sdW1uICYmICFjb2x1bW5TdGF0ZS5oaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgIFtuZ01vZGVsXT1cIiFjb2x1bW5TdGF0ZS5oaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInRvZ2dsZUNvbHVtblN0YXRlKGNvbHVtblN0YXRlLCAhJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uU3RhdGUudGl0bGVUZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvY2xyLWNoZWNrYm94LXdyYXBwZXI+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1mb290ZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWNvbHVtbi10b2dnbGUtYnV0dG9uXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8Y2xyLWRnLWNvbHVtbi10b2dnbGUtYnV0dG9uICpuZ0lmPVwiIWN1c3RvbVRvZ2dsZUJ1dHRvblwiPnt7Y29tbW9uU3RyaW5ncy5zZWxlY3RBbGx9fTwvY2xyLWRnLWNvbHVtbi10b2dnbGUtYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jb2x1bW4tc3dpdGNoLXdyYXBwZXJdJzogJ3RydWUnLCAnW2NsYXNzLmFjdGl2ZV0nOiAnb3BlbicgfSxcbn0pXG4vKiogQGRlcHJlY2F0ZWQgc2luY2UgMi4wLCByZW1vdmUgaW4gMy4wICovXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUge1xuICAvKioqXG4gICAqIFBvcG92ZXIgaW5pdFxuICAgKi9cbiAgcHVibGljIGFuY2hvclBvaW50OiBQb2ludCA9IFBvaW50LlRPUF9MRUZUO1xuICBwdWJsaWMgcG9wb3ZlclBvaW50OiBQb2ludCA9IFBvaW50LkxFRlRfQk9UVE9NO1xuICBwdWJsaWMgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1c3RvbVRvZ2dsZVRpdGxlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlO1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgY3VzdG9tVG9nZ2xlQnV0dG9uOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncywgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgZ2V0IGhpZGVhYmxlQ29sdW1uU3RhdGVzKCk6IENvbHVtblN0YXRlW10ge1xuICAgIGNvbnN0IGhpZGVhYmxlcyA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5maWx0ZXIoY29sdW1uID0+IGNvbHVtbi52YWx1ZS5oaWRlYWJsZSk7XG4gICAgcmV0dXJuIGhpZGVhYmxlcy5tYXAoY29sdW1uID0+IGNvbHVtbi52YWx1ZSk7XG4gIH1cblxuICBnZXQgaGFzT25seU9uZVZpc2libGVDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmJOb25IaWRlYWJsZUNvbHVtbnMgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMubGVuZ3RoIC0gdGhpcy5oaWRlYWJsZUNvbHVtblN0YXRlcy5sZW5ndGg7XG4gICAgLy8gdGhpcyBzaG91bGQgb25seSByZXR1cm4gdHJ1ZSB3aGVuIHRoZXJlIGlzIG5vIG5vbi1oaWRlYWJsZSBjb2x1bW5zLlxuICAgIHJldHVybiAoXG4gICAgICBuYk5vbkhpZGVhYmxlQ29sdW1ucyA9PT0gMCAmJiB0aGlzLmhpZGVhYmxlQ29sdW1uU3RhdGVzLmZpbHRlcihjb2x1bW5TdGF0ZSA9PiAhY29sdW1uU3RhdGUuaGlkZGVuKS5sZW5ndGggPT09IDFcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlQ29sdW1uU3RhdGUoY29sdW1uU3RhdGU6IENvbHVtblN0YXRlLCBldmVudDogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbHVtblRvVG9nZ2xlID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlID09PSBjb2x1bW5TdGF0ZSlbMF07XG4gICAgdGhpcy5jb2x1bW5zU2VydmljZS5lbWl0U3RhdGVDaGFuZ2UoY29sdW1uVG9Ub2dnbGUsIHtcbiAgICAgIGhpZGRlbjogZXZlbnQsXG4gICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTl0sXG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVTd2l0Y2hQYW5lbCgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG59XG4iXX0=