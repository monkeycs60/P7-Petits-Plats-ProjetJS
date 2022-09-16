let ingredientsTags = [];

export function creatingTagsArrays(recipes) {
  // déclaration des constantes correspondant aux divs encadrant les tags

  const ingredients = document.querySelector("#ingredients");
  const appliances = document.querySelector("#appareils");
  const ustensils = document.querySelector("#ustensiles");

  // construction des 3 tableaux de tags

  // INGREDIENTS

  const allIngredientsArray = recipes
    .map((recipe) => recipe.ingredients)
    .flat()
    .map((ingredient) => ingredient.ingredient)
    .sort();
  const allUniqueIngredientsArray = [...new Set(allIngredientsArray)];

  ingredientsTags = allUniqueIngredientsArray;
}

export { ingredientsTags };
