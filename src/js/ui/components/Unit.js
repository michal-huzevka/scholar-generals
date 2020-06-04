import React from 'react';
import withGlobalContext from 'js/ui/withGlobalContext';
import PlayersView from 'js/core/views/PlayersView';
import FootmanImage from 'images/1.gif'

// https://opengameart.org/content/lpc-medieval-fantasy-character-sprites

class Unit extends React.Component {    
    render() {
        const unit = this.props.unit;
        const ownerId = unit.getOwner();
        const color = this.props.getPlayerById(ownerId).getColor();

        const health = unit.getHealth();
        const maxHealth = unit.getMaxHealth();

        return (
            <g>
                <image xlinkHref={FootmanImage} x="-5" y="-7.5" width="10" height="10" />
                <line x1="-3.5" y1="2.6" x2="3" y2="2.6" stroke={color} stroke-width="0.4"  />
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