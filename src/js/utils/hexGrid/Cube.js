import OffsetHex from 'js/utils/hexGrid/OffsetHex';

class Cube {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(cube) {
        return new Cube(
            this.x + cube.x,
            this.y + cube.y,
            this.z + cube.z
        );
    }

    toOffsetHex() {
        var col = this.x;
        var row = this.z + (this.x - (this.x&1)) / 2;

        return new OffsetHex(col, row)
    }
}

export default Cube;