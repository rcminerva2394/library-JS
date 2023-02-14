const addBookContainer = document.querySelector('.add-book-container');
const closeFormBtn = document.querySelector('.btn-close-modal');
const btnAddBook = document.querySelector('.btn.btn-add-book');
const modalBackdrop = document.querySelector('.modal-backdrop');
// Input values when adding a book
const addBookInputEls = document.querySelector('.add-book-inputs');
const bookStatus = document.querySelector('#book-status');
let titleEl = '';
let authorEl = '';
let pagesEl = '';
let haveReadEl = false;

/** ************ OOP PART ************ */
const myLibrary = [];

const Book = function (title = '', author = '', pages = 0, haveRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
};

Book.prototype.hasRead = function () {
  this.read = !this.read;
  return this;
};

const harryPotter = new Book('The Sorceror Stone', 'J.K Rowling', 1050, true);
console.log(harryPotter);
console.log(harryPotter.hasRead());
console.log(harryPotter.hasRead());

// Function that will add the book instance to the myLibrary
const addBookToLibrary = function () {
  myLibrary.push(harryPotter);
};

console.log(addBookToLibrary());
console.log(myLibrary);
console.log(myLibrary[0].title);

/** ************ END OF OOP PART ************ */

// To show add book form modal
const showModal = function () {
  addBookContainer.classList.remove('hidden');
};

const closeModal = function () {
  addBookContainer.classList.add('hidden');
};

btnAddBook.addEventListener('click', showModal);
closeFormBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// The input modal form values (applying event delegation)
addBookInputEls.addEventListener('keyup', (e) => {
  if (e.target.id === 'book-title') {
    titleEl = e.target.value;
  } else if (e.target.id === 'book-author') {
    authorEl = e.target.value;
  } else if (e.target.id === 'book-pages') {
    pagesEl = e.target.value;
  }
});

// Book Status
bookStatus.addEventListener('change', function () {
  console.log(this.checked);
  if (this.checked) {
    haveReadEl = true;
  } else {
    haveReadEl = false;
  }
});
