/**
 * History Modal Component - Refactored for Muhamad
 * Style: Sleek Architectural Dock / Apple Minimalism
 */

const HistoryModalComponent = {
    state: {
        currentPage: 0,
        isOpen: false
    },

    refs: {
        modal: null
    },

    getTemplate() {
        return `
            <!-- Deep Overlay -->
            <div class="absolute inset-0 bg-black/60 transition-opacity duration-300" onclick="HistoryModal.close()"></div>
            
            <!-- Modal Container -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-[750px] h-[calc(100%-2rem)] md:max-h-[calc(100vh-4rem)] glass flex flex-col rounded-[3rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                
                <!-- Refined Header -->
                <div class="flex items-center justify-between px-10 py-8 border-b border-black/[0.03]">
                    <div>
                        <h1 class="text-[16px] font-bold tracking-[0.3em] text-black uppercase" style="font-family: 'Butler', serif;">
                            SESSION<span class="font-light opacity-30">ARCHIVE</span>
                        </h1>
                        <p class="text-[10px] text-black/30 uppercase tracking-[0.1em] mt-1 font-bold">Riyadh Metropolitan Records</p>
                    </div>
                    <button onclick="HistoryModal.close()" class="group w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black transition-all duration-300">
                        <svg class="group-hover:rotate-90 transition-transform duration-500 group-hover:stroke-white" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                
                <!-- Main Body -->
                <div class="flex-1 overflow-y-auto custom-scrollbar">
                    <div id="history-modal-content" class="max-w-6xl mx-auto px-10 py-10">
                        <div class="flex flex-col items-center justify-center py-20 opacity-20">
                            <div class="w-12 h-12 border-2 border-t-black rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        if (document.getElementById('history-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'history-modal';
        modal.className = 'fixed inset-0 z-[9999] hidden';
        document.body.appendChild(modal);
        this.refs.modal = modal;
        console.log(' History Modal UI Refactored');
    },

    open() {
        if (!this.refs.modal) this.init();
        this.refs.modal.innerHTML = this.getTemplate();
        this.refs.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.state.isOpen = true;
        this.state.currentPage = 0;
        this.renderContent();
    },

    close() {
        if (this.refs.modal) {
            this.refs.modal.classList.add('hidden');
            document.body.style.overflow = '';
            this.state.isOpen = false;
        }
    },

    prevSession() {
        if (this.state.currentPage > 0) {
            this.state.currentPage--;
            this.renderContent();
        }
    },

    nextSession() {
        const totalPages = (window.recordingHistory || []).length;
        if (this.state.currentPage < totalPages - 1) {
            this.state.currentPage++;
            this.renderContent();
        }
    },

    renderContent() {
        const container = document.getElementById('history-modal-content');
        if (!container) return;

        const allHistory = (window.recordingHistory || []).sort((a, b) => b.id - a.id);
        if (allHistory.length === 0) {
            container.innerHTML = `
                <div class="text-center py-24">
                    <h2 class="text-3xl font-light text-black/10 tracking-tighter" style="font-family: 'Butler';">No Records Found</h2>
                    <p class="text-[10px] font-bold text-black/20 uppercase tracking-widest mt-4 text-center">Your travel history will appear here</p>
                </div>`;
            return;
        }

        const totalPages = allHistory.length;
        const session = allHistory[this.state.currentPage];
        const date = new Date(session.timestamp);
        const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const mapId = `history-modal-map-${session.id}`;

        container.innerHTML = `
            <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
                
                <!-- Top Metrics Section -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div class="space-y-1">
                        <div class="flex items-center gap-3">
                            <span class="text-[11px] font-black uppercase tracking-[0.2em] text-black/40">Log Entry</span>
                            <span class="h-[1px] w-8 bg-black/10"></span>
                            <span class="text-[11px] font-black uppercase tracking-[0.2em] text-black">#${session.id.toString().slice(-4)}</span>
                        </div>
                        <h2 class="text-4xl font-light tracking-tighter" style="font-family: 'Butler';">${dateStr}</h2>
                        <p class="text-[11px] font-medium text-black/30 uppercase tracking-widest">Recorded at ${timeStr}</p>
                    </div>

                    <!-- Pagination Controls -->
                    <div class="flex items-center gap-4 bg-black/[0.03] p-2 rounded-full border border-black/[0.05]">
                        <button onclick="HistoryModal.prevSession()" ${this.state.currentPage === 0 ? 'disabled' : ''} 
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-black hover:stroke-white active:scale-95 disabled:opacity-20 transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span class="text-[11px] font-black tracking-tighter px-2">${this.state.currentPage + 1} <span class="opacity-20 mx-1">/</span> ${totalPages}</span>
                        <button onclick="HistoryModal.nextSession()" ${this.state.currentPage >= totalPages - 1 ? 'disabled' : ''} 
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-black hover:stroke-white active:scale-95 disabled:opacity-20 transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>

                <!-- Featured Map Frame -->
                <div class="group relative rounded-[2.5rem] overflow-hidden bg-black/[0.02] border border-black/5 shadow-inner">
                    <div id="${mapId}" class="w-full h-[350px]"></div>
                    <div class="absolute bottom-6 right-6 z-10">
                        <div class="glass px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/40">Interactive View</div>
                    </div>
                </div>

                <!-- Stats High-Design Grid -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-px bg-black/5 rounded-[2rem] overflow-hidden border border-black/5">
                    ${this.renderStatCard("Distance", session.distance.toFixed(2), "KM", "bg-white")}
                    ${this.renderStatCard("Duration", Math.floor(session.duration/60), "MIN", "bg-white")}
                    ${this.renderStatCard("Sites", session.stations?.length || 0, "VISITED", "bg-white")}
                    ${this.renderStatCard("Avg Speed", session.duration > 0 ? (session.distance / (session.duration/3600)).toFixed(1) : "0.0", "KM/H", "bg-white")}
                </div>

                <!-- Route Timeline -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
                    <!-- Location Details -->
                    <div class="space-y-8">
                        <p class="text-[11px] font-black text-black/20 uppercase tracking-[0.3em]">Trajectory Information</p>
                        <div class="relative space-y-10 pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-black/10">
                            <div class="relative">
                                <div class="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-black border-4 border-white shadow-sm"></div>
                                <span class="block text-[9px] font-bold text-black/30 uppercase tracking-widest mb-1">Point of Origin</span>
                                <p class="text-sm font-semibold text-black">${session.startAddress}</p>
                            </div>
                            <div class="relative">
                                <div class="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-red-500 border-4 border-white shadow-sm"></div>
                                <span class="block text-[9px] font-bold text-black/30 uppercase tracking-widest mb-1">Final Terminal</span>
                                <p class="text-sm font-semibold text-black">${session.endAddress}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Stations / Leads -->
                    <div class="space-y-6">
                         <p class="text-[11px] font-black text-black/20 uppercase tracking-[0.3em]">Site Observations</p>
                         <div class="space-y-3">
                            ${session.stations && session.stations.length > 0 ? session.stations.map((s, idx) => `
                                <div class="flex items-center justify-between gap-3 p-5 bg-black/[0.02] border border-black/[0.03] rounded-2xl hover:bg-black/5 transition-all">
                                    <div class="flex items-center gap-4 flex-1 min-w-0">
                                        <span class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">${s.number}</span>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs font-bold text-black truncate">${s.address}</p>
                                            <p class="text-[9px] font-medium text-black/30 uppercase tracking-widest">Arrival: ${new Date(s.arrivalTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                                        </div>
                                    </div>
                                    <button onclick="addContactToStation(${session.id}, ${idx})" 
                                        class="flex-shrink-0 w-[90px] px-3 py-2.5 bg-white border border-black/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm whitespace-nowrap">
                                        ${s.contact ? 'Details' : 'Add Lead'}
                                    </button>
                                </div>
                            `).join('') : '<p class="text-xs italic text-black/30">No intermediary stops recorded.</p>'}
                         </div>
                    </div>
                </div>
            </div>
        `;

        requestAnimationFrame(() => this.initializeMapPreview(mapId, session));
    },

    renderStatCard(label, value, unit, bgColor) {
        return `
            <div class="${bgColor} p-8">
                <p class="text-[9px] font-black text-black/20 uppercase tracking-[0.2em] mb-3">${label}</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-light tracking-tighter text-black" style="font-family: 'Butler';">${value}</span>
                    <span class="text-[10px] font-bold text-black/40 uppercase tracking-widest">${unit}</span>
                </div>
            </div>
        `;
    },

    initializeMapPreview(mapId, session) {
        const mapContainer = document.getElementById(mapId);
        if (!mapContainer || mapContainer._leaflet_id) return;

        // Prevent scroll interference on touch devices
        mapContainer.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        }, { passive: true });
        
        mapContainer.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });

        try {
            const previewMap = L.map(mapId, {
                zoomControl: false, 
                attributionControl: false,
                dragging: true, 
                scrollWheelZoom: false,
                doubleClickZoom: true,
                touchZoom: true,
                tap: true
            });

            const tileUrl = window.currentMapLayer === 'satellite' 
                ? 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
                : 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
            
            L.tileLayer(tileUrl, { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(previewMap);

            if (session.path && session.path.length > 0) {
                const pathCoords = session.path.map(p => [p.lat, p.lng]);
                
                L.polyline(pathCoords, {
                    color: '#000',
                    weight: 3,
                    opacity: 0.8,
                    smoothFactor: 1.5
                }).addTo(previewMap);

                // Start Node
                L.circleMarker([session.startLocation.lat, session.startLocation.lng], {
                    radius: 6, fillColor: '#000', color: '#fff', weight: 3, fillOpacity: 1
                }).addTo(previewMap);

                // End Node
                L.circleMarker(pathCoords[pathCoords.length - 1], {
                    radius: 6, fillColor: '#ef4444', color: '#fff', weight: 3, fillOpacity: 1
                }).addTo(previewMap);

                previewMap.fitBounds(L.latLngBounds(pathCoords), { padding: [40, 40], animate: false });
            }
        } catch (e) {
            console.error('History Map Error:', e);
            mapContainer.innerHTML = '<div class="flex items-center justify-center h-full text-[10px] uppercase font-bold text-black/20 italic">Visual Record Unavailable</div>';
        }
    }
};

window.HistoryModal = {
    open: () => HistoryModalComponent.open(),
    close: () => HistoryModalComponent.close(),
    prevSession: () => HistoryModalComponent.prevSession(),
    nextSession: () => HistoryModalComponent.nextSession()
};

HistoryModalComponent.init();