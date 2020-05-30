import SvgContainerView from 'js/ui/SvgContainerView';
import HexGridController from 'js/ui/HexGridController';

class Main {
    constructor(selector, game) {
        this.selector = selector;
        this.game = game;
        this.svgContainerView = new SvgContainerView(selector);
        this.hexGridController = new HexGridController('.grid', this.game);
    }

    initialise() {
        this.svgContainerView.render();
        this.hexGridController.initialise();
    }
}

export default Main;