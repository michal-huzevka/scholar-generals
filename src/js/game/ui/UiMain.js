import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'js/game/ui/components/Root';

class UiMain {
    constructor(selector, coreInterface) {
        this.selector = selector;
        this.coreInterface = coreInterface;
    }

    initialise() {
        const domContainer = document.querySelector(this.selector);

        ReactDOM.render(<Root coreInterface={this.coreInterface} />, domContainer);
    }
}

export default UiMain;