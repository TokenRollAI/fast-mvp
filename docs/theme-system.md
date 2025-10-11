# Theme System Documentation

## Overview

This document describes the comprehensive theme system implemented in the Fast MVP template. All colors are now properly configured in **HSL format** for full compatibility with Tailwind CSS.

---

## Color System (HSL Format)

### Why HSL?

Tailwind CSS expects CSS variables to be in HSL format without the `hsl()` wrapper. This allows for dynamic opacity modifiers like `bg-primary/50`.

### Core Color Variables

```css
:root {
  /* Base Colors - HSL format: hue saturation lightness */
  --background: 210 100% 4%; /* Dark blue-black */
  --foreground: 0 0% 94%; /* Light grey */

  /* Component Colors */
  --card: 330 48% 12%; /* Dark purple-brown */
  --card-foreground: 0 0% 94%; /* Light grey */

  /* Brand Colors */
  --primary: 30 67% 43%; /* Warm orange-brown */
  --primary-foreground: 210 100% 4%; /* Dark background */

  --secondary: 280 17% 30%; /* Purple-grey */
  --secondary-foreground: 52 39% 48%; /* Olive yellow */

  /* State Colors */
  --destructive: 352 47% 60%; /* Pink-red */
  --muted: 0 100% 7%; /* Very dark red */
  --accent: 0 0% 94%; /* Light grey */

  /* UI Elements */
  --border: 330 26% 30%; /* Dark purple-brown */
  --input: 330 26% 30%; /* Same as border */
  --ring: 30 67% 43%; /* Same as primary */
  --radius: 0.5rem; /* Default border radius */
}
```

### Usage in Tailwind

```tsx
// Solid colors
<div className="bg-primary text-primary-foreground">
<div className="bg-card border-border">

// With opacity modifiers (now works correctly!)
<div className="bg-primary/50 hover:bg-primary/80">
<div className="text-foreground/70">
```

---

## Gradient System

### Available Gradients

All gradients use HSL colors for consistency:

- **Primary**: Orange-brown to dark brown
- **Secondary**: Purple-grey to olive yellow
- **Accent**: Pink-red to dark red
- **Warm**: Orange → Yellow → Light grey
- **Dark**: Dark blue → Purple-brown → Very dark red
- **Cool**: Purple-grey → Dark purple → Pink-red
- **Earth**: Olive → Orange-brown → Yellow

### Usage

```tsx
// Background gradients
<div className="bg-gradient-primary">
<div className="bg-gradient-warm">
<div className="bg-gradient-earth">

// Text gradients
<h1 className="text-gradient-primary">Gradient Text</h1>
<h1 className="text-gradient-cool">Cool Gradient</h1>
```

---

## Shadow System

### Warm Shadows (HSL-based)

```tsx
<div className="shadow-warm">       // Small warm shadow
<div className="shadow-warm-lg">    // Medium warm shadow
<div className="shadow-warm-xl">    // Large warm shadow
```

### Glow Effects

```tsx
<div className="glow-warm">         // Warm yellow glow
<div className="glow-primary">      // Primary orange glow
<div className="glow-accent">       // Accent pink glow
<div className="glow-cool">         // Cool purple glow
```

---

## New Utility Classes

### Glass Morphism

```tsx
// Light glass effect
<div className="glass">
  // 80% opacity background + 12px blur
</div>

// Strong glass effect
<div className="glass-strong">
  // 95% opacity background + 20px blur
</div>
```

### Backdrop Blur

```tsx
<div className="backdrop-blur-xs">      // 2px blur
<div className="backdrop-blur-light">   // 8px blur
<div className="backdrop-blur-heavy">   // 24px blur
```

### Smooth Transitions

```tsx
<button className="transition-smooth">
  // 0.3s ease-out transition
</button>

<button className="transition-bounce">
  // 0.5s bounce transition
</button>
```

### Responsive Section Padding

```tsx
<section className='section-padding'>
  // Mobile: 2rem 1rem // Tablet: 4rem 2rem // Desktop: 6rem 3rem
</section>
```

---

## Enhanced Tailwind Config

### Custom Animations

```tsx
// Fade animations
<div className="animate-fade-in">
<div className="animate-fade-out">

// Slide animations
<div className="animate-slide-in-up">
<div className="animate-slide-in-down">
<div className="animate-slide-in-left">
<div className="animate-slide-in-right">

// Scale animations
<div className="animate-scale-in">
<div className="animate-scale-out">

// Special effects
<div className="animate-bounce-in">
<div className="animate-shimmer">
<div className="animate-pulse">
<div className="animate-spin">
```

### Extended Border Radius

```tsx
<div className="rounded-sm">    // calc(0.5rem - 4px)
<div className="rounded-md">    // calc(0.5rem - 2px)
<div className="rounded-lg">    // 0.5rem
<div className="rounded-xl">    // calc(0.5rem + 4px)
<div className="rounded-2xl">   // calc(0.5rem + 8px)
<div className="rounded-3xl">   // calc(0.5rem + 12px)
```

### Custom Spacing

Additional spacing values from 18 to 98 (half-rem increments):

```tsx
<div className="p-18">  // padding: 4.5rem
<div className="m-22">  // margin: 5.5rem
<div className="gap-30"> // gap: 7.5rem
// ... up to 98
```

### Extended Font Sizes

```tsx
<p className="text-2xs">  // 0.625rem
<h1 className="text-3xl"> // 2rem
<h1 className="text-4xl"> // 2.5rem
<h1 className="text-5xl"> // 3rem
<h1 className="text-6xl"> // 3.75rem
<h1 className="text-7xl"> // 4.5rem
<h1 className="text-8xl"> // 6rem
<h1 className="text-9xl"> // 8rem
```

### Gradient Backgrounds

```tsx
// Radial gradient
<div className="bg-gradient-radial from-primary to-secondary">

// Conic gradient
<div className="bg-gradient-conic from-primary via-accent to-secondary">
```

### Inner Shadows

```tsx
<div className="shadow-inner-lg">  // Inset shadow medium
<div className="shadow-inner-xl">  // Inset shadow large
```

---

## Migration Guide

### Before (Broken)

```css
/* globals.css - OLD */
--primary: #ba7123; /* ❌ Hex format doesn't work with Tailwind */
```

```tsx
// Won't work properly
<div className="bg-primary/50">  // Opacity modifier fails
```

### After (Fixed)

```css
/* globals.css - NEW */
--primary: 30 67% 43%; /* ✅ HSL format works perfectly */
```

```tsx
// Works perfectly now
<div className="bg-primary/50">  // Opacity works!
<div className="hover:bg-primary/80">  // Dynamic opacity!
```

---

## Best Practices

1. **Always use theme colors**

   ```tsx
   // ❌ DON'T
   <div className="bg-[#ba7123]">

   // ✅ DO
   <div className="bg-primary">
   ```

2. **Use semantic color names**

   ```tsx
   // ❌ DON'T
   <div className="bg-[hsl(30,67%,43%)]">

   // ✅ DO
   <div className="bg-primary">
   ```

3. **Leverage opacity modifiers**

   ```tsx
   // ✅ Works now!
   <div className="bg-primary/10 hover:bg-primary/20">
   <div className="border-border/50">
   ```

4. **Use gradient classes**

   ```tsx
   // ❌ DON'T
   <div style={{ background: 'linear-gradient(...)' }}>

   // ✅ DO
   <div className="bg-gradient-primary">
   ```

5. **Use utility classes**

   ```tsx
   // ❌ DON'T
   <div style={{ boxShadow: '0 0 20px rgba(186, 113, 35, 0.5)' }}>

   // ✅ DO
   <div className="glow-primary">
   ```

---

## Testing

Run the development server to verify:

```bash
pnpm dev
```

All theme colors should now display correctly with proper HSL support.

---

## Color Reference Table

| Name        | Hex     | HSL         | Usage               |
| ----------- | ------- | ----------- | ------------------- |
| background  | #001014 | 210 100% 4% | Page background     |
| foreground  | #f0f0f0 | 0 0% 94%    | Text color          |
| card        | #2c0f1e | 330 48% 12% | Card backgrounds    |
| primary     | #ba7123 | 30 67% 43%  | Primary brand color |
| secondary   | #554560 | 280 17% 30% | Secondary color     |
| muted       | #230000 | 0 100% 7%   | Muted backgrounds   |
| destructive | #c56b77 | 352 47% 60% | Error/danger states |
| border      | #63384f | 330 26% 30% | Border color        |
| accent      | #f0f0f0 | 0 0% 94%    | Accent highlights   |

---

## Summary of Changes

### ✅ Fixed Issues

1. **Color Format**: Converted all CSS variables from hex to HSL format
2. **Gradient Colors**: Updated gradients to use HSL with proper `hsl()` wrapper
3. **Shadow Colors**: Converted rgba shadows to HSL format
4. **Tailwind Compatibility**: Full support for opacity modifiers now works

### ✨ New Features

1. **Glass Morphism**: `.glass` and `.glass-strong` utility classes
2. **Backdrop Blur**: `.backdrop-blur-xs/light/heavy` utilities
3. **Smooth Transitions**: `.transition-smooth` and `.transition-bounce`
4. **Responsive Padding**: `.section-padding` with mobile/tablet/desktop breakpoints
5. **Rich Animations**: 12+ new animation classes
6. **Extended Spacing**: Additional spacing values (18-98)
7. **Extended Typography**: Text sizes from 2xs to 9xl
8. **Gradient Backgrounds**: Radial and conic gradient utilities
9. **Inner Shadows**: Inset shadow utilities

---

## Support

For questions or issues with the theme system, refer to:

- Main docs: `/CLAUDE.md`
- Tailwind docs: https://tailwindcss.com/docs
- HSL Color Picker: https://hslpicker.com/
