import FavoriteRestoIdb from '../../../../data/favorite-resto-idb';
import { createLikeButton, createLikedButton } from '../component/favorite-button';
import launchToast from '../../../../utils/toast';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const resto = await FavoriteRestoIdb.getResto(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoIdb.putResto(this._resto);
      this._renderButton();

      launchToast.init({
        icon: '<i class="large material-icons">favorite</i>',
        msg: 'added to favorite',
      });
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoIdb.deleteResto(this._resto.id);
      this._renderButton();

      launchToast.init({
        icon: '<i class="large material-icons">delete</i>',
        msg: 'deleted from favorite :(',
      });
    });
  },
};

export default LikeButtonInitiator;
