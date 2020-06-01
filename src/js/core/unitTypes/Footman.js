import Unit from 'js/core/Unit';

class Footman extends Unit {
    constructor(ownerId) {
        super(ownerId);
        this.moveSpeed = 4;
        this.movesLeft = this.moveSpeed;
    }

    toDisplayString() {
        return 'F';
    }
}

export default Footman;