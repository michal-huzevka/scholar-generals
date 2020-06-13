import _ from 'underscore';
import GridView from 'js/game/core/views/GridView';

// number of steps before an old cache is cleared
const CACHE_DURATION = 200;
const VIEWS = [
    GridView
];

class ViewManager {
    constructor() {
        this.cachedViews = {};
    }

    getView(viewName, gameState, viewOptions = null) {
        const stepCounter = gameState.get('stepCounter');
        const generalOptions = {
            gameState,
            viewManager: this
        };
        const cacheKey = this.getCacheKey(viewOptions);
        const cachedView = this.cachedViews[stepCounter] &&
            this.cachedViews[stepCounter][viewName] &&
            this.cachedViews[stepCounter][viewName][cacheKey];

        if (cachedView) {
            return cachedView;
        } else {
            // build the view
            const View = this.getClass(viewName);
            const view = new View(generalOptions, viewOptions);

            this.setCachedView(view, viewName, stepCounter, cacheKey);
            // lazy way to delete old cached views
            this.deleteOldCachedViews(stepCounter);
            return view;
        }
    }

    setCachedView(view, viewName, stepCounter, cacheKey) {
        if (!this.cachedViews[stepCounter]) {
            this.cachedViews[stepCounter] = {};
        }

        if (!this.cachedViews[stepCounter][viewName]) {
            this.cachedViews[stepCounter][viewName] = {}; 
        }

        this.cachedViews[stepCounter][viewName][cacheKey] = view;
    }

    deleteOldCachedViews(stepCounter) {
        if (stepCounter >= CACHE_DURATION) {
            const deleteCounter = stepCounter - CACHE_DURATION;

            delete this.cachedViews[deleteCounter.toString()];
        }
    }

    getCacheKey(viewOptions) {
        if (!viewOptions) {
            viewOptions = {};
        }

        return JSON.stringify(viewOptions);
    }

    getClass(viewName) {
        return _.find(VIEWS, View => View.name === viewName);
    }
}

export default ViewManager;