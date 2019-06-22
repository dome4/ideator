/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardPageButtons } from './wizard-page-buttons';
import { ClrWizardPageHeaderActions } from './wizard-page-header-actions';
import { ClrWizardPageNavTitle } from './wizard-page-navtitle';
import { ClrWizardPageTitle } from './wizard-page-title';
let wizardPageIndex = 0;
/**
 * The ClrWizardPage component is responsible for displaying the content of each step
 * in the wizard workflow.
 *
 * ClrWizardPage component has hooks into the navigation service (ClrWizardPage.navService),
 * page collection (ClrWizardPage.pageCollection), and button service
 * (ClrWizardPage.buttonService). These three providers are shared across the components
 * within each instance of a Wizard.
 *
 */
let ClrWizardPage = class ClrWizardPage {
    /**
     * Creates an instance of ClrWizardPage.
     *
     * @memberof WizardPage
     */
    constructor(navService, pageCollection, buttonService) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * @memberof WizardPage
         *
         */
        this._nextStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.nextStepDisabled changes.
         * Should emit the new value of nextStepDisabled.
         *
         * @memberof WizardPage
         *
         */
        this.nextStepDisabledChange = new EventEmitter();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._previousStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.previousStepDisabled changes.
         * Should emit the new value of previousStepDisabled.
         *
         * @memberof WizardPage
         *
         */
        this.previousStepDisabledChange = new EventEmitter();
        /**
         * Overrides all actions from the page level, so you can use an alternate function for
         * validation or data-munging with a ClrWizardPage.onCommit (clrWizardPageOnCommit output),
         * ClrWizardPage.onCancel (clrWizardPageOnCancel output), or one
         * of the granular page-level button click event emitters.
         *
         * @memberof WizardPage
         *
         */
        this.preventDefault = false;
        /**
         *
         * @memberof WizardPage
         *
         */
        this._stopCancel = false;
        /**
         *
         * @memberof WizardPage
         *
         */
        this.stopCancelChange = new EventEmitter();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._stopNext = false;
        /**
         * An event emitter carried over from a legacy version of ClrWizardPage.
         * Fires an event on ClrWizardPage whenever the next or finish buttons
         * are clicked and the page is the current page of the Wizard.
         *
         * Note that this does not automatically emit an event when a custom
         * button is used in place of a next or finish button.
         *
         * @memberof WizardPage
         *
         */
        this.onCommit = new EventEmitter(false);
        /**
         * Emits an event when ClrWizardPage becomes the current page of the
         * Wizard.
         *
         * @memberof WizardPage
         *
         */
        this.onLoad = new EventEmitter();
        /**
         * Emits an event when the ClrWizardPage invokes the cancel routine for the wizard.
         *
         * Can be used in conjunction with the ClrWizardPage.stopCancel
         * (clrWizardPagePreventDefaultCancel) or ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) inputs to implement custom cancel
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before cancelling the wizard.
         *
         * Note that this requires you to call Wizard.close() from the host component.
         * This constitues a full replacement of the cancel functionality.
         *
         * @memberof WizardPage
         *
         */
        this.pageOnCancel = new EventEmitter();
        /**
         * Emits an event when the finish button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom finish
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to complete
         * the wizard.
         *
         * Note that this requires you to call Wizard.finish() or Wizard.forceFinish()
         * from the host component. This combination creates a full replacement of
         * the finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.finishButtonClicked = new EventEmitter();
        /**
         * Emits an event when the previous button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom backwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * backwards in the wizard.
         *
         * Note that this requires you to call Wizard.previous()
         * from the host component. This combination creates a full replacement of
         * the backwards navigation functionality.
         *
         * @memberof WizardPage
         *
         */
        this.previousButtonClicked = new EventEmitter();
        /**
         * Emits an event when the next button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * to the next page in the wizard.
         *
         * Note that this requires you to call Wizard.forceNext() or Wizard.next()
         * from the host component. This combination creates a full replacement of
         * the forward navigation functionality.
         *
         * @memberof WizardPage
         *
         */
        this.nextButtonClicked = new EventEmitter();
        /**
         * Emits an event when a danger button is clicked and the ClrWizardPage is
         * the wizard's current page. By default, a danger button will act as
         * either a "next" or "finish" button depending on if the ClrWizardPage is the
         * last page or not.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level when the danger button is clicked.
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.dangerButtonClicked = new EventEmitter();
        /**
         * Emits an event when a next, finish, or danger button is clicked and the
         * ClrWizardPage is the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level, regardless of the type of
         * primary button.
         *
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.primaryButtonClicked = new EventEmitter();
        this.customButtonClicked = new EventEmitter();
        /**
         * An input value that is used internally to generate the ClrWizardPage ID as
         * well as the step nav item ID.
         *
         * Typed as any because it should be able to accept numbers as well as
         * strings. Passing an index for wizard whose pages are created with an
         * ngFor loop is a common use case.
         *
         * @memberof WizardPage
         *
         */
        this._id = (wizardPageIndex++).toString();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._complete = false;
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the next page.
     *
     * Useful for in-page validation because it prevents forward navigation
     * and visibly disables the next button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using ClrWizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * @memberof WizardPage
     *
     */
    get nextStepDisabled() {
        return this._nextStepDisabled;
    }
    /**
     * Sets whether the page should allow forward navigation.
     *
     * @memberof WizardPage
     *
     */
    set nextStepDisabled(val) {
        const valBool = !!val;
        if (valBool !== this._nextStepDisabled) {
            this._nextStepDisabled = valBool;
            this.nextStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the previous page.
     *
     * Useful for in-page validation because it prevents backward navigation
     * and visibly disables the previous button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using ClrWizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * @memberof WizardPage
     *
     */
    get previousStepDisabled() {
        return this._previousStepDisabled;
    }
    /**
     * Sets whether the page should allow backward navigation.
     *
     * @memberof WizardPage
     *
     */
    set previousStepDisabled(val) {
        const valBool = !!val;
        if (valBool !== this._previousStepDisabled) {
            this._previousStepDisabled = valBool;
            this.previousStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that retrieves whether the page is preventing the cancel action.
     *
     * @memberof WizardPage
     *
     */
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Overrides the cancel action from the page level. Allows you to use an
     * alternate function for validation or data-munging before cancelling the
     * wizard when combined with the ClrWizardPage.onCancel
     * (the clrWizardPageOnCancel output).
     *
     * Requires that you manually close the wizard from your host component,
     * usually with a call to Wizard.forceNext() or wizard.next();
     *
     * @memberof ClrWizardPage
     */
    set stopCancel(val) {
        const valBool = !!val;
        if (valBool !== this._stopCancel) {
            this._stopCancel = valBool;
            this.stopCancelChange.emit(valBool);
        }
    }
    /**
     * A getter that tells you whether the page is preventing the next action.
     *
     * @memberof WizardPage
     *
     */
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Overrides forward navigation from the page level. Allows you to use an
     * alternate function for validation or data-munging before moving the
     * wizard to the next pagewhen combined with the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) or ClrWizardPage.nextButtonClicked
     * (clrWizardPageNext) outputs.
     *
     * Requires that you manually tell the wizard to navigate forward from
     * the hostComponent, usually with a call to Wizard.forceNext() or
     * wizard.next();
     *
     * @memberof ClrWizardPage
     */
    set stopNext(val) {
        const valBool = !!val;
        if (valBool !== this._stopNext) {
            this._stopNext = valBool;
        }
    }
    /**
     * A read-only getter that generates an ID string for the wizard page from
     * either the value passed to the ClrWizardPage "id" input or a wizard page
     * counter shared across all wizard pages in the application.
     *
     * Note that the value passed into the ID input Will be prefixed with
     * "clr-wizard-page-".
     *
     * @readonly
     *
     * @memberof ClrWizardPage
     */
    get id() {
        // covers things like null, undefined, false, and empty string
        // while allowing zero to pass
        const idIsNonZeroFalsy = !this._id && this._id !== 0;
        // in addition to non-zero falsy we also want to make sure _id is not a negative
        // number.
        if (idIsNonZeroFalsy || this._id < 0) {
            // guard here in the event that input becomes undefined or null by accident
            this._id = (wizardPageIndex++).toString();
        }
        return `clr-wizard-page-${this._id}`;
    }
    /**
     * A read-only getter that serves as a convenience for those who would rather
     * not think in the terms of !ClrWizardPage.nextStepDisabled. For some use cases,
     * ClrWizardPage.readyToComplete is more logical and declarative.
     *
     * @memberof WizardPage
     *
     */
    get readyToComplete() {
        return !this.nextStepDisabled;
    }
    /**
     * A page is marked as completed if it is both readyToComplete and completed,
     * as in the next or finish action has been executed while this page was current.
     *
     * Note there is and open question about how to handle pages that are marked
     * complete but who are no longer readyToComplete. This might indicate an error
     * state for the ClrWizardPage. Currently, the wizard does not acknowledge this state
     * and only returns that the page is incomplete.
     *
     * @memberof WizardPage
     *
     */
    get completed() {
        return this._complete && this.readyToComplete;
        // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
        // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
        // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
        // FIRST QUESTION: AM I GREY OR COLORED?
        // SECOND QUESTION: AM I GREEN OR RED?
    }
    /**
     * A ClrWizardPage can be manually set to completed using this boolean setter.
     * It is recommended that users rely on the convenience functions in the wizard
     * and navigation service instead of manually setting pages’ completion state.
     *
     * @memberof ClrWizardPage
     */
    set completed(value) {
        this._complete = value;
    }
    /**
     * Checks with the navigation service to see if it is the current page.
     *
     * @memberof WizardPage
     *
     */
    get current() {
        return this.navService.currentPage === this;
    }
    get disabled() {
        return !this.enabled;
    }
    /**
     * A read-only getter that returns whether or not the page is navigable
     * in the wizard. A wizard page can be navigated to if it is completed
     * or the page before it is completed.
     *
     * This getter handles the logic for enabling or disabling the links in
     * the step nav on the left Side of the wizard.
     *
     * @memberof WizardPage
     *
     */
    get enabled() {
        return this.current || this.completed || this.previousCompleted;
    }
    /**
     * A read-only getter that returns whether or not the page before this
     * ClrWizardPage is completed. This is useful for determining whether or not
     * a page is navigable if it is not current or already completed.
     *
     * @memberof WizardPage
     *
     */
    get previousCompleted() {
        const previousPage = this.pageCollection.getPreviousPage(this);
        if (!previousPage) {
            return true;
        }
        return previousPage.completed;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get title() {
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get navTitle() {
        if (this.pageNavTitle) {
            return this.pageNavTitle.pageNavTitleTemplateRef;
        }
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get headerActions() {
        if (!this._headerActions) {
            return;
        }
        return this._headerActions.pageHeaderActionsTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get hasHeaderActions() {
        return !!this._headerActions;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get buttons() {
        if (!this._buttons) {
            return;
        }
        return this._buttons.pageButtonsTemplateRef;
    }
    /**
     * A read-only getter that returns a boolean that says whether or
     * not the ClrWizardPage includes buttons. Used to determine if the
     * Wizard should override the default button set defined as
     * its direct children.
     *
     * @memberof WizardPage
     *
     */
    get hasButtons() {
        return !!this._buttons;
    }
    /**
     * Uses the nav service to make the ClrWizardPage the current page in the
     * wizard. Bypasses all checks but still emits the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output.
     *
     * In most cases, it is better to use the default navigation functions
     * in Wizard.
     *
     * @memberof WizardPage
     *
     */
    makeCurrent() {
        this.navService.currentPage = this;
    }
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * @memberof WizardPage
     *
     */
    ngOnInit() {
        const navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    }
    /**
     * A read-only getter that returns the id used by the step nav item associated with the page.
     *
     * ClrWizardPage needs this ID string for aria information.
     *
     * @memberof WizardPage
     *
     */
    get stepItemId() {
        return this.pageCollection.getStepItemIdForPage(this);
    }
};
tslib_1.__decorate([
    ContentChild(ClrWizardPageTitle, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageTitle)
], ClrWizardPage.prototype, "pageTitle", void 0);
tslib_1.__decorate([
    ContentChild(ClrWizardPageNavTitle, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageNavTitle)
], ClrWizardPage.prototype, "pageNavTitle", void 0);
tslib_1.__decorate([
    ContentChild(ClrWizardPageButtons, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageButtons)
], ClrWizardPage.prototype, "_buttons", void 0);
tslib_1.__decorate([
    ContentChild(ClrWizardPageHeaderActions, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageHeaderActions)
], ClrWizardPage.prototype, "_headerActions", void 0);
tslib_1.__decorate([
    Input('clrWizardPageNextDisabled'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "nextStepDisabled", null);
tslib_1.__decorate([
    Output('clrWizardPageNextDisabledChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "nextStepDisabledChange", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreviousDisabled'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "previousStepDisabled", null);
tslib_1.__decorate([
    Output('clrWizardPagePreviousDisabledChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "previousStepDisabledChange", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreventDefault'),
    tslib_1.__metadata("design:type", Boolean)
], ClrWizardPage.prototype, "preventDefault", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreventDefaultCancel'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "stopCancel", null);
tslib_1.__decorate([
    Output('clrWizardPagePreventDefaultCancelChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "stopCancelChange", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreventDefaultNext'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "stopNext", null);
tslib_1.__decorate([
    Output('clrWizardPageOnCommit'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "onCommit", void 0);
tslib_1.__decorate([
    Output('clrWizardPageOnLoad'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "onLoad", void 0);
tslib_1.__decorate([
    Output('clrWizardPageOnCancel'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "pageOnCancel", void 0);
tslib_1.__decorate([
    Output('clrWizardPageFinish'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "finishButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPagePrevious'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "previousButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPageNext'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "nextButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPageDanger'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "dangerButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPagePrimary'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "primaryButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPageCustomButton'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "customButtonClicked", void 0);
tslib_1.__decorate([
    Input('id'),
    tslib_1.__metadata("design:type", Object)
], ClrWizardPage.prototype, "_id", void 0);
ClrWizardPage = tslib_1.__decorate([
    Component({
        selector: 'clr-wizard-page',
        template: '<ng-content></ng-content>',
        host: {
            '[id]': 'id',
            role: 'tabpanel',
            '[attr.aria-hidden]': '!current',
            '[attr.aria-labelledby]': 'stepItemId',
            '[class.active]': 'current',
            '[class.clr-wizard-page]': 'true',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [WizardNavigationService,
        PageCollectionService,
        ButtonHubService])
], ClrWizardPage);
export { ClrWizardPage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXBhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUUxRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV6RCxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFFeEI7Ozs7Ozs7OztHQVNHO0FBYUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN4Qjs7OztPQUlHO0lBQ0gsWUFDVSxVQUFtQyxFQUNwQyxjQUFxQyxFQUNyQyxhQUErQjtRQUY5QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFDckMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBZ0R4Qzs7OztXQUlHO1FBQ0ssc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBbUNsQzs7Ozs7O1dBTUc7UUFDd0MsMkJBQXNCLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUc7Ozs7V0FJRztRQUNLLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQW1D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QXNCLFlBQVk7MERBQXFDO0FBdUJyRTtJQUEvQixNQUFNLENBQUMsc0JBQXNCLENBQUM7c0NBQXVCLFlBQVk7MkRBQThCO0FBRTNEO0lBQXBDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztzQ0FBc0IsWUFBWTswREFBOEI7QUFhdkY7SUFBWixLQUFLLENBQUMsSUFBSSxDQUFDOzswQ0FBMkM7QUFwWjVDLGFBQWE7SUFaekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxJQUFJO1lBQ1osSUFBSSxFQUFFLFVBQVU7WUFDaEIsb0JBQW9CLEVBQUUsVUFBVTtZQUNoQyx3QkFBd0IsRUFBRSxZQUFZO1lBQ3RDLGdCQUFnQixFQUFFLFNBQVM7WUFDM0IseUJBQXlCLEVBQUUsTUFBTTtTQUNsQztLQUNGLENBQUM7NkNBUXNCLHVCQUF1QjtRQUNwQixxQkFBcUI7UUFDdEIsZ0JBQWdCO0dBVDdCLGFBQWEsQ0E4bkJ6QjtTQTluQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCdXR0b25IdWJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYnV0dG9uLWh1Yi5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlQnV0dG9ucyB9IGZyb20gJy4vd2l6YXJkLXBhZ2UtYnV0dG9ucyc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlSGVhZGVyQWN0aW9ucyB9IGZyb20gJy4vd2l6YXJkLXBhZ2UtaGVhZGVyLWFjdGlvbnMnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZU5hdlRpdGxlIH0gZnJvbSAnLi93aXphcmQtcGFnZS1uYXZ0aXRsZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlVGl0bGUgfSBmcm9tICcuL3dpemFyZC1wYWdlLXRpdGxlJztcblxubGV0IHdpemFyZFBhZ2VJbmRleCA9IDA7XG5cbi8qKlxuICogVGhlIENscldpemFyZFBhZ2UgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIHRoZSBjb250ZW50IG9mIGVhY2ggc3RlcFxuICogaW4gdGhlIHdpemFyZCB3b3JrZmxvdy5cbiAqXG4gKiBDbHJXaXphcmRQYWdlIGNvbXBvbmVudCBoYXMgaG9va3MgaW50byB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIChDbHJXaXphcmRQYWdlLm5hdlNlcnZpY2UpLFxuICogcGFnZSBjb2xsZWN0aW9uIChDbHJXaXphcmRQYWdlLnBhZ2VDb2xsZWN0aW9uKSwgYW5kIGJ1dHRvbiBzZXJ2aWNlXG4gKiAoQ2xyV2l6YXJkUGFnZS5idXR0b25TZXJ2aWNlKS4gVGhlc2UgdGhyZWUgcHJvdmlkZXJzIGFyZSBzaGFyZWQgYWNyb3NzIHRoZSBjb21wb25lbnRzXG4gKiB3aXRoaW4gZWFjaCBpbnN0YW5jZSBvZiBhIFdpemFyZC5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci13aXphcmQtcGFnZScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgcm9sZTogJ3RhYnBhbmVsJyxcbiAgICAnW2F0dHIuYXJpYS1oaWRkZW5dJzogJyFjdXJyZW50JyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdzdGVwSXRlbUlkJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnY3VycmVudCcsXG4gICAgJ1tjbGFzcy5jbHItd2l6YXJkLXBhZ2VdJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJXaXphcmRQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2xyV2l6YXJkUGFnZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmF2U2VydmljZTogV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHVibGljIHBhZ2VDb2xsZWN0aW9uOiBQYWdlQ29sbGVjdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGJ1dHRvblNlcnZpY2U6IEJ1dHRvbkh1YlNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgcGFnZSB0aXRsZSB3aGljaCBpcyB1c2VkIGZvciBhIG51bWJlclxuICAgKiBvZiBkaWZmZXJlbnQgdGFza3MgZm9yIGRpc3BsYXkgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyV2l6YXJkUGFnZVRpdGxlLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgcGFnZVRpdGxlOiBDbHJXaXphcmRQYWdlVGl0bGU7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSBkZXNpcmVkIHRpdGxlIGZvciB0aGUgcGFnZSdzIHN0ZXAgaW4gdGhlXG4gICAqIG5hdmlnYXRpb24gb24gdGhlIGxlZnQgc2lkZSBvZiB0aGUgd2l6YXJkLiBDYW4gYmUgcHJvamVjdGVkIHRvIGNoYW5nZSB0aGVcbiAgICogbmF2aWdhdGlvbiBsaW5rJ3MgdGV4dC5cbiAgICpcbiAgICogSWYgbm90IGRlZmluZWQsIHRoZW4gQ2xyV2l6YXJkUGFnZS5wYWdlVGl0bGUgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHN0ZXBuYXYuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKENscldpemFyZFBhZ2VOYXZUaXRsZSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIHBhZ2VOYXZUaXRsZTogQ2xyV2l6YXJkUGFnZU5hdlRpdGxlO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgYnV0dG9ucyBkZWZpbmVkIHdpdGhpbiB0aGUgcGFnZS4gSWYgbm90IGRlZmluZWQsXG4gICAqIHRoZSB3aXphcmQgZGVmYXVsdHMgdG8gdGhlIHNldCBvZiBidXR0b25zIGRlZmluZWQgYXMgYSBkaXJlY3QgY2hpbGQgb2YgdGhlXG4gICAqIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyV2l6YXJkUGFnZUJ1dHRvbnMsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBfYnV0dG9uczogQ2xyV2l6YXJkUGFnZUJ1dHRvbnM7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSBoZWFkZXIgYWN0aW9ucyBkZWZpbmVkIHdpdGhpbiB0aGUgcGFnZS4gSWYgbm90IGRlZmluZWQsXG4gICAqIHRoZSB3aXphcmQgZGVmYXVsdHMgdG8gdGhlIHNldCBvZiBoZWFkZXIgYWN0aW9ucyBkZWZpbmVkIGFzIGEgZGlyZWN0IGNoaWxkIG9mIHRoZVxuICAgKiB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKENscldpemFyZFBhZ2VIZWFkZXJBY3Rpb25zLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgX2hlYWRlckFjdGlvbnM6IENscldpemFyZFBhZ2VIZWFkZXJBY3Rpb25zO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbmV4dFN0ZXBEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGdldHRlciB0aGF0IHRlbGxzIHdoZXRoZXIgb3Igbm90IHRoZSB3aXphcmQgc2hvdWxkIGJlIGFsbG93ZWRcbiAgICogdG8gbW92ZSB0byB0aGUgbmV4dCBwYWdlLlxuICAgKlxuICAgKiBVc2VmdWwgZm9yIGluLXBhZ2UgdmFsaWRhdGlvbiBiZWNhdXNlIGl0IHByZXZlbnRzIGZvcndhcmQgbmF2aWdhdGlvblxuICAgKiBhbmQgdmlzaWJseSBkaXNhYmxlcyB0aGUgbmV4dCBidXR0b24uXG4gICAqXG4gICAqIERvZXMgbm90IHJlcXVpcmUgdGhhdCB5b3UgcmUtaW1wbGVtZW50IG5hdmlnYXRpb24gcm91dGluZXMgbGlrZSB5b3VcbiAgICogd291bGQgaWYgeW91IHdlcmUgdXNpbmcgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdCBvclxuICAgKiBXaXphcmQucHJldmVudERlZmF1bHQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5leHRTdGVwRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRTdGVwRGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBwYWdlIHNob3VsZCBhbGxvdyBmb3J3YXJkIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VOZXh0RGlzYWJsZWQnKVxuICBwdWJsaWMgc2V0IG5leHRTdGVwRGlzYWJsZWQodmFsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsQm9vbCA9ICEhdmFsO1xuICAgIGlmICh2YWxCb29sICE9PSB0aGlzLl9uZXh0U3RlcERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9uZXh0U3RlcERpc2FibGVkID0gdmFsQm9vbDtcbiAgICAgIHRoaXMubmV4dFN0ZXBEaXNhYmxlZENoYW5nZS5lbWl0KHZhbEJvb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBvZiBDbHJXaXphcmRQYWdlLm5leHRTdGVwRGlzYWJsZWQgY2hhbmdlcy5cbiAgICogU2hvdWxkIGVtaXQgdGhlIG5ldyB2YWx1ZSBvZiBuZXh0U3RlcERpc2FibGVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU5leHREaXNhYmxlZENoYW5nZScpIG5leHRTdGVwRGlzYWJsZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX3ByZXZpb3VzU3RlcERpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZ2V0dGVyIHRoYXQgdGVsbHMgd2hldGhlciBvciBub3QgdGhlIHdpemFyZCBzaG91bGQgYmUgYWxsb3dlZFxuICAgKiB0byBtb3ZlIHRvIHRoZSBwcmV2aW91cyBwYWdlLlxuICAgKlxuICAgKiBVc2VmdWwgZm9yIGluLXBhZ2UgdmFsaWRhdGlvbiBiZWNhdXNlIGl0IHByZXZlbnRzIGJhY2t3YXJkIG5hdmlnYXRpb25cbiAgICogYW5kIHZpc2libHkgZGlzYWJsZXMgdGhlIHByZXZpb3VzIGJ1dHRvbi5cbiAgICpcbiAgICogRG9lcyBub3QgcmVxdWlyZSB0aGF0IHlvdSByZS1pbXBsZW1lbnQgbmF2aWdhdGlvbiByb3V0aW5lcyBsaWtlIHlvdVxuICAgKiB3b3VsZCBpZiB5b3Ugd2VyZSB1c2luZyBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0IG9yXG4gICAqIFdpemFyZC5wcmV2ZW50RGVmYXVsdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgcHJldmlvdXNTdGVwRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXZpb3VzU3RlcERpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgcGFnZSBzaG91bGQgYWxsb3cgYmFja3dhcmQgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUGFnZVByZXZpb3VzRGlzYWJsZWQnKVxuICBwdWJsaWMgc2V0IHByZXZpb3VzU3RlcERpc2FibGVkKHZhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IHZhbEJvb2wgPSAhIXZhbDtcbiAgICBpZiAodmFsQm9vbCAhPT0gdGhpcy5fcHJldmlvdXNTdGVwRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX3ByZXZpb3VzU3RlcERpc2FibGVkID0gdmFsQm9vbDtcbiAgICAgIHRoaXMucHJldmlvdXNTdGVwRGlzYWJsZWRDaGFuZ2UuZW1pdCh2YWxCb29sKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgdmFsdWUgb2YgQ2xyV2l6YXJkUGFnZS5wcmV2aW91c1N0ZXBEaXNhYmxlZCBjaGFuZ2VzLlxuICAgKiBTaG91bGQgZW1pdCB0aGUgbmV3IHZhbHVlIG9mIHByZXZpb3VzU3RlcERpc2FibGVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZVByZXZpb3VzRGlzYWJsZWRDaGFuZ2UnKVxuICBwdWJsaWMgcHJldmlvdXNTdGVwRGlzYWJsZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogT3ZlcnJpZGVzIGFsbCBhY3Rpb25zIGZyb20gdGhlIHBhZ2UgbGV2ZWwsIHNvIHlvdSBjYW4gdXNlIGFuIGFsdGVybmF0ZSBmdW5jdGlvbiBmb3JcbiAgICogdmFsaWRhdGlvbiBvciBkYXRhLW11bmdpbmcgd2l0aCBhIENscldpemFyZFBhZ2Uub25Db21taXQgKGNscldpemFyZFBhZ2VPbkNvbW1pdCBvdXRwdXQpLFxuICAgKiBDbHJXaXphcmRQYWdlLm9uQ2FuY2VsIChjbHJXaXphcmRQYWdlT25DYW5jZWwgb3V0cHV0KSwgb3Igb25lXG4gICAqIG9mIHRoZSBncmFudWxhciBwYWdlLWxldmVsIGJ1dHRvbiBjbGljayBldmVudCBlbWl0dGVycy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0JykgcHVibGljIHByZXZlbnREZWZhdWx0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9zdG9wQ2FuY2VsID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZ2V0dGVyIHRoYXQgcmV0cmlldmVzIHdoZXRoZXIgdGhlIHBhZ2UgaXMgcHJldmVudGluZyB0aGUgY2FuY2VsIGFjdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgc3RvcENhbmNlbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcENhbmNlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIGNhbmNlbCBhY3Rpb24gZnJvbSB0aGUgcGFnZSBsZXZlbC4gQWxsb3dzIHlvdSB0byB1c2UgYW5cbiAgICogYWx0ZXJuYXRlIGZ1bmN0aW9uIGZvciB2YWxpZGF0aW9uIG9yIGRhdGEtbXVuZ2luZyBiZWZvcmUgY2FuY2VsbGluZyB0aGVcbiAgICogd2l6YXJkIHdoZW4gY29tYmluZWQgd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5vbkNhbmNlbFxuICAgKiAodGhlIGNscldpemFyZFBhZ2VPbkNhbmNlbCBvdXRwdXQpLlxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGF0IHlvdSBtYW51YWxseSBjbG9zZSB0aGUgd2l6YXJkIGZyb20geW91ciBob3N0IGNvbXBvbmVudCxcbiAgICogdXN1YWxseSB3aXRoIGEgY2FsbCB0byBXaXphcmQuZm9yY2VOZXh0KCkgb3Igd2l6YXJkLm5leHQoKTtcbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFBhZ2VcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0Q2FuY2VsJylcbiAgcHVibGljIHNldCBzdG9wQ2FuY2VsKHZhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IHZhbEJvb2wgPSAhIXZhbDtcbiAgICBpZiAodmFsQm9vbCAhPT0gdGhpcy5fc3RvcENhbmNlbCkge1xuICAgICAgdGhpcy5fc3RvcENhbmNlbCA9IHZhbEJvb2w7XG4gICAgICB0aGlzLnN0b3BDYW5jZWxDaGFuZ2UuZW1pdCh2YWxCb29sKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdENhbmNlbENoYW5nZScpIHN0b3BDYW5jZWxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX3N0b3BOZXh0ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZ2V0dGVyIHRoYXQgdGVsbHMgeW91IHdoZXRoZXIgdGhlIHBhZ2UgaXMgcHJldmVudGluZyB0aGUgbmV4dCBhY3Rpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0b3BOZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdG9wTmV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgZm9yd2FyZCBuYXZpZ2F0aW9uIGZyb20gdGhlIHBhZ2UgbGV2ZWwuIEFsbG93cyB5b3UgdG8gdXNlIGFuXG4gICAqIGFsdGVybmF0ZSBmdW5jdGlvbiBmb3IgdmFsaWRhdGlvbiBvciBkYXRhLW11bmdpbmcgYmVmb3JlIG1vdmluZyB0aGVcbiAgICogd2l6YXJkIHRvIHRoZSBuZXh0IHBhZ2V3aGVuIGNvbWJpbmVkIHdpdGggdGhlIENscldpemFyZFBhZ2Uub25Db21taXRcbiAgICogKGNscldpemFyZFBhZ2VPbkNvbW1pdCkgb3IgQ2xyV2l6YXJkUGFnZS5uZXh0QnV0dG9uQ2xpY2tlZFxuICAgKiAoY2xyV2l6YXJkUGFnZU5leHQpIG91dHB1dHMuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoYXQgeW91IG1hbnVhbGx5IHRlbGwgdGhlIHdpemFyZCB0byBuYXZpZ2F0ZSBmb3J3YXJkIGZyb21cbiAgICogdGhlIGhvc3RDb21wb25lbnQsIHVzdWFsbHkgd2l0aCBhIGNhbGwgdG8gV2l6YXJkLmZvcmNlTmV4dCgpIG9yXG4gICAqIHdpemFyZC5uZXh0KCk7XG4gICAqXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRQYWdlXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdE5leHQnKVxuICBwdWJsaWMgc2V0IHN0b3BOZXh0KHZhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IHZhbEJvb2wgPSAhIXZhbDtcbiAgICBpZiAodmFsQm9vbCAhPT0gdGhpcy5fc3RvcE5leHQpIHtcbiAgICAgIHRoaXMuX3N0b3BOZXh0ID0gdmFsQm9vbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlciBjYXJyaWVkIG92ZXIgZnJvbSBhIGxlZ2FjeSB2ZXJzaW9uIG9mIENscldpemFyZFBhZ2UuXG4gICAqIEZpcmVzIGFuIGV2ZW50IG9uIENscldpemFyZFBhZ2Ugd2hlbmV2ZXIgdGhlIG5leHQgb3IgZmluaXNoIGJ1dHRvbnNcbiAgICogYXJlIGNsaWNrZWQgYW5kIHRoZSBwYWdlIGlzIHRoZSBjdXJyZW50IHBhZ2Ugb2YgdGhlIFdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgZG9lcyBub3QgYXV0b21hdGljYWxseSBlbWl0IGFuIGV2ZW50IHdoZW4gYSBjdXN0b21cbiAgICogYnV0dG9uIGlzIHVzZWQgaW4gcGxhY2Ugb2YgYSBuZXh0IG9yIGZpbmlzaCBidXR0b24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlT25Db21taXQnKSBvbkNvbW1pdDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIENscldpemFyZFBhZ2UgYmVjb21lcyB0aGUgY3VycmVudCBwYWdlIG9mIHRoZVxuICAgKiBXaXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlT25Mb2FkJykgb25Mb2FkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgQ2xyV2l6YXJkUGFnZSBpbnZva2VzIHRoZSBjYW5jZWwgcm91dGluZSBmb3IgdGhlIHdpemFyZC5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5zdG9wQ2FuY2VsXG4gICAqIChjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHRDYW5jZWwpIG9yIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0cyB0byBpbXBsZW1lbnQgY3VzdG9tIGNhbmNlbFxuICAgKiBmdW5jdGlvbmFsaXR5IGF0IHRoZSBwYWdlIGxldmVsLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkb1xuICAgKiB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm4gdXNlcnMgYmVmb3JlIGNhbmNlbGxpbmcgdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmNsb3NlKCkgZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuXG4gICAqIFRoaXMgY29uc3RpdHVlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2YgdGhlIGNhbmNlbCBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU9uQ2FuY2VsJykgcGFnZU9uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlIENscldpemFyZFBhZ2UgaXNcbiAgICogdGhlIHdpemFyZCdzIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXQgdG8gaW1wbGVtZW50IGN1c3RvbSBmaW5pc2hcbiAgICogZnVuY3Rpb25hbGl0eSBhdCB0aGUgcGFnZSBsZXZlbC4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG9cbiAgICogdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGNvbXBsZXRlXG4gICAqIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5maW5pc2goKSBvciBXaXphcmQuZm9yY2VGaW5pc2goKVxuICAgKiBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC4gVGhpcyBjb21iaW5hdGlvbiBjcmVhdGVzIGEgZnVsbCByZXBsYWNlbWVudCBvZlxuICAgKiB0aGUgZmluaXNoIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlRmluaXNoJykgZmluaXNoQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlIENscldpemFyZFBhZ2UgaXNcbiAgICogdGhlIHdpemFyZCdzIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXQgdG8gaW1wbGVtZW50IGN1c3RvbSBiYWNrd2FyZHNcbiAgICogbmF2aWdhdGlvbiBhdCB0aGUgcGFnZSBsZXZlbC4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG9cbiAgICogdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGdvXG4gICAqIGJhY2t3YXJkcyBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQucHJldmlvdXMoKVxuICAgKiBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC4gVGhpcyBjb21iaW5hdGlvbiBjcmVhdGVzIGEgZnVsbCByZXBsYWNlbWVudCBvZlxuICAgKiB0aGUgYmFja3dhcmRzIG5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VQcmV2aW91cycpIHByZXZpb3VzQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgQ2xyV2l6YXJkUGFnZSBpc1xuICAgKiB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGZvcndhcmRzXG4gICAqIG5hdmlnYXRpb24gYXQgdGhlIHBhZ2UgbGV2ZWwuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvXG4gICAqIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FybiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBnb1xuICAgKiB0byB0aGUgbmV4dCBwYWdlIGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5mb3JjZU5leHQoKSBvciBXaXphcmQubmV4dCgpXG4gICAqIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mXG4gICAqIHRoZSBmb3J3YXJkIG5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VOZXh0JykgbmV4dEJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIGRhbmdlciBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlIENscldpemFyZFBhZ2UgaXNcbiAgICogdGhlIHdpemFyZCdzIGN1cnJlbnQgcGFnZS4gQnkgZGVmYXVsdCwgYSBkYW5nZXIgYnV0dG9uIHdpbGwgYWN0IGFzXG4gICAqIGVpdGhlciBhIFwibmV4dFwiIG9yIFwiZmluaXNoXCIgYnV0dG9uIGRlcGVuZGluZyBvbiBpZiB0aGUgQ2xyV2l6YXJkUGFnZSBpcyB0aGVcbiAgICogbGFzdCBwYWdlIG9yIG5vdC5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXQgdG8gaW1wbGVtZW50IGN1c3RvbSBmb3J3YXJkc1xuICAgKiBvciBmaW5pc2ggbmF2aWdhdGlvbiBhdCB0aGUgcGFnZSBsZXZlbCB3aGVuIHRoZSBkYW5nZXIgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FyblxuICAgKiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBnbyB0byB0aGUgbmV4dCBwYWdlIGluIHRoZSB3aXphcmQgb3JcbiAgICogZmluaXNoIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5maW5pc2goKSwgV2l6YXJkLmZvcmNlRmluaXNoKCksXG4gICAqIFdpemFyZC5mb3JjZU5leHQoKSBvciBXaXphcmQubmV4dCgpIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzXG4gICAqIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mIHRoZSBmb3J3YXJkIG5hdmlnYXRpb24gYW5kXG4gICAqIGZpbmlzaCBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZURhbmdlcicpIGRhbmdlckJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIG5leHQsIGZpbmlzaCwgb3IgZGFuZ2VyIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGVcbiAgICogQ2xyV2l6YXJkUGFnZSBpcyB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGZvcndhcmRzXG4gICAqIG9yIGZpbmlzaCBuYXZpZ2F0aW9uIGF0IHRoZSBwYWdlIGxldmVsLCByZWdhcmRsZXNzIG9mIHRoZSB0eXBlIG9mXG4gICAqIHByaW1hcnkgYnV0dG9uLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkbyB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm5cbiAgICogdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gZ28gdG8gdGhlIG5leHQgcGFnZSBpbiB0aGUgd2l6YXJkIG9yXG4gICAqIGZpbmlzaCB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuZmluaXNoKCksIFdpemFyZC5mb3JjZUZpbmlzaCgpLFxuICAgKiBXaXphcmQuZm9yY2VOZXh0KCkgb3IgV2l6YXJkLm5leHQoKSBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC4gVGhpc1xuICAgKiBjb21iaW5hdGlvbiBjcmVhdGVzIGEgZnVsbCByZXBsYWNlbWVudCBvZiB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGFuZFxuICAgKiBmaW5pc2ggZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VQcmltYXJ5JykgcHJpbWFyeUJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VDdXN0b21CdXR0b24nKSBjdXN0b21CdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQW4gaW5wdXQgdmFsdWUgdGhhdCBpcyB1c2VkIGludGVybmFsbHkgdG8gZ2VuZXJhdGUgdGhlIENscldpemFyZFBhZ2UgSUQgYXNcbiAgICogd2VsbCBhcyB0aGUgc3RlcCBuYXYgaXRlbSBJRC5cbiAgICpcbiAgICogVHlwZWQgYXMgYW55IGJlY2F1c2UgaXQgc2hvdWxkIGJlIGFibGUgdG8gYWNjZXB0IG51bWJlcnMgYXMgd2VsbCBhc1xuICAgKiBzdHJpbmdzLiBQYXNzaW5nIGFuIGluZGV4IGZvciB3aXphcmQgd2hvc2UgcGFnZXMgYXJlIGNyZWF0ZWQgd2l0aCBhblxuICAgKiBuZ0ZvciBsb29wIGlzIGEgY29tbW9uIHVzZSBjYXNlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdpZCcpIF9pZDogYW55ID0gKHdpemFyZFBhZ2VJbmRleCsrKS50b1N0cmluZygpO1xuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCBnZW5lcmF0ZXMgYW4gSUQgc3RyaW5nIGZvciB0aGUgd2l6YXJkIHBhZ2UgZnJvbVxuICAgKiBlaXRoZXIgdGhlIHZhbHVlIHBhc3NlZCB0byB0aGUgQ2xyV2l6YXJkUGFnZSBcImlkXCIgaW5wdXQgb3IgYSB3aXphcmQgcGFnZVxuICAgKiBjb3VudGVyIHNoYXJlZCBhY3Jvc3MgYWxsIHdpemFyZCBwYWdlcyBpbiB0aGUgYXBwbGljYXRpb24uXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgdmFsdWUgcGFzc2VkIGludG8gdGhlIElEIGlucHV0IFdpbGwgYmUgcHJlZml4ZWQgd2l0aFxuICAgKiBcImNsci13aXphcmQtcGFnZS1cIi5cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRQYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlkKCkge1xuICAgIC8vIGNvdmVycyB0aGluZ3MgbGlrZSBudWxsLCB1bmRlZmluZWQsIGZhbHNlLCBhbmQgZW1wdHkgc3RyaW5nXG4gICAgLy8gd2hpbGUgYWxsb3dpbmcgemVybyB0byBwYXNzXG4gICAgY29uc3QgaWRJc05vblplcm9GYWxzeSA9ICF0aGlzLl9pZCAmJiB0aGlzLl9pZCAhPT0gMDtcblxuICAgIC8vIGluIGFkZGl0aW9uIHRvIG5vbi16ZXJvIGZhbHN5IHdlIGFsc28gd2FudCB0byBtYWtlIHN1cmUgX2lkIGlzIG5vdCBhIG5lZ2F0aXZlXG4gICAgLy8gbnVtYmVyLlxuICAgIGlmIChpZElzTm9uWmVyb0ZhbHN5IHx8IHRoaXMuX2lkIDwgMCkge1xuICAgICAgLy8gZ3VhcmQgaGVyZSBpbiB0aGUgZXZlbnQgdGhhdCBpbnB1dCBiZWNvbWVzIHVuZGVmaW5lZCBvciBudWxsIGJ5IGFjY2lkZW50XG4gICAgICB0aGlzLl9pZCA9ICh3aXphcmRQYWdlSW5kZXgrKykudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIGBjbHItd2l6YXJkLXBhZ2UtJHt0aGlzLl9pZH1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHNlcnZlcyBhcyBhIGNvbnZlbmllbmNlIGZvciB0aG9zZSB3aG8gd291bGQgcmF0aGVyXG4gICAqIG5vdCB0aGluayBpbiB0aGUgdGVybXMgb2YgIUNscldpemFyZFBhZ2UubmV4dFN0ZXBEaXNhYmxlZC4gRm9yIHNvbWUgdXNlIGNhc2VzLFxuICAgKiBDbHJXaXphcmRQYWdlLnJlYWR5VG9Db21wbGV0ZSBpcyBtb3JlIGxvZ2ljYWwgYW5kIGRlY2xhcmF0aXZlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCByZWFkeVRvQ29tcGxldGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLm5leHRTdGVwRGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2NvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgcGFnZSBpcyBtYXJrZWQgYXMgY29tcGxldGVkIGlmIGl0IGlzIGJvdGggcmVhZHlUb0NvbXBsZXRlIGFuZCBjb21wbGV0ZWQsXG4gICAqIGFzIGluIHRoZSBuZXh0IG9yIGZpbmlzaCBhY3Rpb24gaGFzIGJlZW4gZXhlY3V0ZWQgd2hpbGUgdGhpcyBwYWdlIHdhcyBjdXJyZW50LlxuICAgKlxuICAgKiBOb3RlIHRoZXJlIGlzIGFuZCBvcGVuIHF1ZXN0aW9uIGFib3V0IGhvdyB0byBoYW5kbGUgcGFnZXMgdGhhdCBhcmUgbWFya2VkXG4gICAqIGNvbXBsZXRlIGJ1dCB3aG8gYXJlIG5vIGxvbmdlciByZWFkeVRvQ29tcGxldGUuIFRoaXMgbWlnaHQgaW5kaWNhdGUgYW4gZXJyb3JcbiAgICogc3RhdGUgZm9yIHRoZSBDbHJXaXphcmRQYWdlLiBDdXJyZW50bHksIHRoZSB3aXphcmQgZG9lcyBub3QgYWNrbm93bGVkZ2UgdGhpcyBzdGF0ZVxuICAgKiBhbmQgb25seSByZXR1cm5zIHRoYXQgdGhlIHBhZ2UgaXMgaW5jb21wbGV0ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgY29tcGxldGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb21wbGV0ZSAmJiB0aGlzLnJlYWR5VG9Db21wbGV0ZTtcblxuICAgIC8vIEZPUiBWMjogVU5XSU5EIENPTVBMRVRFRCwgUkVBRFlUT0NPTVBMRVRFLCBBTkQgRVJST1JTXG4gICAgLy8gU1VDSCBUSEFUIEVSUk9SUyBJUyBJVFMgT1dOIElOUFVULiBJRiBBIFNURVAgSVNcbiAgICAvLyBJTkNPTVBMRVRFIEFORCBFUlJPUkVELCBFUlJPUkVEIFdJTEwgTk9UIFNIT1cuXG4gICAgLy8gRklSU1QgUVVFU1RJT046IEFNIEkgR1JFWSBPUiBDT0xPUkVEP1xuICAgIC8vIFNFQ09ORCBRVUVTVElPTjogQU0gSSBHUkVFTiBPUiBSRUQ/XG4gIH1cblxuICAvKipcbiAgICogQSBDbHJXaXphcmRQYWdlIGNhbiBiZSBtYW51YWxseSBzZXQgdG8gY29tcGxldGVkIHVzaW5nIHRoaXMgYm9vbGVhbiBzZXR0ZXIuXG4gICAqIEl0IGlzIHJlY29tbWVuZGVkIHRoYXQgdXNlcnMgcmVseSBvbiB0aGUgY29udmVuaWVuY2UgZnVuY3Rpb25zIGluIHRoZSB3aXphcmRcbiAgICogYW5kIG5hdmlnYXRpb24gc2VydmljZSBpbnN0ZWFkIG9mIG1hbnVhbGx5IHNldHRpbmcgcGFnZXPigJkgY29tcGxldGlvbiBzdGF0ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFBhZ2VcbiAgICovXG4gIHB1YmxpYyBzZXQgY29tcGxldGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29tcGxldGUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2l0aCB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIHRvIHNlZSBpZiBpdCBpcyB0aGUgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2UgPT09IHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBhZ2UgaXMgbmF2aWdhYmxlXG4gICAqIGluIHRoZSB3aXphcmQuIEEgd2l6YXJkIHBhZ2UgY2FuIGJlIG5hdmlnYXRlZCB0byBpZiBpdCBpcyBjb21wbGV0ZWRcbiAgICogb3IgdGhlIHBhZ2UgYmVmb3JlIGl0IGlzIGNvbXBsZXRlZC5cbiAgICpcbiAgICogVGhpcyBnZXR0ZXIgaGFuZGxlcyB0aGUgbG9naWMgZm9yIGVuYWJsaW5nIG9yIGRpc2FibGluZyB0aGUgbGlua3MgaW5cbiAgICogdGhlIHN0ZXAgbmF2IG9uIHRoZSBsZWZ0IFNpZGUgb2YgdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgZW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50IHx8IHRoaXMuY29tcGxldGVkIHx8IHRoaXMucHJldmlvdXNDb21wbGV0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcGFnZSBiZWZvcmUgdGhpc1xuICAgKiBDbHJXaXphcmRQYWdlIGlzIGNvbXBsZXRlZC4gVGhpcyBpcyB1c2VmdWwgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgb3Igbm90XG4gICAqIGEgcGFnZSBpcyBuYXZpZ2FibGUgaWYgaXQgaXMgbm90IGN1cnJlbnQgb3IgYWxyZWFkeSBjb21wbGV0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHByZXZpb3VzQ29tcGxldGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZSA9IHRoaXMucGFnZUNvbGxlY3Rpb24uZ2V0UHJldmlvdXNQYWdlKHRoaXMpO1xuXG4gICAgaWYgKCFwcmV2aW91c1BhZ2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBwcmV2aW91c1BhZ2UuY29tcGxldGVkO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRpdGxlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VUaXRsZS5wYWdlVGl0bGVUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBuYXZUaXRsZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAodGhpcy5wYWdlTmF2VGl0bGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhZ2VOYXZUaXRsZS5wYWdlTmF2VGl0bGVUZW1wbGF0ZVJlZjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZVRpdGxlLnBhZ2VUaXRsZVRlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhlYWRlckFjdGlvbnMoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgaWYgKCF0aGlzLl9oZWFkZXJBY3Rpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9oZWFkZXJBY3Rpb25zLnBhZ2VIZWFkZXJBY3Rpb25zVGVtcGxhdGVSZWY7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgaGFzSGVhZGVyQWN0aW9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9oZWFkZXJBY3Rpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJ1dHRvbnMoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgaWYgKCF0aGlzLl9idXR0b25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9idXR0b25zLnBhZ2VCdXR0b25zVGVtcGxhdGVSZWY7XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgcmV0dXJucyBhIGJvb2xlYW4gdGhhdCBzYXlzIHdoZXRoZXIgb3JcbiAgICogbm90IHRoZSBDbHJXaXphcmRQYWdlIGluY2x1ZGVzIGJ1dHRvbnMuIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZVxuICAgKiBXaXphcmQgc2hvdWxkIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGJ1dHRvbiBzZXQgZGVmaW5lZCBhc1xuICAgKiBpdHMgZGlyZWN0IGNoaWxkcmVuLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBoYXNCdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX2J1dHRvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXNlcyB0aGUgbmF2IHNlcnZpY2UgdG8gbWFrZSB0aGUgQ2xyV2l6YXJkUGFnZSB0aGUgY3VycmVudCBwYWdlIGluIHRoZVxuICAgKiB3aXphcmQuIEJ5cGFzc2VzIGFsbCBjaGVja3MgYnV0IHN0aWxsIGVtaXRzIHRoZSBDbHJXaXphcmRQYWdlLm9uTG9hZFxuICAgKiAoY2xyV2l6YXJkUGFnZU9uTG9hZCkgb3V0cHV0LlxuICAgKlxuICAgKiBJbiBtb3N0IGNhc2VzLCBpdCBpcyBiZXR0ZXIgdG8gdXNlIHRoZSBkZWZhdWx0IG5hdmlnYXRpb24gZnVuY3Rpb25zXG4gICAqIGluIFdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBtYWtlQ3VycmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2UgPSB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmtzIHRoZSBuYXYgc2VydmljZSBhbmQgZXN0YWJsaXNoZXMgdGhlIGN1cnJlbnQgcGFnZSBpZiBvbmUgaXMgbm90IGRlZmluZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgbmF2U2VydmljZSA9IHRoaXMubmF2U2VydmljZTtcbiAgICBpZiAoIW5hdlNlcnZpY2UuY3VycmVudFBhZ2UgJiYgIW5hdlNlcnZpY2UubmF2U2VydmljZUxvYWRlZCkge1xuICAgICAgdGhpcy5tYWtlQ3VycmVudCgpO1xuICAgICAgdGhpcy5uYXZTZXJ2aWNlLm5hdlNlcnZpY2VMb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCByZXR1cm5zIHRoZSBpZCB1c2VkIGJ5IHRoZSBzdGVwIG5hdiBpdGVtIGFzc29jaWF0ZWQgd2l0aCB0aGUgcGFnZS5cbiAgICpcbiAgICogQ2xyV2l6YXJkUGFnZSBuZWVkcyB0aGlzIElEIHN0cmluZyBmb3IgYXJpYSBpbmZvcm1hdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgc3RlcEl0ZW1JZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldFN0ZXBJdGVtSWRGb3JQYWdlKHRoaXMpO1xuICB9XG59XG4iXX0=