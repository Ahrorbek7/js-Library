/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

const newBookModal = document.querySelector('.new-book-modal')
const newBookForm = document.querySelector('.new-book-form')
const submitFormButton = document.querySelector('#new-book-form-submit')
const closeModalButton = document.querySelector('#new-book-close-modal')
const openModalButton = document.querySelector('.add-book-button')
const noBooksTag = document.querySelector('.empty-library')
const bookGrid = document.querySelector('.book-grid')
const demoBooksButton = document.querySelector('.add-demo-books')
const themeToggleSlider = document.querySelector('.slider')
const themeToggleCheckbox = document.querySelector('.switch input')

let library = []

class Book {
  constructor (title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }
}
const getNewBookInfoFromModal = () => {
  const formData = new FormData(newBookForm)
  const dataList = {}
  for (const [key, value] of formData) {
    dataList[key] = value
  }
  return dataList
}

const addBookToLibrary = (title, author, pages, isRead) => {
  const newBook = new Book(title, author, pages, isRead)
  library = [...library, newBook]
  window.localStorage.setItem('library', JSON.stringify(library))
  console.log(library)
}

const toggleBookReadStatus = () => {
  const toggleButtons = document.querySelectorAll(
    '.book-card > div:last-child > input'
  )

  for (let i = 0; i < library.length; i++) {
    const button = toggleButtons[i]
    button.addEventListener('click', () => {
      if (button.checked) library[i].isRead = 'yes'
      else library[i].isRead = 'no'
    })
  }
}

const deleteBook = () => {
  const deleteButtons = document.querySelectorAll('.book-card > span')
  for (let i = 0; i < library.length; i++) {
    const button = deleteButtons[i]
    button.addEventListener('click', () => {
      library.splice(i, 1)
      window.localStorage.setItem('library', JSON.stringify(library))
      displayBooks()
    })
  }
}

const toggleEmptyLibraryMessage = () => {
  const bookCardElements = document.getElementsByClassName('book-card')
  if (bookCardElements.length > 0) noBooksTag.classList.add('hidden')
  else noBooksTag.classList.remove('hidden')
}

const removeAllBooks = () => {
  while (bookGrid.firstChild) bookGrid.removeChild(bookGrid.lastChild)
}

const displayBooks = () => {
  removeAllBooks()
  for (let i = 0; i < library.length; i++) {
    const book = library[i]

    // Card Making
    const bookCardContainer = document.createElement('div')
    const titleTag = document.createElement('p')
    const authorTag = document.createElement('p')
    const pagesTag = document.createElement('p')
    const isReadLabel = document.createElement('label')
    const isReadCheckbox = document.createElement('input')
    const deleteButton = document.createElement('span')
    const readStatusDiv = document.createElement('div')
    const checkmarkDiv = document.createElement('div')
    const titleAuthorDiv = document.createElement('div')

    titleAuthorDiv.classList.add('book-card-title-author')
    readStatusDiv.classList.add('book-card-read-container')
    checkmarkDiv.classList.add('book-card-read-checkbox')
    titleTag.classList.add('book-card-title')
    authorTag.classList.add('book-card-author')
    pagesTag.classList.add('book-card-pages')
    isReadLabel.classList.add('book-card-status')
    deleteButton.classList.add('book-card-delete')
    deleteButton.classList.add('material-symbols-rounded')
    isReadCheckbox.classList.add('book-is-read-checkbox')
    bookCardContainer.classList.add('book-card')

    deleteButton.textContent = 'delete'
    isReadLabel.textContent = 'Read'
    titleTag.textContent = book.title
    authorTag.textContent = `by ${book.author}`
    pagesTag.textContent = `${parseInt(book.pages)} pages`

    readStatusDiv.append(isReadCheckbox, isReadLabel, checkmarkDiv)
    titleAuthorDiv.append(titleTag, authorTag)

    titleTag.setAttribute('title', book.title)
    authorTag.setAttribute('title', book.author)
    isReadLabel.setAttribute('for', `book-is-read-checkbox-${i}`)
    isReadLabel.setAttribute('name', 'is_book_read')

    isReadCheckbox.type = 'checkbox'
    isReadCheckbox.id = `book-is-read-checkbox-${i}`

    if (book.isRead === 'yes') isReadCheckbox.checked = true

    bookCardContainer.append(
      deleteButton,
      titleAuthorDiv,
      pagesTag,
      readStatusDiv
    )

    bookGrid.append(bookCardContainer)
  }
  deleteBook()
  toggleBookReadStatus()
  toggleEmptyLibraryMessage()
}

const toggleModal = () => {
  newBookForm.reset()
  newBookModal.classList.toggle('show-modal')
}

const addBookToGrid = () => {
  const newBookInfo = getNewBookInfoFromModal()
  addBookToLibrary(
    newBookInfo.book_title,
    newBookInfo.book_author,
    newBookInfo.book_pages,
    newBookInfo.is_book_read
  )
  toggleModal()
  displayBooks()
}

const addDemoBooksToLibrary = () => {
  addBookToLibrary('The Shining', 'Stephen King', 497, 'yes')
  addBookToLibrary('Meditations', 'Marcus Aurelius', 254, 'no')
  addBookToLibrary(
    'Utkan Kunlar',
    'Abdulla Kadiriy',
    241,
    'yes'
  )
  addBookToLibrary('Shoe Dog', 'Phil Knight', 400, 'yes')
}

demoBooksButton.addEventListener('click', () => {
  addDemoBooksToLibrary()
  displayBooks()
})

openModalButton.addEventListener('click', () => toggleModal())
closeModalButton.addEventListener('click', () => toggleModal())

window.addEventListener('click', (e) => {
  if (e.target === newBookModal) toggleModal()
})
