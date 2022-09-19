import { hideChevron } from "./cosmetic/chevronHide.js";
import { recipeCardFactory } from "./factory/recipeCardFactory.js";
import { ingredientsTags, 
          appliancesTags,
          ustensilsTags, 
  creatingTagsArrays } from "./tags/TagsArray.js";
import { tagsListsContent } from "./tags/tagsListsContent.js";
import { handleTags } from "./tags/displayTags.js";
import { simpleSearch } from "./utils/simpleSearch.js";
// import { tagsActualized } from "./tags/tagsActualized.js";

// on cache les chevrons up en JS
hideChevron();

// Generator Function
async function* initGenerator() {
  // on définit les tableaux contenant les tags

  console.log("cc");

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
  // gère le contenu des tags
  tagsListsContent(ingredientsTags, appliancesTags, ustensilsTags);

  yield 4;
  // affiche les tags dans le DOM -/- les fait disparaître
  handleTags();
  
  yield 5;
  // création des cartes recettes & tri simple
  recipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory(recipe);
    const cardContent = recipeCard.createRecipeCard();
    document.getElementById("recipe-grid").appendChild(cardContent);
    simpleSearch(recipe);
  });
  
  yield 6;
}

// on initialise le générateur
const init = initGenerator();

for (let index = 0; index < 12; index++) {
  init.next();
}
