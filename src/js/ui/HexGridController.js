import HexGridModel from "js/ui/HexGridModel";
import HexGridView from "js/ui/HexGridView";

class HexGridController {
    constructor(selector, hexGrid) {
        this.model = new HexGridModel(hexGrid);
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
                    x: element.getAttribute('data-x'),
                    y: element.getAttribute('data-y')
                };

                this.model.selectTile(location);
            });
        })
    }
}

export default HexGridController;