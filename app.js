// Mobile Menu Toggle
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

// Cart Functionality
let quantity = parseInt(localStorage.getItem('cart')) || 0; // Initialize from localStorage

// Store product details for cart
const products = {
    One: { name: 'Black and Gray Athletic Cotton Socks - 6 Pairs', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 },
    Two: { name: 'Intermediate Size Basketball', image: 'Images/intermediate-composite-basketball.jpg', price: 10.90 },
    Three: { name: 'Adults Plain Cotton T-Shirt - 2 Pack', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 },
    Four: { name: '2 Slot Toaster - Black', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 },
    Five: { name: '6 Piece White Dinner Plate Set', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 },
    Six: { name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set', image: 'Images/athletic-cotton-socks-6-pairs.jpg', price: 10.90 }
};

function add(cartPerOne) {
    let cartValu;
    switch (cartPerOne) {
        case 'One':
            cartValu = parseInt(document.getElementById('valu').value);
            break;
        case 'Two':
            cartValu = parseInt(document.getElementById('valu2').value);
            break;
        case 'Three':
            cartValu = parseInt(document.getElementById('valu3').value);
            break;
        case 'Four':
            cartValu = parseInt(document.getElementById('valu4').value);
            break;
        case 'Five':
            cartValu = parseInt(document.getElementById('valu5').value);
            break;
        case 'Six':
            cartValu = parseInt(document.getElementById('valu6').value);
            break;
        default:
            return; // Exit if invalid
    }

    quantity += cartValu;
    document.getElementById('showValue').innerText = quantity;
    localStorage.setItem('cart', quantity);

    // Store product details in localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ ...products[cartPerOne], quantity: cartValu });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Initialize cart quantity on page load
document.getElementById('showValue').innerText = quantity;