import Unit from 'js/core/Unit';

class Footman extends Unit {
    constructor(owner) {
        super(owner);
        this.moveSpeed = 3;
    }

    toDisplayString() {
        return 'F';
    }
}

export default Footman;