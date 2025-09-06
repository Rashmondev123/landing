// Menu toggle (reused from app.js)
function expand() {
  document.getElementById('menu').style.display = 'block';
  document.getElementById('opn').style.display = 'none';
  document.getElementById('cls').style.display = 'inline';
}

function collapse() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('opn').style.display = 'inline';
  document.getElementById('cls').style.display = 'none';
}

// Load orders
window.onload = function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalQuantity = parseInt(localStorage.getItem('cart')) || 0;
  const ordersContainer = document.getElementById('ordersContainer');
  const cartQuantity = document.getElementById('cartQuantity');

  // Update cart quantity
  cartQuantity.innerText = totalQuantity;

  // Handle empty orders
  if (cartItems.length === 0) {
    ordersContainer.innerHTML = '<p class="no-orders">No orders found.</p>';
    return;
  }

  // Populate orders
  cartItems.forEach((item, index) => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order-item';
    orderDiv.innerHTML = `
      <div class="head-div">
        <p class="head-txt">Order Placed: <br><span>February 5</span></p>
        <p class="head-txt Total-p">Total: <br><span>$${(item.price * item.quantity).toFixed(2)}</span></p>
        <p class="head-txt">Order ID: <br><span>27cba69d-4c3d-4098-b42d-ac7fa62b${index}</span></p>
      </div>
      <div class="ordered-div">
        <img src="${item.image}" class="ordered-img" alt="${item.name}">
        <div class="orders-name">
          <p class="img-name">${item.name}</p>
          <p class="delivery-date">Arriving on: February 10<br>Quantity: ${item.quantity}</p>
          <button class="buy-again" onclick="buyAgain('${item.name}')">Buy it again</button>
        </div>
        <button class="track-btn">Track Package</button>
      </div>
    `;
    ordersContainer.appendChild(orderDiv);
  });
};

// Buy it again
function buyAgain(productName) {
  const products = {
    'Black and Gray Athletic Cotton Socks - 6 Pairs': { name: 'Black and Gray Athletic Cotton Socks - 6 Pairs', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 },
    'Intermediate Size Basketball': { name: 'Intermediate Size Basketball', image: 'Images/intermediate-composite-basketball.jpg', price: 10.90 },
    'Adults Plain Cotton T-Shirt - 2 Pack': { name: 'Adults Plain Cotton T-Shirt - 2 Pack', image: 'Images/men-golf-polo-t-shirt-blue.jpg', price: 10.90 },
    '2 Slot Toaster - Black': { name: '2 Slot Toaster - Black', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 },
    '6 Piece White Dinner Plate Set': { name: '6 Piece White Dinner Plate Set', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 },
    '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set': { name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 }
  };
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({ ...products[productName], quantity: 1 });
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cart', totalQuantity);
  window.location.reload();
}