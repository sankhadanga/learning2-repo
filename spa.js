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
    get: () => user,
    set: obj => { user = obj; SafeStorage.set('santos_user', obj); },
    clear: () => { user = null; SafeStorage.remove('santos_user'); }
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
                priceTotal: cartState.reduce((sum, p) => sum + Number(p.price), 0)
            }
        },
        productListItems: [{
            SKU: product.id,
            name: product.name,
            priceTotal: product.price,
            color: product.color,
            quantity: 1
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

// --- Data Layer and Alloy Integration ---
function pushXdmToAlloy(xdmObj, decisionScopes) {
    if (window.alloy) {
        window.alloy("sendEvent", {
            xdm: xdmObj,
            decisionScopes: decisionScopes || [],
            renderDecisions: !!decisionScopes?.length
        });
    }
    // Always push to adobeDataLayer for analytics as well
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
            <article class="product" style="background:#fff;border-radius:12px;padding:1.5em;box-shadow:0 2px 4px rgba(0,0,0,0.08);display:flex;flex-direction:column;">
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
                <span class="badge" style="position:absolute;top:1em;right:1em;background:${product.color.toLowerCase()};color:#fff;padding:4px 12px;border-radius:4px;font-size:0.8em;">
                    ${product.color}
                </span>
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
    document.getElementById('app-content').innerHTML = `...`;
    setupCartButtons();
    // Push XDM product impression and pageView
    pushXdmToAlloy(XDM.pageView("Product Details", "Viewing product details", window.location.pathname), ["product-details"]);
    pushXdmToAlloy(XDM.productImpression(product), ["product-details"]);
}

function renderCart() {
    // ...same as before...
    // After rendering, send XDM cartView
    pushXdmToAlloy(XDM.pageView("Cart", "View your cart items", window.location.pathname), ["cart"]);
    pushXdmToAlloy(XDM.cartView(cart), ["cart"]);
}

function renderContact() {
    // ...same as before...
    pushXdmToAlloy(XDM.pageView("Contact", "Contact and GitHub info", window.location.pathname), ["contact"]);
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
    document.querySelectorAll('.product button[data-id], .add-to-cart-btn').forEach(button => {
        button.onclick = () => {
            button.disabled = true;
            const id = +button.getAttribute('data-id');
            const product = products.find(p => p.id === id);
            if (product) {
                CartManager.add(product);
                showProductAddedPopup(product.name);
                pushXdmToAlloy(XDM.addToCart(product, CartManager.get()), ["cart"]);
                updateCartCount();
            }
            button.disabled = false;
        };
    });
}

// --- Login Modal ---
function showLoginModal() {
    // ...same as before...
    document.getElementById('email-login-form').onsubmit = e => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        if (email === "test@test.com" && pass === "test") {
            UserManager.set({ email, provider: "demo" });
            pushXdmToAlloy(XDM.login(email));
            modal.remove();
            router();
        } else {
            document.getElementById('login-error').textContent = "Invalid credentials. Try the demo credentials.";
        }
    };
}

// --- Logout (in updateNavUser) ---
function updateNavUser() {
    // ...same as before...
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        UserManager.clear();
        CartManager.clear();
        pushXdmToAlloy(XDM.logout());
        router();
    });
}

// --- SPA Initialization ---
window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', () => {
    router();
    updateCartCount();
});