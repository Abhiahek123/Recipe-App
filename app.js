const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');

const recipeContainer = document.querySelector('.recipe-container');

const recipeDetails = document.querySelector('.recipe-details');

const recipeDetailsContent = document.querySelector('.recipe-details-content');

const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async(query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";

        if(!response.meals){
            recipeContainer.innerHTML = "<h2>No Recipes Found</h2>";
            return;
        }

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <div class="recipe-content">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
                </div>
            `;

            const button = document.createElement('button'); 
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            

            button.addEventListener('click', () => {
            recipeDetailsContent.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}">
           <p><strong>Category:</strong> ${meal.strCategory}</p>
           <p><strong>Area:</strong> ${meal.strArea}</p>
           <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
    `;
    recipeDetails.classList.add('active');
});


            recipeContainer.appendChild(recipeDiv);
        });

    } catch(err) {
        recipeContainer.innerHTML = "<h2>Error fetching recipes</h2>";
        console.error(err);
    }
}

 searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(searchInput){
        fetchRecipes(searchInput);
    }
});

  recipeCloseBtn.addEventListener('click', () => {
    recipeDetails.classList.remove('active');
});









