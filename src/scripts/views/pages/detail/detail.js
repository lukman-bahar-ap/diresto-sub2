import './component/detail-resto';
import './component/review-form';
import './component/review-list';
import UrlParser from '../../../routes/url-parser';
import preLoad from '../../components/preload';
import RestoSource from '../../../data/resto-source';
import LikeButtonInitiator from './utility/like-button-initiator';
import ReviewButton from './utility/review-button';
import FavoriteRestoIdb from '../../../data/favorite-resto-idb';
import launchToast from '../../../utils/toast';
import imgNotLoaded from '../../../../public/images/not-found.jpg';

const Detail = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.id = url.id;

    this.restoElement = document.querySelector('detail-resto');
    this.reviewListElement = document.querySelector('review-list');
    this.inputName = document.querySelector('#inputName');
    this.inputReview = document.querySelector('#inputReview');
    this.btnSubmit = document.querySelector('#submitReview');
    this.mainContent = document.querySelector('#main-content');
    this.btnClose = document.querySelector('#previousPage');
  },
  async render() {
    return `
        <section class="content">
          <h2 class="detail__title">
            <a href="#" id="previousPage" aria-label="back to previeus page" accesskey="h" class="back-button">
              <i class="large material-icons">keyboard_backspace</i>
            </a>
            Detail Resto
          </h2>
          <detail-resto>${preLoad}</detail-resto>
          <review-form></review-form>
          <review-list></review-list>
          <div id="likeButtonContainer"></div>
        </section>
      `;
  },

  async afterRender() {
    this.init();
    this.isLoaded();
  },

  async loadDatailResto(resto) {
    this.restoElement.detail = resto;
    this.reviewListElement.reviews = resto.customerReviews;

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto,
    });

    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      return this.submitReview();
    });

    this.btnClose.addEventListener('click', () => {
      window.history.go(-1);
    });
  },

  submitReview() {
    if (this.isRequiered()) {
      ReviewButton.init({
        id: this.id,
        name: this.inputName.value,
        review: this.inputReview.value,
        list: this.reviewListElement,
      });
      return this.clearInput();
    }
    return launchToast.init({
      icon: '<i class="material-icons pr-low">keyboard</i>',
      msg: 'all fill required',
    });
  },

  async isLoaded() {
    const data = await this.getDetailResto(this.id);
    if (data) {
      this.loadDatailResto(data);
    } else {
      this.mainContent.innerHTML = `<img width="100%" src="${imgNotLoaded}" 
      alt="connection error, try again later">`;
    }
  },

  isRequiered() {
    return !(this.inputName.value === '' || this.inputReview.value === '');
  },

  clearInput() {
    this.inputName.value = '';
    this.inputReview.value = '';
  },

  async getDetailResto(id) {
    if (await LikeButtonInitiator._isRestoExist(id)) {
      return this.getFromFavorite(id);
    }
    return this.getFromSource(id);
  },

  async getFromSource(id) {
    try {
      const resto = await RestoSource.detail(id);
      return resto;
    } catch {
      return false;
    }
  },

  async getFromFavorite(id) {
    const resto = await FavoriteRestoIdb.getResto(id);
    return resto;
  },
};

export default Detail;
