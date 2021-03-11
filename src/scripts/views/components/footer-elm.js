class FooterElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <footer>
                <div><p>Lukman Bahar AP - Copyright © 2020 - diresto</p></div>
            </footer>
        `;
  }
}
customElements.define('footer-elm', FooterElement);
