import { recipeCardFactory } from "./factory/recipeCardFactory.js";
import {
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  creatingTagsArrays,
} from "./tags/TagsArray.js";
import { tagsListsContent } from "./tags/tagsListsContent.js";
import { handleTags } from "./tags/displayTags.js";
import {
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized,
  simpleSearch,
} from "./utils/simpleSearch.js";
import { tagsActualized } from "./utils/actualisationTags.js";
import { searchTags } from "./utils/searchTags.js";



// Generator Function
async function* initGenerator() {
  // on définit les tableaux contenant les tags

  // le FETCH
  const response = await fetch("./../data/recipes.json");
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
  simpleSearch(recipes, ingredientsTags, appliancesTags, ustensilsTags);
  
  yield 5;
  // on gère la recherche avancée des tags 
  searchTags();
  
  yield 6;
  // gère le contenu des tags
  tagsListsContent(ingredientsTags, appliancesTags, ustensilsTags);
  
  yield 7;
  // affiche les tags dans le DOM -/- les fait disparaître
  handleTags();
  
  yield 8;
  // gère l'actualisation des bars de tags
  tagsActualized(recipes, ingredientsTags, appliancesTags, ustensilsTags);
}

// on initialise le générateur
const init = initGenerator();

for (let index = 0; index < 12; index++) {
  init.next();
}
