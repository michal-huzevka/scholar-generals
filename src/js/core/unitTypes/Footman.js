import Unit from 'js/core/Unit';

class Footman extends Unit {
    constructor(owner) {
        super(owner);
        this.moveSpeed = 2;
        this.movesLeft = this.moveSpeed;
    }

    toDisplayString() {
        return 'F';
    }
}

export default Footman;