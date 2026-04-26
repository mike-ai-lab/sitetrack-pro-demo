# Lead Pin Integration Plan

**Date:** April 26, 2026  
**Status:** 📋 Planning Phase

## Executive Summary

After analyzing both versions, I recommend **creating a new "Leads" tab** in the main panel rather than replacing the History tab. This preserves existing functionality while adding the powerful lead management features from the standalone version.

## Feature Comparison

### Standalone Version (.USER/FIELDPROSPECTINGTOOL.html)
**Strengths:**
- ✅ Pin/Lead management system with map markers
- ✅ Rich lead data (Priority, Status, Role, Phase, Contact, Photos, Notes)
- ✅ Session-based workflow (Start/Stop Session)
- ✅ Export to PDF with images
- ✅ Export to Markdown (with/without images)
- ✅ Lead details modal with full information
- ✅ Image management with lightbox
- ✅ Geocoding for addresses
- ✅ Visual pin markers with tooltips
- ✅ Session summary table

**Limitations:**
- ❌ No historical session storage
- ❌ No session replay functionality
- ❌ Simpler routing (no street tracking)

### Main Application (index.html)
**Strengths:**
- ✅ Historical session storage with localStorage
- ✅ Session replay functionality
- ✅ Advanced street tracking (visited/revisited)
- ✅ Station tracking with timestamps
- ✅ Detailed trip statistics
- ✅ History panel with session list
- ✅ Sophisticated routing system

**Limitations:**
- ❌ No lead/pin management
- ❌ No contact information capture
- ❌ No photo attachments
- ❌ No export to PDF
- ❌ Limited data export options

## Recommended Approach: 3-Tab System

### Tab Structure
```
┌─────────────────────────────────────┐
│  [Planner] [Recorder] [Leads]       │
│  ─────────────────────────────────  │
│                                     │
│  Tab Content Here                   │
│                                     │
└─────────────────────────────────────┘
```

### Why This Approach?

1. **No Breaking Changes** - Preserves all existing functionality
2. **Clear Separation** - Each tab has a distinct purpose:
   - **Planner**: Route planning and simulation
   - **Recorder**: GPS tracking and street coverage
   - **Leads**: Field prospecting and lead management
3. **Complementary Features** - Users can record a session AND capture leads simultaneously
4. **Future-Proof** - Easy to extend with more features

## Implementation Strategy

### Phase 1: Core Lead System (Day 1)
**Goal:** Add basic lead management without breaking existing features

**Tasks:**
1. Create new "Leads" tab in panel.js
2. Add lead management state variables
3. Implement pin dropping on map
4. Create lead form modal
5. Basic lead CRUD operations
6. Simple lead list in Leads tab

**Files to Modify:**
- `panel.js` - Add Leads tab
- `index.html` - Add lead management functions
- Create `leads.js` - Modular lead management

**Estimated Time:** 4-6 hours

### Phase 2: Rich Lead Features (Day 2)
**Goal:** Add advanced features from standalone version

**Tasks:**
1. Image upload and management
2. Lead details modal
3. Priority/Status/Role/Phase system
4. Geocoding integration
5. Lead markers with tooltips
6. Session statistics

**Files to Modify:**
- `leads.js` - Extend with rich features
- `index.html` - Integrate with map
- Add CSS for modals and pins

**Estimated Time:** 6-8 hours

### Phase 3: Export & Integration (Day 3)
**Goal:** Add export features and integrate with recording

**Tasks:**
1. Export to Markdown
2. Export to PDF with jsPDF
3. Link leads to recording sessions
4. Session summary with leads
5. Lead filtering and search

**Files to Create:**
- `export-utils.js` - Export functionality
- `lead-export-modal.html` - Export UI

**Estimated Time:** 4-6 hours

## Detailed Technical Plan

### 1. Data Structure

```javascript
// Lead Object
{
    id: timestamp,
    lat: number,
    lng: number,
    index: number,
    priority: 'Critical' | 'High' | 'Normal' | 'Low',
    status: 'New' | 'Active' | 'On Hold' | 'Closed',
    role: 'Owner' | 'Client' | 'Consultant' | 'Contractor' | 'Foreman',
    phase: 'ST' | 'INT' | 'FD' | 'EX' | 'CL',
    images: string[], // base64 data URLs
    data: {
        name: string,
        phone: string,
        notes: string
    },
    marker: L.Marker, // Leaflet marker reference
    sessionId: number, // Link to recording session
    timestamp: number,
    address: string // Geocoded address
}

// Enhanced Session Object (extends existing)
{
    ...existingSessionData,
    leads: Lead[], // Array of leads captured during session
    leadsCount: number
}
```

### 2. File Structure

```
streettracker/
├── index.html (main app)
├── panel.js (3-tab panel)
├── leads.js (NEW - lead management)
├── export-utils.js (NEW - export functionality)
├── history-modal.js (existing)
└── docs/
    └── LEAD-PIN-INTEGRATION-PLAN.md (this file)
```

### 3. Panel.js Changes

```javascript
// Add Leads tab
const tabs = ['planner', 'recorder', 'leads']; // Add 'leads'

// Add Leads view HTML
<div id="view-leads" class="hidden">
    <div class="flex items-center justify-between mb-5">
        <h3 class="text-[11px] font-black uppercase tracking-widest text-black/40">
            Field Leads
        </h3>
        <div class="flex items-center gap-2">
            <button id="add-lead-btn" class="...">
                Add Lead
            </button>
            <button id="export-leads-btn" class="...">
                Export
            </button>
        </div>
    </div>
    <div id="leads-list" class="space-y-3">
        <!-- Leads will be rendered here -->
    </div>
</div>
```

### 4. Integration Points

**Map Click Handler:**
```javascript
function onMapClick(e) {
    if (window.currentMode === 'leads') {
        // Drop pin at clicked location
        dropLeadPin(e.latlng);
    } else if (window.currentMode === 'recorder' && simulationMode && isRecording) {
        // Existing routing logic
        simulateMovement(e.latlng);
    }
}
```

**Session Save Enhancement:**
```javascript
function saveSession() {
    const session = {
        ...existingSessionData,
        leads: getLeadsForCurrentSession(),
        leadsCount: leads.length
    };
    // Save to localStorage
}
```

### 5. UI Components Needed

1. **Lead Form Modal** (from standalone)
   - Priority selector (4 options with colors)
   - Status selector (4 options)
   - Role dropdown (5 options)
   - Phase dropdown (5 options)
   - Image upload (multiple)
   - Contact fields (name, phone)
   - Notes textarea

2. **Lead Details Modal** (from standalone)
   - Full lead information display
   - Image gallery
   - Export options (Text, Markdown)
   - Edit button
   - Map link

3. **Export Modal** (from standalone)
   - Session summary table
   - Export to PDF button
   - Copy Markdown button
   - Copy with Images button

4. **Lead Pin Markers** (from standalone)
   - Colored by priority
   - Icon by role
   - Tooltip on hover
   - Click to view details

## Risk Assessment

### Low Risk ✅
- Adding new tab (no impact on existing tabs)
- Creating new modular files (leads.js, export-utils.js)
- Adding new modals (isolated components)

### Medium Risk ⚠️
- Map click handler changes (need careful mode checking)
- Session data structure changes (need migration)
- localStorage schema updates (need versioning)

### High Risk ❌
- None identified (clean separation of concerns)

## Testing Checklist

### Phase 1 Testing
- [ ] Leads tab appears and switches correctly
- [ ] Can drop pins on map
- [ ] Lead form opens and saves
- [ ] Leads appear in list
- [ ] Can edit and delete leads
- [ ] No impact on Planner tab
- [ ] No impact on Recorder tab

### Phase 2 Testing
- [ ] Image upload works
- [ ] Lead details modal displays correctly
- [ ] Priority/Status/Role/Phase selectors work
- [ ] Geocoding fetches addresses
- [ ] Pin markers render with correct colors
- [ ] Tooltips show on hover

### Phase 3 Testing
- [ ] Markdown export works
- [ ] PDF export generates correctly
- [ ] Images appear in PDF
- [ ] Leads link to sessions
- [ ] Session summary includes leads
- [ ] Export buttons work in all contexts

## Migration Path

### For Existing Users
1. No data loss - existing sessions remain intact
2. New "Leads" tab appears automatically
3. Optional: Migrate old sessions to include empty leads array
4. Backward compatible - old sessions still work

### For New Users
1. All three tabs available immediately
2. Intuitive workflow: Plan → Record → Capture Leads
3. Comprehensive export options

## Alternative Approaches Considered

### ❌ Option A: Replace History Tab
**Pros:** Simpler, fewer tabs
**Cons:** Loses session history, breaks existing workflow, user confusion

### ❌ Option B: Merge Leads into Recorder Tab
**Pros:** Single recording interface
**Cons:** Cluttered UI, conflicting controls, complex state management

### ✅ Option C: New Leads Tab (RECOMMENDED)
**Pros:** Clean separation, no breaking changes, extensible
**Cons:** One more tab (minimal downside)

## Next Steps

1. **Get User Approval** - Confirm 3-tab approach
2. **Phase 1 Implementation** - Core lead system
3. **Testing & Feedback** - Validate basic functionality
4. **Phase 2 Implementation** - Rich features
5. **Phase 3 Implementation** - Export & integration
6. **Documentation** - Update user guide
7. **Deployment** - Release to production

## Questions for User

1. ✅ **Confirm 3-tab approach?** (Planner, Recorder, Leads)
2. Should leads be linked to recording sessions or independent?
3. Should we keep the "Start/Stop Session" button from standalone?
4. Any specific export formats needed beyond PDF and Markdown?
5. Should leads persist across sessions or reset?

## Conclusion

The 3-tab approach provides the best balance of:
- **Safety**: No breaking changes to existing features
- **Clarity**: Each tab has a clear, focused purpose
- **Power**: Combines best features from both versions
- **Flexibility**: Easy to extend in the future

**Recommendation: Proceed with 3-tab implementation starting with Phase 1.**
