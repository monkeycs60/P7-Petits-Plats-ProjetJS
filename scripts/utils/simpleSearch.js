let ingredientsTagsActualized = [];
let appliancesTagsActualized = [];
let ustensilsTagsActualized = [];

export function simpleSearch(
  recipes,
  ingredientsTags,
  appliancesTags,
  ustensilsTags
) {
  // on écoute la barre de recherche principale
  const searchInput = document.querySelector("#mainSearch");


  // event listener sur le champ de recherche
  searchInput.addEventListener("keyup", (event) => {
    // on récupère la valeur du champ de recherche
    const searchInputValue = event.target.value.toLowerCase();
  
    // la recherche commence à partir de 3 caractères - 1er CONDITION
    if (searchInputValue.length > 2) {
      // on compare la valeur du champ de recherche avec le contenu de la recette
      // 2nd CONDITION
     
        recipes.forEach((recipe) => {
          // on affiche la recette
          if (recipe.name.includes(searchInputValue) || recipe.description.includes(searchInputValue) || recipe.ingredients.includes(searchInputValue)) {
            document.getElementById(recipe.id).style.display = "flex";
          } else {
            document.getElementById(recipe.id).style.display = "none";
          }
        });
      

    
      // PARTIE ACTUALISATION TAGS
    } else {
      // display all recipes
      recipes.forEach((recipe) => {
        document.getElementById(recipe.id).style.display = "flex";
      });
    }

    // On gère l'affichage du message d'erreur si aucune card correspond à la recherche
    const noCard = document.querySelector(".no-result");
    const cards = document.querySelectorAll("article");
    const cardsArray = Array.from(cards);
    const cardsDisplayed = cardsArray.filter(
      (card) => card.style.display === "flex"
    );
    if (cardsDisplayed.length === 0) {
      noCard.style.display = "flex";
    } else {
      noCard.style.display = "none";
    }


    
  });

  
}

export {
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized,
};
