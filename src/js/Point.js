class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toSvgPoint() {
        return this.x + ' ' + this.y;
    }
}

export default Point;