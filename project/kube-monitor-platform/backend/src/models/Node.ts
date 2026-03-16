import mongoose, { Schema, Document } from 'mongoose';

export interface INode extends Document {
  clusterId: mongoose.Types.ObjectId;
  nodeName: string;
  cpuAllocatable: number;
  memoryAllocatable: number;
  status: string;
}

const NodeSchema: Schema = new Schema({
  clusterId: { type: Schema.Types.ObjectId, ref: 'Cluster', required: true },
  nodeName: { type: String, required: true },
  cpuAllocatable: { type: Number, required: true }, // in cores or millicores
  memoryAllocatable: { type: Number, required: true }, // in bytes
  status: { type: String, required: true, default: 'Ready' },
});

export default mongoose.model<INode>('Node', NodeSchema);
