import React from 'react';
import withGlobalContext from 'js/ui/withGlobalContext';

class ActivePlayer extends React.Component {
    render() {
        const { id, color } = this.props.player;
        const style = {
            color
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

export default withGlobalContext(ActivePlayer, (game) => {
    return {
        player: game.getState().activePlayer,
        endTurn: game.endTurn
    };
});