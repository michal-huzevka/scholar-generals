class BaseStepHandler {
    constructor(options) {
        this.options = options || {};
    }

    _getViewManager() {
        return this.options.viewManager;
    }
}

export default BaseStepHandler;