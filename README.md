# 🔐 MERN Authentication System
[Live Link - https://authentication-system-frontend-topaz.vercel.app/ ]
![App Screenshot](client/public/App%20ScreenShot.png)


  A complete Authentication System built using the MERN Stack - MongoDB, Express.js, React.js, and Node.js.  
This project includes secure user registration, login, logout, OTP verification for password reset, and protected routes. 




---

## 🚀 Features

✅ User Registration and Login  
✅ Secure Password Hashing with bcrypt  
✅ JWT (JSON Web Token) Authentication  
✅ Email-based OTP Verification for Verify Email and Reset Password
✅ Context API for Global User State  
✅ Toast Notifications for Feedback  
✅ Responsive UI built with Tailwind CSS  

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Axios
- React Router DOM
- React Toastify
- Tailwind CSS
- Context API

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt.js
- JSON Web Token (JWT)
- Nodemailer (for OTP emails)
- dotenv

---

## ⚙️ Installation

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mern-auth-system.git

````

### 2️⃣ Navigate into the Project Folder
```bash
cd mern-auth-system
```
### 3️⃣ Install Dependencies
Install server dependencies
```bash
cd server
npm install
````
Install client dependencies
```bash
cd ../client
npm install
````
### 🧩 Environment Variables

Create a Server .env file:
```bash
PORT = 3000
MONGODB_URI=Your MongoDB URI
JWT_SECRET=secretkey
NODE_ENV=development
SMTP_USER= Your SMTP username
SMTP_PASS= Your SMTP Password
SENDER_EMAIL="Your Sender Email

````

Create a Client .env file:
```bash
VITE_BACKEND_URL = 'http://localhost: YOUR PORT'

````

### ▶️ Running the Project
Start the Backend
```bash
cd server
npm run dev
```

Start the Frontend
```bash
cd client
npm run dev
```

## 📁 Folder Structure

```
mern-auth/
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── assets/
│ │ └── App.jsx
│ └── package.json
│
├── server/
| ├── config/
│ ├── controller/
│ ├── routes/
│ ├── model/
│ ├── middleware/
│ ├── server.js
│ └── package.json
│
└── README.md
```
