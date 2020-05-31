import _ from 'underscore';
import React from 'react';
import HexGrid from 'js/utils/hexGrid/HexGrid';
import withGlobalContext from 'js/ui/withGlobalContext';
import Tile from 'js/ui/components/Tile';

class HexGridView extends React.Component {
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
        const gameBoard = this.props.board;

        return gameBoard.getAllLocations().map((location) => {
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
        const board = this.props.board;
        const tile = board.getTileAt(location);
        const unit = tile.getUnit();
        
        if (unit) {
            this.setState({
                selectedLocation: location,
                locationsInRange: board.getLocationsInRange(location, unit.moveSpeed)
            });
        } else {
            if (
                this.state.selectedLocation &&
                board.isUnitInMoveRange(this.state.selectedLocation, location)
            ) {
                // do a move
                this.props.moveUnit(this.state.selectedLocation, location);
            }

            this.setState({
                selectedLocation: null,
                locationsInRange: []
            });
        }
    }
}

export default withGlobalContext(HexGridView, (game) => {
    return {
        board: game.getState().getBoard(),
        moveUnit: game.moveUnit
    };
});