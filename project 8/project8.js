const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
  const searchText = search.value.toLowerCase();
  const category = categoryFilter.value;
  const price = priceFilter.value;

  products.forEach(product => {
    const title = product.querySelector("h3").innerText.toLowerCase();
    const prodCategory = product.dataset.category;
    const prodPrice = parseInt(product.dataset.price);

    let priceMatch = 
      price === "all" ||
      (price === "low" && prodPrice < 50) ||
      (price === "mid" && prodPrice >= 50 && prodPrice <= 150) ||
      (price === "high" && prodPrice > 150);

    let categoryMatch = category === "all" || prodCategory === category;
    let searchMatch = title.includes(searchText);

    product.style.display = (priceMatch && categoryMatch && searchMatch) ? "block" : "none";
  });
}

search.addEventListener("keyup", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);

// Cart Logic
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
let total = 0;

document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const product = button.closest(".product-card");
    const title = product.querySelector("h3").innerText;
    const price = parseInt(product.dataset.price);

    // Add item
    const li = document.createElement("li");
    li.innerHTML = `${title} - $${price} <button class="remove">x</button>`;
    cartItems.appendChild(li);

    total += price;
    cartTotal.innerText = total;

    cart.classList.add("active");

    // Remove item
    li.querySelector(".remove").addEventListener("click", () => {
      li.remove();
      total -= price;
      cartTotal.innerText = total;
    });
  });
});

// Close cart when clicking outside
document.body.addEventListener("click", (e) => {
  if (!cart.contains(e.target) && !e.target.classList.contains("add-cart")) {
    cart.classList.remove("active");
  }
});
