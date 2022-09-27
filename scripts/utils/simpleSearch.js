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
      recipes.forEach((recipe) => {
        // on affiche la recette
        if (
          recipe.name.includes(searchInputValue) ||
          recipe.description.includes(searchInputValue) ||
          recipe.ingredients.includes(searchInputValue)
        ) {
          document.getElementById(recipe.id).style.display = "flex";
          // push its tags in the tags arrays
          ingredientsTagsActualized.push(recipe.ingredients);
          appliancesTagsActualized.push(recipe.appliance);
          ustensilsTagsActualized.push(recipe.ustensils);
        } else {
          document.getElementById(recipe.id).style.display = "none";
        }
      });

      // partie actualisation TAGS INGREDIENTS
      ingredientsTagsActualized = ingredientsTagsActualized.flat();
      const flatIngredients = [];
      ingredientsTagsActualized.forEach((ingredient) => {
        flatIngredients.push(ingredient.ingredient);
      });
      ingredientsTagsActualized = flatIngredients;
      ingredientsTagsActualized = [
        ...new Set(ingredientsTagsActualized),
      ].sort();

      // partie actualisation TAGS APPLIANCES
      appliancesTagsActualized = [...new Set(appliancesTagsActualized)].sort();

      // partie actualisation TAGS USTENSILS
      ustensilsTagsActualized = ustensilsTagsActualized.flat();
      ustensilsTagsActualized = ustensilsTagsActualized.map(
        (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
      );
      ustensilsTagsActualized = [...new Set(ustensilsTagsActualized)].sort(
        (a, b) => a.localeCompare(b)
      );

      const ingredientList = document.querySelector(".ingredients");
      const applianceList = document.querySelector(".appliances");
      const ustensilList = document.querySelector(".ustensils");

      //display none for ingredientList children textcontent if they are not in ingredientsTagsActualized
      ingredientList.childNodes.forEach((child) => {
        if (!ingredientsTagsActualized.includes(child.textContent)) {
          child.style.display = "none";
        } else {
          child.style.display = "block";
        }
      });

      //display none for applianceList children textcontent if they are not in appliancesTagsActualized
      applianceList.childNodes.forEach((child) => {
        if (!appliancesTagsActualized.includes(child.textContent)) {
          child.style.display = "none";
        } else {
          child.style.display = "block";
        }
      });

      //display none for ustensilList children textcontent if they are not in ustensilsTagsActualized
      ustensilList.childNodes.forEach((child) => {
        if (!ustensilsTagsActualized.includes(child.textContent)) {
          child.style.display = "none";
        } else {
          child.style.display = "block";
        }
      });
   


      // on vide les tableaux de tags
      ingredientsTags = ingredientsTagsActualized;
      appliancesTags = appliancesTagsActualized;
      ustensilsTags = ustensilsTagsActualized;

      // on vide les tableaux pour la prochaine recherche
      ingredientsTagsActualized = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];
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
  ustensilsTagsActualized
};
