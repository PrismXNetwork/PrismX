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

- **Privacy Pattern Generation**: Advanced algorithms for generating and managing privacy patterns
- **Pattern Effectiveness Tracking**: Real-time monitoring and validation of privacy patterns
- **Resource Optimization**: Efficient resource usage tracking and optimization
- **Metadata Management**: Flexible tagging and categorization of privacy patterns
- **Decentralized Storage**: Secure storage of privacy patterns across the network
- **API Integration**: RESTful API for seamless integration with other applications
- **Token Rewards**: Earn $PRX tokens for contributing to the network
- **Real-time Protection**: Dynamic application of privacy patterns to web pages
- **User Control**: Granular control over privacy settings and pattern application

## Quick Start

1. **Install the Extension**
   - Download the latest release from [GitHub](https://github.com/PrismXNetwork/prismx-extension/releases)
   - Open Chrome and go to `chrome://extensions/`
   - Enable Developer mode
   - Load the unpacked extension

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
- **Wallet Integration**: Solana wallet adapters (@solana/wallet-adapter)
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

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

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

1. Download the latest beta release from [GitHub Releases](https://github.com/PrismXNetwork/prismx-extension/releases)
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked" and select the downloaded extension
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

- [Discord Community](https://discord.gg/prismx)
- [GitHub Issues](https://github.com/PrismXNetwork/prismx-extension/issues)
- Email: support@prismx.network
- Security Issues: security@prismx.network

Built with ❤️ by the PrismX Team