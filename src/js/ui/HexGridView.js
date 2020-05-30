import OffsetHex from 'js/utils/hexGrid/OffsetHex';
import HexGrid from 'js/utils/hexGrid/HexGrid';
import constants from 'js/ui/constants';

const { HEXAGON_SIZE } = constants;

class HexGridView {
    constructor(selector, model) {
        this.model = model;
        this.selector = selector;
    }
    
    render() {
        this.element = document.querySelector(this.selector);

        this.element.innerHTML = this.renderGrid();
        this.bindModelListeners();
    }

    renderGrid() {
        const gameBoard = this.model.getBoard();
        let html = '';
        const xOffset = 10;
        const yOffset = 20;

        gameBoard.getAllLocations().forEach((location) => {
            const point = HexGrid.locationToPixelCoordinates(location, HEXAGON_SIZE);
            let unitName = '';
            let color = '';
            const tile = gameBoard.getTileAt(location);

            if (tile.getUnit()) {
                unitName = tile.getUnit().toDisplayString();
                color = 'player-' + tile.getUnit().getOwner().color;
            }
            html += `
                <g
                    class="tile"
                    data-x="${location.x}"
                    data-y="${location.y}"
                    transform="translate(${point.x + xOffset}, ${point.y + yOffset})"
                >
                    <use class="hex" xlink:href="#pod"/>
                    <text class="tile-text ${color}">${unitName}</text>
                </g>
            `;
        });
        return html;
    }

    bindModelListeners() {
        this.model.onEvent('tile:select', this.handleTileSelect);
    }

    handleTileSelect = (location) => {
        this.element.querySelectorAll('.tile').forEach((element) => {
            element.classList.remove('selected');
            element.classList.remove('in-range');
        });

        const tile = this.model.getTileAt(location);
        const unit = tile.getUnit();
        
        if (unit) {
            const locations = this.model.getBoard().getLocationsInRange(location, unit.moveSpeed);

            locations.forEach((location) => {
                const element = this.getElementAtLocation(location);

                element.classList.add('in-range');
            });
            const selectedElement = this.getElementAtLocation(location);

            selectedElement.classList.add('selected');
        }
    }

    getElementAtLocation(location) {
        const { x, y } = location;

        return this.element.querySelector(`
            [data-x="${x}"][data-y="${y}"]
        `);
    }
}

export default HexGridView;