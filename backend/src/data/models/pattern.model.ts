import mongoose, { Schema, Document } from 'mongoose';

export interface IPattern extends Document {
  id: string;
  data: Buffer;
  effectiveness: number;
  resourceUsage: number;
  timestamp: number;
  metadata?: {
    source: string;
    tags: string[];
    usageCount: number;
  };
}

const PatternSchema = new Schema<IPattern>({
  id: { type: String, required: true, unique: true },
  data: { type: Buffer, required: true },
  effectiveness: { type: Number, required: true, min: 0, max: 1 },
  resourceUsage: { type: Number, required: true, min: 0, max: 1 },
  timestamp: { type: Number, required: true },
  metadata: {
    source: { type: String, default: 'local' },
    tags: [{ type: String }],
    usageCount: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
PatternSchema.index({ effectiveness: -1 });
PatternSchema.index({ timestamp: -1 });
PatternSchema.index({ 'metadata.tags': 1 });

export const Pattern = mongoose.model<IPattern>('Pattern', PatternSchema); 