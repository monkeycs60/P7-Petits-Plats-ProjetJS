const tagsArrayFilter = [];
  // on récupère les ingrédients des articles affichés
      let ingredientsDisplayed = [];

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
             tagArea.innerHTML += `<span class="tag cursor-pointer tagIngredients">${tagValue}<i class="fa-regular fa-circle-xmark"></i></span>`;
      } else if (event.target.classList.contains("appliancesTagsList")) {
        tagArea.innerHTML += `<span class="tag cursor-pointer tagAppliances">${tagValue}<i class="fa-regular fa-circle-xmark"></i></span>`;
      } else if (event.target.classList.contains("ustensilsTagsList")) {
        tagArea.innerHTML += `<span class="tag cursor-pointer tagUstensils">${tagValue}<i class="fa-regular fa-circle-xmark"></i></span>`;
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



      // on filtre les recettes qui contiennent le ou les tags
      articleArray.forEach((article) => {
        if (
          article.style.display !== "none" &&
          tagsValues.every((tagValue) =>
            article.textContent.toLowerCase().includes(tagValue.toLowerCase())
          )
        ) {
          article.style.display = "flex";
          article
            .querySelectorAll(".preciseIngredient")
            .forEach((ingredient) => {
              ingredientsDisplayed.push(ingredient.textContent);
            });
            // on récupère les appliances
         console.log(article);
         article
            .querySelectorAll(".applianceTag")
            .forEach((appliance) => {
              appliancesTagsActualized.push(appliance.textContent);
            });
            // on récupère les ustensils
          article
            .querySelectorAll(".ustensilTag")
            .forEach((ustensil) => {
              ustensilsTagsActualized.push(ustensil.textContent);
            });
        } else {
          article.style.display = "none";
        }
      });
console.log(ingredientsDisplayed);
console.log(appliancesTagsActualized);
console.log(ustensilsTagsActualized);

      // On enlève les doublons du tableau
      ingredientsDisplayed = [...new Set(ingredientsDisplayed)];
      appliancesTagsActualized = [...new Set(appliancesTagsActualized)];
      ustensilsTagsActualized = [...new Set(ustensilsTagsActualized)];

      // on affiche uniquement les tags qui correspondent aux ingrédients affichés
      ingredientsTagsList.forEach((ingredientTags) => {
        if (ingredientsDisplayed.includes(ingredientTags.textContent)) {
          ingredientTags.style.display = "block";
          ingredientsTagsActualized.push(ingredientTags.textContent);
        } else {
          ingredientTags.style.display = "none";
        }
      });
      // on affiche uniquement les tags qui correspondent aux appareils affichés
      appliancesTagsList.forEach((applianceTags) => {
        if (appliancesTagsActualized.includes(applianceTags.textContent)) {
          applianceTags.style.display = "block";
        } else {
          applianceTags.style.display = "none";
        }
      });
      // on affiche uniquement les tags qui correspondent aux ustensiles affichés
      ustensilsTagsList.forEach((ustensilTags) => {
        if (ustensilsTagsActualized.includes(ustensilTags.textContent.toLocaleLowerCase())) {
          ustensilTags.style.display = "block";
        } else {
          ustensilTags.style.display = "none";
        }
      });

      // on supprime le tag déjà sélectionné de la liste des tags
      tagsValues.forEach((tagValue) => {
        ingredientsTagsList.forEach((ingr) => {
          if (ingr.textContent === tagValue) {
            ingr.style.display = "none";
          }
        });
      });

      // push the tagValue in the array
      tagsArrayFilter.push(tagValue);
    });
  });
}

export { tagsArrayFilter, ingredientsDisplayed };
