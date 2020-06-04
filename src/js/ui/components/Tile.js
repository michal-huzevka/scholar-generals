import React from 'react';
import HexGrid from 'js/utils/hexGrid/HexGrid';
import withGlobalContext from 'js/ui/withGlobalContext';
import UnitComponent from 'js/ui/components/Unit';
import constants from 'js/ui/constants';

const { HEXAGON_SIZE } = constants;

class Tile extends React.Component {    
    render() {
        const { location, tileView, handleTileSelect } = this.props;
        const xOffset = 10;
        const yOffset = 20;
        const point = HexGrid.locationToPixelCoordinates(location, HEXAGON_SIZE);
        const unit = tileView.getUnit();
        const transformStr = `translate(${point.x + xOffset}, ${point.y + yOffset})`;
        let className = 'tile';

        if (this.props.isSelected) {
            className += ' selected';
        }
        if (this.props.inRange) {
            className += ' in-range';
        }

        return (
            <g
                className={className}
                data-x={location.x}
                data-y={location.y}
                transform={transformStr}
                key={location.x + ',' + location.y}
                onClick={() => handleTileSelect(location)}
            >
                <use className="hex" xlinkHref="#pod" />
                { unit &&
                    <UnitComponent unit={unit} />
                }
            </g>
        )
    }
}

export default withGlobalContext(Tile, (game, ownProps) => {
    return {
        tileView: game.getHistory().getGridView().getTileView(ownProps.location)
    };
});