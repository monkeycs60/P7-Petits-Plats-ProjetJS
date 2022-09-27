export function tagsActualized(
  recipes,
  ingredientsTags,
  appliancesTags,
  ustensilsTags
) {
  // TAGLISTS CHIANTES

  // listeners clic TAGS
  const tagArea = document.querySelector(".tag-area");

  const ingredientsTagsBar = document.querySelectorAll(".ingredientsList");
  const appliancesTagsBar = document.querySelectorAll(".appliancesList");
  const ustensilsTagsBar = document.querySelectorAll(".ustensilsList");

  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");
  const appliancesTagsList = document.querySelectorAll(".appliancesTagsList");
  const ustensilsTagsList = document.querySelectorAll(".ustensilsTagsList");

  // liste des listes
  const ingredientsFull = document.getElementsByClassName("ingredients");
  const appliancesFull = document.querySelectorAll(".appliances");
  const ustensilsFull = document.querySelectorAll(".ustensils");

  const filteredIngredients = [];
  const filteredAppliances = [];
  const filteredUstensils = [];

  // on écoute les tags INGREDIENTS
  ingredientsTagsList.forEach((ingredientTags) => {
    ingredientTags.addEventListener("click", (event) => {
      console.log("click");
      // on récupère la valeur du tag
      const tagValue = event.target.innerHTML;

      // on l'affiche dans un span child de tagarea
      tagArea.innerHTML += `<span class="tag cursor-pointer">${tagValue}<i class="fas fa-times"></i></span>`;
      // on supprime le tag de la liste
      event.target.style.display = "none";

     

      const article = document.querySelectorAll("article");
      const articleArray = Array.from(article);
   
      // for each article, if its textContent doesn't contain the tagValue, we hide it
      articleArray.forEach((article) => {
        //if article is displayed
          if (article.style.display === "none") {
          } else {
        if (!article.textContent.includes(tagValue)) {
          article.style.display = "none";
        } else {
          article.style.display = "flex";
          article.querySelectorAll("preciseIngredients").forEach((ing) => {
            console.log(ing);
            filteredIngredients.push(ing.textContent);
          });
          filteredAppliances.push(article.querySelectorAll("applianceTag"));
        }
      }
      });


      // if article is display block, then log it
      articleArray.forEach((article) => {
        if (article.style.display === "flex") {
          // console.log(article);
          // push its preciseIngredients in filteredIngredients
          const recupIngredientsFiltered =
            article.children[1].children[1].children[0].children;
          console.log(recupIngredientsFiltered);
          Array.from(recupIngredientsFiltered).forEach((ing) => {
            filteredIngredients.push(ing.children[0].textContent);
          });
        }
      });

      console.log(filteredIngredients);
      // filter and display none Ingredientstagslist that are not in filteredIngredients
      ingredientsTagsList.forEach((ing) => {
        if (!filteredIngredients.includes(ing.textContent)) {
          ing.style.display = "none";
        }
      });
      console.log(ingredientsTags);
      //  ingredientsTags = filter filteredIngredients;
      ingredientsTags = filteredIngredients.sort();
      ingredientTags = new Set(ingredientsTags);
      ingredientsTags = Array.from(ingredientTags);
      console.log(ingredientsTags);
    });
  });
}
