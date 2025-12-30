# 🏥 Clinikverde - Medical Tourism Platform

<div align="center">

![Clinikverde Banner](https://img.shields.io/badge/Clinikverde-Medical_Tourism-blue?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://medical-tourism-kohl.vercel.app)
[![API Status](https://img.shields.io/badge/API-Online-success?style=for-the-badge)](https://medical-tourism-production.up.railway.app/health)

**A modern, full-stack medical tourism platform connecting international patients with premium Turkish healthcare providers**

[Live Demo](https://medical-tourism-kohl.vercel.app) · [Report Bug](https://github.com/taylantaskin/medical-tourism/issues) · [Request Feature](https://github.com/taylantaskin/medical-tourism/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

Clinikverde is a comprehensive medical tourism platform designed to bridge the gap between international patients seeking high-quality, affordable healthcare and Turkey's world-class medical facilities. The platform offers a seamless experience for discovering treatments, connecting with clinics, and managing patient applications.

### Why Clinikverde?

- 🌍 **Global Reach**: Connecting patients from 100+ countries with Turkish medical expertise
- 💰 **Cost Savings**: Up to 70% savings compared to US/EU prices
- 🏆 **Quality Assurance**: Only JCI-accredited, verified clinics
- 📱 **Modern Experience**: Responsive, intuitive interface
- 🔒 **Secure**: JWT authentication, data encryption
- ⚡ **Fast**: Optimized performance, CDN delivery

---

## ✨ Features

### 🌐 Public Features

| Feature | Description |
|---------|-------------|
| **Service Catalog** | Browse 4+ medical treatments with detailed information |
| **Clinic Directory** | Search and filter 50+ partner clinics |
| **Treatment Details** | Comprehensive pricing, duration, recovery info |
| **Contact System** | Instant consultation request submission |
| **Responsive Design** | Perfect experience on mobile, tablet, desktop |
| **Multi-language Ready** | Infrastructure for TR/EN support |

### 🔐 Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Real-time KPIs and statistics |
| **Application Management** | Track and manage patient inquiries |
| **Clinic CRUD** | Full create, read, update, delete operations |
| **Status Tracking** | Update application status workflow |
| **Protected Routes** | JWT-based authentication |
| **Audit Trail** | Track all admin actions |

---

## 🛠 Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Backend-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

</div>

### Complete Stack

```
Frontend:
├── React 19.0.0              - UI library
├── TypeScript 5.9.3          - Type safety
├── Vite 7.2.4                - Build tool
├── Tailwind CSS 3.4.1        - Styling
├── React Router 7.11.0       - Client-side routing
└── Lucide React 0.562.0      - Icon library

Backend:
├── Node.js 20+               - Runtime
├── Express 4.21.2            - Web framework
├── Prisma 5.22.0             - ORM
├── PostgreSQL 14+            - Database
├── JWT                       - Authentication
├── bcryptjs                  - Password hashing
└── CORS                      - Cross-origin requests

DevOps:
├── Git & GitHub              - Version control
├── Vercel                    - Frontend hosting
├── Railway                   - Backend hosting
├── Supabase                  - Managed PostgreSQL
└── GitHub Actions (planned)  - CI/CD
```

---

## 🏗 Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[User Browser]
        B[Vercel CDN]
    end
    
    subgraph "Application Layer"
        C[React SPA]
        D[React Router]
        E[API Service]
    end
    
    subgraph "Backend Layer"
        F[Express API]
        G[JWT Middleware]
        H[Prisma ORM]
    end
    
    subgraph "Data Layer"
        I[PostgreSQL]
        J[Supabase]
    end
    
    A -->|HTTPS| B
    B -->|Serve| C
    C --> D
    D --> E
    E -->|REST API| F
    F --> G
    G --> H
    H --> I
    I -.Managed by.- J
    
    style A fill:#e1f5ff
    style C fill:#61dafb
    style F fill:#339933
    style I fill:#4169e1
```

### Data Flow

1. **User Request** → Vercel CDN serves React SPA
2. **Client Routing** → React Router handles navigation
3. **API Calls** → Axios/Fetch to Railway backend
4. **Authentication** → JWT token verification
5. **Database Query** → Prisma ORM to PostgreSQL
6. **Response** → JSON data back to client

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 20.0.0
npm >= 10.0.0
git >= 2.40.0
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/taylantaskin/medical-tourism.git
cd medical-tourism
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd server
npm install
```

4. **Set up Environment Variables**

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5001
```

Backend `server/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/Clinikverde"
DIRECT_URL="postgresql://user:password@localhost:5432/Clinikverde"
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"
PORT=5001
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

5. **Initialize Database**
```bash
cd server
npx prisma generate
npx prisma db push
npm run seed  # Optional: Load sample data
```

6. **Start Development Servers**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

7. **Open Browser**
```
Frontend: http://localhost:5173
Backend:  http://localhost:5001
```

---

## 📁 Project Structure

```
medical-tourism/
├── 📂 public/                 # Static assets
├── 📂 src/                    # Frontend source
│   ├── 📂 components/         # React components
│   │   ├── 📂 admin/          # Admin-specific components
│   │   │   └── AdminLayout.tsx
│   │   └── 📂 layout/         # Layout components
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── 📂 contexts/           # React contexts
│   │   └── AuthContext.tsx    # Authentication state
│   ├── 📂 data/               # Static data
│   │   └── services.ts        # Treatment data
│   ├── 📂 pages/              # Route pages
│   │   ├── 📂 admin/          # Admin pages
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Applications.tsx
│   │   │   └── Clinics.tsx
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── ServiceDetail.tsx
│   │   ├── Clinics.tsx
│   │   ├── ClinicDetail.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── 📂 services/           # API services
│   │   └── api.ts             # API client
│   ├── 📂 types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── 📂 server/                 # Backend source
│   ├── 📂 prisma/             # Database
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Seed data
│   ├── 📂 src/                # Backend code
│   │   ├── 📂 middleware/     # Express middleware
│   │   │   └── auth.ts        # JWT authentication
│   │   └── index.ts           # Express server
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── .env                       # Frontend env vars
├── .gitignore
├── vercel.json                # Vercel config
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📡 API Documentation

### Base URL
```
Production: https://medical-tourism-production.up.railway.app
Local:      http://localhost:5001
```

### Endpoints

#### 🔓 Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/clinics` | List all clinics |
| `GET` | `/api/clinics/:id` | Get clinic details |
| `POST` | `/api/applications` | Submit consultation request |
| `GET` | `/api/stats` | Platform statistics |

#### 🔐 Admin Endpoints (Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Admin login |
| `GET` | `/api/auth/me` | Get current user |
| `GET` | `/api/applications` | List applications (admin) |
| `POST` | `/api/clinics` | Create clinic |
| `PUT` | `/api/clinics/:id` | Update clinic |
| `DELETE` | `/api/clinics/:id` | Delete clinic (soft) |

### Request Examples

**Get All Clinics**
```bash
curl https://medical-tourism-production.up.railway.app/api/clinics
```

**Submit Application**
```bash
curl -X POST https://medical-tourism-production.up.railway.app/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "treatment": "hair",
    "message": "I want information about hair transplant"
  }'
```

**Admin Login**
```bash
curl -X POST https://medical-tourism-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@Clinikverde.com",
    "password": "admin123"
  }'
```

---

## 📸 Screenshots

### Public Pages

<details>
<summary><b>🏠 Home Page</b></summary>

![Home Page](screenshots/home.png)
*Hero section with treatment cards and statistics*

</details>

<details>
<summary><b>💼 Services Page</b></summary>

![Services](screenshots/services.png)
*Treatment catalog with detailed information*

</details>

<details>
<summary><b>🏥 Clinics Page</b></summary>

![Clinics](screenshots/clinics.png)
*Partner clinics with filtering options*

</details>

<details>
<summary><b>📞 Contact Page</b></summary>

![Contact](screenshots/contact.png)
*Consultation request form*

</details>

### Admin Panel

<details>
<summary><b>🔐 Admin Login</b></summary>

![Admin Login](screenshots/admin-login.png)
*Secure JWT authentication*

</details>

<details>
<summary><b>📊 Dashboard</b></summary>

![Dashboard](screenshots/dashboard.png)
*KPI cards and recent applications*

</details>

<details>
<summary><b>📋 Applications Management</b></summary>

![Applications](screenshots/applications.png)
*Patient inquiry management*

</details>

<details>
<summary><b>🏥 Clinics CRUD</b></summary>

![Clinics CRUD](screenshots/clinics-crud.png)
*Full clinic management interface*

</details>

---

## 🌐 Deployment

### Production Deployment

The project is deployed using:

```mermaid
graph LR
    A[GitHub Repo] -->|Auto Deploy| B[Vercel]
    A -->|Auto Deploy| C[Railway]
    B -->|Serves| D[React SPA]
    C -->|Hosts| E[Express API]
    E -->|Connects| F[Supabase PostgreSQL]
    
    style B fill:#000000,color:#ffffff
    style C fill:#0B0D0E,color:#ffffff
    style F fill:#3ECF8E,color:#000000
```

**Live URLs:**
- Frontend: https://medical-tourism-kohl.vercel.app
- Backend: https://medical-tourism-production.up.railway.app
- Database: Supabase (Managed PostgreSQL)

### Manual Deployment

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Backend (Railway):**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway up
```

---

## 🗺 Roadmap

### ✅ Phase 1 - MVP (Completed)
- [x] Frontend setup (React + TypeScript)
- [x] Backend API (Express + Prisma)
- [x] Authentication system (JWT)
- [x] Admin panel (CRUD operations)
- [x] Deployment (Vercel + Railway)

### 🚧 Phase 2 - Enhancements (In Progress)
- [ ] Email notifications (SendGrid/Resend)
- [ ] Image upload (Cloudinary)
- [ ] Advanced filtering
- [ ] Google Maps integration
- [ ] Analytics dashboard

### 📅 Phase 3 - Advanced Features (Planned)
- [ ] Multi-language support (i18n)
- [ ] Payment integration (Stripe)
- [ ] Blog system
- [ ] Real-time chat
- [ ] Mobile app (React Native)
- [ ] SEO optimization

### 🔮 Phase 4 - AI & Automation (Future)
- [ ] AI chatbot (RAG)
- [ ] Recommendation system
- [ ] Automated follow-ups
- [ ] Predictive analytics

---

## 📊 Project Statistics

```
📅 Development Time:    5 days (40 hours)
📝 Total Lines of Code: ~3,500
📁 Total Files:         35+
🎨 Components:          20+
🔌 API Endpoints:       9
🗄️ Database Tables:     4
🧪 Test Coverage:       TBD
🌟 GitHub Stars:        0 (new project!)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow project rules
- **Commits**: Use conventional commits
- **Code Style**: Prettier for formatting

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Contact

**Taylan Taşkın**

- GitHub: [@taylantaskin](https://github.com/taylantaskin)
- Email: taylantaskin@yahoo.com
- LinkedIn: [Taylan Taşkın](www.linkedin.com/in/taylantaşkın1

)

**Project Link:** [https://github.com/taylantaskin/medical-tourism](https://github.com/taylantaskin/medical-tourism)

**Live Demo:** [https://medical-tourism-kohl.vercel.app](https://medical-tourism-kohl.vercel.app)

---

## 🙏 Acknowledgments

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Express](https://expressjs.com/)
* [Prisma](https://www.prisma.io/)
* [Vercel](https://vercel.com/)
* [Railway](https://railway.app/)
* [Supabase](https://supabase.com/)
* [Lucide Icons](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ by Taylan Taşkın**

⭐ Star this repo if you find it helpful!

</div>