import BaseModel from 'js/core/models/BaseModel';

class Tile extends BaseModel {
    setUnit(unit) {
        this.data.unit = unit;
    }

    getUnit() {
        return this.data.unit;
    }

}

export default Tile;