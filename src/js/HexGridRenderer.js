import Point from 'js/Point';
import HexGrid from 'js/HexGrid';

const SIZE = 7;
class HexGridRenderer {
    renderGrid(hexGrid) {
        let html = '';

        hexGrid.getAllAxialHexes().forEach((hex) => {
            const point = this.axialHexToPixel(hex);
            let className = '';
            if (hex.q === 3 && hex.r === 3) {
                className = 'special';
            }
            html += `<use xlink:href="#pod" class="${className}" transform="translate(${point.x}, ${point.y})"/>`;
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
            points.push(flatHexCorner(new Point(10, 20), SIZE, i));
        }
        const str = points.map(point => point.toSvgPoint()).join(',')
        return `<polygon stroke="#000000" stroke-width="0.5" points="${str}" />`;
    }

    // r is up down direction
    // q is diagonal direction
    axialHexToPixel(hex) {
        const x = SIZE * (3/2 * hex.q);
        const y = SIZE * (Math.sqrt(3)/2 * hex.q  +  Math.sqrt(3) * hex.r);
        return new Point(x, y);
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