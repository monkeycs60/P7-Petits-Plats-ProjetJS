import { recipeCardFactory } from "./factory/recipeCardFactory.js";
import {
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  creatingTagsArrays,
} from "./tags/tagsArray.js";
import {
  tagsListsContent,
  tagsArrayFilter,
  ingredientsDisplayed,
  ustensilsDisplayed,
  appliancesDisplayed,
} from "./tags/tagsListsContent.js";
import { handleTags } from "./tags/displayTags.js";
import {
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized,
  simpleSearch,
} from "./utils/simpleSearch.js";
import { autocompleteTags } from "./utils/autocompleteTags.js";

// Generator Function
async function* initGenerator() {
  // on définit les tableaux contenant les tags

  // le FETCH
  // const response = await fetch("./../data/recipes.json");
  let lienExterne = `${window.location.origin}/data/recipes.json`;
  if (!lienExterne.includes("192.168")) {
    lienExterne = lienExterne.replace(
      "/data",
      "/P7-Petits-Plats-ProjetJS/data"
    );
  }
 
  const response = await fetch(lienExterne);
  const data = await response.json();

  yield 1;
  // récupération des recettes
  const { recipes } = data;

  yield 2;
  // création des tags
  creatingTagsArrays(recipes);

  yield 3;
  // création des cartes recettes
  recipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory(recipe);
    const cardContent = recipeCard.createRecipeCard();
    document.getElementById("recipe-grid").appendChild(cardContent);
  });

  yield 4;
  // gère le contenu des tags
  tagsListsContent(
    ingredientsTags,
    appliancesTags,
    ustensilsTags,
    recipes,
    ingredientsTagsActualized,
    appliancesTagsActualized,
    ustensilsTagsActualized
  );

  yield 5;
  // gère l'input recherche principale
  simpleSearch(
    recipes,
    ingredientsTags,
    appliancesTags,
    ustensilsTags,
    tagsArrayFilter,
    ingredientsTagsActualized,
    ingredientsDisplayed,
    ustensilsDisplayed,
    appliancesDisplayed
  );

  yield 6;
  // on gère la recherche avancée des tags
  autocompleteTags(
    recipes,
    ingredientsTags,
    appliancesTags,
    ustensilsTags,
    ingredientsTagsActualized,
    appliancesTagsActualized,
    ustensilsTagsActualized
  );

  yield 7;
  // affiche les tags dans le DOM -/- les fait disparaître
  handleTags();
}

// on initialise le générateur
const init = initGenerator();

for (let index = 0; index < 12; index++) {
  init.next();
}
