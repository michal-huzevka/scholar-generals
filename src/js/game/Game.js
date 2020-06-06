import CoreMain from 'js/game/core/CoreMain';
import UiMain from 'js/game/ui/UiMain';
import createCoreInterface from 'js/game/createCoreInterface';

class Game {
    constructor(selector) {
        this.coreMain = new CoreMain();
        this.coreInterface = createCoreInterface(this.coreMain);
        this.uiMain = new UiMain(selector, this.coreInterface);
    }
    
    start() {
       this.uiMain.initialise();
    }
}

export default Game;