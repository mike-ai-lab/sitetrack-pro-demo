/**
 * StreetTracker Control Panel Component
 * Modular, self-contained panel with all UI and logic
 */

const PanelComponent = {
    // State
    state: {
        isExpanded: true
    },

    // References
    refs: {
        map: null,
        config: null,
        elements: {}
    },

    // HTML Template
    getTemplate() {
        return `
            <div id="control-panel" class="fixed top-5 left-5 z-[1000] pointer-events-auto">
                <div id="main-panel" class="glass flex flex-col rounded-[2.8rem] shadow-[0_30px_90px_-10px_rgba(0,0,0,0.2)] w-[340px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] panel-expanded">
                    
                    <!-- Branding Section (Clickable Header) -->
                    <div id="panel-header" class="flex items-center justify-between px-8 py-6 cursor-pointer select-none active:scale-[0.98] transition-all">
                        <h1 class="text-[14px] font-bold tracking-[0.2em] text-black uppercase" style="font-family: 'Playfair Display', serif;">
                            STREET<span class="font-light opacity-30">TRACK</span>
                        </h1>
                        <div class="flex items-center gap-2 bg-black/[0.03] px-3 py-1.5 rounded-full border border-black/[0.05]">
                            <div class="w-2 h-2 bg-black rounded-full"></div>
                            <span class="text-[10px] font-black text-black/60 uppercase tracking-widest">Active</span>
                        </div>
                    </div>

                    <!-- Collapsible Content -->
                    <div id="panel-content" class="content-visible">
                    
                        <!-- Single Tab Header (Session Logs) -->
                        <div class="px-5 pb-5">
                            <div class="flex bg-black/[0.04] p-1.5 rounded-[1.6rem] relative h-12 items-center justify-center">
                                <span class="text-[11px] font-extrabold uppercase tracking-[0.12em] text-black">Session Logs</span>
                            </div>
                        </div>

                        <!-- Tab Content Area -->
                        <div class="px-8 pb-10">

                            <!-- SESSION LOGS TAB (Always Visible) -->
                            <div id="view-session-data" class="space-y-5">
                                <!-- Session History List -->
                                <div id="session-leads-list" class="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
                                    <p class="text-[10px] text-black/25 italic text-center py-8">No sessions recorded yet</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- LIVE PROSPECTING OVERLAYS (appended to body layer) -->
            <!-- ═══════════════════════════════════════════════════ -->

            <!-- OLD MODALS REMOVED - Will be replaced with new pin system -->
            <!-- FAB button, Lead Entry Form Modal, and Contact View Modal have been disabled -->
            <!-- New implementation coming soon -->
        `;
    },

    // CSS Styles
    getStyles() {
        return `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

            /* Glassmorphism */
            .glass {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(30px) saturate(190%);
                -webkit-backdrop-filter: blur(30px) saturate(190%);
                border: 1px solid rgba(255, 255, 255, 0.4);
            }

            /* Custom Range Slider */
            #speed-slider {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 4px;
                background: rgba(0,0,0,0.05);
                border-radius: 10px;
                outline: none;
                accent-color: #000;
            }

            #speed-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                background: #000;
                border-radius: 50%;
                cursor: pointer;
                border: 2px solid #fff;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                transition: transform 0.2s ease;
            }

            #speed-slider::-webkit-slider-thumb:active {
                transform: scale(1.2);
            }

            /* Tab States */
            .tab-active { color: white !important; }
            .tab-inactive { color: rgba(0, 0, 0, 0.4); }

            /* Panel States */
            .panel-collapsed {
                width: 56px !important;
                height: 56px !important;
                border-radius: 50% !important;
            }

            .panel-expanded {
                width: 340px;
                border-radius: 2.8rem;
            }

            .content-hidden {
                opacity: 0;
                max-height: 0;
                overflow: hidden;
                pointer-events: none;
                transition: opacity 0.3s ease, max-height 0.3s ease;
            }

            .content-visible {
                opacity: 1;
                max-height: 1000px;
                transition: opacity 0.4s ease 0.1s, max-height 0.4s ease;
            }

            .header-collapsed {
                padding: 0 !important;
                border: none !important;
                background: transparent !important;
                justify-content: center !important;
                align-items: center !important;
                height: 56px !important;
            }

            .header-collapsed h1,
            .header-collapsed > div:last-child {
                display: none !important;
            }

            .header-collapsed::before {
                content: '';
                display: block;
                width: 24px;
                height: 24px;
                background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2.5' stroke-linecap='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='3' y1='7' x2='21' y2='7'/%3E%3Cline x1='3' y1='12' x2='21' y2='12'/%3E%3Cline x1='3' y1='17' x2='21' y2='17'/%3E%3C/svg%3E");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }

            /* Recording Pulse Animation */
            .recording-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .4; }
            }

            /* Custom Scrollbar */
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 10px; }

            /* Mobile Responsive */
            @media (max-width: 640px) {
                #control-panel {
                    top: 16px !important;
                    left: 16px !important;
                }

                .panel-expanded {
                    width: calc(100vw - 32px) !important;
                    max-width: 340px;
                }

                .panel-collapsed {
                    width: 48px !important;
                    height: 48px !important;
                }
                
                #main-panel {
                    border-radius: 2.8rem;
                }
                
                .panel-collapsed {
                    border-radius: 50% !important;
                }
            }

            /* Touch-friendly */
            @media (hover: none) and (pointer: coarse) {
                button, .group {
                    min-height: 44px;
                    min-width: 44px;
                }
            }
        `;
    },

    // Initialize Panel (no config needed)
    init(map) {
        this.refs.map = map;

        // Inject styles
        const styleEl = document.createElement('style');
        styleEl.textContent = this.getStyles();
        document.head.appendChild(styleEl);

        // Inject HTML
        const container = document.createElement('div');
        container.innerHTML = this.getTemplate();
        
        // Append ALL elements from template (panel + modals)
        let elementCount = 0;
        while (container.firstElementChild) {
            const el = container.firstElementChild;
            document.body.appendChild(el);
            elementCount++;
        }

        // Cache element references
        this.cacheElements();

        // Bind event handlers
        this.bindEvents();

        // Init LiveProspect module
        if (window.LiveProspect) {
            window.LiveProspect.init(map);
        }

        return this.getAPI();
    },

    // Cache DOM elements
    cacheElements() {
        const ids = [
            'main-panel', 'panel-header', 'panel-content',
            'view-session-data',
            'session-leads-list', 'total-leads-count', 'session-distance',
            'export-pdf-btn', 'export-md-btn'
        ];

        ids.forEach(id => {
            this.refs.elements[id] = document.getElementById(id);
        });
    },

    // Bind all event handlers
    bindEvents() {
        const el = this.refs.elements;

        // Header collapse/expand
        el['panel-header'].onclick = () => this.togglePanel();
    },

    // Toggle panel expand/collapse
    togglePanel() {
        this.state.isExpanded = !this.state.isExpanded;
        const el = this.refs.elements;

        if (this.state.isExpanded) {
            el['main-panel'].classList.remove('panel-collapsed');
            el['main-panel'].classList.add('panel-expanded');
            el['panel-content'].classList.remove('content-hidden');
            el['panel-content'].classList.add('content-visible');
            el['panel-header'].classList.remove('header-collapsed');
        } else {
            el['main-panel'].classList.remove('panel-expanded');
            el['main-panel'].classList.add('panel-collapsed');
            el['panel-content'].classList.remove('content-visible');
            el['panel-content'].classList.add('content-hidden');
            el['panel-header'].classList.add('header-collapsed');
        }
    },

    // Public API
    getAPI() {
        return {
            toggle: () => this.togglePanel(),
            getElements: () => this.refs.elements,
            getState: () => this.state,
            refreshSessionLogs: () => this.refreshSessionLogs()
        };
    },
    
    // Refresh session logs display
    refreshSessionLogs() {
        // Call the existing renderHistoryPanel function
        if (window.renderHistoryPanel) {
            window.renderHistoryPanel();
        }
    }
};

// Export initialization function (no config needed)
window.initPanel = (map) => PanelComponent.init(map);

// Recording History Management
let currentHistoryPage = 0;
const ITEMS_PER_PAGE = 1;

window.renderHistoryPanel = function() {
    const historyList = document.getElementById('session-leads-list');
    if (!historyList) {
        return;
    }

    // Only show recording sessions (not trip plans)
    const allHistory = (window.recordingHistory || [])
        .sort((a, b) => b.id - a.id);

    if (allHistory.length === 0) {
        historyList.innerHTML = '<p class="text-[10px] font-bold text-black/25 uppercase tracking-[0.25em] text-center py-8">No sessions recorded yet</p>';
        return;
    }

    const totalPages = Math.ceil(allHistory.length / ITEMS_PER_PAGE);
    const startIdx = currentHistoryPage * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const pageItems = allHistory.slice(startIdx, endIdx);

    historyList.innerHTML = '';

    pageItems.forEach(item => {
        renderRecordingItem(item, historyList);
    });

    // Add pagination controls
    if (totalPages > 1) {
        const pagination = document.createElement('div');
        pagination.className = 'flex items-center justify-between mt-4 pt-4 border-t border-black/[0.05]';
        pagination.innerHTML = `
            <button id="prev-page" ${currentHistoryPage === 0 ? 'disabled' : ''}
                class="px-3 py-1.5 text-[10px] font-bold text-black/40 uppercase tracking-widest hover:text-black disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                ← Prev
            </button>
            <span class="text-[10px] text-black/25 font-bold">
                ${currentHistoryPage + 1} / ${totalPages}
            </span>
            <button id="next-page" ${currentHistoryPage >= totalPages - 1 ? 'disabled' : ''}
                class="px-3 py-1.5 text-[10px] font-bold text-black/40 uppercase tracking-widest hover:text-black disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                Next →
            </button>
        `;
        historyList.appendChild(pagination);

        document.getElementById('prev-page').onclick = () => {
            if (currentHistoryPage > 0) {
                currentHistoryPage--;
                window.renderHistoryPanel();
            }
        };

        document.getElementById('next-page').onclick = () => {
            if (currentHistoryPage < totalPages - 1) {
                currentHistoryPage++;
                window.renderHistoryPanel();
            }
        };
    }
};

function renderRecordingItem(session, container) {
    const item = document.createElement('div');
    item.className = 'group';
    
    const date = new Date(session.date || session.timestamp);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const durationMin = Math.floor(session.duration / 60);
    const durationSec = session.duration % 60;
    
    // Get location name from start address or coordinates
    let locationName = 'Unknown Location';
    if (session.startAddress) {
        locationName = session.startAddress.split(',')[0]; // First part of address
    } else if (session.path && session.path.length > 0) {
        const lat = session.path[0].lat.toFixed(2);
        const lng = session.path[0].lng.toFixed(2);
        locationName = `Location ${lat}, ${lng}`;
    }
    
    item.innerHTML = `
        <!-- Map Thumbnail Preview -->
        <div class="relative w-full h-32 bg-gray-100 rounded-t-2xl overflow-hidden mb-2">
            <div id="session-map-${session.id}" class="w-full h-full"></div>
        </div>
        
        <!-- Session Header -->
        <div class="flex items-center justify-between p-4 bg-black/[0.03] rounded-2xl hover:bg-black/[0.05] transition-all cursor-pointer">
            <div class="flex items-center gap-3 flex-1">
                <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                    <p class="text-xs font-bold text-black">${dateStr}, ${locationName}</p>
                    <p class="text-[9px] font-medium text-black/30 uppercase">${session.distance.toFixed(1)} KM • ${durationMin} MIN</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button class="delete-session-btn p-2 hover:bg-red-50 rounded-lg transition-all" data-session-id="${session.id}" title="Delete Session">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-black/20 hover:text-red-500 transition-colors">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </button>
                <svg class="chevron-icon opacity-20 transition-transform duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </div>
        </div>
        
        <!-- Expandable Details -->
        <div class="session-details hidden mt-2 ml-4 pl-4 border-l border-black/[0.05] space-y-3">
            <!-- Start Location -->
            <div class="flex items-start gap-3 py-1">
                <div class="w-1.5 h-1.5 rounded-full bg-black/30 mt-1 flex-shrink-0"></div>
                <div>
                    <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-0.5">Start</p>
                    <p class="text-[11px] font-semibold text-black">${session.startAddress || 'Start Location'}</p>
                    <p class="text-[9px] text-black/30">${timeStr}</p>
                </div>
            </div>
            
            <div class="w-[1px] h-3 bg-black/[0.06] ml-[2px]"></div>
            
            <!-- End Location -->
            <div class="flex items-start gap-3 py-1">
                <div class="w-1.5 h-1.5 rounded-full bg-black mt-1 flex-shrink-0"></div>
                <div>
                    <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-0.5">End</p>
                    <p class="text-[11px] font-semibold text-black">${session.endAddress || 'End Location'}</p>
                </div>
            </div>
            
            <!-- Sites Visited -->
            ${session.stations && session.stations.length > 0 ? `
                <div class="mt-3 pt-3 border-t border-black/[0.05] space-y-3">
                    <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest">Sites Visited (${session.stations.length})</p>
                    ${session.stations.map((station, idx) => {
                        const arrivalTime = new Date(station.arrivalTime);
                        const departureTime = station.departureTime ? new Date(station.departureTime) : null;
                        const arrivalStr = arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                        const departureStr = departureTime ? departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'In Progress';
                        const sDurationMin = station.duration ? Math.floor(station.duration / 60) : 0;
                        const sDurationSec = station.duration ? station.duration % 60 : 0;
                        
                        return `
                            <div class="flex items-start gap-3">
                                <span class="text-[9px] font-bold text-black/25 mt-0.5 flex-shrink-0">#${station.number || idx + 1}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-[11px] font-bold text-black truncate">${station.address || station.name || 'Unknown Location'}</p>
                                    <p class="text-[9px] text-black/30 italic">${arrivalStr} – ${departureStr} · ${sDurationMin}:${sDurationSec.toString().padStart(2, '0')} min</p>
                                    <div class="flex flex-wrap gap-1 mt-2">
                                        ${station.leadId ? `
                                            <button class="view-lead-btn px-3 py-1.5 bg-black text-white rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-black/80 transition-all" data-lead-id="${station.leadId}">
                                                View Contact
                                            </button>
                                        ` : `
                                            <button class="add-lead-btn px-3 py-1.5 bg-white border border-black/10 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all" data-station-lat="${station.lat}" data-station-lng="${station.lng}">
                                                Add Lead Info
                                            </button>
                                        `}
                                        <button class="show-on-map-btn px-3 py-1.5 bg-blue-500 text-white rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all" data-session-id="${session.id}" data-station-index="${idx}">
                                            📍 Show on Map
                                        </button>
                                        <button class="delete-station-btn px-3 py-1.5 border border-black/[0.08] text-black/30 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all" data-session-id="${session.id}" data-station-index="${idx}">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('<div class="w-[1px] h-2 bg-black/[0.05] ml-[10px]"></div>')}
                </div>
            ` : '<p class="text-[9px] text-black/30 italic mt-3 pt-3 border-t border-black/[0.05]">No sites visited</p>'}
        </div>
    `;
    
    container.appendChild(item);
    
    // Add click handler for session header
    const header = item.querySelector('.flex.items-center.justify-between');
    const details = item.querySelector('.session-details');
    const chevron = item.querySelector('.chevron-icon');
    
    header.addEventListener('click', (e) => {
        // Don't toggle if clicking delete button
        if (e.target.closest('.delete-session-btn')) return;
        
        const isHidden = details.classList.contains('hidden');
        details.classList.toggle('hidden');
        if (chevron) {
            chevron.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
        }
    });
    
    // Add click handler for delete session button
    const deleteSessionBtn = item.querySelector('.delete-session-btn');
    if (deleteSessionBtn) {
        console.log('🗑️ Delete button found for session:', deleteSessionBtn.getAttribute('data-session-id'));
        deleteSessionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const sessionId = parseFloat(deleteSessionBtn.getAttribute('data-session-id')); // USE parseFloat instead of parseInt
            console.log('🗑️ Delete button clicked for session ID:', sessionId);
            // No confirmation - direct delete
            deleteSession(sessionId);
        });
    } else {
        console.error('❌ Delete session button NOT found in item!');
    }
    
    // Add click handlers for "View Contact" buttons
    const viewLeadButtons = item.querySelectorAll('.view-lead-btn');
    viewLeadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const leadId = parseFloat(btn.getAttribute('data-lead-id')); // USE parseFloat
            if (window.LeadSystem && window.LeadSystem.openLeadDetails) {
                window.LeadSystem.openLeadDetails(leadId);
            }
        });
    });
    
    // Add click handlers for "Add Lead Info" buttons
    const addLeadButtons = item.querySelectorAll('.add-lead-btn');
    addLeadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const lat = parseFloat(btn.getAttribute('data-station-lat'));
            const lng = parseFloat(btn.getAttribute('data-station-lng'));
            if (window.LeadSystem && window.LeadSystem.addLeadPin) {
                window.LeadSystem.addLeadPin(lat, lng);
            }
        });
    });
    
    // Add click handlers for "Delete" buttons
    const deleteButtons = item.querySelectorAll('.delete-station-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sessionId = parseFloat(btn.getAttribute('data-session-id')); // USE parseFloat
            const stationIndex = parseInt(btn.getAttribute('data-station-index'));
            if (confirm('Delete this station?')) {
                deleteStationFromSession(sessionId, stationIndex);
            }
        });
    });
    
    // Add click handlers for "Show on Map" buttons
    const showOnMapButtons = item.querySelectorAll('.show-on-map-btn');
    showOnMapButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sessionId = parseFloat(btn.getAttribute('data-session-id')); // USE parseFloat
            const stationIndex = parseInt(btn.getAttribute('data-station-index'));
            openStationMapModal(sessionId, stationIndex);
        });
    });
    
    // Render mini map thumbnail after DOM is ready
    setTimeout(() => {
        renderSessionMiniMap(session);
    }, 100);
}

// Render mini map thumbnail for session
function renderSessionMiniMap(session) {
    const mapContainer = document.getElementById(`session-map-${session.id}`);
    if (!mapContainer || !session.path || session.path.length === 0) return;
    
    try {
        // Create mini map
        const miniMap = L.map(mapContainer, {
            zoomControl: false,
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            attributionControl: false
        });
        
        // Add tile layer (Google Maps style)
        L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20
        }).addTo(miniMap);
        
        // Draw route path
        const pathCoords = session.path.map(p => [p.lat, p.lng]);
        L.polyline(pathCoords, {
            color: '#000000',
            weight: 3,
            opacity: 0.8
        }).addTo(miniMap);
        
        // Add start marker (gray circle)
        if (session.path.length > 0) {
            const start = session.path[0];
            L.circleMarker([start.lat, start.lng], {
                radius: 5,
                fillColor: '#6b7280',
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(miniMap);
        }
        
        // Add end marker (black circle)
        if (session.path.length > 1) {
            const end = session.path[session.path.length - 1];
            L.circleMarker([end.lat, end.lng], {
                radius: 5,
                fillColor: '#000000',
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(miniMap);
        }
        
        // Add station markers (small dots)
        if (session.stations && session.stations.length > 0) {
            session.stations.forEach(station => {
                L.circleMarker([station.lat, station.lng], {
                    radius: 4,
                    fillColor: '#3b82f6',
                    color: '#ffffff',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                }).addTo(miniMap);
            });
        }
        
        // Fit bounds to show entire route
        const bounds = L.latLngBounds(pathCoords);
        miniMap.fitBounds(bounds, { padding: [10, 10] });
        
    } catch (e) {
        console.error('Failed to render mini map:', e);
    }
}

// Delete station from session
function deleteStationFromSession(sessionId, stationIndex) {
    const session = (window.recordingHistory || []).find(s => s.id === sessionId);
    if (!session || !session.stations) return;
    
    session.stations.splice(stationIndex, 1);
    
    // Re-number stations
    session.stations.forEach((s, i) => {
        s.number = i + 1;
    });
    
    // Save to localStorage
    try {
        localStorage.setItem('lp_sessions', JSON.stringify(window.recordingHistory));
    } catch (e) {
        console.error('Failed to save after deleting station:', e);
    }
    
    // Refresh panel
    window.renderHistoryPanel();
}

// Delete entire session
function deleteSession(sessionId) {
    console.log('🗑️ deleteSession called with ID:', sessionId);
    console.log('📊 Current recordingHistory:', window.recordingHistory);
    
    if (!window.recordingHistory) {
        console.error('❌ recordingHistory is undefined!');
        return;
    }
    
    const index = window.recordingHistory.findIndex(s => s.id === sessionId);
    console.log('📍 Found session at index:', index);
    
    if (index === -1) {
        console.error('❌ Session not found with ID:', sessionId);
        return;
    }
    
    // Remove session (NO CONFIRMATION - direct delete)
    console.log('🗑️ Removing session at index:', index);
    window.recordingHistory.splice(index, 1);
    console.log('✅ Session removed, remaining sessions:', window.recordingHistory.length);
    
    // Save to localStorage
    try {
        localStorage.setItem('lp_sessions', JSON.stringify(window.recordingHistory));
        console.log('✅ Session deleted and saved to localStorage');
    } catch (e) {
        console.error('❌ Failed to save after deleting session:', e);
    }
    
    // Refresh panel
    console.log('🔄 Refreshing panel...');
    window.renderHistoryPanel();
}

// Open station map modal
function openStationMapModal(sessionId, stationIndex) {
    const session = (window.recordingHistory || []).find(s => s.id === sessionId);
    if (!session || !session.stations || !session.stations[stationIndex]) return;
    
    const station = session.stations[stationIndex];
    const prevStation = stationIndex > 0 ? session.stations[stationIndex - 1] : null;
    const nextStation = stationIndex < session.stations.length - 1 ? session.stations[stationIndex + 1] : null;
    
    // Get lead photos if available
    let leadPhotos = [];
    if (station.leadId && window.LeadSystem) {
        const allPins = window.LeadSystem.getAllPins();
        const leadPin = allPins.find(p => p.id === station.leadId);
        if (leadPin && leadPin.images) {
            leadPhotos = leadPin.images;
        }
    }
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('stationMapModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'stationMapModal';
        modal.className = 'modal-overlay';
        modal.style.zIndex = '10002'; // Higher than lead details modal
        modal.innerHTML = `
            <div class="modal-content flex flex-col" style="max-width: 700px; max-height: 85vh;">
                <div class="p-6 bg-black/[0.02] border-b border-black/[0.06] flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-black">Station Location</h3>
                        <p id="station-modal-subtitle" class="text-[10px] font-bold text-black/40 uppercase tracking-widest">Station #1</p>
                    </div>
                    <button onclick="closeStationMapModal()" class="w-10 h-10 bg-black/[0.05] text-black rounded-full flex items-center justify-center hover:bg-black/[0.1] transition-all active:scale-90">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto custom-scroll">
                    <!-- Map Container -->
                    <div id="station-mini-map" class="w-full h-80 bg-black/[0.03]"></div>
                    
                    <!-- Station Details -->
                    <div id="station-modal-content" class="p-6 space-y-4">
                        <!-- Content will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeStationMapModal();
            }
        });
    }
    
    // Update modal content
    document.getElementById('station-modal-subtitle').innerText = `Station #${station.number || stationIndex + 1}`;
    
    const content = document.getElementById('station-modal-content');
    const arrivalTime = new Date(station.arrivalTime);
    const departureTime = station.departureTime ? new Date(station.departureTime) : null;
    const arrivalStr = arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const departureStr = departureTime ? departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'In Progress';
    const durationMin = station.duration ? Math.floor(station.duration / 60) : 0;
    const durationSec = station.duration ? station.duration % 60 : 0;
    
    content.innerHTML = `
        <div class="space-y-4">
            <div>
                <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Address</p>
                <p class="font-bold text-black">${station.address || station.name || 'Unknown Location'}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Arrival</p>
                    <p class="font-bold text-black">${arrivalStr}</p>
                </div>
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Departure</p>
                    <p class="font-bold text-black">${departureStr}</p>
                </div>
            </div>
            
            <div>
                <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Duration</p>
                <p class="font-bold text-black">${durationMin}:${durationSec.toString().padStart(2, '0')} min</p>
            </div>
            
            ${leadPhotos.length > 0 ? `
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-2">Photos (${leadPhotos.length})</p>
                    <div class="grid grid-cols-3 gap-2">
                        ${leadPhotos.map(img => `
                            <img src="${img}" class="w-full h-24 object-cover rounded-xl border border-black/10 cursor-pointer hover:opacity-80" onclick="window.open('${img}', '_blank')">
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${prevStation || nextStation ? `
                <div class="pt-4 border-t border-black/[0.06]">
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-3">Context</p>
                    <div class="space-y-2">
                        ${prevStation ? `
                            <div class="flex items-center gap-2 text-[10px]">
                                <span class="text-black/40">← Previous:</span>
                                <span class="font-bold text-black">${prevStation.address || prevStation.name || 'Unknown'}</span>
                            </div>
                        ` : ''}
                        ${nextStation ? `
                            <div class="flex items-center gap-2 text-[10px]">
                                <span class="text-black/40">Next →</span>
                                <span class="font-bold text-black">${nextStation.address || nextStation.name || 'Unknown'}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Initialize map after a short delay
    setTimeout(() => {
        initStationMiniMap(station, prevStation, nextStation);
    }, 100);
}

// Initialize mini map for station
function initStationMiniMap(station, prevStation, nextStation) {
    const mapContainer = document.getElementById('station-mini-map');
    if (!mapContainer) return;
    
    // Remove existing map if any
    if (window.stationMiniMapInstance) {
        window.stationMiniMapInstance.remove();
        window.stationMiniMapInstance = null;
    }
    
    // Create new map
    const miniMap = L.map('station-mini-map', {
        zoomControl: true,
        attributionControl: false
    }).setView([station.lat, station.lng], 16);
    
    // Add tile layer (match main map style)
    const layerType = window.currentMapLayer || 'default';
    if (layerType === 'satellite') {
        L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(miniMap);
    } else {
        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(miniMap);
    }
    
    // Add previous station marker (if exists)
    if (prevStation) {
        L.circleMarker([prevStation.lat, prevStation.lng], {
            radius: 8,
            fillColor: '#94a3b8',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.6
        }).addTo(miniMap).bindPopup(`<b>Previous Station</b><br>${prevStation.address || 'Unknown'}`);
    }
    
    // Add current station marker (highlighted)
    const currentMarker = L.circleMarker([station.lat, station.lng], {
        radius: 12,
        fillColor: '#3b82f6',
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9
    }).addTo(miniMap);
    
    // Pulsing animation for current station
    let pulseSize = 12;
    let growing = true;
    setInterval(() => {
        if (growing) {
            pulseSize += 0.5;
            if (pulseSize >= 15) growing = false;
        } else {
            pulseSize -= 0.5;
            if (pulseSize <= 12) growing = true;
        }
        currentMarker.setRadius(pulseSize);
    }, 100);
    
    currentMarker.bindPopup(`<b>Current Station</b><br>${station.address || station.name || 'Unknown'}`).openPopup();
    
    // Add next station marker (if exists)
    if (nextStation) {
        L.circleMarker([nextStation.lat, nextStation.lng], {
            radius: 8,
            fillColor: '#94a3b8',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.6
        }).addTo(miniMap).bindPopup(`<b>Next Station</b><br>${nextStation.address || 'Unknown'}`);
    }
    
    // Draw path lines
    if (prevStation) {
        L.polyline([
            [prevStation.lat, prevStation.lng],
            [station.lat, station.lng]
        ], {
            color: '#94a3b8',
            weight: 3,
            opacity: 0.5,
            dashArray: '5, 10'
        }).addTo(miniMap);
    }
    
    if (nextStation) {
        L.polyline([
            [station.lat, station.lng],
            [nextStation.lat, nextStation.lng]
        ], {
            color: '#94a3b8',
            weight: 3,
            opacity: 0.5,
            dashArray: '5, 10'
        }).addTo(miniMap);
    }
    
    // Fit bounds to show all markers
    const bounds = [];
    if (prevStation) bounds.push([prevStation.lat, prevStation.lng]);
    bounds.push([station.lat, station.lng]);
    if (nextStation) bounds.push([nextStation.lat, nextStation.lng]);
    
    if (bounds.length > 1) {
        miniMap.fitBounds(bounds, { padding: [50, 50] });
    }
    
    // Store map instance
    window.stationMiniMapInstance = miniMap;
}

// Close station map modal
window.closeStationMapModal = function() {
    const modal = document.getElementById('stationMapModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Clean up map
    if (window.stationMiniMapInstance) {
        window.stationMiniMapInstance.remove();
        window.stationMiniMapInstance = null;
    }
};

// Remove old toggle function - no longer needed
if (window.toggleSessionDetails) {
    delete window.toggleSessionDetails;
}

function initializeRoutePreview(mapId, session) {
    const mapContainer = document.getElementById(mapId);
    if (!mapContainer) return;
    
    try {
        // Create a small Leaflet map
        const previewMap = L.map(mapId, {
            zoomControl: false,
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            attributionControl: false
        });
        
        // Add tile layer matching the main map's current layer
        const layerType = window.currentMapLayer || 'default';
        if (layerType === 'satellite') {
            // Google Hybrid (satellite + labels)
            L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(previewMap);
        } else {
            // Google Roadmap
            L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(previewMap);
        }
        
        // Draw the route path
        if (session.path && session.path.length > 0) {
            const pathCoords = session.path.map(p => [p.lat, p.lng]);
            
            // Draw the path
            L.polyline(pathCoords, {
                color: '#000',
                weight: 2.5,
                opacity: 0.7
            }).addTo(previewMap);
            
            // Add start marker
            L.circleMarker([session.startLocation.lat, session.startLocation.lng], {
                radius: 4,
                fillColor: '#000',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.4
            }).addTo(previewMap);
            
            // Add end marker
            L.circleMarker([session.path[session.path.length - 1].lat, session.path[session.path.length - 1].lng], {
                radius: 4,
                fillColor: '#000',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(previewMap);
            
            // Fit bounds to show entire route
            const bounds = L.latLngBounds(pathCoords);
            previewMap.fitBounds(bounds, { padding: [10, 10] });
        }
    } catch (error) {
        console.error('Error creating route preview:', error);
        mapContainer.innerHTML = '<div class="flex items-center justify-center h-full text-[9px] text-black/25">Map unavailable</div>';
    }
}

// ── History station CRUD ──────────────────────────────────────────────────────
// Note: These functions are kept for backward compatibility but may not be used
// in the new <details>-based UI since stations now link directly to leads

window.addContactToStation = function(sessionId, stationIndex) {
    // Open LiveProspect lead form pre-loaded with this station's data
    const session = (window.recordingHistory || []).find(s => s.id === sessionId);
    if (!session) return;
    const station = session.stations && session.stations[stationIndex];
    if (!station) return;

    // Ensure station has an id so the form can find it
    if (!station.id) station.id = Date.now();

    // Temporarily register this station in LiveProspect so openLeadForm works
    if (window.LiveProspect && window.LiveProspect._registerHistoryStation) {
        window.LiveProspect._registerHistoryStation(station, session, stationIndex);
    } else {
        // Fallback: open contact modal read-only
        viewStationContact(sessionId, stationIndex);
    }
};

window.viewStationContact = function(sessionId, stationIndex) {
    if (window.LiveProspect && window.LiveProspect.openContactModal) {
        const session = (window.recordingHistory || []).find(s => s.id === sessionId);
        if (!session) return;
        const station = session.stations && session.stations[stationIndex];
        if (!station || !station.id) return;
        window.LiveProspect.openContactModal(station.id);
    }
};

window.deleteStationFromHistory = function(sessionId, stationIndex) {
    if (!confirm('Delete this site entry?')) return;
    const session = (window.recordingHistory || []).find(s => s.id === sessionId);
    if (!session || !session.stations) return;
    session.stations.splice(stationIndex, 1);
    // Re-number
    session.stations.forEach((s, i) => { s.number = i + 1; });
    // Persist
    _persistHistoryToStorage();
    window.renderHistoryPanel();
};

window.deleteSessionFromHistory = function(sessionId) {
    if (window.LiveProspect && window.LiveProspect.deleteSession) {
        window.LiveProspect.deleteSession(sessionId);
    } else {
        if (!confirm('Delete this entire session?')) return;
        window.recordingHistory = (window.recordingHistory || []).filter(s => s.id !== sessionId);
        _persistHistoryToStorage();
        window.renderHistoryPanel();
    }
};

function _persistHistoryToStorage() {
    try {
        const lp = JSON.parse(localStorage.getItem('lp_sessions') || '[]');
        const updated = (window.recordingHistory || []).filter(s => s.type === 'live');
        localStorage.setItem('lp_sessions', JSON.stringify(updated));
    } catch(e) {}
}

window.replayRecording = function(sessionId) {
    alert('Replay feature coming soon! This will animate the recorded path on the map.');
};

// Initialize history panel when it opens
const historyBtn = document.getElementById('history-btn');
if (historyBtn) {
    const originalClick = historyBtn.onclick;
    historyBtn.onclick = function() {
        console.log('🔘 HISTORY BUTTON CLICKED');
        console.log('window.recordingHistory at click:', window.recordingHistory);
        if (originalClick) originalClick();
        setTimeout(() => {
            console.log('⏰ Calling renderHistoryPanel after 100ms delay...');
            window.renderHistoryPanel();
        }, 100);
    };
}
