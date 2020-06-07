import TileView from 'js/game/core/views/TileView';

class FightUnitHandler {
    getActionType() {
        return 'FIGHT_UNIT';
    }

    computeAction(action, state) {
        // if unit has already attacked, return early
        const { attackerLocation, attackedLocation } = action.data;
        const attackingUnit = TileView.buildFromLocation(state, attackerLocation).getUnit();

        if (!attackingUnit.canAttack()) {
            return [];
        }

        // lets just attack it once for now
        return [
            {
                type: 'ATTACK_UNIT',
                data: {
                    attackerLocation,
                    attackedLocation
                }
            },
            {
                type: 'EXHAUST_UNIT',
                data: {
                    unitLocation: attackerLocation
                }
            }
        ];
    }
}

export default FightUnitHandler;