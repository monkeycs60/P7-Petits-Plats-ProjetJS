export function tagsListsContent(ingredientsTags, appliancesTags, ustensilsTags) {
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
    .map((ingredient) => `<div class="tag">${ingredient}</div>`)
    .join("");
  divAppliances.innerHTML = appliancesTags
    .map((appliance) => `<div class="tag">${appliance}</div>`)
    .join("");
  divUstensils.innerHTML = ustensilsTags
    .map((ustensil) => `<div class="tag">${ustensil}</div>`)
    .join("");

  // ajout des divs dans les divs encadrant les tags
  ingredients.appendChild(divIngredients);
  appliances.appendChild(divAppliances);
  ustensils.appendChild(divUstensils);
}