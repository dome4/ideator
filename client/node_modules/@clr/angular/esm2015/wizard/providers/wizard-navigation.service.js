/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonHubService } from './button-hub.service';
import { PageCollectionService } from './page-collection.service';
/**
 * Performs navigation functions for a wizard and manages the current page. Presented as a
 * separate service to encapsulate the behavior of navigating and completing the wizard so
 * that it can be shared across the wizard and its sub-components.
 *
 * The easiest way to access the navigation service is there a reference on your wizard. The
 * Following example would allow you to access your instance of the wizard from your host
 * component and thereby access the navigation service via YourHostComponent.wizard.navService.
 *
 * @example
 * <clr-wizard #wizard ...>
 *
 * @example
 * export class YourHostComponent {
 *   @ViewChild("wizard") wizard: Wizard;
 *   ...
 * }
 *
 */
let WizardNavigationService = class WizardNavigationService {
    /**
     * Creates an instance of WizardNavigationService. Also sets up subscriptions
     * that listen to the button service to determine when a button has been clicked
     * in the wizard. Is also responsible for taking action when the page collection
     * requests that navigation be reset to its pristine state.
     *
     * @memberof WizardNavigationService
     */
    constructor(pageCollection, buttonService) {
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * @memberof WizardNavigationService
         */
        this._currentChanged = new Subject();
        /**
         * A Boolean flag used by the ClrWizardPage to avoid a race condition when pages are
         * loading and there is no current page defined.
         *
         * @memberof WizardNavigationService
         */
        this.navServiceLoaded = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.forceForward (clrWizardForceForwardNavigation) input. When true,
         * navigating backwards in the stepnav menu will reset any skipped pages' completed
         * state to false.
         *
         * This is useful when a wizard executes validation on a page-by-page basis when
         * the next button is clicked.
         *
         * @memberof WizardNavigationService
         */
        this.forceForwardNavigation = false;
        /**
         * @memberof WizardNavigationService
         */
        this._movedToNextPage = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._wizardFinished = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._movedToPreviousPage = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._cancelWizard = new Subject();
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopCancel (clrWizardPreventDefaultCancel) input. When true, the cancel
         * routine is subverted and must be reinstated in the host component calling Wizard.close()
         * at some point.
         *
         * @memberof WizardNavigationService
         */
        this.wizardHasAltCancel = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNext (clrWizardPreventDefaultNext) input. When true, the next and finish
         * routines are subverted and must be reinstated in the host component calling Wizard.next(),
         * Wizard.forceNext(), Wizard.finish(), or Wizard.forceFinish().
         *
         * @memberof WizardNavigationService
         */
        this.wizardHasAltNext = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNavigation (clrWizardPreventNavigation) input. When true, all
         * navigational elements in the wizard are disabled.
         *
         * This is intended to freeze the wizard in place. Events are not fired so this is
         * not a way to implement alternate functionality for navigation.
         *
         * @memberof WizardNavigationService
         */
        this.wizardStopNavigation = false;
        /**
         * A boolean flag shared with the stepnav items that prevents user clicks on
         * stepnav items from navigating the wizard.
         *
         * @memberof WizardNavigationService
         */
        this.wizardDisableStepnav = false;
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(() => {
            const currentPage = this.currentPage;
            if (this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('next');
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('danger');
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('finish');
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe((type) => {
            if (!this.wizardStopNavigation) {
                this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(() => {
            if (this.wizardStopNavigation) {
                return;
            }
            if (this.currentPage.preventDefault) {
                this.currentPage.pageOnCancel.emit(this.currentPage);
            }
            else {
                this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(() => {
            this.setFirstPageCurrent();
        });
    }
    /**
     *
     * @memberof WizardNavigationService
     */
    ngOnDestroy() {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    }
    /**
     * An Observable that is predominantly used amongst the subcomponents and services
     * of the wizard. It is recommended that users listen to the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output instead of this Observable.
     *
     * @memberof WizardNavigationService
     */
    get currentPageChanged() {
        // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
        // A BREAKING CHANGE SO AWAITING MINOR RELEASE
        return this._currentChanged.asObservable();
    }
    /**
     * @memberof WizardNavigationService
     */
    get currentPageTitle() {
        // when the querylist of pages is empty. this is the first place it fails...
        if (!this.currentPage) {
            return null;
        }
        return this.currentPage.title;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the first
     * page in the Wizard.
     *
     * This is helpful for determining whether a page is navigable.
     *
     * @memberof WizardNavigationService
     */
    get currentPageIsFirst() {
        return this.pageCollection.firstPage === this.currentPage;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the
     * last page in the Wizard.
     *
     * This is used to determine which buttons should display in the wizard footer.
     *
     * @memberof WizardNavigationService
     */
    get currentPageIsLast() {
        return this.pageCollection.lastPage === this.currentPage;
    }
    /**
     * Returns the ClrWizardPage object of the current page or null.
     *
     * @memberof WizardNavigationService
     */
    get currentPage() {
        if (!this._currentPage) {
            return null;
        }
        return this._currentPage;
    }
    /**
     * Accepts a ClrWizardPage object, since that object to be the current/active
     * page in the wizard, and emits the ClrWizardPage.onLoad (clrWizardPageOnLoad)
     * event for that page.
     *
     * Note that all of this work is bypassed if the ClrWizardPage object is already
     * the current page.
     *
     * @memberof WizardNavigationService
     */
    set currentPage(page) {
        if (this._currentPage !== page && !this.wizardStopNavigation) {
            this._currentPage = page;
            page.onLoad.emit(page.id);
            this._currentChanged.next(page);
        }
    }
    /**
     * An observable used internally to alert the wizard that forward navigation
     * has occurred. It is recommended that you use the Wizard.onMoveNext
     * (clrWizardOnNext) output instead of this one.
     *
     * @memberof WizardNavigationService
     */
    get movedToNextPage() {
        return this._movedToNextPage.asObservable();
    }
    /**
     * An observable used internally to alert the wizard that the nav service
     * has approved completion of the wizard.
     *
     * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
     * output instead of this one.
     *
     * @memberof WizardNavigationService
     */
    get wizardFinished() {
        return this._wizardFinished.asObservable();
    }
    /**
     * This is a public function that can be used to programmatically advance
     * the user to the next page.
     *
     * When invoked, this method will move the wizard to the next page after
     * successful validation. Note that this method goes through all checks
     * and event emissions as if Wizard.next(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.next(false).
     *
     * @memberof WizardNavigationService
     */
    next() {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage('finish');
            return;
        }
        this.checkAndCommitCurrentPage('next');
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    }
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * @memberof WizardNavigationService
     */
    forceNext() {
        const currentPage = this.currentPage;
        const nextPage = this.pageCollection.getNextPage(currentPage);
        // catch errant null or undefineds that creep in
        if (!nextPage) {
            throw new Error('The wizard has no next page to go to.');
        }
        if (this.wizardStopNavigation) {
            return;
        }
        if (!currentPage.completed) {
            // this is a state that alt next flows can get themselves in...
            this.pageCollection.commitPage(currentPage);
        }
        this.currentPage = nextPage;
    }
    /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     * @memberof WizardNavigationService
     */
    checkAndCommitCurrentPage(buttonType) {
        const currentPage = this.currentPage;
        let iAmTheLastPage;
        let isNext;
        let isDanger;
        let isDangerNext;
        let isDangerFinish;
        let isFinish;
        if (!currentPage.readyToComplete || this.wizardStopNavigation) {
            return;
        }
        iAmTheLastPage = this.currentPageIsLast;
        isNext = buttonType === 'next';
        isDanger = buttonType === 'danger';
        isDangerNext = isDanger && !iAmTheLastPage;
        isDangerFinish = isDanger && iAmTheLastPage;
        isFinish = buttonType === 'finish' || isDangerFinish;
        if (isFinish && !iAmTheLastPage) {
            return;
        }
        currentPage.primaryButtonClicked.emit(buttonType);
        if (isFinish) {
            currentPage.finishButtonClicked.emit(currentPage);
        }
        else if (isDanger) {
            currentPage.dangerButtonClicked.emit();
        }
        else if (isNext) {
            currentPage.nextButtonClicked.emit();
        }
        if (currentPage.stopNext || currentPage.preventDefault) {
            currentPage.onCommit.emit(currentPage.id);
            return;
        }
        // order is very important with these emitters!
        if (isFinish) {
            // mark page as complete
            if (!this.wizardHasAltNext) {
                this.pageCollection.commitPage(currentPage);
            }
            this._wizardFinished.next();
        }
        if (this.wizardHasAltNext) {
            this.pageCollection.commitPage(currentPage);
            if (isNext || isDangerNext) {
                this._movedToNextPage.next(true);
            }
            // jump out here, no matter what type we're looking at
            return;
        }
        if (isNext || isDangerNext) {
            this.forceNext();
        }
    }
    /**
     * This is a public function that can be used to programmatically conclude
     * the wizard.
     *
     * When invoked, this method will  initiate the work involved with finalizing
     * and finishing the wizard workflow. Note that this method goes through all
     * checks and event emissions as if Wizard.finish(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.finish(false).
     *
     * @memberof WizardNavigationService
     */
    finish() {
        this.checkAndCommitCurrentPage('finish');
    }
    /**
     * Notifies the wizard when backwards navigation has occurred via the
     * previous button.
     *
     * @memberof WizardNavigationService
     */
    get movedToPreviousPage() {
        return this._movedToPreviousPage.asObservable();
    }
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * @memberof WizardNavigationService
     */
    previous() {
        let previousPage;
        if (this.currentPageIsFirst || this.wizardStopNavigation) {
            return;
        }
        previousPage = this.pageCollection.getPreviousPage(this.currentPage);
        if (!previousPage) {
            return;
        }
        this._movedToPreviousPage.next(true);
        if (this.forceForwardNavigation) {
            this.currentPage.completed = false;
        }
        this.currentPage = previousPage;
    }
    /**
     * Notifies the wizard that a user is trying to cancel it.
     *
     * @memberof WizardNavigationService
     */
    get notifyWizardCancel() {
        return this._cancelWizard.asObservable();
    }
    /**
     * Allows a hook into the cancel workflow of the wizard from the nav service. Note that
     * this route goes through all checks and event emissions as if a cancel button had
     * been clicked.
     *
     * In most cases, users looking for a hook into the cancel routine are actually looking
     * for a way to close the wizard from their host component because they have prevented
     * the default cancel action.
     *
     * In this instance, it is recommended that you use Wizard.close() to avoid any event
     * emission loop resulting from an event handler calling back into routine that will
     * again evoke the events it handles.
     *
     * @memberof WizardNavigationService
     */
    cancel() {
        this._cancelWizard.next();
    }
    /**
     * Performs all required checks to determine if a user can navigate to a page. Checking at each
     * point if a page is navigable -- completed where the page immediately after the last completed
     * page.
     *
     * Takes two parameters. The first one must be either the ClrWizardPage object or the ID of the
     * ClrWizardPage object that you want to make the current page.
     *
     * The second parameter is optional and is a Boolean flag for "lazy completion". What this means
     * is the Wizard will mark all pages between the current page and the page you want to navigate
     * to as completed. This is useful for informational wizards that do not require user action,
     * allowing an easy means for users to jump ahead.
     *
     * To avoid checks on navigation, use ClrWizardPage.makeCurrent() instead.
     *
     * @memberof WizardNavigationService
     */
    goTo(pageToGoToOrId, lazyComplete = false) {
        let pageToGoTo;
        let currentPage;
        let myPages;
        let pagesToCheck;
        let okayToMove;
        let goingForward;
        let currentPageIndex;
        let goToPageIndex;
        myPages = this.pageCollection;
        pageToGoTo = typeof pageToGoToOrId === 'string' ? myPages.getPageById(pageToGoToOrId) : pageToGoToOrId;
        currentPage = this.currentPage;
        // no point in going to the current page. you're there already!
        // also hard block on any navigation when stopNavigation is true
        if (pageToGoTo === currentPage || this.wizardStopNavigation) {
            return;
        }
        currentPageIndex = myPages.getPageIndex(currentPage);
        goToPageIndex = myPages.getPageIndex(pageToGoTo);
        goingForward = goToPageIndex > currentPageIndex;
        pagesToCheck = myPages.getPageRangeFromPages(this.currentPage, pageToGoTo);
        okayToMove = lazyComplete || this.canGoTo(pagesToCheck);
        if (!okayToMove) {
            return;
        }
        if (goingForward && lazyComplete) {
            pagesToCheck.forEach((page) => {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach((page) => {
                page.completed = false;
            });
        }
        this.currentPage = pageToGoTo;
    }
    /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * @memberof WizardNavigationService
     */
    canGoTo(pagesToCheck) {
        let okayToMove = true;
        const myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        let previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach((page) => {
            let previousPage;
            if (!okayToMove) {
                return;
            }
            if (page.completed) {
                // default is true. just jump out instead of complicating it.
                return;
            }
            // so we know our page is not completed...
            previousPage = myPages.getPageIndex(page) > 0 ? myPages.getPreviousPage(page) : null;
            previousPagePasses = previousPage === null || previousPage.completed === true;
            // we are false if not the current page AND previous page is not completed
            // (but must have a previous page)
            if (!page.current && !previousPagePasses) {
                okayToMove = false;
            }
            // falls through to true as default
        });
        return okayToMove;
    }
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * @memberof WizardNavigationService
     */
    setLastEnabledPageCurrent() {
        const allPages = this.pageCollection.pagesAsArray;
        let lastCompletedPageIndex = null;
        allPages.forEach((page, index) => {
            if (page.completed) {
                lastCompletedPageIndex = index;
            }
        });
        if (lastCompletedPageIndex === null) {
            // always is at least the first item...
            lastCompletedPageIndex = 0;
        }
        else if (lastCompletedPageIndex + 1 < allPages.length) {
            lastCompletedPageIndex = lastCompletedPageIndex + 1;
        }
        this.currentPage = allPages[lastCompletedPageIndex];
    }
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * @memberof WizardNavigationService
     */
    setFirstPageCurrent() {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    }
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * @memberof WizardNavigationService
     */
    updateNavigation() {
        let toSetCurrent;
        let currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    }
};
WizardNavigationService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [PageCollectionService, ButtonHubService])
], WizardNavigationService);
export { WizardNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBd0RsQzs7Ozs7OztPQU9HO0lBQ0gsWUFBbUIsY0FBcUMsRUFBUyxhQUErQjtRQUE3RSxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUE2RGhHOzs7V0FHRztRQUNLLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFldkQ7Ozs7O1dBS0c7UUFDSSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFaEM7Ozs7Ozs7Ozs7V0FVRztRQUNJLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQXdFdEM7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBYWxEOztXQUVHO1FBQ0ssb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBNEpqRDs7V0FFRztRQUNLLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUEwQ3REOztXQUVHO1FBQ0ssa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBOEIzQzs7Ozs7OztXQU9HO1FBQ0ksdUJBQWtCLEdBQVksS0FBSyxDQUFD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QUNoQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxzQkFBc0IsS0FBSyxJQUFJLEVBQUU7WUFDbkMsdUNBQXVDO1lBQ3ZDLHNCQUFzQixHQUFHLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDdkQsc0JBQXNCLEdBQUcsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxnQkFBZ0I7UUFDckIsSUFBSSxZQUEyQixDQUFDO1FBQ2hDLElBQUksa0JBQTJCLENBQUM7UUFFaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTVDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BGLElBQUksa0JBQWtCLEVBQUU7WUFDdEIsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQztTQUNqQztJQUNILENBQUM7Q0FDRixDQUFBO0FBbHJCWSx1QkFBdUI7SUFEbkMsVUFBVSxFQUFFOzZDQWlFd0IscUJBQXFCLEVBQXdCLGdCQUFnQjtHQWhFckYsdUJBQXVCLENBa3JCbkM7U0FsckJZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENscldpemFyZFBhZ2UgfSBmcm9tICcuLi93aXphcmQtcGFnZSc7XG5cbmltcG9ydCB7IEJ1dHRvbkh1YlNlcnZpY2UgfSBmcm9tICcuL2J1dHRvbi1odWIuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcblxuLyoqXG4gKiBQZXJmb3JtcyBuYXZpZ2F0aW9uIGZ1bmN0aW9ucyBmb3IgYSB3aXphcmQgYW5kIG1hbmFnZXMgdGhlIGN1cnJlbnQgcGFnZS4gUHJlc2VudGVkIGFzIGFcbiAqIHNlcGFyYXRlIHNlcnZpY2UgdG8gZW5jYXBzdWxhdGUgdGhlIGJlaGF2aW9yIG9mIG5hdmlnYXRpbmcgYW5kIGNvbXBsZXRpbmcgdGhlIHdpemFyZCBzb1xuICogdGhhdCBpdCBjYW4gYmUgc2hhcmVkIGFjcm9zcyB0aGUgd2l6YXJkIGFuZCBpdHMgc3ViLWNvbXBvbmVudHMuXG4gKlxuICogVGhlIGVhc2llc3Qgd2F5IHRvIGFjY2VzcyB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIGlzIHRoZXJlIGEgcmVmZXJlbmNlIG9uIHlvdXIgd2l6YXJkLiBUaGVcbiAqIEZvbGxvd2luZyBleGFtcGxlIHdvdWxkIGFsbG93IHlvdSB0byBhY2Nlc3MgeW91ciBpbnN0YW5jZSBvZiB0aGUgd2l6YXJkIGZyb20geW91ciBob3N0XG4gKiBjb21wb25lbnQgYW5kIHRoZXJlYnkgYWNjZXNzIHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgdmlhIFlvdXJIb3N0Q29tcG9uZW50LndpemFyZC5uYXZTZXJ2aWNlLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8Y2xyLXdpemFyZCAjd2l6YXJkIC4uLj5cbiAqXG4gKiBAZXhhbXBsZVxuICogZXhwb3J0IGNsYXNzIFlvdXJIb3N0Q29tcG9uZW50IHtcbiAqICAgQFZpZXdDaGlsZChcIndpemFyZFwiKSB3aXphcmQ6IFdpemFyZDtcbiAqICAgLi4uXG4gKiB9XG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkIGluIHRoZSB3aXphcmQuIFBlcmZvcm1zIGNoZWNrc1xuICAgKiBiZWZvcmUgYWxlcnRpbmcgdGhlIGN1cnJlbnQgcGFnZSBvZiB0aGUgYnV0dG9uIGNsaWNrLiBFbmFjdHMgbmF2aWdhdGlvbiB0b1xuICAgKiB0aGUgcHJldmlvdXMgcGFnZSBpZiBub3Qgb3ZlcnJpZGRlbiBhdCB0aGUgcGFnZSBsZXZlbC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXNCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIE5leHQgYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgbmV4dEJ1dHRvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJcyBub3RpZmllZCB3aGVuIGEgZGFuZ2VyIGJ1dHRvbiBpcyBjbGlja2VkIGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGRhbmdlckJ1dHRvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJcyBub3RpZmllZCB3aGVuIGEgIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBmaW5pc2hCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIEN1c3RvbSBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjdXN0b21CdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIENhbmNlbCBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLiBOb3RpZmllcyB0aGUgd2l6YXJkLFxuICAgKiB3aGljaCBoYW5kbGVzIGFsbCBjYW5jZWwgZnVuY3Rpb25hbGl0eSwgaWYgY2FuY2VsIGlzIG5vdCBvdmVycmlkZGVuIGF0IHRoZSBwYWdlXG4gICAqIGxldmVsLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjYW5jZWxCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogUmVzZXRzIG5hdmlnYXRpb24gdG8gbWFrZSB0aGUgZmlyc3QgcGFnZSBjdXJyZW50IHdoZW4gdGhlIHBhZ2UgY29sbGVjdGlvbiBzZXJ2aWNlXG4gICAqIGVtaXRzIGFuIGV2ZW50IG5vdGlmeWluZyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB0aGF0IGl0IGhhcyByZXNldCBhbGwgcGFnZXNcbiAgICogdG8gdGhlaXIgcHJpc3RpbmUsIGluY29tcGxldGUgc3RhdGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHBhZ2VzUmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZS4gQWxzbyBzZXRzIHVwIHN1YnNjcmlwdGlvbnNcbiAgICogdGhhdCBsaXN0ZW4gdG8gdGhlIGJ1dHRvbiBzZXJ2aWNlIHRvIGRldGVybWluZSB3aGVuIGEgYnV0dG9uIGhhcyBiZWVuIGNsaWNrZWRcbiAgICogaW4gdGhlIHdpemFyZC4gSXMgYWxzbyByZXNwb25zaWJsZSBmb3IgdGFraW5nIGFjdGlvbiB3aGVuIHRoZSBwYWdlIGNvbGxlY3Rpb25cbiAgICogcmVxdWVzdHMgdGhhdCBuYXZpZ2F0aW9uIGJlIHJlc2V0IHRvIGl0cyBwcmlzdGluZSBzdGF0ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZUNvbGxlY3Rpb246IFBhZ2VDb2xsZWN0aW9uU2VydmljZSwgcHVibGljIGJ1dHRvblNlcnZpY2U6IEJ1dHRvbkh1YlNlcnZpY2UpIHtcbiAgICB0aGlzLnByZXZpb3VzQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLnByZXZpb3VzQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VJc0ZpcnN0IHx8IGN1cnJlbnRQYWdlLnByZXZpb3VzU3RlcERpc2FibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRQYWdlLnByZXZpb3VzQnV0dG9uQ2xpY2tlZC5lbWl0KGN1cnJlbnRQYWdlKTtcbiAgICAgIGlmICghY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5uZXh0QnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLm5leHRCdG5DbGlja2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ25leHQnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGFuZ2VyQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLmRhbmdlckJ0bkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBbmRDb21taXRDdXJyZW50UGFnZSgnZGFuZ2VyJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpbmlzaEJ1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5maW5pc2hCdG5DbGlja2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ2ZpbmlzaCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jdXN0b21CdXR0b25TdWJzY3JpcHRpb24gPSB0aGlzLmJ1dHRvblNlcnZpY2UuY3VzdG9tQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKHR5cGU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCF0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UuY3VzdG9tQnV0dG9uQ2xpY2tlZC5lbWl0KHR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW5jZWxCdXR0b25TdWJzY3JpcHRpb24gPSB0aGlzLmJ1dHRvblNlcnZpY2UuY2FuY2VsQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50UGFnZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLnBhZ2VPbkNhbmNlbC5lbWl0KHRoaXMuY3VycmVudFBhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucGFnZXNSZXNldFN1YnNjcmlwdGlvbiA9IHRoaXMucGFnZUNvbGxlY3Rpb24ucGFnZXNSZXNldC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRGaXJzdFBhZ2VDdXJyZW50KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZpb3VzQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5uZXh0QnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5kYW5nZXJCdXR0b25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmZpbmlzaEJ1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY3VzdG9tQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jYW5jZWxCdXR0b25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnBhZ2VzUmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRDaGFuZ2VkID0gbmV3IFN1YmplY3Q8Q2xyV2l6YXJkUGFnZT4oKTtcblxuICAvKipcbiAgICogQW4gT2JzZXJ2YWJsZSB0aGF0IGlzIHByZWRvbWluYW50bHkgdXNlZCBhbW9uZ3N0IHRoZSBzdWJjb21wb25lbnRzIGFuZCBzZXJ2aWNlc1xuICAgKiBvZiB0aGUgd2l6YXJkLiBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IHVzZXJzIGxpc3RlbiB0byB0aGUgQ2xyV2l6YXJkUGFnZS5vbkxvYWRcbiAgICogKGNscldpemFyZFBhZ2VPbkxvYWQpIG91dHB1dCBpbnN0ZWFkIG9mIHRoaXMgT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPENscldpemFyZFBhZ2U+IHtcbiAgICAvLyBUT0RPOiBNQUtFIFNVUkUgRVhURVJOQUwgT1VUUFVUUyBTQVkgJ0NIQU5HRScgTk9UICdDSEFOR0VEJ1xuICAgIC8vIEEgQlJFQUtJTkcgQ0hBTkdFIFNPIEFXQUlUSU5HIE1JTk9SIFJFTEVBU0VcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudENoYW5nZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBCb29sZWFuIGZsYWcgdXNlZCBieSB0aGUgQ2xyV2l6YXJkUGFnZSB0byBhdm9pZCBhIHJhY2UgY29uZGl0aW9uIHdoZW4gcGFnZXMgYXJlXG4gICAqIGxvYWRpbmcgYW5kIHRoZXJlIGlzIG5vIGN1cnJlbnQgcGFnZSBkZWZpbmVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBuYXZTZXJ2aWNlTG9hZGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCBhY3Jvc3MgdGhlIFdpemFyZCBzdWJjb21wb25lbnRzIHRoYXQgZm9sbG93cyB0aGUgdmFsdWVcbiAgICogb2YgdGhlIFdpemFyZC5mb3JjZUZvcndhcmQgKGNscldpemFyZEZvcmNlRm9yd2FyZE5hdmlnYXRpb24pIGlucHV0LiBXaGVuIHRydWUsXG4gICAqIG5hdmlnYXRpbmcgYmFja3dhcmRzIGluIHRoZSBzdGVwbmF2IG1lbnUgd2lsbCByZXNldCBhbnkgc2tpcHBlZCBwYWdlcycgY29tcGxldGVkXG4gICAqIHN0YXRlIHRvIGZhbHNlLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgd2l6YXJkIGV4ZWN1dGVzIHZhbGlkYXRpb24gb24gYSBwYWdlLWJ5LXBhZ2UgYmFzaXMgd2hlblxuICAgKiB0aGUgbmV4dCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZm9yY2VGb3J3YXJkTmF2aWdhdGlvbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2VUaXRsZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAvLyB3aGVuIHRoZSBxdWVyeWxpc3Qgb2YgcGFnZXMgaXMgZW1wdHkuIHRoaXMgaXMgdGhlIGZpcnN0IHBsYWNlIGl0IGZhaWxzLi4uXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQYWdlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2UudGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIEJvb2xlYW4gdGhhdCB0ZWxscyB5b3Ugd2hldGhlciBvciBub3QgdGhlIGN1cnJlbnQgcGFnZSBpcyB0aGUgZmlyc3RcbiAgICogcGFnZSBpbiB0aGUgV2l6YXJkLlxuICAgKlxuICAgKiBUaGlzIGlzIGhlbHBmdWwgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgYSBwYWdlIGlzIG5hdmlnYWJsZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlSXNGaXJzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5maXJzdFBhZ2UgPT09IHRoaXMuY3VycmVudFBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIEJvb2xlYW4gdGhhdCB0ZWxscyB5b3Ugd2hldGhlciBvciBub3QgdGhlIGN1cnJlbnQgcGFnZSBpcyB0aGVcbiAgICogbGFzdCBwYWdlIGluIHRoZSBXaXphcmQuXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hpY2ggYnV0dG9ucyBzaG91bGQgZGlzcGxheSBpbiB0aGUgd2l6YXJkIGZvb3Rlci5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlSXNMYXN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VDb2xsZWN0aW9uLmxhc3RQYWdlID09PSB0aGlzLmN1cnJlbnRQYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIENscldpemFyZFBhZ2Ugb2JqZWN0IG9mIHRoZSBjdXJyZW50IHBhZ2Ugb3IgbnVsbC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VycmVudFBhZ2UoKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgaWYgKCF0aGlzLl9jdXJyZW50UGFnZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgQ2xyV2l6YXJkUGFnZSBvYmplY3QsIHNpbmNlIHRoYXQgb2JqZWN0IHRvIGJlIHRoZSBjdXJyZW50L2FjdGl2ZVxuICAgKiBwYWdlIGluIHRoZSB3aXphcmQsIGFuZCBlbWl0cyB0aGUgQ2xyV2l6YXJkUGFnZS5vbkxvYWQgKGNscldpemFyZFBhZ2VPbkxvYWQpXG4gICAqIGV2ZW50IGZvciB0aGF0IHBhZ2UuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBhbGwgb2YgdGhpcyB3b3JrIGlzIGJ5cGFzc2VkIGlmIHRoZSBDbHJXaXphcmRQYWdlIG9iamVjdCBpcyBhbHJlYWR5XG4gICAqIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgc2V0IGN1cnJlbnRQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgIT09IHBhZ2UgJiYgIXRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gcGFnZTtcbiAgICAgIHBhZ2Uub25Mb2FkLmVtaXQocGFnZS5pZCk7XG4gICAgICB0aGlzLl9jdXJyZW50Q2hhbmdlZC5uZXh0KHBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX21vdmVkVG9OZXh0UGFnZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdXNlZCBpbnRlcm5hbGx5IHRvIGFsZXJ0IHRoZSB3aXphcmQgdGhhdCBmb3J3YXJkIG5hdmlnYXRpb25cbiAgICogaGFzIG9jY3VycmVkLiBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSB1c2UgdGhlIFdpemFyZC5vbk1vdmVOZXh0XG4gICAqIChjbHJXaXphcmRPbk5leHQpIG91dHB1dCBpbnN0ZWFkIG9mIHRoaXMgb25lLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbW92ZWRUb05leHRQYWdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9tb3ZlZFRvTmV4dFBhZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF93aXphcmRGaW5pc2hlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdXNlZCBpbnRlcm5hbGx5IHRvIGFsZXJ0IHRoZSB3aXphcmQgdGhhdCB0aGUgbmF2IHNlcnZpY2VcbiAgICogaGFzIGFwcHJvdmVkIGNvbXBsZXRpb24gb2YgdGhlIHdpemFyZC5cbiAgICpcbiAgICogSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIHRoZSBXaXphcmQud2l6YXJkRmluaXNoZWQgKGNscldpemFyZE9uRmluaXNoKVxuICAgKiBvdXRwdXQgaW5zdGVhZCBvZiB0aGlzIG9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdpemFyZEZpbmlzaGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl93aXphcmRGaW5pc2hlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgcHVibGljIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvZ3JhbW1hdGljYWxseSBhZHZhbmNlXG4gICAqIHRoZSB1c2VyIHRvIHRoZSBuZXh0IHBhZ2UuXG4gICAqXG4gICAqIFdoZW4gaW52b2tlZCwgdGhpcyBtZXRob2Qgd2lsbCBtb3ZlIHRoZSB3aXphcmQgdG8gdGhlIG5leHQgcGFnZSBhZnRlclxuICAgKiBzdWNjZXNzZnVsIHZhbGlkYXRpb24uIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBnb2VzIHRocm91Z2ggYWxsIGNoZWNrc1xuICAgKiBhbmQgZXZlbnQgZW1pc3Npb25zIGFzIGlmIFdpemFyZC5uZXh0KGZhbHNlKSBoYWQgYmVlbiBjYWxsZWQuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIGl0IG1ha2VzIG1vcmUgc2Vuc2UgdG8gdXNlIFdpemFyZC5uZXh0KGZhbHNlKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZUlzTGFzdCkge1xuICAgICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCdmaW5pc2gnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ25leHQnKTtcblxuICAgIGlmICghdGhpcy53aXphcmRIYXNBbHROZXh0ICYmICF0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLl9tb3ZlZFRvTmV4dFBhZ2UubmV4dCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQnlwYXNzZXMgY2hlY2tzIGFuZCBtb3N0IGV2ZW50IGVtaXNzaW9ucyB0byBmb3JjZSBhIHBhZ2UgdG8gbmF2aWdhdGUgZm9yd2FyZC5cbiAgICpcbiAgICogQ29tcGFyYWJsZSB0byBjYWxsaW5nIFdpemFyZC5uZXh0KCkgb3IgV2l6YXJkLmZvcmNlTmV4dCgpLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBmb3JjZU5leHQoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFBhZ2U6IENscldpemFyZFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgIGNvbnN0IG5leHRQYWdlOiBDbHJXaXphcmRQYWdlID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXROZXh0UGFnZShjdXJyZW50UGFnZSk7XG5cbiAgICAvLyBjYXRjaCBlcnJhbnQgbnVsbCBvciB1bmRlZmluZWRzIHRoYXQgY3JlZXAgaW5cbiAgICBpZiAoIW5leHRQYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB3aXphcmQgaGFzIG5vIG5leHQgcGFnZSB0byBnbyB0by4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY3VycmVudFBhZ2UuY29tcGxldGVkKSB7XG4gICAgICAvLyB0aGlzIGlzIGEgc3RhdGUgdGhhdCBhbHQgbmV4dCBmbG93cyBjYW4gZ2V0IHRoZW1zZWx2ZXMgaW4uLi5cbiAgICAgIHRoaXMucGFnZUNvbGxlY3Rpb24uY29tbWl0UGFnZShjdXJyZW50UGFnZSk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXh0UGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgYnV0dG9uL2FjdGlvbiB0eXBlIGFzIGEgcGFyYW1ldGVyLiBFbmNhcHN1bGF0ZXMgYWxsIGxvZ2ljIGZvclxuICAgKiBldmVudCBlbWlzc2lvbnMsIHN0YXRlIG9mIHRoZSBjdXJyZW50IHBhZ2UsIGFuZCB3aXphcmQgYW5kIHBhZ2UgbGV2ZWwgb3ZlcnJpZGVzLlxuICAgKlxuICAgKiBBdm9pZCBjYWxsaW5nIHRoaXMgZnVuY3Rpb24gZGlyZWN0bHkgdW5sZXNzIHlvdSByZWFsbHkga25vdyB3aGF0IHlvdSdyZSBkb2luZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY2hlY2tBbmRDb21taXRDdXJyZW50UGFnZShidXR0b25UeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UGFnZTogQ2xyV2l6YXJkUGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XG4gICAgbGV0IGlBbVRoZUxhc3RQYWdlOiBib29sZWFuO1xuXG4gICAgbGV0IGlzTmV4dDogYm9vbGVhbjtcbiAgICBsZXQgaXNEYW5nZXI6IGJvb2xlYW47XG4gICAgbGV0IGlzRGFuZ2VyTmV4dDogYm9vbGVhbjtcbiAgICBsZXQgaXNEYW5nZXJGaW5pc2g6IGJvb2xlYW47XG4gICAgbGV0IGlzRmluaXNoOiBib29sZWFuO1xuXG4gICAgaWYgKCFjdXJyZW50UGFnZS5yZWFkeVRvQ29tcGxldGUgfHwgdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlBbVRoZUxhc3RQYWdlID0gdGhpcy5jdXJyZW50UGFnZUlzTGFzdDtcblxuICAgIGlzTmV4dCA9IGJ1dHRvblR5cGUgPT09ICduZXh0JztcbiAgICBpc0RhbmdlciA9IGJ1dHRvblR5cGUgPT09ICdkYW5nZXInO1xuICAgIGlzRGFuZ2VyTmV4dCA9IGlzRGFuZ2VyICYmICFpQW1UaGVMYXN0UGFnZTtcbiAgICBpc0RhbmdlckZpbmlzaCA9IGlzRGFuZ2VyICYmIGlBbVRoZUxhc3RQYWdlO1xuICAgIGlzRmluaXNoID0gYnV0dG9uVHlwZSA9PT0gJ2ZpbmlzaCcgfHwgaXNEYW5nZXJGaW5pc2g7XG5cbiAgICBpZiAoaXNGaW5pc2ggJiYgIWlBbVRoZUxhc3RQYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UucHJpbWFyeUJ1dHRvbkNsaWNrZWQuZW1pdChidXR0b25UeXBlKTtcblxuICAgIGlmIChpc0ZpbmlzaCkge1xuICAgICAgY3VycmVudFBhZ2UuZmluaXNoQnV0dG9uQ2xpY2tlZC5lbWl0KGN1cnJlbnRQYWdlKTtcbiAgICB9IGVsc2UgaWYgKGlzRGFuZ2VyKSB7XG4gICAgICBjdXJyZW50UGFnZS5kYW5nZXJCdXR0b25DbGlja2VkLmVtaXQoKTtcbiAgICB9IGVsc2UgaWYgKGlzTmV4dCkge1xuICAgICAgY3VycmVudFBhZ2UubmV4dEJ1dHRvbkNsaWNrZWQuZW1pdCgpO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50UGFnZS5zdG9wTmV4dCB8fCBjdXJyZW50UGFnZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgY3VycmVudFBhZ2Uub25Db21taXQuZW1pdChjdXJyZW50UGFnZS5pZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gb3JkZXIgaXMgdmVyeSBpbXBvcnRhbnQgd2l0aCB0aGVzZSBlbWl0dGVycyFcbiAgICBpZiAoaXNGaW5pc2gpIHtcbiAgICAgIC8vIG1hcmsgcGFnZSBhcyBjb21wbGV0ZVxuICAgICAgaWYgKCF0aGlzLndpemFyZEhhc0FsdE5leHQpIHtcbiAgICAgICAgdGhpcy5wYWdlQ29sbGVjdGlvbi5jb21taXRQYWdlKGN1cnJlbnRQYWdlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3dpemFyZEZpbmlzaGVkLm5leHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy53aXphcmRIYXNBbHROZXh0KSB7XG4gICAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLmNvbW1pdFBhZ2UoY3VycmVudFBhZ2UpO1xuXG4gICAgICBpZiAoaXNOZXh0IHx8IGlzRGFuZ2VyTmV4dCkge1xuICAgICAgICB0aGlzLl9tb3ZlZFRvTmV4dFBhZ2UubmV4dCh0cnVlKTtcbiAgICAgIH1cbiAgICAgIC8vIGp1bXAgb3V0IGhlcmUsIG5vIG1hdHRlciB3aGF0IHR5cGUgd2UncmUgbG9va2luZyBhdFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc05leHQgfHwgaXNEYW5nZXJOZXh0KSB7XG4gICAgICB0aGlzLmZvcmNlTmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgcHVibGljIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvZ3JhbW1hdGljYWxseSBjb25jbHVkZVxuICAgKiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBXaGVuIGludm9rZWQsIHRoaXMgbWV0aG9kIHdpbGwgIGluaXRpYXRlIHRoZSB3b3JrIGludm9sdmVkIHdpdGggZmluYWxpemluZ1xuICAgKiBhbmQgZmluaXNoaW5nIHRoZSB3aXphcmQgd29ya2Zsb3cuIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBnb2VzIHRocm91Z2ggYWxsXG4gICAqIGNoZWNrcyBhbmQgZXZlbnQgZW1pc3Npb25zIGFzIGlmIFdpemFyZC5maW5pc2goZmFsc2UpIGhhZCBiZWVuIGNhbGxlZC5cbiAgICpcbiAgICogSW4gbW9zdCBjYXNlcywgaXQgbWFrZXMgbW9yZSBzZW5zZSB0byB1c2UgV2l6YXJkLmZpbmlzaChmYWxzZSkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGZpbmlzaCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ2ZpbmlzaCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfbW92ZWRUb1ByZXZpb3VzUGFnZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoZSB3aXphcmQgd2hlbiBiYWNrd2FyZHMgbmF2aWdhdGlvbiBoYXMgb2NjdXJyZWQgdmlhIHRoZVxuICAgKiBwcmV2aW91cyBidXR0b24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBtb3ZlZFRvUHJldmlvdXNQYWdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9tb3ZlZFRvUHJldmlvdXNQYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2dyYW1tYXRpY2FsbHkgbW92ZXMgdGhlIHdpemFyZCB0byB0aGUgcGFnZSBiZWZvcmUgdGhlIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogSW4gbW9zdCBpbnN0YW5jZXMsIGl0IG1ha2VzIG1vcmUgc2Vuc2UgdG8gY2FsbCBXaXphcmQucHJldmlvdXMoKVxuICAgKiB3aGljaCBkb2VzIHRoZSBzYW1lIHRoaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICBsZXQgcHJldmlvdXNQYWdlOiBDbHJXaXphcmRQYWdlO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2VJc0ZpcnN0IHx8IHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSh0aGlzLmN1cnJlbnRQYWdlKTtcblxuICAgIGlmICghcHJldmlvdXNQYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbW92ZWRUb1ByZXZpb3VzUGFnZS5uZXh0KHRydWUpO1xuXG4gICAgaWYgKHRoaXMuZm9yY2VGb3J3YXJkTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gcHJldmlvdXNQYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY2FuY2VsV2l6YXJkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB0aGUgd2l6YXJkIHRoYXQgYSB1c2VyIGlzIHRyeWluZyB0byBjYW5jZWwgaXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBub3RpZnlXaXphcmRDYW5jZWwoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FuY2VsV2l6YXJkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBhIGhvb2sgaW50byB0aGUgY2FuY2VsIHdvcmtmbG93IG9mIHRoZSB3aXphcmQgZnJvbSB0aGUgbmF2IHNlcnZpY2UuIE5vdGUgdGhhdFxuICAgKiB0aGlzIHJvdXRlIGdvZXMgdGhyb3VnaCBhbGwgY2hlY2tzIGFuZCBldmVudCBlbWlzc2lvbnMgYXMgaWYgYSBjYW5jZWwgYnV0dG9uIGhhZFxuICAgKiBiZWVuIGNsaWNrZWQuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIHVzZXJzIGxvb2tpbmcgZm9yIGEgaG9vayBpbnRvIHRoZSBjYW5jZWwgcm91dGluZSBhcmUgYWN0dWFsbHkgbG9va2luZ1xuICAgKiBmb3IgYSB3YXkgdG8gY2xvc2UgdGhlIHdpemFyZCBmcm9tIHRoZWlyIGhvc3QgY29tcG9uZW50IGJlY2F1c2UgdGhleSBoYXZlIHByZXZlbnRlZFxuICAgKiB0aGUgZGVmYXVsdCBjYW5jZWwgYWN0aW9uLlxuICAgKlxuICAgKiBJbiB0aGlzIGluc3RhbmNlLCBpdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSB1c2UgV2l6YXJkLmNsb3NlKCkgdG8gYXZvaWQgYW55IGV2ZW50XG4gICAqIGVtaXNzaW9uIGxvb3AgcmVzdWx0aW5nIGZyb20gYW4gZXZlbnQgaGFuZGxlciBjYWxsaW5nIGJhY2sgaW50byByb3V0aW5lIHRoYXQgd2lsbFxuICAgKiBhZ2FpbiBldm9rZSB0aGUgZXZlbnRzIGl0IGhhbmRsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jYW5jZWxXaXphcmQubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCBhY3Jvc3MgdGhlIFdpemFyZCBzdWJjb21wb25lbnRzIHRoYXQgZm9sbG93cyB0aGUgdmFsdWVcbiAgICogb2YgdGhlIFdpemFyZC5zdG9wQ2FuY2VsIChjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbCkgaW5wdXQuIFdoZW4gdHJ1ZSwgdGhlIGNhbmNlbFxuICAgKiByb3V0aW5lIGlzIHN1YnZlcnRlZCBhbmQgbXVzdCBiZSByZWluc3RhdGVkIGluIHRoZSBob3N0IGNvbXBvbmVudCBjYWxsaW5nIFdpemFyZC5jbG9zZSgpXG4gICAqIGF0IHNvbWUgcG9pbnQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHdpemFyZEhhc0FsdENhbmNlbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gZmxhZyBzaGFyZWQgYWNyb3NzIHRoZSBXaXphcmQgc3ViY29tcG9uZW50cyB0aGF0IGZvbGxvd3MgdGhlIHZhbHVlXG4gICAqIG9mIHRoZSBXaXphcmQuc3RvcE5leHQgKGNscldpemFyZFByZXZlbnREZWZhdWx0TmV4dCkgaW5wdXQuIFdoZW4gdHJ1ZSwgdGhlIG5leHQgYW5kIGZpbmlzaFxuICAgKiByb3V0aW5lcyBhcmUgc3VidmVydGVkIGFuZCBtdXN0IGJlIHJlaW5zdGF0ZWQgaW4gdGhlIGhvc3QgY29tcG9uZW50IGNhbGxpbmcgV2l6YXJkLm5leHQoKSxcbiAgICogV2l6YXJkLmZvcmNlTmV4dCgpLCBXaXphcmQuZmluaXNoKCksIG9yIFdpemFyZC5mb3JjZUZpbmlzaCgpLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB3aXphcmRIYXNBbHROZXh0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCBhY3Jvc3MgdGhlIFdpemFyZCBzdWJjb21wb25lbnRzIHRoYXQgZm9sbG93cyB0aGUgdmFsdWVcbiAgICogb2YgdGhlIFdpemFyZC5zdG9wTmF2aWdhdGlvbiAoY2xyV2l6YXJkUHJldmVudE5hdmlnYXRpb24pIGlucHV0LiBXaGVuIHRydWUsIGFsbFxuICAgKiBuYXZpZ2F0aW9uYWwgZWxlbWVudHMgaW4gdGhlIHdpemFyZCBhcmUgZGlzYWJsZWQuXG4gICAqXG4gICAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gZnJlZXplIHRoZSB3aXphcmQgaW4gcGxhY2UuIEV2ZW50cyBhcmUgbm90IGZpcmVkIHNvIHRoaXMgaXNcbiAgICogbm90IGEgd2F5IHRvIGltcGxlbWVudCBhbHRlcm5hdGUgZnVuY3Rpb25hbGl0eSBmb3IgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgd2l6YXJkU3RvcE5hdmlnYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBib29sZWFuIGZsYWcgc2hhcmVkIHdpdGggdGhlIHN0ZXBuYXYgaXRlbXMgdGhhdCBwcmV2ZW50cyB1c2VyIGNsaWNrcyBvblxuICAgKiBzdGVwbmF2IGl0ZW1zIGZyb20gbmF2aWdhdGluZyB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB3aXphcmREaXNhYmxlU3RlcG5hdjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbGwgcmVxdWlyZWQgY2hlY2tzIHRvIGRldGVybWluZSBpZiBhIHVzZXIgY2FuIG5hdmlnYXRlIHRvIGEgcGFnZS4gQ2hlY2tpbmcgYXQgZWFjaFxuICAgKiBwb2ludCBpZiBhIHBhZ2UgaXMgbmF2aWdhYmxlIC0tIGNvbXBsZXRlZCB3aGVyZSB0aGUgcGFnZSBpbW1lZGlhdGVseSBhZnRlciB0aGUgbGFzdCBjb21wbGV0ZWRcbiAgICogcGFnZS5cbiAgICpcbiAgICogVGFrZXMgdHdvIHBhcmFtZXRlcnMuIFRoZSBmaXJzdCBvbmUgbXVzdCBiZSBlaXRoZXIgdGhlIENscldpemFyZFBhZ2Ugb2JqZWN0IG9yIHRoZSBJRCBvZiB0aGVcbiAgICogQ2xyV2l6YXJkUGFnZSBvYmplY3QgdGhhdCB5b3Ugd2FudCB0byBtYWtlIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgcGFyYW1ldGVyIGlzIG9wdGlvbmFsIGFuZCBpcyBhIEJvb2xlYW4gZmxhZyBmb3IgXCJsYXp5IGNvbXBsZXRpb25cIi4gV2hhdCB0aGlzIG1lYW5zXG4gICAqIGlzIHRoZSBXaXphcmQgd2lsbCBtYXJrIGFsbCBwYWdlcyBiZXR3ZWVuIHRoZSBjdXJyZW50IHBhZ2UgYW5kIHRoZSBwYWdlIHlvdSB3YW50IHRvIG5hdmlnYXRlXG4gICAqIHRvIGFzIGNvbXBsZXRlZC4gVGhpcyBpcyB1c2VmdWwgZm9yIGluZm9ybWF0aW9uYWwgd2l6YXJkcyB0aGF0IGRvIG5vdCByZXF1aXJlIHVzZXIgYWN0aW9uLFxuICAgKiBhbGxvd2luZyBhbiBlYXN5IG1lYW5zIGZvciB1c2VycyB0byBqdW1wIGFoZWFkLlxuICAgKlxuICAgKiBUbyBhdm9pZCBjaGVja3Mgb24gbmF2aWdhdGlvbiwgdXNlIENscldpemFyZFBhZ2UubWFrZUN1cnJlbnQoKSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnb1RvKHBhZ2VUb0dvVG9PcklkOiBhbnksIGxhenlDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgbGV0IHBhZ2VUb0dvVG86IENscldpemFyZFBhZ2U7XG4gICAgbGV0IGN1cnJlbnRQYWdlOiBDbHJXaXphcmRQYWdlO1xuICAgIGxldCBteVBhZ2VzOiBQYWdlQ29sbGVjdGlvblNlcnZpY2U7XG4gICAgbGV0IHBhZ2VzVG9DaGVjazogQ2xyV2l6YXJkUGFnZVtdO1xuICAgIGxldCBva2F5VG9Nb3ZlOiBib29sZWFuO1xuICAgIGxldCBnb2luZ0ZvcndhcmQ6IGJvb2xlYW47XG4gICAgbGV0IGN1cnJlbnRQYWdlSW5kZXg6IG51bWJlcjtcbiAgICBsZXQgZ29Ub1BhZ2VJbmRleDogbnVtYmVyO1xuXG4gICAgbXlQYWdlcyA9IHRoaXMucGFnZUNvbGxlY3Rpb247XG4gICAgcGFnZVRvR29UbyA9IHR5cGVvZiBwYWdlVG9Hb1RvT3JJZCA9PT0gJ3N0cmluZycgPyBteVBhZ2VzLmdldFBhZ2VCeUlkKHBhZ2VUb0dvVG9PcklkKSA6IHBhZ2VUb0dvVG9PcklkO1xuICAgIGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcblxuICAgIC8vIG5vIHBvaW50IGluIGdvaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UuIHlvdSdyZSB0aGVyZSBhbHJlYWR5IVxuICAgIC8vIGFsc28gaGFyZCBibG9jayBvbiBhbnkgbmF2aWdhdGlvbiB3aGVuIHN0b3BOYXZpZ2F0aW9uIGlzIHRydWVcbiAgICBpZiAocGFnZVRvR29UbyA9PT0gY3VycmVudFBhZ2UgfHwgdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlSW5kZXggPSBteVBhZ2VzLmdldFBhZ2VJbmRleChjdXJyZW50UGFnZSk7XG4gICAgZ29Ub1BhZ2VJbmRleCA9IG15UGFnZXMuZ2V0UGFnZUluZGV4KHBhZ2VUb0dvVG8pO1xuICAgIGdvaW5nRm9yd2FyZCA9IGdvVG9QYWdlSW5kZXggPiBjdXJyZW50UGFnZUluZGV4O1xuICAgIHBhZ2VzVG9DaGVjayA9IG15UGFnZXMuZ2V0UGFnZVJhbmdlRnJvbVBhZ2VzKHRoaXMuY3VycmVudFBhZ2UsIHBhZ2VUb0dvVG8pO1xuXG4gICAgb2theVRvTW92ZSA9IGxhenlDb21wbGV0ZSB8fCB0aGlzLmNhbkdvVG8ocGFnZXNUb0NoZWNrKTtcblxuICAgIGlmICghb2theVRvTW92ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChnb2luZ0ZvcndhcmQgJiYgbGF6eUNvbXBsZXRlKSB7XG4gICAgICBwYWdlc1RvQ2hlY2suZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgICBpZiAocGFnZSAhPT0gcGFnZVRvR29Ubykge1xuICAgICAgICAgIHBhZ2UuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghZ29pbmdGb3J3YXJkICYmIHRoaXMuZm9yY2VGb3J3YXJkTmF2aWdhdGlvbikge1xuICAgICAgcGFnZXNUb0NoZWNrLmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IHtcbiAgICAgICAgcGFnZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlVG9Hb1RvO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgYSByYW5nZSBvZiBDbHJXaXphcmRQYWdlIG9iamVjdHMgYXMgYSBwYXJhbWV0ZXIuIFBlcmZvcm1zIHRoZSB3b3JrIG9mIGNoZWNraW5nXG4gICAqIHRob3NlIG9iamVjdHMgdG8gZGV0ZXJtaW5lIGlmIG5hdmlnYXRpb24gY2FuIGJlIGFjY29tcGxpc2hlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY2FuR29UbyhwYWdlc1RvQ2hlY2s6IENscldpemFyZFBhZ2VbXSk6IGJvb2xlYW4ge1xuICAgIGxldCBva2F5VG9Nb3ZlID0gdHJ1ZTtcbiAgICBjb25zdCBteVBhZ2VzID0gdGhpcy5wYWdlQ29sbGVjdGlvbjtcblxuICAgIC8vIHByZXZpb3VzIHBhZ2UgY2FuIGJlIGltcG9ydGFudCB3aGVuIG1vdmluZyBiZWNhdXNlIGlmIGl0J3MgY29tcGxldGVkIGl0XG4gICAgLy8gYWxsb3dzIHVzIHRvIG1vdmUgdG8gdGhlIHBhZ2UgZXZlbiBpZiBpdCdzIGluY29tcGxldGUuLi5cbiAgICBsZXQgcHJldmlvdXNQYWdlUGFzc2VzOiBib29sZWFuO1xuXG4gICAgaWYgKCFwYWdlc1RvQ2hlY2sgfHwgcGFnZXNUb0NoZWNrLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwYWdlc1RvQ2hlY2suZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgbGV0IHByZXZpb3VzUGFnZTogQ2xyV2l6YXJkUGFnZTtcblxuICAgICAgaWYgKCFva2F5VG9Nb3ZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhZ2UuY29tcGxldGVkKSB7XG4gICAgICAgIC8vIGRlZmF1bHQgaXMgdHJ1ZS4ganVzdCBqdW1wIG91dCBpbnN0ZWFkIG9mIGNvbXBsaWNhdGluZyBpdC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzbyB3ZSBrbm93IG91ciBwYWdlIGlzIG5vdCBjb21wbGV0ZWQuLi5cbiAgICAgIHByZXZpb3VzUGFnZSA9IG15UGFnZXMuZ2V0UGFnZUluZGV4KHBhZ2UpID4gMCA/IG15UGFnZXMuZ2V0UHJldmlvdXNQYWdlKHBhZ2UpIDogbnVsbDtcbiAgICAgIHByZXZpb3VzUGFnZVBhc3NlcyA9IHByZXZpb3VzUGFnZSA9PT0gbnVsbCB8fCBwcmV2aW91c1BhZ2UuY29tcGxldGVkID09PSB0cnVlO1xuXG4gICAgICAvLyB3ZSBhcmUgZmFsc2UgaWYgbm90IHRoZSBjdXJyZW50IHBhZ2UgQU5EIHByZXZpb3VzIHBhZ2UgaXMgbm90IGNvbXBsZXRlZFxuICAgICAgLy8gKGJ1dCBtdXN0IGhhdmUgYSBwcmV2aW91cyBwYWdlKVxuICAgICAgaWYgKCFwYWdlLmN1cnJlbnQgJiYgIXByZXZpb3VzUGFnZVBhc3Nlcykge1xuICAgICAgICBva2F5VG9Nb3ZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBmYWxscyB0aHJvdWdoIHRvIHRydWUgYXMgZGVmYXVsdFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9rYXlUb01vdmU7XG4gIH1cblxuICAvKipcbiAgICogTG9va3MgdGhyb3VnaCB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcyB0byBmaW5kIHRoZSBmaXJzdCBvbmUgdGhhdCBpcyBpbmNvbXBsZXRlXG4gICAqIGFuZCBtYWtlcyB0aGF0IHBhZ2UgdGhlIGN1cnJlbnQvYWN0aXZlIHBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHNldExhc3RFbmFibGVkUGFnZUN1cnJlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgYWxsUGFnZXM6IENscldpemFyZFBhZ2VbXSA9IHRoaXMucGFnZUNvbGxlY3Rpb24ucGFnZXNBc0FycmF5O1xuICAgIGxldCBsYXN0Q29tcGxldGVkUGFnZUluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gICAgYWxsUGFnZXMuZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHBhZ2UuY29tcGxldGVkKSB7XG4gICAgICAgIGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChsYXN0Q29tcGxldGVkUGFnZUluZGV4ID09PSBudWxsKSB7XG4gICAgICAvLyBhbHdheXMgaXMgYXQgbGVhc3QgdGhlIGZpcnN0IGl0ZW0uLi5cbiAgICAgIGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggPSAwO1xuICAgIH0gZWxzZSBpZiAobGFzdENvbXBsZXRlZFBhZ2VJbmRleCArIDEgPCBhbGxQYWdlcy5sZW5ndGgpIHtcbiAgICAgIGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggPSBsYXN0Q29tcGxldGVkUGFnZUluZGV4ICsgMTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gYWxsUGFnZXNbbGFzdENvbXBsZXRlZFBhZ2VJbmRleF07XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMgYW5kIG1ha2VzIHRoYXQgcGFnZSB0aGVcbiAgICogY3VycmVudC9hY3RpdmUgcGFnZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgc2V0Rmlyc3RQYWdlQ3VycmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5wYWdlc0FzQXJyYXlbMF07XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc3RlcG5hdiBvbiB0aGUgbGVmdCBzaWRlIG9mIHRoZSB3aXphcmQgd2hlbiBwYWdlcyBhcmUgZHluYW1pY2FsbHlcbiAgICogYWRkZWQgb3IgcmVtb3ZlZCBmcm9tIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVOYXZpZ2F0aW9uKCk6IHZvaWQge1xuICAgIGxldCB0b1NldEN1cnJlbnQ6IENscldpemFyZFBhZ2U7XG4gICAgbGV0IGN1cnJlbnRQYWdlUmVtb3ZlZDogYm9vbGVhbjtcblxuICAgIHRoaXMucGFnZUNvbGxlY3Rpb24udXBkYXRlQ29tcGxldGVkU3RhdGVzKCk7XG5cbiAgICBjdXJyZW50UGFnZVJlbW92ZWQgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzQXNBcnJheS5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpIDwgMDtcbiAgICBpZiAoY3VycmVudFBhZ2VSZW1vdmVkKSB7XG4gICAgICB0b1NldEN1cnJlbnQgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLmZpbmRGaXJzdEluY29tcGxldGVQYWdlKCk7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdG9TZXRDdXJyZW50O1xuICAgIH1cbiAgfVxufVxuIl19