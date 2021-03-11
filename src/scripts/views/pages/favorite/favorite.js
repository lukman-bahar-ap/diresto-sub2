import '../../components/resto-list';
import '../../components/search-bar';
import preLoad from '../../components/preload';
import FavoriteRestoIdb from '../../../data/favorite-resto-idb';

const Favorite = {
  async init() {
    this.restoListElement = document.querySelector('resto-list');
    this.searchElement = document.querySelector('search-bar');
    this.searchElement.headerTitle = 'Your Favorites';
  },

  async render() {
    return `
    <section class="content latest">
      <search-bar></search-bar>
      <resto-list class="posts">${preLoad}</resto-list>
    </section>
      `;
  },

  async afterRender() {
    this.init();

    const data = await FavoriteRestoIdb.getAllRestoes();
    this.showFavoriteToList(data, 'You do not have favorite restaurant saved');
    this.searchButton(data);
  },

  async searchButton(data) {
    const favoriteSearch = async () => {
      const filterResto = await FavoriteRestoIdb.getByName(data, this.searchElement.value);
      this.showFavoriteToList(
        filterResto,
        'not found from your favorites',
        this.searchElement.value,
      );
    };

    this.searchElement.clickEvent = favoriteSearch;
  },

  async showFavoriteToList(data, error, keyword = '') {
    if (data.length > 0) {
      this.restoListElement.restoes = data;
    } else {
      this.restoListElement.renderError(`${keyword} ${error}`);
    }
  },

};

export default Favorite;
