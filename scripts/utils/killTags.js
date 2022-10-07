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
      ingredientsTagsActualized = [];
      appliancesTagsActualized = [];
      ustensilsTagsActualized = [];

      console.log(tagsArrayFilter);

      // on supprime le tag du tableau des tags sélectionnés
      tagsArrayFilter.splice(
        tagsArrayFilter.indexOf(cross.previousSibling.textContent),
        1
      );
      console.log(tagsArrayFilter);

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
        console.log(inputValue);

        // Le cas où l'INPUT est déjà rempli
        if (inputValue.length > 2) {
          // on affiche les articles qui correspondent à l'input
          if (
            articleDescription.includes(inputValue) ||
            articleTitle.includes(inputValue) ||
            allIngredients.includes(inputValue)
          ) {
            article.style.display = "flex";
            console.log("input > 2 ET article affiché");
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
          } else {
            console.log("input > 2 mais ne correspond pas");
            article.style.display = "none";
          }
        } else {
          console.log("input COURT < 2");
          // on affiche tous les articles
          article.style.display = "flex";
        }
      });
      // on supprime les doublons et on trie les tableaux
      ingredientsTagsActualized = [
        ...new Set(ingredientsTagsActualized),
      ].sort();
      appliancesTagsActualized = [...new Set(appliancesTagsActualized)].sort();
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

      
      ingredientsTagsActualized = ingredientsTagsActualized.map((ingredient) => {
        return ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
      });
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
      const appliancesTags = Array.from(document.querySelectorAll(".appliancesTagsList"));
      const ustensilsTags = Array.from(document.querySelectorAll(".ustensilsTagsList"));

      // on ne display pas les tags qui ne correspondent pas à la recherche
      ingredientsTags.forEach((ingredient) => {
        if (ingredientsTagsActualized.includes(ingredient.textContent)) {
          ingredient.style.display = "block";
        } else {
          ingredient.style.display = "none";
        }
      });
      appliancesTags.forEach((appliance) => {
        console.log(appliance);
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
    });
  });
}
