export function tagsListsContent(
  a,
  b,
  c
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
  divIngredients.innerHTML = a
    .map(
      (ingredient) =>
        `<p class="cursor-pointer ingredientsList">${ingredient}</p>`
    )
    .join("");
  divAppliances.innerHTML = b
    .map(
      (appliance) => `<p class="cursor-pointer appliancesList">${appliance}</p>`
    )
    .join("");
  divUstensils.innerHTML = c
    .map(
      (ustensil) => `<p class="cursor-pointer ustensilsList">${ustensil}</p>`
    )
    .join("");

  // ajout des divs dans les divs encadrant les tags
  ingredients.appendChild(divIngredients);
  appliances.appendChild(divAppliances);
  ustensils.appendChild(divUstensils);
}
