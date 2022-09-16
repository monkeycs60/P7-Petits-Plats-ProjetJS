import { hideChevron } from "./cosmetic/chevronHide.js";
import { recipeCardFactory } from "./utils/recipeCardFactory.js";
import { ingredientsTags, creatingTagsArrays } from "./utils/TagsArray.js";


// déclaration des constantes et variables globales
const allAppliances = [];
const allUstensils = [];

// on cache les chevrons up en JS
hideChevron();

// Generator Function
async function* initGenerator() {
  console.log("cc");

  // le FETCH
  const response = await fetch("./../data/recipes.json");
  const data = await response.json();

  yield 1;
  // récupération des recettes
  const { recipes } = data;

  yield 2;
  // création des cartes recettes
  recipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory(recipe);
    const cardContent = recipeCard.createRecipeCard();
    document.getElementById("recipe-grid").appendChild(cardContent);
  });

  yield 3;
  // création des tags
  creatingTagsArrays(recipes);

  yield 4;
  console.log(ingredientsTags);
}

// on initialise le générateur
const init = initGenerator();

for (let index = 0; index < 8; index++) {
  init.next();
}
