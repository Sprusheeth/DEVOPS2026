import mongoose, { Schema, Document } from 'mongoose';

export interface IMetric extends Document {
  nodeId?: mongoose.Types.ObjectId;
  podId?: mongoose.Types.ObjectId;
  cpuUsage: number;
  memoryUsage: number;
  timestamp: Date;
}

const MetricSchema: Schema = new Schema({
  nodeId: { type: Schema.Types.ObjectId, ref: 'Node', required: false },
  podId: { type: Schema.Types.ObjectId, ref: 'Pod', required: false },
  cpuUsage: { type: Number, required: true },
  memoryUsage: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMetric>('Metric', MetricSchema);
