require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Book = require('./models/Book');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding');

  await User.deleteMany();
  await Category.deleteMany();
  await Book.deleteMany();

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  });

  const fiction = await Category.create({ name: 'Fiction' });
  const tech = await Category.create({ name: 'Technology' });

  await Book.create([
    { title: 'Clean Code', author: 'Robert C. Martin', price: 25, stock: 10, category: tech._id },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 15, stock: 5, category: fiction._id }
  ]);

  console.log('Seed complete');
  process.exit(0);
};

run();
