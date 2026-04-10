# Panel Integration Guide

## Quick Start

The panel has been successfully refactored into a modular component. Here's how it works:

### Files
- `panel.js` - The modular panel component
- `index.html` - Main app (now imports panel.js)

### How It Works

1. **Panel loads automatically** when page loads
2. **Panel injects itself** into the DOM
3. **Panel wires up** all event handlers
4. **App functions** are registered globally for panel to call

## Testing the Integration

### 1. Open the App
```
Open index.html in your browser
```

### 2. Check Console
You should see:
```
✅ Panel initialized
✅ App initialized with modular panel
```

### 3. Test Panel Features

#### Collapse/Expand
- Click the header (STREETTRACK)
- Panel should collapse to circular button with hamburger icon
- Click again to expand

#### Tab Switching
- Click "Plan" tab - should show planner interface
- Click "Rec" tab - should show recorder interface
- Click "Live" tab - should show "Coming soon" placeholder
- Click "History" tab - should show "No recent trips" placeholder
- Pill should animate smoothly between tabs

#### Planner Tab
- Click on map to set pickup point
- Click again to set destination
- Route should calculate automatically
- Speed slider should update display
- All buttons should be clickable

#### Recorder Tab
- Auto Focus toggle should work
- Stats should display (0.0 km, 00:00, etc.)
- Buttons should be present

### 4. Mobile Testing
- Resize browser to mobile width (<640px)
- Panel should shrink but remain functional
- Collapse button should work
- All tap targets should be 44px minimum

## State Synchronization

The panel automatically syncs with global app state:

### Global Variables Synced
- `window.currentMode` - Current tab ('planner', 'recorder', 'live', 'history')
- `window.isDriving` - Whether trip is in progress
- `window.isRecording` - Whether recording is active

### How to Update Panel State

```javascript
// From anywhere in your app:

// Update recording stats
Panel.updateStats({
    distance: '12.4',
    duration: '00:42:18',
    streets: 8,
    revisited: 3
});

// Update badge
Panel.updateBadge('Recording', 'red');

// Set driving state
Panel.setDrivingState(true);

// Set recording state
Panel.setRecordingState(true);

// Switch tab programmatically
Panel.switchTab('recorder');

// Toggle panel
Panel.toggle();

// Get panel elements
const elements = Panel.getElements();
elements['pickup-label'].innerText = 'New location';

// Get panel state
const state = Panel.getState();
console.log('Current tab:', state.currentTab);
console.log('Is expanded:', state.isExpanded);
```

## Function Registration

The following app functions are registered globally for the panel to call:

### Planner Functions
- `window.startTrip()` - Start trip playback
- `window.togglePauseTrip()` - Pause/resume trip
- `window.endTripFunc()` - End trip
- `window.resetPlannerFunc()` - Reset planner
- `window.startEditingPointFunc(index)` - Edit waypoint

### Recorder Functions
- `window.startRecordingFunc()` - Start recording
- `window.stopRecordingFunc()` - Stop recording
- `window.resetRecorderFunc()` - Reset recorder
- `window.saveSessionFunc()` - Save session

## Troubleshooting

### Panel doesn't appear
- Check console for errors
- Verify `panel.js` is loaded
- Check that `initPanel()` is called after map initialization

### Buttons don't work
- Check that app functions are registered in `window.onload`
- Verify function names match in panel.js and index.html
- Check console for "function is not defined" errors

### Tab switching doesn't work
- Check that all view IDs exist (view-planner, view-recorder, view-live, view-history)
- Verify pill element exists
- Check for JavaScript errors in console

### State not syncing
- Verify global variables are exposed (currentMode, isDriving, isRecording)
- Check that Panel.setDrivingState() and Panel.setRecordingState() are called
- Verify window.currentMode is updated when tabs switch

## Adding New Features

### Add a New Tab
1. Update panel.js template with new tab button and view
2. Update switchTab() to handle new tab
3. Update pill position calculation
4. Add content to new tab view

### Add New Controls
1. Add HTML to appropriate tab view in panel.js
2. Cache element reference in cacheElements()
3. Bind event handler in bindEvents()
4. Register app function in window.onload if needed

### Update Styles
1. Modify getStyles() in panel.js
2. Styles are automatically injected on init
3. No need to touch index.html

## Performance Notes

- Panel injects ~600 lines of code
- Styles are injected once on init
- No external dependencies (uses Tailwind from CDN)
- Minimal DOM manipulation
- Event handlers bound once on init

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires ES6 support (arrow functions, template literals)
- Uses CSS backdrop-filter (may need fallback for older browsers)

## Next Steps

1. Test all functionality thoroughly
2. Verify mobile responsiveness
3. Check all button handlers work
4. Test state synchronization
5. Implement Live tab features
6. Integrate History tab with existing history panel
7. Add keyboard shortcuts
8. Add accessibility features

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files are loaded
3. Check function registration in window.onload
4. Verify element IDs match between panel.js and app code
5. Test in different browsers

## Success Criteria

✅ Panel loads and displays
✅ All 4 tabs work
✅ Collapse/expand works
✅ All buttons clickable
✅ State syncs correctly
✅ Mobile responsive
✅ No console errors
✅ Existing functionality preserved
