import BaseModel from 'js/core/models/BaseModel';

class Player extends BaseModel {
    getColor() {
        return this.getData().color;
    }
}

export default Player;