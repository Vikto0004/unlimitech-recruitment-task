export function generateMarkupCategory(category, array) {
  const markupCategory = `
    <div class="mobile-menu mobile-menu--active">
      <div class="mobile-menu__wrap">
        <button class="mobile-menu__back">
          <svg class="mobile-menu__arrow-icon">
            <use href="./images/sprite.svg#arrow"></use>
          </svg>
        </button>
        <h3 class="mobile-menu__subtitle">${category}</h3>
        <button class="mobile-menu__close">
          <svg>
             <use href="./images/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
      <nav class="menu-nav">
        <ul class="menu-nav__list">
          ${array
            .map(
              (obj) => `
            <li class="menu-nav__item">
              <button
                class="menu-nav__link menu-nav__link--category"
                data-slug="${obj.slug}"
              >
              ${
                obj.slug !== "wszystkie" && category === "Damskie buty skórzane"
                  ? `<svg class="menu-nav__footwear-icon">
                  <use href="./images/sprite.svg#${obj.slug}"></use>
                </svg>`
                  : ""
              }
                ${obj.name}
               ${
                 obj.children.length !== 0 || obj.slug === "wszystkie"
                   ? `<svg class="menu-nav__arrow-icon">
                        <use href="./images/sprite.svg#arrow"></use>
                      </svg>`
                   : ""
               }
              </button>
            </li>
          `
            )
            .join("")}
        </ul>
      </nav>
    </div>`;

  return markupCategory;
}

export function generateMarkupMenu(isActive) {
  const markupMenu = `
   <div class="mobile-menu ${isActive ? "mobile-menu--active" : ""}">
      <div class="mobile-menu__wrap">
        <h3 class="mobile-menu__subtitle">Menu</h3>
        <button class="mobile-menu__close">
          <svg>
            <use href="./images/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
      <nav class="menu-nav">
        <ul class="menu-nav__list">
          <li class="menu-nav__item">
            <button
              class="menu-nav__link menu-nav__link--category"
              data-slug="damskie-buty-skorzane"
            >
              Damskie buty skórzane
              <svg class="menu-nav__arrow-icon">
                <use href="./images/sprite.svg#arrow"></use>
              </svg>
            </button>
          </li>
          <li class="menu-nav__item">
            <a href="./" class="menu-nav__link">Bony podarunkowe</a>
          </li>
          <li class="menu-nav__item">
            <a href="./" class="menu-nav__link">Nowości</a>
          </li>
          <li class="menu-nav__item">
            <a href="./" class="menu-nav__link">Bestsellery</a>
          </li>
          <li class="menu-nav__item">
            <a href="./" class="menu-nav__link menu-nav__link--sale"
              >% Wyprzedaż %</a
            >
          </li>
        </ul>
      </nav>
      <ul class="menu-user">
        <li class="menu-user__item">
          <a href="./" class="menu-user__link">Zaloguj / Zarejestruj</a>
        </li>
        <li class="menu-user__item">
          <a href="./" class="menu-user__link">Schowek</a>
        </li>
        <li class="menu-user__item">
          <a href="./" class="menu-user__link">Koszyk</a>
        </li>
      </ul>
      <div class="menu-wrapper">
        <ul class="menu-wrapper__contact">
          <li class="menu-wrapper__contact-item">
            <svg class="menu-wrapper__contact-icon">
              <use href="./images/sprite.svg#phone"></use>
            </svg>
            <p class="menu-wrapper__contact-text">(+48) 000 000 000</p>
          </li>
          <li class="menu-wrapper__contact-item">
            <svg class="menu-wrapper__contact-icon">
              <use href="./images/sprite.svg#edit"></use>
            </svg>
            <p class="menu-wrapper__contact-text">sklep@kontakt.com.pl</p>
          </li>
        </ul>
        <div class="menu-wrapper__line"></div>
        <ul class="menu-wrapper__social">
          <li class="menu-wrapper__social-item">
            <a href="./" class="menu-wrapper__social-link">
              <svg class="menu-wrapper__social-icon">
                <use href="./images/sprite.svg#facebook"></use>
              </svg>
            </a>
          </li>
          <li class="menu-wrapper__social-item">
            <a href="./" class="menu-wrapper__social-link">
              <svg class="menu-wrapper__social-icon">
                <use href="./images/sprite.svg#instagram"></use>
              </svg>
            </a>
          </li>
          <li class="menu-wrapper__social-item">
            <a href="./" class="menu-wrapper__social-link">
              <svg class="menu-wrapper__social-icon">
                <use href="./images/sprite.svg#tik-tok"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>`;

  return markupMenu;
}

export function generateMarkupCatalogList(list, slugName) {
  return list
    .map(({ name, slug, children }) => {
      const isActive = slugName === slug ? "catalog__button--active" : "";
      const hasChildren = children.length > 0;
      const icon =
        slug !== "wszystkie"
          ? `<svg><use href="./images/sprite.svg#${slug}"></use></svg>`
          : "";

      const content = `${icon}${name}`;

      return `
        <li class="catalog__item">
          ${
            hasChildren
              ? `<button class="catalog__button ${isActive}" data-slug="${slug}">
                ${content}
              </button>`
              : `<a class="catalog__button" href="/">
                ${content}
              </a>`
          }
        </li>
      `;
    })
    .join("");
}

export function generateMarkupCatalogGrid(list) {
  const markupCatalogGrid = `${list
    .map(
      ({ name }) => `<li><a href="./" class="catalog__link">${name}</a></li>`
    )
    .join("")}`;

  return markupCatalogGrid;
}

export function generateMarkupBasketList(list) {
  return list
    .map(({ id, name, price, discountPrice, image, quantity }) => {
      return ` <li class="basket__item" data-id="${id}">
            <img
              src="${image}"
              alt="${name}"
              class="basket__item-img"
            />
            <div class="basket__item-wrap">
              <h4 class="basket__item-name">
               ${name}
              </h4>
              <p class="basket__item-info">
                <span class="basket__item-count"> ${quantity}</span> szt. x
                <span class="basket__item-price">${
                  discountPrice !== null ? discountPrice : price
                }</span> zł
              </p>
            </div>
            <button type="button" class="basket__item-trash">
              <svg>
                <use href="./images/sprite.svg#trash"></use>
              </svg>
            </button>
          </li>`;
    })
    .join("");
}
