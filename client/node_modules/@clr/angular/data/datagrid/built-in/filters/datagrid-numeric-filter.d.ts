import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { ClrDatagridNumericFilterInterface } from '../../interfaces/numeric-filter.interface';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../../../utils/dom-adapter/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridNumericFilterImpl } from './datagrid-numeric-filter-impl';
import { ClrCommonStrings } from '../../../../utils/i18n/common-strings.interface';
export declare class DatagridNumericFilter<T = any> extends DatagridFilterRegistrar<T, DatagridNumericFilterImpl<T>> implements CustomFilter, AfterViewInit {
    private domAdapter;
    commonStrings: ClrCommonStrings;
    constructor(filters: FiltersProvider<T>, domAdapter: DomAdapter, commonStrings: ClrCommonStrings);
    private subscriptions;
    ngOnDestroy(): void;
    /**
     * Customizable filter logic based on high and low values
     */
    customNumericFilter: ClrDatagridNumericFilterInterface<T> | RegisteredFilter<T, DatagridNumericFilterImpl<T>>;
    /**
     * Indicates if the filter dropdown is open
     */
    open: boolean;
    /**
     * We need the actual input element to automatically focus on it
     */
    input: ElementRef;
    /**
     * We grab the ClrDatagridFilter we wrap to register this StringFilter to it.
     */
    filterContainer: ClrDatagridFilter<T>;
    ngAfterViewInit(): void;
    /**
     * Common setter for the input values
     */
    value: [number, number];
    low: number | string;
    high: number | string;
    filterValueChange: EventEmitter<{}>;
    close(): void;
}
