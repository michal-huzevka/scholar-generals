
import GlobalContext from 'js/game/ui/GlobalContext';
import React from 'react';

const MOVE_DELAY = 200;

class GlobalContextProvider extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            stepCounter: this.props.game.getState().get('stepCounter'),
            game: this.props.game
        };
        this.activeDelay = 0;
    }

    componentDidMount() {
        this.state.game.onEvent('stepCounter:increase', (stepCounter) => {
            const game = this.state.game;
            const lastStep = game.getState().get('lastStep');

            setTimeout(() => {
                game.getHistory().setStepCounter(stepCounter);
                this.setState({
                    stepCounter
                });
            }, this.activeDelay);

            if (lastStep.type === 'MOVE_ONE_SPACE') {
                this.activeDelay += MOVE_DELAY;
            }
        });
    }

    componentDidUpdate() {
        if (this.activeDelay > 0) {
            this.activeDelay -= MOVE_DELAY;
        }
    }

    render() {
        return (
            <GlobalContext.Provider value={this.state}>
                {this.props.children}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalContextProvider;