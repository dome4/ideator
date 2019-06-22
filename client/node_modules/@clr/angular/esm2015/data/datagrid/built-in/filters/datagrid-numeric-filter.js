import * as tslib_1 from "tslib";
var DatagridNumericFilter_1;
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
let DatagridNumericFilter = DatagridNumericFilter_1 = class DatagridNumericFilter extends DatagridFilterRegistrar {
    constructor(filters, domAdapter, commonStrings) {
        super(filters);
        this.domAdapter = domAdapter;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
    /**
     * Customizable filter logic based on high and low values
     */
    set customNumericFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridNumericFilterImpl(value));
        }
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.filterContainer.openChanged.subscribe((open) => {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout(() => {
                    this.domAdapter.focus(this.input.nativeElement);
                });
            }
        }));
    }
    /**
     * Common setter for the input values
     */
    get value() {
        return [this.filter.low, this.filter.high];
    }
    set value(values) {
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
    }
    get low() {
        if (typeof this.filter.low === 'number' && isFinite(this.filter.low)) {
            return this.filter.low;
        }
        else {
            // There's not a low limit
            return null;
        }
    }
    get high() {
        if (typeof this.filter.high === 'number' && isFinite(this.filter.high)) {
            return this.filter.high;
        }
        else {
            // There's not a high limit
            return null;
        }
    }
    set low(low) {
        if (typeof low === 'number' && low !== this.filter.low) {
            this.filter.low = low;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof low !== 'number') {
            this.filter.low = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
    set high(high) {
        if (typeof high === 'number' && high !== this.filter.high) {
            this.filter.high = high;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof high !== 'number') {
            this.filter.high = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
    close() {
        this.open = false;
    }
};
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
        template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <!--
                Even though this *ngIf looks useless because the filter container already has one,
                it prevents NgControlStatus and other directives automatically added by Angular
                on inputs with NgModel from freaking out because of their host binding changing
                mid-change detection when the input is destroyed.
            -->
            <input class="datagrid-numeric-filter-input" #input_low type="number" name="low" [(ngModel)]="low" *ngIf="open"
                (keyup.enter)="close()" (keyup.escape)="close()" [placeholder]="commonStrings.minValue" 
                [attr.aria-label]="commonStrings.minValue" />
                <span class="datagrid-filter-input-spacer"></span>
            <input class="datagrid-numeric-filter-input" #input_high type="number" name="high" [(ngModel)]="high" *ngIf="open"
                (keyup.enter)="close()" (keyup.escape)="close()" [placeholder]="commonStrings.maxValue"
                [attr.aria-label]="commonStrings.maxValue" />
        </clr-dg-filter>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [FiltersProvider, DomAdapter, ClrCommonStrings])
], DatagridNumericFilter);
export { DatagridNumericFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQXVCbkYsSUFBYSxxQkFBcUIsNkJBQWxDLE1BQWEscUJBQStCLFNBQVEsdUJBQXdEO0lBRTFHLFlBQVksT0FBMkIsRUFBVSxVQUFzQixFQUFTLGFBQStCO1FBQzdHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURnQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBSXZHLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQXNCM0M7O1dBRUc7UUFDSSxTQUFJLEdBQVksS0FBSyxDQUFDO1FBNEZHLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUF2SHZFLENBQUM7SUFJRCxX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QU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQUlNLEtBQUs7UUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQTlHQztJQURDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQzs7O2dFQVMzQjtBQVdEO0lBREMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FDNUIsVUFBVTtvREFBQztBQU16QjtJQURDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FDeEIsaUJBQWlCOzhEQUFJO0FBdUI3QztJQURDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7O2tEQWtCdkI7QUF3QytCO0lBQS9CLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzs7Z0VBQXdDO0FBM0g1RCxxQkFBcUI7SUFyQmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSx1QkFBcUIsRUFBRSxDQUFDO1FBQzFFLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCUDtLQUNKLENBQUM7NkNBR3FCLGVBQWUsRUFBeUIsVUFBVSxFQUF3QixnQkFBZ0I7R0FGcEcscUJBQXFCLENBZ0lqQztTQWhJWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXIgfSBmcm9tICcuLi8uLi9kYXRhZ3JpZC1maWx0ZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9udW1lcmljLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2N1c3RvbS1maWx0ZXInO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyLCBSZWdpc3RlcmVkRmlsdGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi4vLi4vdXRpbHMvZGF0YWdyaWQtZmlsdGVyLXJlZ2lzdHJhcic7XG5pbXBvcnQgeyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsIH0gZnJvbSAnLi9kYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbXBsJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1udW1lcmljLWZpbHRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogRGF0YWdyaWROdW1lcmljRmlsdGVyIH1dLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8Y2xyLWRnLWZpbHRlciBbY2xyRGdGaWx0ZXJdPVwicmVnaXN0ZXJlZFwiIFsoY2xyRGdGaWx0ZXJPcGVuKV09XCJvcGVuXCI+XG4gICAgICAgICAgICA8IS0tXG4gICAgICAgICAgICAgICAgRXZlbiB0aG91Z2ggdGhpcyAqbmdJZiBsb29rcyB1c2VsZXNzIGJlY2F1c2UgdGhlIGZpbHRlciBjb250YWluZXIgYWxyZWFkeSBoYXMgb25lLFxuICAgICAgICAgICAgICAgIGl0IHByZXZlbnRzIE5nQ29udHJvbFN0YXR1cyBhbmQgb3RoZXIgZGlyZWN0aXZlcyBhdXRvbWF0aWNhbGx5IGFkZGVkIGJ5IEFuZ3VsYXJcbiAgICAgICAgICAgICAgICBvbiBpbnB1dHMgd2l0aCBOZ01vZGVsIGZyb20gZnJlYWtpbmcgb3V0IGJlY2F1c2Ugb2YgdGhlaXIgaG9zdCBiaW5kaW5nIGNoYW5naW5nXG4gICAgICAgICAgICAgICAgbWlkLWNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGUgaW5wdXQgaXMgZGVzdHJveWVkLlxuICAgICAgICAgICAgLS0+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbnB1dFwiICNpbnB1dF9sb3cgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJsb3dcIiBbKG5nTW9kZWwpXT1cImxvd1wiICpuZ0lmPVwib3BlblwiXG4gICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cImNsb3NlKClcIiAoa2V5dXAuZXNjYXBlKT1cImNsb3NlKClcIiBbcGxhY2Vob2xkZXJdPVwiY29tbW9uU3RyaW5ncy5taW5WYWx1ZVwiIFxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5taW5WYWx1ZVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhZ3JpZC1maWx0ZXItaW5wdXQtc3BhY2VyXCI+PC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW5wdXRcIiAjaW5wdXRfaGlnaCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImhpZ2hcIiBbKG5nTW9kZWwpXT1cImhpZ2hcIiAqbmdJZj1cIm9wZW5cIlxuICAgICAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJjbG9zZSgpXCIgKGtleXVwLmVzY2FwZSk9XCJjbG9zZSgpXCIgW3BsYWNlaG9sZGVyXT1cImNvbW1vblN0cmluZ3MubWF4VmFsdWVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5tYXhWYWx1ZVwiIC8+XG4gICAgICAgIDwvY2xyLWRnLWZpbHRlcj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXI8VCA9IGFueT4gZXh0ZW5kcyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhcjxULCBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsPFQ+PlxuICBpbXBsZW1lbnRzIEN1c3RvbUZpbHRlciwgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKGZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPiwgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXN0b21pemFibGUgZmlsdGVyIGxvZ2ljIGJhc2VkIG9uIGhpZ2ggYW5kIGxvdyB2YWx1ZXNcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdOdW1lcmljRmlsdGVyJylcbiAgc2V0IGN1c3RvbU51bWVyaWNGaWx0ZXIoXG4gICAgdmFsdWU6IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZTxUPiB8IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbDxUPj5cbiAgKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUmVnaXN0ZXJlZEZpbHRlcikge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBkcm9wZG93biBpcyBvcGVuXG4gICAqL1xuICBwdWJsaWMgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRoZSBhY3R1YWwgaW5wdXQgZWxlbWVudCB0byBhdXRvbWF0aWNhbGx5IGZvY3VzIG9uIGl0XG4gICAqL1xuICBAVmlld0NoaWxkKCdpbnB1dF9sb3cnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGlucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBXZSBncmFiIHRoZSBDbHJEYXRhZ3JpZEZpbHRlciB3ZSB3cmFwIHRvIHJlZ2lzdGVyIHRoaXMgU3RyaW5nRmlsdGVyIHRvIGl0LlxuICAgKi9cbiAgQFZpZXdDaGlsZChDbHJEYXRhZ3JpZEZpbHRlciwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBmaWx0ZXJDb250YWluZXI6IENsckRhdGFncmlkRmlsdGVyPFQ+O1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZpbHRlckNvbnRhaW5lci5vcGVuQ2hhbmdlZC5zdWJzY3JpYmUoKG9wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAvLyBXZSBuZWVkIHRoZSB0aW1lb3V0IGJlY2F1c2UgYXQgdGhlIHRpbWUgdGhpcyBleGVjdXRlcywgdGhlIGlucHV0IGlzbid0XG4gICAgICAgICAgLy8gZGlzcGxheWVkIHlldC5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9tQWRhcHRlci5mb2N1cyh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ29tbW9uIHNldHRlciBmb3IgdGhlIGlucHV0IHZhbHVlc1xuICAgKi9cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF07XG4gIH1cblxuICBASW5wdXQoJ2NsckZpbHRlclZhbHVlJylcbiAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZXM6IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2YWx1ZXMgJiYgKHZhbHVlc1swXSAhPT0gdGhpcy5maWx0ZXIubG93IHx8IHZhbHVlc1sxXSAhPT0gdGhpcy5maWx0ZXIuaGlnaCkpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVzWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzLmZpbHRlci5sb3cgPSB2YWx1ZXNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbHRlci5sb3cgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZXNbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLmhpZ2ggPSB2YWx1ZXNbMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbHRlci5oaWdoID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG93KCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWx0ZXIubG93ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh0aGlzLmZpbHRlci5sb3cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIubG93O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGVyZSdzIG5vdCBhIGxvdyBsaW1pdFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBoaWdoKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWx0ZXIuaGlnaCA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodGhpcy5maWx0ZXIuaGlnaCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlci5oaWdoO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGVyZSdzIG5vdCBhIGhpZ2ggbGltaXRcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgbG93KGxvdzogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBsb3cgPT09ICdudW1iZXInICYmIGxvdyAhPT0gdGhpcy5maWx0ZXIubG93KSB7XG4gICAgICB0aGlzLmZpbHRlci5sb3cgPSBsb3c7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQoW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGxvdyAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmxvdyA9IG51bGw7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQoW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGlnaChoaWdoOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGhpZ2ggPT09ICdudW1iZXInICYmIGhpZ2ggIT09IHRoaXMuZmlsdGVyLmhpZ2gpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmhpZ2ggPSBoaWdoO1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoaWdoICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5maWx0ZXIuaGlnaCA9IG51bGw7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQoW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckZpbHRlclZhbHVlQ2hhbmdlJykgZmlsdGVyVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGNsb3NlKCkge1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICB9XG59XG4iXX0=