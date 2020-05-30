import Unit from 'js/core/Unit';

class Footman extends Unit {
    constructor() {
        super();
        this.moveSpeed = 2;
    }

    toDisplayString() {
        return 'F';
    }
}

export default Footman;