import HexGridModel from "js/ui/HexGridModel";
import HexGridView from "js/ui/HexGridView";

class HexGridController {
    constructor(selector, game) {
        this.model = new HexGridModel(game);
        this.view = new HexGridView(selector, this.model);
    }

    initialise() {
        this.view.render();
        this.bindEventListeners();
    }

    bindEventListeners() {
        const tiles = document.querySelectorAll('.tile');

        tiles.forEach((tile) => {
            tile.addEventListener('click', (event) => {
                const element = event.currentTarget;
                const location = {
                    x: parseInt(element.getAttribute('data-x')),
                    y: parseInt(element.getAttribute('data-y'))
                };

                this.model.selectTile(location);
            });
        })
    }
}

export default HexGridController;