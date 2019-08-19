/****************************
 * SEARCH & PAGINATION
 ***************************/

/**
 * Add SearchBar to /Books Page
 */
const div = document.querySelector('div');
const p = document.createElement('p');
div.appendChild(p);
const searchBar = document.createElement('input');
div.lastChild.appendChild(searchBar);
searchBar.setAttribute("class", "search");
searchBar.setAttribute("placeholder", "Search by title, author, genre, or year...");


const table = document.querySelector('table');
const result = document.createElement('h3');
table.append(result);
const tableRows = document.querySelector('tbody').children;



/**
 * Pagination
 */
let numberOfPages = 0;

function showPage(list, page) {
  for (let i = 0; i < list.length; i++) {
    if (i >= (page * 10 - 10) && i <= (page * 10) - 1) {
      list[i].style.display = 'table-row';
    } else {
      list[i].style.display = "none";
    }
  }
}

// Shows the first 10 students when the page initially loads
showPage(tableRows, 1);

function appendPageLinks(list) {
  for (let i = 0; i <= list.length; i++){
    numberOfPages = i / 10;
  }
  numberOfPages = Math.ceil(numberOfPages);

  if (document.querySelector('.pagination')) {
    deletePag = document.querySelector('.pagination')
    deletePag.parentNode.removeChild(deletePag);
  }
  const body = document.querySelector('body');
  const paginationDiv = document.createElement('div');
  paginationDiv.className = "pagination";
  body.appendChild(paginationDiv);
  const ul = document.createElement('ul');
  paginationDiv.appendChild(ul);

  for (let i = 1; i <= numberOfPages; i++) {
    const li = document.createElement('li');
    ul.appendChild(li);
    const a = document.createElement('a');
    li.appendChild(a);
    a.textContent = i;
    a.addEventListener('click', (e) => {
      showPage(list, i);
      const allATags = document.querySelectorAll('a');
      for (let i = 0; i < allATags.length; i++) {
        allATags[i].classList.remove("active");
      }
      e.target.className = "active";
    });
  }
}

// Shows the initial page links when the page first loads
appendPageLinks(tableRows);


/*
 * Search Functionality
 */


function searchForMovies(list) {
  const moviesFound = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].children[0].textContent.toLowerCase().includes(searchBar.value.toLowerCase()) || list[i].children[1].textContent.toLowerCase().includes(searchBar.value.toLowerCase()) || list[i].children[2].textContent.toLowerCase().includes(searchBar.value.toLowerCase()) || list[i].children[3].textContent.toLowerCase().includes(searchBar.value.toLowerCase()) ) {
      moviesFound.push(list[i]);
      console.log(list[i]);
      list[i].style.display = 'table-row';
    } else {
      list[i].style.display = 'none';
    }
  }
  appendPageLinks(moviesFound);
  showPage(moviesFound, 1);
  if (moviesFound.length === 0 && searchBar.value.length > 0) {
    result.textContent = "No results found";
  } else {
    result.textContent = '';
  }
}

searchBar.addEventListener('keyup', () => {
  searchForMovies(tableRows);
});