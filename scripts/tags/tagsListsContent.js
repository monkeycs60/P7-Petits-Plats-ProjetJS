import { killTags } from "../utils/killTags.js";

let tagsArrayFilter = [];
let ingredientsDisplayed = [];
let appliancesDisplayed = [];
let ustensilsDisplayed = [];

// Filtrer les recettes en fonction des tags
function displayFilteredArticles(
  article,
  appliancesTagsActualized,
  ustensilsTagsActualized
) {
  article.style.display = "flex";
  // on récupère les ingrédients
  article.querySelectorAll(".preciseIngredient").forEach((ingredient) => {
    ingredientsDisplayed.push(ingredient.textContent);
  });
  // on récupère les appliances
  article.querySelectorAll(".applianceTag").forEach((appliance) => {
    appliancesTagsActualized.push(appliance.textContent);
  });
  // on récupère les ustensils
  article.querySelectorAll(".ustensilTag").forEach((ustensil) => {
    ustensilsTagsActualized.push(ustensil.textContent);
  });
}

// Fonction principale qui gère les tags
export function tagsListsContent(
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  recipes,
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized
) {
  // déclaration des constantes correspondant aux divs encadrant les tags
  const ingredients = document.querySelector("#ingredients");
  const appliances = document.querySelector("#appareils");
  const ustensils = document.querySelector("#ustensiles");

  // constantes contenant les tags
  const divIngredients = document.createElement("div");
  const divAppliances = document.createElement("div");
  const divUstensils = document.createElement("div");

  // ajouts des classes
  divIngredients.classList.add("full-list", "ingredients");
  divAppliances.classList.add("full-list", "appliances");
  divUstensils.classList.add("full-list", "ustensils");

  // the div content is the content of the array
  divIngredients.innerHTML = ingredientsTags
    .map(
      (ingredient) =>
        `<p class="cursor-pointer ingredientsTagsList itemsToListen">${ingredient}</p>`
    )
    .join("");
  divAppliances.innerHTML = appliancesTags
    .map(
      (appliance) =>
        `<p class="cursor-pointer appliancesTagsList itemsToListen">${appliance}</p>`
    )
    .join("");
  divUstensils.innerHTML = ustensilsTags
    .map(
      (ustensil) =>
        `<p class="cursor-pointer ustensilsTagsList itemsToListen">${ustensil}</p>`
    )
    .join("");

  // ajout des divs dans les divs encadrant les tags
  ingredients.appendChild(divIngredients);
  appliances.appendChild(divAppliances);
  ustensils.appendChild(divUstensils);

  const tagArea = document.querySelector(".tag-area");
  // on écoute les tags INGREDIENTS
  const itemsToListen = document.querySelectorAll(".itemsToListen");

  // on déclare les différentes listes de tags par catégorie
  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");
  const appliancesTagsList = document.querySelectorAll(".appliancesTagsList");
  const ustensilsTagsList = document.querySelectorAll(".ustensilsTagsList");

  // on écoute TOUS les tags
  itemsToListen.forEach((ingredientTags) => {
    ingredientTags.addEventListener("click", (event) => {
      // on reset les tableaux
      ingredientsTagsActualized = [];
      ingredientsDisplayed = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];

      // on récupère la valeur du tag
      const tagValue = event.target.innerHTML;

      if (event.target.classList.contains("ingredientsTagsList")) {
        tagArea.innerHTML += `<span class="tag cursor-pointer tagIngredients">${tagValue}<i class="fa-regular fa-circle-xmark killcross"></i></span>`;
      } else if (event.target.classList.contains("appliancesTagsList")) {
        tagArea.innerHTML += `<span class="tag cursor-pointer tagAppliances">${tagValue}<i class="fa-regular fa-circle-xmark killcross"></i></span>`;
      } else if (event.target.classList.contains("ustensilsTagsList")) {
        tagArea.innerHTML += `<span class="tag cursor-pointer tagUstensils">${tagValue}<i class="fa-regular fa-circle-xmark killcross"></i></span>`;
      }

      // on supprime le tag de la liste
      event.target.style.display = "none";

      // on récupère les articles
      const article = document.querySelectorAll("article");
      const articleArray = Array.from(article);

      // on récupère les tags
      const tags = document.querySelectorAll(".tag");
      const tagsArray = Array.from(tags);

      // on récupère les valeurs des tags
      const tagsValues = tagsArray.map((tag) => tag.textContent);

      // sélection du dernier tag ajouté au tableau
      const lastTagValue = tagsValues[tagsValues.length - 1];

      // sélectionne le dernier enfant de la liste des tags
      const lastTag = tagArea.lastChild;

      // on filtre les recettes qui contiennent le ou les tags
      articleArray.forEach((UniqueArticle) => {
        if (UniqueArticle.style.display !== "none") {
          let ingredientsTab = [];
          let ustensilsTab = [];
          UniqueArticle.querySelectorAll(".preciseIngredient").forEach(
            (ingredient) => {
              ingredientsTab.push(ingredient.textContent);
            }
          );
          UniqueArticle.querySelectorAll(".ustensilTag").forEach((ustensil) =>
            ustensilsTab.push(ustensil.textContent)
          );
          // Si le dernier tag ajouté correspond à un des éléments INGREDIENTS de la recette, on affiche la recette
          if (
            lastTag.classList.contains("tagIngredients") &&
            ingredientsTab.includes(lastTagValue)
          ) {
            displayFilteredArticles(
              UniqueArticle,
              appliancesTagsActualized,
              ustensilsTagsActualized
            );
          } // Si le dernier tag ajouté correspond à un des éléments USTENSILS de la recette, on affiche la recette
          else if (
            lastTag.classList.contains("tagUstensils") &&
            ustensilsTab.includes(lastTagValue.toLocaleLowerCase())
          ) {
            displayFilteredArticles(
              UniqueArticle,
              appliancesTagsActualized,
              ustensilsTagsActualized
            );
          } // Si le dernier tag ajouté correspond à un des éléments APPLIANCES de la recette, on affiche la recette
          else if (
            lastTag.classList.contains("tagAppliances") &&
            UniqueArticle.querySelector(".applianceTag").textContent ===
              lastTagValue
          ) {
            displayFilteredArticles(
              UniqueArticle,
              appliancesTagsActualized,
              ustensilsTagsActualized
            );
          } else {
            UniqueArticle.style.display = "none";
          }
        } else {
          UniqueArticle.style.display = "none";
        }
      });

      // on récupère les tags des recettes affichées
      function onlyDisplayMatchingTags(
        newItemsDisplayed,
        itemTagList,
        lastArrayActualized
      ) {
        newItemsDisplayed = [...new Set(newItemsDisplayed)];
        newItemsDisplayed = newItemsDisplayed.map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1)
        );

        itemTagList.forEach((itemTag) => {
          if (!newItemsDisplayed.includes(itemTag.textContent)) {
            itemTag.style.display = "none";
          }
        });

        tagsValues.forEach((tagValueUnique) => {
          itemTagList.forEach((itemTag) => {
            if (itemTag.textContent === tagValueUnique) {
              itemTag.style.display = "none";
            }
          });
        });
        newItemsDisplayed.forEach((item) => {
          lastArrayActualized.push(item);
        });
      }

      onlyDisplayMatchingTags(
        ingredientsDisplayed,
        ingredientsTagsList,
        ingredientsTagsActualized
      );

      onlyDisplayMatchingTags(
        appliancesTagsActualized,
        appliancesTagsList,
        appliancesDisplayed
      );

      onlyDisplayMatchingTags(
        ustensilsTagsActualized,
        ustensilsTagsList,
        ustensilsDisplayed
      );

      // Quand un tag appliance est sélectionné, cache tous les autres (car 1 recette = 1 appliance)
      const applianceTagsDisplayed =
        document.querySelectorAll(".tagAppliances");
      if (applianceTagsDisplayed.length > 0) {
        appliancesTagsList.forEach((applianceTags) => {
          applianceTags.style.display = "none";
        });
      }

      tagsArrayFilter.push(tagValue);

      // Appelle la fonction qui supprime le tag
      killTags(
        ingredientsTags,
        appliancesTags,
        ustensilsTags,
        recipes,
        ingredientsTagsActualized,
        appliancesTagsActualized,
        ustensilsTagsActualized,
        tagsArrayFilter
      );
    });
  });
}

export {
  tagsArrayFilter,
  ingredientsDisplayed,
  ustensilsDisplayed,
  appliancesDisplayed,
};
