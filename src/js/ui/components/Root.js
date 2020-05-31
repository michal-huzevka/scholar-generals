import React from 'react';
import SvgContainer from 'js/ui/components/SvgContainer';
import ActivePlayer from 'js/ui/components/ActivePlayer';
import GlobalContextProvider from 'js/ui/components/GlobalContextProvider';

class Root extends React.Component {
    render() {
        return (
            <GlobalContextProvider game={this.props.game}>
                <ActivePlayer />
                <SvgContainer />
            </GlobalContextProvider>
        );
    }
}

export default Root;