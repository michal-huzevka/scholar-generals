import _ from 'underscore';
import OffsetHex from 'js/utils/hexGrid/OffsetHex';
import HexGridPrivate from 'js/utils/hexGrid/HexGridPrivate';
import Cube from 'js/utils/hexGrid/Cube';
import Point from 'js/utils/hexGrid/Point';

// https://www.redblobgames.com/grids/hexagons/
class HexGrid {
    constructor(width, height) {
        this.hexGridPrivate = new HexGridPrivate(width, height);
    }

    static locationToPixelCoordinates(location, hexagonSize) 
    {
        const cube = (new OffsetHex(location.x, location.y)).toCube();

        const x = hexagonSize * (3/2 * cube.x);
        const y = hexagonSize * (Math.sqrt(3)/2 * cube.x  +  Math.sqrt(3) * cube.z);
        return new Point(x, y);
    }

    doesLocationExist = (location) => {
        return this.hexGridPrivate.gridData[location.x] && this.hexGridPrivate.gridData[location.x][location.y];
    };

    // TODO: this needs to change
    getDistance = (firstLocation, secondLocation) => {
        this.hexGridPrivate.getDistance(firstLocation, secondLocation);
    };

    getAllLocations = () => {
        const locations = [];

        for (let x = 0; x<this.hexGridPrivate.width; x++) {
            for (let y = 0; y<this.hexGridPrivate.height; y++) {
                locations.push({ x, y });
            }
        }
        return locations;
    };

    getReachableLocations = (startLocation, movement) => {
        return this.hexGridPrivate.getReachableLocations(startLocation, movement);
    }

    setObstacle = (location) => {
        this.hexGridPrivate.gridData[location.x][location.y].obstacle = true;
    }

    hasObstacle = (location) => {
        return this.hexGridPrivate.gridData[location.x][location.y].obstacle === true;
    }

    getLocationData = (location) => {
        return this.hexGridPrivate.gridData[location.x][location.y].data;
    }

    setLocationData = (location, data) => {
        this.hexGridPrivate.gridData[location.x][location.y].data = data;
    }
}

export default HexGrid;