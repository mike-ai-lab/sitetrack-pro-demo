# REC & History Tab Cleanup and Migration Plan

## Current State Analysis

### Files to Clean Up:
1. **panel.js** - Contains REC tab and History tab UI and logic
2. **live.js** - Contains recording session logic, history persistence
3. **history-modal.js** - Full history modal component
4. **index.html** - May have history-related HTML elements

### Features to Remove:

#### REC Tab (panel.js):
- Recording status badge and indicator
- Recording stats (distance, time, streets, revisited)
- Start/Stop/Reset recording buttons
- Save session button
- Auto-focus toggle
- All recording state management

#### History Tab (panel.js):
- History list view
- Session tree structure
- History action buttons
- History rendering logic

#### History Modal (history-modal.js):
- Entire file to be deleted
- Session archive viewer
- Map previews
- Session pagination
- Stats cards
- Route timeline

#### Recording Logic (live.js):
- `startRecording()` / `stopRecording()` functions
- `saveSession()` function
- `persistSessionToHistory()` function
- `deleteSession()` function
- `_registerHistoryStation()` function
- Recording history storage/retrieval
- Session persistence to localStorage
- GPS tracking for recording
- Path recording logic

### Features to Keep (Will be replaced with standalone version):
- Lead/Pin management (will be enhanced)
- Contact forms (will be simplified)
- Map interaction (will be improved)
- Session tracking (will be simplified to match standalone)

---

## Cleanup Steps

### Step 1: Remove REC Tab from panel.js ✅ COMPLETE
- [x] Remove REC tab button
- [x] Remove entire `view-recorder` section
- [x] Remove recording-related element IDs from cache
- [x] Remove recording state from panel state object
- [x] Remove recording event handlers

### Step 2: Remove History Tab from panel.js ✅ COMPLETE
- [x] Remove History tab button
- [x] Remove entire `view-history` section
- [x] Remove history-related element IDs from cache
- [x] Remove history rendering functions
- [x] Remove history event handlers
- [x] Remove switchTab function and related methods

### Step 3: Clean up live.js ⏳ IN PROGRESS
- [ ] Remove `persistSessionToHistory()` function
- [ ] Remove `deleteSession()` function
- [ ] Remove `_registerHistoryStation()` function
- [ ] Remove recording history storage logic
- [ ] Remove session persistence code
- [ ] Remove `window.recordingHistory` references
- [ ] Keep only lead/station management

### Step 4: Delete history-modal.js ✅ COMPLETE
- [x] Delete the entire file
- [x] Remove from service worker cache (sw.js)
- [x] Remove script tag from index.html

### Step 5: Clean up index.html ⏳ NEXT
- [ ] Remove any history-related HTML elements
- [ ] Remove history-related CSS
- [ ] Check for any other recording/history references

### Step 6: Update service worker (sw.js) ✅ COMPLETE
- [x] Remove history-modal.js from PRECACHE array

---

## Migration Plan (After Cleanup)

### Features to Port from Standalone (.USER/FIELDPROSPECTINGTOOL.html):

1. **Simple Session Toggle**
   - START/STOP SESSION button (replaces complex REC tab)
   - Session stats in header (Standby/Recording • X Leads • X.Xkm)
   - Clean session state management

2. **SIM Mode Toggle**
   - Simulation mode button
   - Route planning on map click
   - Fixed routing logic (no straight lines!)
   - Queue-based route processing

3. **Pin/Lead System**
   - Drop pin at user location
   - Simple lead form (priority, status, role, phase, photos, contact, notes)
   - Pin visualization on map
   - Lead details modal

4. **Export System**
   - Export modal with table view
   - Copy as Markdown
   - Copy with images
   - PDF export
   - Individual lead export

5. **Routing Logic**
   - Fixed `planRoute()` with sequence tracking
   - `flushRoutes()` for queue management
   - `processQueue()` with proper point iteration (no skipping!)
   - Smooth animation following roads

---

## Summary

✅ **Cleanup Phase Complete!**

Successfully removed:
- REC tab and all recording UI from panel.js
- History tab and history rendering from panel.js  
- history-modal.js file (deleted)
- Old FAB button (disabled in live.js)
- Lead Entry Form Modal (removed from panel.js)
- Contact View Modal (removed from panel.js)
- Old black dot pin markers (disabled)
- Service worker cache updated

The app is now clean and ready for the new features from the standalone version!

**Current State:**
- Panel shows only "Session Data" tab
- No FAB button visible (old implementation disabled)
- No modals for leads/contacts (old implementation removed)
- Map is clean with no old pin markers
- Ready for migration of new features

**Next: Migration Phase**
Port features from `.USER/FIELDPROSPECTINGTOOL.html` to main app.

---

## Notes

- Keep the main app's sophisticated styling
- Maintain the glass morphism design
- Keep the panel structure (just remove REC/History tabs)
- Session Data tab can remain (will show current session leads)
- Focus on simplicity and usability over complexity
