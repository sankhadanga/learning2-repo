// Basic JS for demo e-commerce site

// Add to Cart button functionality (demo only)
document.addEventListener('DOMContentLoaded', function () {
    let cartCount = 0;
    const cartCountSpan = document.getElementById('cart-count');
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            cartCount++;
            if (cartCountSpan) cartCountSpan.textContent = cartCount;
        });
    });
});

<img src="https://images.unsplash.com/photo-1513708927688-890fe41c2d40?auto=format&fit=crop&w=400&q=80" alt="Product 1"></img>