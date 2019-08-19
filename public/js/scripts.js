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

/*
 * Search Functionality
 */
const table = document.querySelector('table');
const result = document.createElement('h3');
table.append(result);
const tableRows = document.querySelector('tbody').children;

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
  // appendPageLinks(moviesFound);
  // showPage(moviesFound, 1);
  if (moviesFound.length === 0 && searchBar.value.length > 0) {
    result.textContent = "No results found";
  } else {
    result.textContent = '';
  }
}

searchBar.addEventListener('keyup', () => {
  searchForMovies(tableRows);
});