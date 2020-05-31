import GlobalContext from 'js/ui/GlobalContext';
import React from 'react';

function withGlobalContext(WrappedComponent, mapGameToProps) {
    return class extends React.Component {
        render() {
            return (
                <GlobalContext.Consumer>
                    {(context) => {
                        const gameProps = mapGameToProps(context.game, this.props);

                        return (<WrappedComponent {...gameProps} {...this.props} />);
                    }}
                </GlobalContext.Consumer>
            );
        }
    };
}

export default withGlobalContext;