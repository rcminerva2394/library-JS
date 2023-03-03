const addBookContainer = document.querySelector('.add-book-container');
const closeFormBtn = document.querySelector('.btn-close-modal');
const btnAddBook = document.querySelector('.btn.btn-add-book');
const modalBackdrop = document.querySelector('.modal-backdrop');
const booksContainer = document.querySelector('.books-items');
const addBookForm = document.querySelector('.add-book-form');
const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const date = document.querySelector('#book-date');
const pages = document.querySelector('#book-pages');
const duration = document.querySelector('#book-duration');
const haveFinished = document.querySelector('#book-status');
const bookType = document.querySelector('#book-type');
const numBooks = document.querySelector('.num.total-books');
const numUnread = document.querySelector('.num.unread-books');
const numRead = document.querySelector('.num.read-books');
const numDeleted = document.querySelector('.num.deleted-books');

let deleted = 0;

/** OOP DOM ELEMENT HELPER */
const DOMFactoryEl = function (type) {
  this.domElement = document.createElement(type);
  this.children = [];
};

DOMFactoryEl.prototype.setAttributes = function (attributes) {
  Object.keys(attributes).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(attributes, key)) {
      this.domElement.setAttribute(key, attributes[key]);
    }
  });
};

DOMFactoryEl.prototype.setText = function (text) {
  this.domElement.textContent = text;
};

DOMFactoryEl.prototype.appendTo = function (parentEl) {
  parentEl.append(this.domElement);
  this.children.forEach((child) => child.appendTo(this.domElement));
};

DOMFactoryEl.prototype.addChildren = function (...children) {
  children.forEach((child) => this.children.push(child));
};

/** ************ OOP BOOK AND LIBRARY ************ */
// Function constructor
const Book = function (
  bookTitle = '',
  bookAuthor = '',
  bookDate = '',
  bookStatus = false
) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.date = bookDate;
  this.haveFinished = bookStatus;
};

Book.prototype.hasRead = function () {
  this.haveFinished = !this.haveFinished;
};

const AudioBook = function (
  bookTitle,
  bookAuthor,
  bookDate,
  bookStatus,
  bookDuration
) {
  Book.call(this, bookTitle, bookAuthor, bookDate, bookStatus, duration);
  this.duration = bookDuration;
};

AudioBook.prototype = Object.create(Book.prototype); // Object create to inherit the methods of the Book in the prototype

AudioBook.prototype.listen = function () {
  console.log('This is an audio book');
};

// SAMPLE
const HarryPot = new AudioBook(
  'Harry Ngongo',
  'JK Rowling',
  2005,
  false,
  '1 hour'
);
console.log(HarryPot);

const PrintedBook = function (
  bookTitle,
  bookAuthor,
  bookDate,
  bookStatus,
  bookPages
) {
  Book.call(this, bookTitle, bookAuthor, bookDate, bookStatus, bookPages);
  this.pages = pages;
};

PrintedBook.prototype.read = function () {
  console.log('This is a printed book!');
};

PrintedBook.prototype = Object.create(Book.prototype);

// SAMPLE BOOK
const realBook = new PrintedBook('RC Life', 'RC Minerva', 2099, false, 98755);
console.log(realBook);

const Ebook = function (bookTitle, bookAuthor, bookDate, bookStatus, format) {
  Book.call(this, bookTitle, bookAuthor, bookDate, bookStatus);
  this.format = format;
};

Ebook.prototype.readOnline = function () {
  console.log('This is an ebook!');
};

// SAMPLE EBOOK
const ebook = new Ebook('RC Life', 'RC Minerva', 2099, false, 'EPUB');
console.log(ebook);

const Library = function () {
  this.books = [];
};

Library.prototype.addBook = function (newbook) {
  this.books.push(newbook);
};

Library.prototype.removeBook = function (index) {
  this.books.splice(index, 1);
};

const myLibrary = new Library();

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
  myLibrary.books.forEach((book) => {
    if (book.haveRead === false) {
      unReadBooks += 1;
    } else if (book.haveRead === true) {
      readBooks += 1;
    }
    const bookItem = new DOMFactoryEl('div');
    bookItem.setAttributes({ class: 'book-item grid' });
    const bookTitle = new DOMFactoryEl('span');
    bookTitle.setText(book.title);
    const bookAuthor = new DOMFactoryEl('span');
    bookAuthor.setText(book.author);
    const bookDate = new DOMFactoryEl('span');
    bookDate.setText(book.date);
    const bookPages = new DOMFactoryEl('span');
    bookPages.setText(book.pages);
    const checkbox = new DOMFactoryEl('div');
    const inputCheck = new DOMFactoryEl('input');
    inputCheck.setAttributes({
      type: 'checkbox',
      id: book.title,
      ...(book.haveRead && { checked: true }),
    });
    const statusText = new DOMFactoryEl('span');
    statusText.setText('Read');
    checkbox.addChildren(inputCheck, statusText);
    const btnDelEl = new DOMFactoryEl('button');
    btnDelEl.setAttributes({ class: 'btn btn-del' });
    btnDelEl.setText('del');
    bookItem.addChildren(
      bookTitle,
      bookAuthor,
      bookDate,
      bookPages,
      checkbox,
      btnDelEl
    );
    bookItem.appendTo(booksContainer);
  });

  numBooks.textContent = myLibrary.books.length;
  numUnread.textContent = unReadBooks;
  numRead.textContent = readBooks;
};

displayBooks();

/** * GETTING THE INPUT VALUES ** */
const getFormInput = () =>
  new Book(
    title.value,
    author.value,
    date.value,
    pages.value,
    haveRead.checked
  );

/** ADD BOOK FORM SUBMISSION * */
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBook = getFormInput();
  myLibrary.addBook(newBook);
  booksContainer.innerHTML = '';
  displayBooks();
  title.value = '';
  author.value = '';
  pages.value = '';
  date.value = '';
  haveRead.checked = false;
  closeModal();
});

/** * STATUS, DELETE USING EVENT DELEGATION ** */
booksContainer.addEventListener('click', (e) => {
  const index = myLibrary.books.findIndex((el) => el.title === e.target.id);
  if (e.target.type === 'checkbox') {
    myLibrary.books[index].hasRead();
    displayBooks();
  } else if (e.target.classList.contains('btn-del')) {
    myLibrary.removeBook(index);
    deleted += 1;
    numDeleted.textContent = deleted;
    displayBooks();
  }
});
