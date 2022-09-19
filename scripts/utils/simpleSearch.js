let ingredientsTagsActualized = [];
let appliancesTagsActualized = [];
let ustensilsTagsActualized = [];

export function simpleSearch(
  recipe,
  ingredientsTags,
  appliancesTags,
  ustensilsTags
) {
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
        console.log(articleID);

        // GESTION DES TAGS
        const ingredientsList = articleID.querySelectorAll(".ingredientsList");
        const appliancesList = articleID.querySelectorAll(".appliancesList");
        const ustensilsList = articleID.querySelectorAll(".ustensilsList");

        // on vérifie si les tags sont déjà dans les tableaux
        // si ce n'est pas le cas, on les ajoute
        recipe.ingredients.forEach((ingredient) => {
          if (!ingredientsTagsActualized.includes(ingredient.ingredient)) {
            ingredientsTagsActualized.push(ingredient.ingredient);
          }
        });
        if (!appliancesTagsActualized.includes(recipe.appliance)) {
          appliancesTagsActualized.push(recipe.appliance);
        }
        recipe.ustensils.forEach((ustensil) => {
          if (!ustensilsTagsActualized.includes(ustensil)) {
            ustensilsTagsActualized.push(ustensil);
          }
        });

        // ON supprime les doublons puis tri les tableaux
        ingredientsTagsActualized = [
          ...new Set(ingredientsTagsActualized),
        ].sort();
        appliancesTagsActualized = [
          ...new Set(appliancesTagsActualized),
        ].sort();
        // on enlève les doublons ustensiles puis local compare pour trier
        ustensilsTagsActualized = [...new Set(ustensilsTagsActualized)].sort(
          (a, b) => a.localeCompare(b)
        );

        // on vide les listes
        ingredientsList.innerHTML = "";
        appliancesList.innerHTML = "";
        ustensilsList.innerHTML = "";

        // on affiche les tags dans le DOM
        ingredientsTagsActualized.forEach((ingredient) => {
          ingredientsList.innerHTML += `
          <p class="cursor-pointer ingredientsList">${ingredient}</p>
          `;
        });
        appliancesTagsActualized.forEach((appliance) => {
          appliancesList.innerHTML += `
          <p class="cursor-pointer appliancesList">${appliance}</p>
          `;
        });
        ustensilsTagsActualized.forEach((ustensil) => {
          ustensilsList.innerHTML += `
          <p class="cursor-pointer ustensilsList">${ustensil}</p>
          `;
        });
      } else {
        // sinon on la cache
        articleID.style.display = "none";
      }
      // PARTIE ACTUALISATION TAGS
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

export {
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized,
};
