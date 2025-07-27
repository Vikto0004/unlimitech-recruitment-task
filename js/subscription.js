const notification = document.querySelector(".subscription__notification");
const notificationText = notification.querySelector(
  ".subscription__notification-descr"
);
const form = document.querySelector(".subscription__form");
const emailInput = document.querySelector(".subscription__input");
const checkbox = document.querySelector(".subscription__check-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  notification.classList.remove(
    "subscription__notification--email",
    "subscription__notification--check"
  );

  const emailValue = emailInput.value.trim();
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  if (!isEmailValid) {
    notification.classList.add("subscription__notification--email");
    notificationText.textContent = "Proszę podać prawidłowy adres e-mail.";
    return;
  }

  if (!checkbox.checked) {
    notification.classList.add("subscription__notification--check");
    notificationText.textContent =
      "Proszę zaakceptować Regulamin i Politykę Prywatności.";
    return;
  }

  notification.classList.remove(
    "subscription__notification--email",
    "subscription__notification--check"
  );
  notificationText.textContent = "";

  location.reload();
});
