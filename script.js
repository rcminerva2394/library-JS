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
