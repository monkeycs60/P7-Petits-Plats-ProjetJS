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
      "bg-zinc-200",
      "rounded-xl",
      "w-full",
      "h-[35vh]",
      "md:h-[25vh]",
      "2xl:h-[35vh]",
      "2xl:w-[26vw]"
    );
    article.innerHTML = `
    <div id="article-image">
    <img class="w-[85vw] h-[17vh] rounded-lg rounded-b-none object-cover md:h-[12vh] 2xl:h-[17vh] 2xl:w-[26vw]" src="./../../assets/restaurantpreview.png" alt="restaurant card" />
    </div>
    <div id="article-content" class="h-[18vh] w-full p-1 flex flex-col  rounded-lg rounded-t-none md:h-[13vh] md:p-2 2xl:h-[18vh] 2xl:w-[26vw] 2xl:p-5 2xl:justify-center">
    <div id="card-top" class="h-[6vh] flex w-full justify-between items-center md:h-[4vh] 2xl:h-[6vh]">
        <h2 class="text-base block-with-text 2xl:text-xl">${name}</h2>
        <div id="clock-time" class="flex text-base w-1/6 justify-around items-center 2xl:text-xl" >
            <em class="fa-regular fa-clock"></em>
            <p class="font-bold">${time}</p>
        </div>
    </div>
    <div id="card-bottom" class="h-[12vh] flex 2xl:pt-[1vh]  md:h-[9vh] 2xl:h-[12vh]">
        <ul class="ingredientsList text-xs w-1/2 leading-4 overflow-spots-fullrecipe md:leading-3 2xl:leading-5">
        </ul>
        <p class="description text-xs w-1/2 leading-4 overflow-spots-fullrecipe md:leading-3 2xl:leading-5">${description}</p>
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
