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

// create/uptade/delete new recipes
document.addEventListener('DOMContentLoaded', () => {
    const addRecipeButton = document.getElementById('addRecipe');
    const recipeList = document.getElementById('recipeList');
    const recipeDetails = document.getElementById('recipeDetails');
    const closeDetails = document.getElementById('closeDetails');
    const addRecipeModal = document.getElementById('addRecipeModal');
    const closeAddRecipeModalButton = document.getElementById('closeAddRecipeModal');
    const saveRecipeButton = document.getElementById('saveRecipe');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let isEditing = false;
    let editingIndex = null;

    const renderRecipes = () => {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="info">
                    <h3>${recipe.title}</h3>
                    <button data-index="${index}" class="view-recipe">
                        <ion-icon name="expand-outline"></ion-icon>
                    </button>
                </div>
            `;

            const viewButton = card.querySelector('.view-recipe');
            viewButton.addEventListener('click', () => openDetails(index));
            recipeList.appendChild(card);
        });
    };

    const openDetails = (index) => {
        const recipe = recipes[index];
        document.getElementById('detailsImage').src = recipe.image;
        document.getElementById('detailsTitle').innerText = recipe.title;
        document.getElementById('detailsDescription').innerText = recipe.description;
        document.getElementById('detailsDate').innerText = recipe.date;

        recipeDetails.style.display = 'block';

        document.getElementById('editRecipe').onclick = () => editRecipe(index);
        document.getElementById('deleteRecipe').onclick = () => deleteRecipe(index);
    };

    const closeRecipeDetails = () => {
        recipeDetails.style.display = 'none';
    };

    const saveRecipe = () => {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const image = document.getElementById('image').value.trim();
        const date = document.getElementById('date').value || new Date().toLocaleDateString();

        if (!title || !description || !image) {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        if (isEditing) {
            recipes[editingIndex] = { title, description, image, date };
            isEditing = false;
            editingIndex = null;
        } else {
            recipes.push({ title, description, image, date });
        }

        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();

        addRecipeModal.style.display = 'none';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('image').value = '';
        document.getElementById('date').value = '';
    };

    const editRecipe = (index) => {
        const recipe = recipes[index];
        const recipeDetails = document.getElementById('recipeDetails');

        recipeDetails.style.display = 'none';

        document.getElementById('title').value = recipe.title;
        document.getElementById('description').value = recipe.description;
        document.getElementById('image').value = recipe.image;
        document.getElementById('date').value = recipe.date;

        addRecipeModal.style.display = 'flex';
        isEditing = true;
        editingIndex = index;
    };

    const deleteRecipe = (index) => {
        if (confirm('Tem certeza que deseja excluir esta receita?')) {
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            renderRecipes();
            closeRecipeDetails();
        }
    };

    addRecipeButton.addEventListener('click', () => {
        addRecipeModal.style.display = 'flex';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('image').value = '';
        document.getElementById('date').value = '';
    });

    closeAddRecipeModalButton.addEventListener('click', () => {
        addRecipeModal.style.display = 'none';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('image').value = '';
        document.getElementById('date').value = '';
        isEditing = false;
        editingIndex = null;
    });

    saveRecipeButton.addEventListener('click', saveRecipe);
    closeDetails.addEventListener('click', closeRecipeDetails);

    renderRecipes();
});