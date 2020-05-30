import OffsetHex from 'js/utils/hexGrid/OffsetHex';
import Cube from 'js/utils/hexGrid/Cube';
import Point from 'js/utils/hexGrid/Point';

// https://www.redblobgames.com/grids/hexagons/
class HexGrid {
    constructor(width, height) {
        // x, y
        this.gridData = [];
        this.width = width;
        this.height = height;

        for (let column = 0; column<width; column++) {
            this.gridData.push([]);
            for (let row = 0; row<height; row++) {
                this.gridData[column].push({});
            }
        }
    }

    static locationToPixelCoordinates(location, hexagonSize) 
    {
        const cube = (new OffsetHex(location.x, location.y)).toCube();

        const x = hexagonSize * (3/2 * cube.x);
        const y = hexagonSize * (Math.sqrt(3)/2 * cube.x  +  Math.sqrt(3) * cube.z);
        return new Point(x, y);
    }

    getHexesInRange(hex, n) {
        const results = [];
        const center = hex.toCube();

        for (let x = -n; x<=n; x++) {
            const max = Math.max(-n, -x-n);
            const min  = Math.min(n, -x+n);

            for (let y = max; y<= min; y++) {
                const z = -x-y;
                const cube = { x, y, z };

                results.push(center.add(new Cube(x, y, z)));
            }
        }

        return results.map(cube => cube.toOffsetHex());
    }

    getAllLocations() {
        const locations = [];

        for (let x = 0; x<this.width; x++) {
            for (let y = 0; y<this.height; y++) {
                locations.push({ x, y });
            }
        }
        return locations;
    }

    getLocationData(location) {
        return this.gridData[location.x][location.y];
    }

    setLocationData(location, data) {
        return this.gridData[location.x][location.y] = data;
    }
}

export default HexGrid;