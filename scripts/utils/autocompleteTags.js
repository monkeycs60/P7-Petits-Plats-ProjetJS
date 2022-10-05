export function autocompleteTags() {
  const inputIngredients = document.querySelector("#inputIngredients");
  const inputAppliances = document.querySelector("#inputAppliances");
  const inputUstensils = document.querySelector("#inputUstensils");

  inputIngredients.addEventListener("keyup", (e) => {
    let tabIngredients = [];
    const tagIngredientsAll = document.querySelectorAll(".tagIngredients");
    tagIngredientsAll.forEach((tag) => {
     tabIngredients.push(tag.textContent.toLocaleLowerCase());
    });

    const inputValue = e.target.value.toLocaleLowerCase();
    const ingredientsTagsList = document.querySelectorAll(
      ".ingredientsTagsList"
    );

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

    // mettre tous les mots de filteredIngredientsTagsListArray en minuscule
    ingredientsTagsListArray = ingredientsTagsListArray.map((ing) =>
      ing.toLocaleLowerCase()
    );

    // vider le tableau des valeurs non include dans l'input
    const filteredIngredientsTagsListArrayInput = ingredientsTagsListArray.filter(
      (ing) => ing.includes(inputValue.toLocaleLowerCase())
    );

    filteredIngredientsTagsListArrayInput.forEach((ing) => {
      if (tabIngredients.includes(ing)) {
        filteredIngredientsTagsListArrayInput.splice(
          filteredIngredientsTagsListArrayInput.indexOf(ing),
          1
        );
      }
    });

    // for each ingredientsTagsList, if it is not in filteredIngredientsTagsListArray, we hide it
    ingredientsTagsList.forEach((ing) => {
      if (
        !filteredIngredientsTagsListArrayInput.includes(
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

    let tabAppliances = [];
    
    const tagAppliancesAll = document.querySelectorAll(".tagAppliances");
    tagAppliancesAll.forEach((tag) => {
      tabAppliances.push(tag.textContent.toLocaleLowerCase());
    });

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
    filteredAppliancesArray = filteredAppliancesArray.map((appliance) =>
      appliance.toLocaleLowerCase()
    );

    // vider le tableau des valeurs non include dans l'input
    const filteredAppliancesTagsListArray = filteredAppliancesArray.filter(
      (ing) => ing.includes(inputValue.toLocaleLowerCase())
    );

    filteredAppliancesTagsListArray.forEach((appliance) => {
      if (tabAppliances.includes(appliance)) {
        filteredAppliancesTagsListArray.splice(
          filteredAppliancesTagsListArray.indexOf(appliance),
          1
        );
      }
    });

    // for each ingredientsTagsList, if it is not in filteredIngredientsTagsListArray, we hide it
    appliancesTagsList.forEach((ing) => {
      if (
        !filteredAppliancesTagsListArray.includes(
          ing.textContent.toLocaleLowerCase()
        )
      ) {
        ing.style.display = "none";
      } else {
        ing.style.display = "block";
      }
    });
  });

  inputUstensils.addEventListener("keyup", (e) => {
    let tabUstensils = [];
    const tagUstensilsAll = document.querySelectorAll(".tagUstensils");
    tagUstensilsAll.forEach((tag) => {
      tabUstensils.push(tag.textContent.toLocaleLowerCase());
    });


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

    // mettre tous les mots de filteredUstensils en minuscule
    filteredUstensils = filteredUstensils.map((ustensil) =>
      ustensil.toLocaleLowerCase()
    );

    // vider le tableau des valeurs non include dans l'input
    const filteredUstensilsTagsListArray = filteredUstensils.filter((ing) =>
      ing.includes(inputValue.toLocaleLowerCase())
    );

    filteredUstensilsTagsListArray.forEach((ustensil) => {
      if (tabUstensils.includes(ustensil)) {
        filteredUstensilsTagsListArray.splice(
          filteredUstensilsTagsListArray.indexOf(ustensil),
          1
        );
      }
    });

    // for each ingredientsTagsList, if it is not in filteredIngredientsTagsListArray, we hide it
    ustensilsTagsList.forEach((ing) => {
      if (
        !filteredUstensilsTagsListArray.includes(
          ing.textContent.toLocaleLowerCase()
        )
      ) {
        ing.style.display = "none";
      } else {
        ing.style.display = "block";
      }
    });
  });
}