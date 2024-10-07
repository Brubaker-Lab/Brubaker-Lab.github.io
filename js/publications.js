//Pagination code adapted from https://www.geeksforgeeks.org/create-a-pagination-using-html-css-and-javascript/
const publicationsPerPage = 5; // Number of items to show per page 
const dataContainer = document.getElementById('publications-container');
const pagination = document.getElementById('publications-pagination');
const prevButton = document.getElementById('publications-prev');
const nextButton = document.getElementById('publications-next');
const pageNumbers = document.getElementById('publications-page-numbers');

const publications =
    Array.from(dataContainer.getElementsByClassName('publication'));

// Calculate the total number of pages 
const totalPages = Math.ceil(publications.length / publicationsPerPage);
let currentPage = 1;


// Create page links based on the total number of pages
const pageLinks = [];

for (let p = 0; p < totalPages; p++){
    const pageLink = document.createElement("a");

    pageLink.setAttribute("href", "#");
    pageLink.setAttribute("class", "w3-button publications-page-link");
    pageLink.setAttribute("publications-page", (p+1).toString());

    const linkText = document.createTextNode((p+1).toString());

    pageLink.appendChild(linkText);

    pageLinks.push(pageLink);
}

// Insert the page links
const paginationDivs = document.getElementsByClassName("pagination-links-placeholder");
Array.from(paginationDivs).forEach((div) => {div.replaceWith(...pageLinks)
})

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
    // pageNumbers.textContent =
    //     `Page ${currentPage} of ${totalPages}`;

    pageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute('publications-page'));
            
        if(page === currentPage) {
            link.className += " w3-theme-light";
        } else {
            link.className = link.className.replace(" w3-theme-light","");
        }
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
