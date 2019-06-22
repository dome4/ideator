import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, HostBinding, Input, Optional, Output, SkipSelf } from '@angular/core';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrStackBlock = /** @class */ (function () {
    /*
       * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
       * querying for children StackBlocks, but this feature is not available when downgrading
       * the component for Angular 1.
       */
    function ClrStackBlock(parent, commonStrings) {
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
    Object.defineProperty(ClrStackBlock.prototype, "getChangedValue", {
        get: function () {
            return this._changed || (this._changedChildren > 0 && !this.expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "setChangedValue", {
        set: function (value) {
            this._changed = value;
            if (this.parent && this._fullyInitialized) {
                if (value) {
                    this.parent._changedChildren++;
                }
                else {
                    this.parent._changedChildren--;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrStackBlock.prototype.ngOnInit = function () {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock  has to be fully initialized at first.
        this._fullyInitialized = true;
    };
    ClrStackBlock.prototype.addChild = function () {
        this.expandable = true;
    };
    ClrStackBlock.prototype.toggleExpand = function () {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    Object.defineProperty(ClrStackBlock.prototype, "caretDirection", {
        get: function () {
            return this.expanded ? 'down' : 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "caretTitle", {
        get: function () {
            return this.expanded ? this.commonStrings.collapse : this.commonStrings.expand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "role", {
        get: function () {
            return this.expandable ? 'button' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "tabIndex", {
        get: function () {
            return this.expandable ? '0' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "onStackLabelFocus", {
        get: function () {
            return this.expandable && !this.expanded && this.focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "ariaExpanded", {
        get: function () {
            if (!this.expandable) {
                return null;
            }
            else {
                return this.expanded ? 'true' : 'false';
            }
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n    <dt class=\"stack-block-label\"\n        (click)=\"toggleExpand()\"\n        (keyup.enter)=\"toggleExpand()\"\n        (keyup.space)=\"toggleExpand()\"\n        (focus)=\"focused = true\"\n        (blur)=\"focused = false\"\n        [attr.role]=\"role\"\n        [attr.tabindex]=\"tabIndex\"\n        [attr.aria-expanded]=\"ariaExpanded\">\n      <clr-icon shape=\"caret\"\n                class=\"stack-block-caret\"\n                *ngIf=\"expandable\"\n                [attr.dir]=\"caretDirection\"\n                [attr.title]=\"caretTitle\"></clr-icon>\n      <ng-content select=\"clr-stack-label\"></ng-content>\n    </dt>\n    <dd class=\"stack-block-content\">\n      <ng-content></ng-content>\n    </dd>\n    <clr-expandable-animation [@clrExpandTrigger]=\"expanded\" class=\"stack-children\">\n      <div [style.height]=\"expanded ? 'auto' : 0\">\n        <ng-content select=\"clr-stack-block\"></ng-content>\n      </div>\n    </clr-expandable-animation>\n  ",
            // Make sure the host has the proper class for styling purposes
            host: { '[class.stack-block]': 'true' },
            styles: ["\n        :host { display: block; }\n    "]
        }),
        tslib_1.__param(0, SkipSelf()),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [ClrStackBlock,
            ClrCommonStrings])
    ], ClrStackBlock);
    return ClrStackBlock;
}());
export { ClrStackBlock };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stYmxvY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3N0YWNrLXZpZXcvc3RhY2stYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBdUM3RTtJQWdDRTs7OztTQUlLO0lBQ0wsdUJBR1UsTUFBcUIsRUFDdEIsYUFBK0I7UUFEOUIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUF0Q3hDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDSyxtQkFBYyxHQUEwQixJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUd4RyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRTVCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDakIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBK0JoQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7SUEvQkQsc0JBQUksMENBQWU7YUFBbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksMENBQWU7YUFBbkIsVUFBb0IsS0FBYztZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUV0QixJQUFJLElB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LFFBQVEsRUFBRSxDQUFBO2lEQUNLLGFBQWE7WUFDUCxnQkFBZ0I7T0F6QzdCLGFBQWEsQ0E2RnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdGRCxJQTZGQztTQTdGWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXN0YWNrLWJsb2NrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZHQgY2xhc3M9XCJzdGFjay1ibG9jay1sYWJlbFwiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmQoKVwiXG4gICAgICAgIChrZXl1cC5lbnRlcik9XCJ0b2dnbGVFeHBhbmQoKVwiXG4gICAgICAgIChrZXl1cC5zcGFjZSk9XCJ0b2dnbGVFeHBhbmQoKVwiXG4gICAgICAgIChmb2N1cyk9XCJmb2N1c2VkID0gdHJ1ZVwiXG4gICAgICAgIChibHVyKT1cImZvY3VzZWQgPSBmYWxzZVwiXG4gICAgICAgIFthdHRyLnJvbGVdPVwicm9sZVwiXG4gICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYkluZGV4XCJcbiAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJhcmlhRXhwYW5kZWRcIj5cbiAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNhcmV0XCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInN0YWNrLWJsb2NrLWNhcmV0XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImV4cGFuZGFibGVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRpcl09XCJjYXJldERpcmVjdGlvblwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY2FyZXRUaXRsZVwiPjwvY2xyLWljb24+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItc3RhY2stbGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kdD5cbiAgICA8ZGQgY2xhc3M9XCJzdGFjay1ibG9jay1jb250ZW50XCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kZD5cbiAgICA8Y2xyLWV4cGFuZGFibGUtYW5pbWF0aW9uIFtAY2xyRXhwYW5kVHJpZ2dlcl09XCJleHBhbmRlZFwiIGNsYXNzPVwic3RhY2stY2hpbGRyZW5cIj5cbiAgICAgIDxkaXYgW3N0eWxlLmhlaWdodF09XCJleHBhbmRlZCA/ICdhdXRvJyA6IDBcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLXN0YWNrLWJsb2NrXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9jbHItZXhwYW5kYWJsZS1hbmltYXRpb24+XG4gIGAsXG4gIC8vIEN1c3RvbSBlbGVtZW50cyBhcmUgaW5saW5lIGJ5IGRlZmF1bHRcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICA6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9XG4gICAgYCxcbiAgXSxcbiAgLy8gTWFrZSBzdXJlIHRoZSBob3N0IGhhcyB0aGUgcHJvcGVyIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gIGhvc3Q6IHsgJ1tjbGFzcy5zdGFjay1ibG9ja10nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU3RhY2tCbG9jayBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhY2stYmxvY2stZXhwYW5kZWQnKVxuICBASW5wdXQoJ2NsclNiRXhwYW5kZWQnKVxuICBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJTYkV4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YWNrLWJsb2NrLWV4cGFuZGFibGUnKVxuICBASW5wdXQoJ2NsclNiRXhwYW5kYWJsZScpXG4gIGV4cGFuZGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2NoYW5nZWRDaGlsZHJlbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZnVsbHlJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGFjay1ibG9jay1jaGFuZ2VkJylcbiAgZ2V0IGdldENoYW5nZWRWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlZCB8fCAodGhpcy5fY2hhbmdlZENoaWxkcmVuID4gMCAmJiAhdGhpcy5leHBhbmRlZCk7XG4gIH1cblxuICBASW5wdXQoJ2NsclNiTm90aWZ5Q2hhbmdlJylcbiAgc2V0IHNldENoYW5nZWRWYWx1ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NoYW5nZWQgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLl9mdWxseUluaXRpYWxpemVkKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuX2NoYW5nZWRDaGlsZHJlbisrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuX2NoYW5nZWRDaGlsZHJlbi0tO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAgICogVGhpcyB3b3VsZCBiZSBtb3JlIGVmZmljaWVudCB3aXRoIEBDb250ZW50Q2hpbGRyZW4sIHdpdGggdGhlIHBhcmVudCBDbHJTdGFja0Jsb2NrXG4gICAgICogcXVlcnlpbmcgZm9yIGNoaWxkcmVuIFN0YWNrQmxvY2tzLCBidXQgdGhpcyBmZWF0dXJlIGlzIG5vdCBhdmFpbGFibGUgd2hlbiBkb3duZ3JhZGluZ1xuICAgICAqIHRoZSBjb21wb25lbnQgZm9yIEFuZ3VsYXIgMS5cbiAgICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQFNraXBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByaXZhdGUgcGFyZW50OiBDbHJTdGFja0Jsb2NrLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5hZGRDaGlsZCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIGluIG9yZGVyIHRvIGFjY2VzcyB0aGUgcGFyZW50IENsclN0YWNrQmxvY2sncyBwcm9wZXJ0aWVzLFxuICAgIC8vIHRoZSBjaGlsZCBDbHJTdGFja0Jsb2NrICBoYXMgdG8gYmUgZnVsbHkgaW5pdGlhbGl6ZWQgYXQgZmlyc3QuXG4gICAgdGhpcy5fZnVsbHlJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBhZGRDaGlsZCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZGFibGUgPSB0cnVlO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh0aGlzLmV4cGFuZGVkKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2FyZXREaXJlY3Rpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZCA/ICdkb3duJyA6ICdyaWdodCc7XG4gIH1cblxuICBnZXQgY2FyZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gdGhpcy5jb21tb25TdHJpbmdzLmNvbGxhcHNlIDogdGhpcy5jb21tb25TdHJpbmdzLmV4cGFuZDtcbiAgfVxuXG4gIGdldCByb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kYWJsZSA/ICdidXR0b24nIDogbnVsbDtcbiAgfVxuXG4gIGdldCB0YWJJbmRleCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGUgPyAnMCcgOiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vbi1mb2N1cycpXG4gIGdldCBvblN0YWNrTGFiZWxGb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRhYmxlICYmICF0aGlzLmV4cGFuZGVkICYmIHRoaXMuZm9jdXNlZDtcbiAgfVxuXG4gIGdldCBhcmlhRXhwYW5kZWQoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuZXhwYW5kYWJsZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==