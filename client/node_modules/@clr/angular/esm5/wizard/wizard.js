/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, EventEmitter, Input, IterableDiffers, Output, QueryList, } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { HeaderActionService } from './providers/header-actions.service';
import { PageCollectionService } from './providers/page-collection.service';
// providers
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardHeaderAction } from './wizard-header-action';
import { ClrWizardPage } from './wizard-page';
/**
 *
 * The Wizard component
 *
 */
var ClrWizard = /** @class */ (function () {
    /**
     * Creates an instance of Wizard.
     *
     * @memberof Wizard
     *
     */
    function ClrWizard(navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        var _this = this;
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this.headerActionService = headerActionService;
        this.elementRef = elementRef;
        /**
         * Contains the size defined by the clrWizardSize input
         *
         * @memberof Wizard
         *
         */
        this.size = 'xl';
        this._forceForward = false;
        /**
         * Tells the modal part of the wizard whether it should have a close "X"
         * in the top right corner. Set with the clrWizardClosable input.
         *
         * @memberof Wizard
         *
         */
        this.closable = true;
        /**
         * Toggles open/close of the wizard component. Set using the clrWizardOpen
         * input.
         *
         * @memberof Wizard
         *
         */
        this._open = false;
        /**
         * Emits when the wizard is opened or closed. Emits through the
         * clrWizardOpenChange output. Works in conjunction with the
         * clrWizardOpen binding so you can use...
         *
         * <clr-wizard [(clrWizardOpen)]="blah"
         * ...or...
         * <clr-wizard [clrWizardOpen]="something" (clrWizardOpenChange)="doSomethign($event)">
         *
         * ...for two-way binding.
         *
         * @memberof Wizard
         *
         */
        this._openChanged = new EventEmitter(false);
        /**
         * Emits when the wizard is canceled. Can be observed through the clrWizardOnCancel
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultCancel input to create
         * wizard-level custom cancel routines.
         *
         * @memberof Wizard
         *
         */
        this.onCancel = new EventEmitter(false);
        /**
         * Emits when the wizard is completed. Can be observed through the clrWizardOnFinish
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultNext input to create
         * wizard-level custom completion routines.
         *
         * @memberof Wizard
         *
         */
        this.wizardFinished = new EventEmitter(false);
        /**
         * Emits when the wizard is reset. See .reset(). Can be observed through
         * the clrWizardOnReset output.
         *
         * @memberof Wizard
         *
         */
        this.onReset = new EventEmitter(false);
        /**
         * Emits when the current page has changed. Can be observed through the clrWizardCurrentPageChanged
         * output. This can happen on .next() or .previous().
         * Useful for non-blocking validation.
         *
         * @memberof Wizard
         *
         */
        this.currentPageChanged = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the next page. Can be observed through the clrWizardOnNext
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultNext input to create
         * wizard-level custom navigation routines, which are useful for validation.
         *
         * @memberof Wizard
         *
         */
        this.onMoveNext = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the previous page. Can be observed through the
         * clrWizardOnPrevious output.
         *
         * Can be useful for validation.
         *
         * @memberof Wizard
         *
         */
        this.onMovePrevious = new EventEmitter(false);
        this._stopNext = false;
        this._stopCancel = false;
        this._stopNavigation = false;
        this._disableStepnav = false;
        /**
         * Used only to communicate to the underlying modal that animations are not
         * wanted. Primary use is for the display of static/inline wizards.
         *
         * Set using clrWizardPreventModalAnimation input. But you should never set it.
         *
         * @memberof Wizard
         *
         */
        this._stopModalAnimations = false;
        this.goNextSubscription = this.navService.movedToNextPage.subscribe(function () {
            _this.onMoveNext.emit();
        });
        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe(function () {
            _this.onMovePrevious.emit();
        });
        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe(function () {
            _this.checkAndCancel();
        });
        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe(function () {
            if (!_this.stopNext) {
                _this.forceFinish();
            }
            _this.wizardFinished.emit();
        });
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(ClrWizard.prototype, "forceForward", {
        get: function () {
            return this._forceForward;
        },
        /**
         * Resets page completed states when navigating backwards. Can be set using
         * the clrWizardForceForwardNavigation input.
         *
         * @memberof Wizard
         *
         */
        set: function (value) {
            this._forceForward = !!value;
            this.navService.forceForwardNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "clrWizardOpen", {
        set: function (open) {
            if (open) {
                this.buttonService.buttonsReady = true;
            }
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNext", {
        get: function () {
            return this._stopNext;
        },
        /**
         * Prevents ClrWizard from moving to the next page or closing itself on finishing.
         * Set using the clrWizardPreventDefaultNext input.
         *
         * Note that using stopNext will require you to create your own calls to
         * .next() and .finish() in your host component to make the ClrWizard work as
         * expected.
         *
         * Primarily used for validation.
         *
         * @memberof Wizard
         *
         */
        set: function (value) {
            this._stopNext = !!value;
            this.navService.wizardHasAltNext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopCancel", {
        get: function () {
            return this._stopCancel;
        },
        /**
         * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
         * Set using the clrWizardPreventDefaultCancel input.
         *
         * Note that using stopCancel will require you to create your own calls to
         * .close() in your host component to make the ClrWizard work as expected.
         *
         * Useful for doing checks or prompts before closing a ClrWizard.
         *
         * @memberof Wizard
         *
         */
        set: function (value) {
            this._stopCancel = !!value;
            this.navService.wizardHasAltCancel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNavigation", {
        get: function () {
            return this._stopNavigation;
        },
        /**
         * Prevents ClrWizard from performing any form of navigation away from the current
         * page. Set using the clrWizardPreventNavigation input.
         *
         * Note that stopNavigation is meant to freeze the wizard in place, typically
         * during a long validation or background action where you want the wizard to
         * display loading content but not allow the user to execute navigation in
         * the stepnav, close X, or the  back, finish, or next buttons.
         *
         * @memberof Wizard
         *
         */
        set: function (value) {
            this._stopNavigation = !!value;
            this.navService.wizardStopNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "disableStepnav", {
        get: function () {
            return this._disableStepnav;
        },
        /**
         * Prevents clicks on the links in the stepnav from working.
         *
         * A more granular bypassing of navigation which can be useful when your
         * ClrWizard is in a state of completion and you don't want users to be
         * able to jump backwards and change things.
         *
         * @memberof Wizard
         *
         */
        set: function (value) {
            this._disableStepnav = !!value;
            this.navService.wizardDisableStepnav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopModalAnimations", {
        get: function () {
            if (this._stopModalAnimations) {
                return 'true';
            }
            return 'false';
        },
        enumerable: true,
        configurable: true
    });
    ClrWizard.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe(function (page) {
            _this.currentPageChanged.emit();
        });
    };
    ClrWizard.prototype.ngOnDestroy = function () {
        if (this.goNextSubscription) {
            this.goNextSubscription.unsubscribe();
        }
        if (this.goPreviousSubscription) {
            this.goPreviousSubscription.unsubscribe();
        }
        if (this.cancelSubscription) {
            this.cancelSubscription.unsubscribe();
        }
        if (this.currentPageSubscription) {
            this.currentPageSubscription.unsubscribe();
        }
        if (this.wizardFinishedSubscription) {
            this.wizardFinishedSubscription.unsubscribe();
        }
    };
    /**
     * Sets up references that are needed by the providers.
     *
     * @name ngAfterContentInit
     * @memberof Wizard
     *
     */
    ClrWizard.prototype.ngAfterContentInit = function () {
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    };
    /**
     * Used for keeping track of when pages are added or removed from this.pages
     *
     * @name ngDoCheck
     * @memberof Wizard
     *
     */
    ClrWizard.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem(function (r) {
                _this.navService.updateNavigation();
            });
            changes.forEachRemovedItem(function (r) {
                _this.navService.updateNavigation();
            });
        }
    };
    Object.defineProperty(ClrWizard.prototype, "isStatic", {
        /**
         * Convenient property for determining whether a wizard is static/in-line or not.
         *
         * @name isStatic
         *
         * @memberof Wizard
         *
         */
        get: function () {
            return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "currentPage", {
        /**
         * As a getter, current page is a convenient way to retrieve the current page from
         * the WizardNavigationService.
         *
         * As a setter, current page accepts a ClrWizardPage and passes it to WizardNavigationService
         * to be made the current page. currentPage performs checks to make sure it can navigate
         * to the designated page.
         *
         * @name currentPage
         *
         * @memberof Wizard
         *
         */
        get: function () {
            return this.navService.currentPage;
        },
        set: function (page) {
            this.navService.goTo(page, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isLast", {
        /**
         * Convenient property for determining if the current page is the last page of
         * the wizard.
         *
         * @name isLast
         *
         * @memberof Wizard
         *
         */
        get: function () {
            return this.navService.currentPageIsLast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isFirst", {
        /**
         * Convenient property for determining if the current page is the first page of
         * the wizard.
         *
         * @name isFirst
         *
         * @memberof Wizard
         *
         */
        get: function () {
            return this.navService.currentPageIsFirst;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Performs the actions needed to open the wizard. If there is no current
     * page defined, sets the first page in the wizard to be current.
     *
     * @name open
     * @memberof ClrWizard
     */
    ClrWizard.prototype.open = function () {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this._openChanged.emit(true);
    };
    /**
     * Does the work involved with closing the wizard. Call this directly instead
     * of cancel() to implement alternative cancel functionality.
     *
     * @name close
     * @memberof ClrWizard
     */
    ClrWizard.prototype.close = function () {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
    };
    /**
     * Convenient function that can be used to open and close the wizard. It operates
     * by checking a Boolean parameter. If true, the wizard is opened. If false,
     * it is closed.
     *
     * There is no default value for this parameter, so by default the wizard will
     * close if invoked with no parameter.
     *
     * @name toggle
     *
     * @memberof ClrWizard
     */
    ClrWizard.prototype.toggle = function (value) {
        if (value) {
            this.open();
        }
        else {
            this.close();
        }
    };
    /**
     * Moves the wizard to the previous page.
     *
     * @name previous
     * @memberof ClrWizard
     */
    ClrWizard.prototype.previous = function () {
        this.navService.previous();
    };
    /**
     * Includes a Boolean parameter that will skip checks and event emissions.
     * If true, the wizard will move to the next page regardless of the state of
     * its current page. This is useful for alternative navigation where event
     * emissions have already been done and firing them again may cause an event loop.
     *
     * Generally, with alternative navigation, users are supplying their own checks
     * and validation. So there is no point in superseding their business logic
     * with our default behavior.
     *
     * If false, the wizard will execute default checks and emit events as normal.
     * This is useful for custom buttons or programmatic workflows that are not
     * executing the wizards default checks and emissions. It is another way to
     * navigate without having to rewrite the wizard’s default functionality
     * from scratch.
     *
     * By default, next() does not execute event emissions or checks because the
     * 80% case is that this method will be called as part of an alternative
     * navigation with clrWizardPreventDefaultNext.
     *
     * @name next
     * @memberof ClrWizard
     */
    ClrWizard.prototype.next = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    };
    /**
     * Includes a Boolean parameter that will skip checks and event emissions.
     * If true, the wizard will  complete and close regardless of the state of
     * its current page. This is useful for alternative navigation where event
     * emissions have already been done and firing them again may cause an event loop.
     *
     * If false, the wizard will execute default checks and emit events before
     * completing and closing.
     *
     * By default, finish() does not execute event emissions or checks because the
     * 80% case is that this method will be called as part of an alternative
     * navigation with clrWizardPreventDefaultNext.
     *
     * @name finish
     * @memberof ClrWizard
     */
    ClrWizard.prototype.finish = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    };
    /**
     * Does the work of finishing up the wizard and closing it but doesn't do the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling ClrWizard.finish(true) or ClrWizard.finish()
     * without a parameter.
     *
     * @name forceFinish
     * @memberof ClrWizard
     */
    ClrWizard.prototype.forceFinish = function () {
        if (this.stopNavigation) {
            return;
        }
        this.close();
    };
    /**
     * Does the work of moving the wizard to the next page without the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling ClrWizard.next(true) or ClrWizard.next()
     * without a parameter.
     *
     * @name forceNext
     * @memberof ClrWizard
     */
    ClrWizard.prototype.forceNext = function () {
        this.navService.forceNext();
    };
    /**
     * Initiates the functionality that cancels and closes the wizard.
     *
     * Do not use this for an override of the cancel the functionality
     * with clrWizardPreventDefaultCancel, clrWizardPreventPageDefaultCancel,
     * or clrWizardPagePreventDefault because it will initiate the same checks
     * and event emissions that invoked your event handler.
     *
     * Use ClrWizard.close() instead.
     *
     * @name cancel
     * @memberof ClrWizard
     */
    ClrWizard.prototype.cancel = function () {
        this.navService.cancel();
    };
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality.
     *
     * In most cases, use ClrWizard.cancel() instead.
     *
     * @name modalCancel
     * @memberof ClrWizard
     */
    ClrWizard.prototype.modalCancel = function () {
        this.checkAndCancel();
    };
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs (clrWizardPageOnCancel and
     * clrWizardOnCancel) if so.
     *
     * @name checkAndCancel
     * @memberof ClrWizard
     */
    ClrWizard.prototype.checkAndCancel = function () {
        var currentPage = this.currentPage;
        var currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
        if (this.stopNavigation) {
            return;
        }
        currentPage.pageOnCancel.emit();
        if (!currentPageHasOverrides) {
            this.onCancel.emit();
        }
        if (!this.stopCancel && !currentPageHasOverrides) {
            this.close();
        }
    };
    /**
     * Accepts the wizard ID as a string parameter and calls to WizardNavigationService
     * to navigate to the page with that ID. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * Probably less useful than calling directly to ClrWizard.navService.goTo() because the
     * nav service method can accept either a string ID or a page object.
     *
     * The format of the expected ID parameter can be found in the return of the
     * ClrWizardPage.id getter, usually prefixed with “clr-wizard-page-“ and then either a
     * numeric ID or the ID specified for the ClrWizardPage component’s “id” input.
     *
     * @name goTo
     *
     * @memberof ClrWizard
     */
    ClrWizard.prototype.goTo = function (pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    };
    /**
     * A convenience function that calls to PageCollectionService.reset() and emits the
     * ClrWizard.onReset event.
     *
     * Reset sets all WizardPages to incomplete and sets the first page in the ClrWizard to
     * be the current page, essentially resetting the wizard navigation.
     *
     * Users would then use the onReset event to reset the data or model in their
     * host component.
     *
     * It could be useful to call a reset without firing the onReset event. To do this,
     * just call ClrWizard.pageCollection.reset() directly.
     *
     * @name reset
     * @memberof ClrWizard
     */
    ClrWizard.prototype.reset = function () {
        this.pageCollection.reset();
        this.onReset.next();
    };
    tslib_1.__decorate([
        Input('clrWizardSize'),
        tslib_1.__metadata("design:type", String)
    ], ClrWizard.prototype, "size", void 0);
    tslib_1.__decorate([
        Input('clrWizardForceForwardNavigation'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizard.prototype, "forceForward", null);
    tslib_1.__decorate([
        Input('clrWizardClosable'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrWizard.prototype, "closable", void 0);
    tslib_1.__decorate([
        Input('clrWizardOpen'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizard.prototype, "clrWizardOpen", null);
    tslib_1.__decorate([
        Output('clrWizardOpenChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizard.prototype, "_openChanged", void 0);
    tslib_1.__decorate([
        Output('clrWizardOnCancel'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizard.prototype, "onCancel", void 0);
    tslib_1.__decorate([
        Output('clrWizardOnFinish'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizard.prototype, "wizardFinished", void 0);
    tslib_1.__decorate([
        Output('clrWizardOnReset'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizard.prototype, "onReset", void 0);
    tslib_1.__decorate([
        ContentChildren(ClrWizardPage),
        tslib_1.__metadata("design:type", QueryList)
    ], ClrWizard.prototype, "pages", void 0);
    tslib_1.__decorate([
        ContentChildren(ClrWizardHeaderAction),
        tslib_1.__metadata("design:type", QueryList)
    ], ClrWizard.prototype, "headerActions", void 0);
    tslib_1.__decorate([
        Output('clrWizardCurrentPageChanged'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizard.prototype, "currentPageChanged", void 0);
    tslib_1.__decorate([
        Output('clrWizardOnNext'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizard.prototype, "onMoveNext", void 0);
    tslib_1.__decorate([
        Output('clrWizardOnPrevious'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizard.prototype, "onMovePrevious", void 0);
    tslib_1.__decorate([
        Input('clrWizardPreventDefaultNext'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizard.prototype, "stopNext", null);
    tslib_1.__decorate([
        Input('clrWizardPreventDefaultCancel'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizard.prototype, "stopCancel", null);
    tslib_1.__decorate([
        Input('clrWizardPreventNavigation'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizard.prototype, "stopNavigation", null);
    tslib_1.__decorate([
        Input('clrWizardDisableStepnav'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizard.prototype, "disableStepnav", null);
    tslib_1.__decorate([
        Input('clrWizardPreventModalAnimation'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrWizard.prototype, "_stopModalAnimations", void 0);
    ClrWizard = tslib_1.__decorate([
        Component({
            selector: 'clr-wizard',
            providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
            template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-modal\n    [clrModalOpen]=\"_open\"\n    [clrModalSize]=\"size\"\n    [clrModalClosable]=\"closable\"\n    [clrModalStaticBackdrop]=\"true\"\n    [clrModalSkipAnimation]=\"stopModalAnimations\"\n    [clrModalOverrideScrollService]=\"isStatic\"\n    [clrModalPreventClose]=\"true\"\n    (clrModalAlternateClose)=\"modalCancel()\">\n\n    <nav class=\"modal-nav clr-wizard-stepnav-wrapper\">\n        <h3 class=\"clr-wizard-title\"><ng-content select=\"clr-wizard-title\"></ng-content></h3>\n        <clr-wizard-stepnav></clr-wizard-stepnav>\n    </nav>\n\n    <h3 class=\"modal-title\">\n        <span class=\"modal-title-text\">\n            <ng-template [ngTemplateOutlet]=\"navService.currentPageTitle\"></ng-template>\n        </span>\n\n        <div class=\"modal-header-actions-wrapper\" *ngIf=\"headerActionService.displayHeaderActionsWrapper\">\n            <div *ngIf=\"headerActionService.showWizardHeaderActions\">\n                <ng-content select=\"clr-wizard-header-action\"></ng-content>\n            </div>\n            <div *ngIf=\"headerActionService.currentPageHasHeaderActions\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.headerActions\"></ng-template>\n            </div>\n        </div>\n    </h3>\n\n    <div class=\"modal-body\">\n        <main clr-wizard-pages-wrapper class=\"clr-wizard-content\">\n            <ng-content></ng-content>\n        </main>\n    </div>\n    <div class=\"modal-footer clr-wizard-footer\">\n        <div class=\"clr-wizard-footer-buttons\">\n            <div *ngIf=\"navService.currentPage && !navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-content select=\"clr-wizard-button\"></ng-content>\n            </div>\n            <div *ngIf=\"navService.currentPage && navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.buttons\"></ng-template>\n            </div>\n        </div>\n    </div>\n</clr-modal>\n",
            host: {
                '[class.clr-wizard]': 'true',
                '[class.wizard-md]': "size == 'md'",
                '[class.wizard-lg]': "size == 'lg'",
                '[class.wizard-xl]': "size == 'xl'",
                '[class.lastPage]': 'navService.currentPageIsLast',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [WizardNavigationService,
            PageCollectionService,
            ButtonHubService,
            HeaderActionService,
            ElementRef,
            IterableDiffers])
    ], ClrWizard);
    return ClrWizard;
}());
export { ClrWizard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsid2l6YXJkL3dpemFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFHZixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLFlBQVk7QUFDWixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlDOzs7O0dBSUc7QUFhSDtJQUNFOzs7OztPQUtHO0lBQ0gsbUJBQ1MsVUFBbUMsRUFDbkMsY0FBcUMsRUFDckMsYUFBK0IsRUFDL0IsbUJBQXdDLEVBQ3ZDLFVBQXNCLEVBQzlCLE9BQXdCO1FBTjFCLGlCQTRCQztRQTNCUSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFDckMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWlDaEM7Ozs7O1dBS0c7UUFDcUIsU0FBSSxHQUFXLElBQUksQ0FBQztRQWNwQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUt2Qzs7Ozs7O1dBTUc7UUFDeUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUVy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O0lBZ0JoRztRQURDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQzs7OzZDQUlwQztJQW1CRDtRQURDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQzs7OytDQUl0QztJQW1CRDtRQURDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQzs7O21EQUluQztJQWlCRDtRQURDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQzs7O21EQUloQztJQWV3QztRQUF4QyxLQUFLLENBQUMsZ0NBQWdDLENBQUM7OzJEQUF1QztJQTlTcEUsU0FBUztRQVpyQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQztZQUNsRyxxeEVBQTRCO1lBQzVCLElBQUksRUFBRTtnQkFDSixvQkFBb0IsRUFBRSxNQUFNO2dCQUM1QixtQkFBbUIsRUFBRSxjQUFjO2dCQUNuQyxtQkFBbUIsRUFBRSxjQUFjO2dCQUNuQyxtQkFBbUIsRUFBRSxjQUFjO2dCQUNuQyxrQkFBa0IsRUFBRSw4QkFBOEI7YUFDbkQ7U0FDRixDQUFDO2lEQVNxQix1QkFBdUI7WUFDbkIscUJBQXFCO1lBQ3RCLGdCQUFnQjtZQUNWLG1CQUFtQjtZQUMzQixVQUFVO1lBQ3JCLGVBQWU7T0FiZixTQUFTLENBa3JCckI7SUFBRCxnQkFBQztDQUFBLEFBbHJCRCxJQWtyQkM7U0FsckJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQnV0dG9uSHViU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2J1dHRvbi1odWIuc2VydmljZSc7XG5pbXBvcnQgeyBIZWFkZXJBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaGVhZGVyLWFjdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlLWNvbGxlY3Rpb24uc2VydmljZSc7XG4vLyBwcm92aWRlcnNcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRIZWFkZXJBY3Rpb24gfSBmcm9tICcuL3dpemFyZC1oZWFkZXItYWN0aW9uJztcbmltcG9ydCB7IENscldpemFyZFBhZ2UgfSBmcm9tICcuL3dpemFyZC1wYWdlJztcblxuLyoqXG4gKlxuICogVGhlIFdpemFyZCBjb21wb25lbnRcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci13aXphcmQnLFxuICBwcm92aWRlcnM6IFtXaXphcmROYXZpZ2F0aW9uU2VydmljZSwgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLCBCdXR0b25IdWJTZXJ2aWNlLCBIZWFkZXJBY3Rpb25TZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3dpemFyZC5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLXdpemFyZF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy53aXphcmQtbWRdJzogXCJzaXplID09ICdtZCdcIixcbiAgICAnW2NsYXNzLndpemFyZC1sZ10nOiBcInNpemUgPT0gJ2xnJ1wiLFxuICAgICdbY2xhc3Mud2l6YXJkLXhsXSc6IFwic2l6ZSA9PSAneGwnXCIsXG4gICAgJ1tjbGFzcy5sYXN0UGFnZV0nOiAnbmF2U2VydmljZS5jdXJyZW50UGFnZUlzTGFzdCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBEb0NoZWNrIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmF2U2VydmljZTogV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHVibGljIHBhZ2VDb2xsZWN0aW9uOiBQYWdlQ29sbGVjdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGJ1dHRvblNlcnZpY2U6IEJ1dHRvbkh1YlNlcnZpY2UsXG4gICAgcHVibGljIGhlYWRlckFjdGlvblNlcnZpY2U6IEhlYWRlckFjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVyc1xuICApIHtcbiAgICB0aGlzLmdvTmV4dFN1YnNjcmlwdGlvbiA9IHRoaXMubmF2U2VydmljZS5tb3ZlZFRvTmV4dFBhZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMub25Nb3ZlTmV4dC5lbWl0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdvUHJldmlvdXNTdWJzY3JpcHRpb24gPSB0aGlzLm5hdlNlcnZpY2UubW92ZWRUb1ByZXZpb3VzUGFnZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vbk1vdmVQcmV2aW91cy5lbWl0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbmNlbFN1YnNjcmlwdGlvbiA9IHRoaXMubmF2U2VydmljZS5ub3RpZnlXaXphcmRDYW5jZWwuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBbmRDYW5jZWwoKTtcbiAgICB9KTtcblxuICAgIHRoaXMud2l6YXJkRmluaXNoZWRTdWJzY3JpcHRpb24gPSB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkRmluaXNoZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zdG9wTmV4dCkge1xuICAgICAgICB0aGlzLmZvcmNlRmluaXNoKCk7XG4gICAgICB9XG4gICAgICB0aGlzLndpemFyZEZpbmlzaGVkLmVtaXQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBmb3IgbWFya2luZyB3aGVuIHRoZSBjb2xsZWN0aW9uIG9mIHdpemFyZCBwYWdlcyBoYXMgYmVlbiBhZGRlZCB0byBvciBkZWxldGVkIGZyb21cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgZGlmZmVyOiBhbnk7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHRoZSBzaXplIGRlZmluZWQgYnkgdGhlIGNscldpemFyZFNpemUgaW5wdXRcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRTaXplJykgc2l6ZTogc3RyaW5nID0gJ3hsJztcblxuICAvKipcbiAgICogUmVzZXRzIHBhZ2UgY29tcGxldGVkIHN0YXRlcyB3aGVuIG5hdmlnYXRpbmcgYmFja3dhcmRzLiBDYW4gYmUgc2V0IHVzaW5nXG4gICAqIHRoZSBjbHJXaXphcmRGb3JjZUZvcndhcmROYXZpZ2F0aW9uIGlucHV0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZEZvcmNlRm9yd2FyZE5hdmlnYXRpb24nKVxuICBzZXQgZm9yY2VGb3J3YXJkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZm9yY2VGb3J3YXJkID0gISF2YWx1ZTtcbiAgICB0aGlzLm5hdlNlcnZpY2UuZm9yY2VGb3J3YXJkTmF2aWdhdGlvbiA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2ZvcmNlRm9yd2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZm9yY2VGb3J3YXJkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mb3JjZUZvcndhcmQ7XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgdGhlIG1vZGFsIHBhcnQgb2YgdGhlIHdpemFyZCB3aGV0aGVyIGl0IHNob3VsZCBoYXZlIGEgY2xvc2UgXCJYXCJcbiAgICogaW4gdGhlIHRvcCByaWdodCBjb3JuZXIuIFNldCB3aXRoIHRoZSBjbHJXaXphcmRDbG9zYWJsZSBpbnB1dC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRDbG9zYWJsZScpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVG9nZ2xlcyBvcGVuL2Nsb3NlIG9mIHRoZSB3aXphcmQgY29tcG9uZW50LiBTZXQgdXNpbmcgdGhlIGNscldpemFyZE9wZW5cbiAgICogaW5wdXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIHB1YmxpYyBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2NscldpemFyZE9wZW4nKVxuICBzZXQgY2xyV2l6YXJkT3BlbihvcGVuOiBib29sZWFuKSB7XG4gICAgaWYgKG9wZW4pIHtcbiAgICAgIHRoaXMuYnV0dG9uU2VydmljZS5idXR0b25zUmVhZHkgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9vcGVuID0gb3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgaXMgb3BlbmVkIG9yIGNsb3NlZC4gRW1pdHMgdGhyb3VnaCB0aGVcbiAgICogY2xyV2l6YXJkT3BlbkNoYW5nZSBvdXRwdXQuIFdvcmtzIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXG4gICAqIGNscldpemFyZE9wZW4gYmluZGluZyBzbyB5b3UgY2FuIHVzZS4uLlxuICAgKlxuICAgKiA8Y2xyLXdpemFyZCBbKGNscldpemFyZE9wZW4pXT1cImJsYWhcIlxuICAgKiAuLi5vci4uLlxuICAgKiA8Y2xyLXdpemFyZCBbY2xyV2l6YXJkT3Blbl09XCJzb21ldGhpbmdcIiAoY2xyV2l6YXJkT3BlbkNoYW5nZSk9XCJkb1NvbWV0aGlnbigkZXZlbnQpXCI+XG4gICAqXG4gICAqIC4uLmZvciB0d28td2F5IGJpbmRpbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9wZW5DaGFuZ2UnKSBfb3BlbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgaXMgY2FuY2VsZWQuIENhbiBiZSBvYnNlcnZlZCB0aHJvdWdoIHRoZSBjbHJXaXphcmRPbkNhbmNlbFxuICAgKiBvdXRwdXQuXG4gICAqXG4gICAqIENhbiBiZSBjb21iaW5lZCB3aXRoIHRoZSBjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbCBpbnB1dCB0byBjcmVhdGVcbiAgICogd2l6YXJkLWxldmVsIGN1c3RvbSBjYW5jZWwgcm91dGluZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9uQ2FuY2VsJykgb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIGlzIGNvbXBsZXRlZC4gQ2FuIGJlIG9ic2VydmVkIHRocm91Z2ggdGhlIGNscldpemFyZE9uRmluaXNoXG4gICAqIG91dHB1dC5cbiAgICpcbiAgICogQ2FuIGJlIGNvbWJpbmVkIHdpdGggdGhlIGNscldpemFyZFByZXZlbnREZWZhdWx0TmV4dCBpbnB1dCB0byBjcmVhdGVcbiAgICogd2l6YXJkLWxldmVsIGN1c3RvbSBjb21wbGV0aW9uIHJvdXRpbmVzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPbkZpbmlzaCcpIHdpemFyZEZpbmlzaGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHdpemFyZCBpcyByZXNldC4gU2VlIC5yZXNldCgpLiBDYW4gYmUgb2JzZXJ2ZWQgdGhyb3VnaFxuICAgKiB0aGUgY2xyV2l6YXJkT25SZXNldCBvdXRwdXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9uUmVzZXQnKSBvblJlc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEEgUXVlcnlMaXN0IG9mIHRoZSBwYWdlcyBpbiB0aGUgd2l6YXJkLiBOb3RlIHRoYXQgYSBRdWVyeUxpc3QgaXMgc29ydCBvZlxuICAgKiBsaWtlIGFuIEFycmF5IGJ1dCBub3QgcmVhbGx5LiBOb3RlIGFsc28gdGhhdCBwYWdlcyBkb2VzIG5vdCBjb250YWluXG4gICAqIFdpemFyZFBhZ2VzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQgd2l0aCBhbiBuZ0lmLlxuICAgKlxuICAgKiBNb3N0IGludGVyYWN0aW9ucyB3aXRoIGEgQ2xyV2l6YXJkJ3MgcGFnZXMgYXJlIG1vcmUgZWFzaWx5IGRvbmUgdXNpbmcgdGhlXG4gICAqIGhlbHBlciBmdW5jdGlvbiBpbiB0aGUgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLCBhY2Nlc3NpYmxlIGZyb20gdGhlXG4gICAqIENscldpemFyZCB0aHJvdWdoIENscldpemFyZC5wYWdlQ29sbGVjdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJXaXphcmRQYWdlKSBwdWJsaWMgcGFnZXM6IFF1ZXJ5TGlzdDxDbHJXaXphcmRQYWdlPjtcblxuICAvKipcbiAgICogQSBRdWVyeUxpc3Qgb2YgdGhlIGhlYWRlciBhY3Rpb25zIGRlZmluZWQgYXQgdGhlIENscldpemFyZCBsZXZlbC4gRG9lcyBub3RcbiAgICogY29udGFpbiBoZWFkZXIgYWN0aW9ucyBkZWZpbmVkIGF0IHRoZSBwYWdlIGxldmVsLiBNb3N0bHkgdXNlZCBieSBvdGhlciBmdW5jdGlvbmFsaXR5XG4gICAqIHRoYXQgbmVlZHMgdG8gZWl0aGVyIGtub3cgaWYgdGhlIENscldpemFyZCBoYXMgaGVhZGVyIGFjdGlvbnMgb3IgbmVlZHMgdG8gc3RhbXAgdGhlbVxuICAgKiBzb21ld2hlcmUuXG4gICAqXG4gICAqIENvdWxkIGJlIHVzZWZ1bCBpZiB5b3UgbmVlZGVkIHRvIGxvY2F0ZSBhbmQgcHJvZ3JhbW1hdGljYWxseSBhY3RpdmF0ZSBhIHNwZWNpZmljXG4gICAqIGhlYWRlciBhY3Rpb24uIEJ1dCB0aGlzIGlzIHByb2JhYmx5IGVhc2llciB0byBkbyBieSBpbnZva2luZyB0aGUgaGVhZGVyIGFjdGlvbidzXG4gICAqIGV2ZW50IGhhbmRsZXIgaW4geW91ciBob3N0IGNvbXBvbmVudC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJXaXphcmRIZWFkZXJBY3Rpb24pIHB1YmxpYyBoZWFkZXJBY3Rpb25zOiBRdWVyeUxpc3Q8Q2xyV2l6YXJkSGVhZGVyQWN0aW9uPjtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgY3VycmVudCBwYWdlIGhhcyBjaGFuZ2VkLiBDYW4gYmUgb2JzZXJ2ZWQgdGhyb3VnaCB0aGUgY2xyV2l6YXJkQ3VycmVudFBhZ2VDaGFuZ2VkXG4gICAqIG91dHB1dC4gVGhpcyBjYW4gaGFwcGVuIG9uIC5uZXh0KCkgb3IgLnByZXZpb3VzKCkuXG4gICAqIFVzZWZ1bCBmb3Igbm9uLWJsb2NraW5nIHZhbGlkYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZEN1cnJlbnRQYWdlQ2hhbmdlZCcpIGN1cnJlbnRQYWdlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgbW92ZXMgdG8gdGhlIG5leHQgcGFnZS4gQ2FuIGJlIG9ic2VydmVkIHRocm91Z2ggdGhlIGNscldpemFyZE9uTmV4dFxuICAgKiBvdXRwdXQuXG4gICAqXG4gICAqIENhbiBiZSBjb21iaW5lZCB3aXRoIHRoZSBjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHQgaW5wdXQgdG8gY3JlYXRlXG4gICAqIHdpemFyZC1sZXZlbCBjdXN0b20gbmF2aWdhdGlvbiByb3V0aW5lcywgd2hpY2ggYXJlIHVzZWZ1bCBmb3IgdmFsaWRhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkT25OZXh0Jykgb25Nb3ZlTmV4dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgbW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UuIENhbiBiZSBvYnNlcnZlZCB0aHJvdWdoIHRoZVxuICAgKiBjbHJXaXphcmRPblByZXZpb3VzIG91dHB1dC5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWZ1bCBmb3IgdmFsaWRhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkT25QcmV2aW91cycpIG9uTW92ZVByZXZpb3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIENscldpemFyZCBmcm9tIG1vdmluZyB0byB0aGUgbmV4dCBwYWdlIG9yIGNsb3NpbmcgaXRzZWxmIG9uIGZpbmlzaGluZy5cbiAgICogU2V0IHVzaW5nIHRoZSBjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHQgaW5wdXQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB1c2luZyBzdG9wTmV4dCB3aWxsIHJlcXVpcmUgeW91IHRvIGNyZWF0ZSB5b3VyIG93biBjYWxscyB0b1xuICAgKiAubmV4dCgpIGFuZCAuZmluaXNoKCkgaW4geW91ciBob3N0IGNvbXBvbmVudCB0byBtYWtlIHRoZSBDbHJXaXphcmQgd29yayBhc1xuICAgKiBleHBlY3RlZC5cbiAgICpcbiAgICogUHJpbWFyaWx5IHVzZWQgZm9yIHZhbGlkYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0JylcbiAgc2V0IHN0b3BOZXh0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RvcE5leHQgPSAhIXZhbHVlO1xuICAgIHRoaXMubmF2U2VydmljZS53aXphcmRIYXNBbHROZXh0ID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfc3RvcE5leHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHN0b3BOZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdG9wTmV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBDbHJXaXphcmQgZnJvbSBjbG9zaW5nIHdoZW4gdGhlIGNhbmNlbCBidXR0b24gb3IgY2xvc2UgXCJYXCIgaXMgY2xpY2tlZC5cbiAgICogU2V0IHVzaW5nIHRoZSBjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbCBpbnB1dC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHVzaW5nIHN0b3BDYW5jZWwgd2lsbCByZXF1aXJlIHlvdSB0byBjcmVhdGUgeW91ciBvd24gY2FsbHMgdG9cbiAgICogLmNsb3NlKCkgaW4geW91ciBob3N0IGNvbXBvbmVudCB0byBtYWtlIHRoZSBDbHJXaXphcmQgd29yayBhcyBleHBlY3RlZC5cbiAgICpcbiAgICogVXNlZnVsIGZvciBkb2luZyBjaGVja3Mgb3IgcHJvbXB0cyBiZWZvcmUgY2xvc2luZyBhIENscldpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbCcpXG4gIHNldCBzdG9wQ2FuY2VsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RvcENhbmNlbCA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLndpemFyZEhhc0FsdENhbmNlbCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3N0b3BDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHN0b3BDYW5jZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BDYW5jZWw7XG4gIH1cblxuICAvKipcbiAgICogUHJldmVudHMgQ2xyV2l6YXJkIGZyb20gcGVyZm9ybWluZyBhbnkgZm9ybSBvZiBuYXZpZ2F0aW9uIGF3YXkgZnJvbSB0aGUgY3VycmVudFxuICAgKiBwYWdlLiBTZXQgdXNpbmcgdGhlIGNscldpemFyZFByZXZlbnROYXZpZ2F0aW9uIGlucHV0LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgc3RvcE5hdmlnYXRpb24gaXMgbWVhbnQgdG8gZnJlZXplIHRoZSB3aXphcmQgaW4gcGxhY2UsIHR5cGljYWxseVxuICAgKiBkdXJpbmcgYSBsb25nIHZhbGlkYXRpb24gb3IgYmFja2dyb3VuZCBhY3Rpb24gd2hlcmUgeW91IHdhbnQgdGhlIHdpemFyZCB0b1xuICAgKiBkaXNwbGF5IGxvYWRpbmcgY29udGVudCBidXQgbm90IGFsbG93IHRoZSB1c2VyIHRvIGV4ZWN1dGUgbmF2aWdhdGlvbiBpblxuICAgKiB0aGUgc3RlcG5hdiwgY2xvc2UgWCwgb3IgdGhlICBiYWNrLCBmaW5pc2gsIG9yIG5leHQgYnV0dG9ucy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQcmV2ZW50TmF2aWdhdGlvbicpXG4gIHNldCBzdG9wTmF2aWdhdGlvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0b3BOYXZpZ2F0aW9uID0gISF2YWx1ZTtcbiAgICB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkU3RvcE5hdmlnYXRpb24gPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9zdG9wTmF2aWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc3RvcE5hdmlnYXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BOYXZpZ2F0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIGNsaWNrcyBvbiB0aGUgbGlua3MgaW4gdGhlIHN0ZXBuYXYgZnJvbSB3b3JraW5nLlxuICAgKlxuICAgKiBBIG1vcmUgZ3JhbnVsYXIgYnlwYXNzaW5nIG9mIG5hdmlnYXRpb24gd2hpY2ggY2FuIGJlIHVzZWZ1bCB3aGVuIHlvdXJcbiAgICogQ2xyV2l6YXJkIGlzIGluIGEgc3RhdGUgb2YgY29tcGxldGlvbiBhbmQgeW91IGRvbid0IHdhbnQgdXNlcnMgdG8gYmVcbiAgICogYWJsZSB0byBqdW1wIGJhY2t3YXJkcyBhbmQgY2hhbmdlIHRoaW5ncy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmREaXNhYmxlU3RlcG5hdicpXG4gIHNldCBkaXNhYmxlU3RlcG5hdih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVTdGVwbmF2ID0gISF2YWx1ZTtcbiAgICB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkRGlzYWJsZVN0ZXBuYXYgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlU3RlcG5hdjogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZGlzYWJsZVN0ZXBuYXYoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVTdGVwbmF2O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgb25seSB0byBjb21tdW5pY2F0ZSB0byB0aGUgdW5kZXJseWluZyBtb2RhbCB0aGF0IGFuaW1hdGlvbnMgYXJlIG5vdFxuICAgKiB3YW50ZWQuIFByaW1hcnkgdXNlIGlzIGZvciB0aGUgZGlzcGxheSBvZiBzdGF0aWMvaW5saW5lIHdpemFyZHMuXG4gICAqXG4gICAqIFNldCB1c2luZyBjbHJXaXphcmRQcmV2ZW50TW9kYWxBbmltYXRpb24gaW5wdXQuIEJ1dCB5b3Ugc2hvdWxkIG5ldmVyIHNldCBpdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQcmV2ZW50TW9kYWxBbmltYXRpb24nKSBfc3RvcE1vZGFsQW5pbWF0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHN0b3BNb2RhbEFuaW1hdGlvbnMoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fc3RvcE1vZGFsQW5pbWF0aW9ucykge1xuICAgICAgcmV0dXJuICd0cnVlJztcbiAgICB9XG4gICAgcmV0dXJuICdmYWxzZSc7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UGFnZVN1YnNjcmlwdGlvbiA9IHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZUNoYW5nZWQuc3Vic2NyaWJlKChwYWdlOiBDbHJXaXphcmRQYWdlKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlQ2hhbmdlZC5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvTmV4dFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGdvUHJldmlvdXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjYW5jZWxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjdXJyZW50UGFnZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHdpemFyZEZpbmlzaGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZ29OZXh0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmdvTmV4dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nb1ByZXZpb3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmdvUHJldmlvdXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FuY2VsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhbmNlbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy53aXphcmRGaW5pc2hlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy53aXphcmRGaW5pc2hlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHJlZmVyZW5jZXMgdGhhdCBhcmUgbmVlZGVkIGJ5IHRoZSBwcm92aWRlcnMuXG4gICAqXG4gICAqIEBuYW1lIG5nQWZ0ZXJDb250ZW50SW5pdFxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMucGFnZUNvbGxlY3Rpb24ucGFnZXMgPSB0aGlzLnBhZ2VzO1xuICAgIHRoaXMuaGVhZGVyQWN0aW9uU2VydmljZS53aXphcmRIZWFkZXJBY3Rpb25zID0gdGhpcy5oZWFkZXJBY3Rpb25zO1xuXG4gICAgLy8gT25seSB0cmlnZ2VyIGJ1dHRvbnMgcmVhZHkgaWYgZGVmYXVsdCBpcyBvcGVuIChpbmxpbmVkKVxuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLmJ1dHRvblNlcnZpY2UuYnV0dG9uc1JlYWR5ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBmb3Iga2VlcGluZyB0cmFjayBvZiB3aGVuIHBhZ2VzIGFyZSBhZGRlZCBvciByZW1vdmVkIGZyb20gdGhpcy5wYWdlc1xuICAgKlxuICAgKiBAbmFtZSBuZ0RvQ2hlY2tcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgcHVibGljIG5nRG9DaGVjaygpIHtcbiAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLnBhZ2VzKTtcbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChyOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5uYXZTZXJ2aWNlLnVwZGF0ZU5hdmlnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHI6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLm5hdlNlcnZpY2UudXBkYXRlTmF2aWdhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbnQgcHJvcGVydHkgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgYSB3aXphcmQgaXMgc3RhdGljL2luLWxpbmUgb3Igbm90LlxuICAgKlxuICAgKiBAbmFtZSBpc1N0YXRpY1xuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzU3RhdGljKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsci13aXphcmQtLWlubGluZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzIGEgZ2V0dGVyLCBjdXJyZW50IHBhZ2UgaXMgYSBjb252ZW5pZW50IHdheSB0byByZXRyaWV2ZSB0aGUgY3VycmVudCBwYWdlIGZyb21cbiAgICogdGhlIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLlxuICAgKlxuICAgKiBBcyBhIHNldHRlciwgY3VycmVudCBwYWdlIGFjY2VwdHMgYSBDbHJXaXphcmRQYWdlIGFuZCBwYXNzZXMgaXQgdG8gV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICogdG8gYmUgbWFkZSB0aGUgY3VycmVudCBwYWdlLiBjdXJyZW50UGFnZSBwZXJmb3JtcyBjaGVja3MgdG8gbWFrZSBzdXJlIGl0IGNhbiBuYXZpZ2F0ZVxuICAgKiB0byB0aGUgZGVzaWduYXRlZCBwYWdlLlxuICAgKlxuICAgKiBAbmFtZSBjdXJyZW50UGFnZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2U7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50UGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmdvVG8ocGFnZSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVudCBwcm9wZXJ0eSBmb3IgZGV0ZXJtaW5pbmcgaWYgdGhlIGN1cnJlbnQgcGFnZSBpcyB0aGUgbGFzdCBwYWdlIG9mXG4gICAqIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBuYW1lIGlzTGFzdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzTGFzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlSXNMYXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbnQgcHJvcGVydHkgZm9yIGRldGVybWluaW5nIGlmIHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlIGZpcnN0IHBhZ2Ugb2ZcbiAgICogdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG5hbWUgaXNGaXJzdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzRmlyc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZUlzRmlyc3Q7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIGFjdGlvbnMgbmVlZGVkIHRvIG9wZW4gdGhlIHdpemFyZC4gSWYgdGhlcmUgaXMgbm8gY3VycmVudFxuICAgKiBwYWdlIGRlZmluZWQsIHNldHMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIHdpemFyZCB0byBiZSBjdXJyZW50LlxuICAgKlxuICAgKiBAbmFtZSBvcGVuXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRcbiAgICovXG4gIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xuICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQYWdlKSB7XG4gICAgICB0aGlzLm5hdlNlcnZpY2Uuc2V0Rmlyc3RQYWdlQ3VycmVudCgpO1xuICAgIH1cblxuICAgIC8vIE9ubHkgcmVuZGVyIGJ1dHRvbnMgd2hlbiB3aXphcmQgaXMgb3BlbmVkLCB0byBhdm9pZCBjaG9jb2xhdGUgZXJyb3JzXG4gICAgdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbnNSZWFkeSA9IHRydWU7XG5cbiAgICB0aGlzLl9vcGVuQ2hhbmdlZC5lbWl0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvZXMgdGhlIHdvcmsgaW52b2x2ZWQgd2l0aCBjbG9zaW5nIHRoZSB3aXphcmQuIENhbGwgdGhpcyBkaXJlY3RseSBpbnN0ZWFkXG4gICAqIG9mIGNhbmNlbCgpIHRvIGltcGxlbWVudCBhbHRlcm5hdGl2ZSBjYW5jZWwgZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG5hbWUgY2xvc2VcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbnQgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBvcGVuIGFuZCBjbG9zZSB0aGUgd2l6YXJkLiBJdCBvcGVyYXRlc1xuICAgKiBieSBjaGVja2luZyBhIEJvb2xlYW4gcGFyYW1ldGVyLiBJZiB0cnVlLCB0aGUgd2l6YXJkIGlzIG9wZW5lZC4gSWYgZmFsc2UsXG4gICAqIGl0IGlzIGNsb3NlZC5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZGVmYXVsdCB2YWx1ZSBmb3IgdGhpcyBwYXJhbWV0ZXIsIHNvIGJ5IGRlZmF1bHQgdGhlIHdpemFyZCB3aWxsXG4gICAqIGNsb3NlIGlmIGludm9rZWQgd2l0aCBubyBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBuYW1lIHRvZ2dsZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgd2l6YXJkIHRvIHRoZSBwcmV2aW91cyBwYWdlLlxuICAgKlxuICAgKiBAbmFtZSBwcmV2aW91c1xuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLnByZXZpb3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5jbHVkZXMgYSBCb29sZWFuIHBhcmFtZXRlciB0aGF0IHdpbGwgc2tpcCBjaGVja3MgYW5kIGV2ZW50IGVtaXNzaW9ucy5cbiAgICogSWYgdHJ1ZSwgdGhlIHdpemFyZCB3aWxsIG1vdmUgdG8gdGhlIG5leHQgcGFnZSByZWdhcmRsZXNzIG9mIHRoZSBzdGF0ZSBvZlxuICAgKiBpdHMgY3VycmVudCBwYWdlLiBUaGlzIGlzIHVzZWZ1bCBmb3IgYWx0ZXJuYXRpdmUgbmF2aWdhdGlvbiB3aGVyZSBldmVudFxuICAgKiBlbWlzc2lvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gZG9uZSBhbmQgZmlyaW5nIHRoZW0gYWdhaW4gbWF5IGNhdXNlIGFuIGV2ZW50IGxvb3AuXG4gICAqXG4gICAqIEdlbmVyYWxseSwgd2l0aCBhbHRlcm5hdGl2ZSBuYXZpZ2F0aW9uLCB1c2VycyBhcmUgc3VwcGx5aW5nIHRoZWlyIG93biBjaGVja3NcbiAgICogYW5kIHZhbGlkYXRpb24uIFNvIHRoZXJlIGlzIG5vIHBvaW50IGluIHN1cGVyc2VkaW5nIHRoZWlyIGJ1c2luZXNzIGxvZ2ljXG4gICAqIHdpdGggb3VyIGRlZmF1bHQgYmVoYXZpb3IuXG4gICAqXG4gICAqIElmIGZhbHNlLCB0aGUgd2l6YXJkIHdpbGwgZXhlY3V0ZSBkZWZhdWx0IGNoZWNrcyBhbmQgZW1pdCBldmVudHMgYXMgbm9ybWFsLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3IgY3VzdG9tIGJ1dHRvbnMgb3IgcHJvZ3JhbW1hdGljIHdvcmtmbG93cyB0aGF0IGFyZSBub3RcbiAgICogZXhlY3V0aW5nIHRoZSB3aXphcmRzIGRlZmF1bHQgY2hlY2tzIGFuZCBlbWlzc2lvbnMuIEl0IGlzIGFub3RoZXIgd2F5IHRvXG4gICAqIG5hdmlnYXRlIHdpdGhvdXQgaGF2aW5nIHRvIHJld3JpdGUgdGhlIHdpemFyZOKAmXMgZGVmYXVsdCBmdW5jdGlvbmFsaXR5XG4gICAqIGZyb20gc2NyYXRjaC5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgbmV4dCgpIGRvZXMgbm90IGV4ZWN1dGUgZXZlbnQgZW1pc3Npb25zIG9yIGNoZWNrcyBiZWNhdXNlIHRoZVxuICAgKiA4MCUgY2FzZSBpcyB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGFzIHBhcnQgb2YgYW4gYWx0ZXJuYXRpdmVcbiAgICogbmF2aWdhdGlvbiB3aXRoIGNscldpemFyZFByZXZlbnREZWZhdWx0TmV4dC5cbiAgICpcbiAgICogQG5hbWUgbmV4dFxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgbmV4dChza2lwQ2hlY2tzQW5kRW1pdHM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKHNraXBDaGVja3NBbmRFbWl0cykge1xuICAgICAgdGhpcy5mb3JjZU5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZTZXJ2aWNlLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5jbHVkZXMgYSBCb29sZWFuIHBhcmFtZXRlciB0aGF0IHdpbGwgc2tpcCBjaGVja3MgYW5kIGV2ZW50IGVtaXNzaW9ucy5cbiAgICogSWYgdHJ1ZSwgdGhlIHdpemFyZCB3aWxsICBjb21wbGV0ZSBhbmQgY2xvc2UgcmVnYXJkbGVzcyBvZiB0aGUgc3RhdGUgb2ZcbiAgICogaXRzIGN1cnJlbnQgcGFnZS4gVGhpcyBpcyB1c2VmdWwgZm9yIGFsdGVybmF0aXZlIG5hdmlnYXRpb24gd2hlcmUgZXZlbnRcbiAgICogZW1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGRvbmUgYW5kIGZpcmluZyB0aGVtIGFnYWluIG1heSBjYXVzZSBhbiBldmVudCBsb29wLlxuICAgKlxuICAgKiBJZiBmYWxzZSwgdGhlIHdpemFyZCB3aWxsIGV4ZWN1dGUgZGVmYXVsdCBjaGVja3MgYW5kIGVtaXQgZXZlbnRzIGJlZm9yZVxuICAgKiBjb21wbGV0aW5nIGFuZCBjbG9zaW5nLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBmaW5pc2goKSBkb2VzIG5vdCBleGVjdXRlIGV2ZW50IGVtaXNzaW9ucyBvciBjaGVja3MgYmVjYXVzZSB0aGVcbiAgICogODAlIGNhc2UgaXMgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhcyBwYXJ0IG9mIGFuIGFsdGVybmF0aXZlXG4gICAqIG5hdmlnYXRpb24gd2l0aCBjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHQuXG4gICAqXG4gICAqIEBuYW1lIGZpbmlzaFxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgZmluaXNoKHNraXBDaGVja3NBbmRFbWl0czogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAoc2tpcENoZWNrc0FuZEVtaXRzKSB7XG4gICAgICB0aGlzLmZvcmNlRmluaXNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmF2U2VydmljZS5maW5pc2goKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRG9lcyB0aGUgd29yayBvZiBmaW5pc2hpbmcgdXAgdGhlIHdpemFyZCBhbmQgY2xvc2luZyBpdCBidXQgZG9lc24ndCBkbyB0aGVcbiAgICogY2hlY2tzIGFuZCBlbWlzc2lvbnMgdGhhdCBvdGhlciBwYXRocyBkby4gR29vZCBmb3IgYSBsYXN0IHN0ZXAgaW4gYW5cbiAgICogYWx0ZXJuYXRlIHdvcmtmbG93LlxuICAgKlxuICAgKiBEb2VzIHRoZSBzYW1lIHRoaW5nIGFzIGNhbGxpbmcgQ2xyV2l6YXJkLmZpbmlzaCh0cnVlKSBvciBDbHJXaXphcmQuZmluaXNoKClcbiAgICogd2l0aG91dCBhIHBhcmFtZXRlci5cbiAgICpcbiAgICogQG5hbWUgZm9yY2VGaW5pc2hcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIGZvcmNlRmluaXNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvZXMgdGhlIHdvcmsgb2YgbW92aW5nIHRoZSB3aXphcmQgdG8gdGhlIG5leHQgcGFnZSB3aXRob3V0IHRoZVxuICAgKiBjaGVja3MgYW5kIGVtaXNzaW9ucyB0aGF0IG90aGVyIHBhdGhzIGRvLiBHb29kIGZvciBhIGxhc3Qgc3RlcCBpbiBhblxuICAgKiBhbHRlcm5hdGUgd29ya2Zsb3cuXG4gICAqXG4gICAqIERvZXMgdGhlIHNhbWUgdGhpbmcgYXMgY2FsbGluZyBDbHJXaXphcmQubmV4dCh0cnVlKSBvciBDbHJXaXphcmQubmV4dCgpXG4gICAqIHdpdGhvdXQgYSBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBuYW1lIGZvcmNlTmV4dFxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgZm9yY2VOZXh0KCk6IHZvaWQge1xuICAgIHRoaXMubmF2U2VydmljZS5mb3JjZU5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdGhhdCBjYW5jZWxzIGFuZCBjbG9zZXMgdGhlIHdpemFyZC5cbiAgICpcbiAgICogRG8gbm90IHVzZSB0aGlzIGZvciBhbiBvdmVycmlkZSBvZiB0aGUgY2FuY2VsIHRoZSBmdW5jdGlvbmFsaXR5XG4gICAqIHdpdGggY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWwsIGNscldpemFyZFByZXZlbnRQYWdlRGVmYXVsdENhbmNlbCxcbiAgICogb3IgY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0IGJlY2F1c2UgaXQgd2lsbCBpbml0aWF0ZSB0aGUgc2FtZSBjaGVja3NcbiAgICogYW5kIGV2ZW50IGVtaXNzaW9ucyB0aGF0IGludm9rZWQgeW91ciBldmVudCBoYW5kbGVyLlxuICAgKlxuICAgKiBVc2UgQ2xyV2l6YXJkLmNsb3NlKCkgaW5zdGVhZC5cbiAgICpcbiAgICogQG5hbWUgY2FuY2VsXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRcbiAgICovXG4gIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmNhbmNlbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBiZWhhdmlvciBvZiB0aGUgdW5kZXJseWluZyBtb2RhbCB0byBhdm9pZCBjb2xsaXNpb25zIHdpdGhcbiAgICogYWx0ZXJuYXRpdmUgY2FuY2VsIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIHVzZSBDbHJXaXphcmQuY2FuY2VsKCkgaW5zdGVhZC5cbiAgICpcbiAgICogQG5hbWUgbW9kYWxDYW5jZWxcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIG1vZGFsQ2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tBbmRDYW5jZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgZm9yIGFsdGVybmF0aXZlIGNhbmNlbCBmbG93cyBkZWZpbmVkIGF0IHRoZSBjdXJyZW50IHBhZ2Ugb3JcbiAgICogd2l6YXJkIGxldmVsLiBQZXJmb3JtcyBhIGNhbmNlbGVkIGlmIG5vdC4gRW1pdHMgZXZlbnRzIHRoYXQgaW5pdGlhdGVcbiAgICogdGhlIGFsdGVybmF0aXZlIGNhbmNlbCBvdXRwdXRzIChjbHJXaXphcmRQYWdlT25DYW5jZWwgYW5kXG4gICAqIGNscldpemFyZE9uQ2FuY2VsKSBpZiBzby5cbiAgICpcbiAgICogQG5hbWUgY2hlY2tBbmRDYW5jZWxcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIGNoZWNrQW5kQ2FuY2VsKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICBjb25zdCBjdXJyZW50UGFnZUhhc092ZXJyaWRlcyA9IGN1cnJlbnRQYWdlLnN0b3BDYW5jZWwgfHwgY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQ7XG5cbiAgICBpZiAodGhpcy5zdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlLnBhZ2VPbkNhbmNlbC5lbWl0KCk7XG4gICAgaWYgKCFjdXJyZW50UGFnZUhhc092ZXJyaWRlcykge1xuICAgICAgdGhpcy5vbkNhbmNlbC5lbWl0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN0b3BDYW5jZWwgJiYgIWN1cnJlbnRQYWdlSGFzT3ZlcnJpZGVzKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgdGhlIHdpemFyZCBJRCBhcyBhIHN0cmluZyBwYXJhbWV0ZXIgYW5kIGNhbGxzIHRvIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqIHRvIG5hdmlnYXRlIHRvIHRoZSBwYWdlIHdpdGggdGhhdCBJRC4gTmF2aWdhdGlvbiB3aWxsIGludm9rZSB0aGUgd2l6YXJk4oCZcyBkZWZhdWx0XG4gICAqIGNoZWNrcyBhbmQgZXZlbnQgZW1pc3Npb25zLlxuICAgKlxuICAgKiBQcm9iYWJseSBsZXNzIHVzZWZ1bCB0aGFuIGNhbGxpbmcgZGlyZWN0bHkgdG8gQ2xyV2l6YXJkLm5hdlNlcnZpY2UuZ29UbygpIGJlY2F1c2UgdGhlXG4gICAqIG5hdiBzZXJ2aWNlIG1ldGhvZCBjYW4gYWNjZXB0IGVpdGhlciBhIHN0cmluZyBJRCBvciBhIHBhZ2Ugb2JqZWN0LlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IG9mIHRoZSBleHBlY3RlZCBJRCBwYXJhbWV0ZXIgY2FuIGJlIGZvdW5kIGluIHRoZSByZXR1cm4gb2YgdGhlXG4gICAqIENscldpemFyZFBhZ2UuaWQgZ2V0dGVyLCB1c3VhbGx5IHByZWZpeGVkIHdpdGgg4oCcY2xyLXdpemFyZC1wYWdlLeKAnCBhbmQgdGhlbiBlaXRoZXIgYVxuICAgKiBudW1lcmljIElEIG9yIHRoZSBJRCBzcGVjaWZpZWQgZm9yIHRoZSBDbHJXaXphcmRQYWdlIGNvbXBvbmVudOKAmXMg4oCcaWTigJ0gaW5wdXQuXG4gICAqXG4gICAqIEBuYW1lIGdvVG9cbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIGdvVG8ocGFnZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXBhZ2VJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubmF2U2VydmljZS5nb1RvKHBhZ2VJZCk7XG4gIH1cblxuICAvKipcbiAgICogQSBjb252ZW5pZW5jZSBmdW5jdGlvbiB0aGF0IGNhbGxzIHRvIFBhZ2VDb2xsZWN0aW9uU2VydmljZS5yZXNldCgpIGFuZCBlbWl0cyB0aGVcbiAgICogQ2xyV2l6YXJkLm9uUmVzZXQgZXZlbnQuXG4gICAqXG4gICAqIFJlc2V0IHNldHMgYWxsIFdpemFyZFBhZ2VzIHRvIGluY29tcGxldGUgYW5kIHNldHMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIENscldpemFyZCB0b1xuICAgKiBiZSB0aGUgY3VycmVudCBwYWdlLCBlc3NlbnRpYWxseSByZXNldHRpbmcgdGhlIHdpemFyZCBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBVc2VycyB3b3VsZCB0aGVuIHVzZSB0aGUgb25SZXNldCBldmVudCB0byByZXNldCB0aGUgZGF0YSBvciBtb2RlbCBpbiB0aGVpclxuICAgKiBob3N0IGNvbXBvbmVudC5cbiAgICpcbiAgICogSXQgY291bGQgYmUgdXNlZnVsIHRvIGNhbGwgYSByZXNldCB3aXRob3V0IGZpcmluZyB0aGUgb25SZXNldCBldmVudC4gVG8gZG8gdGhpcyxcbiAgICoganVzdCBjYWxsIENscldpemFyZC5wYWdlQ29sbGVjdGlvbi5yZXNldCgpIGRpcmVjdGx5LlxuICAgKlxuICAgKiBAbmFtZSByZXNldFxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5wYWdlQ29sbGVjdGlvbi5yZXNldCgpO1xuICAgIHRoaXMub25SZXNldC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==