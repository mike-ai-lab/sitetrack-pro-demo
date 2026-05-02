// Lead Pin Management System
// Modular implementation for managing lead pins on the map

// Data structures
let pins = [];
let currentFormData = { priority: 'Normal', status: 'Active', images: [] };
let mapInstance = null;

// Constants
const priorities = [
    { label: 'Critical', color: '#ef4444' },
    { label: 'High', color: '#f97316' },
    { label: 'Normal', color: '#3b82f6' },
    { label: 'Low', color: '#94a3b8' }
];

const roles = [
    { label: 'Owner', icon: 'star' },
    { label: 'Client', icon: 'star' },
    { label: 'Consultant', icon: 'square' },
    { label: 'Contractor', icon: 'triangle' },
    { label: 'Foreman', icon: 'circle' }
];

const phases = ['ST', 'INT', 'FD', 'EX', 'CL'];
const statuses = ['New', 'Active', 'On Hold', 'Closed'];

// Initialize lead system
function initLeadSystem() {
    console.log('🎯 Lead system initializing...');
    
    // Wait for map to be available
    const checkMap = setInterval(() => {
        if (window.leafletMap) {
            mapInstance = window.leafletMap;
            console.log('✅ Map instance connected');
            clearInterval(checkMap);
            
            // Load saved leads after map is ready
            loadLeadsFromStorage();
        }
    }, 100);
    
    setupMapClickForLeads();
    loadModals(); // Load modals first
    console.log('✅ Modals loaded');
    
    // Initialize form options after a short delay to ensure DOM is ready
    setTimeout(() => {
        initFormOptions();
        console.log('✅ Form options initialized');
        setupModalClickOutside(); // Setup click-outside handlers
        console.log('✅ Click-outside handlers setup');
        
        // Verify FAB button exists
        const fab = document.getElementById('add-lead-fab');
        if (fab) {
            console.log('✅ FAB button found in DOM');
        } else {
            console.error('❌ FAB button NOT found in DOM!');
        }
        
        // Verify modals exist
        const formModal = document.getElementById('formModal');
        const detailsModal = document.getElementById('leadDetailsModal');
        if (formModal && detailsModal) {
            console.log('✅ Both modals found in DOM');
        } else {
            console.error('❌ Modals NOT found in DOM!', { formModal: !!formModal, detailsModal: !!detailsModal });
        }
    }, 200);
}

// Load modal templates
function loadModals() {
    const modalsHTML = `
        <!-- FAB Button -->
        <button id="add-lead-fab" class="fab" onclick="LeadSystem.addLeadAtMapCenter()" title="Add Lead Pin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </button>

        <!-- Lead Form Modal -->
        <div id="formModal" class="modal-overlay">
            <div class="modal-content overflow-hidden flex flex-col max-h-[90vh]">
                <div class="p-6 bg-gray-50 border-b flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div id="modal-preview-pin"></div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-900">Specify Lead Pin</h3>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Entry</p>
                        </div>
                    </div>
                    <button onclick="LeadSystem.closeModal()" class="text-gray-400 hover:text-gray-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="p-6 space-y-3 overflow-y-auto flex-1 custom-scroll">
                    <input type="hidden" id="currentPinId">
                    
                    <!-- Urgency (Priority) -->
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Urgency</label>
                        <div class="grid grid-cols-4 gap-2" id="priority-options"></div>
                    </div>
                    
                    <!-- Name -->
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Name</label>
                        <input type="text" id="contactName" placeholder="Contact name..." class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition-colors">
                    </div>
                    
                    <!-- Mobile -->
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Mobile</label>
                        <input type="text" id="contactPhone" placeholder="05XXXXXXXX" class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition-colors">
                    </div>
                    
                    <!-- Role & Phase -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</label>
                            <select id="contactRole" onchange="LeadSystem.updatePreview()" class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold outline-none focus:border-gray-400 transition-colors">
                            </select>
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phase</label>
                            <select id="projectPhase" onchange="LeadSystem.updatePreview()" class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold outline-none focus:border-gray-400 transition-colors">
                            </select>
                        </div>
                    </div>
                    
                    <!-- Notes -->
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Notes</label>
                        <textarea id="siteNotes" class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition-colors h-20 resize-none" placeholder="Additional notes..."></textarea>
                    </div>
                    
                    <!-- Site Photos -->
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Site Photos</label>
                        <div class="flex flex-wrap gap-2" id="image-preview-container">
                            <label class="w-16 h-16 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-black transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <input type="file" id="imageInput" multiple accept="image/*" class="hidden" onchange="LeadSystem.handleImageUpload(event)">
                            </label>
                        </div>
                    </div>
                    
                    <!-- Status -->
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</label>
                        <div class="flex gap-2" id="status-options"></div>
                    </div>
                </div>
                <div class="p-4 bg-gray-50 border-t flex items-center gap-3">
                    <button id="btn-delete" onclick="LeadSystem.deletePin()" class="hidden p-3 bg-red-50 text-red-500 rounded-xl">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                    <button onclick="LeadSystem.closeModal()" class="flex-1 py-3 text-xs font-black uppercase text-gray-400">Cancel</button>
                    <button onclick="LeadSystem.saveLead(event)" class="flex-[2] py-4 bg-gray-900 text-white rounded-xl text-xs font-black uppercase shadow-xl">Update</button>
                </div>
            </div>
        </div>

        <!-- Lead Details Modal -->
        <div id="leadDetailsModal" class="modal-overlay">
            <div class="modal-content flex flex-col max-h-[90vh]">
                <div class="p-6 bg-black/[0.02] border-b border-black/[0.06] flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div id="lead-detail-preview-pin"></div>
                        <div>
                            <h3 class="text-lg font-bold text-black">Lead Details</h3>
                            <p id="lead-detail-subtitle" class="text-[10px] font-bold text-black/40 uppercase tracking-widest">Lead #1</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="LeadSystem.editLead()" class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all active:scale-90" title="Edit Lead">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button onclick="LeadSystem.closeLeadDetails()" class="w-10 h-10 bg-black/[0.05] text-black rounded-full flex items-center justify-center hover:bg-black/[0.1] transition-all active:scale-90">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="lead-details-content" class="p-6 space-y-4 overflow-y-auto flex-1 custom-scroll">
                    <!-- Content will be populated dynamically -->
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
    
    // Initialize lucide icons if available
    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }
}

// Setup map click handler for adding leads
function setupMapClickForLeads() {
    // This will be called when map is clicked in simulation mode
    window.addEventListener('lead-pin-requested', (e) => {
        const { lat, lng } = e.detail;
        addLeadPin(lat, lng);
    });
}

// Add lead pin at specific location
function addLeadPin(lat, lng, skipForm = false) {
    console.log('📍 addLeadPin called with:', lat, lng, 'skipForm:', skipForm);
    
    const pinId = Date.now();
    const newPin = {
        id: pinId,
        lat: lat,
        lng: lng,
        index: pins.length + 1,
        priority: 'Normal',
        status: 'Active',
        role: 'Owner',
        phase: 'ST',
        images: [],
        data: { name: '', phone: '', notes: '' }
    };
    
    pins.push(newPin);
    console.log('✅ Pin added to array, total pins:', pins.length);
    
    renderPin(newPin);
    console.log('✅ Pin rendered on map');
    
    // Save to localStorage
    saveLeadsToStorage();
    
    // Record action for undo/redo
    if (window.recordAction) {
        window.recordAction({
            type: 'addPin',
            data: {
                pinId: pinId,
                position: { lat, lng }
            }
        });
    }
    
    // Only open form if not skipped (e.g., during import)
    if (!skipForm) {
        openForm(pinId);
        console.log('✅ Opening form for pin:', pinId);
    }
}

// Add lead at map center
function addLeadAtMapCenter() {
    console.log('🎯 FAB button clicked - addLeadAtMapCenter called');
    
    if (!mapInstance) {
        console.error('❌ Map not initialized yet');
        alert('Map is not ready yet. Please wait a moment and try again.');
        return;
    }
    
    // Get car marker position (current location)
    let carPosition = null;
    
    // Check if carMarker exists (from index.html)
    if (window.carMarker) {
        carPosition = window.carMarker.getLatLng();
        console.log('📍 Using car marker position:', carPosition);
    } else {
        // Fallback to map center if car marker not found
        carPosition = mapInstance.getCenter();
        console.log('⚠️ Car marker not found, using map center:', carPosition);
    }
    
    addLeadPin(carPosition.lat, carPosition.lng);
}

// Render pin on map
function renderPin(pinObj) {
    if (!mapInstance) return;
    
    const marker = L.marker([pinObj.lat, pinObj.lng], {
        icon: L.divIcon({
            className: 'pin-container',
            html: createPinHTML(pinObj),
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    }).addTo(mapInstance);
    
    marker.on('click', () => openLeadDetails(pinObj.id));
    pinObj.marker = marker;
    
    // Initialize lucide icons if available
    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }
}

// Create pin HTML
function createPinHTML(pin, withTooltip = true) {
    const prio = priorities.find(p => p.label === pin.priority) || priorities[2]; // Default to Normal
    const role = roles.find(r => r.label === pin.role) || roles[0]; // Default to Owner
    
    return `<div class="relative flex items-center justify-center">
        ${withTooltip ? `<div class="tooltip">
            <p class="font-bold mb-1" style="color:${prio.color}">● ${pin.priority}</p>
            <p class="opacity-80">${pin.role} • ${pin.phase}</p>
        </div>` : ''}
        <div class="absolute -left-5 bg-white text-gray-900 font-black text-[9px] px-0.5 rounded shadow-sm">#${pin.index}</div>
        <div class="p-1.5 rounded-full shadow-lg flex items-center justify-center ${pin.status === 'Closed' ? 'status-closed' : ''}" 
             style="background-color: ${prio.color}; color: white; border: 2px solid white;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                ${getRoleIconPath(role.icon)}
            </svg>
        </div>
    </div>`;
}

// Get role icon SVG path
function getRoleIconPath(iconName) {
    const icons = {
        'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        'square': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>',
        'triangle': '<polygon points="12 2 2 22 22 22"/>',
        'circle': '<circle cx="12" cy="12" r="10"/>'
    };
    return icons[iconName] || icons['circle'];
}

// Initialize form options
function initFormOptions() {
    // Priority buttons
    const priorityContainer = document.getElementById('priority-options');
    if (priorityContainer) {
        // CLEAR EXISTING BUTTONS FIRST to prevent duplicates
        priorityContainer.innerHTML = '';
        
        priorities.forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'priority-btn py-2 rounded-lg text-[10px] font-black opacity-60 text-white';
            btn.style.backgroundColor = p.color;
            btn.innerText = p.label.toUpperCase();
            btn.onclick = (e) => { e.preventDefault(); setPriority(p.label); };
            btn.id = `prio-${p.label}`;
            priorityContainer.appendChild(btn);
        });
    }
    
    // Status buttons
    const statusContainer = document.getElementById('status-options');
    if (statusContainer) {
        // CLEAR EXISTING BUTTONS FIRST to prevent duplicates
        statusContainer.innerHTML = '';
        
        statuses.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'status-btn flex-1 py-1.5 rounded-lg text-[10px] font-bold border bg-white text-gray-500';
            btn.innerText = s;
            btn.onclick = (e) => { e.preventDefault(); setStatus(s); };
            btn.id = `status-${s}`;
            statusContainer.appendChild(btn);
        });
    }
    
    // Role dropdown
    const roleSelect = document.getElementById('contactRole');
    if (roleSelect) {
        // CLEAR EXISTING OPTIONS FIRST to prevent duplicates
        roleSelect.innerHTML = '';
        
        roles.forEach(r => {
            const option = document.createElement('option');
            option.value = r.label;
            option.innerText = r.label;
            roleSelect.appendChild(option);
        });
    }
    
    // Phase dropdown
    const phaseSelect = document.getElementById('projectPhase');
    if (phaseSelect) {
        // CLEAR EXISTING OPTIONS FIRST to prevent duplicates
        phaseSelect.innerHTML = '';
        
        phases.forEach(p => {
            const option = document.createElement('option');
            option.value = p;
            option.innerText = p;
            phaseSelect.appendChild(option);
        });
    }
}

// Set priority
function setPriority(label) {
    currentFormData.priority = label;
    document.querySelectorAll('.priority-btn').forEach(btn => {
        btn.classList.toggle('opacity-100', btn.id === `prio-${label}`);
        btn.classList.toggle('opacity-60', btn.id !== `prio-${label}`);
    });
    updatePreview();
}

// Set status
function setStatus(label) {
    currentFormData.status = label;
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.className = `status-btn flex-1 py-1.5 rounded-lg text-[10px] font-bold border ${
            btn.id === `status-${label}` ? 'bg-black text-white' : 'bg-white text-gray-500'
        }`;
    });
    updatePreview();
}

// Update preview
function updatePreview() {
    const pinId = document.getElementById('currentPinId')?.value;
    const pin = pins.find(p => p.id == pinId);
    const data = {
        role: document.getElementById('contactRole')?.value || 'Owner',
        priority: currentFormData.priority,
        phase: document.getElementById('projectPhase')?.value || 'ST',
        status: currentFormData.status,
        index: pin ? pin.index : pins.length + 1
    };
    
    const previewEl = document.getElementById('modal-preview-pin');
    if (previewEl) {
        previewEl.innerHTML = createPinHTML(data, false);
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    }
}

// Open form
function openForm(id) {
    console.log('📝 openForm called for pin ID:', id);
    
    const pin = pins.find(p => p.id === id);
    if (!pin) {
        console.error('❌ Pin not found:', id);
        return;
    }
    
    console.log('✅ Pin found:', pin);
    
    const formModal = document.getElementById('formModal');
    if (!formModal) {
        console.error('❌ formModal element not found in DOM!');
        alert('Lead form not initialized. Please refresh the page.');
        return;
    }
    
    console.log('✅ formModal element found');
    
    document.getElementById('currentPinId').value = id;
    document.getElementById('contactName').value = pin.data.name;
    document.getElementById('contactPhone').value = pin.data.phone;
    document.getElementById('siteNotes').value = pin.data.notes;
    currentFormData.images = [...(pin.images || [])];
    
    setPriority(pin.priority);
    setStatus(pin.status);
    document.getElementById('contactRole').value = pin.role;
    document.getElementById('projectPhase').value = pin.phase;
    document.getElementById('btn-delete').classList.toggle('hidden', !pin.data.name);
    
    renderFormImages();
    updatePreview();
    
    formModal.style.display = 'flex';
    console.log('✅ Form modal displayed');
}

// Save lead
function saveLead(e) {
    e?.preventDefault();
    
    const pinId = document.getElementById('currentPinId')?.value;
    if (!pinId) {
        console.error('❌ No pin ID found');
        return;
    }
    
    const pin = pins.find(p => p.id === parseInt(pinId));
    if (!pin) {
        console.error('❌ Pin not found:', pinId);
        return;
    }
    
    Object.assign(pin, {
        priority: currentFormData.priority,
        status: currentFormData.status,
        role: document.getElementById('contactRole')?.value || 'Owner',
        phase: document.getElementById('projectPhase')?.value || 'ST',
        images: [...currentFormData.images],
        data: {
            name: document.getElementById('contactName')?.value || '',
            phone: document.getElementById('contactPhone')?.value || '',
            notes: document.getElementById('siteNotes')?.value || ''
        }
    });
    
    // Remove old marker
    if (pin.marker && mapInstance) {
        mapInstance.removeLayer(pin.marker);
    }
    
    // Render new marker
    renderPin(pin);
    
    // Save to localStorage
    saveLeadsToStorage();
    
    closeModal();
    updateLeadsTable();
}

// Close modal
function closeModal() {
    document.getElementById('formModal').style.display = 'none';
}

// Delete pin
function deletePin() {
    const id = parseInt(document.getElementById('currentPinId').value);
    const idx = pins.findIndex(p => p.id === id);
    
    if (pins[idx].marker && mapInstance) mapInstance.removeLayer(pins[idx].marker);
    pins.splice(idx, 1);
    
    // Reindex pins
    pins.forEach((p, i) => {
        p.index = i + 1;
        if (p.marker && mapInstance) {
            mapInstance.removeLayer(p.marker);
            renderPin(p);
        }
    });
    
    // Save to localStorage
    saveLeadsToStorage();
    
    closeModal();
    updateLeadsTable();
}

// Delete pin from details modal
function deleteFromDetails(id) {
    if (!confirm('Are you sure you want to delete this lead pin?')) return;
    
    const idx = pins.findIndex(p => p.id === id);
    if (idx === -1) return;
    
    if (pins[idx].marker && mapInstance) mapInstance.removeLayer(pins[idx].marker);
    pins.splice(idx, 1);
    
    // Reindex pins
    pins.forEach((p, i) => {
        p.index = i + 1;
        if (p.marker && mapInstance) {
            mapInstance.removeLayer(p.marker);
            renderPin(p);
        }
    });
    
    // Save to localStorage
    saveLeadsToStorage();
    
    closeLeadDetails();
    updateLeadsTable();
}

// Handle image upload
function handleImageUpload(event) {
    const files = event.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentFormData.images.push(e.target.result);
            renderFormImages();
        };
        reader.readAsDataURL(file);
    });
}

// Render form images
function renderFormImages() {
    const container = document.getElementById('image-preview-container');
    const addButton = container.querySelector('label');
    
    // Clear existing images except add button
    Array.from(container.children).forEach(child => {
        if (child !== addButton) child.remove();
    });
    
    // Add image previews
    currentFormData.images.forEach((img, idx) => {
        const div = document.createElement('div');
        div.className = 'relative w-16 h-16';
        div.innerHTML = `
            <img src="${img}" class="w-full h-full object-cover rounded-xl border border-gray-200">
            <button onclick="LeadSystem.removeImage(${idx})" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
        `;
        container.insertBefore(div, addButton);
    });
}

// Remove image
function removeImage(idx) {
    currentFormData.images.splice(idx, 1);
    renderFormImages();
}

// Open lead details
function openLeadDetails(id) {
    const pin = pins.find(p => p.id === id);
    if (!pin) return;
    
    // Close Session Logs panel first if it's open
    const historyPanel = document.getElementById('history-panel');
    if (historyPanel && !historyPanel.classList.contains('hidden')) {
        window._sessionLogsPanelWasOpen = true;
        if (window.toggleHistory) {
            window.toggleHistory();
        }
        // Wait for panel to close before opening modal
        setTimeout(() => {
            showLeadDetailsModal(pin);
        }, 150);
    } else {
        window._sessionLogsPanelWasOpen = false;
        showLeadDetailsModal(pin);
    }
}

// Show lead details modal (separated for better flow control)
function showLeadDetailsModal(pin) {
    document.getElementById('lead-detail-subtitle').innerText = `Lead #${pin.index}`;
    document.getElementById('lead-detail-preview-pin').innerHTML = createPinHTML(pin, false);
    
    const content = document.getElementById('lead-details-content');
    const prio = priorities.find(p => p.label === pin.priority);
    
    content.innerHTML = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Priority</p>
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full" style="background:${prio.color}"></span>
                        <span class="font-bold text-black">${pin.priority}</span>
                    </div>
                </div>
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Status</p>
                    <span class="font-bold text-black">${pin.status}</span>
                </div>
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Role</p>
                    <span class="font-bold text-black">${pin.role}</span>
                </div>
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Phase</p>
                    <span class="font-bold text-black">${pin.phase}</span>
                </div>
            </div>
            
            ${pin.data.name ? `
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Contact</p>
                    <p class="font-bold text-black">${pin.data.name}</p>
                    ${pin.data.phone ? `<p class="text-sm text-black/60">${pin.data.phone}</p>` : ''}
                </div>
            ` : ''}
            
            ${pin.data.notes ? `
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Notes</p>
                    <p class="text-sm text-black/70">${pin.data.notes}</p>
                </div>
            ` : ''}
            
            ${pin.images && pin.images.length > 0 ? `
                <div>
                    <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-2">Photos (${pin.images.length})</p>
                    <div class="grid grid-cols-3 gap-2">
                        ${pin.images.map(img => `<img src="${img}" class="w-full h-24 object-cover rounded-xl border border-black/10 cursor-pointer hover:opacity-80">`).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div>
                <p class="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Location</p>
                <a href="https://www.google.com/maps?q=${pin.lat},${pin.lng}" target="_blank" class="inline-flex items-center gap-2 px-3 py-2 bg-black/[0.04] text-black rounded-xl text-sm font-bold hover:bg-black/[0.08] transition-colors border border-black/[0.06]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Open in Google Maps
                </a>
            </div>
            
            <div class="pt-4 border-t border-black/[0.06]">
                <button onclick="LeadSystem.deleteFromDetails(${pin.id})" class="w-full py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete Lead Pin
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('leadDetailsModal').style.display = 'flex';
    
    // Initialize lucide icons if available
    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }
    
    // Store current lead ID for edit button
    window.currentLeadId = pin.id;
}

// Close lead details
function closeLeadDetails() {
    const modal = document.getElementById('leadDetailsModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Don't auto-reopen session summary - let user control it
    window._sessionLogsPanelWasOpen = false;
}

// Edit lead (from details modal)
function editLead() {
    closeLeadDetails();
    openForm(window.currentLeadId);
}

// Setup click-outside-to-close for modals
function setupModalClickOutside() {
    // Lead Details Modal
    const leadDetailsModal = document.getElementById('leadDetailsModal');
    if (leadDetailsModal) {
        leadDetailsModal.addEventListener('click', (e) => {
            if (e.target === leadDetailsModal) {
                closeLeadDetails();
            }
        });
    }
    
    // Lead Form Modal
    const formModal = document.getElementById('formModal');
    if (formModal) {
        formModal.addEventListener('click', (e) => {
            if (e.target === formModal) {
                closeModal();
            }
        });
    }
}

// Update leads table in panel
function updateLeadsTable() {
    // Leads are now part of session logs, no separate table needed
    // This function is kept for backward compatibility but does nothing
}

// Get all pins (for panel.js to access)
function getAllPins() {
    return pins;
}

// Save leads to localStorage
function saveLeadsToStorage() {
    try {
        const leadsData = pins.map(pin => ({
            id: pin.id,
            lat: pin.lat,
            lng: pin.lng,
            index: pin.index,
            priority: pin.priority,
            status: pin.status,
            role: pin.role,
            phase: pin.phase,
            images: pin.images,
            data: pin.data,
            timestamp: pin.timestamp,
            date: pin.date,
            time: pin.time
        }));
        
        localStorage.setItem('lp_leads', JSON.stringify(leadsData));
        console.log('💾 Saved', leadsData.length, 'leads to localStorage');
    } catch (e) {
        console.error('❌ Failed to save leads:', e);
    }
}

// Load leads from localStorage
function loadLeadsFromStorage() {
    try {
        const saved = localStorage.getItem('lp_leads');
        if (!saved) {
            console.log('📭 No saved leads found');
            return;
        }
        
        const leadsData = JSON.parse(saved);
        console.log('📂 Loading', leadsData.length, 'leads from localStorage');
        
        // Clear existing pins
        pins.forEach(pin => {
            if (pin.marker && mapInstance) {
                mapInstance.removeLayer(pin.marker);
            }
        });
        pins.length = 0;
        
        // Restore pins
        leadsData.forEach(data => {
            const pin = {
                id: data.id,
                lat: data.lat,
                lng: data.lng,
                index: data.index,
                priority: data.priority || 'Normal',
                status: data.status || 'Active',
                role: data.role || 'Owner',
                phase: data.phase || 'ST',
                images: data.images || [],
                data: data.data || { name: '', phone: '', notes: '' },
                timestamp: data.timestamp,
                date: data.date,
                time: data.time
            };
            
            pins.push(pin);
            
            // Render pin on map if map is ready
            if (mapInstance) {
                renderPin(pin);
            }
        });
        
        console.log('✅ Loaded', pins.length, 'leads successfully');
        
        // Update session summary if available
        if (window.SessionSummary) {
            window.SessionSummary.updateTable();
        }
    } catch (e) {
        console.error('❌ Failed to load leads:', e);
    }
}

// Export LeadSystem API
window.LeadSystem = {
    init: initLeadSystem,
    addLeadPin,
    addLeadAtMapCenter,
    openForm,
    saveLead,
    closeModal,
    deletePin,
    deleteFromDetails,
    handleImageUpload,
    removeImage,
    openLeadDetails,
    closeLeadDetails,
    editLead,
    updatePreview,
    getAllPins,
    setPriority,
    setStatus,
    createPinHTML
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeadSystem);
} else {
    initLeadSystem();
}


// ═══════════════════════════════════════════════════════════════════════
// SESSION SUMMARY MODULE
// ═══════════════════════════════════════════════════════════════════════

const SessionSummary = {
    // Update the session summary table
    updateTable() {
        const tbody = document.getElementById('session-summary-table');
        const subtitle = document.getElementById('session-summary-subtitle');
        
        if (!tbody) return;
        
        if (pins.length === 0) {
            tbody.innerHTML = '<tr><td colspan="11" class="text-center text-gray-400 italic py-8">No leads captured yet</td></tr>';
            if (subtitle) subtitle.innerText = '0 Leads • 0.0 km';
            return;
        }
        
        // Get actual session distance
        const distance = window.getSessionDistance ? window.getSessionDistance() : 0;
        if (subtitle) subtitle.innerText = `${pins.length} Leads • ${distance.toFixed(2)} km`;
        
        // Render table rows
        tbody.innerHTML = '';
        pins.forEach((p, idx) => {
            const tr = document.createElement('tr');
            const prio = priorities.find(pr => pr.label === p.priority);
            
            // Image cell
            let imgHtml = '-';
            if (p.images && p.images.length > 0) {
                imgHtml = `<div class="image-cell">
                    <img src="${p.images[0]}" class="thumb-preview" onclick="window.SessionSummary.viewLeadDetails(${p.id})">
                    ${p.images.length > 1 ? `<div class="absolute -bottom-1 -right-1 bg-black text-white text-[7px] px-1 rounded-full">+${p.images.length - 1}</div>` : ''}
                </div>`;
            }
            
            // Map link
            const mapLink = `https://www.google.com/maps?q=${p.lat},${p.lng}`;
            
            // Pin HTML
            const pinHtml = createPinHTML(p, false);
            
            // Format date/time if available
            let dateTimeHtml = '-';
            if (p.date && p.time) {
                const date = new Date(p.timestamp);
                const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }); // "09 Apr"
                const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // "01:57 PM"
                dateTimeHtml = `<div class="text-[10px]">
                    <div class="font-bold text-gray-900">${dateStr}</div>
                    <div class="text-gray-400">${timeStr}</div>
                </div>`;
            }
            
            tr.innerHTML = `
                <td class="text-center cursor-pointer hover:bg-gray-50" onclick="window.SessionSummary.viewLeadDetails(${p.id})" title="Click to view lead details">
                    ${pinHtml}
                </td>
                <td class="font-bold text-gray-400">#${p.index}</td>
                <td>${dateTimeHtml}</td>
                <td>${imgHtml}</td>
                <td>
                    <div class="font-bold text-gray-900">${p.data.name || 'Anonymous'}</div>
                    <div class="text-[9px] text-gray-400">${p.data.phone || '-'}</div>
                </td>
                <td><span class="bg-gray-100 px-2 py-0.5 rounded text-[9px] font-bold">${p.role}</span></td>
                <td><span class="bg-gray-100 px-2 py-0.5 rounded text-[9px] font-bold">${p.phase}</span></td>
                <td class="font-bold ${p.status === 'Closed' ? 'text-gray-400' : 'text-green-600'}">${p.status}</td>
                <td>
                    <span class="w-2 h-2 rounded-full inline-block mr-1" style="background:${prio.color}"></span>
                    ${p.priority}
                </td>
                <td class="text-gray-500 italic max-w-[200px] truncate">${p.data.notes || '-'}</td>
                <td>
                    <a href="${mapLink}" target="_blank" class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-[9px] font-bold hover:bg-blue-100 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Open
                    </a>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        // Initialize lucide icons
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    },
    
    // View lead details (opens lead details modal)
    viewLeadDetails(id) {
        if (window.LeadSystem && window.LeadSystem.openLeadDetails) {
            window.LeadSystem.openLeadDetails(id);
        }
    },
    
    // Copy markdown table
    copyMarkdown() {
        let md = `### Field Session Report\n| # | Lead Name | Role | Phase | Priority | Status | Images | Notes | Map Link |\n|---|---|---|---|---|---|---|---|---|\n`;
        
        pins.forEach(p => {
            const imageInfo = p.images && p.images.length > 0 ? `${p.images.length} photo${p.images.length > 1 ? 's' : ''}` : 'No photos';
            md += `| ${p.index} | ${p.data.name || 'Anon'} | ${p.role} | ${p.phase} | ${p.priority} | ${p.status} | ${imageInfo} | ${p.data.notes || '-'} | [Open Map](https://www.google.com/maps?q=${p.lat},${p.lng}) |\n`;
        });
        
        navigator.clipboard.writeText(md).then(() => {
            console.log('✅ Markdown copied to clipboard');
            alert('Markdown table copied to clipboard!');
        }).catch(err => {
            console.error('❌ Failed to copy:', err);
        });
    },
    
    // Export to PDF
    exportPDF() {
        if (!window.jspdf) {
            alert('PDF library not loaded. Please refresh the page and try again.');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 12;
        let yPos = 0;

        // Helper function to convert hex to RGB
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
        };

        // White background
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Header
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text('Session Summary', margin, 15);
        
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139);
        const distance = window.getSessionDistance ? window.getSessionDistance() : 0;
        const sessionMeta = `${pins.length} LEADS • ${distance.toFixed(2)} KM • ${new Date().toLocaleDateString('en-GB')}`;
        doc.text(sessionMeta, margin, 21);

        // Separator line
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, 24, pageWidth - margin, 24);

        yPos = 30;

        // Export each lead
        pins.forEach((pin, index) => {
            const baseHeight = 30;
            
            // Page break check
            if (yPos + baseHeight > pageHeight - 15) {
                doc.addPage();
                yPos = 15;
            }

            // Priority indicator circle
            const prio = priorities.find(p => p.label === pin.priority) || priorities[2];
            const rgb = hexToRgb(prio.color);
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.circle(margin + 4, yPos + 3, 2.5, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.text(`${pin.index}`, margin + 4, yPos + 4.2, { align: 'center' });

            // Lead info
            const col1X = margin + 10;
            const col2X = margin + 100;
            
            // Name (English translations already loaded from JSON)
            doc.setTextColor(15, 23, 42);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            const name = pin.data.name || 'Anonymous';
            doc.text(name, col1X, yPos + 4);
            
            // Phone
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            doc.text(pin.data.phone || '-', col1X, yPos + 9);
            
            // Date/Time if available
            if (pin.date && pin.time) {
                const date = new Date(pin.timestamp);
                const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                doc.text(`${dateStr} ${timeStr}`, col1X, yPos + 14);
            }
            
            // Role & Phase
            doc.setTextColor(15, 23, 42);
            doc.text(`${pin.role} • ${pin.phase}`, col2X, yPos + 4);
            
            // Status & Priority
            doc.setTextColor(100, 116, 139);
            doc.text(`${pin.status} • ${pin.priority}`, col2X, yPos + 9);
            
            // Notes (truncated, English translations already loaded)
            if (pin.data.notes) {
                doc.setFontSize(8);
                const notes = pin.data.notes.substring(0, 50) + (pin.data.notes.length > 50 ? '...' : '');
                doc.text(notes, col1X, yPos + 19);
            }
            
            // Separator
            doc.setDrawColor(241, 245, 249);
            doc.setLineWidth(0.2);
            doc.line(margin, yPos + 24, pageWidth - margin, yPos + 24);
            
            yPos += 28;
        });

        // Save PDF
        const filename = `session-summary-${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);
        
        console.log('✅ PDF exported:', filename);
    }
};

// Expose SessionSummary globally
window.SessionSummary = SessionSummary;
