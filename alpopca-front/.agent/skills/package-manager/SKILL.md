---
name: Package Manager Rules
description: Rules for package management, enforcing Yarn usage.
---

# Package Manager Rules

This project exclusively uses **Yarn** for package management.

## Rules

1.  **Installation**:
    -   Use `yarn add <package>` for production dependencies.
    -   Use `yarn add -D <package>` for development dependencies.
    -   **NEVER** use `npm install`.

2.  **Removal**:
    -   Use `yarn remove <package>`.

3.  **Scripts**:
    -   Use `yarn <script>` (e.g., `yarn dev`, `yarn build`).
    -   Do not use `npm run`.

4.  **Lockfile**:
    -   Maintain `yarn.lock`.
    -   Ignore `package-lock.json` if it exists.
