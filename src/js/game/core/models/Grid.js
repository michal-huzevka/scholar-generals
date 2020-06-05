import BaseModel from 'js/game/core/models/BaseModel';

class Grid extends BaseModel {
    getWidth() {
        return this.getData().width;
    }

    getHeight() {
        return this.getData().height;
    }

    static staticGetModelType() {
        return new Grid().getModelType();
    }
}

export default Grid;