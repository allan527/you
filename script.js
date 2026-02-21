const products = [
  { id: 1, name: "Apple", price: 1.2, unit: "each", emoji: "🍎" },
  { id: 2, name: "Banana", price: 0.8, unit: "each", emoji: "🍌" },
  { id: 3, name: "Orange", price: 1.1, unit: "each", emoji: "🍊" },
  { id: 4, name: "Strawberry Box", price: 4.99, unit: "250g", emoji: "🍓" },
  { id: 5, name: "Grapes", price: 3.5, unit: "500g", emoji: "🍇" },
  { id: 6, name: "Mango", price: 2.3, unit: "each", emoji: "🥭" },
  { id: 7, name: "Kiwi", price: 1.6, unit: "each", emoji: "🥝" },
  { id: 8, name: "Pineapple", price: 3.99, unit: "each", emoji: "🍍" },
];

const cart = new Map();
const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const itemCountEl = document.getElementById("item-count");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

document.getElementById("year").textContent = new Date().getFullYear();

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
      <article class="card">
        <h3>${product.emoji} ${product.name}</h3>
        <p>Fresh and premium quality.</p>
        <div class="card-row">
          <strong>$${product.price.toFixed(2)} / ${product.unit}</strong>
          <button type="button" data-id="${product.id}">Add</button>
        </div>
      </article>
    `
    )
    .join("");

  productGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  cart.set(productId, (cart.get(productId) || 0) + 1);
  renderCart();
}

function renderCart() {
  const entries = [...cart.entries()];

  if (entries.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty. Start adding fruits! 🧺</li>";
    itemCountEl.textContent = "0";
    totalPriceEl.textContent = "$0.00";
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.innerHTML = entries
    .map(([productId, quantity]) => {
      const product = products.find((item) => item.id === productId);
      const lineTotal = product.price * quantity;
      totalItems += quantity;
      totalPrice += lineTotal;

      return `<li><span>${product.name} × ${quantity}</span><strong>$${lineTotal.toFixed(
        2
      )}</strong></li>`;
    })
    .join("");

  itemCountEl.textContent = String(totalItems);
  totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
}

checkoutBtn.addEventListener("click", () => {
  if (cart.size === 0) {
    alert("Your cart is empty. Add some fruit first!");
    return;
  }

  alert("Thank you for your order! Your fresh fruits are on the way.");
  cart.clear();
  renderCart();
});

renderProducts();
renderCart();
