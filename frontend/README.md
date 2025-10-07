# BookHaven - Bookstore Frontend

A modern, dark-themed React frontend for the BookHaven bookstore application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 Dark, professional design with modern UI components
- 🔐 User authentication (login/register)
- 📚 Browse and search books
- 🛒 Shopping cart functionality
- 📦 Order management
- 👤 User profile and order history
- 🔧 Admin dashboard for managing books, categories, and orders
- 📱 Fully responsive design

## Project Structure

\`\`\`
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── books/             # Book listing and detail pages
│   ├── cart/              # Shopping cart page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── books/            # Book-related components
│   ├── home/             # Home page components
│   ├── layout/           # Layout components (header, footer)
│   └── ui/               # Reusable UI components
├── context/              # React context providers
│   ├── auth-context.tsx  # Authentication context
│   └── cart-context.tsx  # Shopping cart context
├── services/             # API services
│   └── api.ts           # API client and service functions
└── types/               # TypeScript type definitions
    └── index.ts         # Shared types
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see backend README)

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create environment file:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

3. Update `.env.local` with your backend API URL:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Connecting to Backend

The frontend is configured to connect to your backend API through the `src/services/api.ts` file. 

### API Configuration

Update the `API_BASE_URL` in `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

### API Endpoints Used

The frontend expects these backend endpoints:

**Auth:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

**Books:**
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (admin)
- `PUT /api/books/:id` - Update book (admin)
- `DELETE /api/books/:id` - Delete book (admin)

**Categories:**
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

**Orders:**
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status (admin)

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State Management:** React Context API
- **HTTP Client:** Fetch API

## Key Features Explained

### Authentication
- JWT token stored in localStorage
- Protected routes for admin pages
- User context available throughout the app

### Shopping Cart
- Persistent cart using localStorage
- Real-time cart updates
- Quantity management

### Admin Dashboard
- Role-based access control
- CRUD operations for books and categories
- Order management interface

## Customization

### Changing Theme Colors
Edit `src/app/globals.css` to customize the color scheme:
\`\`\`css
--color-primary: #ffffff;
--color-accent: #2563eb;
/* etc. */
\`\`\`

### Adding New Pages
Create new pages in the `src/app` directory following Next.js App Router conventions.

## Support

For issues or questions, please refer to the backend documentation or create an issue in the repository.
