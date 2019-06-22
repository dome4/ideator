import { EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ClrCommonStrings } from '../utils/i18n/common-strings.interface';
import { AccordionService } from './providers/accordion.service';
import { AccordionStatus } from './enums/accordion-status.enum';
import { IfExpandService } from '../utils/conditional/if-expanded.service';
import { AccordionPanelModel } from './models/accordion.model';
export declare class ClrAccordionPanel implements OnInit, OnChanges {
    commonStrings: ClrCommonStrings;
    private accordionService;
    private ifExpandService;
    id: string;
    disabled: boolean;
    panelOpen: boolean;
    panelOpenChange: EventEmitter<boolean>;
    panel: Observable<AccordionPanelModel>;
    focusHeader: boolean;
    readonly AccordionStatus: typeof AccordionStatus;
    constructor(commonStrings: ClrCommonStrings, accordionService: AccordionService, ifExpandService: IfExpandService, id: string);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    togglePanel(): void;
    collapsePanelOnAnimationDone(panel: AccordionPanelModel): void;
    getPanelStateClasses(panel: AccordionPanelModel): string;
    private emitPanelChange;
}
