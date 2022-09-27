export function tagsActualized(
  recipes,
  ingredientsTags,
  appliancesTags,
  ustensilsTags
) {
  // TAGLISTS CHIANTES

  // listeners clic TAGS
  const tagArea = document.querySelector(".tag-area");

  const ingredientsTagsBar = document.querySelectorAll(".ingredientsList");
  const appliancesTagsBar = document.querySelectorAll(".appliancesList");
  const ustensilsTagsBar = document.querySelectorAll(".ustensilsList");

  const ingredientsTagsList = document.querySelectorAll(".ingredientsTagsList");
  const appliancesTagsList = document.querySelectorAll(".appliancesTagsList");
  const ustensilsTagsList = document.querySelectorAll(".ustensilsTagsList");

  // liste des listes
  const ingredientsFull = document.getElementsByClassName("ingredients");
  const appliancesFull = document.querySelectorAll(".appliances");
  const ustensilsFull = document.querySelectorAll(".ustensils");

  let filteredIngredients = [];
  let filteredAppliances = [];
  let filteredUstensils = [];

  // on écoute les tags INGREDIENTS
  ingredientsTagsList.forEach((ingredientTags) => {
    ingredientTags.addEventListener("click", (event) => {
      console.log("click");
      // on récupère la valeur du tag
      const tagValue = event.target.innerHTML;

      // on l'affiche dans un span child de tagarea
      tagArea.innerHTML += `<span class="tag cursor-pointer">${tagValue}<i class="fas fa-times"></i></span>`;
      // on supprime le tag de la liste
      event.target.style.display = "none";

      
      const article = document.querySelectorAll("article");
      const articleArray = Array.from(article);


     // for each article, if its textContent doesn't contain the tagValue, we hide it
      articleArray.forEach((article) => {
        if (!article.textContent.includes(tagValue)) {
          article.style.display = "none";
        } else {
          article.style.display = "flex";
          article.querySelectorAll("preciseIngredients").forEach((ing) => {
            filteredIngredients.push(ing.textContent);
        });
        console.log(article.children);
        filteredAppliances.push(article.querySelectorAll("applianceTag"));

      }});
  
      
      // on actualise la liste d'ingrédients
      ingredientsTags = ingredientsTags.filter(
        (ingredient) => ingredient === tagValue
        );
        console.log(ingredientsTags);
        ingredientsFull[0].innerHTML = "";
        ingredientsTags.forEach((ingredient) => {
          ingredientsFull[0].innerHTML += `<p class="cursor-pointer ingredientsTagsList">${ingredient}</p>`;
        }
        );
      });
    });
    console.log(filteredIngredients);
    console.log(filteredAppliances);
}
  
