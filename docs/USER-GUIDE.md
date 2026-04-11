# StreetTracker User Guide

Welcome to StreetTracker! This guide will help you understand and use all the features of the application.

## What is StreetTracker?

StreetTracker is a web-based mapping tool that helps you plan routes, record trips, and track your movements on a map. Think of it as a combination of a route planner and a GPS tracker that works right in your web browser.

## Getting Started

### Opening the App

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to the StreetTracker website or open the `index.html` file
3. The map will load showing Riyadh, Saudi Arabia
4. You'll see a control panel on the left side of the screen

### Understanding the Interface

The app has four main areas:

1. **Control Panel** (left side) - Your main control center
2. **Map** (center) - Interactive map where you plan and track routes
3. **History Button** (top right) - Access your trip history
4. **Map Controls** (bottom right) - Change map view and find your location

## Using the Control Panel

The control panel has four tabs at the top:

### 1. Plan Tab

This is where you plan and simulate trips.

**How to Plan a Route:**

1. Click anywhere on the map to set your pickup location (blue dot appears)
2. Click another location to set your destination (red dot appears)
3. A blue route line will automatically appear connecting the two points
4. The distance will show at the top of the screen

**Adjusting Trip Speed:**

- Use the speed slider to control how fast the car moves
- "Traffic" = slow speed
- "Normal" = medium speed
- "Express" = fast speed

**Starting Your Trip:**

1. Click the Play button (▶) to start
2. Watch the car icon move along the route
3. Use Pause (⏸) to pause the trip
4. Use Stop (⏹) to end the trip early
5. Click Reset (↻) to clear everything and start over

**Follow Car Toggle:**

- When enabled, the map automatically follows the car as it moves
- Disable it if you want to look around the map while the trip is running

### 2. Rec Tab (Recording)

This tab lets you record actual trips using your device's GPS or simulate trips by clicking on the map.

**Starting a Recording:**

1. The app will ask for location permission (click Allow)
2. Once ready, the badge will show "Ready" or "Sim Ready"
3. Click the Play button (▶) to start recording
4. Click on the map to add waypoints (in simulation mode)
5. The app tracks:
   - Total distance traveled
   - Time elapsed
   - New streets visited
   - Streets you've revisited

**Stopping a Recording:**

1. Click the Stop button (⏹) when you're done
2. The "Save Session" button will appear
3. Click it to save your trip to history

**Auto Focus Toggle:**

- When enabled, the map automatically centers on your current location
- Useful when you're moving and want to stay centered

### 3. Live Tab

This tab is reserved for future live tracking features. Currently shows "Coming soon."

### 4. History Tab

View all your saved recording sessions.

**What You'll See:**

- List of all recorded trips
- Date and time of each trip
- Start and end locations
- Quick preview map of the route

**Viewing Details:**

1. Click "View Details" on any trip
2. See full statistics:
   - Total distance
   - Duration
   - Sites visited
   - Time spent at each site
3. Click "Replay Recording" to watch the trip again on the map

**Maximize View:**

- Click "Maximize" for a full-screen history view
- Navigate between sessions using Previous/Next buttons
- See detailed station-by-station breakdown

## Map Controls

### Layer Switcher (Layers Icon)

Click to switch between map views:
- **Default** - Standard street map
- **Satellite** - Aerial imagery with street labels

### Locate Me (Target Icon)

- Click to find your current location
- A blue dot will appear showing where you are
- The map will center on your position

### Traffic Toggle (Traffic Light Icon)

- Click to show/hide traffic conditions
- Red/orange lines indicate traffic congestion
- Green lines indicate clear roads

## History Panel (Top Right)

Click the clock icon to open the trip history panel:

- Shows recent planned trips (from Plan tab)
- Click any trip to reload it on the map
- Click the header to collapse/expand the panel
- Click again when collapsed to hide it completely

## Tips and Tricks

### Planning Multiple Routes

1. After completing a trip, click Reset
2. Set new pickup and destination points
3. Your previous trip is automatically saved to history

### Recording Long Trips

1. Start recording before you begin your journey
2. The app tracks your path automatically
3. Stop recording when you reach your destination
4. Save the session to review later

### Simulation Mode

- Perfect for testing without moving
- Click on the map to simulate movement
- Great for planning routes before actual trips
- No GPS required

### Mobile Usage

- All buttons are touch-friendly
- Pinch to zoom on the map
- Drag to pan around
- Tap locations to set waypoints

### Saving Your Work

- Planned trips are automatically saved to history
- Recorded sessions must be manually saved using "Save Session"
- History is stored in your browser (stays even after closing)

## Common Questions

**Q: Why isn't the map loading?**
A: Check your internet connection. The map requires an active connection to load tiles.

**Q: Can I use this offline?**
A: No, the app requires internet to load map tiles and calculate routes.

**Q: How accurate is the GPS tracking?**
A: Accuracy depends on your device's GPS. Typically 5-20 meters in open areas.

**Q: Can I export my trip data?**
A: Currently, trips are stored in your browser. Export features may be added in future updates.

**Q: What happens if I close the browser?**
A: Your saved history will remain, but any active recording will be lost.

**Q: Can I edit a saved trip?**
A: No, saved trips are read-only. You can replay them or create new ones.

## Troubleshooting

### Map is blank or not loading
- Refresh the page
- Check your internet connection
- Try a different browser

### Location not working
- Make sure you allowed location permissions
- Check if location services are enabled on your device
- Try the simulation mode instead

### Buttons not responding
- Refresh the page
- Clear your browser cache
- Make sure JavaScript is enabled

### App is slow or laggy
- Close other browser tabs
- Restart your browser
- Try on a different device

## Privacy and Data

- Your location data is only used within the app
- No data is sent to external servers (except map tiles)
- Trip history is stored locally in your browser
- Clear your browser data to remove all saved trips

## Getting Help

If you encounter issues:

1. Try refreshing the page
2. Check the browser console for error messages (F12 key)
3. Refer to the technical documentation in the project folder
4. Contact your system administrator or developer

## Updates and Features

StreetTracker is continuously being improved. Future updates may include:

- Live tracking with multiple users
- Trip sharing and export
- Custom map markers and notes
- Advanced statistics and analytics
- Integration with other mapping services

---

**Enjoy using StreetTracker!** Whether you're planning a route or recording a journey, we hope this tool makes your mapping tasks easier and more efficient.
