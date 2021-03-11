import circleCardBackground from '../../../../../public/images/circle.svg';

class dashboardCard extends HTMLElement {
  init() {
    this.querySelector('#ShowAll').addEventListener('click', this._clickShowAll);
    this.querySelector('#ShowMaxtRate').addEventListener('click', this._clickShowMaxtRate);
    this.querySelector('#ShowAverage').addEventListener('click', this._clickShowAverage);
    this.querySelector('#ShowFavorite').addEventListener('click', this._clickShowFavorite);
    this.querySelector('#ShowAllCity').addEventListener('click', this._clickShowAll);
  }

  set clickEvent(event) {
    this._clickShowAll = event.AllResto;
    this._clickShowMaxtRate = event.MaxRate;
    this._clickShowAverage = event.ListAvg;
    this._clickShowFavorite = event.ListFavorite;
    this._dashboard = event.data;
    this.render();
  }

  set setDataDashboard(dashboard) {
    this._dashboard = dashboard;
    this.render();
  }

  render() {
    const {
      countResto, popularResto, avgRate, countFav, countCity,
    } = this._dashboard;

    this.innerHTML = `
            <h2 class="category__title">Dashboard</h2>
            <div class="card-horizontal">
                <button type="button" class="category-item bg-gradient-primary" 
                    id="ShowAll" 
                    title="All Discovery"
                    aria-label="Click to show all discovery restaurant">

                        <img src="${circleCardBackground}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Show <i class="material-icons">fastfood</i>
                        </div>
                        <div class="category__value">${countResto}</div>
                        <div class="category__content">All<br>Restaurant</div>

                </button>
                <button type="button" class="category-item bg-gradient-secondary" 
                    id="ShowMaxtRate" 
                    title="Popular Resto"
                    aria-label="Click to show popular restaurant">

                        <img src="${circleCardBackground}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Higgest <i class="material-icons">star</i>
                        </div>
                        <div class="category__value">${popularResto}</div>
                        <div class="category__content">Popular<br>Rate</div>

                </button>
                <button type="button" class="category-item bg-gradient-third" 
                    id="ShowAverage" 
                    title="Show Higgest Rate Resto"
                    aria-label="Click to show restaurant by average rate">

                        <img src="${circleCardBackground}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Average <i class="material-icons">star</i>
                        </div>
                        <div class="category__value">${avgRate}</div>
                        <div class="category__content">Rate<br>Resto</div>

                </button>
                <button type="button" class="category-item bg-gradient-fourth" 
                    id="ShowFavorite"
                    title="Show List Favorite"
                    aria-label="Click to show your favorite">

                        <img src="${circleCardBackground}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Saved <i class="material-icons">local_cafe</i>
                        </div>
                        <div class="category__value">${countFav}</div>
                        <div class="category__content">Your<br>Favorite</div>

                </button>
                <button type="button" class="category-item bg-gradient-fiveth" 
                    id="ShowAllCity" 
                    title="All City"
                    aria-label="Click to show all restaurant from count by city">

                        <img src="${circleCardBackground}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Discover <i class="material-icons">fastfood</i>
                        </div>
                        <div class="category__value">${countCity}</div>
                        <div class="category__content">City in<br>Indonesia</div>

                </button>
            </div>
        `;
    this.init();
  }
}

customElements.define('dashboard-card', dashboardCard);
