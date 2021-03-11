import 'regenerator-runtime';
import '../public/images/heros/hero-image_2.jpg';
import '../styles/fonts.scss';
import '../styles/main.scss';
import './views/components/app-bar';
import './views/components/hero-elm';
import './views/components/footer-elm';
import swRegister from './utils/sw-register';
import App from './views/app';

const app = new App({
  open: document.querySelector('#drawer-open'),
  close: document.querySelector('#drawer-close'),
  drawer: document.querySelector('#drawer'),
  hero: document.querySelector('.hero'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  document.querySelector('main').scrollIntoView();
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

window.addEventListener('DOMContentLoaded', swRegister);
