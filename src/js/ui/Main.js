import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'js/ui/components/Root';

class Main {
    constructor(selector, game) {
        this.selector = selector;
        this.game = game;
    }

    initialise() {
        const domContainer = document.querySelector(this.selector);
        ReactDOM.render(<Root game={this.game} />, domContainer);
    }
}

export default Main;