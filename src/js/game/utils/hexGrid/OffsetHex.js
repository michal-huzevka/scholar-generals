import Cube from 'js/game/utils/hexGrid/Cube';

class OffsetHex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // odd-q shoves odd columns by +½ row
    // https://www.redblobgames.com/grids/hexagons/
    toCube() {
        var x = this.x;
        var z = this.y - (this.x - (this.x&1)) / 2;
        var y = -x-z;
        return new Cube(x, y, z);
    }

    // returns a dumb object so that we can use _.isEqual
    toLocation() {
        return { 
            x: this.x,
            y: this.y
        };
    }
}

export default OffsetHex;