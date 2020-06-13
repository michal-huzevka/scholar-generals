
import GlobalContext from 'js/game/ui/GlobalContext';
import React from 'react';
import { startTimer, stopTimer } from 'js/game/utils/driftlessTimer';

const MOVE_DELAY = 200;

class GlobalContextProvider extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            stepCounter: this.props.coreInterface.getState().get('stepCounter'),
            coreInterface: this.props.coreInterface
        };
    }

    componentDidMount() {
        this.state.coreInterface.onEvent('action:complete', () => {
            this.beginTimer();
        });
    }

    beginTimer = () => {
        // do a quick update to fire things off faster
        this.doUpdate();
        //TODO Michal: this whole timer thing could be improved
        startTimer(this.doUpdate, MOVE_DELAY);
    }

    doUpdate = () => {
        const stepCounter = this.state.stepCounter + 1;

        if (stepCounter > this.state.coreInterface.getState().get('stepCounter')) {
            stopTimer();
        } else {
            this.state.coreInterface.getHistory().setStepCounter(stepCounter);
            
            this.setState({
                stepCounter
            });
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