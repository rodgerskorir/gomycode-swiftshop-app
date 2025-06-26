

# 🛍️ SwiftShop

A modern eCommerce web application for buying shoes, built using the **MERN stack** with **TypeScript** and **Tailwind CSS**. It features both customer-facing and admin functionalities, offering product management, order tracking, authentication, and more.

---

## 📌 Project Overview

**SwiftShop** is a full-stack eCommerce platform allowing users to browse, search, and purchase shoes, while admins can manage products and orders. It includes secure authentication, responsive UI, and robust backend APIs.

---

## 👨‍💻 Author

- **Name**: Rodgers Kipkurui  
- **Email**: korirrodgers103@gmail.com  
- **GitHub Repository**: [https://github.com/rodgerskorir/gomycode-swiftshop-app.git](https://github.com/rodgerskorir/gomycode-swiftshop-app.git)

---

## 🚀 Tech Stack

### Frontend (Client)
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Zustand / Redux

### Backend (Server)
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing

---

## 🗂️ Folder Structure

```bash
SwiftShop/
├── client/                 # Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   └── main.tsx
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── server/                 # Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── types/
│   │   └── index.ts
│   └── tsconfig.json
│
├── .gitignore
├── package.json (root)
└── README.md
````

---

## 🌐 Live Demo

> *Coming soon* – To be deployed using Vercel (Frontend) and Render or Railway (Backend)

---

## 🔐 Environment Variables

### Server

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Client

Create a `.env` file in the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧩 Features

### User

* Register and login with JWT authentication
* Browse products
* Search and filter
* Add to cart
* Checkout and view orders

### Admin

* Add, edit, delete products
* View and update orders
* Role-based access control

---

## 🧪 API Endpoints

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Products

* `GET /api/products`
* `GET /api/products/:id`
* `POST /api/products` *(Admin)*
* `PUT /api/products/:id` *(Admin)*
* `DELETE /api/products/:id` *(Admin)*

### Orders

* `POST /api/orders`
* `GET /api/orders/my-orders`
* `GET /api/orders/:id`
* `PUT /api/orders/:id/deliver` *(Admin)*

---

## 🗄️ Database Models

### User Model

```ts
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string,
  isAdmin: boolean,
  createdAt: Date
}
```

### Product Model

```ts
{
  _id: ObjectId,
  name: string,
  description: string,
  price: number,
  brand: string,
  category: string,
  images: string[],
  stock: number,
  rating: number,
  reviews: Array,
  createdAt: Date
}
```

### Order Model

```ts
{
  _id: ObjectId,
  user: ObjectId,
  orderItems: [{ product: ObjectId, qty: number }],
  shippingAddress: object,
  paymentMethod: string,
  paymentResult: object,
  totalPrice: number,
  isPaid: boolean,
  isDelivered: boolean,
  createdAt: Date
}
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js v18+
* MongoDB (local or Atlas)
* npm or Yarn

### Clone the Repository

```bash
git clone https://github.com/rodgerskorir/gomycode-swiftshop-app.git
cd gomycode-swiftshop-app
```

### Install Dependencies

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🗓️ Project Timeline (14-Day Plan)

| Day | Task                                          |
| --- | --------------------------------------------- |
| 1   | Initialize project structure & GitHub repo    |
| 2   | Configure Tailwind, routing in frontend       |
| 3   | Setup Express server & MongoDB connection     |
| 4   | Auth routes (register/login) + JWT            |
| 5   | User & Product models                         |
| 6   | Product CRUD API                              |
| 7   | Frontend: Login/Register pages                |
| 8   | Frontend: Product listing page                |
| 9   | Frontend: Product detail + cart functionality |
| 10  | Order model + order API                       |
| 11  | Checkout and place order flow                 |
| 12  | Admin: Manage products & orders               |
| 13  | Testing & bug fixes                           |
| 14  | Final polish, docs & deployment               |

---

## 📈 Future Improvements

* ✅ Payment integration (Stripe/PayPal)
* ✅ Wishlist feature
* ✅ Admin analytics dashboard
* ✅ Email notifications
* ✅ Real-time updates via WebSockets
* ✅ Unit tests with Jest

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

### 📫 Contact

For questions, suggestions, or collaborations, contact:

**Rodgers Kipkurui**
📧 [korirrodgers103@gmail.com](mailto:korirrodgers103@gmail.com)
🔗 [GitHub Profile](https://github.com/rodgerskorir)

---

```

---

