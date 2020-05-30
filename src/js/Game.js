import GameBoard from 'js/core/GameBoard';
import HexGridController from 'js/ui/HexGridController';
import SvgContainerView from 'js/ui/SvgContainerView';

class Game {
    constructor(selector) {
        this.gameBoard = new GameBoard();
        this.svgContainerView = new SvgContainerView(selector);
        this.hexGridController = new HexGridController('.grid', this.gameBoard);
    }
    
    start() {
       this.svgContainerView.render();
       this.hexGridController.initialise();
    }
}

export default Game;