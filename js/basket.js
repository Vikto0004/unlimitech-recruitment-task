import { shoes } from "./data-shoes.js";
import { generateMarkupBasketList } from "./markups.js";

const basket = document.querySelector(".basket");
const basketOverlay = document.querySelector(".basket-overlay");
const openBasketBtn = document.querySelector(".header-bar__button-basket");
const closeBasketBtn = document.querySelector(".basket__close");

const basketCount = document.querySelector(".basket__count");
const basketTotalPrice = document.querySelector(".basket__total-price");
const basketTotalPriceOrg = document.querySelector(
  ".basket__total-price--original"
);

const basketList = document.querySelector(".basket__list");
const deliveryCount = document.querySelector(".basket__delivery-count");
const deliveryProgress = document.querySelector(".basket__delivery-progress");
const basketEmpty = document.querySelector(".basket__empty");

function openBasket() {
  checkFreeDeliveryProgress();
  recalculationCartItems();

  basketOverlay.style.display = "block";

  setTimeout(() => {
    basket.classList.add("basket--open");
  }, 100);
}

function closeBasket() {
  basket.classList.remove("basket--open");

  setTimeout(() => {
    basketOverlay.style.display = "none";
  }, 500);
}

openBasketBtn.addEventListener("click", openBasket);
closeBasketBtn.addEventListener("click", closeBasket);

basketOverlay.addEventListener("click", function (e) {
  if (basket.contains(e.target)) return;

  closeBasket();
});

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {
    totalItems: 0,
    items: [],
  };

  const item = cart.items.find((item) => item.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.items.push({ id: productId, quantity: 1 });
  }

  cart.totalItems += 1;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {
    totalItems: 0,
    items: [],
  };

  const itemIndex = cart.items.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    const item = cart.items[itemIndex];
    cart.totalItems -= item.quantity;
    cart.items.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

function getCart() {
  return (
    JSON.parse(localStorage.getItem("cart")) || { totalItems: 0, items: [] }
  );
}

function getDetailedCartItems() {
  const cart = getCart();

  let totalPrice = 0;
  let totalQuantity = 0;

  const items = cart.items.map(({ id, quantity }) => {
    const product = shoes.find((shoe) => shoe.id === id);
    const itemPrice = (product.discountPrice || product.price) * quantity;

    totalPrice += itemPrice;
    totalQuantity += quantity;

    return {
      ...product,
      quantity,
      totalPrice: itemPrice.toFixed(2),
    };
  });

  return {
    items,
    totalPrice: totalPrice.toFixed(2),
    totalQuantity,
  };
}

const FREE_DELIVERY_THRESHOLD = 170;
const FREE_DELIVERY = 30;
let freeDelivery = false;

function recalculationCartItems() {
  checkFreeDeliveryProgress();
  const { items, totalPrice, totalQuantity } = getDetailedCartItems();

  basketList.innerHTML = generateMarkupBasketList(items);
  basketCount.innerHTML = `(${totalQuantity} sztuki)`;

  if (freeDelivery) {
    basketTotalPriceOrg.style.display = "block";
    basketTotalPrice.innerHTML = `${Number(totalPrice) - FREE_DELIVERY} zł`;
    basketTotalPriceOrg.innerHTML = `${totalPrice} zł`;
  } else {
    basketTotalPriceOrg.style.display = "none";
    basketTotalPrice.innerHTML = `${totalPrice} zł`;
  }
}

function checkFreeDeliveryProgress() {
  const { items } = getDetailedCartItems();
  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.totalPrice),
    0
  );

  const remaining = Math.max(FREE_DELIVERY_THRESHOLD - total, 0).toFixed(2);
  const progress = Math.min(
    (total / FREE_DELIVERY_THRESHOLD) * 100,
    100
  ).toFixed(1);

  deliveryCount.innerHTML = `${remaining} zł`;
  deliveryProgress.style.width = `${progress}%`;

  if (progress === "100.0") freeDelivery = true;
  else freeDelivery = false;
}

basketList.addEventListener("click", (e) => {
  const trashBtn = e.target.closest(".basket__item-trash");

  if (trashBtn) {
    const basketItem = trashBtn.closest(".basket__item");
    const id = basketItem?.dataset.id;

    if (id) {
      removeFromCart(Number(id));

      setTimeout(() => {
        recalculationCartItems();
      }, 0);
      checkItemsInBasket();
    }
  }
});

function checkItemsInBasket() {
  const totalItems = getCart().totalItems;
  openBasketBtn.classList.toggle("header-bar__has-items", totalItems);

  if (totalItems) {
    basketEmpty.style.display = "none";
  } else {
    basketEmpty.style.display = "flex";
  }
}

// addToCart(2);
checkItemsInBasket();
