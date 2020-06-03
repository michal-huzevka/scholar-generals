
import GlobalContext from 'js/ui/GlobalContext';
import React from 'react';

class GlobalContextProvider extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            stepCounter: this.props.game.getState().get('stepCounter'),
            game: this.props.game
        };
    }

    componentDidMount() {
        this.state.game.onEvent('stepCounter:increase', (stepCounter) => {
            this.setState({
                stepCounter
            });
        });
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