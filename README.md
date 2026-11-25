# CollegePath — Indian College Discovery & Admission Guidance Platform

A full-stack higher education platform built to guide Class 12 students across India in finding suitable colleges based on board percentage, stream (PCM, PCB, Commerce, Arts), entrance exams (JEE Main, CUET, NEET), category, state quota, and annual budget.

---

## 🏗️ Architecture & Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Recharts, React Router v6 (Deployed on **Vercel**)
- **Backend:** Node.js, Express.js (ES Modules), Mongoose, JWT, bcryptjs, CORS (Deployed on **Render**)
- **Database:** MongoDB Atlas (with automatic fallback to High-Performance In-Memory Demo Mode with 12 verified sample colleges)

---

## 🚀 Deployment Instructions

### 1. Backend Deployment on Render

1. Go to [Render Dashboard](https://dashboard.render.com) and click **New +** &rarr; **Web Service**.
2. Connect your GitHub repository: `https://github.com/thakurviveksingh4567-cloud/college-path`.
3. Configure the service settings:
   - **Name:** `collegepath-backend`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. In **Advanced** &rarr; **Health Check Path**, enter:
   ```text
   /api/health
   ```
5. Add the following **Environment Variables**:
   | Key | Value / Description | Required |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Yes |
   | `PORT` | `5000` (Render binds automatically) | Yes |
   | `JWT_SECRET` | Any strong secret string (e.g. `collegepath_secret_2026`) | Yes |
   | `CLIENT_URL` | Your Vercel frontend URL (e.g. `https://college-path.vercel.app`) | Recommended |
   | `MONGODB_URI` | MongoDB Atlas connection string (or omit for In-Memory Demo Mode) | Optional |

6. Click **Create Web Service**. Once deployed, copy your Render URL (e.g. `https://collegepath-backend.onrender.com`).

---

### 2. Frontend Deployment on Vercel

1. In your [Vercel Dashboard](https://vercel.com/dashboard), navigate to your **CollegePath** project.
2. Go to **Settings** &rarr; **Environment Variables**.
3. Add:
   | Key | Value |
   | :--- | :--- |
   | `VITE_API_URL` | Your Render backend URL, e.g. `https://collegepath-backend.onrender.com` (no trailing slash) |
4. Trigger a **Redeploy** on Vercel so the frontend builds with the new backend API URL.

---

### 3. Health Check & Diagnostics

- **Health Check:** `GET /api/health`
  ```json
  {
    "status": "success",
    "message": "CollegePath backend is running"
  }
  ```
- **Diagnostics & DB Status:** `GET /api/status`
- **College API:** `GET /api/colleges`

---

## 💻 Local Development

1. **Install Dependencies:**
   ```bash
   npm install --prefix server
   npm install --prefix client
   ```
2. **Start Dev Servers (Root):**
   ```bash
   npm run dev
   ```
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)
