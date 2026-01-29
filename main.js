/**
 * ==================================================================================
 * UNIVERSAL CART LOGIC
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
 * PRODUCT PAGE LOGIC
 * ==================================================================================
 */
function openModal(title, price, img, desc) {
    if (document.getElementById('productModal').style.display === "block") return; 
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
 * UNIVERSAL SEARCH LOGIC
 * ==================================================================================
 */
function filterProducts() {
    const searchInput = document.querySelector('.search-box').value.toLowerCase();
    if (searchInput.trim() === '') {
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
 * CONTACT PAGE LOGIC
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
    document.getElementById('contact-form').submit(); 
    return true;
}

/**
 * ==================================================================================
 * INDEX PAGE LOGIC
 * ==================================================================================
 */
function exploreProductsRedirect() {
    if (confirm("Do you want to explore our eco-friendly products?")) {
        window.location.href = "product.html";
    }
}

/**
 * ==================================================================================
 * ABOUT US PORTFOLIO LOGIC
 * ==================================================================================
 */

const teamPortfolioData = [
    {
        id: 0,
        name: "Biraj Shrestha",
        role: "Team Leader & Full Stack Developer",
        img: "Images/Biraj.jpg",
        description: "As the Team Leader, Biraj laid the foundation for the project by creating the initial wireframes for the website. He developed the Home page and the About Us page, and was responsible for compiling the final project documentation and report."
    },
    {
        id: 1,
        name: "Divyamani Khawas",
        role: "Lead Developer & UI/UX Designer",
        img: "Images/Divyamani Khawas.jpg",
        description: "Divyamani handled the core development and system integrity. He developed the Blog and Product pages, and completely redesigned the website to upgrade the UI. He was responsible for making the website fully functional, fixing bugs, and managing version control (Git mergers)."
    },
    {
        id: 2,
        name: "Sanam Kurumbang",
        role: "Research Page Designer",
        img: "Images/Sanam Limbu.jpg",
        description: "Sanam was responsible for the layout and presentation of the Research page, ensuring that the project's data and references were organized and displayed clearly."
    },
    {
        id: 3,
        name: "Mik Limbu",
        role: "Contact Page Designer",
        img: "Images/Mik.jpg",
        description: "Mik focused on user interaction by designing and implementing the Contact page, ensuring a smooth channel for user inquiries and feedback."
    }
];

function openPortfolio(cardElement) {
    const memberId = cardElement.getAttribute('data-member-id');
    const memberData = teamPortfolioData[memberId];

    if (!memberData) return;

    // Populate Modal Data
    document.getElementById('pf-modal-img').src = memberData.img;
    document.getElementById('pf-modal-name').innerText = memberData.name;
    document.getElementById('pf-modal-role').innerText = memberData.role;
    document.getElementById('pf-modal-desc').innerText = memberData.description;

    // Show Modal
    document.getElementById('portfolio-modal').style.display = "block";
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closePortfolio() {
    document.getElementById('portfolio-modal').style.display = "none";
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

/**
 * ==================================================================================
 * INITIALIZATION
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

    // Universal Click Listener to close modals when clicking outside
    window.onclick = function(event) {
        // Close Product Modal
        const productModal = document.getElementById('productModal');
        if (productModal && event.target == productModal) {
            closeModal();
        }
        // Close Portfolio Modal
        const portfolioModal = document.getElementById('portfolio-modal');
        if (portfolioModal && event.target == portfolioModal) {
            closePortfolio();
        }
    }
});