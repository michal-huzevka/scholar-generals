import _ from 'underscore';
import GameState from 'js/core/GameState';
import initialGameState from 'js/core/initialGameState';
import GridView from 'js/core/views/GridView';
import cloneDeep from 'js/utils/cloneDeep';

class Game {
    constructor() {
        this.gameState = initialGameState();

        this.eventListeners = {
            'step:increase': []
        };
    }

    getGridView() {
        return new GridView(this.gameState);
    }

    onEvent(eventName, listener) {
        this.eventListeners[eventName].push(listener);
    }
    
    offEvent(eventName, listener) {
        const eventListeners = this.eventListeners[eventName];

        eventListeners = _.without(eventListeners, listener);
    }

    trigger(eventName, eventData) {
        this.eventListeners[eventName].forEach(callback => callback(eventData));
    }

    getState() {
        return this.gameState;
    }

    setState(state) {
        state.store.step++;
        this.gameState = state;
        this.trigger('step:increase', state.store.step);
    }

    moveUnit = (fromLocation, toLocation) => {
        //TODO: check this is a valid move
        let state = this.gameState;
        const gridView = this.getGridView();
        let tile = gridView.getTileAt(fromLocation);
        let unit = tile.getUnit();

        if (unit.getOwner() !== state.getActivePlayerId()) {
            return false;
        }

        unit = unit.spendMoves(gridView.getDistance(fromLocation, toLocation));

        const newTile = tile.tile.setUnitId(null);
        const newTile2 = gridView.getTileAt(toLocation).tile.setUnitId(unit.getId());

        state = state.setModel(unit);
        state = state.setModel(newTile);
        state = state.setModel(newTile2);

        this.setState(state);
    }

    endTurn = () => {
        let state = this.gameState;

        const units = this.getGridView().getAllUnitsForPlayer(state.getActivePlayerId());

        units.forEach((unit) => {
            state = state.setModel(unit.refresh());
        });
        const activePlayerId = state.getActivePlayerId() === '1' ? '2' : '1';

        state = state.setActivePlayer(activePlayerId);

        this.setState(state);
    }
}

export default Game;