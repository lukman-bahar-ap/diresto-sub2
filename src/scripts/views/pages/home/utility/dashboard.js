const Dashboard = {
  async calculate(data, countFavorite) {
    const dashboardValue = {
      countResto: this._count(data),
      popularResto: await this._maxRate(data),
      avgRate: await this._avgRateResto(data),
      countFav: countFavorite,
      countCity: this._countCities(data),
    };

    return dashboardValue;
  },

  _count(results) {
    return results.length;
  },

  _countCities(results) {
    //  from [1, 2, 3, 3, 3, 5] to [1, 2, 3, 5]
    const distinc = [...new Set(results.map((resto) => resto.city))];
    return distinc.length;
  },

  async _maxRate(results) {
    const ratingResto = await results.map((resto) => resto.rating);
    return Math.max.apply(null, ratingResto);
  },

  async _avgRateResto(results) {
    const ratingResto = await results.map((resto) => resto.rating);
    const avg = await ratingResto.reduce((a, b) => (a + b), 1) / ratingResto.length;
    return avg.toFixed(1);
  },

  async showAvgData(results, key) {
    const keyword = Math.round(key);
    const range = keyword + 1;
    const filter = results.filter((resto) => resto.rating > keyword && resto.rating < range);
    return filter;
  },

  async showMaxData(results, key) {
    const filter = results.filter((resto) => resto.rating === key);
    return filter;
  },
};
export default Dashboard;
