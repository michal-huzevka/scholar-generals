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
        const gridView = new GridView(this.props.gameState);

        return gridView.getAllLocations().map((location) => {
            const isSelected = _.isEqual(location, this.state.selectedLocation);
            const inRange = _.find(this.state.locationsInRange, (inRange) => {
                return _.isEqual(inRange, location);
            });
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
        const gridView = new GridView(this.props.gameState);
        const tile = gridView.getTileView(location);
        const unit = tile.getUnit();
        const { selectedLocation } = this.state;
        
        if (unit) {
            const unitAttackView = new UnitAttackView(this.props.gameState, location);
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
                const unitMovementView = new UnitMovementView(this.props.gameState, location);

                this.setState({
                    selectedLocation: location,
                    locationsInRange: unitMovementView.getReachableLocations(),
                    attackableLocations: unitAttackView.getAttackableLocations()
                });
            }
        } else if (selectedLocation) {
            const unitMovementView = new UnitMovementView(this.props.gameState, selectedLocation);

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
        activePlayerId: new PlayersView(coreInterface.getActiveState()).getActivePlayerId(),
        doAction: coreInterface.doAction
    };
});