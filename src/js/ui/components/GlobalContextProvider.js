
import GlobalContext from 'js/ui/GlobalContext';
import React from 'react';

class GlobalContextProvider extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            step: this.props.game.getState().step,
            game: this.props.game
        };
    }

    componentDidMount() {
        this.state.game.onEvent('step:increase', (step) => {
            this.setState({
                step
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