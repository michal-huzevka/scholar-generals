import _ from 'underscore';
import BaseModel from 'js/game/core/models/BaseModel';
import UNIT_TYPES from 'config/unitTypes';

class Unit extends BaseModel {
    constructor(data) {
        super(data);

        this.stats = UNIT_TYPES[data.type];
    }

    /* stats */
    getMoveSpeed() {
        return this.stats.moveSpeed;
    }

    getMaxHealth() {
        return this.stats.maxHealth;
    }

    getDamagePerAttack() {
        return this.stats.damagePerAttack;
    }

    getAttackCount() {
        return this.stats.attackCount;
    }

    getImage() {
        return this.stats.image;
    }

    /* data getters */
    getHealth() {
        if (!_.isNumber(this.data.health)) {
            // if health is undefined, use maxHealth
            return this.getMaxHealth();
        } else {
            return this.data.health;
        }
    }

    getMovesLeft() {
        if (!_.isNumber(this.data.movesLeft)) {
            // if movesLeft is undefined, use moveSpeed
            return this.stats.moveSpeed;
        } else {
            return this.data.movesLeft;
        }
    }

    getOwner() {
        return this.data.owner;
    }

    canAttack() {
        return _.isUndefined(this.data.canAttack) ?
            true :
            this.data.canAttack;
    }

    /* mutators */
    modifyHealth(points) {
        let health = this.getHealth() + points;

        // health cannot go below 0
        if (health < 0) {
            health = 0;
        }

        return this.setField('health', health);
    }

    spendMoves(moves) {
        const movesLeft = this.getMovesLeft() - moves;

        return this.setField('movesLeft', movesLeft);
    }

    exhaustUnit() {
        return this
            .setField('movesLeft', 0)
            .setField('canAttack', false);
    }

    refresh() {
        return this
            .setField('movesLeft', this.getMoveSpeed())
            .setField('canAttack', true);
    }
}

export default Unit;