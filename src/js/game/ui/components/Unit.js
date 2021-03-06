import React from 'react';
import withGlobalContext from 'js/game/ui/withGlobalContext';
import PlayersView from 'js/game/core/views/PlayersView';

// https://opengameart.org/content/lpc-medieval-fantasy-character-sprites

// https://opengameart.org/content/slates-32x32px-orthogonal-tileset-by-ivan-voirol

// https://opengameart.org/content/lpc-character-collection
// https://opengameart.org/content/lpc-collection

// http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator

// https://opengameart.org/content/lpc-white-beard

// give credit to https://github.com/wesnoth/wesnoth/blob/master/data/core/images/units/human-loyalists/horseman/horseman.png


class Unit extends React.Component {
    render() {
        const unit = this.props.unit;
        const ownerId = unit.getOwner();
        const color = this.props.getPlayerById(ownerId).getColor();
        const health = unit.getHealth();
        const maxHealth = unit.getMaxHealth();
        const url = `/assets/images/game/units/${unit.getImage()}`;

        return (
            <g>
                <image xlinkHref={url} x="-5" y="-7.5" width="10" height="10" />
                <line x1="-3.5" y1="2.6" x2="3" y2="2.6" stroke={color} strokeWidth="0.4"  />
                <text transform='translate(0,5)' className='tile-unit-health'>{health}/{maxHealth}</text>
            </g>
        )
    }
}


export default withGlobalContext(Unit, (coreInterface) => {
    return {
        getPlayerById: coreInterface.getPlayersView().getPlayerById
    };
});