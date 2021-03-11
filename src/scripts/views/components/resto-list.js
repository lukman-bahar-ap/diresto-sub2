import './resto-item';

class RestoList extends HTMLElement {
  set restoes(restoes) {
    this._restoes = restoes;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h3>${message}</h3>`;
  }

  render() {
    this.innerHTML = '';

    this._restoes.forEach((resto) => {
      const restoItemElement = document.createElement('resto-item');
      restoItemElement.resto = resto;
      restoItemElement.classList.add('discover-item');
      this.appendChild(restoItemElement);
    });
  }
}

customElements.define('resto-list', RestoList);
