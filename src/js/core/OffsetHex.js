import AxialHex from 'js/core/AxialHex';

class OffsetHex {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    toAxialHex() {
        var x = this.col;
        var z = this.row - (this.col - (this.col&1)) / 2;

        var q = x;
        var r = z;

        return new AxialHex(r, q);
    }
}

export default OffsetHex;