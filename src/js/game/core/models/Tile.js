import _ from 'underscore';
import BaseModel from 'js/game/core/models/BaseModel';
import TERRAIN_TYPES from 'config/terrainTypes';

class Tile extends BaseModel {
    constructor(data) {
        super(data);

        this.terrainStats = TERRAIN_TYPES[data.terrain];
    }

    /* stats */
    getDamageMultiplier() {
        return this.terrainStats.damageMultiplier;
    }

    /* data setters */
    setUnitId(unitId) {
        let unit = this;
        if (this.getUnitId()) {
            // if there is already a unit id here, we must temporarily stash it
            // to allow the unit to move
            unit = this._setStashedUnit(this.getUnitId());
        }
        return unit.setField('unitId', unitId);
    }

    removeUnit() {
        if (this._getStashedUnitId()) {
            // bring the unit out of the stash
            return this
                .setField('unitId', this._getStashedUnitId())
                ._removeStashedUnit();
        } else {
            return this.setField('unitId', null);
        }
    }


    /* data getters */
    getUnitId() {
        return this.data.unitId;
    }

    getTerrain() {
        return this.data.terrain;
    }


    /* private methods */

    // This is used when a unit moves over another unit, it is only temporary.
    _setStashedUnit(unitId) {
        return this.setField('stashedUnitId', unitId);
    }

    _getStashedUnitId() {
        return this.data.stashedUnitId;
    }

    _removeStashedUnit() {
        return this.setField('stashedUnitId', null);
    }
}

export default Tile;