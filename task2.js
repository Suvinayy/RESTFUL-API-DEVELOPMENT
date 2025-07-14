// RESTful API for Library System using Express.js

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store
let books = [
  { id: 1, title: '1984', author: 'George Orwell', available: true },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', available: true },
];

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get a book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

// Create a new book
app.post('/api/books', (req, res) => {
  const { title, author, available } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    available: available ?? true
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book by ID
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  const { title, author, available } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (available !== undefined) book.available = available;

  res.json(book);
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');
  
  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

app.listen(PORT, () => {
  console.log(`Library API running at http://localhost:${PORT}`);
});
