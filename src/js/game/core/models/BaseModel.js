import _ from 'underscore';

class BaseModel {
    constructor(data) {
        this.data = data;
    }

    getModelType() {
        return this.constructor.name;
    }

    getId() {
        return this.data.id;
    }

    getData() {
        return this.data;
    }

    setField(key, value) {
        const data = _.clone(this.data);

        data[key] = value;
        return new this.constructor(data);
    }
}

export default BaseModel;