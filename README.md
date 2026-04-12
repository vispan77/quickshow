# 🎬 Movie Ticket Booking Website

A full-stack movie ticket booking web application where users can browse movies, select seats, 
and book tickets in real-time — just like BookMyShow.

---

## 🚀 Live Demo

👉 https://quickshow-client-ten-beige.vercel.app/

---

## 📌 Features

* 🎥 Browse available movies
* ⏰ Select show timings
* 🪑 Interactive seat selection system
* ❌ Booked seats are automatically disabled
* 💰 Dynamic price calculation
* ✅ Secure ticket booking system
* 📱 Responsive design (Mobile + Desktop)

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* HTML5
* CSS3
* JavaScript

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the repository

```bash
https://github.com/vispan77/quickshow
cd movie-ticket-booking
```

### 2️⃣ Install dependencies

**Frontend**

```bash
cd frontend
npm install
npm start
```

**Backend**

```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 🧠 How It Works

1. User selects a movie
2. Chooses show timing
3. Selects available seats
4. Total price updates dynamically
5. On booking:

   * Seats are saved in database
   * Booked seats become unavailable
   * Prevents double booking

---

## 💡 Challenges Faced

* Managing real-time seat availability
* Preventing double booking of seats
* Syncing frontend state with backend data

---

## ✨ Future Improvements

* 💳 Payment Gateway Integration (Stripe)
* 🔐 User Authentication (Login/Signup)
* 🎟️ Booking History
* 📧 Email Confirmation System

---


## 👨‍💻 Author

**Vishal Pandey**

* GitHub: https://github.com/vispan77
* LinkedIn: https://www.linkedin.com/in/vipan76/

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
