import React from 'react';
import SvgContainer from 'js/game/ui/components/SvgContainer';
import ActivePlayer from 'js/game/ui/components/ActivePlayer';
import GlobalContextProvider from 'js/game/ui/components/GlobalContextProvider';

class Root extends React.Component {
    render() {
        return (
            <GlobalContextProvider coreInterface={this.props.coreInterface}>
                <ActivePlayer />
                <SvgContainer />
            </GlobalContextProvider>
        );
    }
}

export default Root;