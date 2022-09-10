import { recipeCardFactory } from "./utils/recipeCardFactory.js";
import { sortingMethod } from "./utils/algoSort.js";
// import { sortSimpleSearch } from "./utils/sorterFunc.js";

function hideChevron() {
  const chevronUpIngredients = document.getElementById("chevronUpIngredients");
  const chevronUpUstensiles = document.querySelector("#chevronUpUstensils");
  const chevronUpAppliances = document.querySelector("#chevronUpAppliances");

  // make each of chevron up display none
  chevronUpIngredients.style.display = "none";
  chevronUpUstensiles.style.display = "none";
  chevronUpAppliances.style.display = "none";
}
hideChevron();

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
sortingMethod();
