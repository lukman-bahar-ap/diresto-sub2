const createLikeButton = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="large material-icons">favorite_border</i>
  </button>
`;

const createLikedButton = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="large material-icons">favorite</i>
  </button>
`;

export { createLikeButton, createLikedButton };
