import './viral-item';

class ViralList extends HTMLElement {
  set virals(virals) {
    this._virals = virals;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h3>${message}</h3>`;
  }

  render() {
    this.innerHTML = '';

    this._virals.forEach((viral) => {
      const viralItemElement = document.createElement('viral-item');
      viralItemElement.viral = viral;
      viralItemElement.classList.add('viral-item');
      this.appendChild(viralItemElement);
    });
  }
}

customElements.define('viral-list', ViralList);
