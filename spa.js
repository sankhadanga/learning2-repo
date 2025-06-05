// --- Optimized Adobe Data Layer for santos e-comm SPA with AEP XDM and Target Integration ---

// 1. Initialize Adobe Data Layer
window.adobeDataLayer = window.adobeDataLayer || [];

// --- Utility ---
const generateId = (prefix = "cmp") => prefix + "-" + Math.random().toString(36).slice(2, 10);
const nowIso = () => new Date().toISOString();

// --- Product Data (static demo) ---
const products = [ /* ...same as yours... */ ];

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
    // ...same as before...
    // After rendering, send XDM pageView
    pushXdmToAlloy(XDM.pageView("Home", "Welcome to santos e-comm", window.location.pathname), ["home"]);
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