import _ from 'underscore';
import BaseModel from 'js/core/models/BaseModel';
import UNIT_TYPES from 'config/unitTypes';

class Unit extends BaseModel {
    constructor(data) {
        super(data);

        this.stats = UNIT_TYPES[data.type];
    }

    getMoveSpeed() {
        return this.stats.moveSpeed;
    }

    getMaxHealth() {
        return this.stats.maxHealth;
    }

    getHealth() {
        if (!_.isNumber(this.data.health)) {
            // if health is undefined, use maxHealth
            return this.getMaxHealth();
        } else {
            return this.data.health;
        }
    }

    subtractHealth(points) {
        const health = this.getHealth() - points;

        return this.setField('health', health);
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
}

export default Unit;