import Cube from 'js/utils/hexGrid/Cube';

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
}

export default OffsetHex;