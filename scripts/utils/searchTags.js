export function searchTags() {

const inputIngredients = document.querySelector("#inputIngredients");
const inputAppliances = document.querySelector("#inputAppliances");
const inputUstensils = document.querySelector("#inputUstensils");

inputIngredients.addEventListener("keyup", (e) => {
  
  const inputValue = e.target.value;
  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");

  ingredientsTagsList.forEach((tag) => {
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