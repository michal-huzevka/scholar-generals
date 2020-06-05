import React from 'react';
import Point from 'js/utils/hexGrid/Point';
import constants from 'js/ui/constants';
import HexGrid from 'js/ui/components/HexGrid';
import GrassTile from 'images/grass-tile.png';

const { HEXAGON_SIZE } = constants;
class SvgContainer extends React.Component {
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
        const str = points.map(point => point.toSvgPoint()).join(',');

        return <polygon points={str} />;
    }
    
    render() {
        const style = {
            fill: 'url(#tile)',
            opacity: 0.85
        };

        return (
            <div className='grid-container'>
                <svg viewBox='0 0 200 200'>
                <defs>
                    <g id='pod'>
                        {this.buildPolygon()}
                    </g>
                    <pattern id="tile" patternUnits="userSpaceOnUse" width="5" height="5">
                        <image xlinkHref={GrassTile} x="0" y="0" width="5" height="5" />
                    </pattern>
                </defs>
                    <rect style={style} height="180" width="153"></rect>
                    <HexGrid />
                </svg>
            </div>
        )
    }
}

export default SvgContainer;