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
      "h-[40vh]",
      "md:h-[30vh]",
      "xl:h-[30vh]",
      "2xl:h-[35vh]",
      "2xl:w-[26vw]"
    );
    article.innerHTML = `
    <div id="article-image">
    <img class="w-[85vw] h-[19vh] rounded-lg rounded-b-none object-cover md:h-[14vh] 2xl:h-[17vh] 2xl:w-[26vw]" src="./../../assets/restaurantpreview.png" alt="restaurant card" />
    </div>
    <div id="article-content" class="h-[21vh] w-full p-1 flex flex-col rounded-lg rounded-t-none md:h-[16vh] md:p-2 2xl:h-[18vh] 2xl:w-[26vw] 2xl:p-5 2xl:justify-center">
    <div id="card-top" class="h-[6vh] flex w-full justify-between items-center md:h-[5vh] 2xl:h-[6vh]">
        <h2 class="text-base block-with-text 2xl:text-xl">${name}</h2>
        <div id="clock-time" class="flex text-base w-1/6 justify-around items-center 2xl:text-xl" >
            <em class="fa-regular fa-clock"></em>
            <p class="font-bold">${time}</p>
        </div>
    </div>
    <div id="card-bottom" class="h-[12vh] flex overflow-hidden md:h-[11vh] xl:h-[12vh] 2xl:pt-[1vh]">
        <ul class="ingredientsList text-xs w-1/2 leading-4 md:h-[6vh] md:leading-3 2xl:leading-5 2xl:text-base">
        </ul>
        <p class="description text-xs w-1/2 leading-4 max-h-16 md:max-h-16 line-clamp-4 2xl:line-clamp-5 md:leading-4 xl:[8vh] 2xl:max-h-20 2xl:leading-4 2xl:text-base">${description}</p>
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
