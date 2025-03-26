# Contributing to PrismX

Thank you for your interest in contributing to PrismX! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/PrismXNetwork/PrismX.git
   cd PrismX
   ```
3. Create a new branch
4. Make your changes
5. Submit a pull request

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
PrismX/
├── backend/           # Backend services
├── frontend/         # Frontend application
├── contracts/        # Smart contracts
├── docs/            # Documentation
└── tests/           # Test files
```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

### Rust (Smart Contracts)

- Follow Rust style guide
- Use meaningful variable names
- Add documentation comments
- Keep functions small and focused
- Write unit tests for all functions

## Testing

1. Write unit tests for new features
2. Run tests before committing:
   ```bash
   npm test
   ```
3. Maintain test coverage above 80%
4. Include integration tests for API changes

## Documentation

1. Update README.md for major changes
2. Add JSDoc comments for new functions
3. Update API documentation
4. Add inline comments for complex logic

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit PR with description

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No new warnings
```

## Review Process

1. Code review by maintainers
2. Address feedback
3. Pass CI checks
4. Merge after approval

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production

## Community

- Follow us on [Twitter](https://x.com/PrismXNetwork)

## Support

For questions or help:
- Open an issue
- Email: support@prismx.network

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 