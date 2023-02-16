const addBookContainer = document.querySelector('.add-book-container');
const closeFormBtn = document.querySelector('.btn-close-modal');
const btnAddBook = document.querySelector('.btn.btn-add-book');
const modalBackdrop = document.querySelector('.modal-backdrop');
const booksContainer = document.querySelector('.books-items');
// Input values when adding a book
const addBookInputEls = document.querySelector('.add-book-inputs');
const bookStatus = document.querySelector('#book-status');
let titleEl = '';
let authorEl = '';
let pagesEl = '';
let haveReadEl = false;

// UTILITY DOM HELPER FUNCTION
const domElementFactory = (type, attributes, ...children) => {
  // type
  const domElement = document.createElement(type);
  // for attributes
  Object.keys(attributes).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(attributes, key)) {
      domElement.setAttribute(key, attributes[key]);
    }
  });

  // for children
  children.forEach((child) => {
    domElement.append(child);
  });

  return domElement;
};

/** ************ ADD BOOK MODAL ************ */
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

/** ************ OOP PART ************ */
const myLibrary = [];

const Book = function (title = '', author = '', pages = 0, haveRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
};

Book.prototype.hasRead = function () {
  this.haveRead = !this.haveRead;
  return this;
};

const harryPotter = new Book('The Sorceror Stone', 'J.K Rowling', 1050, true);
console.log(harryPotter);
console.log(harryPotter.hasRead());
console.log(harryPotter.hasRead());
console.log(harryPotter.hasRead());

// Function that will add the book instance to the myLibrary
const addBookToLibrary = function () {
  myLibrary.push(harryPotter);
};

console.log(addBookToLibrary());
console.log(myLibrary);
console.log(myLibrary[0].title);

const displayBooks = () => {
  myLibrary.forEach((book, i) => {
    const bookItem = domElementFactory(
      'div',
      { class: 'book-item grid' },
      domElementFactory('span', {}, book.title),
      domElementFactory('span', {}, book.author),
      domElementFactory('span', {}, book.pages),
      domElementFactory(
        'div',
        {},
        domElementFactory('input', {
          type: 'checkbox',
          id: i,
          ...(book.haveRead && { checked: true }),
        }),
        domElementFactory(
          'span',
          { class: 'hasRead' },
          `${book.haveRead ? 'Read' : 'Unread'}`
        )
      ),
      domElementFactory(
        'div',
        {},
        domElementFactory('button', { class: 'btn btn-del' }, 'del'),
        domElementFactory('button', { class: 'btn btn-edit' }, 'edit')
      )
    );

    booksContainer.append(bookItem);
  });
};

displayBooks();

/* 1) Work on adding the book from the input form to the myLibrary, call displayBooks
2) Then, add event listeners for edit and delete, when edit, pop the modal form with previous input, and when submitted
edit the whole my library and call display again
3) Also, add event listener on the input form, that is been checkede and unchecked
*/
