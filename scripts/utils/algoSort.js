export function sortingMethod() {
  async function displayAllTagItems() {
    await fetch("./../data/recipes.json")
      .then((response) => response.json())
      .then((data) => {
        const { recipes } = data;
        const allIngredients = [];

        recipes.forEach((recipe) => {
          const { ingredients } = recipe;
          allIngredients.push(ingredients);
        });

        // PARTIE INGREDIENTS
        // applatit le tableau et renvoie tous les ingrédients dans un seul tableau d'objets
        const allIngredientsSimple = allIngredients
          .flat()
          .map((ingredient) => ingredient.ingredient);
        const allIngredientsSimpleUnique = [
          ...new Set(allIngredientsSimple),
        ].sort();

        // PARTIE APPAREILS
        // renvoie tous les appareils dans un tableau d'objets
        const allApplicancesSimple = recipes.map((recipe) => recipe.appliance);
        const allApplicancesSimpleUnique = [
          ...new Set(allApplicancesSimple),
        ].sort();

        // PARTIE USTENSILES
        // applatit le tableau et renvoie tous les ustensiles dans un seul tableau d'objets
        const allUstensilsSimple = recipes.map((recipe) => recipe.ustensils);
        const allUstensilsSimpleUnique = [
          ...new Set(allUstensilsSimple.flat()),
        ].sort();

        // remets la première lettre de chaque ustensile en majuscule
        const allUstensilsSimpleUniqueUppercase = allUstensilsSimpleUnique.map(
          (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
        );

        // sort ne prend pas en compte les accents donc on utilise la méthode locale compare
        const allUstensilsSimpleUniqueUppercaseSorted =
          allUstensilsSimpleUniqueUppercase.sort((a, b) =>
            a.localeCompare(b, "fr", { sensitivity: "base" })
          );

        // AJOUT DES TABLEAUX DANS LE DOM - Search pannel
        const searchPannel = document.getElementById("search-pannel");

        // tableau des ingrédients
        const divIngredients = document.createElement("div");
        divIngredients.classList.add("full-list", "ingredients");
        searchPannel.appendChild(divIngredients);
        allIngredientsSimpleUnique.forEach((ingredient) => {
          divIngredients.innerHTML += `
        <p class="cursor-pointer">${ingredient}</p>
        `;
        });

        // tableau des ustensiles
        const divUstensils = document.createElement("div");
        divUstensils.classList.add("full-list", "ustensils");
        searchPannel.appendChild(divUstensils);
        allUstensilsSimpleUniqueUppercaseSorted.forEach((ustensil) => {
          divUstensils.innerHTML += `
        <p class="cursor-pointer">${ustensil}</p>
        `;
        });

        // tableau des appareils
        const divApplicances = document.createElement("div");
        divApplicances.classList.add("full-list", "appliances");
        searchPannel.appendChild(divApplicances);
        allApplicancesSimpleUnique.forEach((applicance) => {
          divApplicances.innerHTML += `
        <p class="cursor-pointer">${applicance}</p>
        `;
        });

        const ingredientsList = document.querySelector(".ingredients");
        const ustensilsList = document.querySelector(".ustensils");
        const appliancesList = document.querySelector(".appliances");
        const ingredients = document.querySelector("#ingredients");
        const appliances = document.querySelector("#appareils");
        const ustensils = document.querySelector("#ustensiles");
        const ingredientsWidth = ingredients.offsetWidth;
        const appliancesWidth = appliances.offsetWidth;
        const ustensilsWidth = ustensils.offsetWidth;

        const chevronDownIngredients = document.getElementById(
          "chevronDownIngredients"
        );
        const chevronDownUstensiles = document.getElementById(
          "chevronDownUstensils"
        );
        const chevronDownAppliances = document.getElementById(
          "chevronDownAppliances"
        );
        const chevronUpIngredients = document.getElementById(
          "chevronUpIngredients"
        );
        const chevronUpUstensiles = document.querySelector(
          "#chevronUpUstensils"
        );
        const chevronUpAppliances = document.querySelector(
          "#chevronUpAppliances"
        );

        // make each of this list display none
        ingredientsList.style.display = "none";
        ustensilsList.style.display = "none";
        appliancesList.style.display = "none";

        ingredients.addEventListener("click", makeIngredientsListVisible);
        ustensils.addEventListener("click", makeUstensilsListVisible);
        appliances.addEventListener("click", makeAppliancesListVisible);
        // ingredients.addEventListener("focusout", makeIngredientsListInvisible);
        // ustensils.addEventListener("focusout", makeUstensilsListInvisible);
        // appliances.addEventListener("focusout", makeAppliancesListInvisible);

        // add event listener on focus out

        function makeIngredientsListVisible() {
          ingredientsList.style.display = "flex";
          chevronDownIngredients.style.display = "none";
          chevronUpIngredients.style.display = "block";
          ustensilsList.style.display = "none";
          appliancesList.style.display = "none";
          chevronDownUstensiles.style.display = "block";
          chevronUpUstensiles.style.display = "none";
          chevronDownAppliances.style.display = "block";
          chevronUpAppliances.style.display = "none";
          ingredients.style.width = `${ingredientsList.offsetWidth}px`;

          appliances.style.width = `${appliancesWidth}px`;
          ustensils.style.width = `${ustensilsWidth}px`;
        }

        function makeUstensilsListVisible() {
          ustensilsList.style.display = "flex";
          chevronDownUstensiles.style.display = "none";
          chevronUpUstensiles.style.display = "block";
          ingredientsList.style.display = "none";
          appliancesList.style.display = "none";
          chevronDownIngredients.style.display = "block";
          chevronUpIngredients.style.display = "none";
          chevronDownAppliances.style.display = "block";
          chevronUpAppliances.style.display = "none";
          ustensils.style.width = `${ustensilsList.offsetWidth}px`;

          ingredients.style.width = `${ingredientsWidth}px`;
          appliances.style.width = `${appliancesWidth}px`;
        }

        function makeAppliancesListVisible() {
          appliancesList.style.display = "flex";
          chevronDownAppliances.style.display = "none";
          chevronUpAppliances.style.display = "block";
          ingredientsList.style.display = "none";
          ustensilsList.style.display = "none";
          chevronDownIngredients.style.display = "block";
          chevronUpIngredients.style.display = "none";
          chevronDownUstensiles.style.display = "block";
          chevronUpUstensiles.style.display = "none";
          appliances.style.width = `${appliancesList.offsetWidth}px`;

          // on réinitialise la largeur des input quand on clique à la volée sur le troisième input
          ustensils.style.width = `${ustensilsWidth}px`;
          ingredients.style.width = `${ingredientsWidth}px`;
        }

        function makeIngredientsListInvisible() {
          ingredientsList.style.display = "none";
          chevronDownIngredients.style.display = "block";
          chevronUpIngredients.style.display = "none";
          ingredients.style.width = `${ingredientsWidth}px`;
        }

        function makeUstensilsListInvisible() {
          ustensilsList.style.display = "none";
          chevronDownUstensiles.style.display = "block";
          chevronUpUstensiles.style.display = "none";
          ustensils.style.width = `${ustensilsWidth}px`;
        }

        function makeAppliancesListInvisible() {
          appliancesList.style.display = "none";
          chevronDownAppliances.style.display = "block";
          chevronUpAppliances.style.display = "none";
          appliances.style.width = `${appliancesWidth}px`;
        }

        function sortSimpleSearch() {
          const mainSearch = document.querySelector("#mainSearch");
          const section = document.querySelector("section");

          const inputIngredients = document.getElementById("inputIngredients");
          const inputUstensiles = document.getElementById("inputUstensils");
          const inputAppliances = document.getElementById("inputAppliances");

          // TAG RECIPE LISTENER
          inputIngredients.addEventListener("keyup", (e) => {
            const { value } = e.target;

            const filteredIngredients = allIngredientsSimpleUnique.filter(
              (ingredient) =>
                ingredient.toLowerCase().includes(value.toLowerCase())
            );

            ingredientsList.innerHTML = "";
            ingredientsList.innerHTML += filteredIngredients.map(
              (ingredient) => `<p class="cursor-pointer">${ingredient}</p>`
            );
          });

          // USTENSILS RECIPE LISTENER
          inputUstensiles.addEventListener("keyup", (e) => {
            const { value } = e.target;

            const filteredUstensils = allUstensilsSimpleUnique.filter(
              (ustensil) => ustensil.toLowerCase().includes(value.toLowerCase())
            );

            ustensilsList.innerHTML = filteredUstensils.map(
              (ustensil) => `<p>${ustensil}</p>`
            );
          });

          // APPLIANCES RECIPE LISTENER
          inputAppliances.addEventListener("keyup", (e) => {
            const { value } = e.target;

            const filteredAppliances = allApplicancesSimpleUnique.filter(
              (appliance) =>
                appliance.toLowerCase().includes(value.toLowerCase())
            );
            console.log(filteredAppliances);
            appliancesList.innerHTML = filteredAppliances.map(
              (appliance) => `<p>${appliance}</p>`
            );
          });

          // RECHERCHE SIMPLE : afficher les éléments contenant le texte saisi dans l'input
          mainSearch.addEventListener("keyup", (e) => {
            const input = e.target.value.toLowerCase();

            // if input length is greater than 2
            if (input.length > 2) {
              // only display direct child of section that contains the input value
              Array.from(section.children).forEach((child) => {
                if (child.textContent.toLowerCase().includes(input)) {
                  child.style.display = "flex";

                  // RECIPES TAGS : actualiser les tags à la recherche simple
                  const listAttribute = Array.from(
                    child.children[1].children[1].children[0].children
                  );
                  listAttribute.forEach((child) => {
                    child.children[0].setAttribute("data-search", "true");
                  });
                  const dataSearch = document.querySelectorAll(
                    '[data-search="true"]'
                  );
                  let ingredientsUpdate = [];
                  dataSearch.forEach((child) => {
                    ingredientsUpdate.push(child.textContent.toLowerCase());
                  });

                  ingredientsUpdate = [...new Set(ingredientsUpdate)];
                  // sort ingredientsUpdate

                  ingredientsUpdate.sort();
                  // first letter of each word in uppercase
                  ingredientsUpdate = ingredientsUpdate.map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  );

                  // change ingredientsList innerHTML to display all child.textcontent of datasearch
                  ingredientsList.innerHTML = "";
                  ingredientsUpdate.forEach((element) => {
                    ingredientsList.innerHTML += ` <p>${element}</p>`;
                  });

                  // APPLIANCES TAGS : actualiser les tags à la recherche simple
                  const listApplianceAttribute = Array.from(
                    child.children[1].children[2].children[0].children
                  );

                  listApplianceAttribute.forEach((child) => {
                    child.children[0].setAttribute("data-appliance", "true");
                  });
                  const dataAppliance = document.querySelectorAll(
                    '[data-appliance="true"]'
                  );
                  console.log(dataAppliance);

                  let appliancesUpdate = [];
                  dataAppliance.forEach((child) => {
                    appliancesUpdate.push(child.textContent.toLowerCase());
                  });

                  appliancesUpdate = [...new Set(appliancesUpdate)];

                  // sort appliancesUpdate
                  appliancesUpdate.sort();

                  // first letter of each word in uppercase
                  appliancesUpdate = appliancesUpdate.map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  );

                  // change appliancesList innerHTML to display all child.textcontent of dataappliance
                  appliancesList.innerHTML = "";
                  appliancesUpdate.forEach((element) => {
                    appliancesList.innerHTML += ` <p>${element}</p>`;
                  });

                  // USTEENSILS TAGS : actualiser les tags à la recherche simple
                  const listUstensilAttribute = Array.from(
                    child.children[1].children[2].children[1].children
                  );
                  listUstensilAttribute.forEach((child) => {
                    child.children[0].setAttribute("data-ustensil", "true");
                  });
                  const dataUstensil = document.querySelectorAll(
                    '[data-ustensil="true"]'
                  );
                  let ustensilsUpdate = [];
                  dataUstensil.forEach((child) => {
                    ustensilsUpdate.push(child.textContent.toLowerCase());
                  });

                  ustensilsUpdate = [...new Set(ustensilsUpdate)];
                  console.log(ustensilsUpdate);

                  // sort ustensilsUpdate
                  ustensilsUpdate.sort();

                  // first letter of each word in uppercase
                  ustensilsUpdate = ustensilsUpdate.map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  );

                  // change ustensilsList innerHTML to display all child.textcontent of dataustensil
                  ustensilsList.innerHTML = "";
                  ustensilsUpdate.forEach((element) => {
                    ustensilsList.innerHTML += ` <p>${element}</p>`;
                  });
                } else {
                  child.style.display = "none";
                  child.setAttribute("data-search", "false");
                  const listAttribute = Array.from(
                    child.children[1].children[1].children[0].children
                  );
                  listAttribute.forEach((child) => {
                    child.children[0].removeAttribute("data-search");
                  });

                  const listApplianceAttribute = Array.from(
                    child.children[1].children[2].children[0].children
                  );
                  listApplianceAttribute.forEach((child) => {
                    child.children[0].removeAttribute("data-appliance");
                  });

                  const listUstensilAttribute = Array.from(
                    child.children[1].children[2].children[1].children
                  );
                  listUstensilAttribute.forEach((child) => {
                    child.children[0].removeAttribute("data-ustensil");
                  });
                }
              });

              // APPLIANCES TAGS : actualiser les tags à la recherche simple
              console.log(allApplicancesSimpleUnique);
            } else {
              // display all children of section
              Array.from(section.children).forEach((child) => {
                child.style.display = "flex";
              });
              ingredientsList.innerHTML = "";
              allIngredientsSimpleUnique.forEach((element) => {
                ingredientsList.innerHTML += `<p>${element}</p>`;
              });
              appliancesList.innerHTML = "";
              allApplicancesSimpleUnique.forEach((element) => {
                appliancesList.innerHTML += `<p>${element}</p>`;
              });
              ustensilsList.innerHTML = "";
              allUstensilsSimpleUnique.forEach((element) => {
                ustensilsList.innerHTML += `<p>${element}</p>`;
              });
            }

            // if there is no card to display in section, display an error message
            if (section.innerText === "") {
              const noResult = document.querySelector(".no-result");
              noResult.style.display = "flex";
              ingredientsList.innerHTML = "";
              appliancesList.innerHTML = "";
              ustensilsList.innerHTML = "";
            } else {
              const noResult = document.querySelector(".no-result");
              noResult.style.display = "none";
            }
          });
        }
        sortSimpleSearch();
      });
  }

  displayAllTagItems();
}
