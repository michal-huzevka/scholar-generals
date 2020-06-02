import _ from 'underscore';
import BaseModel from 'js/core/models/BaseModel';

class Tile extends BaseModel {

    setUnitId(unitId) {
        return this.setField('unitId', unitId);
    }

    getUnitId() {
        return this.data.unitId;
    }

    setField(key, value) {
        const data = _.clone(this.data);

        data[key] = value;
        return new Tile(data);
    }

}

export default Tile;