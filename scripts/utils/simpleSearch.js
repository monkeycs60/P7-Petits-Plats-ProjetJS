import { tagsActualized } from "./refreshTags.js";

let ingredientsTagsActualized = [];
let appliancesTagsActualized = [];
let ustensilsTagsActualized = [];

export function simpleSearch(
  recipes,
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  tagsArrayFilter
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

        //on récupère tous les ingrédients de la recette en question
        let recipeIngredientList = [];
        recipe.ingredients.forEach((ingredient) => {
          recipeIngredientList.push(ingredient.ingredient);
        });
        recipeIngredientList = recipeIngredientList.map((ingredient) =>
          ingredient.toLowerCase()
        );


        // si la valeur saisie dans l'input est présente dans la card recette, alors l'affiche 
        if (
          recipe.name.includes(searchInputValue) ||
          recipe.description.includes(searchInputValue) ||
          recipeIngredientList.includes(searchInputValue)
        ) {
          document.getElementById(recipe.id).style.display = "flex";
          // push its tags in the tags arrays
          ingredientsTagsActualized.push(recipe.ingredients);
          appliancesTagsActualized.push(recipe.appliance);
          ustensilsTagsActualized.push(recipe.ustensils);

          // if tagsArrayFilter.length > 0, display none the recipes that don't have the tags in the tagsArrayFilter
          if (tagsArrayFilter.length > 0) {
            tagsArrayFilter.forEach((tag) => {
              if (
                !recipe.name.includes(tag) &&
                !recipe.description.includes(tag) &&
                !recipe.ingredients.includes(tag)
              ) {
                document.getElementById(recipe.id).style.display = "none";
              }
            });
          }
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

      // display none for ingredientList children textcontent if they are not in ingredientsTagsActualized
      ingredientList.childNodes.forEach((child) => {
        if (!ingredientsTagsActualized.includes(child.textContent)) {
          child.style.display = "none";
        } else {
          child.style.display = "block";
        }
      });

      // display none for applianceList children textcontent if they are not in appliancesTagsActualized
      applianceList.childNodes.forEach((child) => {
        if (!appliancesTagsActualized.includes(child.textContent)) {
          child.style.display = "none";
        } else {
          child.style.display = "block";
        }
      });

      // display none for ustensilList children textcontent if they are not in ustensilsTagsActualized
      ustensilList.childNodes.forEach((child) => {
        if (!ustensilsTagsActualized.includes(child.textContent)) {
          child.style.display = "none";
        } else {
          child.style.display = "block";
        }
      });

      // on insère les fonctions TAGS ici (avec le tableau de tags actualisé en paramètre)

      // tagsActualized(recipes, ingredientsTagsActualized, appliancesTagsActualized, ustensilsTagsActualized, ingredientsTags, appliancesTags, ustensilsTags);

      // on vide les tableaux pour la prochaine recherche
      ingredientsTagsActualized = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];
    } else {
      // Si la saisie est < 2 caractères, alors on n'affiche que les recettes filtrées par tags SINON on affiche tout
   
        // RESET LE CHAMP DES TAGS quand la recherche < 3 caractères
        // on affiche toutes les recettes
        recipes.forEach((recipe) => {
          document.getElementById(recipe.id).style.display = "flex";
        });

        const ingredientList = document.querySelector(".ingredients");
        const applianceList = document.querySelector(".appliances");
        const ustensilList = document.querySelector(".ustensils");
        ingredientList.childNodes.forEach((child) => {
          child.style.display = "block";
        });
        applianceList.childNodes.forEach((child) => {
          child.style.display = "block";
        });
        ustensilList.childNodes.forEach((child) => {
          child.style.display = "block";
        });
      

        if (tagsArrayFilter.length > 0) {
          const article = document.querySelectorAll("article");
          article.forEach((article) => {
            if (article.textContent.includes(tagsArrayFilter)) {
              article.style.display = "flex";
            } else {
              article.style.display = "none";
            }
          });
        }

//  if (tagsArrayFilter.length > 0) {
//         console.log(tagsArrayFilter);
// let recipesFiltered = [];
//         recipes.forEach((recipe) => {
//           //on récupère tous les ingrédients de la recette en question
//           let recipeIngredientListTags = [];
//           recipe.ingredients.forEach((ingredient) => {
//             recipeIngredientListTags.push(ingredient.ingredient.toLowerCase());
//           });
//         console.log("coucoudrfsre");
//           // for each tags , to lower case
//           const tagsArrayFilterNew = tagsArrayFilter.map((tag) => tag.toLowerCase());
        
//           console.log(tagsArrayFilterNew);
//          console.log(recipeIngredientListTags);
//          console.log(tagsArrayFilterNew.includes(recipeIngredientListTags));

          




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
