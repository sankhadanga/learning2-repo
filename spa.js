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
    let html = `<section class="products">`;
    products.forEach(product => {
        html += `
        <article class="product">
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button data-id="${product.id}">Add to Cart</button>
            <p><a href="#readmore-${product.id}" class="read-more-link">Read More</a></p>
        </article>
        `;
    });
    html += `</section>`;
    document.getElementById('app-content').innerHTML = html;
    setupCartButtons();
    setupReadMoreLinks();
}

function renderReadMore(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return renderHome();
    document.getElementById('app-content').innerHTML = `
        <article>
            <img src="${product.img}" alt="${product.name}" style="max-width:300px;">
            <h2>${product.name}</h2>
            <p><strong>Color:</strong> ${product.color}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <p>${product.desc}</p>
            <button data-id="${product.id}">Add to Cart</button>
            <p><a href="#home">Back to Home</a></p>
        </article>
    `;
    setupCartButtons();
}

function renderShop() {
    // Get unique colors
    const colors = [...new Set(products.map(p => p.color))];
    let colorOptions = colors.map(color => `<option value="${color}">${color}</option>`).join('');
    let selectedColor = window.selectedColor || "All";
    let filtered = selectedColor && selectedColor !== "All" ? products.filter(p => p.color === selectedColor) : products;

    let html = `
        <h2>Shop by Color</h2>
        <label for="color-select">Filter by color: </label>
        <select id="color-select">
            <option value="All">All</option>
            ${colorOptions}
        </select>
        <section class="products">
    `;
    filtered.forEach(product => {
        html += `
        <article class="product">
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <span class="badge" style="background:${product.color.toLowerCase()};color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8em;">${product.color}</span>
            <button data-id="${product.id}">Add to Cart</button>
        </article>
        `;
    });
    html += `</section>`;
    document.getElementById('app-content').innerHTML = html;
    document.getElementById('color-select').value = selectedColor;
    document.getElementById('color-select').addEventListener('change', function () {
        window.selectedColor = this.value;
        renderShop();
    });
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
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-btn" data-idx="${idx}" style="margin-left:10px;background:#dc3545;">Remove</button>
            </li>`;
        });
        html += `</ul>`;
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

function setupCartButtons() {
    const buttons = document.querySelectorAll('.product button, article button[data-id]');
    const cartCountSpan = document.getElementById('cart-count');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            if (product) cart.push(product);
            saveCart(); // Save to localStorage
            if (cartCountSpan) cartCountSpan.textContent = cart.length;
        });
    });
}

function setupRemoveButtons() {
    const removeBtns = document.querySelectorAll('.remove-btn');
    const cartCountSpan = document.getElementById('cart-count');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'));
            cart.splice(idx, 1);
            saveCart(); // Save to localStorage
            if (cartCountSpan) cartCountSpan.textContent = cart.length;
            renderCart();
        });
    });
}

function setupReadMoreLinks() {
    const links = document.querySelectorAll('.read-more-link');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            window.location.hash = hash;
        });
    });
}

function updateNavUser() {
    let nav = document.querySelector('nav');
    if (!nav) return;
    let userBtn = document.getElementById('nav-user');
    if (userBtn) userBtn.remove();
    let btn = document.createElement('span');
    btn.id = 'nav-user';
    btn.style = "float:right;margin-left:1em;";
    if (user) {
        btn.innerHTML = `<span style="color:green;">${user.email}</span> <button id="logout-btn" style="margin-left:0.5em;">Logout</button>`;
        nav.appendChild(btn);
        setTimeout(() => {
            document.getElementById('logout-btn').onclick = () => {
                logoutUser();
            };
        }, 100);
    } else {
        btn.innerHTML = `<button id="login-btn">Login</button>`;
        nav.appendChild(btn);
        setTimeout(() => {
            document.getElementById('login-btn').onclick = showLoginModal;
        }, 100);
    }
}

function requireLogin(next) {
    if (!user) {
        showLoginModal();
        return false;
    }
    return true;
}

function router() {
    const hash = window.location.hash || '#home';
    if (hash.startsWith('#readmore-')) {
        if (!requireLogin()) return;
        const productId = hash.replace('#readmore-', '');
        renderReadMore(productId);
        updateNavUser();
        return;
    }
    switch (hash) {
        case '#home':
            renderHome();
            break;
        case '#shop':
            if (!requireLogin()) return;
            renderShop();
            break;
        case '#cart':
            if (!requireLogin()) return;
            renderCart();
            break;
        case '#contact':
            renderContact();
            break;
        default:
            renderHome();
    }
    // Update cart count on navigation
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.textContent = cart.length;
    updateNavUser();
}

// Also, update cart count on page load
window.addEventListener('DOMContentLoaded', () => {
    router();
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.textContent = cart.length;
    updateNavUser();
});

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);