import imgNotLoaded from '../../../../../public/images/not-found.jpg';

class MenuItem extends HTMLElement {
  set viral(viral) {
    this._viral = viral;
    this.render();
  }

  render() {
    const {
      pictureId, name, rating, category, price, description,
    } = this._viral;

    this.innerHTML = `
                <img class="discover-item__thumbnail"
                src="${pictureId}"
                alt="image for ${name}"
                crossorigin="anonymous"
                onerror="this.onerror=null;this.src='${imgNotLoaded}'">
               <div class="discover-item__card-img"></div>  
 
                <div class="discover-item__info">
                    <p class="discover-item__rate">
                    ⭐️ ${rating}
                    </p>
                </div>
                
                <div class="viral-item__content">
                    <h3 class="discover-item__title">
                        <a href="#" aria-label="${name} click to view content">
                            ${name}
                        </a>
                    </h3>
                    <p class="viral-item__description">
                        <i class="material-icons">fastfood</i> ${category} | 
                        <i class="material-icons pl-low">monetization_on</i> ${price}
                    </p>
                    <p class="viral-item__description">${description}</p>
               </div>
        `;
  }
}

customElements.define('viral-item', MenuItem);
