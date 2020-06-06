import Game from 'js/game/Game';
import 'styles/index.scss';

window.onload = () => {
    const game = new Game('.hook');

    game.start();
}