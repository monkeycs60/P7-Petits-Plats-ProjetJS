// branche v1 moderne

export function simpleSearch(recipe) {
    // on écoute la barre de recherche principale
    const searchInput = document.querySelector("#mainSearch");
   
// event listener sur le champ de recherche
 searchInput.addEventListener("keyup", (event) => {
   // on récupère la valeur du champ de recherche
   const searchInputValue = event.target.value.toLowerCase();
   // on récupère le contenu de la recette
   const recipeContent = recipe.ingredients
     .map((ingredient) => ingredient.ingredient)
     .concat(recipe.appliance)
     .concat(recipe.ustensils)
     .join(" ")
     .toLowerCase();
   // on compare la valeur du champ de recherche avec le contenu de la recette
   if (recipeContent.includes(searchInputValue)) {
     // si le contenu de la recette contient la valeur du champ de recherche
     // on affiche la div de la recette
        document.getElementById(recipe.id).style.display = "flex";
   } else {
     // sinon on la cache
        document.getElementById(recipe.id).style.display = "none";
   }
 });
    
 }
    
   