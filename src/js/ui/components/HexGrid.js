import _ from 'underscore';
import React from 'react';
import HexGrid from 'js/utils/hexGrid/HexGrid';
import withGlobalContext from 'js/ui/withGlobalContext';
import Tile from 'js/ui/components/Tile';

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
        const gridView = this.props.gridView;

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
        const gridView = this.props.gridView;
        const tile = gridView.getTileView(location);
        const unit = tile.getUnit();
        
        if (unit) {
            this.setState({
                selectedLocation: location,
                locationsInRange: gridView.getReachableLocations(location, unit)
            });
        } else {
            if (
                this.state.selectedLocation &&
                gridView.isUnitInMoveRange(this.state.selectedLocation, location)
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

export default withGlobalContext(HexGridComponent, (game) => {
    return {
        gridView: game.getGridView(),
        moveUnit: game.moveUnit
    };
});