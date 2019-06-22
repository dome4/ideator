import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
let ClrDatagridColumnToggleButton = 
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggleButton {
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    hideableColumns() {
        return this.columnsService.columns.filter(column => column.value.hideable);
    }
    get allHideablesVisible() {
        return this.hideableColumns().filter(column => column.value.hidden).length === 0;
    }
    selectAll() {
        this.hideableColumns().forEach(hideableColumn => this.columnsService.emitStateChange(hideableColumn, {
            hidden: false,
            changes: [DatagridColumnChanges.HIDDEN],
        }));
    }
};
ClrDatagridColumnToggleButton = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-column-toggle-button',
        template: `
    <button class="btn btn-sm btn-link switch-button"
            (click)="selectAll()"
            [disabled]="allHideablesVisible"
            type="button">
      <ng-content></ng-content>
    </button>
  `
    })
    /** @deprecated since 2.0, remove in 3.0 */
    ,
    tslib_1.__metadata("design:paramtypes", [ColumnsService])
], ClrDatagridColumnToggleButton);
export { ClrDatagridColumnToggleButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFjcEUsSUFBYSw2QkFBNkI7QUFEMUMsMkNBQTJDO0FBQzNDLE1BQWEsNkJBQTZCO0lBQ3hDLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFHLENBQUM7SUFFOUMsZUFBZTtRQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO1NBQ3hDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFuQlksNkJBQTZCO0lBWnpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw2QkFBNkI7UUFDdkMsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7S0FDRixDQUFDO0lBQ0YsMkNBQTJDOzs2Q0FFTCxjQUFjO0dBRHZDLDZCQUE2QixDQW1CekM7U0FuQlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbi10b2dnbGUtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayBzd2l0Y2gtYnV0dG9uXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RBbGwoKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiYWxsSGlkZWFibGVzVmlzaWJsZVwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9idXR0b24+XG4gIGAsXG59KVxuLyoqIEBkZXByZWNhdGVkIHNpbmNlIDIuMCwgcmVtb3ZlIGluIDMuMCAqL1xuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgcHJpdmF0ZSBoaWRlYWJsZUNvbHVtbnMoKTogQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPltdIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlLmhpZGVhYmxlKTtcbiAgfVxuXG4gIGdldCBhbGxIaWRlYWJsZXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmhpZGVhYmxlQ29sdW1ucygpLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlLmhpZGRlbikubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuaGlkZWFibGVDb2x1bW5zKCkuZm9yRWFjaChoaWRlYWJsZUNvbHVtbiA9PlxuICAgICAgdGhpcy5jb2x1bW5zU2VydmljZS5lbWl0U3RhdGVDaGFuZ2UoaGlkZWFibGVDb2x1bW4sIHtcbiAgICAgICAgaGlkZGVuOiBmYWxzZSxcbiAgICAgICAgY2hhbmdlczogW0RhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU5dLFxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=