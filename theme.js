
// Basic JS for demo e-commerce site

// Add to Cart button functionality (demo only)
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            alert('Added to cart!');
        });
    });
});