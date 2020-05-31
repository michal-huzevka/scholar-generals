import _ from 'underscore';
import OffsetHex from 'js/utils/hexGrid/OffsetHex';
import HexGridPrivate from 'js/utils/hexGrid/HexGridPrivate';
import Cube from 'js/utils/hexGrid/Cube';
import Point from 'js/utils/hexGrid/Point';

// https://www.redblobgames.com/grids/hexagons/
class HexGrid {
    constructor(width, height) {
        this.hexGridPrivate = new HexGridPrivate(width, height);

        const EXPOSED_METHODS = [
            'setObstacle',
            'getLocationData',
            'setLocationData'
        ];

        EXPOSED_METHODS.forEach((methodName) => {
            this[methodName] = this.hexGridPrivate[methodName].bind(this.hexGridPrivate);
        });
    }

    static locationToPixelCoordinates(location, hexagonSize) 
    {
        const cube = (new OffsetHex(location.x, location.y)).toCube();

        const x = hexagonSize * (3/2 * cube.x);
        const y = hexagonSize * (Math.sqrt(3)/2 * cube.x  +  Math.sqrt(3) * cube.z);
        return new Point(x, y);
    }

    // TODO: this needs to change
    getDistance = (firstLocation, secondLocation) => {
        this.hexGridPrivate.getDistance(firstLocation, secondLocation);
    };

    getAllLocations = () => {
        return this.hexGridPrivate.getAllCubes().map(cube => cube.toLocation());
    };

    getReachableLocations = (startLocation, movement) => {
        const cube = new OffsetHex(startLocation.x, startLocation.y).toCube();

        return this.hexGridPrivate.getReachableCubes(cube, movement).map(cube => cube.toLocation());
    }

    hasObstacle = (location) => {
        const cube = new OffsetHex(startLocation.x, startLocation.y).toCube();
       
        return this.hexGridPrivate.hasObstacle(cube);
    }
}

export default HexGrid;