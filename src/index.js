const input = document.querySelector(".subscribe__input");
const button = document.querySelector(".subscribe__button");
const buttons = document.querySelectorAll("store__category-button");

input.addEventListener("focus", () => {
  input.dataset.placeholder = input.placeholder;
  input.placeholder = "";
});

input.addEventListener("blur", () => {
  input.placeholder = input.dataset.placeholder;
});

//блокирует кнопку "отправить" при пустом инпут.
input.addEventListener("input", ({ target }) => {
  button.disabled = !target.value.trim();
});

//добавляет класс "store__category-button_active" по клику на кнопку
const changeActiveBtn = (event) => {
  const target = event.target;
  buttons.forEach((button) => {
    button.classList.remove("store__category-button_active");
  });

  target.classList.add("store__category-button_active");
};

buttons.forEach((button) => {
  button.addEventListener("click", changeActiveBtn);
});
