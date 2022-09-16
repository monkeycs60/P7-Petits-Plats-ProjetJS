export function hideChevron() {
  const chevronUpIngredients = document.getElementById("chevronUpIngredients");
  const chevronUpUstensiles = document.querySelector("#chevronUpUstensils");
  const chevronUpAppliances = document.querySelector("#chevronUpAppliances");

  // make each of chevron up display none
  chevronUpIngredients.style.display = "none";
  chevronUpUstensiles.style.display = "none";
  chevronUpAppliances.style.display = "none";
}
