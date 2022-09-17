import { hideChevron } from "./cosmetic/chevronHide.js";
import { recipeCardFactory } from "./factory/recipeCardFactory.js";
import {
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  creatingTagsArrays,
} from "./tags/TagsArray.js";
import { tagsListsContent } from "./tags/tagsListsContent.js";
import { handleTags } from "./tags/displayTags.js";
import { simpleSearch } from "./utils/simpleSearch.js";

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
  // gère le contenu des tags
  tagsListsContent(ingredientsTags, appliancesTags, ustensilsTags);

  yield 5;
  // affiche les tags dans le DOM -/- les fait disparaître
  handleTags();

  yield 6;
  // tri des recettes dans la barre de recherche principale
  recipes.forEach((recipe) => {
    simpleSearch(recipe);
  });
}

// on initialise le générateur
const init = initGenerator();

for (let index = 0; index < 8; index++) {
  init.next();
}
