import React from 'react';
import HexGrid from 'js/utils/hexGrid/HexGrid';
import withGlobalContext from 'js/ui/withGlobalContext';
import constants from 'js/ui/constants';
import PlayersView from 'js/core/views/PlayersView';

const { HEXAGON_SIZE } = constants;

class Tile extends React.Component {    
    render() {
        const { location, tileView, handleTileSelect } = this.props;
        const xOffset = 10;
        const yOffset = 20;
        const point = HexGrid.locationToPixelCoordinates(location, HEXAGON_SIZE);
        let unitName = '';
        let color = '';

        if (tileView.getUnit()) {
            const ownerId = tileView.getUnit().getOwner();

            unitName = tileView.getUnit().toDisplayString();
            color = 'player-' + this.props.getPlayerById(ownerId).getColor();
        }
        const transformStr = `translate(${point.x + xOffset}, ${point.y + yOffset})`;
        const textClassName = `tile-text ${color}`;
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
                <use className="hex" xlinkHref="#pod"/>
                <text className={textClassName}>{unitName}</text>
            </g>
        )
    }
}

export default withGlobalContext(Tile, (game, ownProps) => {
    return {
        tileView: game.getGridView().getTileView(ownProps.location),
        getPlayerById: new PlayersView(game.getState()).getPlayerById
    };
});