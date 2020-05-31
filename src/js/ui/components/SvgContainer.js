import React from 'react';
import Point from 'js/utils/hexGrid/Point';
import constants from 'js/ui/constants';
import HexGrid from 'js/ui/components/HexGrid';

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

        return <polygon stroke='#000000' strokeWidth='0.5' points={str} />;
    }
    
    render() {
        return (
            <div className='grid-container'>
                <svg viewBox='0 0 200 200'>
                <defs>
                    <g id='pod'>
                        {this.buildPolygon()}
                    </g>
                </defs>
                    <HexGrid />
                </svg>
            </div>
        )
    }
}

export default SvgContainer;