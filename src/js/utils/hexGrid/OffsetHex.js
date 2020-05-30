import Cube from 'js/utils/hexGrid/Cube';

class OffsetHex {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    // odd-q shoves odd columns by +½ row
    // https://www.redblobgames.com/grids/hexagons/
    toCube() {
        var x = this.col;
        var z = this.row - (this.col - (this.col&1)) / 2;
        var y = -x-z;
        return new Cube(x, y, z);
    }
}

export default OffsetHex;