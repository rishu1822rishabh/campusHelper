# 🎓 Campus Helper – AI Powered Career & Placement Assistant

Campus Helper is a full-stack AI-powered web application designed to help students prepare for placements by providing intelligent resume analysis, ATS optimization, job description matching, and AI-driven career guidance.

Built using **Next.js 16**, **React 19**, **TypeScript**, **Prisma**, **PostgreSQL**, **Tailwind CSS**, and **Groq AI**, the platform combines modern web technologies with large language models to deliver personalized career assistance.

---

## ✨ Features

### 👤 Authentication

* JWT Authentication
* Secure Password Hashing (Argon2)
* Role-Based Access Control
* Admin & User Roles

### 📄 Resume Analysis

* Upload Resume
* AI Resume Review
* ATS Score
* Resume Strengths
* Resume Weaknesses
* Improvement Suggestions

### 🎯 Job Description Matching

* Resume vs Job Description Analysis
* Skill Matching
* Missing Skills Detection
* Matching Percentage

### 🤖 AI Career Assistant

* General Career Guidance
* Placement Preparation
* Resume Suggestions
* Technical Advice

### 👨‍💼 Admin Dashboard

* User Management
* Role Management
* Dashboard Access
* Analytics Foundation

### 📧 Email Support

* Email Integration using Nodemailer

---

# 🛠 Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Backend

* Next.js Server Actions
* Prisma ORM
* PostgreSQL

### Authentication

* JWT
* Argon2 Password Hashing

### AI

* Groq API
* LLM-based Resume Analysis

---

# 📂 Project Structure

```
src/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── api/
│
├── actions/
├── components/
├── lib/
├── generated/
├── types/
│
prisma/
public/
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/rishu1822rishabh/auth
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=
JWT_SECRET=
GROQ_API_KEY=
EMAIL_USER=
EMAIL_PASS=
```

Generate Prisma Client

```bash
npm run db:generate
```

Push Database

```bash
npm run db:push
```

Run the application

```bash
npm run dev
```

# 📈 Future Enhancements

* Resume Builder
* Resume Versioning
* Cover Letter Generator
* LinkedIn Profile Review
* GitHub Repository Review
* AI Interview Simulator
* Career Roadmap
* Skill Gap Analysis
* Company Specific Resume Optimization
* Resume History
* Analytics Dashboard

---

# 🔒 Security

* JWT Authentication
* Argon2 Password Hashing
* Secure Cookies
* Role-Based Authorization

Planned:

* Refresh Tokens
* Rate Limiting
* Email Verification
* Password Reset
* Session Management
---

# ⭐ Why This Project?

Campus Helper was developed to simplify placement preparation by combining AI with modern web technologies. The platform helps students optimize resumes, analyze job descriptions, and receive intelligent career guidance from a single application.
