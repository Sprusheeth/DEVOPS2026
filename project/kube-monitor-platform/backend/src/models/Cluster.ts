import mongoose, { Schema, Document } from 'mongoose';

export interface ICluster extends Document {
  clusterName: string;
  location: string;
  createdAt: Date;
}

const ClusterSchema: Schema = new Schema({
  clusterName: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICluster>('Cluster', ClusterSchema);
