// Load cart data on page load
window.onload = function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalQuantity = parseInt(localStorage.getItem('cart')) || 0;
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartItemsCount = document.getElementById('cartItems');
  let totalPrice = 0;

  // Update item count
  cartItemsCount.innerText = totalQuantity;

  // Clear existing items
  cartItemsContainer.innerHTML = '';

  // Populate cart items
  cartItems.forEach((item, index) => {
    totalPrice += item.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'delivery-goods';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="ordered-good">
      <div class="quantity-div">
        <p class="quantity-name">${item.name}</p>
        <p class="quantity-price">$${item.price.toFixed(2)}</p>
        <p class="quantity">Quantity: 
          <select id="quantity-${index}" onchange="updateQuantity(${index})">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => 
              `<option value="${n}" ${n === item.quantity ? 'selected' : ''}>${n}</option>`
            ).join('')}
          </select>
          <span onclick="deleteItem(${index})">Delete</span>
        </p>
      </div>
      <div class="delivery-option">
        <p class="delivery-option-text">Choose a delivery option:</p>
        <div><input type="radio" name="delivery-${index}" checked><p class="delivery-option-date">Tuesday, February 18<br><span>Free Shipping</span></p></div>
        <div><input type="radio" name="delivery-${index}"><p class="delivery-option-date">Wednesday, February 19<br><span>$4.99 Shipping</span></p></div>
        <div><input type="radio" name="delivery-${index}"><p class="delivery-option-date">Friday, February 21<br><span>$9.99 Shipping</span></p></div>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  // Update order summary
  const shipping = 4.99;
  const tax = totalPrice * 0.1; // 10% tax
  const orderTotal = totalPrice + shipping + tax;
  const summaryDiv = document.querySelector('.summary-div');
  summaryDiv.innerHTML = `
    <div><p>Items (${totalQuantity}):</p><p class="summary-price">$${totalPrice.toFixed(2)}</p></div>
    <div><p>Shipping & handling:</p><p class="summary-price">$${shipping.toFixed(2)}</p></div>
    <div><p>Total before tax:</p><p class="summary-price">$${(totalPrice + shipping).toFixed(2)}</p></div>
    <div><p>Estimated tax:</p><p class="summary-price">$${tax.toFixed(2)}</p></div>
    <hr>
    <div class="order-total-div"><p>Order Total:</p><p class="summary-price">$${orderTotal.toFixed(2)}</p></div>
    <button class="place-order">Place your order</button>
  `;
};

// Update quantity
function updateQuantity(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const newQuantity = parseInt(document.getElementById(`quantity-${index}`).value);
  cartItems[index].quantity = newQuantity;

  // Recalculate total quantity
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cart', totalQuantity);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Reload page to update display
  window.location.reload();
}

// Delete item
function deleteItem(index) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.splice(index, 1); // Remove item
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cart', totalQuantity);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Reload page to update display
  window.location.reload();
};