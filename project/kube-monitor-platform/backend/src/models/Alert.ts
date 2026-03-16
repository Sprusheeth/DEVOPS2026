import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  nodeId?: mongoose.Types.ObjectId;
  podId?: mongoose.Types.ObjectId;
  message: string;
  severity: string; // e.g., 'Warning', 'Critical'
  timestamp: Date;
  resolved: boolean;
}

const AlertSchema: Schema = new Schema({
  nodeId: { type: Schema.Types.ObjectId, ref: 'Node', required: false },
  podId: { type: Schema.Types.ObjectId, ref: 'Pod', required: false },
  message: { type: String, required: true },
  severity: { type: String, required: true, enum: ['Info', 'Warning', 'Critical'] },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

export default mongoose.model<IAlert>('Alert', AlertSchema);
