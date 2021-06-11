import FavoriteMovieIdb from '../data/favoritemovie-idb';
import { createLikedButtonTemplate, createUnlikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
    async init({ likeButtonContainer, movie }) {
        this._likeButtonContainer = likeButtonContainer;
        this._movie = movie;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._movie;

        if (await this._isMovieExist(id)) {
            this._renderLiked();
        } else {
            this._renderUnliked();
        }
    },

    async _isMovieExist(id) {
        const movie = await FavoriteMovieIdb.getMovie(id);
        return !!movie;
    },

    _renderUnliked() {
        this._likeButtonContainer.innerHTML = createUnlikedButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteMovieIdb.putMovie(this._movie);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteMovieIdb.deleteMovie(this._movie.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
