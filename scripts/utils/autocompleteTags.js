export function autocompleteTags() {


  
const inputIngredients = document.querySelector("#inputIngredients");
const inputAppliances = document.querySelector("#inputAppliances");
const inputUstensils = document.querySelector("#inputUstensils");

inputIngredients.addEventListener("keyup", (e) => {
  const inputValue = e.target.value.toLocaleLowerCase();
  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");

  let ingredientsTagsListArray = [];

  const allArticles = document.querySelectorAll("article");
  const allArticlesArray = Array.from(allArticles);
  const filteredArticles = [];

  allArticlesArray.forEach((article) => {
    if (article.style.display === "none") {
    } else {
      filteredArticles.push(article);
      // push its preciseIngredients in ingredientsTagsListArray
      article.querySelectorAll(".preciseIngredient").forEach((ing) => {
        ingredientsTagsListArray.push(ing.textContent);
      });
    }
  });

  ingredientsTagsListArray = [...new Set(ingredientsTagsListArray)].sort();
  console.log(ingredientsTagsListArray);

  // mettre tous les mots de filteredIngredientsTagsListArray en minuscule
  ingredientsTagsListArray = ingredientsTagsListArray.map((ing) =>
    ing.toLocaleLowerCase()
  );

  // vider le tableau des valeurs non include dans l'input
  const filteredIngredientsTagsListArray = ingredientsTagsListArray.filter(
    (ing) => ing.includes(inputValue.toLocaleLowerCase())
  );

  // for each ingredientsTagsList, if it is not in filteredIngredientsTagsListArray, we hide it
  ingredientsTagsList.forEach((ing) => {
    if (
      !filteredIngredientsTagsListArray.includes(
        ing.textContent.toLocaleLowerCase()
      )
    ) {
      ing.style.display = "none";
    } else {
      ing.style.display = "block";
    }
  });
});

inputAppliances.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;
  const appliancesTagsList = document.querySelectorAll(".appliancesTagsList");
  let filteredAppliancesArray = [];

  const allArticles = document.querySelectorAll("article");
  const allArticlesArray = Array.from(allArticles);
  const filteredArticles = [];

  allArticlesArray.forEach((article) => {
    if (article.style.display === "none") {
    } else {
      filteredArticles.push(article);
      // push its preciseIngredients in ingredientsTagsListArray
      article.querySelectorAll(".applianceTag").forEach((ing) => {
        filteredAppliancesArray.push(ing.textContent);
      });
    }
  });

  filteredAppliancesArray = [...new Set(filteredAppliancesArray)].sort();
  

  // mettre tous les mots de filteredAppliancesArray en minuscule
   filteredAppliancesArray = filteredAppliancesArray.map((appliance) => appliance.toLocaleLowerCase());
  console.log(filteredAppliancesArray);

  console.log(inputValue.toLocaleLowerCase());
  // vider le tableau des valeurs non include dans l'input
  const filteredAppliancesTagsListArray = filteredAppliancesArray.filter(
    (ing) => ing.includes(inputValue.toLocaleLowerCase())
  );


  // for each ingredientsTagsList, if it is not in filteredIngredientsTagsListArray, we hide it
  appliancesTagsList.forEach((ing) => {
    if (!filteredAppliancesTagsListArray.includes(ing.textContent.toLocaleLowerCase())) {
      ing.style.display = "none";
    } else {
      ing.style.display = "block";
    }
  });
});

inputUstensils.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    const ustensilsTagsList = document.querySelectorAll(".ustensilsTagsList");
    
    let filteredUstensils = [];
    
     const allArticles = document.querySelectorAll("article");
     const allArticlesArray = Array.from(allArticles);
     const filteredArticles = [];

     allArticlesArray.forEach((article) => {
       if (article.style.display === "none") {
       } else {
         filteredArticles.push(article);
         // push its preciseIngredients in ingredientsTagsListArray
         article.querySelectorAll(".ustensilTag").forEach((ing) => {
           filteredUstensils.push(ing.textContent);
         });
       }
     });

      filteredUstensils = [...new Set(filteredUstensils)].sort();
      console.log(filteredUstensils);

      // mettre tous les mots de filteredUstensils en minuscule
      filteredUstensils = filteredUstensils.map((ustensil) => ustensil.toLocaleLowerCase());
      console.log(filteredUstensils);

      console.log(inputValue.toLocaleLowerCase());
      // vider le tableau des valeurs non include dans l'input
      const filteredUstensilsTagsListArray = filteredUstensils.filter(
        (ing) => ing.includes(inputValue.toLocaleLowerCase())
      );

      // for each ingredientsTagsList, if it is not in filteredIngredientsTagsListArray, we hide it
      ustensilsTagsList.forEach((ing) => {
        if (!filteredUstensilsTagsListArray.includes(ing.textContent.toLocaleLowerCase())) {
          ing.style.display = "none";
        } else {
          ing.style.display = "block";
        }
      });
      


});
}