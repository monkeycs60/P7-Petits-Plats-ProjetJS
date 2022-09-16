

        function sortSimpleSearch() {
          const mainSearch = document.querySelector("#mainSearch");
          const section = document.querySelector("section");

          // TAG RECIPE LISTENER
          inputIngredients.addEventListener("keyup", (e) => {
            const { value } = e.target;

            const filteredIngredients = allIngredientsSimpleUnique.filter(
              (ingredient) =>
                ingredient.toLowerCase().includes(value.toLowerCase())
            );

            divIngredients.innerHTML = "";
            filteredIngredients.forEach((ingredient) => {
              const p = document.createElement("p");
              p.classList.add("cursor-pointer", "ingredientListListener");
              p.innerText = ingredient;
              divIngredients.appendChild(p);
            });
          });

          // USTENSILS RECIPE LISTENER
          inputUstensiles.addEventListener("keyup", (e) => {
            const { value } = e.target;

            const filteredUstensils = allUstensilsSimpleUnique.filter(
              (ustensil) => ustensil.toLowerCase().includes(value.toLowerCase())
            );

            divUstensils.innerHTML = "";
            filteredUstensils.forEach((ustensil) => {
              const p = document.createElement("p");
              p.classList.add("cursor-pointer");
              p.innerText = ustensil;
              divUstensils.appendChild(p);
            });
          });

          // APPLIANCES RECIPE LISTENER
          inputAppliances.addEventListener("keyup", (e) => {
            const { value } = e.target;

            const filteredAppliances = allApplicancesSimpleUnique.filter(
              (appliance) =>
                appliance.toLowerCase().includes(value.toLowerCase())
            );

            divApplicances.innerHTML = "";
            filteredAppliances.forEach((appliance) => {
              const p = document.createElement("p");
              p.classList.add("cursor-pointer");
              p.innerText = appliance;
              divApplicances.appendChild(p);
            });
          });

          // RECHERCHE SIMPLE : afficher les éléments contenant le texte saisi dans l'input
          mainSearch.addEventListener("keyup", (e) => {
            const input = e.target.value.toLowerCase();

            // if input length is greater than 2
            if (input.length > 2) {
              // only display direct child of section that contains the input value
              Array.from(section.children).forEach((child) => {
                if (child.textContent.toLowerCase().includes(input)) {
                  child.style.display = "flex";

                  // RECIPES TAGS : actualiser les tags à la recherche simple
                  const listAttribute = Array.from(
                    child.children[1].children[1].children[0].children
                  );
                  listAttribute.forEach((child) => {
                    child.children[0].setAttribute("data-search", "true");
                  });
                  const dataSearch = document.querySelectorAll(
                    '[data-search="true"]'
                  );
                  let ingredientsUpdate = [];
                  dataSearch.forEach((child) => {
                    ingredientsUpdate.push(child.textContent.toLowerCase());
                  });

                  ingredientsUpdate = [...new Set(ingredientsUpdate)];
                  // sort ingredientsUpdate

                  ingredientsUpdate.sort();
                  // first letter of each word in uppercase
                  ingredientsUpdate = ingredientsUpdate.map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  );

                  // change ingredientsList innerHTML to display all child.textcontent of datasearch
                  divIngredients.innerHTML = "";
                  ingredientsUpdate.forEach((element) => {
                    divIngredients.innerHTML += ` <p class="cursor-pointer ingredientListListener">${element}</p>`;
                  });

                  // APPLIANCES TAGS : actualiser les tags à la recherche simple
                  const listApplianceAttribute = Array.from(
                    child.children[1].children[2].children[0].children
                  );

                  listApplianceAttribute.forEach((child) => {
                    child.children[0].setAttribute("data-appliance", "true");
                  });
                  const dataAppliance = document.querySelectorAll(
                    '[data-appliance="true"]'
                  );

                  let appliancesUpdate = [];
                  dataAppliance.forEach((child) => {
                    appliancesUpdate.push(child.textContent.toLowerCase());
                  });

                  appliancesUpdate = [...new Set(appliancesUpdate)];

                  // sort appliancesUpdate
                  appliancesUpdate.sort();

                  // first letter of each word in uppercase
                  appliancesUpdate = appliancesUpdate.map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  );

                  // change appliancesList innerHTML to display all child.textcontent of dataappliance
                  divApplicances.innerHTML = "";
                  appliancesUpdate.forEach((element) => {
                    divApplicances.innerHTML += ` <p>${element}</p>`;
                  });

                  // USTEENSILS TAGS : actualiser les tags à la recherche simple
                  const listUstensilAttribute = Array.from(
                    child.children[1].children[2].children[1].children
                  );
                  listUstensilAttribute.forEach((child) => {
                    child.children[0].setAttribute("data-ustensil", "true");
                  });
                  const dataUstensil = document.querySelectorAll(
                    '[data-ustensil="true"]'
                  );
                  let ustensilsUpdate = [];
                  dataUstensil.forEach((child) => {
                    ustensilsUpdate.push(child.textContent.toLowerCase());
                  });

                  ustensilsUpdate = [...new Set(ustensilsUpdate)];

                  // sort ustensilsUpdate
                  ustensilsUpdate.sort();

                  // first letter of each word in uppercase
                  ustensilsUpdate = ustensilsUpdate.map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  );

                  // change ustensilsList innerHTML to display all child.textcontent of dataustensil
                  divUstensils.innerHTML = "";
                  ustensilsUpdate.forEach((element) => {
                    divUstensils.innerHTML += ` <p>${element}</p>`;
                  });
                } else {
                  child.style.display = "none";
                  child.setAttribute("data-search", "false");
                  const listAttribute = Array.from(
                    child.children[1].children[1].children[0].children
                  );
                  listAttribute.forEach((child) => {
                    child.children[0].removeAttribute("data-search");
                  });

                  const listApplianceAttribute = Array.from(
                    child.children[1].children[2].children[0].children
                  );
                  listApplianceAttribute.forEach((child) => {
                    child.children[0].removeAttribute("data-appliance");
                  });

                  const listUstensilAttribute = Array.from(
                    child.children[1].children[2].children[1].children
                  );
                  listUstensilAttribute.forEach((child) => {
                    child.children[0].removeAttribute("data-ustensil");
                  });
                }
              });

              // APPLIANCES TAGS : actualiser les tags à la recherche simple
            } else {
              // display all children of section
              Array.from(section.children).forEach((child) => {
                child.style.display = "flex";
              });
              divIngredients.innerHTML = "";
              allIngredientsSimpleUnique.forEach((element) => {
                divIngredients.innerHTML += `<p>${element}</p>`;
              });
              divApplicances.innerHTML = "";
              allApplicancesSimpleUnique.forEach((element) => {
                divApplicances.innerHTML += `<p>${element}</p>`;
              });
              divUstensils.innerHTML = "";
              allUstensilsSimpleUnique.forEach((element) => {
                divUstensils.innerHTML += `<p>${element}</p>`;
              });
            }

            // if there is no card to display in section, display an error message
            if (section.innerText === "") {
              const noResult = document.querySelector(".no-result");
              noResult.style.display = "flex";
              divIngredients.innerHTML = "";
              divApplicances.innerHTML = "";
              divUstensils.innerHTML = "";
            } else {
              const noResult = document.querySelector(".no-result");
              noResult.style.display = "none";
            }
          });

          // partie création des tags INGREDIENTS

          const ingredientListListener = document.querySelectorAll(
            ".ingredientListListener"
          );

          const tagArea = document.querySelector(".tag-area");
          const ingredientItems = document.querySelectorAll(".ingredients p");
          const applianceItems = document.querySelectorAll(".appliances p");
          const ustensilItems = document.querySelectorAll(".ustensils p");

          const ingredientsTagsListener = Array.from(
            divIngredients.children
          );
        
          ingredientsTagsListener.forEach((element) => {
            element.addEventListener("click", (e) => {
              const tag = document.createElement("div");
              tag.classList.add("tag");
              tag.innerHTML = `<p>${e.target.textContent}</p><i class="fas fa-times"></i>`;
              tagArea.appendChild(tag);
              e.target.style.display = "none";
              
           
                  // Quand un élément p de la liste est cliqué, ajoute la classe tagIngredients
              const tagIngredients = Array.from(
                document.querySelectorAll(".tagIngredients")
              );

              Array.from(section.children).forEach((child) => {
                // child.textcontent has to include every value of tagIngredients array
                if (
                  tagIngredients.every((tag) =>
                    child.textContent
                      .toLowerCase()
                      .includes(tag.textContent.toLowerCase())
                  )
                ) {
                  child.style.display = "flex";
                  const listAttribute = Array.from(
                    child.children[1].children[1].children[0].children
                  );

                  listAttribute.forEach((child) => {
                    child.children[0].setAttribute("data-search", "true");
                  });

                  const dataSearch = document.querySelectorAll(
                    '[data-search="true"]'
                  );

                  let ingredientsUpdate = [];
                  dataSearch.forEach((child) => {
                    ingredientsUpdate.push(child.textContent.toLowerCase());
                  });

                  ingredientsUpdate = [...new Set(ingredientsUpdate)];
                  // sort ingredientsUpdate

                  ingredientsUpdate.sort();
                  // first letter of each word in uppercase
                  ingredientsUpdate = ingredientsUpdate.map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  );

                  // change ingredientsList innerHTML to display all child.textcontent of datasearch
                  ingredientsList.innerHTML = "";
                  ingredientsUpdate.forEach((element) => {
                    ingredientsList.innerHTML += ` <p class="cursor-pointer ingredientListListener">${element}</p>`;
                  });

                  // if an element of ingredientslist is the same as the tag, remove it from the list
                  const ingredientsListItems = Array.from(
                    document.querySelectorAll(".ingredients p")
                  );
                  console.log(ingredientsListItems);
                  ingredientsListItems.forEach((item) => {
                    if (item.textContent === tag.textContent) {
                      item.remove();
                    }
                  });
                } else {
                  child.style.display = "none";
                  child.setAttribute("data-search", "false");
                  const listAttribute = Array.from(
                    child.children[1].children[1].children[0].children
                  );
                  listAttribute.forEach((child) => {
                    child.children[0].removeAttribute("data-search");
                  });
                }
                console.log(divIngredients);
              });
            });
          });



          // ingredientsTagsListener.forEach((child) => => {
          //   child.addEventListener("click", (e) => {
          //     e.preventDefault();
          //     const tag = document.createElement("span");
          //     tag.classList.add("tagIngredients");
          //     tag.innerHTML = item.textContent;
          //     tagArea.appendChild(tag);
          //     const icon = document.createElement("i");
          //     icon.classList.add("fa-regular", "fa-circle-xmark");
          //     tag.appendChild(icon);

          //     // Quand un élément p de la liste est cliqué, ajoute la classe tagIngredients
          //     const tagIngredients = Array.from(
          //       document.querySelectorAll(".tagIngredients")
          //     );

          //     Array.from(section.children).forEach((child) => {
          //       // child.textcontent has to include every value of tagIngredients array
          //       if (
          //         tagIngredients.every((tag) =>
          //           child.textContent
          //             .toLowerCase()
          //             .includes(tag.textContent.toLowerCase())
          //         )
          //       ) {
          //         child.style.display = "flex";
          //         const listAttribute = Array.from(
          //           child.children[1].children[1].children[0].children
          //         );

          //         listAttribute.forEach((child) => {
          //           child.children[0].setAttribute("data-search", "true");
          //         });

          //         const dataSearch = document.querySelectorAll(
          //           '[data-search="true"]'
          //         );

          //         let ingredientsUpdate = [];
          //         dataSearch.forEach((child) => {
          //           ingredientsUpdate.push(child.textContent.toLowerCase());
          //         });

          //         ingredientsUpdate = [...new Set(ingredientsUpdate)];
          //         // sort ingredientsUpdate

          //         ingredientsUpdate.sort();
          //         // first letter of each word in uppercase
          //         ingredientsUpdate = ingredientsUpdate.map(
          //           (word) => word.charAt(0).toUpperCase() + word.slice(1)
          //         );

          //         // change ingredientsList innerHTML to display all child.textcontent of datasearch
          //         ingredientsList.innerHTML = "";
          //         ingredientsUpdate.forEach((element) => {
          //           ingredientsList.innerHTML += ` <p class="cursor-pointer ingredientListListener">${element}</p>`;
          //         });

          //         // if an element of ingredientslist is the same as the tag, remove it from the list
          //         const ingredientsListItems = Array.from(
          //           document.querySelectorAll(".ingredients p")
          //         );
          //         console.log(ingredientsListItems);
          //         ingredientsListItems.forEach((item) => {
          //           if (item.textContent === tag.textContent) {
          //             item.remove();
          //           }
          //         });
          //       } else {
          //         child.style.display = "none";
          //         child.setAttribute("data-search", "false");
          //         const listAttribute = Array.from(
          //           child.children[1].children[1].children[0].children
          //         );
          //         listAttribute.forEach((child) => {
          //           child.children[0].removeAttribute("data-search");
          //         });
          //       }
          //       console.log(divIngredients);
          //     });
          //   });
          // });

          // partie création des tags APPLIANCES

          applianceItems.forEach((item) => {
            item.addEventListener("click", (e) => {
              console.log(document.querySelectorAll(".ingredientListListener"));
              e.preventDefault();
              // create a span with the text of the clicked item
              const tag = document.createElement("span");
              tag.classList.add("tagAppliances");
              tag.innerHTML = item.textContent;
              tagArea.appendChild(tag);
              item.remove();
              const icon = document.createElement("i");
              icon.classList.add("fa-regular", "fa-circle-xmark");
              tag.appendChild(icon);
            });
          });

          // partie création des tags USTENSILS

          ustensilItems.forEach((item) => {
            item.addEventListener("click", (e) => {
              e.preventDefault();
              // create a span with the text of the clicked item
              const tag = document.createElement("span");
              tag.classList.add("tagUstensils");
              tag.innerHTML = item.textContent;
              tagArea.appendChild(tag);
              item.remove();
              const icon = document.createElement("i");
              icon.classList.add("fa-regular", "fa-circle-xmark");
              tag.appendChild(icon);
            });
          });
        }
        sortSimpleSearch();
      });
  }

  displayAllTagItems();
}
