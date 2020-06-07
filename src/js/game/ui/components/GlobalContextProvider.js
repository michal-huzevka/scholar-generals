
import GlobalContext from 'js/game/ui/GlobalContext';
import React from 'react';

const MOVE_DELAY = 100;

class GlobalContextProvider extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            stepCounter: this.props.coreInterface.getState().get('stepCounter'),
            coreInterface: this.props.coreInterface
        };
        this.activeDelay = 0;
    }

    componentDidMount() {
        this.state.coreInterface.onEvent('stepCounter:increase', (stepCounter) => {
            const coreInterface = this.state.coreInterface;
            const lastStep = coreInterface.getState().get('lastStep');

            setTimeout(() => {
                coreInterface.getHistory().setStepCounter(stepCounter);
                this.setState({
                    stepCounter
                });
            }, this.activeDelay);

            if (lastStep.type === 'MOVE_ONE_SPACE' || lastStep.type === 'ATTACK_UNIT') {
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