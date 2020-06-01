class BaseModel {
    constructor(id) {
        this.id = id;
    }

    getModelType() {
        return this.constructor.name;
    }

    getId() {
        return this.id;
    }

    getData() {
        return this.data;
    }
}

export default BaseModel;