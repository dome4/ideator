/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { AccordionModel } from '../../models/accordion.model';
import { AccordionStatus } from '../../enums/accordion-status.enum';
var StepperModel = /** @class */ (function (_super) {
    tslib_1.__extends(StepperModel, _super);
    function StepperModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StepperModel.prototype, "allPanelsCompleted", {
        get: function () {
            return this.panels.length && this.getNumberOfIncompletePanels() === 0 && this.getNumberOfOpenPanels() === 0;
        },
        enumerable: true,
        configurable: true
    });
    StepperModel.prototype.addPanel = function (id, open) {
        if (open === void 0) { open = false; }
        _super.prototype.addPanel.call(this, id, open);
        this._panels[id].disabled = true;
    };
    StepperModel.prototype.updatePanelOrder = function (ids) {
        _super.prototype.updatePanelOrder.call(this, ids);
        this.openFirstPanel(ids);
    };
    StepperModel.prototype.togglePanel = function (panelId) {
        if (this._panels[panelId].status === AccordionStatus.Complete) {
            this._panels[panelId].open = !this._panels[panelId].open;
        }
    };
    StepperModel.prototype.navigateToNextPanel = function (currentPanelId, currentPanelValid) {
        if (currentPanelValid === void 0) { currentPanelValid = true; }
        if (currentPanelValid) {
            this.completePanel(currentPanelId);
            this.openNextPanel(this._panels[currentPanelId].id);
        }
        else {
            this.setPanelError(currentPanelId);
        }
    };
    StepperModel.prototype.overrideInitialPanel = function (panelId) {
        var _this = this;
        this.panels.filter(function (panel) { return _this._panels[panelId] !== undefined; }).forEach(function (panel) {
            if (panel.index < _this._panels[panelId].index) {
                _this.completePanel(panel.id);
            }
            else if (panel.id === panelId) {
                _this._panels[panel.id].open = true;
            }
            else {
                _this._panels[panel.id].open = false;
            }
        });
    };
    StepperModel.prototype.setPanelsWithErrors = function (ids) {
        var _this = this;
        ids.forEach(function (id) { return _this.setPanelError(id); });
    };
    StepperModel.prototype.resetPanels = function () {
        var _this = this;
        this.panels.forEach(function (p) { return _this.resetPanel(p.id); });
    };
    StepperModel.prototype.resetAllFuturePanels = function (panelId) {
        var _this = this;
        this.panels.filter(function (panel) { return panel.index >= _this._panels[panelId].index; }).forEach(function (panel) { return _this.resetPanel(panel.id); });
    };
    StepperModel.prototype.resetPanel = function (panelId) {
        this._panels[panelId].status = AccordionStatus.Inactive;
        this._panels[panelId].open = this._panels[panelId].index === 0; // if first panel set to be open
    };
    StepperModel.prototype.openFirstPanel = function (ids) {
        var _this = this;
        ids.forEach(function (id) { return (_this._panels[id].open = _this._panels[id].index === 0); });
    };
    StepperModel.prototype.completePanel = function (panelId) {
        this._panels[panelId].status = AccordionStatus.Complete;
        this._panels[panelId].disabled = false;
        this._panels[panelId].open = false;
    };
    StepperModel.prototype.openNextPanel = function (currentPanelId) {
        var _this = this;
        var nextPanel = this.panels.find(function (s) { return s.index === _this._panels[currentPanelId].index + 1; });
        if (nextPanel) {
            this.resetAllFuturePanels(nextPanel.id);
            this._panels[nextPanel.id].open = true;
        }
    };
    StepperModel.prototype.setPanelError = function (panelId) {
        this.resetAllFuturePanels(panelId);
        this._panels[panelId].open = true;
        this._panels[panelId].status = AccordionStatus.Error;
    };
    StepperModel.prototype.getNumberOfIncompletePanels = function () {
        return this.panels.reduce(function (prev, next) { return (next.status !== AccordionStatus.Complete ? prev + 1 : prev); }, 0);
    };
    StepperModel.prototype.getNumberOfOpenPanels = function () {
        return this.panels.reduce(function (prev, next) { return (next.open !== false ? prev + 1 : prev); }, 0);
    };
    return StepperModel;
}(AccordionModel));
export { StepperModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFjY29yZGlvbi9zdGVwcGVyL21vZGVscy9zdGVwcGVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRTtJQUFrQyx3Q0FBYztJQUFoRDs7SUEyRkEsQ0FBQztJQTFGQyxzQkFBSSw0Q0FBa0I7YUFBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUcsQ0FBQzs7O09BQUE7SUFFRCwrQkFBUSxHQUFSLFVBQVMsRUFBVSxFQUFFLElBQVk7UUFBWixxQkFBQSxFQUFBLFlBQVk7UUFDL0IsaUJBQU0sUUFBUSxZQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFpQixHQUFhO1FBQzVCLGlCQUFNLGdCQUFnQixZQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBWSxPQUFlO1FBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElB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S0FBSyxDQUFDO0lBQ3ZELENBQUM7SUFFTyxrREFBMkIsR0FBbkM7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLElBQUksSUFBSyxPQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBNUQsQ0FBNEQsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBRU8sNENBQXFCLEdBQTdCO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBdkMsQ0FBdUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBM0ZELENBQWtDLGNBQWMsR0EyRi9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBBY2NvcmRpb25Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9hY2NvcmRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQWNjb3JkaW9uU3RhdHVzIH0gZnJvbSAnLi4vLi4vZW51bXMvYWNjb3JkaW9uLXN0YXR1cy5lbnVtJztcblxuZXhwb3J0IGNsYXNzIFN0ZXBwZXJNb2RlbCBleHRlbmRzIEFjY29yZGlvbk1vZGVsIHtcbiAgZ2V0IGFsbFBhbmVsc0NvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbHMubGVuZ3RoICYmIHRoaXMuZ2V0TnVtYmVyT2ZJbmNvbXBsZXRlUGFuZWxzKCkgPT09IDAgJiYgdGhpcy5nZXROdW1iZXJPZk9wZW5QYW5lbHMoKSA9PT0gMDtcbiAgfVxuXG4gIGFkZFBhbmVsKGlkOiBzdHJpbmcsIG9wZW4gPSBmYWxzZSkge1xuICAgIHN1cGVyLmFkZFBhbmVsKGlkLCBvcGVuKTtcbiAgICB0aGlzLl9wYW5lbHNbaWRdLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZVBhbmVsT3JkZXIoaWRzOiBzdHJpbmdbXSkge1xuICAgIHN1cGVyLnVwZGF0ZVBhbmVsT3JkZXIoaWRzKTtcbiAgICB0aGlzLm9wZW5GaXJzdFBhbmVsKGlkcyk7XG4gIH1cblxuICB0b2dnbGVQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fcGFuZWxzW3BhbmVsSWRdLnN0YXR1cyA9PT0gQWNjb3JkaW9uU3RhdHVzLkNvbXBsZXRlKSB7XG4gICAgICB0aGlzLl9wYW5lbHNbcGFuZWxJZF0ub3BlbiA9ICF0aGlzLl9wYW5lbHNbcGFuZWxJZF0ub3BlbjtcbiAgICB9XG4gIH1cblxuICBuYXZpZ2F0ZVRvTmV4dFBhbmVsKGN1cnJlbnRQYW5lbElkOiBzdHJpbmcsIGN1cnJlbnRQYW5lbFZhbGlkID0gdHJ1ZSkge1xuICAgIGlmIChjdXJyZW50UGFuZWxWYWxpZCkge1xuICAgICAgdGhpcy5jb21wbGV0ZVBhbmVsKGN1cnJlbnRQYW5lbElkKTtcbiAgICAgIHRoaXMub3Blbk5leHRQYW5lbCh0aGlzLl9wYW5lbHNbY3VycmVudFBhbmVsSWRdLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRQYW5lbEVycm9yKGN1cnJlbnRQYW5lbElkKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhbmVscy5maWx0ZXIocGFuZWwgPT4gdGhpcy5fcGFuZWxzW3BhbmVsSWRdICE9PSB1bmRlZmluZWQpLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgaWYgKHBhbmVsLmluZGV4IDwgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLmluZGV4KSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVQYW5lbChwYW5lbC5pZCk7XG4gICAgICB9IGVsc2UgaWYgKHBhbmVsLmlkID09PSBwYW5lbElkKSB7XG4gICAgICAgIHRoaXMuX3BhbmVsc1twYW5lbC5pZF0ub3BlbiA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wYW5lbHNbcGFuZWwuaWRdLm9wZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBhbmVsc1dpdGhFcnJvcnMoaWRzOiBzdHJpbmdbXSkge1xuICAgIGlkcy5mb3JFYWNoKGlkID0+IHRoaXMuc2V0UGFuZWxFcnJvcihpZCkpO1xuICB9XG5cbiAgcmVzZXRQYW5lbHMoKSB7XG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaChwID0+IHRoaXMucmVzZXRQYW5lbChwLmlkKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0QWxsRnV0dXJlUGFuZWxzKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMucGFuZWxzLmZpbHRlcihwYW5lbCA9PiBwYW5lbC5pbmRleCA+PSB0aGlzLl9wYW5lbHNbcGFuZWxJZF0uaW5kZXgpLmZvckVhY2gocGFuZWwgPT4gdGhpcy5yZXNldFBhbmVsKHBhbmVsLmlkKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0UGFuZWwocGFuZWxJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLnN0YXR1cyA9IEFjY29yZGlvblN0YXR1cy5JbmFjdGl2ZTtcbiAgICB0aGlzLl9wYW5lbHNbcGFuZWxJZF0ub3BlbiA9IHRoaXMuX3BhbmVsc1twYW5lbElkXS5pbmRleCA9PT0gMDsgLy8gaWYgZmlyc3QgcGFuZWwgc2V0IHRvIGJlIG9wZW5cbiAgfVxuXG4gIHByaXZhdGUgb3BlbkZpcnN0UGFuZWwoaWRzOiBzdHJpbmdbXSkge1xuICAgIGlkcy5mb3JFYWNoKGlkID0+ICh0aGlzLl9wYW5lbHNbaWRdLm9wZW4gPSB0aGlzLl9wYW5lbHNbaWRdLmluZGV4ID09PSAwKSk7XG4gIH1cblxuICBwcml2YXRlIGNvbXBsZXRlUGFuZWwocGFuZWxJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLnN0YXR1cyA9IEFjY29yZGlvblN0YXR1cy5Db21wbGV0ZTtcbiAgICB0aGlzLl9wYW5lbHNbcGFuZWxJZF0uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9wYW5lbHNbcGFuZWxJZF0ub3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuTmV4dFBhbmVsKGN1cnJlbnRQYW5lbElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuZXh0UGFuZWwgPSB0aGlzLnBhbmVscy5maW5kKHMgPT4gcy5pbmRleCA9PT0gdGhpcy5fcGFuZWxzW2N1cnJlbnRQYW5lbElkXS5pbmRleCArIDEpO1xuXG4gICAgaWYgKG5leHRQYW5lbCkge1xuICAgICAgdGhpcy5yZXNldEFsbEZ1dHVyZVBhbmVscyhuZXh0UGFuZWwuaWQpO1xuICAgICAgdGhpcy5fcGFuZWxzW25leHRQYW5lbC5pZF0ub3BlbiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQYW5lbEVycm9yKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMucmVzZXRBbGxGdXR1cmVQYW5lbHMocGFuZWxJZCk7XG4gICAgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLm9wZW4gPSB0cnVlO1xuICAgIHRoaXMuX3BhbmVsc1twYW5lbElkXS5zdGF0dXMgPSBBY2NvcmRpb25TdGF0dXMuRXJyb3I7XG4gIH1cblxuICBwcml2YXRlIGdldE51bWJlck9mSW5jb21wbGV0ZVBhbmVscygpIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbHMucmVkdWNlKChwcmV2LCBuZXh0KSA9PiAobmV4dC5zdGF0dXMgIT09IEFjY29yZGlvblN0YXR1cy5Db21wbGV0ZSA/IHByZXYgKyAxIDogcHJldiksIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROdW1iZXJPZk9wZW5QYW5lbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxzLnJlZHVjZSgocHJldiwgbmV4dCkgPT4gKG5leHQub3BlbiAhPT0gZmFsc2UgPyBwcmV2ICsgMSA6IHByZXYpLCAwKTtcbiAgfVxufVxuIl19