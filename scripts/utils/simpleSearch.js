let ingredientsTagsActualized = [];
let appliancesTagsActualized = [];
let ustensilsTagsActualized = [];

// déclaration des fonctions (tri, filtre)
//BOUCLES NATIVES FOR

//create the same function as above but with a native for loop
function filterRecipesItemsDisplayedForLoop(originalArray, filteredArray) {
  for (let i = 0; i < originalArray.length; i++) {
    filteredArray.push(originalArray[i].textContent);
  }
}

 // create the same function as filterTagList but with a native for loop
  function filterTagListForLoop(tagList, tagListActualized) {
    for (let i = 0; i < tagList.childNodes.length; i++) {
      if (tagListActualized.includes(tagList.childNodes[i].textContent)) {
        tagList.childNodes[i].style.display = "block";
      } else {
        tagList.childNodes[i].style.display = "none";
      }
    }}

  // create the same function as doubleFilterRecipeItemsInputAndTags but with a native for loop 
  function doubleFilterRecipeItemsInputAndTagsForLoop(
    listOfItems,
    listOfItemsDisplayed,
    listOfTags
  ) {
    for (let i = 0; i < listOfItems.length; i++) {
      if (
        !listOfItemsDisplayed.includes(listOfItems[i].textContent) ||
        listOfTags.includes(listOfItems[i].textContent)
      ) {
        listOfItems[i].style.display = "none";
      } else {
        listOfItems[i].style.display = "block";
      }
    }
  }


 // create the same function as displayEveryTags but with a native for loop
  function displayEveryTagsForLoop(fullTagsList) {
    for (let i = 0; i < fullTagsList.childNodes.length; i++) {
      fullTagsList.childNodes[i].style.display = "block";
    }
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
      // create the same function as above but with a native for loop
      for (let i = 0; i < allArticlesInArray.length; i++) {
        const articleTitle = allArticlesInArray[i].querySelector("h2")
          .textContent;
        const ingredientsArrayArticle = [];
        const articleIngredients =
          allArticlesInArray[i].querySelectorAll(".preciseIngredient");
        for (let j = 0; j < articleIngredients.length; j++) {
          ingredientsArrayArticle.push(articleIngredients[j].textContent);
        }
        const articleDescription =
          allArticlesInArray[i].querySelector(".description").textContent;
        const articleAppliance =
          allArticlesInArray[i].querySelectorAll(".applianceTag");
        const articleUstensils =
          allArticlesInArray[i].querySelectorAll(".ustensilTag");

        if (
          articleTitle.toLowerCase().includes(searchInputValue.toLowerCase()) ||
          ingredientsArrayArticle.some((ingredient) =>
            ingredient.toLowerCase().includes(searchInputValue.toLowerCase())
          ) ||
          articleDescription
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
        ) {
          allArticlesInArray[i].style.display = "flex";

          filterRecipesItemsDisplayedForLoop(
            articleIngredients,
            ingredientsTagsActualized
          );

          filterRecipesItemsDisplayedForLoop(
            articleUstensils,
            ustensilsTagsActualized
          );

          filterRecipesItemsDisplayedForLoop(
            articleAppliance,
            appliancesTagsActualized
          );

          if (tagsArrayFilter.length > 0) {
            if (
              !tagsArrayFilter.every((tag) =>
                allArticlesInArray[i].textContent
                  .toLocaleLowerCase()
                  .includes(tag.toLowerCase())
              )
            ) {
              allArticlesInArray[i].style.display = "none";
            }
          }
        } else {
          allArticlesInArray[i].style.display = "none";
        }
      }


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
       
        filterTagListForLoop(ingredientList, ingredientsTagsActualized);
        filterTagListForLoop(applianceList, appliancesTagsActualized);
        filterTagListForLoop(ustensilList, ustensilsTagsActualized);

    

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

            filterRecipesItemsDisplayedForLoop(
              articleIngredients,
              ingredientsTagsActualizedSecond
            );

            filterRecipesItemsDisplayedForLoop(
              articleAppliance,
              appliancesDisplayed
            );

            filterRecipesItemsDisplayedForLoop(
              articleUstensils,
              ustensilsDisplayed
            );
          }
        });

        
        // Adapatation du tableau ustensiles avec des MAJUSCULES
        ustensilsDisplayed = ustensilsDisplayed.map(
          (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
        );
      
       

        doubleFilterRecipeItemsInputAndTagsForLoop(
          ingredientsEntiers,
          ingredientsTagsActualizedSecond,
          tagsArrayFilter
        );

        doubleFilterRecipeItemsInputAndTagsForLoop(
          ustensilsEntiers,
          ustensilsDisplayed,
          tagsArrayFilter
        );

        doubleFilterRecipeItemsInputAndTagsForLoop(
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

      displayEveryTagsForLoop(ingredientList);
      displayEveryTagsForLoop(applianceList);
      displayEveryTagsForLoop(ustensilList);


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
        

          doubleFilterRecipeItemsInputAndTagsForLoop(
            ingredientsEntiers,
            ingredientsDisplayed,
            tagsArrayFilter
          );

          doubleFilterRecipeItemsInputAndTagsForLoop(
            ustensilsEntiers,
            ustensilsDisplayed,
            tagsArrayFilter
          );

          doubleFilterRecipeItemsInputAndTagsForLoop(
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
