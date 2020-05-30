import Point from 'js/core/Point';
import constants from 'js/core/constants';

const { HEXAGON_SIZE } = constants;

class SvgContainerView {
    constructor(selector) {
        this.selector = selector;
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
    
    render() {
        const html =
        `
            <div class="grid-container" oncontextmenu="return false">
                <svg viewBox="0 0 200 200">
                <defs>
                    <g id="pod">
                        ${this.buildPolygon()}
                    </g>
                </defs>
                <g class="grid">
                </g>
                </svg>
            </div>
        `;
        
        const node = this.createElementFromHTML(html);
        const element = document.querySelector(this.selector);

        element.parentNode.replaceChild(node, element);
    }
    
    createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        
        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild; 
    }
}

export default SvgContainerView;