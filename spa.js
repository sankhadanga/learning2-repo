// --- Data Layer for santos e-comm SPA ---

// Product Data Layer
const DataLayer = {
    getProducts() {
        // Returns a copy to prevent direct mutation
        return [...products];
    },
    getProductById(id) {
        return products.find(p => p.id === Number(id)) || null;
    },
    getColors() {
        return [...new Set(products.map(p => p.color))];
    }
};

// User Data Layer
const UserData = {
    getUser() {
        return JSON.parse(localStorage.getItem('santos_user')) || null;
    },
    setUser(userObj) {
        localStorage.setItem('santos_user', JSON.stringify(userObj));
    },
    clearUser() {
        localStorage.removeItem('santos_user');
    }
};

// Cart Data Layer
const CartData = {
    getCart() {
        const data = localStorage.getItem('santos_cart');
        return data ? JSON.parse(data) : [];
    },
    setCart(cartArr) {
        localStorage.setItem('santos_cart', JSON.stringify(cartArr));
    },
    addToCart(product) {
        const cart = this.getCart();
        cart.push(product);
        this.setCart(cart);
        return cart;
    },
    removeFromCart(idx) {
        const cart = this.getCart();
        cart.splice(idx, 1);
        this.setCart(cart);
        return cart;
    },
    clearCart() {
        localStorage.removeItem('santos_cart');
    }
};

// Demo product data
const products = [
    {
        id: 1,
        name: "Classic White Shirt",
        price: 799,
        color: "White",
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        desc: "A crisp, classic white shirt perfect for office or casual wear."
    },
    {
        id: 2,
        name: "Blue Denim Jeans",
        price: 1299,
        color: "Blue",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        desc: "Comfortable blue denim jeans with a modern fit for everyday style."
    },
    {
        id: 3,
        name: "Green Cotton Kurta",
        price: 999,
        color: "Green",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
        desc: "Soft green cotton kurta for ethnic and daily wear."
    },
    {
        id: 4,
        name: "Yellow Summer Dress",
        price: 1499,
        color: "Yellow",
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        desc: "Bright yellow dress, ideal for summer outings and picnics."
    },
    {
        id: 5,
        name: "Black Leather Jacket",
        price: 2199,
        color: "Black",
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        desc: "Trendy black leather jacket for a bold and stylish look."
    },
    {
        id: 6,
        name: "Red Polo T-shirt",
        price: 699,
        color: "Red",
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        desc: "Vibrant red polo t-shirt for a sporty and casual look."
    },
    {
        id: 7,
        name: "Brown Leather Belt",
        price: 499,
        color: "Brown",
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        desc: "Durable brown leather belt to complement any outfit."
    },
    {
        id: 8,
        name: "Pink Cotton Top",
        price: 599,
        color: "Pink",
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        desc: "Soft pink cotton top for a casual day out."
    },
    {
        id: 9,
        name: "Grey Hooded Sweatshirt",
        price: 1199,
        color: "Gray",
        img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        desc: "Warm grey hoodie for chilly evenings and winter walks."
    },
    {
        id: 10,
        name: "Blue Sports Cap",
        price: 299,
        color: "Blue",
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        desc: "Blue sports cap for sun protection and style."
    },
    {
        id: 11,
        name: "Green Cargo Shorts",
        price: 899,
        color: "Green",
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        desc: "Comfortable green cargo shorts with multiple pockets."
    },
    {
        id: 12,
        name: "Purple Woolen Scarf",
        price: 399,
        color: "Purple",
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        desc: "Cozy purple scarf to keep you warm in winter."
    },
    {
        id: 13,
        name: "Orange Beanie",
        price: 349,
        color: "Orange",
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        desc: "Trendy orange beanie for a pop of color in your winter wardrobe."
    },
    {
        id: 14,
        name: "White Sneakers",
        price: 1599,
        color: "White",
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        desc: "Classic white sneakers for everyday comfort and style."
    },
    {
        id: 15,
        name: "Winter Jacket",
        price: 2299,
        color: "Black",
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        desc: "Warm and stylish black winter jacket, perfect for cold weather."
    },
    {
        id: 16,
        name: "Yellow Silk Dupatta",
        price: 799,
        color: "Yellow",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
        desc: "Elegant yellow silk dupatta for festive occasions."
    },
  {
    id: 17,
    name: "Remote Control Toy Car",
    price: 1499,
    color: "Red",
    img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    desc: "Fun and fast remote control toy car, perfect for kids and hobbyists."
},
    {
        id: 18,
        name: "Pink Ethnic Skirt",
        price: 1299,
        color: "Pink",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        desc: "Beautiful pink ethnic skirt for traditional events."
    }
];

let user = JSON.parse(localStorage.getItem('santos_user')) || null;

function saveUser(u) {
    user = u;
    localStorage.setItem('santos_user', JSON.stringify(user));
}
function logoutUser() {
    user = null;
    localStorage.removeItem('santos_user');
    router();
}

function saveCart() {
    localStorage.setItem('santos_cart', JSON.stringify(cart));
}
function loadCart() {
    const data = localStorage.getItem('santos_cart');
    return data ? JSON.parse(data) : [];
}

let cart = loadCart();

function renderHome() {
    // Get unique colors for filter
    const colors = [...new Set(products.map(p => p.color))];
    let colorOptions = colors.map(color => `<option value="${color}">${color}</option>`).join('');
    let selectedColor = window.homeSelectedColor || "All";
    let filtered = selectedColor && selectedColor !== "All" ? products.filter(p => p.color === selectedColor) : products;

    let html = `
    <section class="hero-banner" style="background:linear-gradient(90deg,#f8fafc 60%,#e0e7ef 100%);padding:2.5em 1em 2em 1em;text-align:center;margin-bottom:2em;border-radius:12px;">
        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="Santos E-Comm Hero" style="max-width:220px;width:100%;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.08);margin-bottom:1em;">
        <h1 style="font-size:2.2em;margin:0 0 0.3em 0;color:#222;">SANTOSH e-comm a Demo site</h1>
        <p style="font-size:1.2em;color:#444;max-width:600px;margin:0 auto;">
            This site is a demo for an e-commerce platform. It showcases various products and features like cart management, product details, and user authentication.
        </p>
        <p style="font-size:1em;color:#666;max-width:600px;margin:1em auto 0 auto;">
    </section>
    <section>
        <h2>Shop by Color</h2>
        <label for="home-color-select">Filter by color: </label>
        <select id="home-color-select">
            <option value="All">All</option>
            ${colorOptions}
        </select>
    </section>
    <section class="products">
    `;
    filtered.forEach(product => {
        html += `
        <article class="product">
            <a href="#readmore-${product.id}" class="product-img-link">
                <img src="${product.img}" alt="${product.name}" style="cursor:pointer;">
            </a>
            <h2>${product.name}</h2>
            <p>₹${product.price}</p>
            <button data-id="${product.id}">Add to Cart</button>
            <p><a href="#readmore-${product.id}" class="read-more-link">Read More</a></p>
        </article>
        `;
    });
    html += `</section>`;
    document.getElementById('app-content').innerHTML = html;

    // Set selected value and add event listener for filter
    document.getElementById('home-color-select').value = selectedColor;
    document.getElementById('home-color-select').addEventListener('change', function () {
        window.homeSelectedColor = this.value;
        renderHome();
    });

    setupCartButtons();
    setupReadMoreLinks();
    setupProductImageLinks();
}

function setupProductImageLinks() {
    const links = document.querySelectorAll('.product-img-link');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            window.location.hash = hash;
        });
    });
}

function renderReadMore(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return renderHome();
    document.getElementById('app-content').innerHTML = `
        <section class="pdp-container" style="display:flex;flex-wrap:wrap;gap:2em;align-items:flex-start;justify-content:center;padding:2em 0;">
            <div class="pdp-image" style="flex:1;min-width:280px;max-width:400px;text-align:center;">
                <img src="${product.img}" alt="${product.name}" style="max-width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
            </div>
            <div class="pdp-details" style="flex:2;min-width:280px;max-width:500px;">
                <h1 style="font-size:2em;margin-bottom:0.3em;color:#222;">${product.name}</h1>
                <span class="badge" style="background:${product.color.toLowerCase()};color:#fff;padding:4px 12px;border-radius:6px;font-size:1em;vertical-align:middle;">${product.color}</span>
                <p style="font-size:1.3em;color:#28a745;margin:1em 0 0.5em 0;"><strong>₹${product.price}</strong></p>
                <p style="font-size:1.1em;color:#444;margin-bottom:1.5em;">
                    ${product.desc}
                </p>
                <ul style="color:#555;font-size:1em;line-height:1.7;margin-bottom:1.5em;">
                    <li>Free shipping on orders above ₹999</li>
                    <li>Easy 7-day returns</li>
                    <li>Secure online payment</li>
                    <li>Quality checked &amp; authentic products</li>
                </ul>
                <button class="add-to-cart-btn" data-id="${product.id}" style="background:#222;color:#fff;padding:0.8em 2em;font-size:1.1em;border:none;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.08);cursor:pointer;">Add to Cart</button>
                <p style="margin-top:2em;"><a href="#home" style="color:#0366d6;text-decoration:underline;">&#8592; Back to Home</a></p>
            </div>
        </section>
    `;
    setupCartButtons();
}

function renderCart() {
    let html = `<h2>Your Cart</h2>`;
    if (cart.length === 0) {
        html += `<p>Your cart is empty.</p>`;
    } else {
        html += `<ul>`;
        cart.forEach((item, idx) => {
            html += `<li>
                <img src="${item.img}" alt="${item.name}" style="width:40px;height:40px;vertical-align:middle;border-radius:4px;margin-right:8px;">
                ${item.name} - ₹${item.price}
                <button class="remove-btn" data-idx="${idx}" style="margin-left:10px;background:#dc3545;">Remove</button>
            </li>`;
        });
        html += `</ul>`;

        // --- Cart Total Calculator ---
        const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
        html += `
            <div style="margin-top:2em;padding:1em;background:#f8fafc;border-radius:8px;max-width:350px;">
                <h3 style="margin:0 0 0.5em 0;">Cart Total</h3>
                <div style="font-size:1.3em;font-weight:bold;color:#222;">₹${total}</div>
                <p style="font-size:0.95em;color:#666;margin:0.5em 0 0 0;">(Inclusive of all taxes)</p>
            </div>
        `;
    }
    document.getElementById('app-content').innerHTML = html;
    setupRemoveButtons();
}

function renderContact() {
    document.getElementById('app-content').innerHTML = `
        <h2>Contact Us</h2>
        <p>Email: demo@store.com</p>
        <p>
            <a href="https://github.com/sankhadanga/testsk2-repo" target="_blank" style="color:#0366d6;font-weight:bold;">Visit our GitHub Repo</a>
        </p>
        <img src="https://images.unsplash.com/photo-1513708927688-890fe41c2d40?auto=format&fit=crop&w=400&q=80" alt="Contact" style="max-width:300px;">
    `;
}

function showLoginModal() {
    const modal = document.createElement('div');
    modal.id = "login-modal";
    modal.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;";
    modal.innerHTML = `
      <div style="background:#fff;padding:2em 2em 1em 2em;border-radius:8px;min-width:300px;max-width:90vw;position:relative;">
        <h2>Login</h2>
        <button id="google-login-btn" style="width:100%;background:#4285F4;color:#fff;padding:0.5em 0;border:none;border-radius:4px;margin-bottom:1em;font-size:1em;">
          <span style="font-weight:bold;">G</span> Sign in with Google (demo)
        </button>
        <form id="email-login-form">
          <input type="email" id="login-email" placeholder="Email" required style="width:100%;margin-bottom:0.5em;padding:0.5em;">
          <input type="password" id="login-pass" placeholder="Password" required style="width:100%;margin-bottom:0.5em;padding:0.5em;">
          <button type="submit" style="width:100%;background:#222;color:#fff;padding:0.5em 0;border:none;border-radius:4px;">Login with Email</button>
        </form>
        <button id="close-login-modal" style="position:absolute;top:0.5em;right:0.5em;background:none;border:none;font-size:1.2em;">&times;</button>
        <div id="login-error" style="color:red;margin-top:0.5em;"></div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('close-login-modal').onclick = () => modal.remove();

    document.getElementById('google-login-btn').onclick = () => {
        // Simulate Google login (for demo)
        saveUser({ email: "googleuser@santos.com", provider: "google" });
        modal.remove();
        router();
    };

    document.getElementById('email-login-form').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        if (email === "testsantos@test.com" && pass === "test") {
            saveUser({ email, provider: "test" });
            modal.remove();
            router();
        } else {
            document.getElementById('login-error').textContent = "Invalid credentials. Try test account.";
        }
    };
}

function showProductAddedPopup(productName) {
    // Remove any existing popup
    const oldPopup = document.getElementById('product-added-popup');
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement('div');
    popup.id = 'product-added-popup';
    popup.textContent = `Product "${productName}" has been added successfully.`;
    popup.style = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: #28a745;
        color: #fff;
        padding: 1em 1.5em;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        font-size: 1.1em;
        z-index: 2000;
        opacity: 0.95;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 500);
    }, 1800);
}

// --- Enhanced Adobe Client Data Layer for Analytics ---

// Utility to generate unique IDs for components/pages
function generateId(prefix = "cmp") {
    return prefix + "-" + Math.random().toString(36).substr(2, 10);
}

// Enhanced: Push page view event with more analytics-friendly fields
function pushPageDataLayer(pageTitle, pageDesc, path = window.location.pathname) {
    const pageId = generateId("page");
    window.adobeDataLayer.push({
        event: "pageView",
        page: {
            pageInfo: {
                pageID: pageId,
                pageName: pageTitle,
                pageURL: window.location.href,
                pagePath: path,
                language: "en-US",
                siteSection: "santos-ecomm",
                siteSubsection: pageTitle.toLowerCase().replace(/\s/g, "-"),
                server: window.location.hostname
            },
            attributes: {
                description: pageDesc,
                template: "/conf/santos/settings/wcm/templates/spa-template",
                tags: [],
                timestamp: new Date().toISOString()
            }
        }
    });
}

// Enhanced: Push navigation event
function pushNavDataLayer(label, url) {
    const navId = generateId("nav");
    window.adobeDataLayer.push({
        event: "navigationClick",
        navigation: {
            navID: navId,
            navLabel: label,
            navURL: url,
            timestamp: new Date().toISOString()
        }
    });
}

// Enhanced: Push product add-to-cart event with commerce fields
function pushProductAddDataLayer(product) {
    const cmpId = generateId("product");
    window.adobeDataLayer.push({
        event: "addToCart",
        ecommerce: {
            action: "add",
            productList: [{
                productID: product.id,
                productName: product.name,
                productDescription: product.desc,
                price: product.price,
                color: product.color,
                imageURL: product.img,
                quantity: 1
            }],
            cart: {
                cartTotal: cart.reduce((sum, item) => sum + Number(item.price), 0),
                cartCount: cart.length
            }
        },
        attributes: {
            timestamp: new Date().toISOString()
        }
    });
}

// Enhanced: Push cart view event
function pushCartViewDataLayer() {
    window.adobeDataLayer.push({
        event: "cartView",
        ecommerce: {
            cart: {
                cartTotal: cart.reduce((sum, item) => sum + Number(item.price), 0),
                cartCount: cart.length,
                products: cart.map(item => ({
                    productID: item.id,
                    productName: item.name,
                    price: item.price,
                    color: item.color,
                    imageURL: item.img,
                    quantity: 1
                }))
            }
        },
        attributes: {
            timestamp: new Date().toISOString()
        }
    });
}

// Enhanced: Push product detail view event
function pushProductDetailDataLayer(product) {
    window.adobeDataLayer.push({
        event: "productDetailView",
        ecommerce: {
            detail: {
                productID: product.id,
                productName: product.name,
                productDescription: product.desc,
                price: product.price,
                color: product.color,
                imageURL: product.img
            }
        },
        attributes: {
            timestamp: new Date().toISOString()
        }
    });
}

// --- Usage in SPA ---

function router() {
    const hash = window.location.hash || '#home';
    if (hash.startsWith('#readmore-')) {
        const pid = hash.replace('#readmore-', '');
        const product = products.find(p => p.id == pid);
        renderReadMore(pid);
        updateNavUser();
        pushPageDataLayer("Product Details", "Viewing product details");
        if (product) pushProductDetailDataLayer(product);
        return;
    }
    switch (hash) {
        case '#home':
            renderHome();
            pushPageDataLayer("Home", "Welcome to santos e-comm");
            break;
        case '#cart':
            renderCart();
            pushPageDataLayer("Cart", "View your cart items");
            pushCartViewDataLayer();
            break;
        case '#contact':
            renderContact();
            pushPageDataLayer("Contact", "Contact and GitHub info");
            break;
        default:
            renderHome();
            pushPageDataLayer("Home", "Welcome to santos e-comm");
    }
    // Update cart count on navigation
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.textContent = cart.length;
    updateNavUser();
}

// Listen for hash changes to trigger router
window.addEventListener('hashchange', router);

// Call router and nav tracking on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    router();
    // Only call setupNavTracking() here if your nav is static!
    // If nav is dynamic, call setupNavTracking() after rendering nav in updateNavUser()
    updateCartCount();
});

// Utility to update cart count in nav
function updateCartCount() {
    cart = CartData.getCart(); // <-- always get latest cart
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.textContent = cart.length;
}

// Navigation click tracking
function setupNavTracking() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default navigation
            const href = this.getAttribute('href');
            if (window.location.hash !== href) {
                window.location.hash = href; // This will trigger router()
            } else {
                router(); // If already on the same hash, force rerender
            }
            pushNavDataLayer(this.textContent, href);
        });
    });
}

// Update cart count after rendering nav/user
function updateNavUser() {
    // ...existing code to render nav/user...
    setupNavTracking(); // <-- ensure nav links always work
    updateCartCount();  // <-- ensure cart count is always correct
}

// Update cart count after adding to cart
function setupCartButtons() {
    const buttons = document.querySelectorAll('.product button, article button[data-id], .add-to-cart-btn');
    buttons.forEach(button => {
        button.onclick = function () {
            const id = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            if (product) {
                CartData.addToCart(product);
                cart = CartData.getCart(); // <-- sync global cart variable
                showProductAddedPopup(product.name);
                pushProductAddDataLayer(product);
                updateCartCount(); // <-- update cart count in nav
            }
        };
    });
}

function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.onclick = function () {
            const idx = parseInt(this.getAttribute('data-idx'));
            CartData.removeFromCart(idx);
            cart = CartData.getCart();
            renderCart();
            updateCartCount();
        };
    });
}