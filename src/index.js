import App from 'js/App';
import WebpackLogo from 'images/webpack-logo.svg';
import 'styles/index.scss';

window.onload = () => {
    const app = new App('.hook');

    app.start();
}