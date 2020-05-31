import React from 'react';
import SvgContainer from 'js/ui/components/SvgContainer';
import GlobalContextProvider from 'js/ui/components/GlobalContextProvider';

class Root extends React.Component {
    render() {
        return (
            <GlobalContextProvider game={this.props.game}>
                <SvgContainer />
            </GlobalContextProvider>
        );
    }
}

export default Root;