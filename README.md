# Startpage Dashboard

A minimal, self-hosted startpage dashboard for organizing your bookmarks and services. Configure everything through a simple YAML file.

## Features

- **YAML Configuration** - No database, no complex setup. Just edit one file.
- **Theme Presets** - Nord, Catppuccin, Dracula, Gruvbox, Tokyo Night, Rose Pine
- **Health Monitoring** - Automatic status checks for your services
- **Widgets** - Clock, search bar, and more
- **Responsive** - Works on desktop and mobile
- **Docker Ready** - Mount your config and go

## Quick Start

### Using Docker (Recommended)

```bash
# Create config directory
mkdir -p config

# Create your configuration
cat > config/dashboard.yaml << 'EOF'
theme:
  preset: 'dracula'
  mode: 'dark'

display:
  columns: 1
  greeting:
    enabled: true
    locale: 'en'
  datetime:
    enabled: true
    locale: 'en-US'
    hour12: false
    showSeconds: true
    dateFormat: 'full'
  healthCheck:
    enabled: true
    interval: 60
    timeout: 5000
    showStatus: true

sections:
  - name: 'Apps'
    items:
      - name: 'GitHub'
        url: 'https://github.com'
        icon: 'github'

widgets:
  - type: 'clock'
    position: 'top-left'
    config:
      showDate: true

  - type: 'search'
    position: 'top-center'
    config:
      engine: 'duckduckgo'
      placeholder: 'Search...'
EOF

# Run with Docker
docker run -d \
  --name dashboard \
  -p 5005:3000 \
  -v $(pwd)/config:/config \
  dashboard:latest
```

Open http://localhost:5005

### Using Docker Compose

```yaml
# docker-compose.yaml
services:
  dashboard:
    build: .
    ports:
      - '5005:3000'
    volumes:
      - ./config:/config
    restart: unless-stopped
```

```bash
docker compose up -d
```

### Manual Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Run production build
bun ./build/index.js
```

## Configuration

All settings live in `config/dashboard.yaml`. The dashboard reloads config on each page refresh.

### Theme

```yaml
theme:
  preset: 'dracula' # nord, catppuccin, dracula, gruvbox, tokyo-night, rose-pine
  mode: 'dark' # light, dark, system
```

### Display Settings

```yaml
display:
  columns: 4 # Number of section columns (1-6)

  greeting:
    enabled: true
    locale: 'en' # en, de, fr, es, it, pt, nl, pl, ru, ja, zh, ko

  datetime:
    enabled: true
    locale: 'en-US'
    hour12: false
    showSeconds: true
    dateFormat: 'full' # full, long, medium, short

  healthCheck:
    enabled: true
    interval: 60 # Check every 60 seconds
    timeout: 5000 # 5 second timeout
    showStatus: true # Show status dots on items
```

### Sections

Organize your bookmarks into sections:

```yaml
sections:
  - name: 'Media'
    icon: 'tv' # Optional Lucide icon for header
    items:
      - name: 'Jellyfin'
        url: 'https://jellyfin.example.com'
        icon: 'play-circle'
        description: 'Media server' # Shows on hover

      - name: 'Sonarr'
        url: 'https://sonarr.example.com'
        icon: 'tv'

  - name: 'Tools'
    items:
      - name: 'Portainer'
        url: 'https://portainer.example.com'
        icon: 'container'
```

### Icons

Icons use [Lucide](https://lucide.dev/icons). Use the icon name in kebab-case:

- `home`, `settings`, `search`
- `tv`, `film`, `music`
- `cloud`, `download`, `upload`
- `github`, `mail`, `rss`
- `check-circle`, `layout-grid`, `refresh-cw`

If no icon is specified, the first letter of the name is shown.

### Widgets

#### Clock Widget

```yaml
widgets:
  - type: 'clock'
    position: 'top-left' # top-left, top-center, top-right, bottom-*
    config:
      showDate: true
      showAnalog: false
```

#### Search Widget

```yaml
widgets:
  - type: 'search'
    position: 'top-center'
    config:
      engine: 'duckduckgo' # google, duckduckgo, brave
      placeholder: 'Search the web...'
```

#### Weather Widget

Requires an [OpenWeatherMap API key](https://openweathermap.org/api):

```yaml
widgets:
  - type: 'weather'
    position: 'top-right'
    variant: 'icon-info'
    refreshInterval: 900 # 15 minutes
    config:
      apiKey: '${WEATHER_API_KEY}' # Use environment variable
      location: 'Berlin,DE'
      units: 'metric'
```

### Environment Variables

Use `${VAR_NAME}` syntax in YAML to reference environment variables:

```yaml
config:
  apiKey: '${MY_API_KEY}'
```

Then set the variable:

```bash
docker run -e MY_API_KEY=your-key-here ...
```

## Health Monitoring

When `healthCheck.enabled` is `true`, the dashboard periodically checks if your services are reachable:

- **Green dot** - Service is online
- **Red dot** - Service is unreachable
- **Gray dot** - Status unknown

The dashboard makes HEAD requests to each URL. Services behind authentication may show as unreachable unless they respond to unauthenticated requests.

## Theme Reference

| Theme       | Description                    |
| ----------- | ------------------------------ |
| nord        | Cool, bluish arctic colors     |
| catppuccin  | Soothing pastel theme          |
| dracula     | Dark purple with vibrant pops  |
| gruvbox     | Retro groove with warm colors  |
| tokyo-night | Dark theme inspired by Tokyo   |
| rose-pine   | Natural, muted dark theme      |

## Development

```bash
# Install dependencies
bun install

# Start dev server with hot reload
bun run dev

# Type check
bun run check

# Lint
bun run lint

# Format
bun run format

# Build
bun run build
```

### Project Structure

```
config/
└── dashboard.yaml       # Your configuration

src/
├── routes/
│   ├── +page.svelte     # Main dashboard page
│   └── api/             # API endpoints
├── lib/
│   ├── components/      # Svelte components
│   ├── themes/          # Theme presets
│   ├── server/          # Config loading
│   └── types/           # TypeScript types
```

### Adding Icons

Icons are loaded dynamically from Lucide. Common icons are pre-bundled for performance. To add more, edit `src/lib/utils/icons.ts`.

## Troubleshooting

### Config not loading

- Check that `config/dashboard.yaml` exists
- Verify YAML syntax is valid
- Check Docker volume mount: `-v $(pwd)/config:/config`

### Icons not showing

- Use valid Lucide icon names (kebab-case)
- Check browser console for errors

### Health checks failing

- Ensure services are accessible from the dashboard container
- Check `timeout` setting (default 5000ms)
- Services requiring authentication may fail health checks

## License

MIT
