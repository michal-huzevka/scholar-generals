import _ from 'underscore';
import GameState from 'js/core/GameState';
import initialGameState from 'js/core/initialGameState';
import Player from 'js/core/models/Player';
import GridView from 'js/core/views/GridView';
import GlobalView from 'js/core/views/GlobalView';
import PlayersView from 'js/core/views/PlayersView';
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
        const step = state.get('step') + 1;

        this.gameState = state.set('step', step);
        this.trigger('step:increase', step);
    }

    moveUnit = (fromLocation, toLocation) => {
        //TODO: check this is a valid move
        let state = this.gameState;
        const gridView = this.getGridView();
        const playersView = new PlayersView(state);
        let fromTile = gridView.getTile(fromLocation);
        let toTile = gridView.getTile(toLocation);
        let unit = gridView.getUnit(fromLocation);

        if (unit.getOwner() !== playersView.getActivePlayerId()) {
            return false;
        }

        // updates
        unit = unit.spendMoves(gridView.getDistance(fromLocation, toLocation));
        fromTile = fromTile.setUnitId(null);
        toTile = toTile.setUnitId(unit.getId());

        state = state
            .setModel(unit)
            .setModel(fromTile)
            .setModel(toTile);

        this.setState(state);
    }

    endTurn = () => {
        let state = this.gameState;
        const playersView = new PlayersView(state);
        const globalView = new GlobalView(state);

        const units = globalView.getAllUnitsForActivePlayer();

        units.forEach((unit) => {
            state = state.setModel(unit.refresh());
        });
        const activePlayerId = Player.getOpponentId(playersView.getActivePlayerId());

        state = state.set('activePlayerId', activePlayerId);

        this.setState(state);
    }
}

export default Game;