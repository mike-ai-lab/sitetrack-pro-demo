/**
 * StreetTracker Control Panel Component
 * Modular, self-contained panel with all UI and logic
 */

const PanelComponent = {
    // State
    state: {
        isExpanded: true,
        currentTab: 'planner',
        isRecording: false,
        isDriving: false,
        isPaused: false
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
                    
                        <!-- Segmented Control (4 Tabs) -->
                        <div class="px-5 pb-5">
                            <div class="flex bg-black/[0.04] p-1.5 rounded-[1.6rem] relative h-12 items-center">
                                <button id="btn-planner" class="flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] z-10 transition-colors duration-500 tab-active">
                                    Plan
                                </button>
                                <button id="btn-recorder" class="flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] z-10 transition-colors duration-500 tab-inactive">
                                    Rec
                                </button>
                                <button id="btn-live" class="flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] z-10 transition-colors duration-500 tab-inactive">
                                    Live
                                </button>
                                <button id="btn-history" class="flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] z-10 transition-colors duration-500 tab-inactive">
                                    History
                                </button>
                                <!-- Animated Pill Indicator -->
                                <div id="pill" class="absolute h-[38px] w-[calc(25%-8px)] bg-black rounded-[1.3rem] transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xl shadow-black/30" style="transform: translateX(0px);"></div>
                            </div>
                        </div>

                        <!-- Tab Content Area -->
                        <div class="px-8 pb-10">
                            
                            <!-- PLANNER TAB -->
                            <div id="view-planner" class="space-y-6">
                                <!-- Route Detail -->
                                <div class="space-y-4">
                                    <div class="flex justify-between items-end">
                                        <p class="text-[10px] font-black text-black/25 uppercase tracking-[0.25em]">Route</p>
                                        <span id="trip-badge" class="text-[9px] font-bold text-black/40 uppercase tracking-widest">Set Pickup</span>
                                    </div>
                                    
                                    <div class="relative space-y-4 pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[1px] before:bg-black/10">
                                        <!-- Pickup -->
                                        <div id="pickup-box" class="group cursor-pointer">
                                            <span class="block text-[10px] font-bold text-black/40 uppercase tracking-tight mb-1">Pickup</span>
                                            <div class="flex items-center gap-2">
                                                <div class="w-1.5 h-1.5 rounded-full bg-black/40"></div>
                                                <span id="pickup-label" class="text-xs font-semibold text-black/40 group-hover:text-black transition-colors italic truncate">Set pickup...</span>
                                            </div>
                                        </div>
                                        <!-- Destination -->
                                        <div id="dest-box" class="group cursor-pointer">
                                            <span class="block text-[10px] font-bold text-black/40 uppercase tracking-tight mb-1">Destination</span>
                                            <div class="flex items-center gap-2">
                                                <div class="w-1.5 h-1.5 rounded-full bg-black"></div>
                                                <span id="dest-label" class="text-xs font-semibold text-black/40 group-hover:text-black transition-colors italic truncate">Set destination...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Follow Toggle -->
                                <div class="flex items-center justify-between py-2 border-b border-black/[0.05]">
                                    <span class="text-[10px] font-bold text-black/40 uppercase tracking-widest">Follow Car</span>
                                    <input type="checkbox" id="follow-toggle" checked class="w-3.5 h-3.5 rounded accent-black">
                                </div>

                                <!-- Speed Control -->
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <span class="text-[10px] font-black text-black/25 uppercase tracking-widest">Speed</span>
                                        <span id="speed-display" class="text-[11px] font-bold text-black/60">Normal</span>
                                    </div>
                                    <input type="range" id="speed-slider" min="10" max="250" value="80" class="w-full h-1 bg-black/5 rounded-lg cursor-pointer">
                                </div>

                                <!-- Control Buttons — circular -->
                                <div class="flex items-center justify-center gap-4 pt-2">
                                    <button id="start-btn" disabled title="Start Trip"
                                        class="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 disabled:bg-black/10 disabled:text-black/20 disabled:cursor-not-allowed transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </button>
                                    <button id="pause-btn" disabled title="Pause"
                                        class="hidden w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                                    </button>
                                    <button id="resume-btn" disabled title="Resume"
                                        class="hidden w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </button>
                                    <button id="end-btn" title="End Trip"
                                        class="hidden w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>
                                    </button>
                                    <button id="reset-planner-btn" title="Reset"
                                        class="w-12 h-12 flex items-center justify-center bg-black/[0.04] text-black/40 rounded-full hover:bg-black/10 transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                                            <path d="M21 3v5h-5"/>
                                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                                            <path d="M3 21v-5h5"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- RECORDER TAB -->
                            <div id="view-recorder" class="space-y-6 hidden">
                                <!-- Status (text only, no badge) -->
                                <div class="flex items-center justify-between">
                                    <span id="record-badge" class="text-[9px] font-bold text-black/30 uppercase tracking-widest">Ready</span>
                                    <div id="recording-indicator" class="hidden flex items-center gap-1.5">
                                        <div class="w-1.5 h-1.5 bg-black rounded-full recording-pulse"></div>
                                        <span class="text-[9px] font-bold text-black/50 uppercase tracking-widest">Recording</span>
                                    </div>
                                </div>

                                <!-- Auto Focus Toggle -->
                                <div class="flex items-center justify-between py-2 border-b border-black/[0.05]">
                                    <span class="text-[10px] font-bold text-black/40 uppercase tracking-widest">Auto Focus</span>
                                    <input type="checkbox" id="auto-focus-toggle" class="w-3.5 h-3.5 rounded accent-black">
                                </div>

                                <!-- Recording Stats -->
                                <div class="py-4 bg-black/[0.02] rounded-[1.5rem] border border-black/[0.04] text-center space-y-3">
                                    <div class="flex justify-center gap-8">
                                        <div class="text-center">
                                            <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Distance</p>
                                            <p id="rec-distance" class="text-sm font-bold text-black">0.0 km</p>
                                        </div>
                                        <div class="w-[1px] bg-black/5"></div>
                                        <div class="text-center">
                                            <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Time</p>
                                            <p id="rec-duration" class="text-sm font-bold text-black">00:00</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-center gap-8">
                                        <div class="text-center">
                                            <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">New</p>
                                            <p id="rec-streets" class="text-sm font-bold text-black">0</p>
                                        </div>
                                        <div class="w-[1px] bg-black/5"></div>
                                        <div class="text-center">
                                            <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Revisit</p>
                                            <p id="rec-revisited" class="text-sm font-bold text-black">0</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Control Buttons — circular -->
                                <div class="flex items-center justify-center gap-4">
                                    <button id="start-recording-btn" title="Start Recording"
                                        class="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 disabled:bg-black/10 disabled:text-black/20 disabled:cursor-not-allowed transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </button>
                                    <button id="stop-recording-btn" disabled title="Stop Recording"
                                        class="hidden w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 disabled:bg-black/10 disabled:text-black/20 disabled:cursor-not-allowed transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>
                                    </button>
                                    <button id="reset-recorder-btn" title="Reset"
                                        class="w-12 h-12 flex items-center justify-center bg-black/[0.04] text-black/40 rounded-full hover:bg-black/10 transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                                            <path d="M21 3v5h-5"/>
                                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                                            <path d="M3 21v-5h5"/>
                                        </svg>
                                    </button>
                                </div>

                                <!-- Save Session — full-width pill button -->
                                <button id="save-session-btn" disabled
                                    class="hidden w-full bg-black text-white text-[11px] font-bold py-3 rounded-full hover:bg-black/80 disabled:bg-black/10 disabled:text-black/20 disabled:cursor-not-allowed transition-all uppercase tracking-widest">
                                    Save Session
                                </button>
                            </div>

                            <!-- LIVE TAB -->
                            <div id="view-live" class="hidden space-y-5">

                                <!-- Header row -->
                                <div class="flex items-center justify-between">
                                    <p class="text-[10px] font-black text-black/25 uppercase tracking-[0.25em]">Prospecting</p>
                                    <span id="live-stat-sites" class="text-[9px] font-bold text-black/30 uppercase tracking-widest">0 sites</span>
                                </div>

                                <!-- Session stats -->
                                <div id="live-stats-row" class="hidden flex justify-center gap-8 py-3 bg-black/[0.02] rounded-[1.5rem] border border-black/[0.04]">
                                    <div class="text-center">
                                        <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Distance</p>
                                        <p id="live-stat-dist" class="text-sm font-bold text-black">0.00 km</p>
                                    </div>
                                    <div class="w-[1px] bg-black/5"></div>
                                    <div class="text-center">
                                        <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Time</p>
                                        <p id="live-stat-time" class="text-sm font-bold text-black">00:00</p>
                                    </div>
                                </div>

                                <!-- Empty state -->
                                <div id="live-empty-state" class="py-8 text-center">
                                    <p class="text-[10px] font-bold text-black/20 uppercase tracking-[0.2em]">Start a session</p>
                                    <p class="text-[9px] text-black/25 mt-1">GPS tracks your path · FAB drops site pins</p>
                                </div>

                                <!-- Station tree list -->
                                <div id="live-station-list" class="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1"></div>

                                <!-- Start / Stop buttons -->
                                <div class="flex items-center justify-center gap-4 pt-1">
                                    <button id="live-start-btn" onclick="LiveProspect.startSession()" title="Start Session"
                                        class="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </button>
                                    <button id="live-stop-btn" onclick="LiveProspect.stopSession()" title="End Session"
                                        class="hidden w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-black/80 transition-all active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>
                                    </button>
                                </div>
                            </div>

                            <!-- HISTORY TAB -->
                            <div id="view-history" class="hidden">
                                <!-- Header with Action Buttons -->
                                <div class="flex items-center justify-between mb-5">
                                    <span class="text-[10px] font-black text-black/25 uppercase tracking-[0.25em]">Recent Logs</span>
                                    <div class="flex items-center gap-2">
                                        <!-- Stop Recording Button (only visible when recording) -->
                                        <button id="history-stop-btn" onclick="window.stopRecording && window.stopRecording()" title="Stop Recording"
                                            class="hidden w-9 h-9 flex items-center justify-center bg-black text-white rounded-full hover:bg-black/80 transition-all">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>
                                        </button>
                                        <!-- Maximize Button -->
                                        <button onclick="HistoryModal.open()" title="Maximize"
                                            class="w-9 h-9 flex items-center justify-center bg-black/[0.04] text-black/40 rounded-full hover:bg-black/10 transition-all">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Tree-structured history list -->
                                <div id="main-history-list" class="space-y-4 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
                                    <p class="text-[10px] text-black/25 italic text-center py-8">No recording sessions yet</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- LIVE PROSPECTING OVERLAYS (appended to body layer) -->
            <!-- ═══════════════════════════════════════════════════ -->

            <!-- FAB and photo input are injected into <body> by live.js to avoid overflow-hidden clipping -->

            <!-- Lead Entry Form Modal -->
            <div id="live-lead-overlay" class="hidden fixed inset-0 z-[3000] bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div class="live-modal-card scale-95 transition-transform duration-200 bg-white w-full sm:max-w-sm rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-y-auto max-h-[92vh]">

                    <!-- Modal header -->
                    <div class="sticky top-0 bg-white px-6 pt-5 pb-4 border-b border-black/[0.06] flex items-center justify-between z-10">
                        <div>
                            <p class="text-[8px] font-black text-black/25 uppercase tracking-widest mb-0.5">New Lead</p>
                            <div class="flex items-center gap-2">
                                <span id="lead-site-num" class="text-sm font-bold text-black">#—</span>
                                <span class="text-[9px] text-black/30">·</span>
                                <span id="lead-site-addr" class="text-[10px] text-black/40 italic truncate max-w-[180px]">Resolving…</span>
                            </div>
                        </div>
                        <button onclick="LiveProspect.closeLeadForm()" class="w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.04] text-black/40 hover:bg-black/10 transition-all">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>

                    <!-- Form body -->
                    <div class="px-6 py-5 space-y-4">

                        <!-- Name -->
                        <div>
                            <label class="text-[9px] font-bold text-black/30 uppercase tracking-widest block mb-1.5">Contact Name</label>
                            <input id="lead-name" type="text" placeholder="e.g. Mohammed Al-Hassan"
                                class="w-full px-4 py-3 text-sm bg-black/[0.03] border border-black/[0.06] rounded-xl focus:outline-none focus:border-black/20 transition-all placeholder:text-black/20">
                        </div>

                        <!-- Role -->
                        <div>
                            <label class="text-[9px] font-bold text-black/30 uppercase tracking-widest block mb-1.5">Role</label>
                            <select id="lead-role"
                                class="w-full px-4 py-3 text-sm bg-black/[0.03] border border-black/[0.06] rounded-xl focus:outline-none focus:border-black/20 transition-all text-black appearance-none">
                                <option value="">Select role…</option>
                                <option value="Foreman">Foreman</option>
                                <option value="Architect">Architect</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Owner">Owner / Developer</option>
                                <option value="Contractor">Contractor</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <!-- Phones -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="text-[9px] font-bold text-black/30 uppercase tracking-widest block mb-1.5">Phone</label>
                                <input id="lead-phone" type="tel" placeholder="+966 5x …"
                                    class="w-full px-3 py-3 text-sm bg-black/[0.03] border border-black/[0.06] rounded-xl focus:outline-none focus:border-black/20 transition-all placeholder:text-black/20">
                            </div>
                            <div>
                                <label class="text-[9px] font-bold text-black/30 uppercase tracking-widest block mb-1.5">Phone 2</label>
                                <input id="lead-phone2" type="tel" placeholder="optional"
                                    class="w-full px-3 py-3 text-sm bg-black/[0.03] border border-black/[0.06] rounded-xl focus:outline-none focus:border-black/20 transition-all placeholder:text-black/20">
                            </div>
                        </div>

                        <!-- Notes -->
                        <div>
                            <label class="text-[9px] font-bold text-black/30 uppercase tracking-widest block mb-1.5">Notes</label>
                            <textarea id="lead-notes" rows="3" placeholder="Project type, stage, materials interest…"
                                class="w-full px-4 py-3 text-sm bg-black/[0.03] border border-black/[0.06] rounded-xl focus:outline-none focus:border-black/20 transition-all placeholder:text-black/20 resize-none"></textarea>
                        </div>

                        <!-- Photos -->
                        <div>
                            <label class="text-[9px] font-bold text-black/30 uppercase tracking-widest block mb-2">Site Photos</label>
                            <div class="flex gap-2 overflow-x-auto pb-1" id="lead-photo-thumbs"></div>
                            <button onclick="LiveProspect.triggerPhotoUpload()"
                                class="mt-2 w-full py-3 border border-dashed border-black/15 rounded-xl text-[10px] font-bold text-black/30 uppercase tracking-widest hover:border-black/30 hover:text-black/50 transition-all flex items-center justify-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                Camera / Gallery
                            </button>
                        </div>

                        <!-- Save -->
                        <button onclick="LiveProspect.saveLeadForm()"
                            class="w-full py-3.5 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-black/80 transition-all active:scale-95 shadow-lg shadow-black/20">
                            Save Lead
                        </button>
                    </div>
                </div>
            </div>

            <!-- Contact View Modal -->
            <div id="live-contact-overlay" class="hidden fixed inset-0 z-[3000] bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div class="live-modal-card scale-95 transition-transform duration-200 bg-white w-full sm:max-w-sm rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-y-auto max-h-[85vh]">

                    <div class="sticky top-0 bg-white px-6 pt-5 pb-4 border-b border-black/[0.06] flex items-center justify-between z-10">
                        <div>
                            <p class="text-[8px] font-black text-black/25 uppercase tracking-widest mb-0.5">Contact</p>
                            <span id="contact-modal-num" class="text-sm font-bold text-black">Site #—</span>
                        </div>
                        <button onclick="LiveProspect.closeContactModal()" class="w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.04] text-black/40 hover:bg-black/10 transition-all">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>

                    <div class="px-6 py-5 space-y-4">
                        <p id="contact-modal-addr" class="text-[10px] text-black/40 italic -mt-1"></p>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Name</p>
                                <p id="contact-modal-name" class="text-sm font-bold text-black"></p>
                            </div>
                            <div>
                                <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Role</p>
                                <p id="contact-modal-role" class="text-sm font-bold text-black"></p>
                            </div>
                            <div>
                                <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Phone</p>
                                <p id="contact-modal-phone" class="text-sm font-bold text-black"></p>
                            </div>
                            <div>
                                <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Phone 2</p>
                                <p id="contact-modal-phone2" class="text-sm font-bold text-black"></p>
                            </div>
                        </div>

                        <div>
                            <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-1">Notes</p>
                            <p id="contact-modal-notes" class="text-xs text-black/60 leading-relaxed"></p>
                        </div>

                        <div id="contact-modal-photos" class="hidden space-y-2"></div>
                    </div>
                </div>
            </div>
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
        document.body.appendChild(container.firstElementChild);

        // Cache element references
        this.cacheElements();

        // Bind event handlers
        this.bindEvents();

        // Init LiveProspect module
        if (window.LiveProspect) {
            window.LiveProspect.init(map);
        }

        console.log('✅ Panel initialized');

        return this.getAPI();
    },

    // Cache DOM elements
    cacheElements() {
        const ids = [
            'main-panel', 'panel-header', 'panel-content', 'pill',
            'btn-planner', 'btn-recorder', 'btn-live', 'btn-history',
            'view-planner', 'view-recorder', 'view-live', 'view-history',
            'pickup-box', 'dest-box', 'pickup-label', 'dest-label', 'trip-badge',
            'follow-toggle', 'speed-slider', 'speed-display',
            'start-btn', 'pause-btn', 'resume-btn', 'end-btn', 'reset-planner-btn',
            'record-badge', 'recording-indicator', 'auto-focus-toggle',
            'rec-distance', 'rec-duration', 'rec-streets', 'rec-revisited',
            'start-recording-btn', 'stop-recording-btn', 'reset-recorder-btn', 'save-session-btn',
            'history-list', 'history-stop-btn'
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

        // Tab switching
        el['btn-planner'].onclick = () => this.switchTab('planner');
        el['btn-recorder'].onclick = () => this.switchTab('recorder');
        el['btn-live'].onclick = () => this.switchTab('live');
        el['btn-history'].onclick = () => this.switchTab('history');

        // Speed slider
        el['speed-slider'].oninput = (e) => this.updateSpeedDisplay(e.target.value);

        // Planner controls
        el['pickup-box'].onclick = () => window.startEditingPoint && window.startEditingPoint(0);
        el['dest-box'].onclick = () => window.startEditingPoint && window.startEditingPoint(1);
        el['start-btn'].onclick = () => window.handleStart && window.handleStart();
        el['pause-btn'].onclick = () => window.togglePause && window.togglePause();
        el['resume-btn'].onclick = () => window.togglePause && window.togglePause();
        el['end-btn'].onclick = () => window.endTrip && window.endTrip();
        el['reset-planner-btn'].onclick = () => window.resetPlanner && window.resetPlanner();

        // Recorder controls
        el['start-recording-btn'].onclick = () => window.startRecording && window.startRecording();
        el['stop-recording-btn'].onclick = () => window.stopRecording && window.stopRecording();
        el['reset-recorder-btn'].onclick = () => window.resetRecorder && window.resetRecorder();
        el['save-session-btn'].onclick = () => window.saveSession && window.saveSession();
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

    // Switch between tabs
    switchTab(tab) {
        const previousTab = this.state.currentTab;
        
        console.log(`🔄 Switching from ${previousTab} to ${tab}`);
        
        // COMPLETE ISOLATION: Clean up previous tab before switching
        if (previousTab === 'planner' && tab !== 'planner') {
            console.log('🧹 Cleaning up Planner tab - stopping trip and clearing map...');
            
            // Force stop any ongoing trip
            if (window.isDriving) {
                window.shouldEndTrip = true;
                window.isDriving = false;
                window.isPaused = false;
            }
            
            // Full reset of planner
            if (window.resetPlanner) {
                window.resetPlanner();
            }
            
            console.log('✅ Planner cleaned up');
        }
        
        if (previousTab === 'recorder' && tab !== 'recorder') {
            // DON'T reset recorder when switching to/from history tab
            if (tab === 'history') {
                console.log('📜 Switching to History tab - keeping recorder session active');
            } else {
                console.log('🧹 Cleaning up Recorder tab - stopping recording and clearing map...');
                
                // Force stop any ongoing recording
                if (window.isRecording && window.stopRecording) {
                    window.stopRecording();
                }
                
                // Full reset of recorder
                if (window.resetRecorder) {
                    window.resetRecorder();
                }
                
                console.log('✅ Recorder cleaned up');
            }
        }
        
        if (previousTab === 'history' && tab !== 'history') {
            // DON'T reset recorder when switching from history to recorder
            if (tab === 'recorder') {
                console.log('🔴 Switching to Recorder tab - keeping session active');
            } else {
                console.log('📜 Leaving History tab');
            }
        }

        // Update tab state
        this.state.currentTab = tab;
        this.state.isDriving = false;
        this.state.isRecording = false;
        
        // Update global currentMode for backward compatibility
        if (window.currentMode !== undefined) {
            window.currentMode = tab;
        }
        
        // AUTO-ENABLE simulation mode when switching to recorder tab
        if (tab === 'recorder' && window.simulationMode !== undefined) {
            window.simulationMode = true;
            window.isLocationFound = true; // Mark as found so recording can start
            
            // Enable the start recording button
            const startBtn = this.refs.elements['start-recording-btn'];
            if (startBtn) {
                startBtn.disabled = false;
            }
            
            // Update badge to match original "Sim Ready" state (text only, no color badge)
            const badge = this.refs.elements['record-badge'];
            if (badge) {
                badge.innerText = 'Sim Ready';
            }
            
            console.log('✅ Recorder tab ready - simulation mode enabled');
        }
        
        const el = this.refs.elements;

        // Hide all views
        el['view-planner'].classList.add('hidden');
        el['view-recorder'].classList.add('hidden');
        el['view-live'].classList.add('hidden');
        el['view-history'].classList.add('hidden');

        // Reset all buttons
        el['btn-planner'].classList.remove('tab-active');
        el['btn-planner'].classList.add('tab-inactive');
        el['btn-recorder'].classList.remove('tab-active');
        el['btn-recorder'].classList.add('tab-inactive');
        el['btn-live'].classList.remove('tab-active');
        el['btn-live'].classList.add('tab-inactive');
        el['btn-history'].classList.remove('tab-active');
        el['btn-history'].classList.add('tab-inactive');

        // Calculate pill position (25% width for 4 tabs)
        const offset = el['btn-planner'].offsetWidth;
        const positions = {
            'planner': 0,
            'recorder': offset,
            'live': offset * 2,
            'history': offset * 3
        };

        // Animate pill and show active tab
        el['pill'].style.transform = `translateX(${positions[tab]}px)`;
        el[`view-${tab}`].classList.remove('hidden');
        el[`btn-${tab}`].classList.remove('tab-inactive');
        el[`btn-${tab}`].classList.add('tab-active');

        // Render history panel when switching to history tab
        if (tab === 'history' && window.renderHistoryPanel) {
            console.log('📜 Switching to history tab, rendering history...');
            setTimeout(() => window.renderHistoryPanel(), 50);
        }

        // Update map cursor
        if (this.refs.map) {
            this.refs.map.getContainer().style.cursor = tab === 'planner' ? 'crosshair' : 'default';
        }

        // Ensure panel is expanded when switching
        if (!this.state.isExpanded) {
            this.togglePanel();
        }
    },

    // Update speed display
    updateSpeedDisplay(value) {
        const val = parseInt(value);
        const display = val < 40 ? "Traffic" : val > 150 ? "Express" : "Normal";
        this.refs.elements['speed-display'].innerText = display;
    },
    
    // Show/hide history recording controls
    showHistoryRecordingControls() {
        const stopBtn = this.refs.elements['history-stop-btn'];
        if (stopBtn) {
            stopBtn.classList.remove('hidden');
        }
    },
    
    hideHistoryRecordingControls() {
        const stopBtn = this.refs.elements['history-stop-btn'];
        if (stopBtn) {
            stopBtn.classList.add('hidden');
        }
    },

    // Public API
    getAPI() {
        return {
            toggle: () => this.togglePanel(),
            switchTab: (tab) => this.switchTab(tab),
            showHistoryRecordingControls: () => this.showHistoryRecordingControls(),
            hideHistoryRecordingControls: () => this.hideHistoryRecordingControls(),
            updateBadge: (text, color) => {
                this.refs.elements['trip-badge'].innerText = text;
                // Update colors as needed
            },
            updateStats: (stats) => {
                if (stats.distance) this.refs.elements['rec-distance'].innerText = `${stats.distance} km`;
                if (stats.duration) this.refs.elements['rec-duration'].innerText = stats.duration;
                if (stats.streets) this.refs.elements['rec-streets'].innerText = stats.streets;
                if (stats.revisited) this.refs.elements['rec-revisited'].innerText = stats.revisited;
            },
            setDrivingState: (isDriving) => {
                this.state.isDriving = isDriving;
                // Sync with global state
                if (window.isDriving !== undefined) window.isDriving = isDriving;
            },
            setRecordingState: (isRecording) => {
                this.state.isRecording = isRecording;
                // Sync with global state
                if (window.isRecording !== undefined) window.isRecording = isRecording;
            },
            getElements: () => this.refs.elements,
            getState: () => this.state
        };
    }
};

// Export initialization function (no config needed)
window.initPanel = (map) => PanelComponent.init(map);


// Expose panel functions globally for onclick handlers
// Note: Most functions already exist in index.html, so we just ensure they're accessible

// Only wrap handleStart since it's a special case
window.handleStart = function() {
    if (window.startTrip) window.startTrip();
};

// All other functions are already defined in index.html:
// - togglePause (already exists)
// - endTrip (already exists)
// - resetPlanner (already exists)
// - startEditingPoint (already exists)
// - startRecording (already exists)
// - stopRecording (already exists)
// - resetRecorder (already exists)
// - saveSession (already exists)



// Recording History Management
let currentHistoryPage = 0;
const ITEMS_PER_PAGE = 1;

window.renderHistoryPanel = function() {
    console.log('🎨 RENDER HISTORY PANEL CALLED');
    
    const historyList = document.getElementById('main-history-list');
    if (!historyList) {
        console.log('❌ main-history-list element not found');
        return;
    }

    console.log('window.recordingHistory:', window.recordingHistory);

    // Only show recording sessions (not trip plans)
    const allHistory = (window.recordingHistory || [])
        .sort((a, b) => b.id - a.id);

    console.log('📊 Total recording sessions:', allHistory.length);
    console.log('allHistory:', allHistory);

    if (allHistory.length === 0) {
        historyList.innerHTML = '<p class="text-[10px] text-black/25 italic text-center py-8">No recording sessions yet</p>';
        console.log('ℹ️ No recording sessions to display');
        return;
    }

    const totalPages = Math.ceil(allHistory.length / ITEMS_PER_PAGE);
    const startIdx = currentHistoryPage * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const pageItems = allHistory.slice(startIdx, endIdx);

    console.log(`📄 Showing page ${currentHistoryPage + 1}/${totalPages}, items:`, pageItems.length);

    historyList.innerHTML = '';

    pageItems.forEach(item => {
        console.log('🔨 Rendering recording session:', item);
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
    
    const date = new Date(session.timestamp);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const durationMin = Math.floor(session.duration / 60);
    const durationSec = session.duration % 60;
    const durationStr = `${durationMin}:${durationSec.toString().padStart(2, '0')}`;
    
    // Create unique ID for this map
    const mapId = `route-preview-${session.id}`;
    
    item.innerHTML = `
        <!-- Session header row -->
        <div onclick="toggleRecordingDetails(${session.id})"
            class="flex items-center justify-between p-4 bg-black/[0.03] rounded-2xl hover:bg-black/[0.05] transition-all cursor-pointer">
            <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0"></div>
                <div>
                    <p class="text-xs font-bold text-black">${dateStr}</p>
                    <p class="text-[9px] font-bold text-black/30 uppercase tracking-widest mt-0.5">${session.distance.toFixed(1)} km · ${durationStr} min</p>
                </div>
            </div>
            <svg id="chevron-${session.id}" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-black/20 transition-transform duration-300">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </div>

        <!-- Expandable detail tree -->
        <div id="details-${session.id}" class="hidden mt-2 ml-4 pl-4 border-l border-black/[0.06] space-y-1 pb-2">
            <!-- Route mini-map -->
            <div id="${mapId}" class="w-full h-28 rounded-xl bg-black/[0.03] overflow-hidden mb-3 relative">
                <div class="absolute inset-0 flex items-center justify-center text-[9px] text-black/25">Loading map...</div>
            </div>

            <!-- Start / End nodes -->
            <div class="flex items-start gap-3 py-1">
                <div class="w-1.5 h-1.5 rounded-full bg-black/30 mt-1 flex-shrink-0"></div>
                <div>
                    <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-0.5">Start</p>
                    <p class="text-[11px] font-semibold text-black truncate">${session.startAddress}</p>
                    <p class="text-[9px] text-black/30">${timeStr}</p>
                </div>
            </div>
            <div class="w-[1px] h-3 bg-black/[0.06] ml-[2px]"></div>
            <div class="flex items-start gap-3 py-1">
                <div class="w-1.5 h-1.5 rounded-full bg-black mt-1 flex-shrink-0"></div>
                <div>
                    <p class="text-[8px] font-bold text-black/25 uppercase tracking-widest mb-0.5">End</p>
                    <p class="text-[11px] font-semibold text-black truncate">${session.endAddress}</p>
                </div>
            </div>

            <!-- Stations tree -->
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
                                <span class="text-[9px] font-bold text-black/25 mt-0.5 flex-shrink-0">#${station.number}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-[11px] font-bold text-black truncate">${station.address}</p>
                                    <p class="text-[9px] text-black/30 italic">${arrivalStr} – ${departureStr} · ${sDurationMin}:${sDurationSec.toString().padStart(2, '0')} min</p>
                                    <button onclick="addContactToStation(${session.id}, ${idx})"
                                        class="mt-2 px-3 py-1.5 ${station.contact ? 'bg-black text-white' : 'bg-white border border-black/10 text-black'} rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                                        ${station.contact ? 'Edit Contact' : 'Add Lead Info'}
                                    </button>
                                    ${station.contact ? `<button onclick="viewStationContact(${session.id}, ${idx})"
                                        class="mt-2 ml-1 px-3 py-1.5 border border-black/10 text-black rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                                        Show Contact
                                    </button>` : ''}
                                    <button onclick="deleteStationFromHistory(${session.id}, ${idx})"
                                        class="mt-2 ml-1 px-3 py-1.5 border border-black/[0.08] text-black/30 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('<div class="w-[1px] h-2 bg-black/[0.05] ml-[10px]"></div>')}
                </div>
            ` : ''}

        <!-- Replay button — circular -->
            <div class="flex justify-center gap-3 pt-3">
                <button onclick="replayRecording(${session.id})"
                    class="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-black/80 transition-all shadow-md" title="Replay Recording">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <button onclick="deleteSessionFromHistory(${session.id})"
                    class="w-10 h-10 flex items-center justify-center border border-black/10 text-black/30 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all" title="Delete Session">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(item);
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

window.toggleRecordingDetails = function(sessionId) {
    const details = document.getElementById(`details-${sessionId}`);
    const chevron = document.getElementById(`chevron-${sessionId}`);
    if (details) {
        const isHidden = details.classList.contains('hidden');
        details.classList.toggle('hidden');
        if (chevron) {
            chevron.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
        }
        // Initialize the preview map after expanding
        if (isHidden) {
            const mapId = `route-preview-${sessionId}`;
            const session = (window.recordingHistory || []).find(s => s.id === sessionId);
            if (session) {
                setTimeout(() => initializeRoutePreview(mapId, session), 100);
            }
        }
    }
};

// ── History station CRUD ──────────────────────────────────────────────────────

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
