import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, Inject, QueryList, Input, HostBinding, ViewContainerRef, ViewChild, } from '@angular/core';
import { IfActiveService } from '../../utils/conditional/if-active.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TabsService } from './providers/tabs.service';
import { ClrTab } from './tab';
import { TABS_ID, TABS_ID_PROVIDER } from './tabs-id.provider';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { TabsLayout } from './enums/tabs-layout.enum';
var ClrTabs = /** @class */ (function () {
    function ClrTabs(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
    }
    Object.defineProperty(ClrTabs.prototype, "tabContentViewContainer", {
        /* tslint:disable:no-unused-variable */
        set: function (value) {
            this.tabsService.tabContentViewContainer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "layout", {
        get: function () {
            return this.tabsService.layout;
        },
        /* tslint:enable:no-unused-variable */
        set: function (layout) {
            if (Object.keys(TabsLayout)
                .map(function (key) {
                return TabsLayout[key];
            })
                .indexOf(layout) >= 0) {
                this.tabsService.layout = layout;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabLinkDirectives", {
        get: function () {
            return this._tabLinkDirectives;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "activeTabInOverflow", {
        get: function () {
            return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabIds", {
        get: function () {
            return this.tabsService.children.map(function (tab) { return tab.tabLink.tabLinkId; }).join(' ');
        },
        enumerable: true,
        configurable: true
    });
    ClrTabs.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._tabLinkDirectives = this.tabs.map(function (tab) { return tab.tabLink; });
        this.subscriptions.push(this.tabs.changes.subscribe(function () {
            _this._tabLinkDirectives = _this.tabs.map(function (tab) { return tab.tabLink; });
        }));
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    };
    ClrTabs.prototype.toggleOverflow = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    Object.defineProperty(ClrTabs.prototype, "isVertical", {
        get: function () {
            return this.layout === TabsLayout.VERTICAL;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabs.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    tslib_1.__decorate([
        ViewChild('tabContentViewContainer', { static: true, read: ViewContainerRef }),
        tslib_1.__metadata("design:type", ViewContainerRef),
        tslib_1.__metadata("design:paramtypes", [ViewContainerRef])
    ], ClrTabs.prototype, "tabContentViewContainer", null);
    tslib_1.__decorate([
        Input('clrLayout'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTabs.prototype, "layout", null);
    tslib_1.__decorate([
        ContentChildren(ClrTab),
        tslib_1.__metadata("design:type", QueryList)
    ], ClrTabs.prototype, "tabs", void 0);
    tslib_1.__decorate([
        HostBinding('class.tabs-vertical'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrTabs.prototype, "isVertical", null);
    ClrTabs = tslib_1.__decorate([
        Component({
            selector: 'clr-tabs',
            template: "\n        <ul class=\"nav\" role=\"tablist\" [attr.aria-owns]=\"tabIds\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"link.tabsId === tabsId && !link.inOverflow\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <ng-container [ngTemplateOutlet]=\"link.templateRefContainer.template\"></ng-container>\n                    </li>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\"\n                     (click)=\"toggleOverflow($event)\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" type=\"button\" [class.active]=\"activeTabInOverflow\">\n                            <clr-icon shape=\"ellipsis-horizontal\"\n                              [class.is-info]=\"ifOpenService.open\"\n                              [attr.title]=\"commonStrings.more\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.tabsId === tabsId && link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <ng-container #tabContentViewContainer></ng-container>\n    ",
            providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
        }),
        tslib_1.__param(3, Inject(TABS_ID)),
        tslib_1.__metadata("design:paramtypes", [IfActiveService,
            IfOpenService,
            TabsService, Number, ClrCommonStrings])
    ], ClrTabs);
    return ClrTabs;
}());
export { ClrTabs };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUF3Q3REO0lBaUNFLGlCQUNTLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ1AsTUFBYyxFQUMvQixhQUErQjtRQUovQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDUCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQy9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQXJDaEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBMkJuQyx1QkFBa0IsR0FBaUIsRUFBRSxDQUFDO0lBVzNDLENBQUM7SUFsQ0osc0JBQVksNENBQXVCO1FBRm5DLHVDQUF1QzthQUV2QyxVQUFvQyxLQUF1QjtZQUN6RCxJQUFJLENB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MENBQWUsU0FBUzt5Q0FBUztJQXlDekQ7UUFEQyxXQUFXLENBQUMscUJBQXFCLENBQUM7Ozs2Q0FHbEM7SUFyRVUsT0FBTztRQXJDbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLHEyREFnQ1A7WUFDSCxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQztTQUMzRSxDQUFDO1FBc0NHLG1CQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtpREFIUSxlQUFlO1lBQ2pCLGFBQWE7WUFDZixXQUFXLFVBRVQsZ0JBQWdCO09BdEM3QixPQUFPLENBNEVuQjtJQUFELGNBQUM7Q0FBQSxBQTVFRCxJQTRFQztTQTVFWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEluamVjdCxcbiAgUXVlcnlMaXN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBIb3N0QmluZGluZyxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5cbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IENsclRhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IENsclRhYkxpbmsgfSBmcm9tICcuL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUQUJTX0lELCBUQUJTX0lEX1BST1ZJREVSIH0gZnJvbSAnLi90YWJzLWlkLnByb3ZpZGVyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUYWJzTGF5b3V0IH0gZnJvbSAnLi9lbnVtcy90YWJzLWxheW91dC5lbnVtJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdGFicycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdlwiIHJvbGU9XCJ0YWJsaXN0XCIgW2F0dHIuYXJpYS1vd25zXT1cInRhYklkc1wiPlxuICAgICAgICAgICAgPCEtLXRhYiBsaW5rcy0tPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbGluayBvZiB0YWJMaW5rRGlyZWN0aXZlc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsaW5rLnRhYnNJZCA9PT0gdGFic0lkICYmICFsaW5rLmluT3ZlcmZsb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpbmsudGVtcGxhdGVSZWZDb250YWluZXIudGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhYnNTZXJ2aWNlLm92ZXJmbG93VGFicy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtb3ZlcmZsb3cgYm90dG9tLXJpZ2h0XCIgW2NsYXNzLm9wZW5dPVwiaWZPcGVuU2VydmljZS5vcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVPdmVyZmxvdygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGluayBuYXYtbGluayBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVUYWJJbk92ZXJmbG93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZWxsaXBzaXMtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuaXMtaW5mb109XCJpZk9wZW5TZXJ2aWNlLm9wZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5tb3JlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8IS0tdGFiIGxpbmtzIGluIG92ZXJmbG93IG1lbnUtLT5cbiAgICAgICAgICAgICAgICAgICAgPGNsci10YWItb3ZlcmZsb3ctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiBsaW5rLmluT3ZlcmZsb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwibGluay50ZW1wbGF0ZVJlZkNvbnRhaW5lci50ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvY2xyLXRhYi1vdmVyZmxvdy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxuZy1jb250YWluZXIgI3RhYkNvbnRlbnRWaWV3Q29udGFpbmVyPjwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gIHByb3ZpZGVyczogW0lmQWN0aXZlU2VydmljZSwgSWZPcGVuU2VydmljZSwgVGFic1NlcnZpY2UsIFRBQlNfSURfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIC8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuICBAVmlld0NoaWxkKCd0YWJDb250ZW50Vmlld0NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIHByaXZhdGUgc2V0IHRhYkNvbnRlbnRWaWV3Q29udGFpbmVyKHZhbHVlOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy50YWJzU2VydmljZS50YWJDb250ZW50Vmlld0NvbnRhaW5lciA9IHZhbHVlO1xuICB9XG4gIC8qIHRzbGludDplbmFibGU6bm8tdW51c2VkLXZhcmlhYmxlICovXG5cbiAgQElucHV0KCdjbHJMYXlvdXQnKVxuICBzZXQgbGF5b3V0KGxheW91dDogVGFic0xheW91dCkge1xuICAgIGlmIChcbiAgICAgIE9iamVjdC5rZXlzKFRhYnNMYXlvdXQpXG4gICAgICAgIC5tYXAoa2V5ID0+IHtcbiAgICAgICAgICByZXR1cm4gVGFic0xheW91dFtrZXldO1xuICAgICAgICB9KVxuICAgICAgICAuaW5kZXhPZihsYXlvdXQpID49IDBcbiAgICApIHtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UubGF5b3V0ID0gbGF5b3V0O1xuICAgIH1cbiAgfVxuICBnZXQgbGF5b3V0KCk6IFRhYnNMYXlvdXQge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dDtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyVGFiKSBwcml2YXRlIHRhYnM6IFF1ZXJ5TGlzdDxDbHJUYWI+O1xuXG4gIHByaXZhdGUgX3RhYkxpbmtEaXJlY3RpdmVzOiBDbHJUYWJMaW5rW10gPSBbXTtcbiAgZ2V0IHRhYkxpbmtEaXJlY3RpdmVzKCk6IENsclRhYkxpbmtbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlmQWN0aXZlU2VydmljZTogSWZBY3RpdmVTZXJ2aWNlLFxuICAgIHB1YmxpYyBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyB0YWJzU2VydmljZTogVGFic1NlcnZpY2UsXG4gICAgQEluamVjdChUQUJTX0lEKSBwdWJsaWMgdGFic0lkOiBudW1iZXIsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7fVxuXG4gIGdldCBhY3RpdmVUYWJJbk92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLm92ZXJmbG93VGFicy5pbmRleE9mKHRoaXMudGFic1NlcnZpY2UuYWN0aXZlVGFiKSA+IC0xO1xuICB9XG5cbiAgZ2V0IHRhYklkcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5jaGlsZHJlbi5tYXAodGFiID0+IHRhYi50YWJMaW5rLnRhYkxpbmtJZCkuam9pbignICcpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzID0gdGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmspO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy50YWJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdGFiTGlua0RpcmVjdGl2ZXMgPSB0aGlzLnRhYnMubWFwKHRhYiA9PiB0YWIudGFiTGluayk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09ICd1bmRlZmluZWQnICYmIHRoaXMudGFiTGlua0RpcmVjdGl2ZXNbMF0pIHtcbiAgICAgIHRoaXMudGFiTGlua0RpcmVjdGl2ZXNbMF0uYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVPdmVyZmxvdyhldmVudDogYW55KSB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYnMtdmVydGljYWwnKVxuICBnZXQgaXNWZXJ0aWNhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09IFRhYnNMYXlvdXQuVkVSVElDQUw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==