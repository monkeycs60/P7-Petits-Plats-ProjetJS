export function recipeCardFactory(recipe) {
  const { name, time, ingredients, description } = recipe;

  function createRecipeCard() {
    // card container
    const article = document.createElement("article");
    article.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "w-full",
      "bg-green-300",
      "rounded-xl",
      "h-[35vh]",
      "w-[25vw]"
    );
    article.innerHTML = `
    <div id="article-image">
    <img class="w-[25vw] h-[17vh] rounded-lg rounded-b-none object-cover" src="./../../assets/restaurantpreview.png" alt="restaurant card" />
    </div>
    <div id="article-content" class="w-[25vw] h-[18vh] p-5 flex flex-col justify-center bg-orange-600 rounded-lg rounded-t-none">
    <div id="card-top" class="h-[5vh] flex w-full justify-between items-center bg-blue-700">
        <h2 class="text-xl">${name}</h2>
        <div id="clock-time" class="flex w-1/5 justify-around items-center text-xl bg-yellow-400" >
            <em class="fa-regular fa-clock"></em>
            <p class="font-bold">${time}</p>
        </div>
    </div>
    <div id="card-bottom" class="flex h-[13vw]">
        <ul class="ingredientsList text-xs w-1/2 bg-red-300">
        </ul>
        <p class="description text-xs w-1/2 overflow-spots">${description}</p>
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
