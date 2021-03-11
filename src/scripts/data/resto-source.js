import API_ENDPOINT from '../globals/api-endpoint';
import API_OPTION from '../globals/api-option';
import CONFIG from '../globals/config';

class RestoSource {
  static async list() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants ? responseJson.restaurants : false;
  }

  static async search(keyword) {
    const response = await fetch(API_ENDPOINT.SEARCH(keyword));
    const responseJson = await response.json();
    return (responseJson.founded > 0) ? responseJson.restaurants : false;
  }

  static async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async sendReview(data) {
    const response = await fetch(API_ENDPOINT.POST_REVIEW,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': CONFIG.API_KEY,
        },
        body: JSON.stringify(data),
      });
    const result = await API_OPTION.check(response);

    if (result.customerReviews) {
      return Promise.resolve(result.customerReviews);
    }

    return Promise.reject(new Error('problem loaded'));
  }
}

export default RestoSource;
