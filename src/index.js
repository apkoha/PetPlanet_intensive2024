// const input = document.querySelector(".subscribe__input");
// const button = document.querySelector(".subscribe__button");
const API_URL = "https://cooked-mirage-crayon.glitch.me";

const buttons = document.querySelectorAll(".store__category-button");
const productList = document.querySelector(".store__list");
const cartButton = document.querySelector(".store__cart-button");
const cartCount = cartButton.querySelector(".store__cart-cnt");
const modalOverlay = document.querySelector(".modal-overlay");
const cartItemsList = document.querySelector(".modal__cart-items");
const modalCloseButton = document.querySelector(".modal-overlay_close-button");

// input.addEventListener("focus", () => {
//   input.dataset.placeholder = input.placeholder;
//   input.placeholder = "";
// });

// input.addEventListener("blur", () => {
//   input.placeholder = input.dataset.placeholder;
// });

// //блокирует кнопку "отправить" при пустом инпут.
// input.addEventListener("input", ({ target }) => {
//   button.disabled = !target.value.trim();
// });

const createProductCard = (product) => {
  const productCard = document.createElement("li");
  productCard.classList.add("store__item");
  productCard.innerHTML = `
    <article class="store__product product">
       <img class="product__image" src="${API_URL}${product.photoUrl}" alt="${product.name}" width="388" height="261"/>
     <h3 class="product__title">${product.name}</h3>
     <p class="product__price">${product.price}&nbsp;₽</p>
     <button class="product__btn-add-cart">Заказать</button>
    </article>`;

  return productCard;
};

const renderProducts = (products) => {
  productList.textContent = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);
    productList.append(productCard);
  });
};

const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/category/${category}`
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error(`Ошибка запроса товаров: ${error}`);
  }
};

//добавляет класс "store__category-button_active" по клику на кнопку
const changeCategory = ({ target }) => {
  const category = target.textContent;
  console.log("category: ", category);

  buttons.forEach((button) => {
    button.classList.remove("store__category-button_active");
  });

  target.classList.add("store__category-button_active");
  fetchProductByCategory(category);
};

buttons.forEach((button) => {
  button.addEventListener("click", changeCategory);

  if (button.classList.contains("store__category-button_active")) {
    fetchProductByCategory(button.textContent);
  }
});

const renderCartItems = () => {
  cartItemsList.textContent = "";
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    cartItemsList.append(listItem);
  });
};

//отображение модального окна
cartButton.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  renderCartItems();
});

//закрытие модального окна
modalOverlay.addEventListener("click", ({ target }) => {
  if (
    target === modalOverlay ||
    target.closest(".modal-overlay_close-button")
  ) {
    modalOverlay.style.display = "none";
  }
});

const updateCartCount = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartCount.textContent = cartItems.length;
};

updateCartCount();

const addToCart = (productName) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartItems.push(productName);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();
};

productList.addEventListener("click", ({ target }) => {
  const productCard = target.closest(".store__product");
  const productName = productCard.querySelector(".product__title").textContent;
  addToCart(productName);
});
