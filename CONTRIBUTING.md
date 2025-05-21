# Contributing to DevMarkBlog

Thank you for your interest in contributing to DevMarkBlog! This document provides guidelines and best practices for contributors.

## Development Workflow

1. Fork the repository and clone your fork
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Ensure your code passes all quality checks (see below)
5. Submit a pull request

## Code Quality Checks

### Linting

Always run linting checks before committing or pushing your changes:

```bash
npm run lint
```

### Pre-commit Hooks

We recommend installing the pre-commit hooks to automatically run these checks:

```bash
npm run prepare-hooks
```

This will install a git pre-commit hook that runs linting checks before allowing a commit.

### Continuous Integration

Our GitHub Actions workflow will run the following checks on all PRs and pushes to the main branch:
- Linting
- Building

## Pull Request Guidelines

1. Make sure your code passes all quality checks before submitting a PR
2. Keep PRs focused on a single responsibility
3. Write clear, concise commit messages
4. Include tests for new features when appropriate
5. Update documentation as needed

## Code Style

- Follow the existing code style in the project
- Use meaningful variable and function names
- Add comments only where necessary to explain complex logic

Thank you for helping improve DevMarkBlog!