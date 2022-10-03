import { tagsActualized } from "./refreshTags.js";

let ingredientsTagsActualized = [];
let appliancesTagsActualized = [];
let ustensilsTagsActualized = [];

export function simpleSearch(
  recipes,
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  tagsArrayFilter,
  ingredientsTagsActualized,
  ingredientsDisplayed
) {
  // on écoute la barre de recherche principale
  const searchInput = document.querySelector("#mainSearch");
  const allArticlesInArray = Array.from(document.querySelectorAll("article"));

  // création d'un nouveau tableau pour les ingrédients filtrés
  let ingredientsTagsActualizedSecond = [];

  // event listener sur le champ de recherche
  searchInput.addEventListener("keyup", (event) => {
    // on récupère la valeur du champ de recherche
    const searchInputValue = event.target.value.toLowerCase();
    // la recherche commence à partir de 3 caractères - 1er CONDITION
    if (searchInputValue.length > 2) {
      allArticlesInArray.forEach((article) => {
        const articleTitle = article.querySelector("h2").textContent;
        const ingredientsArrayArticle = [];
        const articleIngredients =
          article.querySelectorAll(".preciseIngredient");
        articleIngredients.forEach((ingredient) => {
          ingredientsArrayArticle.push(ingredient.textContent);
        });
        const articleDescription =
          article.querySelector(".description").textContent;

        // hidden datas
        const articleAppliance =
          article.querySelector(".applianceTag").textContent;
        const articleUstensils = article.querySelectorAll(".ustensilTag");

        if (
          articleTitle.toLowerCase().includes(searchInputValue.toLowerCase()) ||
          ingredientsArrayArticle.some((ingredient) =>
            ingredient.toLowerCase().includes(searchInputValue.toLowerCase())
          ) ||
          articleDescription
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
        ) {
          article.style.display = "flex";

          // on push les ingrédients dans ingredientsTagsActualized
          ingredientsArrayArticle.forEach((ingredient) => {
            ingredientsTagsActualized.push(ingredient);
          });
          // on push les appareils dans appliancesTagsActualized
          appliancesTagsActualized.push(articleAppliance);
          // on push les ustensiles dans ustensilsTagsActualized
          articleUstensils.forEach((ustensil) => {
            ustensilsTagsActualized.push(ustensil.textContent);
          });
          console.log(appliancesTagsActualized);
          console.log(ustensilsTagsActualized);
          console.log(ingredientsTagsActualized);

          console.log(tagsArrayFilter);

          if (tagsArrayFilter.length > 0) {

            console.log("il y a des tags");

          if (
             // article textcontent does not contain all the tags
            !tagsArrayFilter.every((tag) =>
              article.textContent.toLocaleLowerCase().includes(tag.toLowerCase())
            ) 
            ) {
              console.log("on cache l'article");
              console.log(article);
              article.style.display = "none";
              console.log(article.textContent);
            }
          }
          }
        
        //     // if tag is not include in the article, we hide it
        //     tagsArrayFilter.forEach((tag) => {
        //     if (
        //       !tagsArrayFilter.some((tag) =>
        //         articleTitle.toLowerCase().includes(tag.toLowerCase())
        //       ) &&
        //       !tagsArrayFilter.some((tag) =>
        //         ingredientsArrayArticle.some((ingredient) =>
        //           ingredient.toLowerCase().includes(tag.toLowerCase())
        //         )
        //       ) &&
        //       !tagsArrayFilter.some((tag) =>
        //         articleDescription.toLowerCase().includes(tag.toLowerCase())
        //       )
        //     ) {
        //       console.log("on cache l'article");
        //       console.log(article);
        //       article.style.display = "none";
        //     }
        //   }
        // } else {
        //   article.style.display = "none";
        // }
      });
      console.log(appliancesTagsActualized);
      console.log(ustensilsTagsActualized);
      console.log(ingredientsTagsActualized);

      // on compare la valeur du champ de recherche avec le contenu de la recette
      // recipes.forEach((recipe) => {
      //   // on récupère tous les ingrédients de la recette en question

      //     // if tagsArrayFilter.length > 0, display none the recipes that don't have the tags in the tagsArrayFilter
      //     if (tagsArrayFilter.length > 0) {
      //       console.log("milieu de la recherche");
      //       console.log(tagsArrayFilter);
      //       const filteredRecipesIng = [];
      //       recipe.ingredients.forEach((ingredient) => {
      //         filteredRecipesIng.push(ingredient.ingredient.toLowerCase());
      //       });
      //       console.log(filteredRecipesIng);

      //       tagsArrayFilter.forEach((tag) => {
      //         if (
      //           !recipe.name.toLowerCase().includes(tag.toLowerCase()) &&
      //           !recipe.description.toLowerCase().includes(tag.toLowerCase()) &&
      //           !filteredRecipesIng.includes(tag.toLowerCase())
      //         ) {
      //           document.getElementById(recipe.id).style.display = "none";
      //           console.log("fin de la recherche");
      //         } else {
      //           // push les tags dans le tableau des tags
      //           recipe.ingredients.forEach((ingredient) => {
      //             ingredientsTagsActualizedSecond.push(
      //               ingredient.ingredient.toLowerCase()
      //             );
      //           });
      //         }
      //       });
      //     }
      //   } else {
      //     document.getElementById(recipe.id).style.display = "none";
      //   }
      // });
      console.log(ingredientsTagsActualizedSecond);

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

      if (tagsArrayFilter.length > 0) {
        const tagArea = document.querySelector(".tag-area");
        // On actualise le tableau en retirant les tags déjà cliqués
        ingredientsTagsActualizedSecond.forEach((tag) => {
          tagArea.childNodes.forEach((child) => {
            if (
              child.textContent.toLocaleLowerCase() === tag.toLocaleLowerCase()
            ) {
              ingredientsTagsActualizedSecond.splice(
                ingredientsTagsActualizedSecond.indexOf(tag),
                1
              );
            }
          });
        });
        // display none for ingredientList children textcontent if they are not in ingredientsTagsActualizedSecond
        ingredientList.childNodes.forEach((child) => {
          if (
            !ingredientsTagsActualizedSecond.includes(
              child.textContent.toLocaleLowerCase()
            )
          ) {
            child.style.display = "none";
          }
        });
        tagArea.childNodes.forEach((tagAlreadyUsed) => {
          if (
            ingredientsTagsActualizedSecond.includes(
              tagAlreadyUsed.textContent.toLocaleLowerCase()
            )
          ) {
            // display none for the tag for the ingredient if it is already used
          }
        });
      }
      // on vide les tableaux pour la prochaine recherche
      ingredientsTagsActualized = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];
      ingredientsTagsActualizedSecond = [];
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
        console.log(ingredientsDisplayed);
        const article = document.querySelectorAll("article");

        const articleArray = Array.from(article);
        console.log("on lance l'autre boucle");

        articleArray.forEach((article) => {
          if (
            tagsArrayFilter.every((tagValue) =>
              article.textContent.includes(tagValue)
            )
          ) {
            article.style.display = "flex";
          } else {
            article.style.display = "none";
          }
        });

        // on actualise les tags
        const tagArea = document.querySelector(".tag-area");
        const ingredientsEntiers = document.querySelectorAll(
          ".ingredientsTagsList"
        );
        // On actualise le tableau en retirant les tags déjà cliqués
        ingredientsDisplayed.forEach((tag) => {
          tagArea.childNodes.forEach((child) => {
            if (
              child.textContent.toLocaleLowerCase() === tag.toLocaleLowerCase()
            ) {
              ingredientsDisplayed.splice(ingredientsDisplayed.indexOf(tag), 1);
            }
          });
        });
        ingredientsDisplayed.forEach((itemsTag) => {
          // tolocaleLowerCase
          itemsTag = itemsTag.toLocaleLowerCase();
          console.log(itemsTag);
          // display none for the tag for the ingredient if it is already used

          ingredientsEntiers.forEach((child) => {
            if (
              itemsTag.toLocaleLowerCase() ===
              child.textContent.toLocaleLowerCase()
            ) {
            } else {
              child.style.display = "none";
            }
          });
        });
      }
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
