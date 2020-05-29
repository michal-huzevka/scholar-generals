import Point from 'js/Point';
import HexGrid from 'js/HexGrid';
import constants from 'js/constants';

const { HEXAGON_SIZE } = constants;

class HexGridRenderer {
    renderGrid(hexGrid) {
        let html = '';
        const xOffset = 10;
        const yOffset = 20;

        hexGrid.getAllAxialHexes().forEach((hex) => {
            const point = hex.toPoint();
            let special = '';
            
            const offsetHex = hex.toOffsetHex();
            const tile = hexGrid.tiles[offsetHex.col][offsetHex.row];

            if (tile.getPawn()) {
                special = tile.getPawn();
            }
            html += `
                <g class="tile" transform="translate(${point.x + xOffset}, ${point.y + yOffset})">
                    <text class="tile-text">${special}</text>
                    <use xlink:href="#pod"/>
                </g>
            `;
        });
        return html;
    }
    
    buildPolygon() {
        const flatHexCorner = (center, size, i) => {
            var angle_deg = 60 * i;
            var angle_rad = Math.PI / 180 * angle_deg;
            return new Point(center.x + size * Math.cos(angle_rad),
                        center.y + size * Math.sin(angle_rad));
        };

        const points = [];
        for (let i = 0; i< 6; i++) {
            points.push(flatHexCorner(new Point(0, 0), HEXAGON_SIZE, i));
        }
        const str = points.map(point => point.toSvgPoint()).join(',')
        return `<polygon stroke="#000000" stroke-width="0.5" points="${str}" />`;
    }
    
    build(hexGrid, element) {
        const html =
        `
            <div class="game-container">
                <svg viewBox="0 0 200 200">
                <defs>
                    <g id="pod">
                        ${this.buildPolygon()}
                    </g>
                </defs>
                <g class="pod-wrap">
                    ${this.renderGrid(hexGrid)}
                </g>
                </svg>
            </div>
        `;
        
        const gameNode = this.createElementFromHTML(html);
        element.parentNode.replaceChild(gameNode, element);
    }
    
    createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        
        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild; 
    }
}

export default HexGridRenderer;