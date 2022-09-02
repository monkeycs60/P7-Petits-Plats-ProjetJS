export function recipeCardFactory(recipe) {
  const { name, time, ingredients, description } = recipe;

  function createRecipeCard() {
    // card container
    const article = document.createElement("article");
    article.classList.add(
      "flex",
      "justify-center",
      "w-full",
      "bg-green-300",
      "rounded-md"
    );
    article.innerHTML = `
    <div id="article-image">
    </div>
    <div id="article-content" class="w-[90%] flex flex-col justify-center bg-orange-600">
    <div id="card-top" class="flex w-full justify-between bg-blue-700">
        <h2>${name}</h2>
        <div id="clock-time" class="flex w-1/5 justify-around items-center text-xl bg-yellow-400" >
            <em class="fa-regular fa-clock"></em>
            <p>${time}</p>
        </div>
    </div>
    <div id="card-bottom" class="flex">
        <ul class="ingredientsList text-xs w-1/2 bg-red-300">
        </ul>
        <p class="description text-xs w-1/2">${description}</p>
    </div>

    </div>
`;
    const listIngredients = article.querySelector(".ingredientsList");
    ingredients.forEach((uniqueIngredient) => {
      const { ingredient, quantity, unit } = uniqueIngredient;
      const li = document.createElement("li");
      li.textContent = `${ingredient}: ${quantity} ${unit} `;
      if (quantity === undefined) {
        li.innerText = `${ingredient}: ${unit} `;
      }
      if (unit === undefined) {
        li.innerText = `${ingredient}: ${quantity} `;
      }
      listIngredients.appendChild(li);
    });

    return article;
  }

  return {
    createRecipeCard,
  };
}
