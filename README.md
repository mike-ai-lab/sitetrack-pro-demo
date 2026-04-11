# StreetTracker - Real-Time Route Planning & Recording

A professional web application for route planning, GPS tracking, and trip recording with interactive map visualization.

## Overview

StreetTracker is a browser-based mapping application that combines route planning with real-time GPS recording capabilities. Built for Riyadh, Saudi Arabia, it provides an intuitive interface for planning trips, recording journeys, and reviewing travel history.

## Core Features

### Route Planning
- Interactive map-based waypoint selection
- Automatic route calculation using real street networks
- Adjustable playback speed (Traffic, Normal, Express)
- Live trip simulation with animated car marker
- Pause/resume/end trip controls
- Real-time distance and duration tracking

### GPS Recording
- Live GPS tracking with position updates
- Simulation mode for testing without GPS
- Automatic street segment tracking
- New vs. revisited street detection
- Station/waypoint logging with timestamps
- Session saving with detailed metadata

### Map Features
- Google Maps integration (Roadmap & Satellite views)
- Traffic layer overlay
- User location detection
- Smooth map animations
- Touch-optimized for mobile devices
- Responsive design for all screen sizes

### History Management
- Session history with route previews
- Detailed trip statistics
- Station-by-station breakdown
- Replay functionality
- Address geocoding for all locations
- Paginated history view

## Technical Stack

- **Mapping**: Leaflet.js 1.9.4
- **Routing**: Leaflet Routing Machine 3.2.12 with OSRM
- **Tiles**: Google Maps (Roadmap, Satellite, Traffic)
- **Geocoding**: Nominatim (OpenStreetMap)
- **Styling**: Tailwind CSS
- **Architecture**: Modular component-based design

## Project Structure

```
streettracker/
├── index.html          # Main application file
├── panel.js            # Modular control panel component
├── config.js           # API configuration
├── server.js           # Local development server
├── package.json        # Project metadata
├── vercel.json         # Vercel deployment config
└── docs/
    ├── INTEGRATION-GUIDE.md
    ├── PANEL-REFACTOR-SUMMARY.md
    └── USER-GUIDE.md
```

## Quick Start

### Local Development

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Allow location access when prompted (optional)

### Using Node.js Server

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires ES6 support and CSS backdrop-filter.

## Configuration

Edit `config.js` to update API keys:

```javascript
const CONFIG = {
    TOMTOM_API_KEY: 'your-api-key-here'
};
```

**Note**: Ensure `config.js` is in `.gitignore` to protect API keys.

## Usage Modes

### Planner Mode
1. Click on map to set pickup location
2. Click again to set destination
3. Route calculates automatically
4. Adjust speed slider if desired
5. Click Start to begin trip simulation

### Recorder Mode
1. Enable location access or use simulation mode
2. Click Start Recording
3. Click on map to add waypoints (simulation)
4. Recording tracks distance, time, and streets
5. Click Stop Recording when finished
6. Save session to history

### History Mode
1. View all recorded sessions
2. Click "View Details" to see full trip data
3. Review stations and timestamps
4. Click "Replay Recording" to visualize route
5. Use "Maximize" for full-screen history view

## Mobile Optimization

- Touch-friendly 48px minimum tap targets
- Responsive panel sizing
- Optimized button placement
- Safe area considerations for mobile browsers
- Smooth touch gestures for map interaction

## Development

### Component Architecture

The application uses a modular component system:

- **PanelComponent** (`panel.js`): Self-contained UI panel with state management
- **Map Integration** (`index.html`): Leaflet map with custom controls
- **State Synchronization**: Global state management for cross-component communication

See `INTEGRATION-GUIDE.md` for detailed developer documentation.

## License

ISC

## Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[User Guide](docs/USER-GUIDE.md)** - Complete guide for end users
- **[Integration Guide](docs/INTEGRATION-GUIDE.md)** - Technical documentation for developers
- **[Refactoring Summary](docs/PANEL-REFACTOR-SUMMARY.md)** - Architecture and design decisions

See [docs/README.md](docs/README.md) for a complete documentation index.

## Support

For issues or questions, please refer to the documentation in the `/docs` folder or check the inline code comments.
