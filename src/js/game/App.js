import Game from 'js/game/core/Game';
import Main from 'js/game/ui/Main';

class App {
    constructor(selector) {
        this.game = new Game();
        this.main = new Main(selector, this.game);
    }
    
    start() {
       this.main.initialise();
    }
}

export default App;