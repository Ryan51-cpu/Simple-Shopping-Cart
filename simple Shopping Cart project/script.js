// Data
const products = [
  { id: "1", name: "4K Camera", price: 68.79, img: "images/camera.png" },
  { id: "2", name: "3TB Hard Drive", price: 99.98, img: "images/harddrive.png" },
  { id: "3", name: "Gaming Headphones", price: 119.99, img: "images/headphones.png" },
  { id: "4", name: "Gaming Keyboard", price: 79.99, img: "images/keyboard.png" },
  { id: "5", name: "Professional Gaming Microphone", price: 9.99, img: "images/mic.png" },
  { id: "6", name: "144Hz 1440p Gaming Monitor", price: 209.99, img: "images/monitor.png" },
  { id: "7", name: "Gaming Mouse", price: 6.49, img: "images/mouse.png" },

];

let cart = {}; 



// Elements
const container = document.getElementById("productsContainer");
const cartList = document.getElementById("list");
const paymentCart = document.getElementById("payment-cart");
const paymentTotal = document.getElementById("payment-total");
const clearCartBtn = document.getElementById("clearCartBtn");


cart = JSON.parse(localStorage.getItem("cart")) || {};
for (let id in cart) {
    if (!products.find(p => p.id === id)){
        delete cart[id];
    }
}
// Render Products
function renderProducts() {
  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <div class="buttons">
        <button onclick="addToCart('${product.id}', this)">Add to Cart</button>
        <p class="added-msg">Added to Cart!</p>

      </div>
    `;

    container.appendChild(card);
  });
}

// Cart Actions
function addToCart(productId, btn) {
  if (!cart[productId]) {
    cart[productId] = 1;
  } else {
    cart[productId]++;
  }
  renderCart();
  renderPaymentCart();
  localStorage.setItem("cart", JSON.stringify(cart));


  const card = btn.closest(".product");
  const msg = card.querySelector(".added-msg");
  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
  }, 1500);
}

function removeFromCart(productId) {
  if (cart[productId]) {
    cart[productId]--;
    if (cart[productId] <= 0) {
      delete cart[productId];
    }
  }
  renderCart();
  renderPaymentCart();
  localStorage.setItem("cart", JSON.stringify(cart));

}

function changeCount(id, delta) {
  if (cart[id]) {
    cart[id] += delta;
    if (cart[id] <= 0) {
      delete cart[id]; 
    }
    renderCart();
    renderPaymentCart();
    localStorage.setItem("cart", JSON.stringify(cart));

  }
}


// Render Cart
function renderCart() {
  cartList.innerHTML = ""; 
  let total = 0;

  for (let productId in cart) {
    let quantity = cart[productId];
    let product = products.find(p => p.id === productId); 
    if (!product) continue
    total += product.price * quantity;

    let li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price.toFixed(2)} x ${quantity}
      <button onclick="changeCount('${productId}', 1)">+</button>
      <button onclick="changeCount('${productId}', -1)">-</button>
    `;
    cartList.appendChild(li);
  }

  let totalLi = document.createElement("li");
  totalLi.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cartList.appendChild(totalLi);
}

// Render Payment
function renderPaymentCart() {
  const paymentCart = document.getElementById("payment-cart");
  const paymentTotal = document.getElementById("payment-total");
  if (!paymentCart || !paymentTotal) return;

  paymentCart.innerHTML = "";
  let total = 0;

  for (let productId in cart) {
    let quantity = cart[productId];
    let product = products.find(p => p.id == productId);

    let li = document.createElement("ul");
    li.innerHTML = `${product.name} - $${product.price.toFixed(2)} x ${quantity}`;
    paymentCart.appendChild(li);

    total += product.price * quantity;
  }

  paymentTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}


document.getElementById("cardForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Payment Successful ✅ (fake for now)");
    document.getElementById("payment").style.display = "none";
})
// Toggles
function toggleCart() {
  let cartBox = document.getElementById("cart");
  cartBox.style.display = (cartBox.style.display === "none") ? "block" : "none";
}

function togglepaymentSection() {
  let pay = document.getElementById("payment");
  pay.style.display = (pay.style.display === "none") ? "block" : "none";
}

// Clear Cart
document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart = {};
  renderCart();
  renderPaymentCart();
  localStorage.setItem("cart", JSON.stringify(cart));

});

// Init
renderProducts();
renderCart();
renderPaymentCart();