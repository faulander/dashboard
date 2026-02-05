# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Startpage Dashboard** application - a customizable homepage with sections, widgets, and theme presets. All configuration is done via YAML file at `/config/dashboard.yaml`.

## Development Commands

```bash
bun dev              # Start development server
bun dev --open       # Start dev server and open browser
bun run build        # Build for production (outputs to /build)
bun preview          # Preview production build locally
bun check            # Run svelte-check for type errors
bun check:watch      # Run svelte-check in watch mode
bun lint             # Run ESLint
bun lint:fix         # Run ESLint with auto-fix
bun format           # Format code with Prettier
bun format:check     # Check formatting without changes
```

## Tech Stack

- **Framework:** SvelteKit 2.x with Svelte 5 (uses runes syntax: `$state`, `$props`, `$derived`, etc.)
- **Runtime & Package Manager:** Bun
- **Configuration:** YAML (parsed with `yaml` package, validated with Zod)
- **Styling:** TailwindCSS 4.x with CSS variables for theming
- **Icons:** Lucide Svelte (`@lucide/svelte`) - dynamically loaded
- **Adapter:** Bun adapter (`svelte-adapter-bun`) for server deployment
- **Type Checking:** TypeScript with strict mode enabled

## Architecture

### Project Structure

```
config/
└── dashboard.yaml         # Main configuration file

src/lib/
├── server/                # Server-only code
│   ├── config.ts          # YAML loader
│   ├── config.schema.ts   # Zod validation
│   └── env-substitution.ts
├── types/                 # TypeScript definitions
│   ├── config.ts
│   └── widgets.ts
├── utils/                 # Utility functions
│   ├── greeting.ts        # Time-based greeting i18n
│   ├── datetime.ts        # Date/time formatting
│   └── icons.ts           # Dynamic icon loading
├── themes/                # Theme system
│   ├── index.ts
│   ├── apply-theme.ts
│   └── presets/           # Theme presets (nord, catppuccin, etc.)
└── components/
    ├── dashboard/         # Main dashboard components
    │   ├── greeting.svelte
    │   ├── datetime-display.svelte
    │   ├── section.svelte
    │   ├── section-item.svelte
    │   └── sections-grid.svelte
    └── widgets/           # Widget components
        ├── widget-container.svelte
        ├── widget-registry.ts
        ├── search-widget.svelte
        ├── weather-widget.svelte
        ├── clock-widget.svelte
        └── custom-widget.svelte

src/routes/
├── +layout.svelte         # Root layout (theme injection)
├── +layout.server.ts      # Config loading
├── +page.svelte           # Main dashboard page
└── api/widget/[type]/     # Widget data proxy endpoint
```

### Configuration

All settings are in `config/dashboard.yaml`:

```yaml
theme:
  preset: "nord"  # nord, catppuccin, dracula, gruvbox, tokyo-night, rose-pine
  mode: "dark"    # light, dark, system

display:
  columns: 4
  greeting:
    enabled: true
    locale: "en"  # en, de, fr, es, it, pt, nl, pl, ru, ja, zh, ko
  datetime:
    enabled: true
    locale: "en-US"
    hour12: false
    showSeconds: true
    dateFormat: "full"

sections:
  - name: "Applications"
    icon: "layout-grid"  # Optional Lucide icon
    items:
      - name: "App Name"
        url: "https://example.com"
        icon: "home"  # Lucide icon name

widgets:
  - type: "search"
    position: "top-center"
    config:
      engine: "duckduckgo"
      placeholder: "Search..."
```

### Theme System

Themes use OKLCH color values and support light/dark modes. Available presets:
- `nord` - Arctic, bluish colors
- `catppuccin` - Pastel colors
- `dracula` - Purple/pink accent
- `gruvbox` - Retro, warm colors
- `tokyo-night` - Blue/purple night theme
- `rose-pine` - Natural, muted colors

### Widget System

Widgets are dynamically loaded components. Supported types:
- `search` - Search bar with configurable engine
- `weather` - Weather display (requires OpenWeatherMap API key)
- `clock` - Analog/digital clock
- `custom` - Generic API data display

Widget positions: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

### Icon Loading

Icons are loaded dynamically from `@lucide/svelte/icons/[name]`:

```typescript
import { loadIcon } from '$lib/utils/icons';
const HomeIcon = await loadIcon('home');
```

### Environment Variables

Use `${VAR_NAME}` in YAML for env var substitution:

```yaml
widgets:
  - type: "weather"
    config:
      apiKey: "${WEATHER_API_KEY}"
```

## Docker Deployment

```bash
# Build and run
docker build -t startpage .
docker run -p 3000:3000 -v $(pwd)/config:/config startpage

# Or with docker-compose
docker-compose up -d
```

The `/config` directory is mounted as a volume for easy configuration changes.

## Adding New Features

### Adding a New Theme Preset

1. Create `src/lib/themes/presets/my-theme.ts`
2. Export `myTheme: ThemePreset` with `light` and `dark` color values
3. Add export to `src/lib/themes/index.ts`
4. Add to `themePresets` map in `src/lib/themes/apply-theme.ts`

### Adding a New Widget

1. Create `src/lib/components/widgets/my-widget.svelte`
2. Add type to `WidgetType` in `widget-registry.ts`
3. Add import to `widgetComponents` map
4. If server data needed, add case to `/api/widget/[type]/+server.ts`

### Adding a New Greeting Locale

Add entry to `greetings` object in `src/lib/utils/greeting.ts`
