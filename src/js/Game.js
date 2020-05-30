import HexGrid from 'js/core/HexGrid';
import HexGridController from 'js/ui/HexGridController';
import SvgContainerView from 'js/ui/SvgContainerView';

class Game {
    constructor(selector) {
        this.hexGrid = new HexGrid();
        this.svgContainerView = new SvgContainerView(selector);
        this.hexGridController = new HexGridController('.grid', this.hexGrid);
    }
    
    start() {
       this.svgContainerView.render();
       this.hexGridController.initialise();
    }
}

export default Game;