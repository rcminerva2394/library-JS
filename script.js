const addBookContainer = document.querySelector('.add-book-container');
const closeFormBtn = document.querySelector('.btn-close-modal');
const btnAddBook = document.querySelector('.btn.btn-add-book');
const modalBackdrop = document.querySelector('.modal-backdrop');
const booksContainer = document.querySelector('.books-items');
const addBookForm = document.querySelector('.add-book-form');
const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const haveRead = document.querySelector('#book-status');
const numBooks = document.querySelector('.num.total-books');
const numUnread = document.querySelector('.num.unread-books');
const numRead = document.querySelector('.num.read-books');
const numDeleted = document.querySelector('.num.deleted-books');

const myLibrary = [];
let deleted = 0;

/** ************ DOM HELPER FUNCTION ************ */
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

/** ***** DISPLAY BOOKS ************ */
const displayBooks = () => {
  booksContainer.innerHTML = '';
  let unReadBooks = 0;
  let readBooks = 0;
  myLibrary.forEach((book, i) => {
    if (book.haveRead === false) {
      unReadBooks += 1;
    } else if (book.haveRead === true) {
      readBooks += 1;
    }

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
        domElementFactory('span', {}, ' Read')
      ),
      domElementFactory('button', { class: 'btn btn-del' }, 'del')
    );

    booksContainer.append(bookItem);
  });

  numBooks.textContent = myLibrary.length;
  numUnread.textContent = unReadBooks;
  numRead.textContent = readBooks;
};

displayBooks();

/** ************ OOP PART ************ */
// Function constructor
const Book = function (
  bookTitle = '',
  bookAuthor = '',
  bookPages = 0,
  bookHaveRead = false
) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = bookPages;
  this.haveRead = bookHaveRead;
};

Book.prototype.hasRead = function () {
  this.haveRead = !this.haveRead;
  return this;
};

/** * GETTING THE INPUT VALUES ** */
const getFormInput = () =>
  new Book(title.value, author.value, pages.value, haveRead.checked);

/** ADD BOOK FORM SUBMISSION * */
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBook = getFormInput();
  myLibrary.push(newBook);
  booksContainer.innerHTML = '';
  displayBooks();
  title.value = '';
  author.value = '';
  pages.value = '';
  haveRead.checked = false;
  closeModal();
});

/** *  Event delegation for (status, delete) ** */
booksContainer.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    myLibrary[parseInt(e.target.id, 10)].hasRead();
    displayBooks();
  } else if (e.target.classList.contains('btn-del')) {
    myLibrary.splice(parseInt(e.target.id, 10), 1);
    deleted += 1;
    numDeleted.textContent = deleted;
    displayBooks();
  }
});
