let cartCount = 0;

function renderHome() {
    document.getElementById('app-content').innerHTML = `
        <section class="products">
            <div class="product">
                <img src="https://images.unsplash.com/photo-1513708927688-890fe41c2d40?auto=format&fit=crop&w=400&q=80" alt="Product 1">
                <h2>Product 1</h2>
                <p>$19.99</p>
                <button>Add to Cart</button>
            </div>
            <div class="product">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Product 2">
                <h2>Product 2</h2>
                <p>$29.99</p>
                <button>Add to Cart</button>
            </div>
            <div class="product">
                <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Product 3">
                <h2>Product 3</h2>
                <p>$39.99</p>
                <button>Add to Cart</button>
            </div>
        </section>
    `;
    setupCartButtons();
}

function renderShop() {
    document.getElementById('app-content').innerHTML = `
        <h2>Shop</h2>
        <p>Shop page coming soon!</p>
    `;
}

function renderCart() {
    document.getElementById('app-content').innerHTML = `
        <h2>Your Cart</h2>
        <p>Items in cart: <span id="cart-items">${cartCount}</span></p>
        <p>(Demo: Cart functionality is basic.)</p>
    `;
}

function renderContact() {
    document.getElementById('app-content').innerHTML = `
        <h2>Contact Us</h2>
        <p>Email: demo@store.com</p>
        <img src="https://images.unsplash.com/photo-1513708927688-890fe41c2d40?auto=format&fit=crop&w=400&q=80" alt="Contact">
    `;
}

function setupCartButtons() {
    const buttons = document.querySelectorAll('.product button');
    const cartCountSpan = document.getElementById('cart-count');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            cartCount++;
            if (cartCountSpan) cartCountSpan.textContent = cartCount;
        });
    });
}

function router() {
    const hash = window.location.hash || '#home';
    switch (hash) {
        case '#home':
            renderHome();
            break;
        case '#shop':
            renderShop();
            break;
        case '#cart':
            renderCart();
            break;
        case '#contact':
            renderContact();
            break;
        default:
            renderHome();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);