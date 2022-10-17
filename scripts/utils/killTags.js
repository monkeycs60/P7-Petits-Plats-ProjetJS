function getAllItems(article, DOMClass, fullArray) {
  const ItemsInDOM = Array.from(article.querySelectorAll(DOMClass));
  ItemsInDOM.forEach((item) => {
    fullArray.push(item.textContent.toLocaleLowerCase());
  });
}

    function GetIndividualItemsFromArticle(originalArray, filteredArray) {
       originalArray.forEach((item) => {
         filteredArray.push(item.textContent);
       });
     }

     function normalizeArray(array) {
       array = [...new Set(array)].sort((a, b) =>
         a.localeCompare(b, "fr", { sensitivity: "base" })
       );
       array = array
         .map((item) => item.toLocaleLowerCase())
         .map(
           (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
         );
        return array;
     }

      function displayTags(tags, tagsActualized) {
        tags.forEach((tag) => {
          if (tagsActualized.includes(tag.textContent)) {
            tag.style.display = "block";
          } else {
            tag.style.display = "none";
          }
        });
      }

      function deleteTagClicked(tagsArrayFilter, itemsList) {
        tagsArrayFilter.forEach((tag) => {
        itemsList.forEach((itemTag) => {
          if (itemTag.textContent === tag) {
            itemTag.style.display = "none";
          }
        });
         }); 
        }

        function displayEveryTags(tagList) {
          tagList.forEach((tag) => {
            tag.style.display = "block";
          });
        }

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
  killCross.forEach((cross) => {
    cross.addEventListener("click", () => {
      ingredientsTagsActualized = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];

      let ingredientsFilteredTags = [];
      let appliancesFilteredTags = [];
      let ustensilsFilteredTags = [];

      // on supprime le tag du tableau des tags sélectionnés
      tagsArrayFilter.splice(
        tagsArrayFilter.indexOf(cross.previousSibling.textContent),
        1
      );

      // on supprime le tag du DOM
      cross.parentNode.remove();

      const allArticles = Array.from(document.querySelectorAll("article"));

      allArticles.forEach((article) => {
        // les 3 champs de la recherche avancée
        let allIngredients = [];
        let allAppliances = [];
        let allUstensils = [];

        getAllItems(article, ".preciseIngredient", allIngredients);
        getAllItems(article, ".applianceTag", allAppliances);
        getAllItems(article, ".ustensilTag", allUstensils);

        // le reste de l'article (description & titre)
        const articleDescription =
          article.querySelector(".recipe-title").textContent;
        const articleTitle = article.querySelector(".description").textContent;
        const articleIndividualIngredients = Array.from(
          article.querySelectorAll(".preciseIngredient")
        );
        const articleUstensilTag = Array.from(
          article.querySelectorAll(".ustensilTag")
        );
        const articleApplianceTag = Array.from(article.querySelectorAll(".applianceTag"));

        // il faut montrer les articles qui correspondent à l'input de 3 lettres, puis filtrer
        const inputValue = document.getElementById("mainSearch").value;

        // Le cas où l'INPUT est déjà rempli
        if (inputValue.length > 2) {
          // on affiche les articles qui correspondent à l'input
          if (
            articleDescription.includes(inputValue) ||
            articleTitle.includes(inputValue) ||
            allIngredients.includes(inputValue.toLocaleLowerCase())
          ) {
            article.style.display = "flex";

            GetIndividualItemsFromArticle(
              articleIndividualIngredients,
              ingredientsTagsActualized
            );
            GetIndividualItemsFromArticle(
              articleUstensilTag,
              ustensilsTagsActualized
            );
            GetIndividualItemsFromArticle(
              articleApplianceTag,
              appliancesTagsActualized
            );


            if (tagsArrayFilter.length > 0) {
              tagsArrayFilter.every((tag) => {
                if (
                  allIngredients.includes(tag.toLocaleLowerCase()) ||
                  allUstensils.includes(tag.toLocaleLowerCase()) ||
                  allAppliances.includes(tag.toLocaleLowerCase())
                ) {
                  article.style.display = "flex";

                  //push des tags dans les tableaux filtered tags
                  GetIndividualItemsFromArticle(
                    articleIndividualIngredients,
                    ingredientsFilteredTags
                  );
                  GetIndividualItemsFromArticle(
                    articleUstensilTag,
                    ustensilsFilteredTags
                  );
                  GetIndividualItemsFromArticle(
                    articleApplianceTag,
                    appliancesFilteredTags
                  );

                } else {
                  article.style.display = "none";
                }
              });
            }
          } else {
            article.style.display = "none";
          }
        } else {
          //si l'input est vide, on affiche tous les articles
          // on affiche tous les articles
          article.style.display = "flex";

          if (tagsArrayFilter.length > 0) {
            tagsArrayFilter.every((tag) => {
              if (
                allIngredients.includes(tag.toLocaleLowerCase()) ||
                allUstensils.includes(tag.toLocaleLowerCase()) ||
                allAppliances.includes(tag.toLocaleLowerCase())
              ) {
                article.style.display = "flex";
             
                 GetIndividualItemsFromArticle(
                   articleIndividualIngredients,
                   ingredientsTagsActualized
                 );
                 GetIndividualItemsFromArticle(
                   articleUstensilTag,
                   ustensilsTagsActualized
                 );
                 GetIndividualItemsFromArticle(
                   articleApplianceTag,
                   appliancesTagsActualized
                 );

                   console.log(
                     "ingredientsFilteredTags",
                     ingredientsFilteredTags
                   );
                   console.log(
                     "appliancesFilteredTags",
                     appliancesFilteredTags
                   );
                   console.log("ustensilsFilteredTags", ustensilsFilteredTags);

                   console.log(ingredientsTagsActualized);
                    console.log(appliancesTagsActualized);
                    console.log(ustensilsTagsActualized);

              } else {
                article.style.display = "none";
              }
            });
          }
        }
      });

      const inputValue = document.getElementById("mainSearch").value;

      // Le cas où l'INPUT est déjà rempli
      if (inputValue.length > 2) {

      // on normalise les tableaux
      normalizeArray(ingredientsTagsActualized);
      normalizeArray(appliancesTagsActualized);
      normalizeArray(ustensilsTagsActualized);

        const ingredientsTags = Array.from(
          document.querySelectorAll(".ingredientsTagsList")
        );
        const appliancesTags = Array.from(
          document.querySelectorAll(".appliancesTagsList")
        );
        const ustensilsTags = Array.from(
          document.querySelectorAll(".ustensilsTagsList")
        );

        displayTags(ingredientsTags, ingredientsTagsActualized);
        displayTags(appliancesTags, appliancesTagsActualized);
        displayTags(ustensilsTags, ustensilsTagsActualized);


        if (tagsArrayFilter.length > 0) {

          // on normalise les tableaux
          normalizeArray(ingredientsFilteredTags);
          normalizeArray(appliancesFilteredTags);
          normalizeArray(ustensilsFilteredTags);

          //first letter capitalization ustensilsFilteredTags
          ustensilsFilteredTags.map((tag) => {
            return tag = tag.charAt(0).toUpperCase() + tag.slice(1);
          });

          //create const for ingredientstagslist, ustensilstagslist, appliancetagslist
          const ingredientsTagsList = Array.from(
            document.querySelectorAll(".ingredientsTagsList")
          );
          const appliancesTagsList = Array.from(
            document.querySelectorAll(".appliancesTagsList")
          );
          const ustensilsTagsList = Array.from(
            document.querySelectorAll(".ustensilsTagsList")
          );

          // on affiche les tags filtrés
          displayTags(ingredientsTagsList, ingredientsFilteredTags);
          displayTags(appliancesTagsList, appliancesFilteredTags);
          displayTags(ustensilsTagsList, ustensilsFilteredTags);

          deleteTagClicked(tagsArrayFilter, ingredientsTagsList);
          deleteTagClicked(tagsArrayFilter, appliancesTagsList);
          deleteTagClicked(tagsArrayFilter, ustensilsTagsList);
        }
      }
      // Le cas où l'INPUT est vide (actualisation normale de tous les tags)
      else {
        console.log("input VIDE");
        // on affiche tous les tags
        const ingredientsTags = Array.from(
          document.querySelectorAll(".ingredientsTagsList")
        );
        const appliancesTags = Array.from(
          document.querySelectorAll(".appliancesTagsList")
        );
        const ustensilsTags = Array.from(
          document.querySelectorAll(".ustensilsTagsList")
        );
        ingredientsTags.forEach((ingredient) => {
          ingredient.style.display = "block";
        });
        appliancesTags.forEach((appliance) => {
          appliance.style.display = "block";
        });
        ustensilsTags.forEach((ustensil) => {
          ustensil.style.display = "block";
        });

        displayEveryTags(ingredientsTags);
        displayEveryTags(appliancesTags);
        displayEveryTags(ustensilsTags);

            console.log(ingredientsTagsActualized);
            console.log(appliancesTagsActualized);
            console.log(ustensilsTagsActualized);

        if (tagsArrayFilter.length > 0) {
        
          // on normalise les tableaux
          normalizeArray(ingredientsTagsActualized);
          normalizeArray(appliancesTagsActualized);
          normalizeArray(ustensilsTagsActualized);

          console.log("ingredientsFilteredTags", ingredientsFilteredTags);
          console.log("appliancesFilteredTags", appliancesFilteredTags);
          console.log("ustensilsFilteredTags", ustensilsFilteredTags);

          const ingredientsTagsList = Array.from(
            document.querySelectorAll(".ingredientsTagsList")
          );
          const appliancesTagsList = Array.from(
            document.querySelectorAll(".appliancesTagsList")
          );
          const ustensilsTagsList = Array.from(
            document.querySelectorAll(".ustensilsTagsList")
          );

          displayTags(ingredientsTagsList, ingredientsTagsActualized);
          displayTags(appliancesTagsList, appliancesTagsActualized);
          displayTags(ustensilsTagsList, ustensilsTagsActualized);

          deleteTagClicked(tagsArrayFilter, ingredientsTagsList);
          deleteTagClicked(tagsArrayFilter, appliancesTagsList);
          deleteTagClicked(tagsArrayFilter, ustensilsTagsList);
        }
      }
    });
  });
}
