/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { AccordionService } from './../../providers/accordion.service';
import { StepperModel } from '../models/stepper.model';
var StepperService = /** @class */ (function (_super) {
    tslib_1.__extends(StepperService, _super);
    function StepperService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panelsCompleted = _this.getAllCompletedPanelChanges();
        _this.accordion = new StepperModel();
        return _this;
    }
    StepperService.prototype.resetPanels = function () {
        this.accordion.resetPanels();
        this.emitUpdatedPanels();
    };
    StepperService.prototype.setPanelsWithErrors = function (ids) {
        this.accordion.setPanelsWithErrors(ids);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.navigateToNextPanel = function (currentPanelId, currentPanelValid) {
        if (currentPanelValid === void 0) { currentPanelValid = true; }
        this.accordion.navigateToNextPanel(currentPanelId, currentPanelValid);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.overrideInitialPanel = function (panelId) {
        this.accordion.overrideInitialPanel(panelId);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.getAllCompletedPanelChanges = function () {
        var _this = this;
        return this._panelsChanges.pipe(map(function () { return _this.accordion.allPanelsCompleted; }), distinctUntilChanged());
    };
    StepperService = tslib_1.__decorate([
        Injectable()
    ], StepperService);
    return StepperService;
}(AccordionService));
export { StepperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL3N0ZXBwZXIvcHJvdmlkZXJzL3N0ZXBwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUd2RDtJQUFvQywwQ0FBZ0I7SUFEcEQ7UUFBQSxxRUE0QkM7UUExQlUscUJBQWUsR0FBRyxLQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNwRCxlQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7SUF5QjNDLENBQUM7SUF2QkMsb0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDRDQUFtQixHQUFuQixVQUFvQixHQUFhO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDRDQUFtQixHQUFuQixVQUFvQixjQUFzQixFQUFFLGlCQUF3QjtRQUF4QixrQ0FBQSxFQUFBLHdCQUF3QjtRQUNsRSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEIsVUFBcUIsT0FBZTtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyxvREFBMkIsR0FBbkM7UUFBQSxpQkFFQztRQURDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFqQyxDQUFpQyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUExQlUsY0FBYztRQUQxQixVQUFVLEVBQUU7T0FDQSxjQUFjLENBMkIxQjtJQUFELHFCQUFDO0NBQUEsQUEzQkQsQ0FBb0MsZ0JBQWdCLEdBMkJuRDtTQTNCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY2NvcmRpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9wcm92aWRlcnMvYWNjb3JkaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RlcHBlck1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3N0ZXBwZXIubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RlcHBlclNlcnZpY2UgZXh0ZW5kcyBBY2NvcmRpb25TZXJ2aWNlIHtcbiAgcmVhZG9ubHkgcGFuZWxzQ29tcGxldGVkID0gdGhpcy5nZXRBbGxDb21wbGV0ZWRQYW5lbENoYW5nZXMoKTtcbiAgcHJvdGVjdGVkIGFjY29yZGlvbiA9IG5ldyBTdGVwcGVyTW9kZWwoKTtcblxuICByZXNldFBhbmVscygpIHtcbiAgICB0aGlzLmFjY29yZGlvbi5yZXNldFBhbmVscygpO1xuICAgIHRoaXMuZW1pdFVwZGF0ZWRQYW5lbHMoKTtcbiAgfVxuXG4gIHNldFBhbmVsc1dpdGhFcnJvcnMoaWRzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuYWNjb3JkaW9uLnNldFBhbmVsc1dpdGhFcnJvcnMoaWRzKTtcbiAgICB0aGlzLmVtaXRVcGRhdGVkUGFuZWxzKCk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvTmV4dFBhbmVsKGN1cnJlbnRQYW5lbElkOiBzdHJpbmcsIGN1cnJlbnRQYW5lbFZhbGlkID0gdHJ1ZSkge1xuICAgIHRoaXMuYWNjb3JkaW9uLm5hdmlnYXRlVG9OZXh0UGFuZWwoY3VycmVudFBhbmVsSWQsIGN1cnJlbnRQYW5lbFZhbGlkKTtcbiAgICB0aGlzLmVtaXRVcGRhdGVkUGFuZWxzKCk7XG4gIH1cblxuICBvdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjY29yZGlvbi5vdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkKTtcbiAgICB0aGlzLmVtaXRVcGRhdGVkUGFuZWxzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldEFsbENvbXBsZXRlZFBhbmVsQ2hhbmdlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcGFuZWxzQ2hhbmdlcy5waXBlKG1hcCgoKSA9PiB0aGlzLmFjY29yZGlvbi5hbGxQYW5lbHNDb21wbGV0ZWQpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxufVxuIl19