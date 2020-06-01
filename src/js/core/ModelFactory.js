import Player from 'js/core/models/Player';

class ModelFactory {
    static build(id, data, modelType) {
        let Model;

        switch(modelType) {
            case 'Player':
                Model = Player;
                break;
            case 'Unit':
                break;
            default:
                console.error('no Model available for the given modelType');
        }

        return new Model(id, data);
    }

}

export default ModelFactory;