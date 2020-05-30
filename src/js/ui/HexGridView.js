import Point from 'js/core/Point';
import OffsetHex from 'js/core/OffsetHex';
import constants from 'js/core/constants';

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
        const hexGrid = this.model.hexGrid;
        let html = '';
        const xOffset = 10;
        const yOffset = 20;

        hexGrid.getAllAxialHexes().forEach((hex) => {
            const point = hex.toPoint();
            let special = '';
            
            const offsetHex = hex.toOffsetHex();
            const tile = hexGrid.tiles[offsetHex.col][offsetHex.row];

            if (tile.getUnit()) {
                special = tile.getUnit().toDisplayString();
            }
            html += `
                <g
                    class="tile"
                    data-x="${offsetHex.col}"
                    data-y="${offsetHex.row}"
                    transform="translate(${point.x + xOffset}, ${point.y + yOffset})"
                >
                    <use class="hex" xlink:href="#pod"/>
                    <text class="tile-text">${special}</text>
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
        });

        const tile = this.model.getTileAt(location.x, location.y);
        const unit = tile.getUnit();
        
        if (unit) {
            const element = this.getElementAtLocation(location.x, location.y);

            element.classList.add('selected');
            
            console.log(this.model.hexGrid.getHexesInRange(new OffsetHex(location.x, location.y), 2));
        }
    }

    getElementAtLocation(x, y) {
        return this.element.querySelector(`
            [data-x="${x}"][data-y="${y}"]
        `);
    }
}

export default HexGridView;