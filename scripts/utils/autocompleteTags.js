export function autocompleteTags() {


  
const inputIngredients = document.querySelector("#inputIngredients");
const inputAppliances = document.querySelector("#inputAppliances");
const inputUstensils = document.querySelector("#inputUstensils");

inputIngredients.addEventListener("keyup", (e) => {
  
  const inputValue = e.target.value.toLocaleLowerCase();
  console.log(inputValue);
  let filteredIngredients = [];
  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");
  // for each ingredientTagList that are not display none, push it in filteredIngredients
  ingredientsTagsList.forEach((ing) => {
    if (ing.style.display !== "none") {
      filteredIngredients.push(ing.textContent.toLocaleLowerCase());
    }
  });
  console.log(filteredIngredients);
  // élimine les valeurs qui ne commencent pas par la valeur de l'input
  const filteredIngredients2 = filteredIngredients.filter((ing) => {
    return ing.includes(inputValue);
  });
 
  // on affiche les tags qui correspondent à la valeur de l'input
  ingredientsTagsList.forEach((ing) => {
    if (!filteredIngredients2.includes(ing.textContent.toLocaleLowerCase())) {
        ing.style.display = "none";
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