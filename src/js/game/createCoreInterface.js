
import GridView from 'js/game/core/views/GridView';

// exposes methods for the ui to call
const createCoreInterface = (coreMain) => {
    const EXPOSED_METHODS = [
        'getHistory',
        'onEvent',
        'offEvent',
        'getState',
        'doAction'
    ];

    const coreInterface = {};

    EXPOSED_METHODS.forEach((methodName) => {
        coreInterface[methodName] = coreMain[methodName].bind(coreMain);
    });

    // convenience methods
    coreInterface.getActiveState = () => {
        return coreMain.getHistory().getState();
    }

    coreInterface.getGridView = () => {
        return coreMain.getHistory().getView('GridView');
    }

    coreInterface.getPlayersView = () => {
        return coreMain.getHistory().getView('PlayersView');
    }

    return coreInterface;
}

export default createCoreInterface;