document.addEventListener("DOMContentLoaded", () => {
    const favoritesKey = 'favoriteRecipes';
    const favoritesContainer = document.getElementById('favorites-container');
    let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

    const renderFavorites = () => {
        favoritesContainer.innerHTML = '';
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>Nenhuma receita favorita salva.</p>';
            return;
        }
        favorites.forEach((recipe) => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <article class="info">
                    <article>
                        <h3>${recipe.title}</h3>
                    </article>
                    <button class="remove-favorite" title="Remover dos Favoritos">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </article>
            `;

            const removeButton = card.querySelector('.remove-favorite');
            removeButton.addEventListener('click', () => removeFavorite(recipe.title));

            favoritesContainer.appendChild(card);
        });
    };

    const removeFavorite = (title) => {
        favorites = favorites.filter(fav => fav.title !== title);
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
        renderFavorites();
    };

    renderFavorites();
});