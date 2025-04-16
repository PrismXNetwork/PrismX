# PrismX Network

<div align="center">
  <img src="./assets/logo.svg" alt="PrismX Logo" width="250">

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Website](https://img.shields.io/badge/Website-prismx.network-blue)](https://www.prismx.network)
  [![Twitter](https://img.shields.io/badge/Twitter-@PrismXNetwork-blue)](https://x.com/PrismXNetwork)
  [![GitHub](https://img.shields.io/badge/GitHub-PrismXNetwork-blue)](https://github.com/PrismXNetwork/PrismX)
</div>

PrismX Network is a decentralized privacy-enhancing platform that leverages blockchain technology to create a distributed network of privacy patterns. The platform enables users to contribute their browsing data to generate privacy patterns while earning rewards in the form of $PRX tokens.

## Features

### Privacy Pattern Generation
- **Advanced Pattern Recognition**: Utilizes machine learning algorithms to identify and generate effective privacy patterns from user browsing data
- **Pattern Validation**: Continuous validation of patterns through distributed network consensus
- **Dynamic Updates**: Real-time pattern updates based on emerging privacy threats
- **Custom Rules**: Create and share your own privacy protection rules

### Privacy Shield System
- **Real-time Protection**: Instant application of privacy patterns to web pages
- **Multi-layer Defense**: Combines multiple protection strategies:
  - Network traffic obfuscation
  - Browser fingerprint randomization
  - Request pattern modification
  - Metadata scrubbing
- **Smart Shield Strength**: Adaptive protection levels based on website risk assessment
- **Performance Optimization**: Minimal impact on browsing speed while maintaining protection

### Network Contribution
- **Distributed Pattern Storage**: Secure storage of privacy patterns across the network
- **Contribution Tracking**: Precise measurement of user contributions to the network
- **Resource Management**: Efficient allocation and usage of network resources
- **Network Health Monitoring**: Real-time metrics on pattern effectiveness

### Token Economy
- **$PRX Token Rewards**: Earn tokens for:
  - Contributing privacy patterns
  - Validating pattern effectiveness
  - Network resource sharing
  - Community participation
- **Dynamic Reward System**: Rewards adjusted based on:
  - Pattern quality
  - Network contribution size
  - Validation accuracy
  - Shield strength maintenance

### User Control & Privacy
- **Granular Settings**: Fine-tune protection levels for different websites
- **Privacy Dashboard**: Monitor and manage your privacy status
- **Contribution Analytics**: Track your network contributions and rewards
- **Custom Exceptions**: Create allowlists for trusted websites

### Technical Features
- **Blockchain Integration**: Secure and transparent reward distribution
- **API Support**: RESTful API for third-party integrations
- **Resource Optimization**: Efficient CPU and memory usage
- **Automatic Updates**: Seamless updates to privacy patterns and rules

## Quick Start

1. **Install the Extension**
   - Download the latest beta release from the releases page
   - Open Chrome and go to `chrome://extensions/`
   - Enable Developer mode
   - Load the unpacked extension from the `beta/v0.7.1.2` directory

2. **Configure Settings**
   - Click the PrismX icon in your browser toolbar
   - Adjust privacy settings and pattern preferences
   - Connect your wallet to start earning rewards

3. **Start Earning**
   - Browse normally while the extension runs in the background
   - Monitor your earnings in the extension popup
   - Withdraw rewards to your connected wallet

## Technical Stack

### Frontend
- **Framework**: React with Next.js for server-side rendering
- **State Management**: Redux with Redux Toolkit
- **UI Components**: Material-UI with custom theming
- **Wallet Integration**: Solana wallet adapters
- **API Integration**: Axios, SWR for data fetching

### Backend
- **Runtime**: Node.js with Express.js framework
- **API Documentation**: OpenAPI (Swagger)
- **Authentication**: JWT with multi-factor authentication
- **Database**: MongoDB for pattern storage, Redis for caching
- **File Storage**: IPFS for decentralized storage

### Blockchain Infrastructure
- **Primary Network**: Solana (mainnet and devnet)
- **Smart Contracts**: Rust using Anchor framework
- **Testing Framework**: Jest for unit & integration testing
- **Token Standard**: SPL Token

## Development

### Prerequisites
- Node.js 18+
- Chrome browser
- Git
- MongoDB (v5+)
- Solana CLI tools
- Anchor framework

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/PrismXNetwork/prismx-extension.git
   cd prismx-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `dist/extension` directory

### Project Structure

```
prismx-extension/
├── src/
│   ├── extension/     # Browser extension code
│   ├── core/         # Core privacy engine
│   ├── api/          # API integration
│   └── types/        # TypeScript type definitions
├── dist/             # Built extension files
└── scripts/          # Build and utility scripts
```

## Beta Testing

We're currently in beta! Join our testing program to:
- Get early access to new features
- Help shape the future of privacy
- Earn bonus PRX tokens
- Provide direct feedback

### Beta Installation

1. Download the latest beta release from [GitHub Releases](https://github.com/PrismXNetwork/PrismX/releases/tag/v0.7.1.2-beta)
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked" and select the `beta/v0.7.1.2` directory
5. Start using PrismX Privacy Shield!

### Beta Features

- Real-time privacy protection
- PRX token earning
- Network contribution tracking
- Enhanced protection modes
- Custom privacy rules

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions, help, or security issues:
- Open an issue in this repository
- Email: support@prismx.network

Built with ❤️ by the PrismX Team