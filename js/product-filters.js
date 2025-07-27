import { addToCart } from "./basket.js";
import { shoes } from "./data-shoes.js";
import { generateMarkupProductItems } from "./markups.js";
import { initProductFiltersSlider } from "./slick.js";

const productFiltersList = document.querySelector(".product-filters__list");
const productFiltersWrapper = document.querySelector(
  ".product-filters__wrapper"
);
const basketNotification = document.querySelector(
  ".product-filters__notification"
);

let selectedTag = "sale";

function handleFilterBtnClick(event) {
  const filtersBtn = event.target.closest(".product-filters__wrapper-btn");
  if (!filtersBtn) return;

  const tag = filtersBtn.dataset.tag;
  if (!tag) return;

  const prevActiveBtn = productFiltersWrapper.querySelector(
    ".product-filters__wrapper-btn--active"
  );
  if (prevActiveBtn) {
    prevActiveBtn.classList.remove("product-filters__wrapper-btn--active");
  }

  filtersBtn.classList.add("product-filters__wrapper-btn--active");

  selectedTag = tag;
  filterByTag(selectedTag);
}

function filterByTag(typeName) {
  const result = shoes.filter(({ tags }) => {
    return tags.find((tag) => tag.type === typeName);
  });

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  productFiltersList.innerHTML = generateMarkupProductItems(result, favorites);
  productFiltersList.className = "product-filters__list";
  initProductFiltersSlider();
}

filterByTag(selectedTag);

function handleAddToCartClick(event) {
  const basketBtn = event.target.closest(".product-filters__basket");
  const productItem = event.target.closest(".product-filters__item");

  if (!basketBtn || !productItem) return;

  const id = productItem.dataset.id;
  addToCart(id);
  showMessage();

  animateButton(basketBtn);
}

function animateButton(button) {
  button.classList.add("shake");
  setTimeout(() => {
    button.classList.remove("shake");
  }, 400);
}

function showMessage() {
  const message = document.createElement("div");
  message.className = "product-filters__message";
  message.textContent = "Produkt został dodany do koszyka!";
  basketNotification.appendChild(message);

  requestAnimationFrame(() => {
    message.classList.add("show");
  });

  setTimeout(() => {
    message.classList.remove("show");
    setTimeout(() => {
      message.remove();
    }, 300);
  }, 3000);
}

function toggleFavoriteProduct(event) {
  const favoriteBtn = event.target.closest(".product-filters__favorite");
  const productItem = event.target.closest(".product-filters__item");

  if (!favoriteBtn || !productItem) return;

  const id = productItem.dataset.id;

  if (!id) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
    favoriteBtn.classList.remove("product-filters__favorite--active");
  } else {
    favorites.push(id);
    favoriteBtn.classList.add("product-filters__favorite--active");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

productFiltersList.addEventListener("click", toggleFavoriteProduct);
productFiltersWrapper.addEventListener("click", handleFilterBtnClick);
productFiltersList.addEventListener("click", handleAddToCartClick);

window.addEventListener("resize", () => {
  setTimeout(() => {
    filterByTag(selectedTag);
  }, 100);
});
