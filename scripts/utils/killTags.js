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
       array = array.map((item) => item.toLocaleLowerCase());
       array = array.map(
         (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
       );
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

          console.log(ingredientsFilteredTags);
          console.log(appliancesFilteredTags);

          // si ça correspond aux tags, on n'affiche pas les tags ingrédients
          tagsArrayFilter.forEach((tag) => {
            ingredientsTagsList.forEach((ingredient) => {
              if (ingredient.textContent === tag) {
                ingredient.style.display = "none";
              }
            });
          });

          // si ça correspond aux tags, on n'affiche pas les tags ustensils
          tagsArrayFilter.forEach((tag) => {
            ustensilsTagsList.forEach((ustensil) => {
              if (ustensil.textContent === tag) {
                ustensil.style.display = "none";
              }
            });
          });

          // si ça correspond aux tags, on n'affiche pas les tags appareils
          tagsArrayFilter.forEach((tag) => {
            appliancesTagsList.forEach((appliance) => {
              if (appliance.textContent === tag) {
                appliance.style.display = "none";
              }
            });
          });
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

        if (tagsArrayFilter.length > 0) {
          ingredientsFilteredTags = [
            ...new Set(ingredientsFilteredTags),
          ].sort();
          appliancesFilteredTags = [...new Set(appliancesFilteredTags)].sort();
          ustensilsFilteredTags = [...new Set(ustensilsFilteredTags)].sort(
            (a, b) => a.localeCompare(b)
          );

          ingredientsFilteredTags.forEach((ingredient) => {
            ingredient.toLowerCase();
          });

          appliancesFilteredTags.forEach((appliance) => {
            appliance.toLowerCase();
          });

          ustensilsFilteredTags.forEach((ustensil) => {
            ustensil.toLowerCase();
          });

          ingredientsFilteredTags = ingredientsFilteredTags.map(
            (ingredient) => {
              return ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
            }
          );

          ustensilsFilteredTags = ustensilsFilteredTags.map((ustensil) => {
            return ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
          });

          appliancesFilteredTags = appliancesFilteredTags.map((appliance) => {
            return appliance.charAt(0).toUpperCase() + appliance.slice(1);
          });

          const ingredientsTagsList = Array.from(
            document.querySelectorAll(".ingredientsTagsList")
          );
          const appliancesTagsList = Array.from(
            document.querySelectorAll(".appliancesTagsList")
          );
          const ustensilsTagsList = Array.from(
            document.querySelectorAll(".ustensilsTagsList")
          );

          ingredientsTagsList.forEach((ingredient) => {
            if (ingredientsFilteredTags.includes(ingredient.textContent)) {
              ingredient.style.display = "block";
            } else {
              ingredient.style.display = "none";
            }
          });

          appliancesTagsList.forEach((appliance) => {
            if (appliancesFilteredTags.includes(appliance.textContent)) {
              appliance.style.display = "block";
            } else {
              appliance.style.display = "none";
            }
          });

          ustensilsTagsList.forEach((ustensil) => {
            if (ustensilsFilteredTags.includes(ustensil.textContent)) {
              ustensil.style.display = "block";
            } else {
              ustensil.style.display = "none";
            }
          });

          // si ça correspond aux tags, on n'affiche pas les tags ingrédients
          tagsArrayFilter.forEach((tag) => {
            ingredientsTagsList.forEach((ingredient) => {
              if (ingredient.textContent === tag) {
                ingredient.style.display = "none";
              }
            });
          });

          // si ça correspond aux tags, on n'affiche pas les tags ustensils
          tagsArrayFilter.forEach((tag) => {
            ustensilsTagsList.forEach((ustensil) => {
              if (ustensil.textContent === tag) {
                ustensil.style.display = "none";
              }
            });
          });

          // si ça correspond aux tags, on n'affiche pas les tags appareils
          tagsArrayFilter.forEach((tag) => {
            appliancesTagsList.forEach((appliance) => {
              if (appliance.textContent === tag) {
                appliance.style.display = "none";
              }
            });
          });
        }
      }
    });
  });
}
