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
let ClrTabs = class ClrTabs {
    constructor(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
    }
    /* tslint:disable:no-unused-variable */
    set tabContentViewContainer(value) {
        this.tabsService.tabContentViewContainer = value;
    }
    /* tslint:enable:no-unused-variable */
    set layout(layout) {
        if (Object.keys(TabsLayout)
            .map(key => {
            return TabsLayout[key];
        })
            .indexOf(layout) >= 0) {
            this.tabsService.layout = layout;
        }
    }
    get layout() {
        return this.tabsService.layout;
    }
    get tabLinkDirectives() {
        return this._tabLinkDirectives;
    }
    get activeTabInOverflow() {
        return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
    }
    get tabIds() {
        return this.tabsService.children.map(tab => tab.tabLink.tabLinkId).join(' ');
    }
    ngAfterContentInit() {
        this._tabLinkDirectives = this.tabs.map(tab => tab.tabLink);
        this.subscriptions.push(this.tabs.changes.subscribe(() => {
            this._tabLinkDirectives = this.tabs.map(tab => tab.tabLink);
        }));
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    }
    toggleOverflow(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
    get isVertical() {
        return this.layout === TabsLayout.VERTICAL;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
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
        template: `
        <ul class="nav" role="tablist" [attr.aria-owns]="tabIds">
            <!--tab links-->
            <ng-container *ngFor="let link of tabLinkDirectives">
                <ng-container *ngIf="link.tabsId === tabsId && !link.inOverflow">
                    <li role="presentation" class="nav-item">
                        <ng-container [ngTemplateOutlet]="link.templateRefContainer.template"></ng-container>
                    </li>
                </ng-container>
            </ng-container>
            <ng-container *ngIf="tabsService.overflowTabs.length > 0">
                <div class="tabs-overflow bottom-right" [class.open]="ifOpenService.open"
                     (click)="toggleOverflow($event)">
                    <li role="presentation" class="nav-item">
                        <button class="btn btn-link nav-link dropdown-toggle" type="button" [class.active]="activeTabInOverflow">
                            <clr-icon shape="ellipsis-horizontal"
                              [class.is-info]="ifOpenService.open"
                              [attr.title]="commonStrings.more"></clr-icon>
                        </button>
                    </li>
                    <!--tab links in overflow menu-->
                    <clr-tab-overflow-content>
                        <ng-container *ngFor="let link of tabLinkDirectives">
                            <ng-container *ngIf="link.tabsId === tabsId && link.inOverflow"
                                          [ngTemplateOutlet]="link.templateRefContainer.template">
                            </ng-container>
                        </ng-container>
                    </clr-tab-overflow-content>
                </div>
            </ng-container>
        </ul>
        <ng-container #tabContentViewContainer></ng-container>
    `,
        providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
    }),
    tslib_1.__param(3, Inject(TABS_ID)),
    tslib_1.__metadata("design:paramtypes", [IfActiveService,
        IfOpenService,
        TabsService, Number, ClrCommonStrings])
], ClrTabs);
export { ClrTabs };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUF3Q3RELElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUFpQ2xCLFlBQ1MsZUFBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsV0FBd0IsRUFDUCxNQUFjLEVBQy9CLGFBQStCO1FBSi9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNQLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBckNoQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUEyQm5DLHVCQUFrQixHQUFpQixFQUFFLENBQUM7SUFXM0MsQ0FBQztJQXBDSix1Q0FBdUM7SUFFdkMsSUFBWSx1QkFBdUIsQ0FBQyxL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LENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBZ0NQO1FBQ0gsU0FBUyxFQUFFLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLENBQUM7S0FDM0UsQ0FBQztJQXNDRyxtQkFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7NkNBSFEsZUFBZTtRQUNqQixhQUFhO1FBQ2YsV0FBVyxVQUVULGdCQUFnQjtHQXRDN0IsT0FBTyxDQTRFbkI7U0E1RVksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBJbmplY3QsXG4gIFF1ZXJ5TGlzdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElmQWN0aXZlU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5zZXJ2aWNlJztcbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJUYWIgfSBmcm9tICcuL3RhYic7XG5pbXBvcnQgeyBDbHJUYWJMaW5rIH0gZnJvbSAnLi90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVEFCU19JRCwgVEFCU19JRF9QUk9WSURFUiB9IGZyb20gJy4vdGFicy1pZC5wcm92aWRlcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRhYnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIiByb2xlPVwidGFibGlzdFwiIFthdHRyLmFyaWEtb3duc109XCJ0YWJJZHNcIj5cbiAgICAgICAgICAgIDwhLS10YWIgbGlua3MtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiAhbGluay5pbk92ZXJmbG93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsaW5rLnRlbXBsYXRlUmVmQ29udGFpbmVyLnRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWJzU2VydmljZS5vdmVyZmxvd1RhYnMubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzLW92ZXJmbG93IGJvdHRvbS1yaWdodFwiIFtjbGFzcy5vcGVuXT1cImlmT3BlblNlcnZpY2Uub3BlblwiXG4gICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlT3ZlcmZsb3coJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgbmF2LWxpbmsgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlVGFiSW5PdmVyZmxvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImVsbGlwc2lzLWhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmlzLWluZm9dPVwiaWZPcGVuU2VydmljZS5vcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MubW9yZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPCEtLXRhYiBsaW5rcyBpbiBvdmVyZmxvdyBtZW51LS0+XG4gICAgICAgICAgICAgICAgICAgIDxjbHItdGFiLW92ZXJmbG93LWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBsaW5rIG9mIHRhYkxpbmtEaXJlY3RpdmVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpbmsudGFic0lkID09PSB0YWJzSWQgJiYgbGluay5pbk92ZXJmbG93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpbmsudGVtcGxhdGVSZWZDb250YWluZXIudGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Nsci10YWItb3ZlcmZsb3ctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8bmctY29udGFpbmVyICN0YWJDb250ZW50Vmlld0NvbnRhaW5lcj48L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICBwcm92aWRlcnM6IFtJZkFjdGl2ZVNlcnZpY2UsIElmT3BlblNlcnZpY2UsIFRhYnNTZXJ2aWNlLCBUQUJTX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVGFicyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cbiAgQFZpZXdDaGlsZCgndGFiQ29udGVudFZpZXdDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBwcml2YXRlIHNldCB0YWJDb250ZW50Vmlld0NvbnRhaW5lcih2YWx1ZTogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIgPSB2YWx1ZTtcbiAgfVxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuXG4gIEBJbnB1dCgnY2xyTGF5b3V0JylcbiAgc2V0IGxheW91dChsYXlvdXQ6IFRhYnNMYXlvdXQpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3Qua2V5cyhUYWJzTGF5b3V0KVxuICAgICAgICAubWFwKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFRhYnNMYXlvdXRba2V5XTtcbiAgICAgICAgfSlcbiAgICAgICAgLmluZGV4T2YobGF5b3V0KSA+PSAwXG4gICAgKSB7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dCA9IGxheW91dDtcbiAgICB9XG4gIH1cbiAgZ2V0IGxheW91dCgpOiBUYWJzTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5sYXlvdXQ7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKENsclRhYikgcHJpdmF0ZSB0YWJzOiBRdWVyeUxpc3Q8Q2xyVGFiPjtcblxuICBwcml2YXRlIF90YWJMaW5rRGlyZWN0aXZlczogQ2xyVGFiTGlua1tdID0gW107XG4gIGdldCB0YWJMaW5rRGlyZWN0aXZlcygpOiBDbHJUYWJMaW5rW10ge1xuICAgIHJldHVybiB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBwdWJsaWMgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwdWJsaWMgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoVEFCU19JRCkgcHVibGljIHRhYnNJZDogbnVtYmVyLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBnZXQgYWN0aXZlVGFiSW5PdmVyZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5vdmVyZmxvd1RhYnMuaW5kZXhPZih0aGlzLnRhYnNTZXJ2aWNlLmFjdGl2ZVRhYikgPiAtMTtcbiAgfVxuXG4gIGdldCB0YWJJZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2UuY2hpbGRyZW4ubWFwKHRhYiA9PiB0YWIudGFiTGluay50YWJMaW5rSWQpLmpvaW4oJyAnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcyA9IHRoaXMudGFicy5tYXAodGFiID0+IHRhYi50YWJMaW5rKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzID0gdGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmspO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLnRhYkxpbmtEaXJlY3RpdmVzWzBdKSB7XG4gICAgICB0aGlzLnRhYkxpbmtEaXJlY3RpdmVzWzBdLmFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlT3ZlcmZsb3coZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJzLXZlcnRpY2FsJylcbiAgZ2V0IGlzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ID09PSBUYWJzTGF5b3V0LlZFUlRJQ0FMO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=