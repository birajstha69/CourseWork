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