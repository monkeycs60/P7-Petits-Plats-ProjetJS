export function handleTags() {

// déclaration des constantes
const ingredients = document.querySelector("#ingredients");
const appliances = document.querySelector("#appareils");
const ustensils = document.querySelector("#ustensiles");

const ingredientsList = document.querySelector(".ingredients");
const ustensilsList = document.querySelector(".ustensils");
const appliancesList = document.querySelector(".appliances");

const inputIngredients = document.getElementById("inputIngredients");
const inputUstensiles = document.getElementById("inputUstensils");
const inputAppliances = document.getElementById("inputAppliances");

const ingredientsWidth = ingredients.offsetWidth;
const appliancesWidth = appliances.offsetWidth;
const ustensilsWidth = ustensils.offsetWidth;

// déclaration de tous les chevrons pour les listeners
const chevronDownIngredients = document.getElementById(
  "chevronDownIngredients"
);
const chevronDownUstensiles = document.getElementById("chevronDownUstensils");
const chevronDownAppliances = document.getElementById("chevronDownAppliances");
const chevronUpIngredients = document.getElementById("chevronUpIngredients");
const chevronUpUstensiles = document.querySelector("#chevronUpUstensils");
const chevronUpAppliances = document.querySelector("#chevronUpAppliances");

// Fonction PRINCIPALE qui règle l'apparition des Tags
function displayTagsDOM() {
  // Par défaut, les listes sont invisibles
  ingredientsList.style.display = "none";
  ustensilsList.style.display = "none";
  appliancesList.style.display = "none";

  // event listeners apparition/disparition des tags
  ingredients.addEventListener("click", makeIngredientsListVisible);
  ustensils.addEventListener("click", makeUstensilsListVisible);
  appliances.addEventListener("click", makeAppliancesListVisible);

  ingredients.addEventListener("blur", makeIngredientsListInvisible);
  ustensils.addEventListener("blur", makeUstensilsListInvisible);
  appliances.addEventListener("blur", makeAppliancesListInvisible);
}

// Fonctions listeners des chevrons (apparition/disparition des TAGS)
function makeIngredientsListVisible() {
  ingredientsList.style.display = "flex";
  chevronDownIngredients.style.display = "none";
  chevronUpIngredients.style.display = "block";
  ustensilsList.style.display = "none";
  appliancesList.style.display = "none";
  chevronDownUstensiles.style.display = "block";
  chevronUpUstensiles.style.display = "none";
  chevronDownAppliances.style.display = "block";
  chevronUpAppliances.style.display = "none";
  ingredients.style.width = `${ingredientsList.offsetWidth}px`;

  appliances.style.width = `${appliancesWidth}px`;
  ustensils.style.width = `${ustensilsWidth}px`;
}

function makeUstensilsListVisible() {
  ustensilsList.style.display = "flex";
  chevronDownUstensiles.style.display = "none";
  chevronUpUstensiles.style.display = "block";
  ingredientsList.style.display = "none";
  appliancesList.style.display = "none";
  chevronDownIngredients.style.display = "block";
  chevronUpIngredients.style.display = "none";
  chevronDownAppliances.style.display = "block";
  chevronUpAppliances.style.display = "none";
  ustensils.style.width = `${ustensilsList.offsetWidth}px`;

  ingredients.style.width = `${ingredientsWidth}px`;
  appliances.style.width = `${appliancesWidth}px`;
}

function makeAppliancesListVisible() {
  appliancesList.style.display = "flex";
  chevronDownAppliances.style.display = "none";
  chevronUpAppliances.style.display = "block";
  ingredientsList.style.display = "none";
  ustensilsList.style.display = "none";
  chevronDownIngredients.style.display = "block";
  chevronUpIngredients.style.display = "none";
  chevronDownUstensiles.style.display = "block";
  chevronUpUstensiles.style.display = "none";
  appliances.style.width = `${appliancesList.offsetWidth}px`;

  // on réinitialise la largeur des input quand on clique à la volée sur le troisième input
  ustensils.style.width = `${ustensilsWidth}px`;
  ingredients.style.width = `${ingredientsWidth}px`;
}

function makeIngredientsListInvisible() {
  ingredientsList.style.display = "none";
  chevronDownIngredients.style.display = "block";
  chevronUpIngredients.style.display = "none";
  ingredients.style.width = `${ingredientsWidth}px`;
}

function makeUstensilsListInvisible() {
  ustensilsList.style.display = "none";
  chevronDownUstensiles.style.display = "block";
  chevronUpUstensiles.style.display = "none";
  ustensils.style.width = `${ustensilsWidth}px`;
}

function makeAppliancesListInvisible() {
  appliancesList.style.display = "none";
  chevronDownAppliances.style.display = "block";
  chevronUpAppliances.style.display = "none";
  appliances.style.width = `${appliancesWidth}px`;
}

return displayTagsDOM();
}