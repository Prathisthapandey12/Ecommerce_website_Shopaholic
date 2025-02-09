# E-commerce Website

An e-commerce platform designed for users to browse and purchase products with features like filtering, searching, and an admin panel for product management. The application is built using the **Node.js**, **Express.js**, and **MongoDB** stack.

---

## Features

### User Features:
- **Product Filtering:** Filter products based on categories, price range, or other attributes.
- **Search Bar:** Quickly find products by name or keyword.
- **Product Details:** View detailed information about a product, including price, description, and images.
- **Cart Management:** Add products to the cart and proceed to checkout.
- **Purchase Products:** Place order and even cancel them

### Admin Features:
- **Admin Panel:** A secure dashboard for the website owner to:
  - Add new products.
  - Delete products.
- **Role-based Access:** Separate routes and permissions for admin and users.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS (Tailwind CSS), JavaScript 
- **Authentication:** JSON Web Tokens (JWT) and session-based authentication

---

## Installation and Setup

### Prerequisites:
- Node.js installed on your system.
- MongoDB installed or access to a MongoDB cloud database.

### Install dependencies
```bash
# Initialize NPM
npm init -y

# Install Dependencies 
npm i bcrypt connect-flash express express-session jsonwebtoken multer mongoose

# Start the application
npx nodemon app.js
```

### Host the website locally
```bash
localhost:3000
```

---

## Future Improvements
- Implement payment gateway integration.
- Add user profile management.
- Enable order tracking functionality.
- Enhance UI/UX with modern design practices.

---

## Contact

- Name: Prathistha Pandey
- Email: 2022csb1105@iitrpr.ac.in
- GitHub: Prathisthapandey12
