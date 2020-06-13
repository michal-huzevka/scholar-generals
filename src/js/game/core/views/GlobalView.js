import BaseView from 'js/game/core/views/BaseView';
import GridView from 'js/game/core/views/GridView';
import PlayersView from 'js/game/core/views/PlayersView';

class GlobalView extends BaseView {
    constructor(generalOptions) {
        super(generalOptions);

        this.gridView = this.viewManager.getView('GridView', this.gameState);
        this.playersView = this.viewManager.getView('PlayersView', this.gameState);
    }

    getAllUnitsForActivePlayer() {
        return this.gridView.getAllUnitsForPlayer(this.playersView.getActivePlayerId());
    }
}

export default GlobalView;