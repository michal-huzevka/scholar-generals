import BaseModel from 'js/core/models/BaseModel';

class Player extends BaseModel {
    getColor() {
        return this.getData().color;
    }

    static getOpponentId(playerId) {
        return playerId === '1' ? '2' : '1';
    }
}

export default Player;