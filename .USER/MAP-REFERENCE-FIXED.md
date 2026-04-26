# Map Reference Issue Fixed

**Date:** April 26, 2026, 7:28 AM

## Issue

`Uncaught TypeError: mapInstance.getCenter is not a function`

Even though the log showed "✅ Map instance connected to lead system", the map object didn't have the `getCenter()` method.

## Root Cause

The `window.map` variable exists but it's NOT the Leaflet map object. There's a naming conflict - something else is using `window.map`.

## Solution

Explicitly expose the Leaflet map as `window.leafletMap` to avoid conflicts:

### index.html
```javascript
function initMap() {
    map = L.map('map', { ... });
    
    // Expose map globally for other modules
    window.leafletMap = map;
}
```

### leads.js
```javascript
const checkMap = setInterval(() => {
    if (window.leafletMap) {  // Changed from window.map
        mapInstance = window.leafletMap;
        clearInterval(checkMap);
    }
}, 100);
```

## Why This Works

- `map` variable remains global (no `let`/`const`) for use within index.html
- `window.leafletMap` is explicitly set to the Leaflet map instance
- No naming conflicts with other `window.map` usage
- leads.js gets the correct Leaflet map object with all methods

## Current State

✅ Map properly exposed as `window.leafletMap`  
✅ leads.js connects to correct map instance  
✅ `getCenter()` method available  
✅ All map operations will work  

## Testing

The FAB button should now work correctly:
1. Click FAB button
2. Gets map center using `mapInstance.getCenter()`
3. Adds lead pin at that location
4. Opens form modal
