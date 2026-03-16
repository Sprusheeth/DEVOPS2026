import mongoose, { Schema, Document } from 'mongoose';

export interface IPod extends Document {
  nodeId: mongoose.Types.ObjectId;
  podName: string;
  cpuRequest: number;
  memoryRequest: number;
  cpuLimit: number;
  memoryLimit: number;
}

const PodSchema: Schema = new Schema({
  nodeId: { type: Schema.Types.ObjectId, ref: 'Node', required: true },
  podName: { type: String, required: true },
  cpuRequest: { type: Number, required: true },
  memoryRequest: { type: Number, required: true },
  cpuLimit: { type: Number, required: true },
  memoryLimit: { type: Number, required: true },
});

export default mongoose.model<IPod>('Pod', PodSchema);
