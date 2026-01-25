# Ising 2D Monorepo

This monorepo contains the following components:

- **`apps/web`**: A Nuxt.js web application for visualizing the Ising 2D model.
- **`crates/ising-core`**: A Rust library implementing the core Ising 2D model logic. (Note: Rust environment not detected, `cargo test` not yet verified.)
- **`tools/validation`**: A Python script for validating data or models.

## Setup

1.  **Install pnpm**: If you don't have pnpm installed, you can install it globally:
    ```bash
    npm install -g pnpm
    ```
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

## Running Components

### Web Application (Nuxt.js)

To start the Nuxt development server:

```bash
pnpm dev:web
```

This will launch the web application, usually accessible at `http://localhost:3000`.

### Rust Library (ising-core)

**Note**: A Rust environment with `cargo` installed is required for this component. The current environment does not have `cargo` in its PATH.

To run tests for the Rust library:

```bash
pnpm test:rust
```

### Python Validation Tool

To run the Python validation script:

```bash
pnpm run:validation
```