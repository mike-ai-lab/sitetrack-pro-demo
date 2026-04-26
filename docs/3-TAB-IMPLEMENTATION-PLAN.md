# 3-Tab Implementation Plan - FINAL

**Date:** April 26, 2026  
**Status:** 🚀 Ready to Implement

## Final Structure (3 Tabs)

```
┌─────────────────────────────────────────┐
│ [Recorder] [History] [Session Data]    │
└─────────────────────────────────────────┘
```

### Tab Purposes

1. **Recorder Tab** (KEEP AS IS + Add Lead Button)
   - GPS tracking controls
   - Recording stats (distance, time, streets)
   - Start/Stop/Reset buttons
   - **NEW:** "Add Lead" button
   - **NEW:** Lead counter

2. **History Tab** (KEEP - Shows Session Activities)
   - Tree structure of sessions
   - Timestamps and timing details
   - Station stops with arrival/departure times
   - Session replay functionality
   - Detailed activity log
   - **UNIQUE:** Timeline view of what happened during session

3. **Session Data Tab** (NEW - Leads & Export)
   - Lead list with pins
   - Lead details (Priority, Status, Role, Phase, Contact, Photos, Notes)
   - Export to PDF
   - Export to Markdown (with/without images)
   - Session summary table
   - **Focus:** Lead management and export features

## What to Keep, Remove, and Add

### ✅ KEEP (Don't Touch)

**From Main App:**
- Recorder tab functionality
- History tab with tree structure
- Session replay
- Station tracking with timestamps
- Street tracking (visited/revisited)
- Routing system (just fixed)
- All existing modals

**From Standalone:**
- Lead data structure
- Pin markers with tooltips
- Lead form modal
- Export to PDF logic
- Export to Markdown logic
- Image upload/management
- Geocoding

### ❌ REMOVE (Not Needed)

**From Standalone:**
- "Start/Stop Session" button (we have it in Recorder)
- Simulation toggle (we have it in Recorder)
- Center button (we have locate button)
- Top header bar (we have panel)

### ➕ ADD (New Features)

**To Main App:**
1. **FAB Button** (Floating Action Button)
   - Bottom-left corner
   - Click to add lead at current location
   - Always visible on map

2. **Session Data Tab** (New 3rd tab)
   - Lead list
   - Export buttons
   - Session summary

3. **Lead Management**
   - Lead form modal
   - Lead details modal
   - Pin markers on map
   - Image lightbox

4. **Export Features**
   - PDF export with jsPDF
   - Markdown export
   - Copy to clipboard

## Implementation Steps

### Step 1: Add FAB Button (Floating Action Button)

**Location:** Bottom-left of map (like standalone)

```html
<!-- Add to index.html body -->
<button id="add-lead-fab" 
    class="fixed bottom-8 left-8 z-[999] w-16 h-16 bg-black text-white rounded-full shadow-2xl hover:bg-black/80 transition-all active:scale-95 flex items-center justify-center"
    onclick="dropLeadAtCurrentLocation()"
    title="Add Lead">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
</button>
```

### Step 2: Add Session Data Tab to Panel

**Modify panel.js:**

```javascript
// Add 3rd tab button
<button id="btn-session-data" class="flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] z-10 transition-colors duration-500 tab-inactive">
    Data
</button>

// Add Session Data view
<div id="view-session-data" class="hidden">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
        <span class="text-[10px] font-black text-black/25 uppercase tracking-[0.25em]">
            Session Leads
        </span>
        <div class="flex items-center gap-2">
            <button id="export-pdf-btn" class="...">PDF</button>
            <button id="export-md-btn" class="...">MD</button>
        </div>
    </div>
    
    <!-- Lead List -->
    <div id="session-leads-list" class="space-y-3 max-h-[340px] overflow-y-auto custom-scrollbar">
        <p class="text-[10px] text-black/25 italic text-center py-8">
            No leads captured yet
        </p>
    </div>
    
    <!-- Session Summary -->
    <div class="mt-5 p-4 bg-black/[0.02] rounded-xl border border-black/[0.04]">
        <div class="flex justify-between text-xs">
            <span class="text-black/40">Total Leads</span>
            <span id="total-leads-count" class="font-bold text-black">0</span>
        </div>
        <div class="flex justify-between text-xs mt-2">
            <span class="text-black/40">Distance</span>
            <span id="session-distance" class="font-bold text-black">0.0 km</span>
        </div>
    </div>
</div>
```

### Step 3: Create Lead Management System

**Create new file: `leads.js`**

```javascript
// Lead Management Module
const LeadManager = {
    leads: [],
    currentSessionLeads: [],
    
    // Add lead at location
    addLead(latlng) {
        const lead = {
            id: Date.now(),
            lat: latlng.lat,
            lng: latlng.lng,
            index: this.leads.length + 1,
            priority: 'Normal',
            status: 'Active',
            role: 'Owner',
            phase: 'ST',
            images: [],
            data: {
                name: '',
                phone: '',
                notes: ''
            },
            sessionId: window.currentSessionId || null,
            timestamp: Date.now(),
            address: 'Loading...'
        };
        
        this.leads.push(lead);
        this.renderLeadPin(lead);
        this.openLeadForm(lead.id);
        this.updateLeadCount();
        
        // Geocode address
        this.getAddress(lead);
    },
    
    // Render pin on map
    renderLeadPin(lead) {
        const pinHTML = this.createPinHTML(lead);
        const marker = L.marker([lead.lat, lead.lng], {
            icon: L.divIcon({
                className: 'lead-pin-marker',
                html: pinHTML,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            }),
            zIndexOffset: 1000
        }).addTo(map);
        
        marker.on('click', () => this.openLeadDetails(lead.id));
        lead.marker = marker;
    },
    
    // Create pin HTML (from standalone)
    createPinHTML(lead) {
        const priorities = {
            'Critical': '#ef4444',
            'High': '#f97316',
            'Normal': '#3b82f6',
            'Low': '#94a3b8'
        };
        const roles = {
            'Owner': 'star',
            'Client': 'star',
            'Consultant': 'square',
            'Contractor': 'triangle',
            'Foreman': 'circle'
        };
        
        const color = priorities[lead.priority];
        const icon = roles[lead.role];
        
        return `
            <div class="relative flex items-center justify-center">
                <div class="absolute -left-5 bg-white text-gray-900 font-black text-[9px] px-0.5 rounded shadow-sm">
                    #${lead.index}
                </div>
                <div class="p-1.5 rounded-full shadow-lg flex items-center justify-center" 
                     style="background-color: ${color}; color: white; border: 2px solid white;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        ${this.getIconPath(icon)}
                    </svg>
                </div>
            </div>
        `;
    },
    
    // Get address from coordinates
    async getAddress(lead) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lead.lat}&lon=${lead.lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const addr = data.address;
            const road = addr.road || addr.street || '';
            const neighborhood = addr.neighbourhood || addr.suburb || addr.district || '';
            lead.address = road && neighborhood ? `${road}, ${neighborhood}` : 
                          road || neighborhood || `${lead.lat.toFixed(4)}, ${lead.lng.toFixed(4)}`;
        } catch (error) {
            lead.address = `${lead.lat.toFixed(4)}, ${lead.lng.toFixed(4)}`;
        }
    },
    
    // Update lead count in UI
    updateLeadCount() {
        const count = this.currentSessionLeads.length;
        document.getElementById('total-leads-count').innerText = count;
        // Update in recorder tab if element exists
        const recorderCount = document.getElementById('recorder-leads-count');
        if (recorderCount) recorderCount.innerText = count;
    },
    
    // Render leads in Session Data tab
    renderLeadsList() {
        const container = document.getElementById('session-leads-list');
        if (this.currentSessionLeads.length === 0) {
            container.innerHTML = '<p class="text-[10px] text-black/25 italic text-center py-8">No leads captured yet</p>';
            return;
        }
        
        container.innerHTML = '';
        this.currentSessionLeads.forEach(lead => {
            const leadItem = this.createLeadListItem(lead);
            container.appendChild(leadItem);
        });
    },
    
    // Create lead list item
    createLeadListItem(lead) {
        const div = document.createElement('div');
        div.className = 'p-3 bg-black/[0.02] rounded-xl border border-black/[0.04] hover:bg-black/[0.04] transition-all cursor-pointer';
        div.onclick = () => this.openLeadDetails(lead.id);
        
        const priorities = {
            'Critical': '#ef4444',
            'High': '#f97316',
            'Normal': '#3b82f6',
            'Low': '#94a3b8'
        };
        
        div.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="w-2 h-2 rounded-full" style="background: ${priorities[lead.priority]}"></span>
                        <span class="text-xs font-bold text-black">${lead.data.name || 'Anonymous'}</span>
                    </div>
                    <p class="text-[10px] text-black/40">${lead.role} • ${lead.phase}</p>
                    <p class="text-[9px] text-black/30 italic mt-1">${lead.address}</p>
                </div>
                <div class="text-right">
                    <span class="text-[9px] font-bold text-black/30">#${lead.index}</span>
                    ${lead.images.length > 0 ? `<p class="text-[9px] text-black/40 mt-1">${lead.images.length} 📷</p>` : ''}
                </div>
            </div>
        `;
        
        return div;
    }
};

// Make globally available
window.LeadManager = LeadManager;
```

### Step 4: Add Lead Form Modal

**Add to index.html (copy from standalone):**

```html
<!-- Lead Form Modal -->
<div id="lead-form-modal" class="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="p-6 bg-gray-50 border-b flex items-center justify-between">
            <div>
                <h3 class="text-lg font-bold text-gray-900">Lead Details</h3>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Lead #<span id="lead-form-index">1</span>
                </p>
            </div>
            <button onclick="LeadManager.closeLeadForm()" class="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        <!-- Form Body -->
        <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <input type="hidden" id="current-lead-id">
            
            <!-- Priority -->
            <div>
                <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
                    Priority
                </label>
                <div class="grid grid-cols-4 gap-2" id="priority-buttons">
                    <!-- Priority buttons will be rendered here -->
                </div>
            </div>
            
            <!-- Status -->
            <div>
                <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
                    Status
                </label>
                <div class="flex gap-2" id="status-buttons">
                    <!-- Status buttons will be rendered here -->
                </div>
            </div>
            
            <!-- Photos -->
            <div>
                <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
                    Site Photos
                </label>
                <div class="flex flex-wrap gap-2" id="lead-images-container">
                    <label class="w-16 h-16 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-black transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <input type="file" id="lead-image-input" multiple accept="image/*" class="hidden" onchange="LeadManager.handleImageUpload(event)">
                    </label>
                </div>
            </div>
            
            <!-- Contact Info -->
            <div class="p-4 bg-gray-50 rounded-2xl space-y-4 border border-gray-100">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-[10px] font-black text-gray-400 uppercase block mb-1">Role</label>
                        <select id="lead-role" class="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm font-bold outline-none">
                            <option value="Owner">Owner</option>
                            <option value="Client">Client</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Contractor">Contractor</option>
                            <option value="Foreman">Foreman</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-[10px] font-black text-gray-400 uppercase block mb-1">Phase</label>
                        <select id="lead-phase" class="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm font-bold outline-none">
                            <option value="ST">ST</option>
                            <option value="INT">INT</option>
                            <option value="FD">FD</option>
                            <option value="EX">EX</option>
                            <option value="CL">CL</option>
                        </select>
                    </div>
                </div>
                <input type="text" id="lead-name" placeholder="Contact Name..." 
                    class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none">
                <input type="text" id="lead-phone" placeholder="05XXXXXXXX" 
                    class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none">
            </div>
            
            <!-- Notes -->
            <textarea id="lead-notes" placeholder="Notes..." 
                class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none h-24 resize-none">
            </textarea>
        </div>
        
        <!-- Footer -->
        <div class="p-4 bg-gray-50 border-t flex items-center gap-3">
            <button id="delete-lead-btn" onclick="LeadManager.deleteLead()" 
                class="hidden p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
            <button onclick="LeadManager.closeLeadForm()" 
                class="flex-1 py-3 text-xs font-black uppercase text-gray-400 hover:text-gray-600 transition-all">
                Cancel
            </button>
            <button onclick="LeadManager.saveLead()" 
                class="flex-[2] py-4 bg-gray-900 text-white rounded-xl text-xs font-black uppercase shadow-xl hover:bg-gray-800 transition-all">
                Save Lead
            </button>
        </div>
    </div>
</div>
```

### Step 5: Update Session Save Logic

**Modify saveSession() in index.html:**

```javascript
function saveSession() {
    const session = {
        id: Date.now(),
        date: new Date().toISOString(),
        duration: document.getElementById('rec-duration').innerText,
        distance: totalDistance.toFixed(2),
        streetsVisited: streetsVisited,
        streetsRevisited: streetsRevisited,
        path: recordedPath.map(p => ({ lat: p.lat, lng: p.lng })),
        segments: Array.from(visitedSegments.keys()),
        stations: recordingStations,  // Existing
        leads: LeadManager.currentSessionLeads,  // NEW
        leadsCount: LeadManager.currentSessionLeads.length  // NEW
    };

    recordingSessions.push(session);
    recordingHistory.push(session);
    
    // Save to localStorage
    try {
        localStorage.setItem('recordingSessions', JSON.stringify(recordingSessions));
    } catch (e) {
        console.error('Failed to save session:', e);
    }
    
    // Clear current session leads
    LeadManager.currentSessionLeads = [];
    
    // Show success message
    alert(`Session saved with ${session.leadsCount} leads!`);
    
    // Switch to History tab
    if (window.Panel) {
        window.Panel.switchTab('history');
    }
}
```

### Step 6: Add Export Features

**Create export-utils.js:**

```javascript
// Export utilities (from standalone)
const ExportUtils = {
    // Export to Markdown
    exportToMarkdown(session) {
        let md = `### Field Session Report\n\n`;
        md += `**Date:** ${new Date(session.date).toLocaleDateString()}\n`;
        md += `**Distance:** ${session.distance} km\n`;
        md += `**Duration:** ${session.duration}\n`;
        md += `**Leads:** ${session.leadsCount}\n\n`;
        
        md += `| # | Lead Name | Role | Phase | Priority | Status | Notes |\n`;
        md += `|---|---|---|---|---|---|---|\n`;
        
        session.leads.forEach(lead => {
            md += `| ${lead.index} | ${lead.data.name || 'Anon'} | ${lead.role} | ${lead.phase} | ${lead.priority} | ${lead.status} | ${lead.data.notes || '-'} |\n`;
        });
        
        navigator.clipboard.writeText(md);
        alert('Markdown copied to clipboard!');
    },
    
    // Export to PDF (requires jsPDF)
    async exportToPDF(session) {
        // Implementation from standalone
        // ... (copy PDF export logic)
    }
};

window.ExportUtils = ExportUtils;
```

## File Structure

```
streettracker/
├── index.html (main app - add FAB, modals)
├── panel.js (add 3rd tab)
├── leads.js (NEW - lead management)
├── export-utils.js (NEW - export features)
├── history-modal.js (existing - keep)
├── live.js (existing - keep)
└── docs/
    └── 3-TAB-IMPLEMENTATION-PLAN.md
```

## Summary of Changes

### What Each Tab Does:

1. **Recorder** - GPS tracking + "Add Lead" button
2. **History** - Session timeline with timestamps (UNIQUE features)
3. **Session Data** - Lead list + Export features (NEW)

### Key Features:

- ✅ FAB button to add leads anywhere on map
- ✅ Leads linked to sessions
- ✅ History shows session activities (timestamps, stations)
- ✅ Session Data shows leads and export options
- ✅ No breaking changes to existing features

### Implementation Time:

- Step 1-2: 2-3 hours (FAB + 3rd tab)
- Step 3-4: 4-6 hours (Lead management + modals)
- Step 5-6: 2-4 hours (Session integration + export)
- **Total: 8-13 hours**

## Ready to Start?

Confirm and I'll begin implementation!
