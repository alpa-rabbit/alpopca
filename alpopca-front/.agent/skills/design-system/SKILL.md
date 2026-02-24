---
name: Design System Expert
description: Expert capability to apply the project's design system using Tailwind CSS v4, OKLCH color palette, and component patterns.
---

# Design System Expert

This skill provides the capability to apply the project's specific design language, ensuring consistency across the application.

## Core Technologies
- **Framework**: Tailwind CSS v4
- **Animation**: `tw-animate-css` plugin
- **Icons**: `lucide-react`
- **Utils**: `clsx`, `tailwind-merge`

## Color Palette (OKLCH)
The project uses OKLCH color spaces defined in CSS variables. Use these semantic names instead of arbitrary colors.

| Semantic Name | Usage |
|---|---|
| `bg-background` | Page background |
| `text-foreground` | Default text color |
| `bg-primary` | Primary actions (Buttons, key elements) |
| `text-primary-foreground` | Text on primary background |
| `bg-secondary` | Secondary actions |
| `bg-muted` | Muted backgrounds (e.g.,disabled states) |
| `bg-accent` | Accent highlights (hover states) |
| `bg-destructive` | Error/Delete actions |
| `border-border` | Default borders |
| `border-input` | Input field borders |
| `ring-ring` | Focus rings |

## Typography
- **Primary Font**: `Pixelify Sans` (Applied globally to `body`)
- **Retro Font**: `Press Start 2P` (Use `font-['Press_Start_2P']`)
- **Usage**: Use `Press Start 2P` for headings, scores, and buttons to emphasize the retro game feel.

## Retro/Pixel Design Rules
- **Borders**: Use thick borders `border-4` or `border-2` with `border-primary` or `border-black` to mimic 8-bit UI.
- **Shadows**: Use hard shadows (no blur) or `drop-shadow-md` to make elements pop.
- **Rounded Corners**: Avoid large rounded corners. Use `rounded-none` or `rounded-sm` for a blocky feel.
- **Effects**: Use `backdrop-blur` for overlays but keep the edges sharp.
- **Animations**: Use `hover:scale-105` or `active:scale-95` for tactile button presses.

## Component Pattern
Always use `cva` (Class Variance Authority) for component variants and `cn` for class merging.

### Standard Component Template
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

const componentVariants = cva(
  "base-styles-here (e.g., inline-flex items-center rounded-md transition-colors)",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant, size, className }))} {...props} />
  )
}

export { Component, componentVariants }
```

## Animation
Use `animate-` utilities provided by `tw-animate-css`.
Example: `animate-bounce`, `animate-fade-in`, `animate-zoom-in`.

## Dark Mode
Support dark mode using the `dark:` prefix.
Example: `bg-white dark:bg-slate-950` (or rely on semantic variables like `bg-background` which handle this automatically).
