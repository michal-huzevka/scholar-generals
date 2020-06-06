import React from 'react';
import withGlobalContext from 'js/game/ui/withGlobalContext';
import PlayersView from 'js/game/core/views/PlayersView';

class ActivePlayer extends React.Component {
    render() {
        const id = this.props.player.getId();
        const style = {
            color: this.props.player.getColor()
        };

        return (
            <div>
                <div>
                    The active player is <span style={style}>Player {id}</span>
                </div>
                <button onClick={this.props.endTurn}>End Turn</button>
            </div>
        );
    }
}

export default withGlobalContext(ActivePlayer, (coreInterface) => {
    return {
        player: new PlayersView(coreInterface.getActiveState()).getActivePlayer(),
        endTurn: () => coreInterface.doAction({ type: 'END_TURN' })
    };
});