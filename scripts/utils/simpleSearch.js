let ingredientsTagsActualized = [];
let appliancesTagsActualized = [];
let ustensilsTagsActualized = [];

// déclaration des fonctions (tri, filtre)

function filterRecipesItemsDisplayed(originalArray, filteredArray) {
  originalArray.forEach((value) => {
    filteredArray.push(value.textContent);
  });
}

 function filterTagList(tagList, tagListActualized) {
   tagList.childNodes.forEach((tag) => {
     if (tagListActualized.includes(tag.textContent)) {
       tag.style.display = "block";
     } else {
       tag.style.display = "none";
     }
   });
 }

  function doubleFilterRecipeItemsInputAndTags(
    listOfItems,
    listOfItemsDisplayed,
    listOfTags
  ) {
    listOfItems.forEach((item) => {
      if (
        !listOfItemsDisplayed.includes(item.textContent) ||
        listOfTags.includes(item.textContent)
      ) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  }

 function displayEveryTags(fullTagsList) {
   fullTagsList.childNodes.forEach((tag) => {
     tag.style.display = "block";
   });
 }

export function simpleSearch(
  recipes,
  ingredientsTags,
  appliancesTags,
  ustensilsTags,
  tagsArrayFilter,
  ingredientsTagsActualized,
  ingredientsDisplayed,
  ustensilsDisplayed,
  appliancesDisplayed
) {
  // on écoute la barre de recherche principale
  const searchInput = document.querySelector("#mainSearch");
  const allArticlesInArray = Array.from(document.querySelectorAll("article"));

  // création d'un nouveau tableau pour les ingrédients filtrés
  let ingredientsTagsActualizedSecond = [];

  // event listener sur le champ de recherche
  searchInput.addEventListener("keyup", (event) => {
    // on récupère la valeur du champ de recherche
    const searchInputValue = event.target.value.toLowerCase();
    // la recherche commence à partir de 3 caractères - 1er CONDITION
    if (searchInputValue.length > 2) {
      allArticlesInArray.forEach((article) => {
        // définition des variables
        const articleTitle = article.querySelector("h2").textContent;
        const ingredientsArrayArticle = [];
        const articleIngredients =
          article.querySelectorAll(".preciseIngredient");
        articleIngredients.forEach((ingredient) => {
          ingredientsArrayArticle.push(ingredient.textContent);
        });
        const articleDescription =
          article.querySelector(".description").textContent;
        const articleAppliance =
       article.querySelectorAll(".applianceTag");
        const articleUstensils = article.querySelectorAll(".ustensilTag");
        
        // on vérifie si la valeur du champ de recherche est présente dans le titre, les ingrédients ou la description
        if (
          articleTitle.toLowerCase().includes(searchInputValue.toLowerCase()) ||
          ingredientsArrayArticle.some((ingredient) =>
            ingredient.toLowerCase().includes(searchInputValue.toLowerCase())
          ) ||
          articleDescription
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
        ) {
          article.style.display = "flex";

          // On filtre les ingrédients/ustensiles/appareils correspondant aux recettes affichées        
          filterRecipesItemsDisplayed(
            articleIngredients,
            ingredientsTagsActualized
          );

          filterRecipesItemsDisplayed(
            articleUstensils,
            ustensilsTagsActualized
          );

          filterRecipesItemsDisplayed(
            articleAppliance,
            appliancesTagsActualized
          );

          if (tagsArrayFilter.length > 0) {
            if (
              // article textcontent does not contain all the tags
              !tagsArrayFilter.every((tag) =>
                article.textContent
                  .toLocaleLowerCase()
                  .includes(tag.toLowerCase())
              )
            ) {
              article.style.display = "none";
            }
          }
        } else {
          article.style.display = "none";
        }
      });

      // On restructure les tableaux de tags (suppression des doublons, ajouts des majuscules, tri)
      ingredientsTagsActualized = ingredientsTagsActualized.flat();
      const flatIngredients = [];
      ingredientsTagsActualized.forEach((ingredient) => {
        flatIngredients.push(ingredient);
      });
      ingredientsTagsActualized = flatIngredients;
      ingredientsTagsActualized = [
        ...new Set(ingredientsTagsActualized),
      ].sort();

      // partie actualisation TAGS APPLIANCES
      appliancesTagsActualized = [...new Set(appliancesTagsActualized)].sort();

      // partie actualisation TAGS USTENSILS
      ustensilsTagsActualized = ustensilsTagsActualized.flat();
      ustensilsTagsActualized = ustensilsTagsActualized.map(
        (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
      );
      ustensilsTagsActualized = [...new Set(ustensilsTagsActualized)].sort(
        (a, b) => a.localeCompare(b)
      );

      const ingredientList = document.querySelector(".ingredients");
      const applianceList = document.querySelector(".appliances");
      const ustensilList = document.querySelector(".ustensils");
       
        filterTagList(ingredientList, ingredientsTagsActualized);
        filterTagList(applianceList, appliancesTagsActualized);
        filterTagList(ustensilList, ustensilsTagsActualized);

      if (tagsArrayFilter.length > 0) {
        const tagArea = document.querySelector(".tag-area");
        const ingredientsEntiers = document.querySelectorAll(
          ".ingredientsTagsList"
        );
        const ustensilsEntiers =
          document.querySelectorAll(".ustensilsTagsList");
        const appliancesEntiers = document.querySelectorAll(
          ".appliancesTagsList"
        );

        // On actualise le tableau en retirant les tags déjà cliqués

        ingredientsTagsActualizedSecond = [];
        appliancesDisplayed = [];
        ustensilsDisplayed = [];

        // for each article with not displat none,
        // we check if the textcontent of the article contains the tag
        allArticlesInArray.forEach((article) => {
          if (article.style.display !== "none") {
            // on push les ingrédients dans ingredientsDisplayed
            const articleIngredients =
              article.querySelectorAll(".preciseIngredient");
            const articleAppliance = article.querySelectorAll(".applianceTag");
            const articleUstensils = article.querySelectorAll(".ustensilTag");

            filterRecipesItemsDisplayed(
              articleIngredients,
              ingredientsTagsActualizedSecond
            );

            filterRecipesItemsDisplayed(articleAppliance, appliancesDisplayed);

            filterRecipesItemsDisplayed(articleUstensils, ustensilsDisplayed);
          }
        });
        
        // Adapatation du tableau ustensiles avec des MAJUSCULES
        ustensilsDisplayed = ustensilsDisplayed.map(
          (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
        );
      
        doubleFilterRecipeItemsInputAndTags(
          ingredientsEntiers,
          ingredientsTagsActualizedSecond,
          tagsArrayFilter
        );

        doubleFilterRecipeItemsInputAndTags(
          ustensilsEntiers,
          ustensilsDisplayed,
          tagsArrayFilter
        );

        doubleFilterRecipeItemsInputAndTags(
          appliancesEntiers,
          appliancesDisplayed,
          tagsArrayFilter
        );
      }

      // on vide les tableaux pour la prochaine recherche
      ingredientsTagsActualized = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];
      ingredientsTagsActualizedSecond = [];
    } else {
      // Si la saisie est < 2 caractères, alors on n'affiche que les recettes filtrées par tags SINON on affiche tout

      // RESET LE CHAMP DES TAGS quand la recherche < 3 caractères
      // on affiche toutes les recettes
      recipes.forEach((recipe) => {
        document.getElementById(recipe.id).style.display = "flex";
      });

      const ingredientList = document.querySelector(".ingredients");
      const applianceList = document.querySelector(".appliances");
      const ustensilList = document.querySelector(".ustensils");

      displayEveryTags(ingredientList);
      displayEveryTags(applianceList);
      displayEveryTags(ustensilList);


      if (tagsArrayFilter.length > 0) {
        const article = document.querySelectorAll("article");
        const articleArray = Array.from(article);
    

        articleArray.forEach((article) => {
          let articleIngredients = Array.from(article.querySelectorAll(
            ".preciseIngredient"
          ));
          let articleAppliance = Array.from(article.querySelectorAll(".applianceTag"));
          let articleUstensils = Array.from(article.querySelectorAll(".ustensilTag"));

          articleIngredients = articleIngredients.map((ingredient) =>
            ingredient.textContent.toLowerCase()
          );
          articleAppliance = articleAppliance.map((appliance) =>
            appliance.textContent.toLowerCase()
          );
          articleUstensils = articleUstensils.map((ustensil) =>
            ustensil.textContent.toLowerCase()
          );

          const articleTags = [
            ...articleIngredients,
            ...articleAppliance,
            ...articleUstensils,
          ];
          

          if (
            tagsArrayFilter.every((tagValue) =>
              articleTags.includes(tagValue.toLowerCase())
            )
          ) {
            article.style.display = "flex";
            // push its ingredients in the ingredientsDisplayed array
            const articleIngredients =
              article.querySelectorAll(".preciseIngredient");
            articleIngredients.forEach((ingredient) => {
              ingredientsDisplayed.push(ingredient.textContent);
            });
            const articleAppliance = article.querySelectorAll(".applianceTag");
            articleAppliance.forEach((appliance) => {
              appliancesDisplayed.push(appliance.textContent);
            });
            const articleUstensils = article.querySelectorAll(".ustensilTag");
            articleUstensils.forEach((ustensil) => {
              ustensilsDisplayed.push(ustensil.textContent);
            });
          } else {
            article.style.display = "none";
          }
        });
        ingredientsDisplayed = [...new Set(ingredientsDisplayed)];

        // on actualise les tags
        const ingredientsEntiers = document.querySelectorAll(
          ".ingredientsTagsList"
        );
        const appliancesEntiers = document.querySelectorAll(
          ".appliancesTagsList"
        );
        const ustensilsEntiers =
          document.querySelectorAll(".ustensilsTagsList");

          // on rajoute les majs aux ustensiles
          ustensilsDisplayed = ustensilsDisplayed.map(
            (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
          );
        
          console.log(ustensilsDisplayed);
          console.log(ingredientsDisplayed);
          console.log(appliancesDisplayed);

          doubleFilterRecipeItemsInputAndTags(
            ingredientsEntiers,
            ingredientsDisplayed,
            tagsArrayFilter
          );

          doubleFilterRecipeItemsInputAndTags(
            ustensilsEntiers,
            ustensilsDisplayed,
            tagsArrayFilter
          );

          doubleFilterRecipeItemsInputAndTags(
            appliancesEntiers,
            appliancesDisplayed,
            tagsArrayFilter
          );
      }
    }

    // On gère l'affichage du message d'erreur si aucune card correspond à la recherche
    const noCard = document.querySelector(".no-result");
    const cards = document.querySelectorAll("article");
    const cardsArray = Array.from(cards);
    const cardsDisplayed = cardsArray.filter(
      (card) => card.style.display === "flex"
    );
    if (cardsDisplayed.length === 0) {
      noCard.style.display = "flex";
    } else {
      noCard.style.display = "none";
    }
  });
}

export {
  ingredientsTagsActualized,
  appliancesTagsActualized,
  ustensilsTagsActualized,
};
