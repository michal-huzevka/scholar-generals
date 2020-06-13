import _ from 'underscore';
import React from 'react';
import HexGrid from 'js/game/utils/hexGrid/HexGrid';
import withGlobalContext from 'js/game/ui/withGlobalContext';
import UnitComponent from 'js/game/ui/components/Unit';
import constants from 'js/game/ui/constants';

const { HEXAGON_SIZE } = constants;

class Tile extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (
            !_.isEqual(this.props.location, nextProps.location) ||
            this.props.handleTileSelect !== nextProps.handleTileSelect ||
            this.props.isSelected !== nextProps.isSelected ||
            this.props.inRange !== nextProps.inRange ||
            this.props.isAttackable !== nextProps.isAttackable ||
            this.props.unit !== nextProps.unit
        ) {
            return true;
        }

        return false;
    }

    render() {
        const { location, unit, handleTileSelect, isSelected, inRange, isAttackable } = this.props;
        const xOffset = 8;
        const yOffset = 8;
        const point = HexGrid.locationToPixelCoordinates(location, HEXAGON_SIZE);
        const transformStr = `translate(${point.x + xOffset}, ${point.y + yOffset})`;
        let className = 'tile';

        if (isSelected) {
            className += ' selected';
        }
        if (inRange) {
            className += ' in-range';
        }
        if (isAttackable) {
            className += ' attackable';
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

export default withGlobalContext(Tile, (coreInterface, ownProps) => {
    return {
        unit: coreInterface.getGridView().getTileView(ownProps.location).getUnit()
    };
});