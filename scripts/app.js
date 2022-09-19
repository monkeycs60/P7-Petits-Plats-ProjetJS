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



// Generator Function
async function* initGenerator() {
  // on définit les tableaux contenant les tags

  // le FETCH
  const response = await fetch("./../data/recipes.json");
  const data = await response.json();

  yield 1;
  // récupération des recettes
  const { recipes } = data;
  console.log(recipes);

  yield 2;
  // création des tags
  creatingTagsArrays(recipes);
  
  yield 3;
  // création des cartes recettes & tri simple
  recipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory(recipe);
    const cardContent = recipeCard.createRecipeCard();
    document.getElementById("recipe-grid").appendChild(cardContent);
    simpleSearch(recipe);
    // filtrer le tableau des tags actualisés
    // tout affecter à ingredientsTags (=)
  });

  yield 4;
  // gère le contenu des tags
  tagsListsContent(ingredientsTags, appliancesTags, ustensilsTags);

  yield 5;
  // affiche les tags dans le DOM -/- les fait disparaître
  handleTags();


}

// on initialise le générateur
const init = initGenerator();

for (let index = 0; index < 12; index++) {
  init.next();
}
