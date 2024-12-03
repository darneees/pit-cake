//  abrir e fechar menu
document.addEventListener("DOMContentLoaded", function () {
    const open = document.getElementById("openMenu");
    const menu = document.querySelector(".menu");

    open.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

// fecha menu ao clicar fora
document.addEventListener("click", function (e) {
    const open = document.getElementById("openMenu");
    const menu = document.querySelector(".menu");

    if (e.target !== open && !open.contains(e.target) && e.target !== menu && !menu.contains(e.target)) {
        menu.classList.remove("active");
    }
});

// detalhes da receita
const open = document.querySelectorAll('.open');
const details = document.getElementById('recipeDetails');
const close = document.getElementById('close');

const image = document.getElementById('recipeImage');
const title = document.getElementById('recipeTitle');
const content = document.getElementById('recipeInfo');

open.forEach((opens) => {
    opens.addEventListener('click', () => {
        const recipeTitle = opens.getAttribute('data-title');
        const recipeIngredients = opens.getAttribute('data-ingredients');
        const recipePreparation = opens.getAttribute('data-preparation');
        const recipeImage = opens.getAttribute('data-image');

        title.innerHTML = recipeTitle;
        content.innerHTML = `
                            <h3>Ingredientes:</h3>
                            ${recipeIngredients}
                            <h3>Modo de preparo:</h3>
                            ${recipePreparation}`;
        image.src = recipeImage;

        details.style.display = 'flex';
    });
});


close.addEventListener('click', () => {
    details.style.display = 'none';
});

// filtra receitas por categoria
const filterButtons = document.querySelectorAll("#filter-buttons .filter-btn");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach(card => {
        if(card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "Todas") {
            return card.classList.replace("hide", "show");
        }
        card.classList.add("hide");
    });
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));

//  buscar receitas
document.querySelector('#search-input');
addEventListener('input', filterlist);

function filterlist() {
    const searchInput = document.querySelector('#search-input');
    const filter = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll('.card');

    listItems.forEach((item) => {
        let text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
};

//  abrir e fechar filtro de receitas
document.addEventListener("DOMContentLoaded", function () {
    const openFilter = document.getElementById("openFilter");
    const filterOptions = document.getElementById("filtersOptions");

    openFilter.addEventListener("click", function () {
        filterOptions.style.display = 'flex';
    });
});

// fechat filtro ao clicar fora e tambem ao clicar em uma opção
document.addEventListener("click", function (e) {
    const openFilter = document.getElementById("openFilter");
    const filterOptions = document.getElementById("filtersOptions");

    if (e.target !== openFilter && !openFilter.contains(e.target) && e.target !== filterOptions && !filterOptions.contains(e.target)) {
        filterOptions.style.display = 'none';
    }
});