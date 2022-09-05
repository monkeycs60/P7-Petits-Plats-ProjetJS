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
      "w-full",
      "h-[35vh]",
      "2xl:w-[26vw]"
    );
    article.innerHTML = `
    <div id="article-image">
    <img class="w-[85vw] h-[17vh] rounded-lg rounded-b-none object-cover 2xl:w-[26vw]" src="./../../assets/restaurantpreview.png" alt="restaurant card" />
    </div>
    <div id="article-content" class="h-[18vh] w-full p-1 flex flex-col bg-orange-600 rounded-lg rounded-t-none 2xl:w-[26vw] 2xl:p-5 2xl:justify-center">
    <div id="card-top" class="h-[6vh] flex w-full justify-between items-center bg-blue-700">
        <h2 class="text-base block-with-text 2xl:text-xl">${name}</h2>
        <div id="clock-time" class="flex text-base w-1/6 justify-around items-center 2xl:text-xl bg-yellow-400" >
            <em class="fa-regular fa-clock"></em>
            <p class="font-bold">${time}</p>
        </div>
    </div>
    <div id="card-bottom" class="h-[12vh] flex 2xl:pt-[1vh] bg-green-400 2xl-[12vh]">
        <ul class="ingredientsList text-xs w-1/2 bg-red-300 leading-5 overflow-spots-fullrecipe">
        </ul>
        <p class="description text-xs w-1/2 leading-5 overflow-spots-fullrecipe">${description}</p>
    </div>

    </div>
`;
    const listIngredients = article.querySelector(".ingredientsList");
    ingredients.forEach((uniqueIngredient) => {
      const { ingredient, quantity, unit } = uniqueIngredient;
      const li = document.createElement("li");
      li.innerHTML = `<span class="font-bold">${ingredient}</span>: ${quantity} ${unit} `;
      if (quantity === undefined) {
        li.innerHTML = `<span class="font-bold">${ingredient}</span>: ${unit} `;
      }
      if (unit === undefined) {
        li.innerHTML = `<span class="font-bold">${ingredient}</span>: ${quantity}`;
      }
      if (unit === undefined && quantity === undefined) {
        li.innerHTML = `<span class="font-bold">${ingredient}</span>`;
      }
      listIngredients.appendChild(li);
    });

    return article;
  }

  return {
    createRecipeCard,
  };
}
