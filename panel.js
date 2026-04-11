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
                                        <span id="trip-badge" class="text-[9px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">Set Pickup</span>
                                    </div>
                                    
                                    <div class="relative space-y-4 pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[1px] before:bg-black/10">
                                        <!-- Pickup -->
                                        <div id="pickup-box" class="group cursor-pointer">
                                            <span class="block text-[10px] font-bold text-black/40 uppercase tracking-tight mb-1">Pickup</span>
                                            <div class="flex items-center gap-2">
                                                <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                <span id="pickup-label" class="text-xs font-semibold text-gray-500 group-hover:text-blue-600 transition-colors italic truncate">Set pickup...</span>
                                            </div>
                                        </div>
                                        <!-- Destination -->
                                        <div id="dest-box" class="group cursor-pointer">
                                            <span class="block text-[10px] font-bold text-black/40 uppercase tracking-tight mb-1">Destination</span>
                                            <div class="flex items-center gap-2">
                                                <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                <span id="dest-label" class="text-xs font-semibold text-gray-500 group-hover:text-red-600 transition-colors italic truncate">Set destination...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Follow Toggle -->
                                <div class="flex items-center justify-between p-2 bg-white/50 rounded-lg border border-gray-200">
                                    <span class="text-[10px] font-bold text-gray-700 uppercase">Follow Car</span>
                                    <input type="checkbox" id="follow-toggle" checked class="w-3.5 h-3.5 rounded">
                                </div>

                                <!-- Speed Control -->
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <span class="text-[10px] font-black text-black/25 uppercase tracking-widest">Speed</span>
                                        <span id="speed-display" class="text-[11px] font-bold bg-black/5 px-2 py-0.5 rounded-md">Normal</span>
                                    </div>
                                    <input type="range" id="speed-slider" min="10" max="250" value="80" class="w-full h-1 bg-gray-200 rounded-lg cursor-pointer">
                                </div>

                                <!-- Control Buttons -->
                                <div class="flex items-center justify-center gap-3 pt-2">
                                    <button id="start-btn" disabled class="w-[44px] h-[44px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95" title="Start Trip">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </button>
                                    <button id="pause-btn" disabled class="hidden w-[44px] h-[44px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95" title="Pause">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="6" y="4" width="4" height="16"/>
                                            <rect x="14" y="4" width="4" height="16"/>
                                        </svg>
                                    </button>
                                    <button id="resume-btn" disabled class="hidden w-[44px] h-[44px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95" title="Resume">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </button>
                                    <button id="end-btn" class="hidden w-[44px] h-[44px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95" title="End Trip">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="6" y="6" width="12" height="12"/>
                                        </svg>
                                    </button>
                                    <button id="reset-planner-btn" class="w-[44px] h-[44px] flex items-center justify-center bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all shadow-lg active:scale-95" title="Reset">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                                <!-- Status Badge -->
                                <div class="flex items-center justify-between">
                                    <span id="record-badge" class="bg-black/[0.03] text-black/60 text-[9px] px-2 py-0.5 rounded uppercase font-bold border border-black/[0.05]">Ready</span>
                                    <div id="recording-indicator" class="hidden flex items-center gap-1.5">
                                        <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                                        <span class="text-[9px] font-bold text-black/60">RECORDING</span>
                                    </div>
                                </div>

                                <!-- Auto Focus Toggle -->
                                <div class="flex items-center justify-between p-2 bg-white/50 rounded-lg border border-gray-200">
                                    <span class="text-[10px] font-bold text-gray-700 uppercase">Auto Focus</span>
                                    <input type="checkbox" id="auto-focus-toggle" class="w-3.5 h-3.5 rounded">
                                </div>

                                <!-- Recording Stats -->
                                <div class="bg-white/50 p-3 rounded-lg border border-gray-200">
                                    <div class="grid grid-cols-2 gap-3 text-center">
                                        <div>
                                            <p class="text-[8px] text-gray-400 uppercase mb-0.5">Distance</p>
                                            <p id="rec-distance" class="text-sm font-bold text-gray-900">0.0 km</p>
                                        </div>
                                        <div>
                                            <p class="text-[8px] text-gray-400 uppercase mb-0.5">Time</p>
                                            <p id="rec-duration" class="text-sm font-bold text-gray-900">00:00</p>
                                        </div>
                                        <div>
                                            <p class="text-[8px] text-gray-400 uppercase mb-0.5">New</p>
                                            <p id="rec-streets" class="text-sm font-bold text-blue-600">0</p>
                                        </div>
                                        <div>
                                            <p class="text-[8px] text-gray-400 uppercase mb-0.5">Revisit</p>
                                            <p id="rec-revisited" class="text-sm font-bold text-orange-600">0</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Control Buttons -->
                                <div class="flex items-center justify-center gap-3">
                                    <button id="start-recording-btn" class="w-[44px] h-[44px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95" title="Start Recording">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </button>
                                    <button id="stop-recording-btn" disabled class="hidden w-[44px] h-[44px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95" title="Stop Recording">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="6" y="6" width="12" height="12"/>
                                        </svg>
                                    </button>
                                    <button id="reset-recorder-btn" class="w-[44px] h-[44px] flex items-center justify-center bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all shadow-lg active:scale-95" title="Reset">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                                            <path d="M21 3v5h-5"/>
                                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                                            <path d="M3 21v-5h5"/>
                                        </svg>
                                    </button>
                                </div>

                                <!-- Save Session Button -->
                                <button id="save-session-btn" disabled class="hidden w-full bg-black text-white text-[11px] font-bold py-2.5 rounded-xl hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-md uppercase tracking-wide">
                                    Save Session
                                </button>
                            </div>

                            <!-- LIVE TAB -->
                            <div id="view-live" class="hidden">
                                <div class="py-16 text-center">
                                    <span class="text-[10px] font-bold text-black/20 uppercase tracking-[0.25em]">Live Tracking</span>
                                    <p class="text-xs text-black/40 mt-2">Coming soon</p>
                                </div>
                            </div>

                            <!-- HISTORY TAB -->
                            <div id="view-history" class="hidden">
                                <!-- Header with Action Buttons -->
                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-[10px] font-black text-black/25 uppercase tracking-[0.25em]">Sessions</span>
                                    <div class="flex items-center gap-2">
                                        <!-- Stop Recording Button (only visible when recording) -->
                                        <button id="history-stop-btn" onclick="window.stopRecording && window.stopRecording()" class="hidden w-[36px] h-[36px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-md" title="Stop Recording">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="6" width="12" height="12"/>
                                            </svg>
                                        </button>
                                        <!-- Maximize Button -->
                                        <button onclick="HistoryModal.open()" class="w-[36px] h-[36px] flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-md" title="Maximize">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <div id="main-history-list" class="space-y-2 max-h-[300px] overflow-y-auto">
                                    <p class="text-[10px] text-gray-400 italic text-center py-8">No recording sessions yet</p>
                                </div>
                            </div>

                        </div>
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

            /* Enhanced Glassmorphism */
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
                50% { opacity: .5; }
            }

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
            
            // Update badge to match original "Sim Ready" state
            const badge = this.refs.elements['record-badge'];
            if (badge) {
                badge.innerText = 'Sim Ready';
                badge.classList.remove('bg-gray-100', 'text-gray-700', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
                badge.classList.add('bg-yellow-100', 'text-yellow-700');
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
        historyList.innerHTML = '<div class="text-center text-gray-400 text-xs py-8">No recording sessions yet</div>';
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
        pagination.className = 'flex items-center justify-between mt-4 pt-4 border-t border-gray-200';
        pagination.innerHTML = `
            <button id="prev-page" ${currentHistoryPage === 0 ? 'disabled' : ''} 
                class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                ← Previous
            </button>
            <span class="text-xs text-gray-500">
                ${currentHistoryPage + 1} / ${totalPages}
            </span>
            <button id="next-page" ${currentHistoryPage >= totalPages - 1 ? 'disabled' : ''} 
                class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
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
    item.className = 'bg-white/50 rounded-2xl border border-gray-100 overflow-hidden';
    
    const date = new Date(session.timestamp);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const durationMin = Math.floor(session.duration / 60);
    const durationSec = session.duration % 60;
    const durationStr = `${durationMin}:${durationSec.toString().padStart(2, '0')}`;
    
    // Create unique ID for this map
    const mapId = `route-preview-${session.id}`;
    
    item.innerHTML = `
        <div>
            <!-- Route Preview Map -->
            <div id="${mapId}" class="w-full h-32 bg-gray-100 relative">
                <div class="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    Loading map...
                </div>
            </div>
            
            <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span class="text-xs font-bold text-gray-700">RECORDING SESSION</span>
                    </div>
                    <span class="text-[9px] text-gray-400">${dateStr} • ${timeStr}</span>
                </div>
                
                <div class="space-y-2 mb-3">
                    <div class="flex items-start gap-2">
                        <div class="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                        <div class="flex-1 min-w-0">
                            <div class="text-[8px] text-gray-400 uppercase tracking-wide mb-0.5">Start</div>
                            <div class="text-[10px] font-semibold text-gray-700 truncate">${session.startAddress}</div>
                        </div>
                    </div>
                    <div class="flex items-start gap-2">
                        <div class="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                        <div class="flex-1 min-w-0">
                            <div class="text-[8px] text-gray-400 uppercase tracking-wide mb-0.5">End</div>
                            <div class="text-[10px] font-semibold text-gray-700 truncate">${session.endAddress}</div>
                        </div>
                    </div>
                </div>
                
                <button onclick="toggleRecordingDetails(${session.id})" 
                    class="w-full text-[9px] text-blue-600 hover:text-blue-700 font-medium py-2 border-t border-gray-100 transition-colors">
                    View Details
                </button>
                
                <div id="details-${session.id}" class="hidden mt-3 pt-3 border-t border-gray-100 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-gray-50 rounded-lg p-2 border border-gray-200">
                            <div class="text-[8px] text-gray-500 uppercase tracking-wide mb-1">Distance</div>
                            <div class="text-sm font-bold text-gray-900">${session.distance.toFixed(2)} <span class="text-[9px] font-normal">km</span></div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-2 border border-gray-200">
                            <div class="text-[8px] text-gray-500 uppercase tracking-wide mb-1">Duration</div>
                            <div class="text-sm font-bold text-gray-900">${durationStr} <span class="text-[9px] font-normal">min</span></div>
                        </div>
                    </div>
                    
                    <!-- Stations List -->
                    ${session.stations && session.stations.length > 0 ? `
                        <div class="mt-3 pt-3 border-t border-gray-100">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-[9px] font-bold text-gray-700 uppercase tracking-wide">Sites Visited (${session.stations.length})</span>
                            </div>
                            <div class="space-y-2 max-h-48 overflow-y-auto">
                                ${session.stations.map((station, idx) => {
                                    const arrivalTime = new Date(station.arrivalTime);
                                    const departureTime = station.departureTime ? new Date(station.departureTime) : null;
                                    const arrivalStr = arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                    const departureStr = departureTime ? departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'In Progress';
                                    const durationMin = station.duration ? Math.floor(station.duration / 60) : 0;
                                    const durationSec = station.duration ? station.duration % 60 : 0;
                                    
                                    return `
                                        <div class="bg-white rounded-lg p-2 border border-gray-200 hover:border-gray-300 transition-all">
                                            <div class="flex items-start justify-between mb-1">
                                                <span class="text-[9px] font-bold text-gray-700">Site #${station.number}</span>
                                                <span class="text-[8px] text-gray-400">${durationMin}:${durationSec.toString().padStart(2, '0')} min</span>
                                            </div>
                                            <div class="text-[9px] text-gray-700 mb-1 truncate">${station.address}</div>
                                            <div class="text-[8px] text-gray-400">${arrivalStr} - ${departureStr}</div>
                                            <button onclick="addContactToStation(${session.id}, ${idx})" 
                                                class="mt-2 w-full px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[8px] font-medium rounded border border-gray-200 transition-all">
                                                ${station.contact ? 'View Contact' : 'Add Lead Info'}
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <button onclick="replayRecording(${session.id})" 
                        class="w-full mt-2 px-3 py-2 bg-black text-white text-[10px] font-bold rounded-lg hover:bg-gray-800 transition-all shadow-sm">
                        Replay Recording
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(item);
    
    // Initialize the preview map after DOM insertion
    setTimeout(() => {
        initializeRoutePreview(mapId, session);
    }, 100);
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
            
            // Draw the blue path
            L.polyline(pathCoords, {
                color: '#3b82f6',
                weight: 3,
                opacity: 0.8
            }).addTo(previewMap);
            
            // Add start marker
            L.circleMarker([session.startLocation.lat, session.startLocation.lng], {
                radius: 5,
                fillColor: '#3b82f6',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(previewMap);
            
            // Add end marker
            L.circleMarker([session.path[session.path.length - 1].lat, session.path[session.path.length - 1].lng], {
                radius: 5,
                fillColor: '#ef4444',
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
        mapContainer.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400 text-xs">Map unavailable</div>';
    }
}

window.toggleRecordingDetails = function(sessionId) {
    const details = document.getElementById(`details-${sessionId}`);
    if (details) {
        details.classList.toggle('hidden');
        const button = details.previousElementSibling;
        if (button) {
            button.innerHTML = details.classList.contains('hidden') 
                ? 'View Details ↓' 
                : 'Hide Details ↑';
        }
    }
};

// Placeholder function for adding contact to station
window.addContactToStation = function(sessionId, stationIndex) {
    console.log(`📝 Add contact to session ${sessionId}, station ${stationIndex}`);
    alert(`Contact form will open here.\n\nSession ID: ${sessionId}\nStation #${stationIndex + 1}\n\nThis will be integrated with your contact form component.`);
    
    // TODO: Open contact form modal
    // TODO: Save contact data to station.contact
    // TODO: Re-render history panel to show updated contact
};

window.replayRecording = function(sessionId) {
    const session = window.recordingHistory.find(s => s.id === sessionId);
    if (!session) return;
    
    alert('Replay feature coming soon! This will animate the recorded path on the map.');
    // TODO: Implement replay functionality
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
