import BaseModel from 'js/core/models/BaseModel';

class Player extends BaseModel {
    constructor(id, data) {
        super(id);
        this.color = data.color;
        this.data = data;
    }
}

export default Player;