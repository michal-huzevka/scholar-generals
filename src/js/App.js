import Game from 'js/core/Game';
import Main from 'js/ui/Main';

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