// Function to clean old/corrupted data that causes NaN
function getSafeCart() {
    let raw = JSON.parse(localStorage.getItem('ecoCart')) || [];
    // Only keep items that actually have a valid price number
    return raw.filter(item => item.title && !isNaN(item.price));
}

let cart = getSafeCart();

function addToCart(event, title, price, img) {
    if (event) event.stopPropagation();

    // Convert "Rs.100" to number 100
    const numericPrice = typeof price === 'string' ? parseInt(price.replace('Rs.', '')) : price;

    const product = {
        title: title,
        price: numericPrice,
        image: img,
        id: Date.now() + Math.random()
    };

    cart.push(product);
    localStorage.setItem('ecoCart', JSON.stringify(cart));
    updateCartBadge();

    // Vibrant Toast/Alert
    const btn = event?.target;
    if (btn) {
        const originalText = btn.innerText;
        btn.innerText = "✓ Added!";
        btn.style.backgroundColor = "#acdf71";
        setTimeout(() => { btn.innerText = originalText; btn.style.backgroundColor = ""; }, 1500);
    }
}

function openModal(title, price, img, desc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalImg').src = img;
    document.getElementById('modalDesc').innerText = desc;

    const modalBtn = document.querySelector('.modal-cart-btn');
    modalBtn.onclick = (e) => addToCart(e, title, price, img);

    document.getElementById('productModal').style.display = "block";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = cart.length;
}

function filterProducts() {
    let input = document.getElementById('main-search').value.toLowerCase();
    let productItems = document.getElementsByClassName('product-item');
    for (let i = 0; i < productItems.length; i++) {
        let title = productItems[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        productItems[i].style.display = title.includes(input) ? "" : "none";
    }
}

window.onload = updateCartBadge;