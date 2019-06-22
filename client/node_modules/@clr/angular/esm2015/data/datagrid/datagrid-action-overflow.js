import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { RowActionService } from './providers/row-action-service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
let ClrDatagridActionOverflow = class ClrDatagridActionOverflow {
    constructor(rowActionService, commonStrings) {
        this.rowActionService = rowActionService;
        this.commonStrings = commonStrings;
        this.anchorPoint = Point.RIGHT_CENTER;
        this.popoverPoint = Point.LEFT_CENTER;
        /**
         * Tracks whether the action overflow menu is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
        this.rowActionService.register();
    }
    ngOnDestroy() {
        this.rowActionService.unregister();
    }
    get open() {
        return this._open;
    }
    set open(open) {
        const boolOpen = !!open;
        if (boolOpen !== this._open) {
            this._open = boolOpen;
            this.openChanged.emit(boolOpen);
        }
    }
    /**
     * Shows/hides the action overflow menu
     */
    toggle(event) {
        this.openingEvent = event;
        this.open = !this.open;
    }
    close(event) {
        /*
             * Because this listener is added synchonously, before the event finishes bubbling up the DOM,
             * we end up firing on the very click that just opened the menu, p
             * otentially closing it immediately every time. So we just ignore it.
             */
        if (event === this.openingEvent) {
            delete this.openingEvent;
            return;
        }
        this.open = false;
    }
};
tslib_1.__decorate([
    Input('clrDgActionOverflowOpen'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagridActionOverflow.prototype, "open", null);
tslib_1.__decorate([
    Output('clrDgActionOverflowOpenChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridActionOverflow.prototype, "openChanged", void 0);
ClrDatagridActionOverflow = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-action-overflow',
        template: `
        <button (click)="toggle($event)" type="button" class="datagrid-action-toggle" #anchor>
            <clr-icon shape="ellipsis-vertical" [attr.title]="commonStrings.rowActions"></clr-icon>
        </button>
        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
                     [clrPopoverOldPopoverPoint]="popoverPoint">
            <div #menu class="datagrid-action-overflow" (clrOutsideClick)="close($event)" [clrStrict]="true">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [RowActionService, ClrCommonStrings])
], ClrDatagridActionOverflow);
export { ClrDatagridActionOverflow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1hY3Rpb24tb3ZlcmZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQWdCN0UsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFJcEMsWUFBb0IsZ0JBQWtDLEVBQVMsYUFBK0I7UUFBMUUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUh2RixnQkFBVyxHQUFVLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDeEMsaUJBQVksR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDO1FBVS9DOztXQUVHO1FBQ0ssVUFBSyxHQUFHLEtBQUssQ0FBQztRQWMwQixnQkFBVyxHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBeEI3RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQU1ELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBR0QsSUFBVyxJQUFJLENBQUMsSUFBYTtRQUMzQixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBVUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsS0FBVTtRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQWlCO1FBQzVCOzs7O2VBSU87UUFDUCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN6QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQXBDQztJQURDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQzs7O3FEQU9oQztBQUV3QztJQUF4QyxNQUFNLENBQUMsK0JBQStCLENBQUM7OzhEQUF1RDtBQTdCcEYseUJBQXlCO0lBZHJDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0tBVVA7S0FDSixDQUFDOzZDQUtzQyxnQkFBZ0IsRUFBd0IsZ0JBQWdCO0dBSm5GLHlCQUF5QixDQXlEckM7U0F6RFkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuXG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1hY3Rpb24tb3ZlcmZsb3cnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRhdGFncmlkLWFjdGlvbi10b2dnbGVcIiAjYW5jaG9yPlxuICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZWxsaXBzaXMtdmVydGljYWxcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLnJvd0FjdGlvbnNcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFsoY2xyUG9wb3Zlck9sZCldPVwib3BlblwiIFtjbHJQb3BvdmVyT2xkQW5jaG9yXT1cImFuY2hvclwiIFtjbHJQb3BvdmVyT2xkQW5jaG9yUG9pbnRdPVwiYW5jaG9yUG9pbnRcIlxuICAgICAgICAgICAgICAgICAgICAgW2NsclBvcG92ZXJPbGRQb3BvdmVyUG9pbnRdPVwicG9wb3ZlclBvaW50XCI+XG4gICAgICAgICAgICA8ZGl2ICNtZW51IGNsYXNzPVwiZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93XCIgKGNsck91dHNpZGVDbGljayk9XCJjbG9zZSgkZXZlbnQpXCIgW2NsclN0cmljdF09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRBY3Rpb25PdmVyZmxvdyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBhbmNob3JQb2ludDogUG9pbnQgPSBQb2ludC5SSUdIVF9DRU5URVI7XG4gIHB1YmxpYyBwb3BvdmVyUG9pbnQ6IFBvaW50ID0gUG9pbnQuTEVGVF9DRU5URVI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge1xuICAgIHRoaXMucm93QWN0aW9uU2VydmljZS5yZWdpc3RlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yb3dBY3Rpb25TZXJ2aWNlLnVucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja3Mgd2hldGhlciB0aGUgYWN0aW9uIG92ZXJmbG93IG1lbnUgaXMgb3BlbiBvciBub3RcbiAgICovXG4gIHByaXZhdGUgX29wZW4gPSBmYWxzZTtcbiAgcHVibGljIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9vcGVuO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0FjdGlvbk92ZXJmbG93T3BlbicpXG4gIHB1YmxpYyBzZXQgb3BlbihvcGVuOiBib29sZWFuKSB7XG4gICAgY29uc3QgYm9vbE9wZW4gPSAhIW9wZW47XG4gICAgaWYgKGJvb2xPcGVuICE9PSB0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuID0gYm9vbE9wZW47XG4gICAgICB0aGlzLm9wZW5DaGFuZ2VkLmVtaXQoYm9vbE9wZW4pO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnQWN0aW9uT3ZlcmZsb3dPcGVuQ2hhbmdlJykgcHVibGljIG9wZW5DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgLypcbiAgICAgKiBXZSBuZWVkIHRvIHJlbWVtYmVyIHRoZSBjbGljayB0aGF0IG9wZW5zIHRoZSBtZW51LCB0byBtYWtlIHN1cmUgaXQgZG9lc24ndCBjbG9zZSB0aGUgbWVudSBpbnN0YW50bHlcbiAgICAgKiB3aGVuIHRoZSBldmVudCBidWJibGVzIHVwIHRoZSBET00gYWxsIHRoZSB3YXkgdG8gdGhlIGRvY3VtZW50LCB3aGljaCB3ZSBhbHNvIGxpc3RlbiB0by5cbiAgICAgKi9cbiAgcHJpdmF0ZSBvcGVuaW5nRXZlbnQ6IGFueTtcblxuICAvKipcbiAgICogU2hvd3MvaGlkZXMgdGhlIGFjdGlvbiBvdmVyZmxvdyBtZW51XG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9wZW5pbmdFdmVudCA9IGV2ZW50O1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAvKlxuICAgICAgICAgKiBCZWNhdXNlIHRoaXMgbGlzdGVuZXIgaXMgYWRkZWQgc3luY2hvbm91c2x5LCBiZWZvcmUgdGhlIGV2ZW50IGZpbmlzaGVzIGJ1YmJsaW5nIHVwIHRoZSBET00sXG4gICAgICAgICAqIHdlIGVuZCB1cCBmaXJpbmcgb24gdGhlIHZlcnkgY2xpY2sgdGhhdCBqdXN0IG9wZW5lZCB0aGUgbWVudSwgcFxuICAgICAgICAgKiBvdGVudGlhbGx5IGNsb3NpbmcgaXQgaW1tZWRpYXRlbHkgZXZlcnkgdGltZS4gU28gd2UganVzdCBpZ25vcmUgaXQuXG4gICAgICAgICAqL1xuICAgIGlmIChldmVudCA9PT0gdGhpcy5vcGVuaW5nRXZlbnQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLm9wZW5pbmdFdmVudDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==