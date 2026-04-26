# Features to Implement - Clean Slate Documentation

**Date:** April 26, 2026  
**Status:** 📋 Planning Document for Fresh Start

## Current Situation

The app has become unstable with multiple issues:
- Black car marker remaining visible when adding pins
- Routing system causing conflicts
- Multiple car markers appearing
- Code has become too complex and fragile

## Recommended Approach

**REVERT to last deployed working version** and implement features one at a time with proper testing.

---

## Feature 1: Lead Pin System (from FIELDPROSPECTINGTOOL_claude.html)

### What It Does
Allows users to drop pins on the map to mark potential client sites/leads with detailed information.

### Core Functionality
1. **FAB Button** - Floating Action Button at bottom-left to add pins
2. **Pin Markers** - Visual markers on map with:
   - Priority indicator (Critical/High/Normal/Low with colors)
   - Role icon (Owner/Client/Consultant/Contractor/Foreman)
   - Project phase (ST/INT/FD/EX/CL)
   - Status (New/Active/On Hold/Closed)
   - Sequential numbering (#1, #2, #3...)

3. **Lead Form Modal** - When clicking a pin or FAB:
   - Contact information (name, phone, role)
   - Project phase selection
   - Priority level
   - Status
   - Site photos (multiple uploads)
   - Notes field

4. **Photo Management**
   - Upload multiple photos per site
   - Thumbnail preview
   - Remove photos
   - Lightbox viewer for full-size images

5. **Export Functionality**
   - Table view of all leads
   - Copy as Markdown
   - Shows all lead details in organized format

### Key Files to Reference
- `.USER/FIELDPROSPECTINGTOOL_claude.html` - Working standalone version
- Clean, simple implementation
- No conflicts with existing map features

### Implementation Strategy
1. Start with FAB button only
2. Add pin dropping functionality
3. Add basic form (no photos first)
4. Add photo upload
5. Add export feature
6. Test thoroughly at each step

---

## Feature 2: Clean Routing System (from FIELDPROSPECTINGTOOL_claude.html)

### What It Does
Smooth car animation along streets when clicking waypoints on the map.

### Core Functionality
1. **Queue-Based Routing**
   - Click map to add waypoints
   - Routes calculated via OSRM
   - Sequential processing (no race conditions)
   - Smooth animation along streets

2. **Visual Feedback**
   - Solid blue line for recorded path
   - Dashed line for planned route
   - Single car marker (no duplicates)
   - Car rotates to face direction of travel

3. **Key Variables**
   ```javascript
   let navQueue = [];           // Queue of route segments
   let plannedPoints = [];      // Points for dashed preview
   let lastQueuedLocation = null;
   let routeSeq = 0;           // Sequence number
   let routePending = {};      // Pending routes by sequence
   let routeNextFlush = 0;     // Next sequence to process
   let isMoving = false;       // Movement state
   ```

4. **Key Functions**
   - `planRoute(latlng)` - Initiates route calculation
   - `flushRoutes()` - Processes routes in order
   - `processQueue()` - Animates car movement
   - `clearWaypointQueue()` - Cleans up state

### Implementation Strategy
1. Implement ONLY in Recorder tab
2. Keep separate from other features
3. Test with simple clicks first
4. Ensure car marker cleanup on tab switch
5. No interaction with lead pins

---

## Feature 3: Live Prospecting Mode

### What It Does
GPS-based tracking with lead capture while moving in the field.

### Core Functionality
1. **GPS Tracking**
   - Real-time location updates
   - Path recording
   - Distance calculation
   - Time tracking

2. **Quick Lead Capture**
   - FAB button to capture current location
   - Quick form for lead details
   - Photo capture from camera
   - Automatic address lookup

3. **Session Management**
   - Start/stop sessions
   - Save to history
   - Background tracking
   - Service worker for persistence

### Current Status
- Partially implemented in `live.js`
- Has conflicts with main app
- Needs isolation from other features

### Implementation Strategy
1. Keep completely separate from Recorder/Planner
2. Own tab with own UI
3. Own car marker (hide others when active)
4. Test GPS tracking first
5. Add lead capture second
6. Ensure proper cleanup on tab switch

---

## Critical Requirements for All Features

### 1. Single Car Marker Rule
- **ONLY ONE car marker visible at a time**
- Hide other markers when switching modes
- Proper cleanup on tab changes
- Clear ownership of car marker per mode

### 2. Tab Isolation
- Each tab (Planner/Recorder/Live/History) is independent
- Switching tabs should:
  - Hide previous tab's markers
  - Stop previous tab's processes
  - Clean up previous tab's state
  - Initialize new tab cleanly

### 3. State Management
- Clear state variables per feature
- No shared state between features
- Proper initialization on tab switch
- Proper cleanup on tab switch

### 4. Testing Protocol
- Test each feature in isolation first
- Test tab switching thoroughly
- Test with browser refresh
- Test with cache clear
- Verify no console errors
- Verify no duplicate markers

---

## Implementation Order (Recommended)

### Phase 1: Lead Pin System (Standalone)
1. Add FAB button
2. Add pin dropping
3. Add basic form
4. Add photos
5. Add export
6. **TEST THOROUGHLY**

### Phase 2: Clean Routing (Recorder Tab Only)
1. Implement queue system
2. Add route planning
3. Add animation
4. Add visual feedback
5. **TEST THOROUGHLY**

### Phase 3: Live Prospecting (Separate Tab)
1. GPS tracking
2. Lead capture
3. Session management
4. Background tracking
5. **TEST THOROUGHLY**

### Phase 4: Integration
1. Ensure tab switching works
2. Ensure no marker conflicts
3. Ensure proper cleanup
4. **TEST EVERYTHING TOGETHER**

---

## Files to Keep as Reference

### Working Examples
- `.USER/FIELDPROSPECTINGTOOL_claude.html` - Lead pins + routing
- Last deployed version (revert point)

### Current Problematic Files
- `live.js` - Has conflicts, needs isolation
- `index.html` - Routing system broken
- Multiple car markers issue

---

## What NOT to Do

❌ Don't implement multiple features at once
❌ Don't share car markers between features
❌ Don't share state between tabs
❌ Don't skip testing between steps
❌ Don't assume features will work together
❌ Don't add features without cleanup logic

---

## Success Criteria

✅ Only ONE car marker visible at any time
✅ No console errors
✅ Smooth tab switching
✅ Each feature works independently
✅ Features work together without conflicts
✅ Proper cleanup on all state changes
✅ No duplicate markers or elements
✅ Clean, maintainable code

---

## Next Steps

1. **REVERT** to last deployed working version
2. **BACKUP** current code (if needed for reference)
3. **START FRESH** with Phase 1 only
4. **TEST** thoroughly before moving to Phase 2
5. **DOCUMENT** each change as you go

---

## Notes

- The standalone FIELDPROSPECTINGTOOL_claude.html works perfectly
- The issue is integration, not the features themselves
- Need proper isolation and cleanup
- One feature at a time with thorough testing
- Don't rush - quality over speed

---

## Contact Points for Issues

If issues arise during implementation:
1. Check if car marker is being hidden properly
2. Check if previous tab's state is cleaned up
3. Check console for errors
4. Test in isolation first
5. Verify no duplicate event listeners

---

**Remember:** The goal is a stable, working app. Better to have fewer features that work perfectly than many features that conflict with each other.
