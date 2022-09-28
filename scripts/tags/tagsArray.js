let ingredientsTags = [];
let appliancesTags = [];
let ustensilsTags = [];

export function creatingTagsArrays(recipes) {
  // construction des 3 tableaux de tags

  // INGREDIENTS

  const allIngredientsArray = recipes
    .map((recipe) => recipe.ingredients)
    .flat()
    // map ingredient with first letter uppercase
    .map((ingredient) => {
      return    ingredient.ingredient.charAt(0).toUpperCase() +
        ingredient.ingredient.slice(1);
    })
    .sort((a, b) => a.localeCompare(b));
  const allUniqueIngredientsArray = [...new Set(allIngredientsArray)];
  ingredientsTags = allUniqueIngredientsArray;

  // APPLIANCES

  const allAppliancesArray = recipes.map((recipe) => recipe.appliance).sort();
  const allUniqueAppliancesArray = [...new Set(allAppliancesArray)];
  appliancesTags = allUniqueAppliancesArray;

  // USTENSILS

  const allUstensilsArray = recipes
    .map((recipe) => recipe.ustensils)
    .flat()
    .sort();
  const allUniqueUstensilsArray = [...new Set(allUstensilsArray)];

  ustensilsTags = allUniqueUstensilsArray
    .map((ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
    .sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
}
export { ingredientsTags, appliancesTags, ustensilsTags };