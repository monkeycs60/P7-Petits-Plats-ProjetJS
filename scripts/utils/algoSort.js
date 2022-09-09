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

        chevronDownIngredients.addEventListener(
          "click",
          makeIngredientsListVisible
        );
        chevronDownUstensiles.addEventListener(
          "click",
          makeUstensilsListVisible
        );
        chevronDownAppliances.addEventListener(
          "click",
          makeAppliancesListVisible
        );
        chevronUpIngredients.addEventListener(
          "click",
          makeIngredientsListInvisible
        );
        chevronUpUstensiles.addEventListener(
          "click",
          makeUstensilsListInvisible
        );
        chevronUpAppliances.addEventListener(
          "click",
          makeAppliancesListInvisible
        );

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
          console.log(section);

          const inputIngredients = document.getElementById("inputIngredients");
          const inputUstensiles = document.getElementById("inputUstensils");
          const inputAppliances = document.getElementById("inputAppliances");

          // create a single array containing the textcontent of all children of ingredientsList + ustensilsList + appliancesList
          const allTagsArray = Array.from(ingredientsList.children)
            .map((child) => child.textContent)
            .concat(
              Array.from(ustensilsList.children).map(
                (child) => child.textContent
              )
            )
            .concat(
              Array.from(appliancesList.children).map(
                (child) => child.textContent
              )
            );
          // console.log(allTagsArray);

          // RECHERCHE SIMPLE : afficher les éléments contenant le texte saisi dans l'input
          mainSearch.addEventListener("keyup", (e) => {
            const input = e.target.value.toLowerCase();
            let tabLi = [];

            // if input length is greater than 2
            if (input.length > 2) {
              // only display direct child of section that contains the input value
              Array.from(section.children).forEach((child) => {
                if (child.textContent.toLowerCase().includes(input)) {
                  child.style.display = "flex";
                

               
                } else {
                  child.style.display = "none";
                }
              });
             

console.log(tabLi);
          
  

            } else {
              // display all children of section
              Array.from(section.children).forEach((child) => {
                child.style.display = "flex";
              });
            }
          });
        }
        sortSimpleSearch();
      });
  }

  displayAllTagItems();
}
