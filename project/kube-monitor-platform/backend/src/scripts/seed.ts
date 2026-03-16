import mongoose from "mongoose";
import dotenv from "dotenv";
import Cluster from "../models/Cluster";
import Node from "../models/Node";
import Pod from "../models/Pod";
import Metric from "../models/Metric";

// Load env vars
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kubemonitor";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    // Clear existing data to prevent duplicates
    await Cluster.deleteMany();
    await Node.deleteMany();
    await Pod.deleteMany();
    await Metric.deleteMany();

    console.log("Cleared existing cluster data.");

    // Create a new Sample Cluster
    const cluster = await Cluster.create({
      clusterName: "prod-us-east-1",
      location: "AWS US East",
    });

    console.log(`Created Cluster: ${cluster.clusterName}`);

    // Create Sample Nodes
    const nodesData = [
      {
        clusterId: cluster._id,
        nodeName: "node-master-01",
        cpuAllocatable: 8,
        memoryAllocatable: 32 * 1024 * 1024 * 1024, // 32 GB
        status: "Ready",
      },
      {
        clusterId: cluster._id,
        nodeName: "node-worker-01",
        cpuAllocatable: 16,
        memoryAllocatable: 64 * 1024 * 1024 * 1024, // 64 GB
        status: "Ready",
      },
      {
        clusterId: cluster._id,
        nodeName: "edge-raspberry-pi-01",
        cpuAllocatable: 4,
        memoryAllocatable: 8 * 1024 * 1024 * 1024, // 8 GB
        status: "Ready",
      },
    ];

    const nodes = await Node.insertMany(nodesData);
    console.log(`Created ${nodes.length} Nodes`);

    // Create Sample Pods
    const podsData = [
      {
        nodeId: nodes[0]._id, // Master Node
        podName: "kube-apiserver",
        cpuRequest: 250, // mCores
        memoryRequest: 512 * 1024 * 1024, // 512 MB
        cpuLimit: 1000,
        memoryLimit: 1024 * 1024 * 1024, // 1 GB
      },
      {
        nodeId: nodes[1]._id, // Worker Node 1
        podName: "nginx-ingress-controller",
        cpuRequest: 100,
        memoryRequest: 256 * 1024 * 1024,
        cpuLimit: 500,
        memoryLimit: 512 * 1024 * 1024,
      },
      {
        nodeId: nodes[1]._id, // Worker Node 1
        podName: "database-postgres-0",
        cpuRequest: 1000,
        memoryRequest: 4 * 1024 * 1024 * 1024, // 4 GB
        cpuLimit: 4000,
        memoryLimit: 8 * 1024 * 1024 * 1024, // 8 GB
      },
      {
        nodeId: nodes[2]._id, // Edge Node
        podName: "iot-sensor-collector",
        cpuRequest: 50,
        memoryRequest: 64 * 1024 * 1024,
        cpuLimit: 200,
        memoryLimit: 128 * 1024 * 1024,
      },
      {
        nodeId: nodes[2]._id, // Edge Node
        podName: "edge-inference-model",
        cpuRequest: 500,
        memoryRequest: 1024 * 1024 * 1024,
        cpuLimit: 2000, // burst to 2 cores
        memoryLimit: 2 * 1024 * 1024 * 1024,
      },
    ];

    const pods = await Pod.insertMany(podsData);
    console.log(`Created ${pods.length} Pods`);

    console.log("Database Seed completed successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
