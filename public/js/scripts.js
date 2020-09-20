"use strict";
/****************************
 * SEARCH & PAGINATION
 ***************************/

/**
 * Global variables & added searchBar
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
    if (i >= (page * 15 - 15) && i <= (page * 15) - 1) {
      list[i].style.display = 'table-row';
    } else {
      list[i].style.display = "none";
    }
  }
}

// Shows the first 15 books
showPage(tableRows, 1);


/*
  1. Iterates through list to determine how many pages are needed.
  2. Checks and removes current pagination elements.
  3. Creates div and ul to append new page links.
  4. Creates an li and a tag for each page.
  5. Adds event listener for each page link.
  6. Removes 'active' class on previously clicked page link.
  7. Adds 'active' class to most recent page clicked.
*/
function appendPageLinks(list) {
  for (let i = 0; i <= list.length; i++){
    numberOfPages = i / 15;
  }
  numberOfPages = Math.ceil(numberOfPages);

  if (document.querySelector('.pagination')) {
    const deletePag = document.querySelector('.pagination')
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

// Shows the initial page links
appendPageLinks(tableRows);

/**
 * - Searches for books by title, author, genre, and year.
 * - Shows books matching input.
 * - Hides books that don't match.
 * - Displays 'no results found' if no books match.
 * @param {HTMLCollection} list table rows
 */
function searchForbooks(list) {
  const query = searchBar.value.toLowerCase();
  const booksFound = [];
  Array.from(list).forEach(tr => {
    if (Array.from(tr.children).some(data => data.textContent.toLowerCase().includes(query))) {
      booksFound.push(tr);
      tr.style.display = 'table-row';
    } else {
      tr.style.display = 'none';
    }
  })

  appendPageLinks(booksFound);
  showPage(booksFound, 1);

  if (booksFound.length === 0 && searchBar.value.length > 0) {
    result.textContent = "No results found";
  } else {
    result.textContent = '';
  }
}

searchBar.addEventListener('keyup', () => {
  searchForbooks(tableRows);
});
