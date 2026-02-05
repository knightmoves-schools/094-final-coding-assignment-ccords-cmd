// Shopping Cart Array
let cart = [];

// Add item to cart
function addToCart(itemName, itemPrice) {
    cart.push({
        id: Date.now(),
        name: itemName,
        price: itemPrice
    });
    
    updateCart();
    
    // Visual feedback
    showAddFeedback(itemName);
}

// Show feedback when item is added
function showAddFeedback(itemName) {
    const message = `✓ ${itemName} added to cart!`;
    console.log(message);
}

// Remove item from cart by index
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update cart display and total
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty</p>';
        totalElement.textContent = '0.00';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price"> - $${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
        
        // Calculate and display total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalElement.textContent = total.toFixed(2);
    }
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCart();
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items first!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you for your purchase!\n\nItems: ${cart.length}\nTotal: $${total.toFixed(2)}\n\nYour order has been placed successfully!`);
    
    // Clear cart after checkout
    cart = [];
    updateCart();
}