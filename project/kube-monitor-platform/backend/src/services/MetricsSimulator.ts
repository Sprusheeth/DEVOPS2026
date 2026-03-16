import mongoose from 'mongoose';
import Node from '../models/Node';
import Pod from '../models/Pod';
import Metric from '../models/Metric';
import { io } from '../server';

/**
 * Simulates Kubelet -> Metrics Server -> K8s_Metrics_Collector pipeline.
 * Generates data every 5 seconds for nodes and pods.
 */
export const startMetricsSimulation = async () => {
  console.log('Starting Metrics Simulation Service (5s interval)');

  setInterval(async () => {
    try {
      // 1. Fetch all Nodes and Pods
      const nodes = await Node.find();
      const pods = await Pod.find();

      const newMetrics = [];

      // 2. Generate Node Metrics
      for (const node of nodes) {
        // Mock usage (e.g. 10% to 90% of allocatable)
        const cpuUsage = Math.floor(Math.random() * (node.cpuAllocatable * 0.8)) + (node.cpuAllocatable * 0.1);
        const memoryUsage = Math.floor(Math.random() * (node.memoryAllocatable * 0.8)) + (node.memoryAllocatable * 0.1);

        const metric = new Metric({
          nodeId: node._id,
          cpuUsage,
          memoryUsage,
          timestamp: new Date(),
        });
        
        newMetrics.push(metric);

        // Push to WebSocket clients
        io.emit('node_metric_update', {
          nodeId: node._id,
          nodeName: node.nodeName,
          cpuUsage,
          memoryUsage,
          cpuAllocatable: node.cpuAllocatable,
          memoryAllocatable: node.memoryAllocatable,
          timestamp: metric.timestamp,
        });
      }

      // 3. Generate Pod Metrics
      for (const pod of pods) {
        const cpuUsage = Math.floor(Math.random() * (pod.cpuLimit * 0.9));
        const memoryUsage = Math.floor(Math.random() * (pod.memoryLimit * 0.9));

        const metric = new Metric({
          podId: pod._id,
          cpuUsage,
          memoryUsage,
          timestamp: new Date(),
        });

        newMetrics.push(metric);

        // Push to WebSocket clients
        io.emit('pod_metric_update', {
          podId: pod._id,
          podName: pod.podName,
          nodeId: pod.nodeId,
          cpuUsage,
          memoryUsage,
          cpuLimit: pod.cpuLimit,
          memoryLimit: pod.memoryLimit,
          timestamp: metric.timestamp,
        });
      }

      // 4. Batch insert all new metrics to MongoDB
      if (newMetrics.length > 0) {
        await Metric.insertMany(newMetrics);
      }

    } catch (error) {
      console.error('Error in metrics simulation pipeline:', error);
    }
  }, 5000); // 5 seconds interval as defined in the paper
};
