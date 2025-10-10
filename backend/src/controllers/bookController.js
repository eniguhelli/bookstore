const Book = require('../models/Book');

// GET all books (with optional filters: category, search, pagination)
exports.getBooks = async (req, res) => {
  const { category, q, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (q) filter.title = { $regex: q, $options: 'i' };

  const books = await Book.find(filter)
    .populate('category')
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(books);
};

// GET single book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Invalid book ID' });
  }
};

// CREATE book (Admin)
exports.createBook = async (req, res) => {
  const { title, author, description, price, stock, category } = req.body;
  const book = await Book.create({ title, author, description, price, stock, category });
  res.status(201).json(book);
};

// UPDATE book (Admin)
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, price, stock, category,coverImage } = req.body;
  const book = await Book.findByIdAndUpdate(
    id,
    { title, author, description, price, stock, category,coverImage },
    { new: true }
  );
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

// DELETE book (Admin)
exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
};
