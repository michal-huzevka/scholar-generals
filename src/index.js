import Game from 'js/Game';
import WebpackLogo from 'images/webpack-logo.svg';
import 'styles/index.scss';

window.onload = () => {
    const game = new Game();

    game.start(document.querySelector('.hook'));
}