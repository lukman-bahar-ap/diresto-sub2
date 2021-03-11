import './component/viral-list';
import './component/dashboard-card';
import '../../components/search-bar';
import '../../components/resto-list';
import imgNotLoaded from '../../../../public/images/not-found.jpg';
import preLoad from '../../components/preload';
import RestoSource from '../../../data/resto-source';
import Dashboard from './utility/dashboard';
import FavoriteRestoIdb from '../../../data/favorite-resto-idb';
import ViralSource from '../../../data/viral-source';

const Home = {
  async init() {
    this.dashboardElement = document.querySelector('dashboard-card');
    this.searchElement = document.querySelector('search-bar');
    this.restoListElement = document.querySelector('resto-list');
    this.mainContent = document.querySelector('#main-content');
    this.viralListElement = document.querySelector('viral-list');
    this.searchElement.headerTitle = 'Discover Cafe and Resto';
    this.countFavorite = await FavoriteRestoIdb.getCount();
  },

  async render() {
    return `
    <section class="content">
        <dashboard-card></dashboard-card>
    </section>
    <section class="content latest">
        <search-bar></search-bar>
        <resto-list class="posts">${preLoad}</resto-list>
    </section> 
    <section class="content">            
        <h2 class="viral__title"><i class="material-icons">poll</i> Viral Top 3</h2>
        <viral-list class="posts"></viral-list>
    </section>
      `;
  },

  async afterRender() {
    this.init();
    this.isLoaded();

    const searchResto = () => this.discoverSearch(
      this.restoListElement,
      this.searchElement.value,
    );
    this.searchElement.clickEvent = searchResto;

    const dataViral = await ViralSource.list();
    this.viralListElement.virals = dataViral;
  },

  async loadDataResto(data) {
    const dashboardData = await this.dashboardCalculate(data);

    const getListAllResto = () => this.showRestoToList(data, 'Problem loaded data, try again later');

    this.dashboardElement.setDataDashboard = dashboardData;
    this.dasboardButton({ dashboardData, data, getListAllResto });

    getListAllResto();
  },

  async dasboardButton({ dashboardData, data, getListAllResto }) {
    const getFavorite = async () => {
      await this.getFavoriteFromDb(this.restoListElement);
    };

    const getMaxRate = async () => {
      const listFiltered = await Dashboard.showMaxData(data, dashboardData.popularResto);
      this.showRestoToList(listFiltered, 'sorry, no data loaded. try again later');
    };

    const getListAvg = async () => {
      const listFiltered = await Dashboard.showAvgData(data, dashboardData.avgRate);
      this.showRestoToList(listFiltered, 'sorry, no data loaded. try again later');
    };

    const parseToButtonDashboard = {
      data: dashboardData,
      AllResto: getListAllResto,
      MaxRate: getMaxRate,
      ListAvg: getListAvg,
      ListFavorite: getFavorite,
    };

    this.dashboardElement.clickEvent = parseToButtonDashboard;
  },

  async isLoaded() {
    const listData = await this.discoverResto();
    if (listData) {
      this.loadDataResto(listData);
    } else {
      this.mainContent.innerHTML = `<img width="100%" src="${imgNotLoaded}" alt="connection error, try again later">`;
    }
  },

  async discoverResto() {
    try {
      const data = await RestoSource.list();
      return data;
    } catch {
      return false;
    }
  },

  async showRestoToList(data, error) {
    try {
      this.restoListElement.restoes = data;
    } catch {
      this.restoListElement.renderError(error);
    }
  },

  async dashboardCalculate(data) {
    const dashboard = await Dashboard.calculate(data, this.countFavorite);
    return dashboard;
  },

  async discoverSearch(_list, keyword) {
    try {
      const data = await RestoSource.search(keyword);
      this.showRestoToList(data, `sorry, ${keyword} not found`);
    } catch (message) {
      this._list.renderError(message);
    }
  },

  async getFavoriteFromDb(list) {
    this._list = list;
    const data = await FavoriteRestoIdb.getAllRestoes();
    if (data.length > 0) {
      this._list.restoes = data;
    } else {
      this._list.renderError('no favorite restaurant saved');
    }
  },
};

export default Home;
