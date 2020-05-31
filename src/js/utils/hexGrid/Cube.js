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

        return new OffsetHex(col, row);
    }

    toLocation() {
        return this.toOffsetHex().toLocation();
    }

    //TODO this needs to change
    getDistance(cube) {
        return (Math.abs(this.x - cube.x) + Math.abs(this.y - cube.y) + Math.abs(this.z - cube.z)) / 2;
    }

    getNeighbor(direction) {
        return this.add(CUBE_DIRECTIONS[direction]);
    }

    toString() {
        return this.x + ',' + this.y + ',' + this.z;
    }

    static fromString(str) {
        const xyz = str.split(',');
        const x = parseInt(xyz[0]);
        const y = parseInt(xyz[1]);
        const z = parseInt(xyz[2]);

        return new Cube(x, y, z);
    }
}

const CUBE_DIRECTIONS = [
    new Cube(+1, -1, 0), new Cube(+1, 0, -1), new Cube(0, +1, -1), 
    new Cube(-1, +1, 0), new Cube(-1, 0, +1), new Cube(0, -1, +1),
];

export default Cube;