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
        const allIngredients = [];
        const articleIngredients = Array.from(
          article.querySelectorAll(".preciseIngredient")
        );
        articleIngredients.forEach((ingredient) => {
          allIngredients.push(ingredient.textContent.toLocaleLowerCase());
        });
        const articleAppliance =
          article.querySelector(".applianceTag").textContent;
        const allUstensils = [];
        const articleUstensils = Array.from(
          article.querySelectorAll(".ustensilTag")
        );
        articleUstensils.forEach((ustensil) => {
          allUstensils.push(ustensil.textContent.toLocaleLowerCase());
        });

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
        const articleApplianceTag = article.querySelector(".applianceTag");

        // il faut montrer les articles qui correspondent à l'input de 3 lettres, puis filtrer
        const inputValue = document.getElementById("mainSearch").value;

        // Le cas où l'INPUT est déjà rempli
        if (inputValue.length > 2) {
          // on affiche les articles qui correspondent à l'input
          if (
            articleDescription.includes(inputValue) ||
            articleTitle.includes(inputValue) ||
            allIngredients.includes(inputValue)
          ) {
            article.style.display = "flex";
            // on push articleIndividualIngredients dans le tableau actualisé
            articleIndividualIngredients.forEach((ingredient) => {
              ingredientsTagsActualized.push(ingredient.textContent);
            });
            // on push articleUstensilTag dans le tableau actualisé
            articleUstensilTag.forEach((ustensil) => {
              ustensilsTagsActualized.push(ustensil.textContent);
            });
            // on push articleApplianceTag dans le tableau actualisé
            appliancesTagsActualized.push(articleApplianceTag.textContent);

           if (tagsArrayFilter.length > 0) {

            tagsArrayFilter.every((tag) => {
              if (
                allIngredients.includes(tag.toLocaleLowerCase()) ||
                allUstensils.includes(tag.toLocaleLowerCase()) ||
                articleAppliance.includes(tag.toLocaleLowerCase())
              ) {
                article.style.display = "flex";
                //push des tags dans les tableaux filtered tags
                articleIndividualIngredients.forEach((ingredient) => {
                  ingredientsFilteredTags.push(ingredient.textContent);
                });
                articleUstensilTag.forEach((ustensil) => {
                  ustensilsFilteredTags.push(ustensil.textContent);
                });
                appliancesFilteredTags.push(articleApplianceTag.textContent);

              } else {
                article.style.display = "none";
              }
            });


          }
          } else {
            article.style.display = "none";
          }
        } else {
          // on affiche tous les articles
          article.style.display = "flex";

          if (tagsArrayFilter.length > 0) {
              console.log("pas d'input rempli mais des tags contenus");
         
              tagsArrayFilter.every((tag) => {
                if (
                  allIngredients.includes(tag.toLocaleLowerCase()) ||
                  allUstensils.includes(tag.toLocaleLowerCase()) ||
                  articleAppliance.includes(tag)
                ) {
                  console.log("ca a marché");
                  article.style.display = "flex";
                  //push des tags dans les tableaux filtered tags
                  articleIndividualIngredients.forEach((ingredient) => {
                    ingredientsFilteredTags.push(ingredient.textContent);
                  });
                  articleUstensilTag.forEach((ustensil) => {
                    ustensilsFilteredTags.push(ustensil.textContent);
                  });
                  appliancesFilteredTags.push(articleApplianceTag.textContent);
  
                } else {
                  console.log("bug quelque part");
                  article.style.display = "none";
                }
              });
            }
        }
      });

      const inputValue = document.getElementById("mainSearch").value;

      // Le cas où l'INPUT est déjà rempli
      if (inputValue.length > 2) {
        // on supprime les doublons et on trie les tableaux
        ingredientsTagsActualized = [
          ...new Set(ingredientsTagsActualized),
        ].sort();
        appliancesTagsActualized = [
          ...new Set(appliancesTagsActualized),
        ].sort();
        ustensilsTagsActualized = [...new Set(ustensilsTagsActualized)].sort(
          (a, b) => a.localeCompare(b)
        );

        ingredientsTagsActualized.forEach((ingredient) => {
          ingredient.toLowerCase();
        });
        appliancesTagsActualized.forEach((appliance) => {
          appliance.toLowerCase();
        });
        ustensilsTagsActualized.forEach((ustensil) => {
          ustensil.toLowerCase();
        });

        ingredientsTagsActualized = ingredientsTagsActualized.map(
          (ingredient) => {
            return ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
          }
        );
        ustensilsTagsActualized = ustensilsTagsActualized.map((ustensil) => {
          return ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
        });
        //same for appliance
        appliancesTagsActualized = appliancesTagsActualized.map((appliance) => {
          return appliance.charAt(0).toUpperCase() + appliance.slice(1);
        });

        const ingredientsTags = Array.from(
          document.querySelectorAll(".ingredientsTagsList")
        );
        const appliancesTags = Array.from(
          document.querySelectorAll(".appliancesTagsList")
        );
        const ustensilsTags = Array.from(
          document.querySelectorAll(".ustensilsTagsList")
        );

        // on ne display pas les tags qui ne correspondent pas à la recherche
        ingredientsTags.forEach((ingredient) => {
          if (ingredientsTagsActualized.includes(ingredient.textContent)) {
            ingredient.style.display = "block";
          } else {
            ingredient.style.display = "none";
          }
        });
        appliancesTags.forEach((appliance) => {
          if (appliancesTagsActualized.includes(appliance.textContent)) {
            appliance.style.display = "block";
          } else {
            appliance.style.display = "none";
          }
        });
        ustensilsTags.forEach((ustensil) => {
          if (ustensilsTagsActualized.includes(ustensil.textContent)) {
            ustensil.style.display = "block";
          } else {
            ustensil.style.display = "none";
          }
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
          //same for appliance
          appliancesFilteredTags = appliancesFilteredTags.map((appliance) => {
            return appliance.charAt(0).toUpperCase() + appliance.slice(1);
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

          // on ne display pas les tags qui ne correspondent pas à la recherche
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

