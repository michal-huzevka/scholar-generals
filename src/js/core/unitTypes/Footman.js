import Unit from 'js/core/Unit';

class Footman extends Unit {
    constructor() {
        super();
        this.moveSpeed = 3;
    }

    toDisplayString() {
        return 'F';
    }
}

export default Footman;