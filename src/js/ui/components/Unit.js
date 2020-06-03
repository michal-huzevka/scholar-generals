import React from 'react';
import withGlobalContext from 'js/ui/withGlobalContext';
import PlayersView from 'js/core/views/PlayersView';

class Unit extends React.Component {    
    render() {
        const unit = this.props.unit;
        const ownerId = unit.getOwner();
        const unitName = unit.toDisplayString();
        const color = 'player-' + this.props.getPlayerById(ownerId).getColor();
        const textClassName = `tile-unit-name ${color}`;

        const health = unit.getHealth();
        const maxHealth = unit.getMaxHealth();

        return (
            <g>
                <text className={textClassName}>{unitName}</text>
                <text transform='translate(0,5)' className='tile-unit-health'>{health}/{maxHealth}</text>
            </g>
        )
    }
}


export default withGlobalContext(Unit, (game) => {
    return {
        getPlayerById: new PlayersView(game.getHistory().getState()).getPlayerById
    };
});