// récupère les tags des recettes affichées dans le DOM
function getAllItems(article, DOMClass, fullArray) {
  const ItemsInDOM = Array.from(article.querySelectorAll(DOMClass));
  ItemsInDOM.forEach((item) => {
    fullArray.push(item.textContent.toLocaleLowerCase());
  });
}

// Récupère les éléments individuels (chaque ingrédient, ustensil, appareil)
function GetIndividualItemsFromArticle(originalArray, filteredArray) {
  originalArray.forEach((item) => {
    filteredArray.push(
      item.textContent.charAt(0).toUpperCase() + item.textContent.slice(1)
    );
  });
}

// Formate le tableau (supprime les doublons, trie, maj)
function normalizeArray(array) {
  array = [...new Set(array)].sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" })
  );
  array = array
    .map((item) => item.toLocaleLowerCase())
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
  return array;
}

// Gère l'affichage des tags
function displayTags(tags, tagsActualized) {
  tags.forEach((tag) => {
    if (tagsActualized.includes(tag.textContent)) {
      tag.style.display = "block";
    } else {
      tag.style.display = "none";
    }
  });
}

// Supprime les tags déjà sélectionnés des tags affichés
function deleteTagClicked(tagsArrayFilter, itemsList) {
  tagsArrayFilter.forEach((tag) => {
    itemsList.forEach((itemTag) => {
      if (itemTag.textContent === tag) {
        itemTag.style.display = "none";
      }
    });
  });
}

// Réaffiche tous les tags
function displayEveryTags(tagList) {
  tagList.forEach((tag) => {
    tag.style.display = "block";
  });
}

// Fonction principale
export function killTags(
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  recipes,
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized,
  tagsArrayFilter
) {
  // écoute la croix de chaque tag affiché dans le tag area
  const killCross = document.querySelectorAll(".killcross");
  killCross.forEach((cross) => {
    cross.addEventListener("click", () => {
      ingredientsTagsActualized = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];

      let ingredientsFilteredTags = [];
      let appliancesFilteredTags = [];
      let ustensilsFilteredTags = [];

      // on supprime le tag du tableau des tags sélectionnés
      tagsArrayFilter.splice(
        tagsArrayFilter.indexOf(cross.previousSibling.textContent),
        1
      );

      // on supprime le tag du DOM
      cross.parentNode.remove();

      const allArticles = Array.from(document.querySelectorAll("article"));

      allArticles.forEach((article) => {
        // les 3 champs de la recherche avancée
        let allIngredients = [];
        let allAppliances = [];
        let allUstensils = [];

        getAllItems(article, ".preciseIngredient", allIngredients);
        getAllItems(article, ".applianceTag", allAppliances);
        getAllItems(article, ".ustensilTag", allUstensils);

        // le reste de l'article (description & titre)
        const articleDescription =
          article.querySelector(".recipe-title").textContent;
        const articleTitle = article.querySelector(".description").textContent;
        const articleIndividualIngredients = Array.from(
          article.querySelectorAll(".preciseIngredient")
        );
        const articleUstensilTag = Array.from(
          article.querySelectorAll(".ustensilTag")
        );
        const articleApplianceTag = Array.from(
          article.querySelectorAll(".applianceTag")
        );

        // il faut montrer les articles qui correspondent à l'input de 3 lettres, puis filtrer
        const inputValue = document.getElementById("mainSearch").value;

        // Le cas où l'INPUT est déjà rempli
        if (inputValue.length > 2) {
          // on affiche les articles qui correspondent à l'input
          if (
            articleDescription.includes(inputValue) ||
            articleTitle.includes(inputValue) ||
            allIngredients.includes(inputValue.toLocaleLowerCase())
          ) {
            article.style.display = "flex";

            GetIndividualItemsFromArticle(
              articleIndividualIngredients,
              ingredientsTagsActualized
            );
            GetIndividualItemsFromArticle(
              articleUstensilTag,
              ustensilsTagsActualized
            );
            GetIndividualItemsFromArticle(
              articleApplianceTag,
              appliancesTagsActualized
            );

            if (tagsArrayFilter.length > 0) {
              let tabIngredients = [];
              let tabAppliances = [];
              let tabUstensils = [];

              article.querySelectorAll(".preciseIngredient").forEach((tag) => {
                tabIngredients.push(
                  // tag textcontent first letter to uppercase
                  tag.textContent.charAt(0).toUpperCase() +
                    tag.textContent.toLocaleLowerCase().slice(1)
                );
              });
              article.querySelectorAll(".applianceTag").forEach((tag) => {
                tabAppliances.push(
                  tag.textContent.charAt(0).toUpperCase() +
                    tag.textContent.toLocaleLowerCase().slice(1)
                );
              });
              article.querySelectorAll(".ustensilTag").forEach((tag) => {
                tabUstensils.push(
                  tag.textContent.charAt(0).toUpperCase() +
                    tag.textContent.toLocaleLowerCase().slice(1)
                );
              });

              // if for each tag of tagsArrayfilter, there is a match in the tabIngredients, tabAppliances, tabUstensils then display the article
              function checkIfTagsMatch(tag) {
                return (
                  tabIngredients.includes(tag) ||
                  tabAppliances.includes(tag) ||
                  tabUstensils.includes(tag)
                );
              }

              let verifInclude = tagsArrayFilter.every(checkIfTagsMatch);

              if (verifInclude) {
                article.style.display = "flex";
                // push des tags dans les tableaux filtered tags
                GetIndividualItemsFromArticle(
                  articleIndividualIngredients,
                  ingredientsTagsActualized
                );
                GetIndividualItemsFromArticle(
                  articleUstensilTag,
                  ustensilsTagsActualized
                );
                GetIndividualItemsFromArticle(
                  articleApplianceTag,
                  appliancesTagsActualized
                );
              } else {
                article.style.display = "none";
              }
            }
          } else {
            article.style.display = "none";
          }
        } else {
          // si l'input est vide, on affiche tous les articles
          // on affiche tous les articles
          article.style.display = "flex";

          if (tagsArrayFilter.length > 0) {
            let tabIngredients = [];
            let tabAppliances = [];
            let tabUstensils = [];

            article.querySelectorAll(".preciseIngredient").forEach((tag) => {
              tabIngredients.push(
                // tag textcontent first letter to uppercase
                tag.textContent.charAt(0).toUpperCase() +
                  tag.textContent.toLocaleLowerCase().slice(1)
              );
            });
            article.querySelectorAll(".applianceTag").forEach((tag) => {
              tabAppliances.push(
                tag.textContent.charAt(0).toUpperCase() +
                  tag.textContent.toLocaleLowerCase().slice(1)
              );
            });
            article.querySelectorAll(".ustensilTag").forEach((tag) => {
              tabUstensils.push(
                tag.textContent.charAt(0).toUpperCase() +
                  tag.textContent.toLocaleLowerCase().slice(1)
              );
            });

            // if for each tag of tagsArrayfilter, there is a match in the tabIngredients, tabAppliances, tabUstensils then display the article
            function checkIfTagsMatch(tag) {
              return (
                tabIngredients.includes(tag) ||
                tabAppliances.includes(tag) ||
                tabUstensils.includes(tag)
              );
            }

            let verifInclude = tagsArrayFilter.every(checkIfTagsMatch);

            if (verifInclude) {
              article.style.display = "flex";
              // push des tags dans les tableaux filtered tags
              GetIndividualItemsFromArticle(
                articleIndividualIngredients,
                ingredientsTagsActualized
              );
              GetIndividualItemsFromArticle(
                articleUstensilTag,
                ustensilsTagsActualized
              );
              GetIndividualItemsFromArticle(
                articleApplianceTag,
                appliancesTagsActualized
              );
            } else {
              article.style.display = "none";
            }
          }
        }
      });

      const inputValue = document.getElementById("mainSearch").value;

      // Le cas où l'INPUT est déjà rempli
      if (inputValue.length > 2) {
        // on normalise les tableaux
        normalizeArray(ingredientsTagsActualized);
        normalizeArray(appliancesTagsActualized);
        normalizeArray(ustensilsTagsActualized);

        const ingredientsTagsAll = Array.from(
          document.querySelectorAll(".ingredientsTagsList")
        );
        const appliancesTagsAll = Array.from(
          document.querySelectorAll(".appliancesTagsList")
        );
        const ustensilsTagsAll = Array.from(
          document.querySelectorAll(".ustensilsTagsList")
        );

        displayTags(ingredientsTagsAll, ingredientsTagsActualized);
        displayTags(appliancesTagsAll, appliancesTagsActualized);
        displayTags(ustensilsTagsAll, ustensilsTagsActualized);

        if (tagsArrayFilter.length > 0) {
          // on normalise les tableaux
          normalizeArray(ingredientsFilteredTags);
          normalizeArray(appliancesFilteredTags);
          normalizeArray(ustensilsFilteredTags);

          // first letter capitalization ustensilsFilteredTags
          ustensilsFilteredTags.map(
            (tag) => tag.charAt(0).toUpperCase() + tag.slice(1)
          );

          // create const for ingredientstagslist, ustensilstagslist, appliancetagslist
          const ingredientsTagsList = Array.from(
            document.querySelectorAll(".ingredientsTagsList")
          );
          const appliancesTagsList = Array.from(
            document.querySelectorAll(".appliancesTagsList")
          );
          const ustensilsTagsList = Array.from(
            document.querySelectorAll(".ustensilsTagsList")
          );

          // on affiche les tags filtrés
          displayTags(ingredientsTagsList, ingredientsFilteredTags);
          displayTags(appliancesTagsList, appliancesFilteredTags);
          displayTags(ustensilsTagsList, ustensilsFilteredTags);

          deleteTagClicked(tagsArrayFilter, ingredientsTagsList);
          deleteTagClicked(tagsArrayFilter, appliancesTagsList);
          deleteTagClicked(tagsArrayFilter, ustensilsTagsList);
        }
      }
      // Le cas où l'INPUT est vide (actualisation normale de tous les tags)
      else {
        // on affiche tous les tags
        const ingredientsTagsAll = Array.from(
          document.querySelectorAll(".ingredientsTagsList")
        );
        const appliancesTagsAll = Array.from(
          document.querySelectorAll(".appliancesTagsList")
        );
        const ustensilsTagsAll = Array.from(
          document.querySelectorAll(".ustensilsTagsList")
        );

        displayEveryTags(ingredientsTagsAll);
        displayEveryTags(appliancesTagsAll);
        displayEveryTags(ustensilsTagsAll);

        if (tagsArrayFilter.length > 0) {
          // on normalise les tableaux
          normalizeArray(ingredientsTagsActualized);
          normalizeArray(appliancesTagsActualized);
          normalizeArray(ustensilsTagsActualized);

          const ingredientsTagsList = Array.from(
            document.querySelectorAll(".ingredientsTagsList")
          );
          const appliancesTagsList = Array.from(
            document.querySelectorAll(".appliancesTagsList")
          );
          const ustensilsTagsList = Array.from(
            document.querySelectorAll(".ustensilsTagsList")
          );

          displayTags(ingredientsTagsList, ingredientsTagsActualized);
          displayTags(appliancesTagsList, appliancesTagsActualized);
          displayTags(ustensilsTagsList, ustensilsTagsActualized);

          deleteTagClicked(tagsArrayFilter, ingredientsTagsList);
          deleteTagClicked(tagsArrayFilter, appliancesTagsList);
          deleteTagClicked(tagsArrayFilter, ustensilsTagsList);
        }
      }
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
  });
}
