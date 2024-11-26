//  open and close menu
document.addEventListener("DOMContentLoaded", function () {
    const open = document.getElementById("openMenu");
    const menu = document.querySelector(".menu");

    open.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

// close menu when clicking outside
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