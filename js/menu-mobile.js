import { categories } from "./data-categories.js";
import { generateMarkupCategory, generateMarkupMenu } from "./markups.js";

document.addEventListener("click", (event) => {
  const mobileMenu = document.querySelector(".mobile-menu");
  const openMenuBtn = event.target.closest(".mobile-menu__open");

  if (openMenuBtn) {
    mobileMenu.classList.toggle("mobile-menu--active", true);
    return;
  }

  const closeMenuBtn = event.target.closest(".mobile-menu__close");
  if (closeMenuBtn) {
    mobileMenu.classList.toggle("mobile-menu--active", false);
    return;
  }
});

let currentCategoryPath = [];

function handleCategoryClick(slug) {
  if (currentCategoryPath.length >= 3) {
    currentCategoryPath = [slug];
  } else {
    currentCategoryPath.push(slug);
  }

  const category = findCategoryByPath(currentCategoryPath, categories);
  if (!category) return;

  if (currentCategoryPath[2]) {
    const existingMenu = document.querySelector(".mobile-menu");
    if (existingMenu) existingMenu.remove();

    document.body.insertAdjacentHTML("beforeend", generateMarkupMenu(false));
    return;
  }

  if (category.children.length === 0) {
    const existingMenu = document.querySelector(".mobile-menu");
    if (existingMenu) existingMenu.remove();

    document.body.insertAdjacentHTML("beforeend", generateMarkupMenu(false));
    return;
  }

  const markup = generateMarkupCategory(category.name, category.children);

  const existingMenu = document.querySelector(".mobile-menu");
  if (existingMenu) existingMenu.remove();

  document.body.insertAdjacentHTML("beforeend", markup);
}

function handleBackClick() {
  if (currentCategoryPath.length === 0) return;

  currentCategoryPath.pop();

  const existingMenu = document.querySelector(".mobile-menu");
  if (existingMenu) existingMenu.remove();

  if (currentCategoryPath.length === 0) {
    document.body.insertAdjacentHTML("beforeend", generateMarkupMenu(true));
    return;
  }

  const category = findCategoryByPath(currentCategoryPath, categories);

  const markup = generateMarkupCategory(category.name, category.children);
  document.body.insertAdjacentHTML("beforeend", markup);
}

function findCategoryByPath(pathArray, data) {
  let current = null;
  let list = data;

  for (const slug of pathArray) {
    current = list.find((item) => item.slug === slug);
    if (!current) return null;
    list = current.children;
  }

  return current;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".menu-nav__link--category");

  if (button) {
    const slug = button.dataset.slug;
    if (!slug) return;
    handleCategoryClick(slug);
    return;
  }

  const backButton = event.target.closest(".mobile-menu__back");
  if (backButton) {
    handleBackClick();
    return;
  }
});
