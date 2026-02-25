# 🐳 Docker Setup Guide — Personal Finance Tracker

## Step 1: Install Docker Desktop

1. Download from **[docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)**
2. Run the installer → follow prompts → restart PC if asked
3. Open **Docker Desktop** and wait for the whale icon (system tray) to be steady/green

Verify installation:
```bash
docker --version
docker compose version
```

---

## Step 2: Run the Application

```bash
cd E:\sem6\fullstack2026\DEVOPS2026\20260225
docker compose up --build
```

This single command will:
- Build Docker images for **frontend** and **backend** using their Dockerfiles
- Start both containers with correct port mappings
- Set up inter-service networking automatically
- Mount source code volumes for **hot reloading**

---

## Step 3: Access the App

| Service  | URL |
|----------|-----|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend  | [http://localhost:5000/api/dashboard](http://localhost:5000/api/dashboard) |

---

## Useful Docker Commands

```bash
# Start services (detached mode)
docker compose up -d --build

# View running containers
docker compose ps

# View logs
docker compose logs -f

# View only backend logs
docker compose logs -f backend

# Stop all services
docker compose down

# Rebuild after Dockerfile changes
docker compose up --build

# Remove containers + images
docker compose down --rmi all
```

---

## How It Works

```
┌─────────────────────────────────────────┐
│           docker-compose.yml            │
│                                         │
│  ┌─────────────┐   ┌────────────────┐  │
│  │   frontend   │   │    backend     │  │
│  │  (React/Vite)│──▶│ (Express API)  │  │
│  │  Port: 3000  │   │  Port: 5000    │  │
│  └─────────────┘   └────────────────┘  │
│                                         │
│  ✅ Hot Reloading via volume mounts     │
│  ✅ Environment variables for API URL   │
│  ✅ Inter-service communication         │
└─────────────────────────────────────────┘
```

- **Volume mounts** (`./backend:/app`) sync your local code into containers — edits reflect instantly
- **nodemon** (backend) and **Vite polling** (frontend) detect changes and restart/refresh automatically
- **`VITE_API_URL`** environment variable tells the frontend where the backend API lives
