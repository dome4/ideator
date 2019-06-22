import { OnInit } from '@angular/core';
import { FormGroupName, NgModelGroup } from '@angular/forms';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { StepperService } from './providers/stepper.service';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrAccordionPanel } from '../accordion-panel';
export declare class ClrStepperPanel extends ClrAccordionPanel implements OnInit {
    commonStrings: ClrCommonStrings;
    private formGroupName;
    private ngModelGroup;
    readonly formGroup: import("@angular/forms").FormGroup;
    id: string;
    constructor(commonStrings: ClrCommonStrings, formGroupName: FormGroupName, ngModelGroup: NgModelGroup, stepperService: StepperService, ifExpandService: IfExpandService, id: string);
    ngOnInit(): void;
    private triggerAllFormControlValidationIfError;
}
