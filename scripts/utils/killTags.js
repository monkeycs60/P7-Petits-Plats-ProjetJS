export function killTags(
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  recipes,
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized,
  tagsArrayFilter
) {
  const killCross = document.querySelectorAll(".killcross");
  console.log(killCross);
  killCross.forEach((cross) => {
    cross.addEventListener("click", () => {
      console.log("cross listener");

      console.log(ingredientsTags);
      console.log(appliancesTags);

      console.log(tagsArrayFilter);

        // on supprime le tag du tableau des tags sélectionnés  
        tagsArrayFilter.splice(tagsArrayFilter.indexOf(cross.previousSibling.textContent), 1);
        console.log(tagsArrayFilter);

        // on supprime le tag du DOM
        cross.parentNode.remove();

        const allArticles = Array.from(document.querySelectorAll("article"));
        
       allArticles.forEach((article) => {
        // les 3 champs de la recherche avancée
        let allIngredients = [];
        const articleIngredients = Array.from(article.querySelectorAll(".preciseIngredient"));
        articleIngredients.forEach((ingredient) => {
            allIngredients.push(ingredient.textContent.toLocaleLowerCase());
        });
        const articleAppliance = article.querySelector(".applianceTag").textContent;
        let allUstensils = [];
        const articleUstensils = Array.from(article.querySelectorAll(".ustensilTag"));
        articleUstensils.forEach((ustensil) => {
            allUstensils.push(ustensil.textContent.toLocaleLowerCase());
        });

        // le reste de l'article (description & titre)
        const articleDescription = article.querySelector(".recipe-title").textContent;
        const articleTitle = article.querySelector(".description").textContent;

        // il faut montrer les articles qui correspondent à l'input de 3 lettres, puis filtrer
        const inputValue = document.getElementById("mainSearch");
        console.log(inputValue);
        console.log(inputValue.value);

    })
    

     
    });
  });
}