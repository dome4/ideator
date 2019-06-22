import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../../../utils/dom-adapter/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridNumericFilterImpl } from './datagrid-numeric-filter-impl';
import { ClrCommonStrings } from '../../../../utils/i18n/common-strings.interface';
var DatagridNumericFilter = /** @class */ (function (_super) {
    tslib_1.__extends(DatagridNumericFilter, _super);
    function DatagridNumericFilter(filters, domAdapter, commonStrings) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        _this.commonStrings = commonStrings;
        _this.subscriptions = [];
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new EventEmitter();
        return _this;
    }
    DatagridNumericFilter_1 = DatagridNumericFilter;
    DatagridNumericFilter.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    Object.defineProperty(DatagridNumericFilter.prototype, "customNumericFilter", {
        /**
         * Customizable filter logic based on high and low values
         */
        set: function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridNumericFilterImpl(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridNumericFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscriptions.push(this.filterContainer.openChanged.subscribe(function (open) {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout(function () {
                    _this.domAdapter.focus(_this.input.nativeElement);
                });
            }
        }));
    };
    Object.defineProperty(DatagridNumericFilter.prototype, "value", {
        /**
         * Common setter for the input values
         */
        get: function () {
            return [this.filter.low, this.filter.high];
        },
        set: function (values) {
            if (!this.filter) {
                return;
            }
            if (values && (values[0] !== this.filter.low || values[1] !== this.filter.high)) {
                if (typeof values[0] === 'number') {
                    this.filter.low = values[0];
                }
                else {
                    this.filter.low = null;
                }
                if (typeof values[1] === 'number') {
                    this.filter.high = values[1];
                }
                else {
                    this.filter.high = null;
                }
                this.filterValueChange.emit(values);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilter.prototype, "low", {
        get: function () {
            if (typeof this.filter.low === 'number' && isFinite(this.filter.low)) {
                return this.filter.low;
            }
            else {
                // There's not a low limit
                return null;
            }
        },
        set: function (low) {
            if (typeof low === 'number' && low !== this.filter.low) {
                this.filter.low = low;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
            else if (typeof low !== 'number') {
                this.filter.low = null;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilter.prototype, "high", {
        get: function () {
            if (typeof this.filter.high === 'number' && isFinite(this.filter.high)) {
                return this.filter.high;
            }
            else {
                // There's not a high limit
                return null;
            }
        },
        set: function (high) {
            if (typeof high === 'number' && high !== this.filter.high) {
                this.filter.high = high;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
            else if (typeof high !== 'number') {
                this.filter.high = null;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridNumericFilter.prototype.close = function () {
        this.open = false;
    };
    var DatagridNumericFilter_1;
    tslib_1.__decorate([
        Input('clrDgNumericFilter'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DatagridNumericFilter.prototype, "customNumericFilter", null);
    tslib_1.__decorate([
        ViewChild('input_low', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], DatagridNumericFilter.prototype, "input", void 0);
    tslib_1.__decorate([
        ViewChild(ClrDatagridFilter, { static: false }),
        tslib_1.__metadata("design:type", ClrDatagridFilter)
    ], DatagridNumericFilter.prototype, "filterContainer", void 0);
    tslib_1.__decorate([
        Input('clrFilterValue'),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], DatagridNumericFilter.prototype, "value", null);
    tslib_1.__decorate([
        Output('clrFilterValueChange'),
        tslib_1.__metadata("design:type", Object)
    ], DatagridNumericFilter.prototype, "filterValueChange", void 0);
    DatagridNumericFilter = DatagridNumericFilter_1 = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-numeric-filter',
            providers: [{ provide: CustomFilter, useExisting: DatagridNumericFilter_1 }],
            template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <!--\n                Even though this *ngIf looks useless because the filter container already has one,\n                it prevents NgControlStatus and other directives automatically added by Angular\n                on inputs with NgModel from freaking out because of their host binding changing\n                mid-change detection when the input is destroyed.\n            -->\n            <input class=\"datagrid-numeric-filter-input\" #input_low type=\"number\" name=\"low\" [(ngModel)]=\"low\" *ngIf=\"open\"\n                (keyup.enter)=\"close()\" (keyup.escape)=\"close()\" [placeholder]=\"commonStrings.minValue\" \n                [attr.aria-label]=\"commonStrings.minValue\" />\n                <span class=\"datagrid-filter-input-spacer\"></span>\n            <input class=\"datagrid-numeric-filter-input\" #input_high type=\"number\" name=\"high\" [(ngModel)]=\"high\" *ngIf=\"open\"\n                (keyup.enter)=\"close()\" (keyup.escape)=\"close()\" [placeholder]=\"commonStrings.maxValue\"\n                [attr.aria-label]=\"commonStrings.maxValue\" />\n        </clr-dg-filter>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [FiltersProvider, DomAdapter, ClrCommonStrings])
    ], DatagridNumericFilter);
    return DatagridNumericFilter;
}(DatagridFilterRegistrar));
export { DatagridNumericFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBdUJuRjtJQUFvRCxpREFBd0Q7SUFFMUcsK0JBQVksT0FBMkIsRUFBVSxVQUFzQixFQUFTLGFBQStCO1FBQS9HLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFGZ0QsZ0JBQVUsR0FBVixVQUFVLENBQVk7UUFBUyxtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFJdkcsbUJBQWEsR0FBbUIsRUFBRSxDQUFDO1FBc0IzQzs7V0FFRztRQUNJLFVBQUksR0FBWSxLQUFLLENBQUM7UUE0RkcsdUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7SUF2SHZFLENBQUM7OEJBSlUscUJBQXFCO0lBUWhDLDJDQUFXLEdBQVg7UUFD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QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEU7UUFDSCxDQUFDOzs7T0FwQkE7SUF3Qk0scUNBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7O0lBN0dEO1FBREMsS0FBSyxDQUFDLG9CQUFvQixDQUFDOzs7b0VBUzNCO0lBV0Q7UUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUM1QixVQUFVO3dEQUFDO0lBTXpCO1FBREMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUN4QixpQkFBaUI7a0VBQUk7SUF1QjdDO1FBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7c0RBa0J2QjtJQXdDK0I7UUFBL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDOztvRUFBd0M7SUEzSDVELHFCQUFxQjtRQXJCakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLHVCQUFxQixFQUFFLENBQUM7WUFDMUUsUUFBUSxFQUFFLHlyQ0FnQlA7U0FDSixDQUFDO2lEQUdxQixlQUFlLEVBQXlCLFVBQVUsRUFBd0IsZ0JBQWdCO09BRnBHLHFCQUFxQixDQWdJakM7SUFBRCw0QkFBQztDQUFBLEFBaElELENBQW9ELHVCQUF1QixHQWdJMUU7U0FoSVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVyIH0gZnJvbSAnLi4vLi4vZGF0YWdyaWQtZmlsdGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbnVtZXJpYy1maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciwgUmVnaXN0ZXJlZEZpbHRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4uLy4uL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuaW1wb3J0IHsgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCB9IGZyb20gJy4vZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctbnVtZXJpYy1maWx0ZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEN1c3RvbUZpbHRlciwgdXNlRXhpc3Rpbmc6IERhdGFncmlkTnVtZXJpY0ZpbHRlciB9XSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGNsci1kZy1maWx0ZXIgW2NsckRnRmlsdGVyXT1cInJlZ2lzdGVyZWRcIiBbKGNsckRnRmlsdGVyT3BlbildPVwib3BlblwiPlxuICAgICAgICAgICAgPCEtLVxuICAgICAgICAgICAgICAgIEV2ZW4gdGhvdWdoIHRoaXMgKm5nSWYgbG9va3MgdXNlbGVzcyBiZWNhdXNlIHRoZSBmaWx0ZXIgY29udGFpbmVyIGFscmVhZHkgaGFzIG9uZSxcbiAgICAgICAgICAgICAgICBpdCBwcmV2ZW50cyBOZ0NvbnRyb2xTdGF0dXMgYW5kIG90aGVyIGRpcmVjdGl2ZXMgYXV0b21hdGljYWxseSBhZGRlZCBieSBBbmd1bGFyXG4gICAgICAgICAgICAgICAgb24gaW5wdXRzIHdpdGggTmdNb2RlbCBmcm9tIGZyZWFraW5nIG91dCBiZWNhdXNlIG9mIHRoZWlyIGhvc3QgYmluZGluZyBjaGFuZ2luZ1xuICAgICAgICAgICAgICAgIG1pZC1jaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlIGlucHV0IGlzIGRlc3Ryb3llZC5cbiAgICAgICAgICAgIC0tPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW5wdXRcIiAjaW5wdXRfbG93IHR5cGU9XCJudW1iZXJcIiBuYW1lPVwibG93XCIgWyhuZ01vZGVsKV09XCJsb3dcIiAqbmdJZj1cIm9wZW5cIlxuICAgICAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJjbG9zZSgpXCIgKGtleXVwLmVzY2FwZSk9XCJjbG9zZSgpXCIgW3BsYWNlaG9sZGVyXT1cImNvbW1vblN0cmluZ3MubWluVmFsdWVcIiBcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3MubWluVmFsdWVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLWlucHV0LXNwYWNlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImRhdGFncmlkLW51bWVyaWMtZmlsdGVyLWlucHV0XCIgI2lucHV0X2hpZ2ggdHlwZT1cIm51bWJlclwiIG5hbWU9XCJoaWdoXCIgWyhuZ01vZGVsKV09XCJoaWdoXCIgKm5nSWY9XCJvcGVuXCJcbiAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiY2xvc2UoKVwiIChrZXl1cC5lc2NhcGUpPVwiY2xvc2UoKVwiIFtwbGFjZWhvbGRlcl09XCJjb21tb25TdHJpbmdzLm1heFZhbHVlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3MubWF4VmFsdWVcIiAvPlxuICAgICAgICA8L2Nsci1kZy1maWx0ZXI+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWROdW1lcmljRmlsdGVyPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbDxUPj5cbiAgaW1wbGVtZW50cyBDdXN0b21GaWx0ZXIsIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlciwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHtcbiAgICBzdXBlcihmaWx0ZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3VzdG9taXphYmxlIGZpbHRlciBsb2dpYyBiYXNlZCBvbiBoaWdoIGFuZCBsb3cgdmFsdWVzXG4gICAqL1xuICBASW5wdXQoJ2NsckRnTnVtZXJpY0ZpbHRlcicpXG4gIHNldCBjdXN0b21OdW1lcmljRmlsdGVyKFxuICAgIHZhbHVlOiBDbHJEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbnRlcmZhY2U8VD4gfCBSZWdpc3RlcmVkRmlsdGVyPFQsIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGw8VD4+XG4gICkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlZ2lzdGVyZWRGaWx0ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIobmV3IERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGwodmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgZHJvcGRvd24gaXMgb3BlblxuICAgKi9cbiAgcHVibGljIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogV2UgbmVlZCB0aGUgYWN0dWFsIGlucHV0IGVsZW1lbnQgdG8gYXV0b21hdGljYWxseSBmb2N1cyBvbiBpdFxuICAgKi9cbiAgQFZpZXdDaGlsZCgnaW5wdXRfbG93JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBpbnB1dDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogV2UgZ3JhYiB0aGUgQ2xyRGF0YWdyaWRGaWx0ZXIgd2Ugd3JhcCB0byByZWdpc3RlciB0aGlzIFN0cmluZ0ZpbHRlciB0byBpdC5cbiAgICovXG4gIEBWaWV3Q2hpbGQoQ2xyRGF0YWdyaWRGaWx0ZXIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgZmlsdGVyQ29udGFpbmVyOiBDbHJEYXRhZ3JpZEZpbHRlcjxUPjtcbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5maWx0ZXJDb250YWluZXIub3BlbkNoYW5nZWQuc3Vic2NyaWJlKChvcGVuOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgLy8gV2UgbmVlZCB0aGUgdGltZW91dCBiZWNhdXNlIGF0IHRoZSB0aW1lIHRoaXMgZXhlY3V0ZXMsIHRoZSBpbnB1dCBpc24ndFxuICAgICAgICAgIC8vIGRpc3BsYXllZCB5ZXQuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvbUFkYXB0ZXIuZm9jdXModGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBzZXR0ZXIgZm9yIHRoZSBpbnB1dCB2YWx1ZXNcbiAgICovXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdO1xuICB9XG5cbiAgQElucHV0KCdjbHJGaWx0ZXJWYWx1ZScpXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWVzOiBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodmFsdWVzICYmICh2YWx1ZXNbMF0gIT09IHRoaXMuZmlsdGVyLmxvdyB8fCB2YWx1ZXNbMV0gIT09IHRoaXMuZmlsdGVyLmhpZ2gpKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlc1swXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIubG93ID0gdmFsdWVzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWx0ZXIubG93ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWVzWzFdID09PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzLmZpbHRlci5oaWdoID0gdmFsdWVzWzFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWx0ZXIuaGlnaCA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQodmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvdygpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVyLmxvdyA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodGhpcy5maWx0ZXIubG93KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLmxvdztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlcmUncyBub3QgYSBsb3cgbGltaXRcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGlnaCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVyLmhpZ2ggPT09ICdudW1iZXInICYmIGlzRmluaXRlKHRoaXMuZmlsdGVyLmhpZ2gpKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIuaGlnaDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlcmUncyBub3QgYSBoaWdoIGxpbWl0XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGxvdyhsb3c6IG51bWJlciB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgbG93ID09PSAnbnVtYmVyJyAmJiBsb3cgIT09IHRoaXMuZmlsdGVyLmxvdykge1xuICAgICAgdGhpcy5maWx0ZXIubG93ID0gbG93O1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBsb3cgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmZpbHRlci5sb3cgPSBudWxsO1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGhpZ2goaGlnaDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBoaWdoID09PSAnbnVtYmVyJyAmJiBoaWdoICE9PSB0aGlzLmZpbHRlci5oaWdoKSB7XG4gICAgICB0aGlzLmZpbHRlci5oaWdoID0gaGlnaDtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdChbdGhpcy5maWx0ZXIubG93LCB0aGlzLmZpbHRlci5oaWdoXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGlnaCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmhpZ2ggPSBudWxsO1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJGaWx0ZXJWYWx1ZUNoYW5nZScpIGZpbHRlclZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgfVxufVxuIl19