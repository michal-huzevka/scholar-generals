import GlobalContext from 'js/game/ui/GlobalContext';
import React from 'react';

function withGlobalContext(WrappedComponent, mapCoreInterfaceToProps) {
    return class extends React.Component {
        render() {
            return (
                <GlobalContext.Consumer>
                    {(context) => {
                        const coreInterfaceProps = mapCoreInterfaceToProps(context.coreInterface, this.props);

                        return (<WrappedComponent {...coreInterfaceProps} {...this.props} />);
                    }}
                </GlobalContext.Consumer>
            );
        }
    };
}

export default withGlobalContext;