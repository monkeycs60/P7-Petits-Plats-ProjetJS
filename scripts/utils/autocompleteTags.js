export function autocompleteTags() {
  const inputIngredients = document.querySelector("#inputIngredients");
  const inputAppliances = document.querySelector("#inputAppliances");
  const inputUstensils = document.querySelector("#inputUstensils");

  function autoCompleteOnKeyUp(
    e,
    tagAreaItems,
    allItemTags,
    allItemsOfArticle
  ) {
    const tabOfItems = [];

    const allTagsOfSelectedItem = document.querySelectorAll(`.${tagAreaItems}`);
    allTagsOfSelectedItem.forEach((tag) => {
      tabOfItems.push(tag.textContent.toLocaleLowerCase());
    });

    const inputValue = e.target.value.toLocaleLowerCase();
    const itemsTagsList = document.querySelectorAll(`.${allItemTags}`);
    let itemsTagsListArray = [];
    const allArticles = document.querySelectorAll("article");
    const allArticlesArray = Array.from(allArticles);
    const filteredArticles = [];

    allArticlesArray.forEach((article) => {
      if (article.style.display === "none") {
      } else {
        filteredArticles.push(article);
        article.querySelectorAll(`.${allItemsOfArticle}`).forEach((item) => {
          itemsTagsListArray.push(item.textContent.toLocaleLowerCase());
        });
      }
    });

    itemsTagsListArray = [...new Set(itemsTagsListArray)].sort();
    itemsTagsListArray = itemsTagsListArray.map((hello) =>
      hello.toLocaleLowerCase()
    );

    const filteredItemsTagsListArray = itemsTagsListArray.filter(
      (itemFiltered) => itemFiltered.includes(inputValue.toLocaleLowerCase())
    );

    filteredItemsTagsListArray.forEach((element) => {
      if (tabOfItems.includes(element)) {
        filteredItemsTagsListArray.splice(
          filteredItemsTagsListArray.indexOf(element),
          1
        );
      }
    });

    itemsTagsList.forEach((allItems) => {
      if (
        !filteredItemsTagsListArray.includes(
          allItems.textContent.toLocaleLowerCase()
        )
      ) {
        allItems.style.display = "none";
      } else {
        allItems.style.display = "block";
      }
    });
  }

  inputIngredients.addEventListener("keyup", (e) => {
    autoCompleteOnKeyUp(
      e,
      "tagIngredients",
      "ingredientsTagsList",
      "preciseIngredient"
    );
  });

  inputAppliances.addEventListener("keyup", (e) => {
    autoCompleteOnKeyUp(
      e,
      "tagAppliances",
      "appliancesTagsList",
      "applianceTag"
    );
  });

  inputUstensils.addEventListener("keyup", (e) => {
    autoCompleteOnKeyUp(e, "tagUstensils", "ustensilsTagsList", "ustensilTag");
  });
}
