//Pagination code adapted from https://www.geeksforgeeks.org/create-a-pagination-using-html-css-and-javascript/
const newsPerPage = 5; // Number of items to show per page 
const newsContainer = document.getElementById('news-container');
const newsPagination = document.getElementById('news-pagination');
const newsPrevButton = document.getElementById('news-prev');
const newsNextButton = document.getElementById('news-next');
const newsPageNumbers = document.getElementById('news-page-numbers');

const newsItems =
    Array.from(newsContainer.getElementsByClassName('news-item'));

// Calculate the total number of pages 
const newsTotalPages = Math.ceil(newsItems.length / newsPerPage);
let newsCurrentPage = 1;


// Create page links based on the total number of pages
const newsPageLinks = [];

for (let p = 0; p < newsTotalPages; p++){
    const pageLink = document.createElement("a");

    pageLink.setAttribute("href", "#");
    pageLink.setAttribute("class", "w3-button news-page-link");
    pageLink.setAttribute("news-page", (p+1).toString());

    const linkText = document.createTextNode((p+1).toString());

    pageLink.appendChild(linkText);

    newsPageLinks.push(pageLink);
}

// Insert the page links
const newsPaginationDivs = document.getElementsByClassName("news-pagination-links-placeholder");
Array.from(newsPaginationDivs).forEach((div) => {div.replaceWith(...newsPageLinks)
})

// Function to display cards for a specific page 
function displayNewsPage(page) {
    const startIndex = (page - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    newsItems.forEach((newsItem, index) => {
        if (index >= startIndex && index < endIndex) {
            //card.style.display = 'block';
            newsItem.className += " w3-show";
        } else {
            //card.style.display = 'none';
            newsItem.className = newsItem.className.replace(" w3-show", "");
        }
    });
}

// Function to update pagination buttons and page numbers 
function updateNewsPagination() {
    // newsPageNumbers.textContent =
    //     `Page ${newsCurrentPage} of ${newsTotalPages}`;

    newsPageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute('news-page'));
            
        if(page === newsCurrentPage) {
            link.className += " w3-theme-light";
        } else {
            link.className = link.className.replace(" w3-theme-light","");
        }
    });
}

function prevNewsPage() {
    if (newsCurrentPage > 1) {
        newsCurrentPage--;
        displayNewsPage(newsCurrentPage);
        updateNewsPagination();
    }
}

function nextNewsPage() {
    if (newsCurrentPage < newsTotalPages) {
        newsCurrentPage++;
        displayNewsPage(newsCurrentPage);
        updateNewsPagination();
    }
}

// Event listener for page number buttons 
newsPageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute('news-page'));
        if (page !== newsCurrentPage) {
            newsCurrentPage = page;
            displayNewsPage(newsCurrentPage);
            updateNewsPagination();
        }
    });
});

// Initial page load 
displayNewsPage(newsCurrentPage);
updateNewsPagination();
