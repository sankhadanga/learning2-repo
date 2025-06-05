// --- Optimized Adobe Data Layer for santos e-comm SPA with AEP XDM and Target Integration ---

// 1. Initialize Adobe Data Layer
window.adobeDataLayer = window.adobeDataLayer || [];

// --- Utility ---
const generateId = (prefix = "cmp") => prefix + "-" + Math.random().toString(36).slice(2, 10);
const nowIso = () => new Date().toISOString();

// --- Product Data (static demo) ---
const products = [
    {
        id: 1,
        name: "Nike Air Max Classic",
        price: 129.99,
        color: "White",
        desc: "Classic Nike Air Max sneakers with superior comfort and iconic style. Perfect for both athletic performance and casual wear.",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 2,
        name: "Adidas Ultraboost",
        price: 159.99,
        color: "Black",
        desc: "Premium running shoes with responsive Boost cushioning. Breathable Primeknit upper adapts to your foot's movement.",
        img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
    },
    {
        id: 3,
        name: "Puma RS-X",
        price: 89.99,
        color: "Red",
        desc: "Bold and chunky design with running system technology. Features mesh and textile upper with synthetic overlays.",
        img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
    },
    {
        id: 4,
        name: "Nike Zoom Pegasus",
        price: 119.99,
        color: "Blue",
        desc: "Versatile running shoes with Zoom Air cushioning. Engineered mesh upper provides targeted breathability.",
        img: "https://images.unsplash.com/photo-1597248881519-db089d3744a5"
    },
    {
        id: 5,
        name: "Adidas NMD R1",
        price: 139.99,
        color: "Grey",
        desc: "Urban-inspired comfort with Boost cushioning. Sock-like fit with distinctive midsole plugs.",
        img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
    },
    {
        id: 6,
        name: "New Balance 574",
        price: 79.99,
        color: "Navy",
        desc: "Classic lifestyle sneakers with ENCAP cushioning. Suede and mesh upper for premium comfort.",
        img: "https://images.unsplash.com/photo-1539185441755-769473a23570"
    },
    {
        id: 7,
        name: "Nike Air Jordan 1",
        price: 169.99,
        color: "Red",
        desc: "Iconic basketball shoes that started it all. Premium leather upper with Air-Sole cushioning.",
        img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
    },
    {
        id: 8,
        name: "Reebok Classic",
        price: 69.99,
        color: "White",
        desc: "Timeless design with modern comfort. Soft leather upper with EVA midsole.",
        img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
    },
      {
        id: 9,
        name: "Nike Air Force 1",
        price: 149.99,
        color: "Black",
        desc: "Legendary style meets premium materials. Full-grain leather upper with classic Air cushioning.",
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
    },
    {
        id: 10,
        name: "ASICS Gel-Nimbus",
        price: 134.99,
        color: "Blue",
        desc: "Premium running shoe with GEL cushioning. FlyteFoam technology provides exceptional bounce and comfort.",
        img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86"
    }
];

// --- Storage Manager ---
const SafeStorage = {
    get: key => {
        try { return JSON.parse(localStorage.getItem(key)); }
        catch { return null; }
    },
    set: (key, value) => {
        try { localStorage.setItem(key, JSON.stringify(value)); }
        catch {}
    },
    remove: key => {
        try { localStorage.removeItem(key); }
        catch {}
    }
};

// --- User State ---
let user = SafeStorage.get('santos_user');
const UserManager = {
    get: () => SafeStorage.get('santos_user'),
    set: userObj => {
        SafeStorage.set('santos_user', userObj);
        user = userObj;
    },
    clear: () => {
        SafeStorage.remove('santos_user');
        user = null;
    }
};

// --- Cart State ---
let cart = SafeStorage.get('santos_cart') || [];
const CartManager = {
    get: () => cart,
    set: arr => { cart = arr; SafeStorage.set('santos_cart', arr); },
    add: product => { CartManager.set([...cart, product]); },
    remove: idx => { 
        const updated = [...cart];
        updated.splice(idx, 1);
        CartManager.set(updated);
    },
    clear: () => { CartManager.set([]); }
};

// --- XDM Mappers ---
const XDM = {
    pageView: (pageTitle, pageDesc, path) => ({
        eventType: "web.webpagedetails.pageViews",
        web: {
            webPageDetails: {
                name: pageTitle,
                pageViews: { value: 1 }
            }
        },
        environment: {
            type: "browser"
        },
        placeContext: {
            localTime: nowIso(),
            page: {
                URL: window.location.href,
                path: path,
                siteSection: "santos-ecomm",
                siteSubsection: pageTitle.toLowerCase().replace(/\s/g, "-"),
                language: "en-US"
            }
        },
        description: pageDesc
    }),
    productImpression: product => ({
        eventType: "commerce.productViews",
        productListItems: [{
            SKU: product.id,
            name: product.name,
            priceTotal: product.price,
            color: product.color
        }]
    }),
     addToCart: (product, cartState) => ({
        eventType: "commerce.productListAdds",
        commerce: {
            productListAdds: { value: 1 },
            order: {
                priceTotal: cartState.reduce((sum, p) => sum + Number(p.price), 0),
                currencyCode: "USD",
                purchaseID: generateId("order")
            }
        },
        productListItems: [{
            SKU: product.id,
            name: product.name,
            priceTotal: product.price,
            currencyCode: "USD",
            color: product.color,
            quantity: 1,
            productAddMethod: "add to cart button"
        }]
    }),
    cartView: cartState => ({
        eventType: "commerce.productListViews",
        commerce: {
            productListViews: { value: 1 },
            order: {
                priceTotal: cartState.reduce((sum, p) => sum + Number(p.price), 0),
                orderStatus: "cart"
            }
        },
        productListItems: cartState.map(item => ({
            SKU: item.id,
            name: item.name,
            priceTotal: item.price,
            color: item.color,
            quantity: 1
        }))
    }),
    login: email => ({
        eventType: "personalization.login",
        identityMap: {
            email: [{ id: email, authenticatedState: "authenticated", primary: true }]
        }
    }),
    logout: () => ({
        eventType: "personalization.logout"
    })
};

// Target Decision Scopes
const TARGET_SCOPES = {
    HOME_HERO: "home-hero",
    PRODUCT_RECOMMENDATIONS: "product-recs",
    CART_OFFERS: "cart-offers"
};

// --- Data Layer and Alloy Integration ---
function pushXdmToAlloy(xdmObj, decisionScopes = []) {
    if (window.alloy) {
        window.alloy("sendEvent", {
            xdm: xdmObj,
            decisionScopes: decisionScopes,
            renderDecisions: true
        }).then(result => {
            // Handle Target propositions
            const propositions = result.propositions;
            if (propositions) {
                propositions.forEach(proposition => {
                    if (proposition.renderAttempted) return;
                    
                    const { scopeDetails } = proposition;
                    if (scopeDetails && scopeDetails.characteristics && 
                        scopeDetails.characteristics.target) {
                        console.log("Target activity:", scopeDetails.activity.name);
                    }
                });
            }
        });
    }
    window.adobeDataLayer.push({ event: xdmObj.eventType || "custom", xdm: xdmObj });
}

// --- UI Rendering ---
function renderHome() {
    const colors = [...new Set(products.map(p => p.color))];
    let colorOptions = colors.map(color => `<option value="${color}">${color}</option>`).join('');
    let selectedColor = window.homeSelectedColor || "All";
    let filtered = selectedColor && selectedColor !== "All" ? 
        products.filter(p => p.color === selectedColor) : products;

    let html = `
        <section class="hero-banner" style="background:linear-gradient(90deg,#f8fafc 60%,#e0e7ef 100%);padding:2.5em 1em;margin-bottom:2em;border-radius:12px;text-align:center;">
            <h1 style="font-size:2.2em;margin-bottom:0.5em;color:#222;">Featured Sneakers</h1>
            <p style="color:#666;max-width:600px;margin:0 auto 1.5em;">Discover our collection of premium athletic and lifestyle footwear.</p>
            <div style="margin-bottom:2em;">
                <label for="color-filter" style="margin-right:1em;">Filter by Color:</label>
                <select id="color-filter" style="padding:0.5em 1em;border-radius:4px;border:1px solid #ddd;">
                    <option value="All">All Colors</option>
                    ${colorOptions}
                </select>
            </div>
        </section>
        <section class="products" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2em;padding:0 1em;">
    `;
    
    filtered.forEach(product => {
        html += `
            <article class="product" style="background:#fff;border-radius:12px;padding:1.5em;box-shadow:0 2px 4px rgba(0,0,0,0.08);display:flex;flex-direction:column;position:relative;">
                <a href="#readmore-${product.id}" class="product-img-link" style="display:block;margin-bottom:1em;">
                    <img src="${product.img}" alt="${product.name}" 
                         style="width:100%;height:200px;object-fit:cover;border-radius:8px;transition:transform 0.2s;"
                         onmouseover="this.style.transform='scale(1.03)'"
                         onmouseout="this.style.transform='scale(1)'">
                </a>
                <h2 style="font-size:1.2em;margin:0 0 0.5em;color:#222;">${product.name}</h2>
                <p style="color:#666;margin:0 0 0.5em;flex-grow:1;">${product.desc.slice(0, 80)}...</p>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1em;">
                    <span style="font-size:1.2em;color:#222;font-weight:bold;">₹${product.price}</span>
                    <button data-id="${product.id}" 
                            style="background:#222;color:#fff;padding:0.6em 1.2em;border:none;border-radius:6px;cursor:pointer;transition:background 0.2s;"
                            onmouseover="this.style.background='#444'"
                            onmouseout="this.style.background='#222'">
                        Add to Cart
                    </button>
                </div>
            </article>
        `;
    });
    
    html += `</section>`;
    document.getElementById('app-content').innerHTML = html;

    // Setup color filter
    document.getElementById('color-filter').value = selectedColor;
    document.getElementById('color-filter').onchange = function() {
        window.homeSelectedColor = this.value;
        renderHome();
    };

    setupCartButtons();
}

function renderReadMore(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return renderHome();
    
    document.getElementById('app-content').innerHTML = `
        <section class="pdp-container" style="max-width:1200px;margin:0 auto;padding:2em;">
            <div style="display:flex;flex-wrap:wrap;gap:2em;">
                <div style="flex:1;min-width:300px;">
                    <img src="${product.img}" alt="${product.name}" 
                         style="width:100%;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                </div>
                <div style="flex:1;min-width:300px;">
                    <h1 style="font-size:2em;margin:0 0 0.5em;color:#222;">${product.name}</h1>
                    <span class="badge" style="background:${product.color.toLowerCase()};color:#fff;padding:4px 12px;border-radius:4px;font-size:0.9em;">
                        ${product.color}
                    </span>
                    <p style="font-size:1.8em;color:#222;margin:1em 0;">₹${product.price}</p>
                    <p style="color:#666;line-height:1.6;margin:1em 0;">${product.desc}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}" 
                            style="background:#222;color:#fff;padding:1em 2em;border:none;border-radius:6px;cursor:pointer;font-size:1.1em;margin-top:1em;">
                        Add to Cart
                    </button>
                    <a href="#home" style="display:inline-block;margin-top:2em;color:#666;text-decoration:none;">
                        ← Back to Products
                    </a>
                </div>
            </div>
        </section>
    `;
    
    setupCartButtons();
    pushXdmToAlloy(XDM.pageView("Product Details", "Viewing product details", window.location.pathname));
    pushXdmToAlloy(XDM.productImpression(product));
}

function renderCart() {
    const cartItems = CartManager.get();
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    
    let html = `
        <section style="max-width:1200px;margin:0 auto;padding:2em;">
            <h1 style="font-size:2em;margin-bottom:1em;color:#222;">Shopping Cart</h1>
            ${cartItems.length === 0 ? `
                <div style="text-align:center;padding:2em;background:#fff;border-radius:12px;box-shadow:0 2px 4px rgba(0,0,0,0.08);">
                    <p style="color:#666;margin-bottom:1em;">Your cart is empty</p>
                    <a href="#home" style="color:#222;text-decoration:none;padding:0.5em 1em;border:2px solid #222;border-radius:4px;">
                        Continue Shopping
                    </a>
                </div>
            ` : `
                <div class="cart-items" style="background:#fff;border-radius:12px;box-shadow:0 2px 4px rgba(0,0,0,0.08);overflow:hidden;">
                    ${cartItems.map((item, idx) => `
                        <div class="cart-item" style="display:flex;align-items:center;padding:1em;border-bottom:1px solid #eee;">
                            <img src="${item.img}" alt="${item.name}" style="width:100px;height:100px;object-fit:cover;border-radius:8px;margin-right:1em;">
                            <div style="flex:1;">
                                <h3 style="margin:0 0 0.5em;color:#222;">${item.name}</h3>
                                <p style="color:#666;margin:0;">Color: ${item.color}</p>
                                <p style="color:#222;font-weight:bold;margin:0.5em 0;">₹${item.price}</p>
                            </div>
                            <button class="remove-btn" data-idx="${idx}"
                                    style="background:none;border:none;color:#ff4444;cursor:pointer;padding:0.5em;">
                                Remove
                            </button>
                        </div>
                    `).join('')}
                    <div style="padding:1em;background:#f8f9fa;display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-size:1.2em;color:#222;">Total: ₹${total.toFixed(2)}</span>
                        <button id="checkout-btn" 
                                style="background:#222;color:#fff;padding:0.8em 2em;border:none;border-radius:6px;cursor:pointer;">
                            Checkout
                        </button>
                    </div>
                </div>
            `}
        </section>
    `;
    
    document.getElementById('app-content').innerHTML = html;
    
    // Setup remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.onclick = function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            CartManager.remove(idx);
            cart = CartManager.get();
            renderCart();
            updateCartCount();
        };
    });

    pushXdmToAlloy(XDM.pageView("Cart", "View your cart items", window.location.pathname), ["cart"]);
    pushXdmToAlloy(XDM.cartView(cart), ["cart"]);
}

function renderContact() {
    document.getElementById('app-content').innerHTML = `
        <section style="max-width:800px;margin:0 auto;padding:2em;">
            <h1 style="font-size:2em;margin-bottom:1em;color:#222;">Contact Us</h1>
            <div style="background:#fff;padding:2em;border-radius:12px;box-shadow:0 2px 4px rgba(0,0,0,0.08);">
                <p style="color:#666;line-height:1.6;margin-bottom:1em;">
                    This is a demo e-commerce site for Adobe Experience Platform integration.
                </p>
                <p style="color:#666;line-height:1.6;margin-bottom:1em;">
                    <strong>Demo Login:</strong><br>
                    Email: test@test.com<br>
                    Password: test
                </p>
                <p style="color:#666;line-height:1.6;">
                    <strong>GitHub:</strong><br>
                    <a href="https://github.com/sankhadanga" target="_blank" 
                       style="color:#0366d6;text-decoration:none;">
                        github.com/sankhadanga
                    </a>
                </p>
            </div>
        </section>
    `;
    
    pushXdmToAlloy(XDM.pageView("Contact", "Contact and GitHub info", window.location.pathname));
}

// --- Router ---
function router() {
    cart = CartManager.get();
    user = UserManager.get();
    const hash = window.location.hash || '#home';
    if (hash.startsWith('#readmore-')) {
        const pid = hash.replace('#readmore-', '');
        renderReadMore(pid);
    } else {
        switch (hash) {
            case '#home': renderHome(); break;
            case '#cart': renderCart(); break;
            case '#contact': renderContact(); break;
            default: renderHome();
        }
    }
    updateNavUser();
    updateCartCount();
}

// --- UI Event Setup (unchanged, but call XDM on actions) ---
function setupCartButtons() {
    document.querySelectorAll('[data-id]').forEach(button => {
        button.onclick = function() {
            button.disabled = true;
            try {
                const id = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === id);
                if (product) {
                    CartManager.add(product);
                    cart = CartManager.get();
                    showProductAddedPopup(product.name);
                    pushXdmToAlloy(XDM.addToCart(product, cart));
                    updateCartCount();
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
            } finally {
                button.disabled = false;
            }
        };
    });
}

// --- Login Modal ---
function showLoginModal() {
    const existingModal = document.getElementById('login-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = "login-modal";
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background:#fff;padding:2em;border-radius:8px;min-width:300px;max-width:90vw;position:relative;">
            <h2 style="margin:0 0 1em;">Login</h2>
            <form id="email-login-form">
                <input type="email" id="login-email" placeholder="Email" required 
                       style="width:100%;padding:0.5em;margin-bottom:1em;border:1px solid #ddd;border-radius:4px;">
                <input type="password" id="login-pass" placeholder="Password" required 
                       style="width:100%;padding:0.5em;margin-bottom:1em;border:1px solid #ddd;border-radius:4px;">
                <button type="submit" 
                        style="width:100%;background:#222;color:#fff;padding:0.8em;border:none;border-radius:4px;cursor:pointer;">
                    Login
                </button>
            </form>
            <button id="close-login-modal" 
                    style="position:absolute;top:1em;right:1em;background:none;border:none;font-size:1.2em;cursor:pointer;">×</button>
            <div id="login-error" style="color:#ff4444;margin-top:1em;"></div>
            <div style="margin-top:1em;color:#666;">
                <strong>Demo Login:</strong><br>
                Email: test@test.com<br>
                Password: test
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Setup event handlers
    const form = document.getElementById('email-login-form');
    const closeBtn = document.getElementById('close-login-modal');

    // Close on background click
    modal.addEventListener('click', e => {
        if (e.target.id === 'login-modal') modal.remove();
    });

    // Close button handler
    closeBtn.addEventListener('click', () => modal.remove());

    // Form submission
    form.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        if (email === "test@test.com" && pass === "test") {
            const userObj = { email, provider: "demo" };
            UserManager.set(userObj);
            pushXdmToAlloy(XDM.login(email));
            modal.remove();
            updateNavUser();
            router();
        } else {
            const errorDiv = document.getElementById('login-error');
            errorDiv.textContent = "Invalid credentials. Try the demo credentials.";
            errorDiv.style.display = 'block';
        }
    });
}

// Update the nav user function to properly attach login/logout handlers
function updateNavUser() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    cart = CartManager.get();
    user = UserManager.get();

    nav.innerHTML = `
        <a href="#home" id="nav-home">Home</a>
        <a href="#cart" id="nav-cart">Cart <span id="cart-count">${cart.length}</span></a>
        <a href="#contact" id="nav-contact">Contact</a>
        ${user 
            ? `<span id="nav-user">👤 ${user.email}</span>
               <button id="logout-btn">Logout</button>`
            : `<button id="login-btn">Login</button>`
        }
    `;

    // Attach handlers after updating innerHTML
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            UserManager.clear();
            cart = [];
            CartManager.clear();
            pushXdmToAlloy(XDM.logout());
            router();
        });
    }
}

// --- SPA Initialization ---
window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', () => {
    router();
    updateCartCount();
});

function showProductAddedPopup(productName) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #222;
        color: #fff;
        padding: 1em 2em;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
    `;
    popup.textContent = `${productName} added to cart`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = CartManager.get().length;
    }
}