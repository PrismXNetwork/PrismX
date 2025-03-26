import { randomBytes } from 'crypto';
import { Pattern, IPattern } from '../data/models/pattern.model';

interface PatternData {
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

export class PrivacyEngine {
  private readonly patternSize = 1024; // 1KB patterns
  private readonly maxPatterns = 1000;

  constructor() {
    this.initializePatterns();
  }

  private async initializePatterns(): Promise<void> {
    try {
      const count = await Pattern.countDocuments();
      if (count === 0) {
        // Generate initial set of patterns if database is empty
        for (let i = 0; i < 10; i++) {
          await this.generatePattern();
        }
      }
    } catch (error) {
      console.error('Error initializing patterns:', error);
    }
  }

  public async generatePattern(): Promise<PatternData> {
    const id = randomBytes(16).toString('hex');
    const data = randomBytes(this.patternSize);
    const effectiveness = this.measureEffectiveness(data);
    const resourceUsage = this.measureResourceUsage(data);

    const patternData: PatternData = {
      id,
      data,
      effectiveness,
      resourceUsage,
      timestamp: Date.now(),
      metadata: {
        source: 'local',
        tags: [],
        usageCount: 0
      }
    };

    try {
      await Pattern.create(patternData);
      await this.cleanupOldPatterns();
    } catch (error) {
      console.error('Error saving pattern:', error);
      throw new Error('Failed to generate pattern');
    }

    return patternData;
  }

  private measureEffectiveness(data: Buffer): number {
    // Basic effectiveness measurement based on entropy
    const entropy = this.calculateEntropy(data);
    return Math.min(1, entropy / 8); // Normalize to 0-1
  }

  private calculateEntropy(data: Buffer): number {
    const frequency = new Array(256).fill(0);
    for (const byte of data) {
      frequency[byte]++;
    }

    let entropy = 0;
    for (const freq of frequency) {
      if (freq > 0) {
        const p = freq / data.length;
        entropy -= p * Math.log2(p);
      }
    }

    return entropy;
  }

  private measureResourceUsage(data: Buffer): number {
    // Basic resource usage measurement based on size and processing time
    return data.length / this.patternSize;
  }

  private async cleanupOldPatterns(): Promise<void> {
    try {
      const count = await Pattern.countDocuments();
      if (count > this.maxPatterns) {
        // Find the timestamp of the oldest pattern to keep
        const patternsToKeep = await Pattern.find()
          .sort({ timestamp: -1 })
          .limit(this.maxPatterns);
        
        if (patternsToKeep.length > 0) {
          const oldestTimestamp = patternsToKeep[patternsToKeep.length - 1].timestamp;
          
          // Delete patterns older than the oldest pattern to keep
          await Pattern.deleteMany({
            timestamp: { $lt: oldestTimestamp }
          });
        }
      }
    } catch (error) {
      console.error('Error cleaning up old patterns:', error);
    }
  }

  public async getPattern(id: string): Promise<PatternData | undefined> {
    try {
      const pattern = await Pattern.findOne({ id });
      if (!pattern) return undefined;

      // Increment usage count
      await Pattern.updateOne(
        { id },
        { $inc: { 'metadata.usageCount': 1 } }
      );

      return pattern.toObject();
    } catch (error) {
      console.error('Error retrieving pattern:', error);
      return undefined;
    }
  }

  public async getPatterns(count: number = 10): Promise<PatternData[]> {
    try {
      const patterns = await Pattern.find()
        .sort({ effectiveness: -1 })
        .limit(count);
      
      return patterns.map(pattern => pattern.toObject());
    } catch (error) {
      console.error('Error retrieving patterns:', error);
      return [];
    }
  }

  public async validatePattern(id: string): Promise<boolean> {
    try {
      const pattern = await Pattern.findOne({ id });
      if (!pattern) return false;

      // Basic validation: check if pattern still meets effectiveness threshold
      const currentEffectiveness = this.measureEffectiveness(pattern.data);
      const isValid = currentEffectiveness >= pattern.effectiveness * 0.8; // Allow 20% degradation

      if (!isValid) {
        // If pattern is invalid, delete it
        await Pattern.deleteOne({ id });
      }

      return isValid;
    } catch (error) {
      console.error('Error validating pattern:', error);
      return false;
    }
  }

  public async addPatternMetadata(id: string, tags: string[]): Promise<boolean> {
    try {
      const result = await Pattern.updateOne(
        { id },
        { $addToSet: { 'metadata.tags': { $each: tags } } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error adding pattern metadata:', error);
      return false;
    }
  }
} 