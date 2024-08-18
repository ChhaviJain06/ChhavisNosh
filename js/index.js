let currentRecipe = null;

function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.className = "recipe-card";
  card.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <div class="recipe-info">
            <h3>${recipe.strMeal}</h3>
        </div>
    `;

  card.addEventListener("click", () => {
    currentRecipe = recipe;
    window.location.href = `recipe.html?id=${recipe.idMeal}`;
  });
  return card;
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const themeIcon = document.querySelector(".theme-toggle i");
  themeIcon.classList.toggle("fa-moon");
  themeIcon.classList.toggle("fa-sun");
}

function loadFavorites() {
  const container = document.getElementById("recipe-container");
  favorites.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    container.appendChild(recipeCard);
  });
}

function searchRecipe() {
  const searchTerm = document.querySelector(".search-input").value;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
    searchTerm
  )}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("recipe-container");
      const resultsHeading = document.getElementById("results-heading");
      container.innerHTML = ""; // Clear existing content

      // Update the heading
      resultsHeading.textContent = `Search Results for "${searchTerm}"`;

      if (data.meals) {
        // Recipes found
        data.meals.forEach((meal) => {
          const recipeCard = createRecipeCard(meal, true);
          container.appendChild(recipeCard);
        });
      } else {
        // No recipes found
        const noResultsMessage = document.createElement("div");
        noResultsMessage.className = "search-results";
        noResultsMessage.textContent =
          "Recipe not available. Please try a different search.";
        container.appendChild(noResultsMessage);
      }
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      const container = document.getElementById("recipe-container");
      container.innerHTML =
        '<div class="search-results">An error occurred while searching for recipes. Please try again later.</div>';
    });
}

// Call loadFavorites when the page loads
window.onload = loadFavorites;
