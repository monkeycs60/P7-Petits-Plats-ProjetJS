export function sortingMethod() {
  async function reFetchRecipes() {
    await fetch("./../data/recipes.json")
      .then((response) => response.json())
      .then((data) => {
        const { recipes } = data;
        console.log(recipes);

        const allIngredients = [];

        recipes.forEach((recipe) => {
          const { name, ingredients, appliance, ustensils } = recipe;
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
        console.log(allIngredientsSimpleUnique);

        // PARTIE APPAREILS
        // renvoie tous les appareils dans un tableau d'objets
        const allApplicancesSimple = recipes.map((recipe) => recipe.appliance);
        const allApplicancesSimpleUnique = [
          ...new Set(allApplicancesSimple),
        ].sort();
        console.log(allApplicancesSimpleUnique);

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
        console.log(allUstensilsSimpleUniqueUppercaseSorted);

        // AJOUT DES TABLEAUX DANS LE DOM - Search pannel
        const searchPannel = document.getElementById("search-pannel");

        // tableau des ingrédients
        const divIngredients = document.createElement("div");
        divIngredients.classList.add("full-list", "ingredients");
        searchPannel.appendChild(divIngredients);
        allIngredientsSimpleUnique.forEach((ingredient) => {
          divIngredients.innerHTML += `
        <p>${ingredient}</p>
        `;
        });

        // tableau des ustensiles
        const divUstensils = document.createElement("div");
        divUstensils.classList.add("full-list", "ustensils");
        searchPannel.appendChild(divUstensils);
        allUstensilsSimpleUniqueUppercaseSorted.forEach((ustensil) => {
          divUstensils.innerHTML += `
        <p>${ustensil}</p>
        `;
        });

        // tableau des appareils
        const divApplicances = document.createElement("div");
        divApplicances.classList.add("full-list", "appliances");
        searchPannel.appendChild(divApplicances);
        allApplicancesSimpleUnique.forEach((applicance) => {
          divApplicances.innerHTML += `
        <p>${applicance}</p>
        `;
        });
      });
  }
  reFetchRecipes();
}
