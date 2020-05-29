import Point from 'js/Point';
import HexGrid from 'js/HexGrid';
import HexGridRenderer from 'js/HexGridRenderer';

const SIZE = 7;
class Game {
    
    constructor() {
        this.hexGrid = new HexGrid();
        this.renderer = new HexGridRenderer();
    }
    
    start(element) {
       this.renderer.build(this.hexGrid, element);
    }
}

export default Game;