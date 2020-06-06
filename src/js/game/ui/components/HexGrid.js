import _ from 'underscore';
import React from 'react';
import HexGrid from 'js/game/utils/hexGrid/HexGrid';
import withGlobalContext from 'js/game/ui/withGlobalContext';
import Tile from 'js/game/ui/components/Tile';
import GridView from 'js/game/core/views/GridView';
import UnitMovementView from 'js/game/core/views/UnitMovementView';

class HexGridComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedLocation: null,
            locationsInRange: []
        };
    }
    render() {
        return (
            <g className='grid'>
                {this.renderChildren()}
            </g>
        );
    }

    renderChildren() {
        const gridView = new GridView(this.props.gameState);

        return gridView.getAllLocations().map((location) => {
            const isSelected = _.isEqual(location, this.state.selectedLocation);
            const inRange = _.find(this.state.locationsInRange, (inRange) => {
                return _.isEqual(inRange, location);
            });

            return (
                <Tile
                    location={location}
                    isSelected={isSelected}
                    inRange={inRange}
                    handleTileSelect={this.handleTileSelect}
                    key={location.x + ',' + location.y}
                />
            );
        });
    }

    handleTileSelect = (location) => {
        const gridView = new GridView(this.props.gameState);
        const tile = gridView.getTileView(location);
        const unit = tile.getUnit();
        
        if (unit) {
            const unitMovementView = new UnitMovementView(this.props.gameState, location);

            this.setState({
                selectedLocation: location,
                locationsInRange: unitMovementView.getReachableLocations()
            });
        } else if (this.state.selectedLocation) {
            const unitMovementView = new UnitMovementView(this.props.gameState, this.state.selectedLocation);

            if (unitMovementView.isUnitInMoveRange(location)) {
                // do a move
                this.props.doAction({
                    type: 'MOVE_UNIT',
                    data: {
                        fromLocation: this.state.selectedLocation,
                        toLocation: location
                    }
                });
            }

            this.setState({
                selectedLocation: null,
                locationsInRange: []
            });
        } else {
            this.setState({
                selectedLocation: null,
                locationsInRange: []
            });

        }
    }
}

export default withGlobalContext(HexGridComponent, (coreInterface) => {
    return {
        gameState: coreInterface.getActiveState(),
        doAction: coreInterface.doAction
    };
});