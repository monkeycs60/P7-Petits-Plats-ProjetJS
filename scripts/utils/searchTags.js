export function searchTags() {

const inputIngredients = document.querySelector("#inputIngredients");
const inputAppliances = document.querySelector("#inputAppliances");
const inputUstensils = document.querySelector("#inputUstensils");

inputIngredients.addEventListener("keyup", (e) => {
  
  const inputValue = e.target.value;
  console.log(inputValue);
  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");
  // create a const for ingredientsTagsList that are display block
 
  ingredientsTagsList.forEach((ing) => {
    if (ing.style.display === "block") {
     //add a data attribute to each ingredientTagsList that is display block
      ing.setAttribute("data-display", "true");
    }
  });
  // create a const for ingredientsTagsList that are display block
  const ingredientsTagsListDisplay = document.querySelectorAll(
    '[data-display="true"]'
  );

  ingredientsTagsListDisplay.forEach((tag) => {
    //if display none, we don't check

    if (tag.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
      tag.style.display = "block";
    } else {
      tag.style.display = "none";
    }
  });
});

inputAppliances.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    const appliancesTagsList = document.querySelectorAll(".appliancesTagsList");
    
    appliancesTagsList.forEach((tag) => {
        if (tag.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
        tag.style.display = "block";
        } else {
        tag.style.display = "none";
        }
    });
});

inputUstensils.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    const ustensilsTagsList = document.querySelectorAll(".ustensilsTagsList");
    
    ustensilsTagsList.forEach((tag) => {
        if (tag.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
        tag.style.display = "block";
        } else {
        tag.style.display = "none";
        }
    });
});
}