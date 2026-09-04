//Pagination code adapted from https://www.geeksforgeeks.org/create-a-pagination-using-html-css-and-javascript/
const publicationsPerPage = 5; // Number of items to show per page 
const publicationsContainer = document.getElementById('publications-container');
const publicationsPagination = document.getElementById('publications-pagination');
const publicationsPrevButton = document.getElementById('publications-prev');
const publicationsNextButton = document.getElementById('publications-next');
const publicationsPageNumbers = document.getElementById('publications-page-numbers');

const publications =
    Array.from(publicationsContainer.getElementsByClassName('publication'));

// Calculate the total number of pages 
const publicationsTotalPages = Math.ceil(publications.length / publicationsPerPage);
let publicationsCurrentPage = 1;


// Create page links based on the total number of pages
const publicationsPageLinks = [];

for (let p = 0; p < publicationsTotalPages; p++){
    const pageLink = document.createElement("a");

    pageLink.setAttribute("href", "#");
    pageLink.setAttribute("class", "w3-button publications-page-link");
    pageLink.setAttribute("publications-page", (p+1).toString());

    const linkText = document.createTextNode((p+1).toString());

    pageLink.appendChild(linkText);

    publicationsPageLinks.push(pageLink);
}

// Insert the page links
const publicationsPaginationDivs = document.getElementsByClassName("publications-pagination-links-placeholder");
Array.from(publicationsPaginationDivs).forEach((div) => {div.replaceWith(...publicationsPageLinks)
})

// Function to display cards for a specific page 
function displayPublicationsPage(page) {
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
function updatePublicationsPagination() {
    // publicationsPageNumbers.textContent =
    //     `Page ${publicationsCurrentPage} of ${publicationsTotalPages}`;

    publicationsPageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute('publications-page'));
            
        if(page === publicationsCurrentPage) {
            link.className += " w3-theme-light";
        } else {
            link.className = link.className.replace(" w3-theme-light","");
        }
    });
}

function prevPublicationsPage() {
    if (publicationsCurrentPage > 1) {
        publicationsCurrentPage--;
        displayPublicationsPage(publicationsCurrentPage);
        updatePublicationsPagination();
    }
}

function nextPublicationsPage() {
    if (publicationsCurrentPage < publicationsTotalPages) {
        publicationsCurrentPage++;
        displayPublicationsPage(publicationsCurrentPage);
        updatePublicationsPagination();
    }
}

// Event listener for page number buttons 
publicationsPageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute('publications-page'));
        if (page !== publicationsCurrentPage) {
            publicationsCurrentPage = page;
            displayPublicationsPage(publicationsCurrentPage);
            updatePublicationsPagination();
        }
    });
});

// Initial page load 
displayPublicationsPage(publicationsCurrentPage);
updatePublicationsPagination();
