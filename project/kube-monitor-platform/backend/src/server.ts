import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import { startMetricsSimulation } from './services/MetricsSimulator';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io for Real-time Metrics
export const io = new Server(server, {
  cors: {
    origin: '*', // We'll restrict this in production
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Kube-Monitor API is running' });
});

io.on('connection', (socket) => {
  console.log('Client connected for real-time metrics');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  
  // Start the background Metrics Simulation (5s interval)
  startMetricsSimulation();

  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
