export function tagsActualized(ingredientsTags, appliancesTags, ustensilsTags) {
    
    // actualise les tableaux de tags avec les données affichées
    const ingredientsList = document.querySelectorAll(".ingredientsList");
    const appliancesList = document.querySelectorAll(".appliancesList");
    const ustensilsList = document.querySelectorAll(".ustensilsList");


    // actualise les tableaux de tags avec les données affichées
    ingredientsList.forEach((ingredient) => {
        if (!ingredientsTags.includes(ingredient.textContent)) {
            ingredientsTags.push(ingredient.textContent);
        }
    });
    appliancesList.forEach((appliance) => {
        if (!appliancesTags.includes(appliance.textContent)) {
            appliancesTags.push(appliance.textContent);
        }
    });
    ustensilsList.forEach((ustensil) => {
        if (!ustensilsTags.includes(ustensil.textContent)) {
            ustensilsTags.push(ustensil.textContent);
        }
    });

   console.log(ingredientsTags, appliancesTags, ustensilsTags);

  
}