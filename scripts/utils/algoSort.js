export function sortingMethod() {
    async function reFetchRecipes() {
  await fetch("./../data/recipes.json")
    .then((response) => response.json())
    .then((data) => {
const { recipes } = data;
console.log(recipes);

let allIngredients = [];



recipes.forEach((recipe) => {
        const { name, ingredients, appliance, ustensils } = recipe;
        allIngredients.push(ingredients);
      });

      
      // PARTIE INGREDIENTS
      // applatit le tableau et renvoie tous les ingrédients dans un seul tableau d'objets
      const allIngredientsSimple = allIngredients.flat().map((ingredient) => {
        return ingredient.ingredient;
      });
      const allIngredientsSimpleUnique = [...new Set(allIngredientsSimple)].sort();
      console.log(allIngredientsSimpleUnique);
     
    })
}
reFetchRecipes();
}