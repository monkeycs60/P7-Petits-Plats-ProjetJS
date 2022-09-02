import { recipeCardFactory } from "./utils/recipeCardFactory.js";
// fetch recipes
async function fetchRecipes() {
  await fetch("./../data/recipes.json")
    .then((response) => response.json())
    .then((data) => {
      const { recipes } = data;
      recipes.forEach((recipe) => {
        const recipeCard = recipeCardFactory(recipe);
        const cardContent = recipeCard.createRecipeCard();
        document.getElementById("recipe-grid").appendChild(cardContent);
      });
    });
}

fetchRecipes();
