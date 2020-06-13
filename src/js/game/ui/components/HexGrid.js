import _ from 'underscore';
import React from 'react';
import HexGrid from 'js/game/utils/hexGrid/HexGrid';
import withGlobalContext from 'js/game/ui/withGlobalContext';
import Tile from 'js/game/ui/components/Tile';
import GridView from 'js/game/core/views/GridView';
import PlayersView from 'js/game/core/views/PlayersView';
import UnitMovementView from 'js/game/core/views/UnitMovementView';
import UnitAttackView from 'js/game/core/views/UnitAttackView';

class HexGridComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedLocation: null,
            locationsInRange: [],
            attackableLocations: []
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
        const locationInRangeMap = {};

        // performance improvement
        this.state.locationsInRange.forEach((loc) => {
            locationInRangeMap[loc.x + ',' + loc.y] = loc;
        });

        return gridView.getAllLocations().map((location) => {
            const isSelected = _.isEqual(location, this.state.selectedLocation);
            const inRange = !!locationInRangeMap[location.x + ',' + location.y];
            const isAttackable = _.find(this.state.attackableLocations, (attackable) => {
                return _.isEqual(attackable, location);
            });

            return (
                <Tile
                    location={location}
                    isSelected={isSelected}
                    inRange={inRange}
                    isAttackable={isAttackable}
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
        const { selectedLocation } = this.state;
        
        if (unit) {
            const unitAttackView = this.props.getUnitAttackView({ unitLocation: location });
            const attackableLocations = unitAttackView.getAttackableLocations();
            const selectedUnit = selectedLocation && gridView.getUnit(selectedLocation);

            if (
                selectedLocation &&
                _.find(attackableLocations, location => _.isEqual(location, selectedLocation)) &&
                selectedUnit.getOwner() === this.props.activePlayerId
            ) {
                // if the unit can be attacked, fight it
                this.props.doAction({
                    type: 'FIGHT_UNIT',
                    data: {
                        attackerLocation: selectedLocation,
                        attackedLocation: location
                    }
                });
            } else {
                // if not, select the location
                const unitMovementView = this.props.getUnitMovementView({ unitLocation: location });

                this.setState({
                    selectedLocation: location,
                    locationsInRange: unitMovementView.getReachableLocations(),
                    attackableLocations: unitAttackView.getAttackableLocations()
                });
            }
        } else if (selectedLocation) {
            const unitMovementView = this.props.getUnitMovementView({ unitLocation: selectedLocation });

            if (unitMovementView.isUnitInMoveRange(location)) {
                // do a move
                this.props.doAction({
                    type: 'MOVE_UNIT',
                    data: {
                        fromLocation: selectedLocation,
                        toLocation: location
                    }
                });
            }

            this.setState({
                selectedLocation: null,
                locationsInRange: [],
                attackableLocations: []
            });
        } else {
            this.setState({
                selectedLocation: null,
                locationsInRange: [],
                attackableLocations: []
            });

        }
    }
}

export default withGlobalContext(HexGridComponent, (coreInterface) => {
    return {
        gameState: coreInterface.getActiveState(),
        gridView: coreInterface.getGridView(),
        getUnitAttackView: coreInterface.getUnitAttackView,
        activePlayerId: coreInterface.getPlayersView().getActivePlayerId(),
        doAction: coreInterface.doAction,
        getUnitMovementView: coreInterface.getUnitMovementView
    };
});