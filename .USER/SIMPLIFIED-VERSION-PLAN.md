# Simplified Version Plan

**Branch:** `simplified-version` (created and active)
**Date:** 2026-04-25

## ✅ CORRECT Understanding (Based on field-prospecting-lite)

### What field-prospecting-lite Does (THE GOAL)

This is a **single-purpose field prospecting app** with:

1. **One Simple Interface** - No tabs, just a map with controls
2. **START/STOP Session Button** - Top-left, starts GPS tracking
3. **Live Stats Display** - Shows: Status, Start Time, Duration, Leads Count, Distance
4. **FAB Button** (bottom-left) - Drops pins at current location
5. **Simulation Mode Toggle** (top-right) - For testing without GPS
6. **Pin System** with full customization:
   - Priority colors (Critical/High/Normal/Low)
   - Role icons (Owner/Client/Consultant/Contractor/Foreman)
   - Phase labels (ST/INT/FD/EX/CL)
   - Status indicators (New/Active/On Hold/Closed)
7. **Lead Form** - Opens when you drop a pin:
   - Contact name, role, phone
   - Photos (camera/gallery)
   - Notes
8. **Export Button** - Generate markdown reports
9. **Background Operation**:
   - Service Worker keeps GPS active
   - Auto-saves every 10 seconds
   - Session restoration on reload
   - Keep-alive mechanism

### What the Current Root App Has (OVERCOMPLICATED)

- 4 tabs (Plan/Rec/Live/History) - TOO COMPLEX
- Multiple modes and workflows
- Confusing UI with overlapping features
- Plan tab: Route planning (NOT NEEDED)
- Live tab: Different prospecting mode (REDUNDANT)
- Rec tab: Similar to what we want but buried in tabs
- History tab: Good but needs to be simplified

## The Goal

**Transform the root app to match field-prospecting-lite's simplicity:**

1. Remove all tabs
2. Single clean interface like field-prospecting-lite
3. Keep the robust features from root app (better code quality)
4. Match the exact workflow of field-prospecting-lite

## What to Keep from Root App

- Better code structure
- Improved map handling
- Enhanced GPS tracking
- Service worker implementation
- History modal (HistoryModal.js)

## What to Remove from Root App

- All 4 tabs (Plan/Rec/Live/History)
- Panel.js complexity
- Live.js (different workflow)
- Multiple modes
- Confusing navigation

## Implementation Plan

1. **Create new simple UI** matching field-prospecting-lite layout
2. **Port the pin system** with all customization options
3. **Implement single START/STOP workflow**
4. **Add FAB button** for dropping pins
5. **Keep simulation mode** toggle
6. **Preserve history/export** functionality
7. **Remove all tab-based navigation**

## Key Features to Implement

✅ Single START/STOP session button
✅ Live stats bar (status, time, duration, leads, distance)
✅ FAB button for pin drops
✅ Simulation mode toggle
✅ Pin customization (priority, role, phase, status)
✅ Lead form with photos
✅ Export to markdown
✅ Background persistence
✅ Session restoration

## Notes

- Current version is safe on `main` branch
- Working on `simplified-version` branch
- field-prospecting-lite is the reference implementation
- Root app has better code but wrong UI/workflow
