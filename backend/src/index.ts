import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import { PrivacyEngine } from './core/privacy-engine';
import { connectDatabase } from './data/database';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;
const privacyEngine = new PrivacyEngine();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Privacy pattern endpoints
app.post('/patterns/generate', async (req, res) => {
  try {
    const pattern = await privacyEngine.generatePattern();
    res.json({
      success: true,
      pattern: {
        id: pattern.id,
        effectiveness: pattern.effectiveness,
        resourceUsage: pattern.resourceUsage,
        timestamp: pattern.timestamp,
        metadata: pattern.metadata
      }
    });
  } catch (error) {
    console.error('Error generating pattern:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate pattern'
    });
  }
});

app.get('/patterns/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pattern = await privacyEngine.getPattern(id);
    
    if (!pattern) {
      return res.status(404).json({
        success: false,
        error: 'Pattern not found'
      });
    }

    res.json({
      success: true,
      pattern: {
        id: pattern.id,
        effectiveness: pattern.effectiveness,
        resourceUsage: pattern.resourceUsage,
        timestamp: pattern.timestamp,
        metadata: pattern.metadata
      }
    });
  } catch (error) {
    console.error('Error retrieving pattern:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve pattern'
    });
  }
});

app.get('/patterns', async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count as string) : 10;
    const patterns = await privacyEngine.getPatterns(count);
    
    res.json({
      success: true,
      patterns: patterns.map(pattern => ({
        id: pattern.id,
        effectiveness: pattern.effectiveness,
        resourceUsage: pattern.resourceUsage,
        timestamp: pattern.timestamp,
        metadata: pattern.metadata
      }))
    });
  } catch (error) {
    console.error('Error retrieving patterns:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve patterns'
    });
  }
});

app.post('/patterns/:id/validate', async (req, res) => {
  try {
    const { id } = req.params;
    const isValid = await privacyEngine.validatePattern(id);
    
    res.json({
      success: true,
      isValid
    });
  } catch (error) {
    console.error('Error validating pattern:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate pattern'
    });
  }
});

app.post('/patterns/:id/metadata', async (req, res) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;

    if (!Array.isArray(tags)) {
      return res.status(400).json({
        success: false,
        error: 'Tags must be an array'
      });
    }

    const success = await privacyEngine.addPatternMetadata(id, tags);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Pattern not found'
      });
    }

    res.json({
      success: true,
      message: 'Pattern metadata updated successfully'
    });
  } catch (error) {
    console.error('Error updating pattern metadata:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update pattern metadata'
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 