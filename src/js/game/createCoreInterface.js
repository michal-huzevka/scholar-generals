
// exposes methods for the ui to call
const createCoreInterface = (coreMain) => {
    const EXPOSED_METHODS = [
        'getHistory',
        'getGridView',
        'onEvent',
        'offEvent',
        'getState',
        'doAction'
    ];

    const coreInterface = {};

    EXPOSED_METHODS.forEach((methodName) => {
        coreInterface[methodName] = coreMain[methodName].bind(coreMain);
    });

    return coreInterface;
}

export default createCoreInterface;