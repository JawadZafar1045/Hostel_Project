# 🏨 HostelVaniya – Project README

## 📌 Project Overview

**HostelVaniya** is a full-stack web application designed to help users discover, list, and manage hostel accommodations. The platform allows users to view hostel listings, while authenticated users can add, update, and manage their own hostel posts.

---

## 🏗️ Tech Stack

### 🔹 Frontend

* **Next.js** (App Router recommended)
* **React.js**
* **Tailwind CSS**
* **ShadCN UI (optional for components)**

### 🔹 Backend

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose ORM)**

### 🔹 Authentication

* JWT (JSON Web Tokens)

---

## 📁 Project Structure

```
HostelVaniya/
│
├── frontend/   (Next.js App)
│
└── backend/    (Express API)
```

---

## 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/hostelvaniya.git
cd hostelvaniya
```

---

## 🎨 Frontend Setup (Next.js)

### 📌 Requirements

* Node.js (v18+ recommended)

### 📦 Installation

```bash
cd frontend
npm install
```

### ▶️ Run Development Server

```bash
npm run dev
```

### 🌐 Default URL

```
http://localhost:3000
```

### ⚙️ Environment Variables

Create a `.env.local` file inside `frontend/`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## ⚙️ Backend Setup (Express)

### 📌 Requirements

* Node.js
* MongoDB (local or cloud e.g. Atlas)

### 📦 Installation

```bash
cd backend
npm install
```

### ▶️ Run Server

```bash
npm run dev
```

### 🌐 Default URL

```
http://localhost:5000
```

### ⚙️ Environment Variables

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🔐 Authentication Flow

* User registers/logs in
* Backend generates JWT
* Token stored in frontend (localStorage or cookies)
* Protected routes require token verification

---

## 🧩 Core Features

### 👤 User Features

* Register/Login
* View hostels
* View hostel details

### 🏠 Hostel Owner Features

* Add Hostel
* Edit/Delete Hostel
* View own listings

---

## 📡 API Endpoints (Sample)

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
```

### Hostel Routes

```
GET    /api/hostels
GET    /api/hostels/:id
POST   /api/hostels        (Protected)
PUT    /api/hostels/:id    (Protected)
DELETE /api/hostels/:id    (Protected)
```

---

## 📷 Image Handling

* Use **multer** (memory storage or disk)
* Store image URL in DB
* Optionally integrate Cloudinary

---

## 👨‍💻 Development Guidelines

### Frontend Team

* Use reusable components (cards, forms, modals)
* Maintain clean folder structure
* Use API service layer (Axios/custom hooks)
* Handle auth state globally (Context/Redux)

### Backend Team

* Follow MVC pattern
* Use middleware for:

  * Authentication
  * Authorization (ownership)
* Validate inputs properly
* Handle errors centrally

---

## 🔄 Development Workflow

1. Backend APIs ready first
2. Frontend integrates APIs
3. Test authentication & protected routes
4. UI/UX improvements
5. Deployment

---

## 🚀 Deployment Suggestions

* Frontend: Vercel / Netlify
* Backend: Render / Railway / VPS
* Database: MongoDB Atlas

---

## 📌 Important Notes

* Frontend only needs **Next.js setup**
* Backend only needs **Express setup**
* Both run independently but connect via API
* Keep `.env` files secure (never push to GitHub)

---

## 🤝 Contribution

* Create feature branches
* Follow clean commit messages
* Test before pushing

---

## 📞 Contact

For any issues or coordination, contact the project lead.

---

🔥 **Let’s build HostelVaniya efficiently — clean code, clear communication, and proper structure!**
