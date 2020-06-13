
import GridView from 'js/game/core/views/GridView';

// exposes methods for the ui to call
const createCoreInterface = (coreMain) => {
    const EXPOSED_METHODS = [
        'getHistory',
        'onEvent',
        'offEvent',
        'getState',
        'doAction',
        'getView'
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
        const stepCounter = coreMain.getHistory().getState().get('stepCounter');
        const view = coreMain.getView('GridView', stepCounter, {});

        return view;
    }

    return coreInterface;
}

export default createCoreInterface;