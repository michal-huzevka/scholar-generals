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
}

export default BaseModel;