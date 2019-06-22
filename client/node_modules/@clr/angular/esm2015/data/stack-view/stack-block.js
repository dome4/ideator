import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, HostBinding, Input, Optional, Output, SkipSelf } from '@angular/core';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
let ClrStackBlock = class ClrStackBlock {
    /*
       * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
       * querying for children StackBlocks, but this feature is not available when downgrading
       * the component for Angular 1.
       */
    constructor(parent, commonStrings) {
        this.parent = parent;
        this.commonStrings = commonStrings;
        this.expanded = false;
        this.expandedChange = new EventEmitter(false);
        this.expandable = false;
        this.focused = false;
        this._changedChildren = 0;
        this._fullyInitialized = false;
        this._changed = false;
        if (parent) {
            parent.addChild();
        }
    }
    get getChangedValue() {
        return this._changed || (this._changedChildren > 0 && !this.expanded);
    }
    set setChangedValue(value) {
        this._changed = value;
        if (this.parent && this._fullyInitialized) {
            if (value) {
                this.parent._changedChildren++;
            }
            else {
                this.parent._changedChildren--;
            }
        }
    }
    ngOnInit() {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock  has to be fully initialized at first.
        this._fullyInitialized = true;
    }
    addChild() {
        this.expandable = true;
    }
    toggleExpand() {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    get caretDirection() {
        return this.expanded ? 'down' : 'right';
    }
    get caretTitle() {
        return this.expanded ? this.commonStrings.collapse : this.commonStrings.expand;
    }
    get role() {
        return this.expandable ? 'button' : null;
    }
    get tabIndex() {
        return this.expandable ? '0' : null;
    }
    get onStackLabelFocus() {
        return this.expandable && !this.expanded && this.focused;
    }
    get ariaExpanded() {
        if (!this.expandable) {
            return null;
        }
        else {
            return this.expanded ? 'true' : 'false';
        }
    }
};
tslib_1.__decorate([
    HostBinding('class.stack-block-expanded'),
    Input('clrSbExpanded'),
    tslib_1.__metadata("design:type", Boolean)
], ClrStackBlock.prototype, "expanded", void 0);
tslib_1.__decorate([
    Output('clrSbExpandedChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrStackBlock.prototype, "expandedChange", void 0);
tslib_1.__decorate([
    HostBinding('class.stack-block-expandable'),
    Input('clrSbExpandable'),
    tslib_1.__metadata("design:type", Boolean)
], ClrStackBlock.prototype, "expandable", void 0);
tslib_1.__decorate([
    HostBinding('class.stack-block-changed'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [])
], ClrStackBlock.prototype, "getChangedValue", null);
tslib_1.__decorate([
    Input('clrSbNotifyChange'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrStackBlock.prototype, "setChangedValue", null);
tslib_1.__decorate([
    HostBinding('class.on-focus'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [])
], ClrStackBlock.prototype, "onStackLabelFocus", null);
ClrStackBlock = tslib_1.__decorate([
    Component({
        selector: 'clr-stack-block',
        template: `
    <dt class="stack-block-label"
        (click)="toggleExpand()"
        (keyup.enter)="toggleExpand()"
        (keyup.space)="toggleExpand()"
        (focus)="focused = true"
        (blur)="focused = false"
        [attr.role]="role"
        [attr.tabindex]="tabIndex"
        [attr.aria-expanded]="ariaExpanded">
      <clr-icon shape="caret"
                class="stack-block-caret"
                *ngIf="expandable"
                [attr.dir]="caretDirection"
                [attr.title]="caretTitle"></clr-icon>
      <ng-content select="clr-stack-label"></ng-content>
    </dt>
    <dd class="stack-block-content">
      <ng-content></ng-content>
    </dd>
    <clr-expandable-animation [@clrExpandTrigger]="expanded" class="stack-children">
      <div [style.height]="expanded ? 'auto' : 0">
        <ng-content select="clr-stack-block"></ng-content>
      </div>
    </clr-expandable-animation>
  `,
        // Make sure the host has the proper class for styling purposes
        host: { '[class.stack-block]': 'true' },
        styles: [`
        :host { display: block; }
    `]
    }),
    tslib_1.__param(0, SkipSelf()),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [ClrStackBlock,
        ClrCommonStrings])
], ClrStackBlock);
export { ClrStackBlock };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stYmxvY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3N0YWNrLXZpZXcvc3RhY2stYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBdUM3RSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBZ0N4Qjs7OztTQUlLO0lBQ0wsWUFHVSxNQUFxQixFQUN0QixhQUErQjtRQUQ5QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQXRDeEMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUNLLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBR3hHLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUNqQixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0Isc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGFBQVEsR0FBWSxLQUFLLENBQUM7UUErQmhDLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQS9CRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBR0QsSUFBSSxlQUFlLENBQUMsS0FBYztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJ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bnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXN0YWNrLWJsb2NrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZHQgY2xhc3M9XCJzdGFjay1ibG9jay1sYWJlbFwiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmQoKVwiXG4gICAgICAgIChrZXl1cC5lbnRlcik9XCJ0b2dnbGVFeHBhbmQoKVwiXG4gICAgICAgIChrZXl1cC5zcGFjZSk9XCJ0b2dnbGVFeHBhbmQoKVwiXG4gICAgICAgIChmb2N1cyk9XCJmb2N1c2VkID0gdHJ1ZVwiXG4gICAgICAgIChibHVyKT1cImZvY3VzZWQgPSBmYWxzZVwiXG4gICAgICAgIFthdHRyLnJvbGVdPVwicm9sZVwiXG4gICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYkluZGV4XCJcbiAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJhcmlhRXhwYW5kZWRcIj5cbiAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNhcmV0XCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInN0YWNrLWJsb2NrLWNhcmV0XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImV4cGFuZGFibGVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRpcl09XCJjYXJldERpcmVjdGlvblwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY2FyZXRUaXRsZVwiPjwvY2xyLWljb24+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItc3RhY2stbGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kdD5cbiAgICA8ZGQgY2xhc3M9XCJzdGFjay1ibG9jay1jb250ZW50XCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kZD5cbiAgICA8Y2xyLWV4cGFuZGFibGUtYW5pbWF0aW9uIFtAY2xyRXhwYW5kVHJpZ2dlcl09XCJleHBhbmRlZFwiIGNsYXNzPVwic3RhY2stY2hpbGRyZW5cIj5cbiAgICAgIDxkaXYgW3N0eWxlLmhlaWdodF09XCJleHBhbmRlZCA/ICdhdXRvJyA6IDBcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLXN0YWNrLWJsb2NrXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9jbHItZXhwYW5kYWJsZS1hbmltYXRpb24+XG4gIGAsXG4gIC8vIEN1c3RvbSBlbGVtZW50cyBhcmUgaW5saW5lIGJ5IGRlZmF1bHRcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICA6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9XG4gICAgYCxcbiAgXSxcbiAgLy8gTWFrZSBzdXJlIHRoZSBob3N0IGhhcyB0aGUgcHJvcGVyIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gIGhvc3Q6IHsgJ1tjbGFzcy5zdGFjay1ibG9ja10nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU3RhY2tCbG9jayBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhY2stYmxvY2stZXhwYW5kZWQnKVxuICBASW5wdXQoJ2NsclNiRXhwYW5kZWQnKVxuICBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJTYkV4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YWNrLWJsb2NrLWV4cGFuZGFibGUnKVxuICBASW5wdXQoJ2NsclNiRXhwYW5kYWJsZScpXG4gIGV4cGFuZGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2NoYW5nZWRDaGlsZHJlbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZnVsbHlJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGFjay1ibG9jay1jaGFuZ2VkJylcbiAgZ2V0IGdldENoYW5nZWRWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlZCB8fCAodGhpcy5fY2hhbmdlZENoaWxkcmVuID4gMCAmJiAhdGhpcy5leHBhbmRlZCk7XG4gIH1cblxuICBASW5wdXQoJ2NsclNiTm90aWZ5Q2hhbmdlJylcbiAgc2V0IHNldENoYW5nZWRWYWx1ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NoYW5nZWQgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLl9mdWxseUluaXRpYWxpemVkKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuX2NoYW5nZWRDaGlsZHJlbisrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuX2NoYW5nZWRDaGlsZHJlbi0tO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAgICogVGhpcyB3b3VsZCBiZSBtb3JlIGVmZmljaWVudCB3aXRoIEBDb250ZW50Q2hpbGRyZW4sIHdpdGggdGhlIHBhcmVudCBDbHJTdGFja0Jsb2NrXG4gICAgICogcXVlcnlpbmcgZm9yIGNoaWxkcmVuIFN0YWNrQmxvY2tzLCBidXQgdGhpcyBmZWF0dXJlIGlzIG5vdCBhdmFpbGFibGUgd2hlbiBkb3duZ3JhZGluZ1xuICAgICAqIHRoZSBjb21wb25lbnQgZm9yIEFuZ3VsYXIgMS5cbiAgICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQFNraXBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByaXZhdGUgcGFyZW50OiBDbHJTdGFja0Jsb2NrLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5hZGRDaGlsZCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIGluIG9yZGVyIHRvIGFjY2VzcyB0aGUgcGFyZW50IENsclN0YWNrQmxvY2sncyBwcm9wZXJ0aWVzLFxuICAgIC8vIHRoZSBjaGlsZCBDbHJTdGFja0Jsb2NrICBoYXMgdG8gYmUgZnVsbHkgaW5pdGlhbGl6ZWQgYXQgZmlyc3QuXG4gICAgdGhpcy5fZnVsbHlJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBhZGRDaGlsZCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZGFibGUgPSB0cnVlO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh0aGlzLmV4cGFuZGVkKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2FyZXREaXJlY3Rpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZCA/ICdkb3duJyA6ICdyaWdodCc7XG4gIH1cblxuICBnZXQgY2FyZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gdGhpcy5jb21tb25TdHJpbmdzLmNvbGxhcHNlIDogdGhpcy5jb21tb25TdHJpbmdzLmV4cGFuZDtcbiAgfVxuXG4gIGdldCByb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kYWJsZSA/ICdidXR0b24nIDogbnVsbDtcbiAgfVxuXG4gIGdldCB0YWJJbmRleCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGUgPyAnMCcgOiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vbi1mb2N1cycpXG4gIGdldCBvblN0YWNrTGFiZWxGb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRhYmxlICYmICF0aGlzLmV4cGFuZGVkICYmIHRoaXMuZm9jdXNlZDtcbiAgfVxuXG4gIGdldCBhcmlhRXhwYW5kZWQoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuZXhwYW5kYWJsZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==