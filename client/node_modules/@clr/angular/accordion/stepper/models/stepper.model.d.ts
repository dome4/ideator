import { AccordionModel } from '../../models/accordion.model';
export declare class StepperModel extends AccordionModel {
    readonly allPanelsCompleted: boolean;
    addPanel(id: string, open?: boolean): void;
    updatePanelOrder(ids: string[]): void;
    togglePanel(panelId: string): void;
    navigateToNextPanel(currentPanelId: string, currentPanelValid?: boolean): void;
    overrideInitialPanel(panelId: string): void;
    setPanelsWithErrors(ids: string[]): void;
    resetPanels(): void;
    private resetAllFuturePanels;
    private resetPanel;
    private openFirstPanel;
    private completePanel;
    private openNextPanel;
    private setPanelError;
    private getNumberOfIncompletePanels;
    private getNumberOfOpenPanels;
}
