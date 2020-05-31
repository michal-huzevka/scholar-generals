import _ from 'underscore';
import OffsetHex from 'js/utils/hexGrid/OffsetHex';
import Cube from 'js/utils/hexGrid/Cube';
import Point from 'js/utils/hexGrid/Point';

// https://www.redblobgames.com/grids/hexagons/
class HexGridPrivate {
    constructor(width, height) {
        // x, y
        this.gridData = [];
        this.width = width;
        this.height = height;

        for (let column = 0; column<width; column++) {
            this.gridData.push([]);
            for (let row = 0; row<height; row++) {
                this.gridData[column].push({ 
                    obstacle: false,
                    data: null
                });
            }
        }

    }

    // TODO: this needs to change
    getDistance = (firstLocation, secondLocation) => {
        const first = new OffsetHex(firstLocation.x, firstLocation.y).toCube();
        const second = new OffsetHex(secondLocation.x, secondLocation.y).toCube();

        return first.getDistance(second);
    };

    getReachableLocations(startLocation, movement) {
        const start = (new OffsetHex(startLocation.x, startLocation.y)).toCube();
        const visited = new Set();
        const fringes = []; // array of arrays of hexes
        visited.add(start.toString());
        fringes.push([start]);

        for (let i=1; i<=movement; i++) {
            fringes.push([]);
            const cubes = fringes[i-1];

            cubes.forEach((cube) => {
                for (let dir = 0; dir<6; dir++) {
                    const neighbor = cube.getNeighbor(dir);
                    const wasVisited = visited.has(neighbor.toString());

                    if (
                        !wasVisited &&
                        this.doesLocationExist(neighbor.toOffsetHex()) &&
                        !this.hasObstacle(neighbor.toOffsetHex())
                    ) {
                        visited.add(neighbor.toString());
                        fringes[i].push(neighbor);
                    }
                }
            });
        }
        visited.delete(start.toString());

        const result = [];

        visited.forEach((str) => {
            result.push(Cube.fromString(str).toOffsetHex().toLocation());
        });
        return result;
    }
    
    //remove this
    hasObstacle = (location) => {
        return this.gridData[location.x][location.y].obstacle === true;
    }

    // remove tihs
    doesLocationExist = (location) => {
        return this.gridData[location.x] && this.gridData[location.x][location.y];
    };
}

export default HexGridPrivate;