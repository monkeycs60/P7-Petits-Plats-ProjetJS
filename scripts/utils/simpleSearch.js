let ingredientsTagsActualized = [];
let appliancesTagsActualized = [];
let ustensilsTagsActualized = [];

export function simpleSearch(recipe) {
  // on écoute la barre de recherche principale
  const searchInput = document.querySelector("#mainSearch");
  // on définit l'article contenant la recette
  const articleID = document.getElementById(recipe.id);
  // on définit les tableaux contenant les tags actualisés


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



        // on actualise les tableaux de tags
        const preciseIngredients =
          articleID.querySelectorAll(".preciseIngredient");
        const ustensilActualized = articleID.querySelector(".ustensilTag");
        const applianceActualized = articleID.querySelector(".applianceTag");
       
       const ustensilActualizedText = ustensilActualized.textContent;
        ustensilsTagsActualized.push(ustensilActualizedText);
        const applianceActualizedText = applianceActualized.textContent;
        appliancesTagsActualized.push(applianceActualizedText);
        preciseIngredients.forEach((ingredient) => {
          const ingredientActualizedText = ingredient.textContent;
          ingredientsTagsActualized.push(ingredientActualizedText);
        });
      
        // on enlève les doublons
        ingredientsTagsActualized = [...new Set(ingredientsTagsActualized)];
        appliancesTagsActualized = [...new Set(appliancesTagsActualized)];
        ustensilsTagsActualized = [...new Set(ustensilsTagsActualized)];

        // on classe
        ingredientsTagsActualized.sort();
        appliancesTagsActualized.sort();
        // locale compare sort
        ustensilsTagsActualized.sort((a, b) =>
          a.localeCompare(b, "fr", { sensitivity: "base" })
        );
        console.log(ingredientsTagsActualized, appliancesTagsActualized, ustensilsTagsActualized);
        
    



      } else {
        // sinon on la cache
        articleID.style.display = "none";
      }
    
    } else {
      // si la valeur du champ de recherche est inférieure à 3 caractères
      // on affiche toutes les recettes
      articleID.style.display = "flex";
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
