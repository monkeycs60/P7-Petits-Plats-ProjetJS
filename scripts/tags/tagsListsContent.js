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
        `<p class="cursor-pointer ingredientsTagsList">${ingredient}</p>`
    )
    .join("");
  divAppliances.innerHTML = appliancesTags
    .map(
      (appliance) =>
        `<p class="cursor-pointer appliancesTagsList">${appliance}</p>`
    )
    .join("");
  divUstensils.innerHTML = ustensilsTags
    .map(
      (ustensil) =>
        `<p class="cursor-pointer ustensilsTagsList">${ustensil}</p>`
    )
    .join("");

  // ajout des divs dans les divs encadrant les tags
  ingredients.appendChild(divIngredients);
  appliances.appendChild(divAppliances);
  ustensils.appendChild(divUstensils);

  const tagArea = document.querySelector(".tag-area");
  // on écoute les tags INGREDIENTS
  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");
  ingredientsTagsList.forEach((ingredientTags) => {
    ingredientTags.addEventListener("click", (event) => {
      // on récupère la valeur du tag
      const tagValue = event.target.innerHTML;

      // on l'affiche dans un span child de tagarea
      tagArea.innerHTML += `<span class="tag cursor-pointer tagIngredients">${tagValue}<i class="fas fa-times"></i></span>`;
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

      // // on récupère les ingrédients des articles affichés
      // let ingredientsDisplayed = [];

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
        } else {
          article.style.display = "none";
        }
      });

      // On enlève les doublons du tableau
      ingredientsDisplayed = [...new Set(ingredientsDisplayed)];

      // // on actualise la liste des tags
      // ingredientsTagsActualized = [];
      console.log(ingredientsDisplayed);

      // on affiche uniquement les tags qui correspondent aux ingrédients affichés
      ingredientsTagsList.forEach((ingredientTags) => {
        if (ingredientsDisplayed.includes(ingredientTags.textContent)) {
          ingredientTags.style.display = "block";
          ingredientsTagsActualized.push(ingredientTags.textContent);
        } else {
          ingredientTags.style.display = "none";
        }
      });
  
      // on reset les tableaux
      ingredientsTagsActualized = [];
      ingredientsDisplayed = [];
      
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
