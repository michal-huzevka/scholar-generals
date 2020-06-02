import _ from 'underscore';
import BaseModel from 'js/core/models/BaseModel';
import UNIT_TYPES from 'config/unitTypes';

class Unit extends BaseModel {
    constructor(data) {
        super(data);

        this.stats = UNIT_TYPES[data.type];
    }

    toDisplayString() {
        return this.stats.displayString;
    }

    getMoveSpeed() {
        return this.stats.moveSpeed;
    }

    getMovesLeft() {
        if (!_.isNumber(this.data.movesLeft)) {
            // if movesLeft is undefined, use moveSpeed
            return this.stats.moveSpeed;
        } else {
            return this.data.movesLeft;
        }
    }

    spendMoves(moves) {
        const movesLeft = this.getMovesLeft() - moves;

        return this.setField('movesLeft', movesLeft);
    }

    getOwner() {
        return this.data.owner;
    }

    refresh() {
        return this.setField('movesLeft', this.getMoveSpeed());
    }

    setField(key, value) {
        const data = _.clone(this.data);

        data[key] = value;
        return new Unit(data);
    }
}

export default Unit;