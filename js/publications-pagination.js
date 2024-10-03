//script.js adapted from https://www.geeksforgeeks.org/create-a-pagination-using-html-css-and-javascript/
const publicationsPerPage = 2; // Number of cards to show per page 
const dataContainer = document.getElementById('publications-container');
const pagination = document.getElementById('publications-pagination');
const prevButton = document.getElementById('publications-prev');
const nextButton = document.getElementById('publications-next');
const pageNumbers = document.getElementById('publications-page-numbers');
const pageLinks = document.querySelectorAll('.publications-page-link');

const publications =
    Array.from(dataContainer.getElementsByClassName('publication'));

// Calculate the total number of pages 
const totalPages = Math.ceil(publications.length / publicationsPerPage);
let currentPage = 1;


// Function to display cards for a specific page 
function displayPage(page) {
    const startIndex = (page - 1) * publicationsPerPage;
    const endIndex = startIndex + publicationsPerPage;
    publications.forEach((publication, index) => {
        if (index >= startIndex && index < endIndex) {
            //card.style.display = 'block';
            publication.className += " w3-show";
        } else {
            //card.style.display = 'none';
            publication.className = publication.className.replace(" w3-show", "");
        }
    });
}

// Function to update pagination buttons and page numbers 
function updatePagination() {

    console.log(currentPage)

    pageNumbers.textContent =
        `Page ${currentPage} of ${totalPages}`;

    if (currentPage === 1) {
        prevButton.className += " w3-disabled"
    }
    if (currentPage === totalPages) {
        nextButton.className += " w3-disabled"
    }

    if (currentPage > 1) {
        prevButton.className = prevButton.className.replace(" w3-disabled", "")
    }

    if (currentPage < totalPages) {
        nextButton.className = nextButton.className.replace(" w3-disabled", "")
    }

    pageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute('publications-page'));
        link.classList.toggle('active', page === currentPage);
    });
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePagination();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePagination();
    }
}

// Event listener for page number buttons 
pageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute('publications-page'));
        if (page !== currentPage) {
            currentPage = page;
            displayPage(currentPage);
            updatePagination();
        }
    });
});

// Initial page load 
displayPage(currentPage);
updatePagination();
