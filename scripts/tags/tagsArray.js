let ingredientsTags = [];
let appliancesTags = [];
let ustensilsTags = [];


export function creatingTagsArrays(recipes) {
  // construction des 3 tableaux de tags

  // INGREDIENTS

  const allIngredientsArray = recipes
    .map((recipe) => recipe.ingredients)
    .flat()
    .map((ingredient) => ingredient.ingredient)
    .sort();
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



// export function creatingTagsArrays() {

//   // on définit les constantes pour récupérer les données tags à l'intérieur des cards recettes
//   const ingredientsInArticle = document.querySelectorAll(".preciseIngredient");
//   const appliancesInArticle = document.querySelectorAll(".applianceTag");
//   const ustensilsInArticle = document.querySelectorAll(".ustensilTag");

//   ingredientsInArticle.forEach((ingredient) => {
//     ingredientsTags.push(ingredient.textContent);
//   });
//   appliancesInArticle.forEach((appliance) => {
//     appliancesTags.push(appliance.textContent);
//   });
//   ustensilsInArticle.forEach((ustensil) => {
//     ustensilsTags.push(ustensil.textContent);
//   });

//   // on enlève les doublons
//   ingredientsTags = [...new Set(ingredientsTags)];
//   appliancesTags = [...new Set(appliancesTags)];
//   ustensilsTags = [...new Set(ustensilsTags)];
//   // on classe les tags par ordre alphabétique
//   ingredientsTags.sort();
//   appliancesTags.sort();
//   // on met la première lettre en majuscule ustensiles
//   ustensilsTags = ustensilsTags.map(
//     (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
//   );
//   // on sort les ustensiles avec localeCompare
//   ustensilsTags.sort((a, b) => a.localeCompare(b));
  
//   return ingredientsTags, appliancesTags, ustensilsTags;
// }

// export { ingredientsTags, appliancesTags, ustensilsTags };
