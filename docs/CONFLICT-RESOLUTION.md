# Conflict Resolution - Lead Systems

## Problem Identified

There are **TWO lead/pin systems** conflicting:

1. **Existing System** (`live.js` + `LiveProspect`)
   - Already has FAB button
   - Already has lead forms
   - Already has pin markers
   - Tied to recording stations

2. **New System** (`leads.js` + `LeadManager`)
   - Duplicate FAB button
   - Duplicate lead logic
   - Trying to add same features

## Solution: Replace, Don't Duplicate

We need to **REPLACE** the existing `LiveProspect` system with the standalone version's logic, not add a new system alongside it.

### What to Do:

1. **Keep** `live.js` file structure
2. **Replace** its logic with standalone version
3. **Remove** `leads.js` (duplicate)
4. **Update** `LiveProspect` to match standalone behavior
5. **Use** standalone's modal HTML

### Files to Modify:

- ✅ `live.js` - Replace with standalone logic
- ❌ `leads.js` - Remove (duplicate)
- ✅ `panel.js` - Update modal HTML to match standalone
- ✅ `index.html` - Remove leads.js script tag

## Next Steps:

1. Backup current live.js
2. Replace with standalone version's logic
3. Update modal HTML
4. Test integration
