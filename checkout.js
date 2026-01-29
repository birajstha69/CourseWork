window.onload = () => {
    const cart = JSON.parse(localStorage.getItem('ecoCart')) || [];
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');
    let total = 0;

    if (cart.length === 0) {
        summaryItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        total += item.price;
        summaryItems.innerHTML += `
            <div class="cart-item" style="padding: 10px 0; justify-content: space-between;">
                <p>${item.title}</p>
                <p class="price">Rs.${item.price}</p>
            </div>`;
    });

    summaryTotal.innerText = "Rs." + total;

    const shippingForm = document.getElementById('shipping-form');
    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your order has been confirmed! Thank you for shopping with EcoMart.');
        localStorage.removeItem('ecoCart');
        window.location.href = 'index.html';
    });
};
