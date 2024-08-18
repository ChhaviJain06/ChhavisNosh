function getRecipeIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function fetchAndDisplayRecipe() {
  const recipeId = getRecipeIdFromUrl();
  if (recipeId) {
    const myRecipe = favorites.find((recipe) => recipe?.idMeal === recipeId);

    if (myRecipe) {
      displayRecipe(myRecipe);
      return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals && data.meals[0]) {
          displayRecipe(data.meals[0]);
        } else {
          displayErrorMessage("Recipe not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        displayErrorMessage(
          "An error occurred while fetching the recipe. Please try again later."
        );
      });
  } else {
    displayErrorMessage("No recipe ID provided.");
  }
}

function displayRecipe(recipe) {
  const recipeContent = document.getElementById("recipe-content");
  recipeContent.innerHTML = `
        <h1>${recipe.strMeal}</h1>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h2>Ingredients</h2>
        <ul id="ingredients-list"></ul>
        <h2>Instructions</h2>
        <p>${recipe.strInstructions}</p>
    `;

  const ingredientsList = document.getElementById("ingredients-list");
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      const li = document.createElement("li");
      li.textContent = `${recipe[`strIngredient${i}`]} - ${
        recipe[`strMeasure${i}`]
      }`;
      ingredientsList.appendChild(li);
    }
  }
}

function displayErrorMessage(message) {
  const recipeContent = document.getElementById("recipe-content");
  recipeContent.innerHTML = `<p class="error-message">${message}</p>`;
}

window.onload = fetchAndDisplayRecipe;
