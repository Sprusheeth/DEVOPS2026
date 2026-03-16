# Kube-Monitor Platform 🚀

A real-time, high-performance **Full-Stack Resource Monitoring Framework** designed for heterogeneous Kubernetes clusters.

This project is built directly referencing the architecture from the research paper: **"Real-Time Resource Monitoring Framework in a Heterogeneous Kubernetes Cluster"**.

## 🏗️ Architecture

The platform simulates the actual Kubernetes metrics pipeline using a Node.js Backend Service and WebSockets:

1. **Metrics Simulator**: Mimics the data extraction flow from `cAdvisor -> Kubelet -> Metrics-Server -> API Server`.
2. **PostgreSQL/MongoDB**: Stores time-series metric data over time.
3. **WebSockets (Socket.io)**: Pushes real-time metrics every 5 seconds to the frontend without HTTP polling.
4. **Next.js Dashboard**: A Dark-themed, Grafana-inspired monitoring dashboard built with Recharts, TailwindCSS, and React.

## 📊 Monitored Metrics (Real-Time)

### Node-Level Metrics (9)
- Allocatable CPU & Memory
- Requests CPU & Memory
- Limits CPU & Memory
- Total CPU & Memory Usage
- Pod Count

### Pod-Level Metrics (6)
- Pod CPU & Memory Usage
- Pod CPU & Memory Limits
- Pod CPU & Memory Requests

## 🚀 Technology Stack

- **Frontend**: Next.js 15, React, TailwindCSS, ShadCN UI, Recharts, Framer Motion
- **Backend**: Node.js, Express.js, Socket.IO, JWT
- **Database**: MongoDB (Mongoose ODM)
- **Deployment**: Docker, Docker Compose

## 🛠️ Quick Start (Docker)

To run the entire platform locally using Docker:

```bash
docker-compose up --build
```

This will spin up:
- MongoDB Database on port `27017`
- Backend API & WebSockets on port `5000`
- Next.js Dashboard on port `3000`

### Access the App
Open your browser and navigate to: `http://localhost:3000`

## 🔐 Authentication

The platform includes JWT-based authentication. 
1. Navigate to `http://localhost:3000/register` to create an admin/viewer account.
2. Log in to access the protected Real-Time `/dashboard` routes.
