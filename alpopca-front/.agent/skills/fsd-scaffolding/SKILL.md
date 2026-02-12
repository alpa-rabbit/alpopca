---
name: FSD Scaffolding Expert
description: Expert capability to scaffold new features, entities, and widgets following Feature-Sliced Design (FSD) architecture.
---

# FSD Scaffolding Expert

This skill provides the capability to create new code slices (features, entities, widgets) in the project following the Feature-Sliced Design (FSD) methodology.

## Usage

When the user asks to "create a new feature", "add an entity", or "scaffold a widget", use this skill to generate the correct file structure and boilerplate code.

## Directory Structure

For a new slice named `GenericName` in a layer (e.g., `features`, `entities`, `widgets`, `pages`):

```
src/<layer>/<GenericName>/
├── ui/                 # UI components (dumb components)
│   ├── GenericName.tsx # Main component
│   └── index.ts       # Public API for UI
├── model/              # Business logic (hooks, state, stores)
│   ├── useGenericName.ts
│   └── types.ts
├── api/                # API requests (optional)
│   └── genericNameApi.ts
├── lib/                # Helper functions (optional)
│   └── utils.ts
└── index.ts            # Public API (Entry point)
```

## Step-by-Step Implementation

1.  **Identify the Layer**: Determine if the request is for a `feature` (user scenario), `entity` (business object), `widget` (composition of features/entities), or `page`.
2.  **Create Directory**: Create the directory `src/<layer>/<slice-name>`.
3.  **Create Subdirectories**: Create `ui`, `model`, and optionally `api` folders inside.
4.  **Create Main Component**:
    - File: `src/<layer>/<slice-name>/ui/<SliceName>.tsx`
    - Template:
      ```tsx
      import { useSliceName } from '../model/useSliceName';

      interface SliceNameProps {
        className?: string;
      }

      export const SliceName = ({ className }: SliceNameProps) => {
        const { data } = useSliceName();

        return (
          <div className={className}>
            {/* Component logic */}
            <h2>SliceName Component</h2>
          </div>
        );
      };
      ```
5.  **Create Model Hook**:
    - File: `src/<layer>/<slice-name>/model/useSliceName.ts`
    - Template:
      ```ts
      import { useState } from 'react';

      export const useSliceName = () => {
        const [data, setData] = useState(null);

        return {
          data,
        };
      };
      ```
6.  **Create Public API (Barrel File)**:
    - File: `src/<layer>/<slice-name>/index.ts`
    - Template:
      ```ts
      export { SliceName } from './ui/SliceName';
      // export other public members if needed
      ```

## Naming Conventions
- **Folders**: camelCase (e.g., `userProfile`, `rankingList`)
- **Components**: PascalCase (e.g., `UserProfile`, `RankingList`)
- **Hooks**: camelCase with `use` prefix (e.g., `useUserProfile`)

## Example Request
"Create a new feature called 'commentSection'."

**Action**:
1. Create `src/features/commentSection/`
2. Create `src/features/commentSection/ui/CommentSection.tsx`
3. Create `src/features/commentSection/model/useCommentSection.ts`
4. Create `src/features/commentSection/index.ts` exporting `CommentSection`
