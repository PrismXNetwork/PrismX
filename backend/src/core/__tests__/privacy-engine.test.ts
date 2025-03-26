import { describe, expect, it, beforeEach, afterAll, beforeAll } from '@jest/globals';
import mongoose from 'mongoose';
import { PrivacyEngine } from '../privacy-engine';
import { Pattern } from '../../data/models/pattern.model';
import { config } from 'dotenv';

config();

describe('PrivacyEngine', () => {
  let engine: PrivacyEngine;

  beforeAll(async () => {
    // Connect to test database
    const testDbUri = process.env.MONGODB_URI?.replace('prismx', 'prismx_test') || 'mongodb://localhost:27017/prismx_test';
    await mongoose.connect(testDbUri);
  });

  afterAll(async () => {
    // Clean up and disconnect
    await Pattern.deleteMany({});
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear database before each test
    await Pattern.deleteMany({});
    engine = new PrivacyEngine();
  });

  describe('generatePattern', () => {
    it('should generate a valid pattern', async () => {
      const pattern = await engine.generatePattern();

      expect(pattern).toBeDefined();
      expect(pattern.id).toBeDefined();
      expect(pattern.data).toBeDefined();
      expect(pattern.effectiveness).toBeGreaterThanOrEqual(0);
      expect(pattern.effectiveness).toBeLessThanOrEqual(1);
      expect(pattern.resourceUsage).toBeGreaterThanOrEqual(0);
      expect(pattern.resourceUsage).toBeLessThanOrEqual(1);
      expect(pattern.timestamp).toBeLessThanOrEqual(Date.now());
      expect(pattern.metadata).toBeDefined();
      expect(pattern.metadata?.source).toBe('local');
      expect(pattern.metadata?.tags).toEqual([]);
      expect(pattern.metadata?.usageCount).toBe(0);
    });

    it('should generate unique patterns', async () => {
      const pattern1 = await engine.generatePattern();
      const pattern2 = await engine.generatePattern();

      expect(pattern1.id).not.toBe(pattern2.id);
      expect(pattern1.data).not.toEqual(pattern2.data);
    });
  });

  describe('getPattern', () => {
    it('should return a pattern by id', async () => {
      const pattern = await engine.generatePattern();
      const retrieved = await engine.getPattern(pattern.id);

      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(pattern.id);
      expect(retrieved?.data).toEqual(pattern.data);
    });

    it('should return undefined for non-existent pattern', async () => {
      const retrieved = await engine.getPattern('non-existent-id');
      expect(retrieved).toBeUndefined();
    });

    it('should increment usage count when retrieving pattern', async () => {
      const pattern = await engine.generatePattern();
      await engine.getPattern(pattern.id);
      
      const updatedPattern = await Pattern.findOne({ id: pattern.id });
      expect(updatedPattern?.metadata?.usageCount).toBe(1);
    });
  });

  describe('getPatterns', () => {
    it('should return specified number of patterns', async () => {
      // Generate some patterns
      for (let i = 0; i < 5; i++) {
        await engine.generatePattern();
      }

      const patterns = await engine.getPatterns(3);
      expect(patterns).toHaveLength(3);
    });

    it('should return patterns sorted by effectiveness', async () => {
      // Generate some patterns
      for (let i = 0; i < 5; i++) {
        await engine.generatePattern();
      }

      const patterns = await engine.getPatterns();
      for (let i = 1; i < patterns.length; i++) {
        expect(patterns[i - 1].effectiveness).toBeGreaterThanOrEqual(patterns[i].effectiveness);
      }
    });
  });

  describe('validatePattern', () => {
    it('should validate existing pattern', async () => {
      const pattern = await engine.generatePattern();
      const isValid = await engine.validatePattern(pattern.id);
      expect(isValid).toBe(true);
    });

    it('should return false for non-existent pattern', async () => {
      const isValid = await engine.validatePattern('non-existent-id');
      expect(isValid).toBe(false);
    });

    it('should delete invalid patterns', async () => {
      const pattern = await engine.generatePattern();
      
      // Modify pattern data to make it invalid
      await Pattern.updateOne(
        { id: pattern.id },
        { $set: { data: Buffer.from('invalid') } }
      );

      const isValid = await engine.validatePattern(pattern.id);
      expect(isValid).toBe(false);

      const deletedPattern = await Pattern.findOne({ id: pattern.id });
      expect(deletedPattern).toBeNull();
    });
  });

  describe('addPatternMetadata', () => {
    it('should add tags to pattern metadata', async () => {
      const pattern = await engine.generatePattern();
      const tags = ['test', 'privacy'];
      
      const success = await engine.addPatternMetadata(pattern.id, tags);
      expect(success).toBe(true);

      const updatedPattern = await Pattern.findOne({ id: pattern.id });
      expect(updatedPattern?.metadata?.tags).toEqual(tags);
    });

    it('should return false for non-existent pattern', async () => {
      const success = await engine.addPatternMetadata('non-existent-id', ['test']);
      expect(success).toBe(false);
    });

    it('should not duplicate tags', async () => {
      const pattern = await engine.generatePattern();
      const tags = ['test', 'privacy'];
      
      await engine.addPatternMetadata(pattern.id, tags);
      await engine.addPatternMetadata(pattern.id, tags);

      const updatedPattern = await Pattern.findOne({ id: pattern.id });
      expect(updatedPattern?.metadata?.tags).toEqual(tags);
    });
  });
}); 