import React from 'react';
import Point from 'js/game/utils/hexGrid/Point';
import constants from 'js/game/ui/constants';
import HexGrid from 'js/game/ui/components/HexGrid';

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

    getTerrainUrl(terrain) {
        return `/assets/images/game/terrain/${terrain}`;
    }

    renderTilePatterns() {
        //TODO this should be loaded from terrainTypes.json instead.
        return (
            <>
                <pattern id="tile" patternUnits="userSpaceOnUse" width="5" height="5">
                    <image xlinkHref={this.getTerrainUrl('grass.png')} x="0" y="0" width="5" height="5" />
                </pattern>
                <pattern id="forest" patternUnits="objectBoundingBox" width="15" height="15">
                    <image xlinkHref={this.getTerrainUrl('forest.png')} x="1" y="0" width="12" height="10" />
                </pattern>
            </>
        );
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
                    {this.renderTilePatterns()}
                </defs>
                    <rect style={style} height="180" width="200"></rect>
                    <HexGrid />
                </svg>
            </div>
        )
    }
}

export default SvgContainer;