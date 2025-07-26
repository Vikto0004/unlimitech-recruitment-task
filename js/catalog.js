import { categories } from "./data-categories.js";
import {
  generateMarkupCatalogGrid,
  generateMarkupCatalogList,
} from "./markups.js";

const catalog = document.querySelector(".catalog");
const catalogList = document.querySelector(".catalog__list");
const catalogGrid = document.querySelector(".catalog__grid");
const catalogOpenBtn = document.querySelector(".header-nav__btn-catalog");

catalog.addEventListener("click", (event) => {
  const button = event.target.closest(".catalog__button");

  if (button) {
    const slugName = button.dataset.slug;
    if (!slugName) return;
    renderCatalogBySlug(slugName);
    return;
  }
});

function renderCatalogBySlug(slugName) {
  const res = categories[0].children.filter(({ slug }) => slug === slugName);

  catalogList.innerHTML = generateMarkupCatalogList(
    categories[0].children,
    slugName
  );

  catalogGrid.innerHTML = generateMarkupCatalogGrid(res[0].children);
}

renderCatalogBySlug("polbuty");

let toggle = false;
let isOverBtn = false;
let isOverCatalog = false;

function openCatalog() {
  catalogOpenBtn.classList.add("header-nav__btn-catalog--active");
  catalog.classList.add("catalog--flex");
  setTimeout(() => {
    catalog.classList.add("catalog--active");
  }, 100);
  toggle = true;
}

function closeCatalog() {
  catalogOpenBtn.classList.remove("header-nav__btn-catalog--active");
  catalog.classList.remove("catalog--active");
  setTimeout(() => {
    catalog.classList.remove("catalog--flex");
  }, 200);
  toggle = false;
}

catalogOpenBtn.addEventListener("mouseenter", () => {
  isOverBtn = true;
  if (!toggle) openCatalog();
});

catalogOpenBtn.addEventListener("mouseleave", () => {
  isOverBtn = false;
  setTimeout(() => {
    if (!isOverBtn && !isOverCatalog) closeCatalog();
  }, 100);
});

catalog.addEventListener("mouseenter", () => {
  isOverCatalog = true;
});

catalog.addEventListener("mouseleave", () => {
  isOverCatalog = false;
  setTimeout(() => {
    if (!isOverBtn && !isOverCatalog) closeCatalog();
  }, 300);
});
