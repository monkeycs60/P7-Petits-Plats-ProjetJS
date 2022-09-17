// branche v1 moderne

export function simpleSearch(recipe) {
  // on écoute la barre de recherche principale
  const searchInput = document.querySelector("#mainSearch");
  // on définit l'article contenant la recette
  const articleID = document.getElementById(recipe.id);

  // event listener sur le champ de recherche
  searchInput.addEventListener("keyup", (event) => {
    // on récupère la valeur du champ de recherche
    const searchInputValue = event.target.value.toLowerCase();
    // on récupère le contenu de la recette
    const recipeContent = recipe.ingredients
      .map((ingredient) => ingredient.ingredient)
      .concat(recipe.name)
      .concat(recipe.description)
      .join(" ")
      .toLowerCase();

    // la recherche commence à partir de 3 caractères - 1er CONDITION
    if (searchInputValue.length > 2) {
      // on compare la valeur du champ de recherche avec le contenu de la recette
      // 2nd CONDITION
      if (recipeContent.includes(searchInputValue)) {
        // si le contenu de la recette contient la valeur du champ de recherche
        // on affiche la div de la recette
        articleID.style.display = "flex";
      } else {
        // sinon on la cache
        articleID.style.display = "none";
      }
    } else {
      // si la valeur du champ de recherche est inférieure à 3 caractères
      // on affiche toutes les recettes
      articleID.style.display = "flex";
    }
    // if there is no card to display we display an error message
    const noCard = document.querySelector(".no-result");
    const cards = document.querySelectorAll("article");
    const cardsArray = Array.from(cards);
    const cardsDisplayed = cardsArray.filter((card) => card.style.display === "flex");
    if (cardsDisplayed.length === 0) {
      noCard.style.display = "flex";
    } else {
      noCard.style.display = "none";
    }
  });
}
