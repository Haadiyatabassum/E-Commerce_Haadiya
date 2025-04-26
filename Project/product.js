// Initialize cart  and get data from local storage or empty array

let cart = JSON.parse(localStorage.getItem('cart')) || []

// Displaying cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items')
    const totalAmount = document.getElementById('total-amount')
    cartItemsContainer.innerHTML = ''
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="updateQuantity(${index}, 'increase')">+</button>
            <button onclick="updateQuantity(${index}, 'decrease')">-</button>
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsContainer.appendChild(listItem);
    })

    totalAmount.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

// Add items to cart
function addToCart(id, name, price) {
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;  
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    displayCart();
}

//Update items in cart
function updateQuantity(index, action) {
    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease') {
        cart[index].quantity = Math.max(1, cart[index].quantity - 1);
    }
    
    displayCart();
}

//  Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];  // Clear cart
        localStorage.removeItem('cart');
        displayCart();
    }
}
displayCart();

//  Receipt modal
function showReceipt() {
    const receiptContent = document.getElementById('receipt-content');
    const receiptTotal = document.getElementById('receipt-total');
    let total = 0;

    // Initially the receipt is empty if not it will clear previous one
    receiptContent.innerHTML = '';

    // To generate receipt items
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('p');
        itemElement.innerHTML = `${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}`;
        receiptContent.appendChild(itemElement);
    });

    // To Set total in receipt
    receiptTotal.textContent = total.toFixed(2);

    // To Displaying  modal
    document.getElementById('receipt-modal').style.display = 'block';
}

//To close the receipt modal
function closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
}

//To checkout and generate receipt
function checkout() {
    if (cart.length === 0) {
        alert("Your Cart is Empty!");
        return;
    }
    showReceipt();  
}

// To confirm checkout, clear cart and hide modal
function confirmCheckout() {
    alert("Thank you for your purchase!");
    cart = [];  
    localStorage.removeItem('cart');
    displayCart();  
    closeReceipt();  
    }