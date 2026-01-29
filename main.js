/**
 * ==================================================================================
 *                                  UNIVERSAL CART LOGIC
 * ==================================================================================
 * This section handles all the functionality related to the shopping cart.
 * It's used across all pages to ensure the cart is always up-to-date.
 * ==================================================================================
 */
function getSafeCart() {
    let raw = JSON.parse(localStorage.getItem('ecoCart')) || [];
    return raw.filter(item => item.title && !isNaN(item.price));
}

function addToCart(event, title, price, img) {
    if (event) event.stopPropagation();
    const numericPrice = typeof price === 'string' ? parseInt(price.replace('Rs.', '')) : (typeof price === 'number' ? price : 0);
    const product = { title, price: numericPrice, image: img };
    let cart = getSafeCart();
    cart.push(product);
    localStorage.setItem('ecoCart', JSON.stringify(cart));
    updateCartBadge();

    const btn = event?.target;
    if (btn) {
        const originalText = btn.innerText;
        btn.innerText = "✓ Added!";
        btn.style.backgroundColor = "#acdf71";
        setTimeout(() => { btn.innerText = originalText; btn.style.backgroundColor = ""; }, 1500);
    }
}

function updateCartBadge() {
    const cart = getSafeCart();
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = cart.length;
}

/**
 * ==================================================================================
 *                                  PRODUCT PAGE LOGIC
 * ==================================================================================
 * This section handles the functionality for the product page, including the 
 * product modal that appears when you click on a product.
 * ==================================================================================
 */
function openModal(title, price, img, desc) {
    if (document.getElementById('productModal').style.display === "block") return; // Prevent multiple openings
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalImg').src = img;
    document.getElementById('modalDesc').innerText = desc;
    document.querySelector('.modal-cart-btn').onclick = (e) => addToCart(e, title, price, img);
    document.getElementById('productModal').style.display = "block";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

/**
 * ==================================================================================
 *                                  UNIVERSAL SEARCH LOGIC
 * ==================================================================================
 * This section handles the search functionality for the entire site. It allows
 * you to search from any page and see the results on the product page.
 * ==================================================================================
 */
function filterProducts() {
    const searchInput = document.querySelector('.search-box').value.toLowerCase();
    if (searchInput.trim() === '') { // Prevent empty search
        alert('Please enter a search term.');
        return;
    }
    if (window.location.pathname.includes('product.html')) {
        const productItems = document.getElementsByClassName('product-item');
        for (let i = 0; i < productItems.length; i++) {
            const title = productItems[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
            productItems[i].style.display = title.includes(searchInput) ? "" : "none";
        }
    } else {
        localStorage.setItem('searchQuery', searchInput);
        window.location.href = 'product.html';
    }
}

/**
 * ==================================================================================
 *                                  CONTACT PAGE LOGIC
 * ==================================================================================
 * This section handles the form validation for the contact page.
 * ==================================================================================
 */
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return false;
    }
    alert("Form submitted successfully!");
    document.getElementById('contact-form').submit(); // Ensure form is submitted
    return true;
}

/**
 * ==================================================================================
 *                                  INDEX PAGE LOGIC
 * ==================================================================================
 * This section handles the functionality for the index page, specifically the
 * 'Explore Products' button.
 * ==================================================================================
 */
function exploreProductsRedirect() {
    if (confirm("Do you want to explore our eco-friendly products?")) {
        window.location.href = "product.html";
    }
}

/**
 * ==================================================================================
 *                                  INITIALIZATION
 * ==================================================================================
 * This section runs when the page is first loaded. It updates the cart badge
 * and applies any pending search queries.
 * ==================================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    // Apply search query if it exists
    const searchQuery = localStorage.getItem('searchQuery');
    if (searchQuery && window.location.pathname.includes('product.html')) {
        document.querySelector('.search-box').value = searchQuery;
        filterProducts();
        localStorage.removeItem('searchQuery');
    }
    // Add event listener for search input
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    }
});
