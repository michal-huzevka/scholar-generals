class BaseView {
    constructor(generalOptions, viewOptions) {
        this.gameState = generalOptions.gameState;
        this.viewManager = generalOptions.viewManager;
        this.viewOptions = viewOptions;
    }
}

export default BaseView;