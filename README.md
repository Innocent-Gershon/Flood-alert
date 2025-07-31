# 🌊 Inclusive Real-Time Flood Alert Platform for Vulnerable Communities in Ghana

This is a full-stack web application that provides **real-time flood alerts** to vulnerable communities in Ghana. The platform includes a full user authentication system with role-based dashboards.
What does is that depending on the role you selected to register is what would be allowed to you in the homepaage.
What I mean is that for instance when you user register as Community Member which is part of of role indicated in the SRS Document he/she would only be allowed to access the CommunityReporting page which is very brlliant for feature like the Role-Based Access Control (RBAC).
In other case when register as an admin would be allowed to access all the pages.

---

## 📁 Project Structure

```
Flood-alert/
├── backend/               # Express server, MongoDB, Twilio integration (Future Integration)
├── frontend/              # React + Vite frontend and dashboards
├── node_modules/          # Common dependencies
├── package.json           # Shared config (if any), or workspace root
├── vite.config.ts         # Frontend build config
```

---

## 🚀 Live Demo (Optional)

🔗 [https://your-deployed-site-url.com](https://your-deployed-site-url.com)

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, TailwindCSS, i18n
* **Backend:** Node.js, Express.js, MongoDB, Twilio
* **Authentication:** JWT-based login
* **Deployment:** Render (Frontend), Render (Backend)

---

## 🧑‍💻 How to Run This Project Locally

### 1. 📦 Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB](https://www.mongodb.com/try/download/community) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 2. 🧳 Clone the Repository

```bash
git clone https://github.com/Innocent-Gershon/Flood-alert.git
cd Flood-alert
```

---

## 💻 Setup: Frontend

```bash
cd frontend
npm install
```

### ▶️ To start the frontend:

```bash
npm start
```

> Frontend runs on: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Setup: Backend

```bash
cd ../backend
npm install
```

### 🔐 Create `.env` file inside `backend/`

```env
PORT=5050
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

> You can get Twilio credentials from your [Twilio Console](https://www.twilio.com/console).

### ▶️ To start the backend:

```bash
npm run dev
```

> Backend runs on: [http://localhost:5050](http://localhost:5050)

---
These section is not yet implemented but would be looking forward in doing that.
## 🌍 Language Support (i18n)

The app supports the following languages:

* 🇬🇧 English
* 🧉 Twi
* 🦁 Ewe

You can switch languages using the dropdown at the top right corner of the page.

---

## ✅ Features

* ✅ Register / Login with roles: Admin, Responder, Community Member
* ✅ Admin dashboard to recieve and reflect alert sent by the Community Members
* ✅ Protected routes based on user roles
* ✅ Fully responsive design
* ✅ MongoDB + JWT-based backend auth

---

## 🌐 Deployment Guide

### Frontend (Render)

1. Go to [render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repo and select the `backend` folder
4. Set environment variables as shown above
5. Build command:

   ```
   npm run build
   ```

   Output directory:

   ```
   dist
   ```

### Backend (Render)

1. Go to [render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repo and select the `backend` folder
4. Set environment variables as shown above
5. Build command:

   ```
   npm install
   ```
6. Start command:

   ```
   npm run dev
   ```

Yes people are wondering if the it is possible to deploy both fronend the backend on a cloud platform (Render), I doubt it myself from the beginning but in the end I realised it is the easiest way to deploy.

---

## 👨🏾‍💻 Developer Shortcuts

### Show full file structure:

```bash
tree -L 3
```

### Clean install frontend & backend:

```bash
cd frontend && npm install && cd ../backend && npm install
```

### Run both servers (if using concurrently):

```bash
# Optional: install concurrently
npm install -g concurrently

# Then run both:
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

---

## 📄 License

MIT License © 2025 \[Innocent Nangah]

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to contribute to this project, please fork the repo and open a PR.

---


