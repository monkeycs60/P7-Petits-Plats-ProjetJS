const gridArea = document.querySelector("#grid-area");

async function getMeal() {
  await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      console.log(meal);
      // create a new div element
      const mealDiv = document.createElement("div");
      // add a class to the div
      mealDiv.className = "meal";
      // create a template for the meal
      const mealTemplate = `
            <h1 class="text-2xl text-center italic text-orange-600">${meal.strMeal}</h1>
            <img class="" src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200px" height="200px">
            <p class="text-sm text-green-800 border-8">${meal.strInstructions}</p>
        `;
      // add the template to the div
      mealDiv.innerHTML = mealTemplate;
      // add classes to the meal div
      mealDiv.classList.add(
        "max-h-500",
        "w-full",
        "flex",
        "flex-col",
        "justify-center",
        "align-center",
        "bg-orange-100",
        "border-8",
        "border-orange-600",
        "rounded-lg"
      );

      // add a class to p that text overflow ellipsis and hide the text when it is too long
      mealDiv
        .querySelector("p")
        .classList.add(
          "text-overflow",
          "whitespace-no-wrap",
          "overflow-hidden",
          "text-center"
        );

      // center the img
      mealDiv.querySelector("img").classList.add("mx-auto");

      // height of h1 is 20% of the height of the meal div
      mealDiv.querySelector("h1").style.height = "75px";
      // height of p is 40% of the height of the meal div
      mealDiv.querySelector("p").style.height = "225px";

      // add the div to the page
      gridArea.appendChild(mealDiv);
    });
}

for (let i = 0; i < 5; i++) {
  getMeal();
}
