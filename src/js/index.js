import App from 'js/game/App';
import 'styles/index.scss';

window.onload = () => {
    const app = new App('.hook');

    app.start();
}