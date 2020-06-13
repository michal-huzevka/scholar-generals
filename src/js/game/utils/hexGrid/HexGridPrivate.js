import _ from 'underscore';
import OffsetHex from 'js/game/utils/hexGrid/OffsetHex';
import Cube from 'js/game/utils/hexGrid/Cube';
import Point from 'js/game/utils/hexGrid/Point';

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

    getAllCubes = () => {
        const offsetHexes = [];

        for (let x = 0; x<this.width; x++) {
            for (let y = 0; y<this.height; y++) {
                offsetHexes.push(new OffsetHex(x, y));
            }
        }
        return offsetHexes.map(hex => hex.toCube());
    };

    getPath(start, end) {
        const visited = new Set();
        const fringes = []; // array of arrays of hexes
        const cameFrom = {};

        cameFrom[start.toString()] = null;
        visited.add(start.toString());
        fringes.push([start]);

        let i = 1;
        let finished = false;
        while (!finished) {
            fringes.push([]);
            const cubes = fringes[i-1];

            cubes.forEach((cube) => {
                if (this.isTerminal(cube) && i > 1) {
                    // Zone of control.
                    // If its a terminal cube, we cannot proceed further.
                    // if the unit starts in a terminal cube however, it can still get out
                    return;
                }
                for (let dir = 0; dir<6; dir++) {
                    const neighbor = cube.getNeighbor(dir);
                    const wasVisited = visited.has(neighbor.toString());

                    if (
                        !wasVisited &&
                        this.doesCubeExist(neighbor) &&
                        !this.hasObstacle(neighbor)
                    ) {
                        visited.add(neighbor.toString());
                        fringes[i].push(neighbor);
                        cameFrom[neighbor.toString()] = cube;

                        if (neighbor.equalsTo(end)) {
                            finished = true;
                        }
                    }
                }
            });

            i++;
        }
        
        const path = [];
        let cube = end;
        while (!cube.equalsTo(start)) {
            path.unshift(cube);

            cube = cameFrom[cube.toString()];
        }
        return path;
    }

    getReachableCubes(start, movement) {
        const visited = new Set();
        const fringes = []; // array of arrays of hexes
        visited.add(start.toString());
        fringes.push([start]);

        for (let i=1; i<=movement; i++) {
            fringes.push([]);
            const cubes = fringes[i-1];

            cubes.forEach((cube) => {
                if (this.isTerminal(cube) && i > 1) {
                    // Zone of control.
                    // If its a terminal cube, we cannot proceed further.
                    // if the unit starts in a terminal cube however, it can still get out
                    return;
                }
                for (let dir = 0; dir<6; dir++) {
                    const neighbor = cube.getNeighbor(dir);
                    const wasVisited = visited.has(neighbor.toString());

                    if (
                        !wasVisited &&
                        this.doesCubeExist(neighbor) &&
                        !this.hasObstacle(neighbor)
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
            result.push(Cube.fromString(str));
        });
        return result;
    }
    
    hasObstacle = (cube) => {
        const location = cube.toOffsetHex();

        return this.gridData[location.x][location.y].obstacle === true;
    }

    isTerminal = (cube) => {
        const location = cube.toOffsetHex();

        return this.gridData[location.x][location.y].terminal === true;

    }

    doesCubeExist = (cube) => {
        const location = cube.toOffsetHex();

        return this.gridData[location.x] && this.gridData[location.x][location.y];
    };

    setObstacle = (location) => {
        this.gridData[location.x][location.y].obstacle = true;
    }

    getLocationData = (location) => {
        return this.gridData[location.x][location.y].data;
    }

    setLocationData = (location, data) => {
        this.gridData[location.x][location.y].data = data;
    }
}

export default HexGridPrivate;