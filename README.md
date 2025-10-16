Advanced React E-Commerce Application
Vercel hosting @ jdfireecomm.vercel.app
A modern e-commerce web application built with React, TypeScript, Redux Toolkit, and React Query, featuring a complete shopping cart system with persistent storage.

🚀 Features
Product Catalog
Display all products from FakeStoreAPI
Product cards showing:
Title, price, and category
Product description
Product image with fallback for 404 errors
Star ratings with review count
"Add to Cart" button
Category Navigation
Dynamic category dropdown populated from API
Filter products by category
Clear filter option to show all products
Shopping Cart
State Management: Redux Toolkit for efficient state management
Session Storage: Cart persists across browser sessions
Add products to cart from product listing
View all cart items with:
Product image, title, and price
Quantity controls (increase/decrease)
Remove item button
Display total number of items in cart
Display total price of all items
Checkout functionality that:
Clears Redux state
Clears sessionStorage
Shows success modal
User Experience
Responsive design using React Bootstrap
Loading states for API calls
Toast notifications when adding items to cart
Navigation badge showing cart item count
Image fallback handling for broken links
🛠️ Technologies Used
React 19 - UI library
TypeScript - Type safety
Redux Toolkit - State management
React Query (TanStack Query) - Data fetching and caching
React Router - Client-side routing
React Bootstrap - UI components
React Star Ratings - Star rating display
Axios - HTTP client
Vite - Build tool and dev server
FakeStoreAPI - Mock e-commerce API
📦 Installation
Clone the repository
bash
   git clone <your-repo-url>
   cd jdadvreactecomm
Install dependencies
bash
   npm install
Install additional required packages (if not already installed)
bash
   npm install @reduxjs/toolkit react-redux
🚀 Running the Application
Development Mode
bash
npm run dev
The application will open at http://localhost:5173

Build for Production
bash
npm run build
Preview Production Build
bash
npm run preview
Run Linter
bash
npm run lint
📁 Project Structure
src/
├── api/
│   └── api.ts                 # API client and fetch functions
├── components/
│   ├── Navbar.tsx             # Navigation bar with cart badge
│   ├── ProductCard.tsx        # Individual product card
│   └── ShoppingCart.tsx       # Shopping cart page
├── context/
│   └── ProductContext.tsx     # Product context for global state
├── pages/
│   └── Home.tsx               # Main product listing page
├── store/
│   ├── store.ts               # Redux store configuration
│   └── cartSlice.ts           # Cart reducer and actions
├── types/
│   └── types.ts               # TypeScript type definitions
├── utils/
│   └── sessionStorage.ts      # SessionStorage helper functions
├── App.tsx                    # Main app component with routing
└── main.tsx                   # Application entry point
🎯 Key Features Explained
Redux Toolkit Cart Management
The shopping cart uses Redux Toolkit for state management with the following actions:

addToCart - Adds a product or increases quantity
removeFromCart - Removes a product from cart
updateQuantity - Updates product quantity
clearCart - Empties the cart (used on checkout)
Session Storage Persistence
Cart data is automatically saved to sessionStorage and restored when the app loads, ensuring cart contents persist across browser sessions and page refreshes.

Image Fallback Handling
Products with 404 image errors automatically display a placeholder image using https://via.placeholder.com, ensuring the UI remains consistent.

Category Filtering
Categories are dynamically fetched from the API and used to filter products. The implementation avoids hardcoded category values.

🌐 API Endpoints Used
GET /products - Fetch all products
GET /products/categories - Fetch all categories
GET /products/category/{category} - Fetch products by category
🧪 Testing the Application
Browse Products: Navigate to the home page to see all products
Filter by Category: Use the dropdown to filter products
Add to Cart: Click "Add to Cart" on any product
View Cart: Click the shopping cart icon in the navbar
Manage Cart: Adjust quantities or remove items
Checkout: Click "Proceed to Checkout" to complete the order
📝 Notes
The FakeStoreAPI is a mock API, so no real orders are processed
Some product images from the API may return 404 errors (API limitation)
SessionStorage persists data only for the current session
The application is fully responsive and works on mobile devices
🤝 Contributing
This project is for educational purposes. Feel free to fork and experiment!

📄 License
MIT

👨‍💻 Author
[Jason Desmond]

Built with ❤️ using React and TypeScript

