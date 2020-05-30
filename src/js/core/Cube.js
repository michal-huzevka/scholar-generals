import AxialHex from 'js/core/AxialHex';

class Cube {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toAxialHex() {
        const q = this.x;
        const r = this.z;

        return new AxialHex(r, q);
    }

    add(cube) {
        return new Cube(
            this.x + cube.x,
            this.y + cube.y,
            this.z + cube.z
        );
    }
}

export default Cube;