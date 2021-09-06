function book() {
    this.title = null,
    this.author = null,
    this.pages = null,
    this.readStatus = null
};

book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}.`
}

let myLibrary = [];

const theHobbit = Object.create(book.prototype);
theHobbit.title = 'The Hobbit';
theHobbit.author = 'J.R.R. Tolkien'; 
theHobbit.pages = 295;
theHobbit.readStatus = 'already read';
myLibrary.push(theHobbit);

const theHobbit2 = Object.create(book.prototype);
theHobbit2.title = 'The Hobbit2';
theHobbit2.author = 'J.R.R. Tolkien2';
theHobbit2.pages = 2952;
theHobbit2.readStatus = 'not read yet';
myLibrary.push(theHobbit2);

const bookList = document.getElementById('books');

const buttonAddNewBook = document.querySelector('button');
buttonAddNewBook.addEventListener('click', e => {
    document.getElementById('overlay').style.display = 'inline-block';
});

const buttonCancel = document.getElementById('cancel');
buttonCancel.addEventListener('click', e => {
    document.getElementById('overlay').style.display = 'none';
});

const buttonSubmit = document.getElementById('submit');                          
buttonSubmit.addEventListener('click', e => {
    const newBook = Object.create(book.prototype);
    newBook.title = document.getElementById('book-title').value;
    newBook.author = document.getElementById('book-author').value;
    newBook.pages = document.getElementById('book-pages').value;
    newBook.readStatus = document.querySelector('input[name="book-status-choice"]:checked').value;
    myLibrary.push(newBook);
    document.getElementById('overlay').style.display = 'none';
    libraryUpdate();
    e.preventDefault();    
}); 


function libraryUpdate() {
    bookList.textContent = '';
    myLibrary.forEach(book => {
        const bookName = document.createElement('div');
        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = 'Remove from Library';
        buttonRemove.classList.add('button-remove');
        bookName.classList.add('book-name');
        const bookInfo = document.createElement('p');
        bookName.textContent = book.title;
        bookName.setAttribute('data-title', `${myLibrary.indexOf(book)}`);
        bookInfo.textContent = book.info();
        bookInfo.classList.add('book-info');
        const buttonStatus = document.createElement('button');
        buttonStatus.textContent = 'Change read status';
        buttonStatus.classList.add('button-status');
        bookList.appendChild(bookName);
        bookName.appendChild(bookInfo);
        bookName.appendChild(buttonRemove);
        bookName.appendChild(buttonStatus);
    });
    const buttonsRemove = document.querySelectorAll('.button-remove');
buttonsRemove.forEach(e => {
    e.addEventListener('click', e=> {
        myLibrary.splice(e.target.parentElement.getAttribute('data-title'), 1);
        libraryUpdate();
    });
});
const buttonsChangeStatus = document.querySelectorAll('.button-status');
buttonsChangeStatus.forEach(e => {
    e.addEventListener('click', e => {
        if(myLibrary[e.target.parentElement.getAttribute('data-title')].readStatus === 'not read yet') {
            myLibrary[e.target.parentElement.getAttribute('data-title')].readStatus = 'already read';
        } else {
            myLibrary[e.target.parentElement.getAttribute('data-title')].readStatus = 'not read yet';
        }
        libraryUpdate();
    });
});
}

libraryUpdate();




