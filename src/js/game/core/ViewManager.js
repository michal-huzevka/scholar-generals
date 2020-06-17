import _ from 'underscore';
import GridView from 'js/game/core/views/GridView';
import GlobalView from 'js/game/core/views/GlobalView';
import PlayersView from 'js/game/core/views/PlayersView';
import TileView from 'js/game/core/views/TileView';
import UnitAttackView from 'js/game/core/views/UnitAttackView';
import UnitMovementView from 'js/game/core/views/UnitMovementView';

// number of steps before an old cache is cleared
const CACHE_DURATION = 200;
const VIEWS = [
    GridView,
    GlobalView,
    PlayersView,
    TileView,
    UnitAttackView,
    UnitMovementView
];

class ViewManager {
    constructor() {
        this.cachedViews = {};
        this.cachedGameStates = {};
    }

    getView(viewName, gameState, viewOptions = null) {
        const stepCounter = gameState.get('stepCounter');

        this.checkGameState(stepCounter, gameState);
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

    checkGameState(stepCounter, gameState) {
        const cachedState = this.cachedGameStates[stepCounter];

        if (cachedState !== gameState) {
            if (cachedState) {
                // game state has changed!
                // we must delete the cache.
                console.log('deleting cache');
                delete this.cachedViews[stepCounter.toString()];
            }
            this.cachedGameStates[stepCounter] = gameState;
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
            delete this.cachedGameStates[deleteCounter.toString()];
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