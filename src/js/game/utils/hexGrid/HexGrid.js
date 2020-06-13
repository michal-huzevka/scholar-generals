import _ from 'underscore';
import OffsetHex from 'js/game/utils/hexGrid/OffsetHex';
import HexGridPrivate from 'js/game/utils/hexGrid/HexGridPrivate';
import Cube from 'js/game/utils/hexGrid/Cube';
import Point from 'js/game/utils/hexGrid/Point';

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

    getPath = (firstLocation, secondLocation) => {
        const first = new OffsetHex(firstLocation.x, firstLocation.y).toCube();
        const second = new OffsetHex(secondLocation.x, secondLocation.y).toCube();
        const path = this.hexGridPrivate.getPath(first, second);

        return path.map(cube => cube.toLocation());
    };

    getAllLocations = () => {
        return this.hexGridPrivate.getAllCubes().map(cube => cube.toLocation());
    };

    getReachableLocations = (startLocation, movement) => {
        const cube = new OffsetHex(startLocation.x, startLocation.y).toCube();

        return this.hexGridPrivate.getReachableCubes(cube, movement).map(cube => cube.toLocation());
    }

    hasObstacle = (location) => {
        const cube = new OffsetHex(location.x, location.y).toCube();
       
        return this.hexGridPrivate.hasObstacle(cube);
    }

    getNeighbors = (location) => {
        const neighbors = [];
        const cube = new OffsetHex(location.x, location.y).toCube();

        for (let dir = 0; dir<6; dir++) {
            const neighbor = cube.getNeighbor(dir);

            if (this.hexGridPrivate.doesCubeExist(neighbor)) {
                neighbors.push(neighbor.toLocation());
            }
        }

        return neighbors;
    }

    // A terminal location is any location that lies within an enemy zone of control.
    // If a unit moves into a terminal location, no more moves can be made.
    setTerminalLocation = (location) => {
        this.hexGridPrivate.gridData[location.x][location.y].terminal = true;
    }

    isTerminalLocation = (location) => {
       return !!this.hexGridPrivate.gridData[location.x][location.y].terminal; 
    }
}

export default HexGrid;