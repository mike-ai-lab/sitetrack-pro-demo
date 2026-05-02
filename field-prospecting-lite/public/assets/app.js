// State Management
let map, userMarker, pathPolyline, routingControl;
let isRecording = false;
let isSimulationMode = false;
let pins = [];
let pathPoints = [];
let userLocation = null;
let totalDistance = 0;
let watchId = null;
let currentFormData = { priority: 'Normal', status: 'Active', role: 'Owner', phase: 'ST' };

// Session persistence
let sessionId = null;
let sessionStart = null;
let keepAliveInterval = null;
let durationInterval = null;

// Storage disabled - no persistence

// Configuration
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

// Initialization
window.onload = function() {
    lucide.createIcons();
    initMap();
    initFormOptions();
    attachEventListeners();
    registerServiceWorker();
    // restoreActiveSession disabled - no persistence
    requestLocation();
    
    // Re-sync when tab becomes visible
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && isRecording) {
            if (pathPoints.length > 1 && pathPolyline) {
                pathPolyline.setLatLngs(pathPoints);
            }
            if (userLocation) map.setView(userLocation, map.getZoom());
            console.log('👁️ Tab visible, session synced');
        }
    });
};

function attachEventListeners() {
    document.getElementById('centerBtn').onclick = () => { if (!isSimulationMode) requestLocation(); };
    document.getElementById('toggleSessionBtn').onclick = toggleSession;
    document.getElementById('simToggleBtn').onclick = toggleSimulation;
    document.getElementById('addPinBtn').onclick = dropPinAtUser;
    document.getElementById('photoInput').onchange = handlePhotos;
    document.getElementById('exportBtn').onclick = showExport;
    document.getElementById('copyMarkdownBtn').onclick = copyMarkdown;

    map.on('click', (e) => {
        if (isSimulationMode) calculateSimulatedRoute(e.latlng.lat, e.latlng.lng);
    });
}

// Map Initialization
function initMap() {
    map = L.map('map', { zoomControl: false, maxZoom: 22 }).setView([24.7136, 46.6753], 15);
    // Use OpenStreetMap standard tiles - light theme with darker gray streets
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    pathPolyline = L.polyline([], {
        color: '#007AFF',
        weight: 5,
        opacity: 0.8,
        lineCap: 'round'
    }).addTo(map);
}

// Simulation Mode
function toggleSimulation() {
    isSimulationMode = !isSimulationMode;
    const btn = document.getElementById('simToggleBtn');
    const dot = document.getElementById('simIndicator');

    if (isSimulationMode) {
        if (watchId) navigator.geolocation.clearWatch(watchId);
        btn.classList.add('bg-black', 'text-white');
        dot.classList.replace('bg-gray-300', 'bg-green-400');
    } else {
        btn.classList.remove('bg-black', 'text-white');
        dot.classList.replace('bg-green-400', 'bg-gray-300');
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
        requestLocation();
    }
}

function calculateSimulatedRoute(lat, lng) {
    if (!userLocation) {
        updateLocation({ coords: { latitude: lat, longitude: lng } });
        return;
    }

    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }

    routingControl = L.Routing.control({
        waypoints: [L.latLng(userLocation[0], userLocation[1]), L.latLng(lat, lng)],
        routeWhileDragging: false,
        addWaypoints: false,
        createMarker: () => null,
        lineOptions: { styles: [{ color: 'transparent', opacity: 0, weight: 0 }] },
        show: false,
        fitSelectedRoutes: false,
        autoRoute: false
    });

    routingControl.on('routesfound', (e) => {
        const coordinates = e.routes[0].coordinates;
        if (map.hasLayer(routingControl)) {
            map.removeControl(routingControl);
        }
        routingControl = null;
        animateRoute(coordinates);
    });

    routingControl.on('routingerror', () => {
        console.warn('Routing failed, using direct path');
        if (routingControl && map.hasLayer(routingControl)) {
            map.removeControl(routingControl);
        }
        routingControl = null;
        updateLocation({ coords: { latitude: lat, longitude: lng } });
    });

    try {
        routingControl.addTo(map);
        routingControl.route();
    } catch(e) {
        console.warn('Could not add routing control:', e);
        routingControl = null;
        updateLocation({ coords: { latitude: lat, longitude: lng } });
    }
}

async function animateRoute(coordinates) {
    if (!coordinates || coordinates.length === 0) return;

    const stepSize = Math.max(1, Math.ceil(coordinates.length / 40));

    for (let i = 0; i < coordinates.length; i += stepSize) {
        const point = coordinates[i];
        const currentPos = [point.lat, point.lng];

        if (isRecording) {
            pathPoints.push(currentPos);
            pathPolyline.setLatLngs(pathPoints);

            if (pathPoints.length > 1) {
                const prev = pathPoints[pathPoints.length - 2];
                totalDistance += map.distance(prev, currentPos) / 1000;
                updateStats();
            }
        }

        if (!userMarker) {
            userMarker = L.circleMarker(currentPos, {
                radius: 10,
                fillColor: "#007AFF",
                color: "white",
                weight: 4,
                fillOpacity: 1
            }).addTo(map);
        } else {
            userMarker.setLatLng(currentPos);
        }
        userLocation = currentPos;

        await new Promise(r => setTimeout(r, 20));
    }

    const final = coordinates[coordinates.length - 1];
    userLocation = [final.lat, final.lng];
    userMarker.setLatLng(userLocation);
    if (isRecording) {
        pathPoints.push(userLocation);
        pathPolyline.setLatLngs(pathPoints);
    }
}

// GPS Location
function updateLocation(position) {
    const { latitude, longitude } = position.coords;
    const prevLoc = userLocation;
    userLocation = [latitude, longitude];

    if (!userMarker) {
        userMarker = L.circleMarker(userLocation, {
            radius: 10,
            fillColor: "#007AFF",
            color: "white",
            weight: 4,
            fillOpacity: 1
        }).addTo(map);
        map.flyTo(userLocation, 17);
    } else {
        userMarker.setLatLng(userLocation);
    }

    if (isRecording) {
        pathPoints.push(userLocation);
        pathPolyline.setLatLngs(pathPoints);
        if (prevLoc) totalDistance += map.distance(prevLoc, userLocation) / 1000;
        updateStats();
    }
}

function requestLocation() {
    if (isSimulationMode || !navigator.geolocation) return;
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(updateLocation, handleGPSError, options);
    if (watchId) navigator.geolocation.clearWatch(watchId);
    watchId = navigator.geolocation.watchPosition(updateLocation, handleGPSError, options);
}

function handleGPSError(err) {
    if (!isSimulationMode) console.warn("GPS:", err.message);
}

// Session Management
function toggleSession() {
    isRecording = !isRecording;
    const icon = document.getElementById('sessionIcon');
    const text = document.getElementById('sessionText');
    const btn = document.getElementById('toggleSessionBtn');

    if (isRecording) {
        pathPoints = userLocation ? [userLocation] : [];
        totalDistance = 0;
        pathPolyline.setLatLngs(pathPoints);
        btn.classList.replace('bg-black', 'bg-red-500');
        text.innerText = "STOP SESSION";
        icon.setAttribute('data-lucide', 'square');
        
        // Set start time and display it
        sessionStart = Date.now();
        const startTimeEl = document.getElementById('startTime');
        if (startTimeEl) {
            startTimeEl.innerText = formatStartTime(sessionStart);
        }
        
        // Start duration timer
        if (durationInterval) clearInterval(durationInterval);
        durationInterval = setInterval(updateDuration, 1000);
        updateDuration();
    } else {
        btn.classList.replace('bg-red-500', 'bg-black');
        text.innerText = "START SESSION";
        icon.setAttribute('data-lucide', 'play');
        
        // Stop duration timer
        if (durationInterval) {
            clearInterval(durationInterval);
            durationInterval = null;
        }
        
        showExport();
    }
    lucide.createIcons();
    updateStats();
}

function updateStats() {
    const statusText = document.getElementById('statusText');
    const statusDot = document.getElementById('statusDot');
    const leadsCount = document.getElementById('leadsCount');
    const distanceCount = document.getElementById('distanceCount');
    const sessionTimeInfo = document.getElementById('sessionTimeInfo');
    
    if (statusText) statusText.innerText = isRecording ? 'Recording' : 'Standby';
    if (leadsCount) leadsCount.innerText = pins.length;
    if (distanceCount) distanceCount.innerText = totalDistance.toFixed(1) + 'km';
    
    // Update status dot color
    if (statusDot) {
        if (isRecording) {
            statusDot.classList.remove('bg-gray-400');
            statusDot.classList.add('bg-green-500', 'animate-pulse');
        } else {
            statusDot.classList.remove('bg-green-500', 'animate-pulse');
            statusDot.classList.add('bg-gray-400');
        }
    }
    
    // Show/hide time info
    if (sessionTimeInfo) {
        if (isRecording) {
            sessionTimeInfo.classList.remove('hidden');
            sessionTimeInfo.classList.add('flex');
        } else {
            sessionTimeInfo.classList.add('hidden');
            sessionTimeInfo.classList.remove('flex');
        }
    }
}

function updateDuration() {
    if (!sessionStart || !isRecording) return;
    
    const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    
    const durationEl = document.getElementById('durationTime');
    if (durationEl) {
        if (hours > 0) {
            durationEl.innerText = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            durationEl.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }
}

function formatStartTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = String(minutes).padStart(2, '0');
    return `${hours}:${minutesStr} ${ampm}`;
}

// Pin Management
function dropPinAtUser() {
    if (!userLocation) return;
    const pinId = Date.now();
    const newPin = {
        id: pinId,
        lat: userLocation[0],
        lng: userLocation[1],
        index: pins.length + 1,
        priority: 'Normal',
        status: 'Active',
        role: 'Owner',
        phase: 'ST',
        data: { name: '', phone: '', notes: '', photos: [] }
    };
    pins.push(newPin);
    renderPin(newPin);
    openForm(pinId);
    // Persist immediately so a newly dropped pin isn't lost if the
    // app is backgrounded or the browser is closed shortly after.
    if (isRecording) {
        saveActiveSession();
    }
    updateStats();
}

function renderPin(pinObj) {
    const marker = L.marker([pinObj.lat, pinObj.lng], {
        icon: L.divIcon({
            className: 'pin-container',
            html: createPinHTML(pinObj),
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    }).addTo(map);
    marker.on('click', () => openForm(pinObj.id));
    pinObj.marker = marker;
    setTimeout(() => lucide.createIcons(), 0);
}

function createPinHTML(pin, size = 24, withTooltip = true) {
    const prioObj = priorities.find(p => p.label === pin.priority);
    const roleObj = roles.find(r => r.label === pin.role);
    const isClosed = pin.status === 'Closed';
    const isOnHold = pin.status === 'On Hold';

    return `
        <div class="relative flex items-center justify-center">
            ${withTooltip ? `
            <div class="tooltip">
                <div class="flex items-center gap-2 mb-1 border-b border-slate-700 pb-1">
                    <span style="color: ${prioObj.color}">●</span>
                    <span class="font-bold uppercase tracking-wider">${pin.priority}</span>
                </div>
                <p class="opacity-80 font-medium">${pin.role} • ${pin.phase}</p>
                <p class="mt-1 font-bold">${pin.status}</p>
            </div>` : ''}
            <div class="absolute -left-5 bg-white border border-gray-200 text-gray-900 font-black text-[9px] px-0.5 rounded shadow-sm">#${pin.index}</div>
            <div class="p-1.5 rounded-full shadow-lg flex items-center justify-center ${isOnHold ? 'status-onhold' : ''} ${isClosed ? 'status-closed' : ''}"
                 style="background-color: ${prioObj.color}; color: white; border: 2px solid white;">
                <i data-lucide="${roleObj.icon}" class="w-4 h-4" fill="currentColor"></i>
            </div>
            <div class="absolute -top-0.5 -right-3 bg-gray-900 text-white text-[9px] font-black px-0.5 rounded border border-white shadow-sm">${pin.phase}</div>
        </div>
    `;
}

function deletePin() {
    const id = parseInt(document.getElementById('currentPinId').value);
    const idx = pins.findIndex(p => p.id === id);
    if (pins[idx].marker) map.removeLayer(pins[idx].marker);
    pins.splice(idx, 1);
    pins.forEach((p, i) => {
        p.index = i + 1;
        if (p.marker) {
            map.removeLayer(p.marker);
            renderPin(p);
        }
    });
    closeModal();
    updateStats();
}

// Form Management
function initFormOptions() {
    const prioContainer = document.getElementById('priority-options');
    priorities.forEach(p => {
        const btn = document.createElement('button');
        btn.className = `priority-btn py-2 rounded-lg text-[10px] font-black transition-all border-2 border-transparent opacity-60 text-white`;
        btn.style.backgroundColor = p.color;
        btn.innerText = p.label.toUpperCase();
        btn.onclick = (e) => { e.preventDefault(); setPriority(p.label); };
        btn.id = `prio-${p.label}`;
        prioContainer.appendChild(btn);
    });

    const statusContainer = document.getElementById('status-options');
    statuses.forEach(s => {
        const btn = document.createElement('button');
        btn.className = `status-btn flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all bg-white text-gray-500 border-gray-200`;
        btn.innerText = s;
        btn.onclick = (e) => { e.preventDefault(); setStatus(s); };
        btn.id = `status-${s}`;
        statusContainer.appendChild(btn);
    });

    const roleSelect = document.getElementById('contactRole');
    roles.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.label;
        opt.innerText = r.label;
        roleSelect.appendChild(opt);
    });

    const phaseSelect = document.getElementById('projectPhase');
    phases.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.innerText = p;
        phaseSelect.appendChild(opt);
    });
}

function setPriority(label) {
    currentFormData.priority = label;
    document.querySelectorAll('.priority-btn').forEach(btn => {
        const active = btn.id === `prio-${label}`;
        btn.classList.toggle('border-gray-900', active);
        btn.classList.toggle('ring-2', active);
        btn.classList.toggle('opacity-100', active);
        btn.classList.toggle('opacity-60', !active);
    });
    updatePreview();
}

function setStatus(label) {
    currentFormData.status = label;
    document.querySelectorAll('.status-btn').forEach(btn => {
        const active = btn.id === `status-${label}`;
        btn.className = `status-btn flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`;
    });
    updatePreview();
}

function updatePreview() {
    const role = document.getElementById('contactRole').value;
    const phase = document.getElementById('projectPhase').value;
    const prio = currentFormData.priority;
    const status = currentFormData.status;
    const pinId = document.getElementById('currentPinId').value;
    const pin = pins.find(p => p.id == pinId);
    const index = pin ? pin.index : pins.length + 1;

    const previewDiv = document.getElementById('modal-preview-pin');
    previewDiv.innerHTML = createPinHTML({ role, priority: prio, phase, status, index, id: 'preview' }, 40, false);
    lucide.createIcons();
}

function validatePhone() {
    const val = document.getElementById('contactPhone').value;
    const isInvalid = val.length > 0 && !/^05\d{8}$/.test(val);
    document.getElementById('phone-error').classList.toggle('hidden', !isInvalid);
    const container = document.getElementById('phone-container');
    container.classList.toggle('border-red-400', isInvalid);
    container.classList.toggle('bg-red-50', isInvalid);
}

function openForm(id) {
    const pin = pins.find(p => p.id === id);
    const isNew = !pin.data.name && !pin.data.phone;
    document.getElementById('currentPinId').value = id;
    document.getElementById('modal-title').innerText = isNew ? "Specify Lead Pin" : "Edit Pin Details";
    document.getElementById('modal-subtitle').innerText = `Pin #${pin.index}`;
    document.getElementById('contactName').value = pin.data.name;
    document.getElementById('contactPhone').value = pin.data.phone;
    document.getElementById('siteNotes').value = pin.data.notes;
    document.getElementById('btn-delete').classList.toggle('hidden', isNew);

    const submitBtn = document.querySelector('#formModal button[onclick="saveLead(event)"]');
    submitBtn.innerText = isNew ? 'PLACE PIN' : 'UPDATE RECORD';

    setPriority(pin.priority);
    setStatus(pin.status);
    document.getElementById('contactRole').value = pin.role;
    document.getElementById('projectPhase').value = pin.phase;

    const container = document.getElementById('photoPreviewContainer');
    container.innerHTML = '';
    pin.data.photos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'photo-preview';
        container.appendChild(img);
    });

    validatePhone();
    updatePreview();
    document.getElementById('formModal').style.display = 'flex';
    lucide.createIcons();
}

function closeModal() {
    document.getElementById('formModal').style.display = 'none';
}

function saveLead(e) {
    if (e) e.preventDefault();
    const id = parseInt(document.getElementById('currentPinId').value);
    const idx = pins.findIndex(p => p.id === id);
    pins[idx].priority = currentFormData.priority;
    pins[idx].status = currentFormData.status;
    pins[idx].role = document.getElementById('contactRole').value;
    pins[idx].phase = document.getElementById('projectPhase').value;
    pins[idx].data = {
        ...pins[idx].data,
        name: document.getElementById('contactName').value,
        phone: document.getElementById('contactPhone').value,
        notes: document.getElementById('siteNotes').value
    };
    if (pins[idx].marker) map.removeLayer(pins[idx].marker);
    renderPin(pins[idx]);
    closeModal();
    updateStats();
}

function handlePhotos(e) {
    const files = Array.from(e.target.files);
    const id = parseInt(document.getElementById('currentPinId').value);
    const pin = pins.find(p => p.id === id);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            pin.data.photos.push(event.target.result);
            const img = document.createElement('img');
            img.src = event.target.result;
            img.className = 'photo-preview';
            document.getElementById('photoPreviewContainer').appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

// Export Functions
function showExport() {
    let text = `Field Report:\nTotal Leads: ${pins.length}\nDistance: ${totalDistance.toFixed(2)} km\n`;
    pins.forEach((p, i) => {
        text += `${i+1}. ${p.data.name || 'N/A'} [${p.priority}] - ${p.status}\n`;
    });
    document.getElementById('analyticsSummary').innerText = text;
    document.getElementById('exportModal').style.display = 'flex';
}

function copyMarkdown() {
    let md = `### Field Session Report\n| # | Lead | Role | Phase | Priority | Status | Location |\n|---|---|---|---|---|---|---|\n`;
    pins.forEach((p, i) => {
        md += `| ${i+1} | ${p.data.name || '-'} | ${p.role} | ${p.phase} | ${p.priority} | ${p.status} | [Map](https://www.google.com/maps?q=${p.lat},${p.lng}) |\n`;
    });
    navigator.clipboard.writeText(md).then(() => alert("Markdown report copied!"));
}


// ═══════════════════════════════════════════════════════════════════════════
// SERVICE WORKER & BACKGROUND OPERATION
// ═══════════════════════════════════════════════════════════════════════════

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service Worker not supported');
        return;
    }
    try {
        // Resolve sw path relative to current page so this works when the app
        // is hosted under a subpath (e.g. /field-prospecting-lite/).
        const swUrl = new URL('../sw.js', window.location.href).href;
        navigator.serviceWorker.register(swUrl).then(reg => {
            console.log('✅ Service Worker registered:', reg.scope);
        }).catch(err => {
            console.warn('❌ Service Worker registration failed:', err);
        });
    } catch (e) {
        console.warn('Service Worker registration error:', e);
    }
}

function startKeepAlive() {
    stopKeepAlive();
    // Ping SW every 25s to prevent background suspension on mobile
    keepAliveInterval = setInterval(() => {
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            const channel = new MessageChannel();
            navigator.serviceWorker.controller.postMessage(
                { type: 'KEEP_ALIVE' }, 
                [channel.port2]
            );
        }
        // Disabled - no persistence
    }, 25000);
}

function stopKeepAlive() {
    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
        keepAliveInterval = null;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// SESSION PERSISTENCE
// ═══════════════════════════════════════════════════════════════════════════

function saveActiveSession() {
    // Disabled - no persistence
}

function restoreActiveSession() {
    // Disabled - no persistence
}

function saveSessionToHistory() {
    if (pathPoints.length < 2 && pins.length === 0) return;
    
    try {
        const session = {
            id: sessionId || Date.now(),
            type: 'field-prospecting-lite',
            startTime: sessionStart,
            endTime: Date.now(),
            duration: sessionStart ? Math.floor((Date.now() - sessionStart) / 1000) : 0,
            distance: totalDistance,
            pathPoints: pathPoints.map(p => ({ lat: p[0], lng: p[1] })),
            pins: pins.map(pin => ({
                id: pin.id,
                lat: pin.lat,
                lng: pin.lng,
                index: pin.index,
                priority: pin.priority,
                status: pin.status,
                role: pin.role,
                phase: pin.phase,
                data: pin.data
            })),
            isSimulation: isSimulationMode
        };
        
        // Load existing sessions
        const allSessions = [];
        
        // Add new session at the beginning
        allSessions.unshift(session);
        
        // Keep only last 30 sessions
        if (allSessions.length > 30) {
            allSessions.length = 30;
        }
        
        // Disabled - no persistence
        
        console.log('📝 Session saved to history');
    } catch (e) {
        console.warn('Failed to save session to history:', e);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ENHANCED SESSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════

// Override toggleSession to include persistence
const originalToggleSession = toggleSession;
toggleSession = function() {
    const wasRecording = isRecording;
    
    originalToggleSession();
    
    if (!wasRecording && isRecording) {
        // Starting session
        sessionId = Date.now();
        sessionStart = Date.now();
        startKeepAlive();
        saveActiveSession();
    } else if (wasRecording && !isRecording) {
        // Stopping session
        stopKeepAlive();
        saveSessionToHistory();
        // Disabled - no-op
    }
};

// Save session state periodically during recording
setInterval(() => {
    if (isRecording) {
        saveActiveSession();
    }
}, 10000); // Every 10 seconds

// Override updateLocation to save state
const originalUpdateLocation = updateLocation;
updateLocation = function(position) {
    originalUpdateLocation(position);
    if (isRecording) {
        saveActiveSession();
    }
};

// Override saveLead to persist changes
const originalSaveLead = saveLead;
saveLead = function(e) {
    originalSaveLead(e);
    if (isRecording) {
        saveActiveSession();
    }
};

// Override deletePin to persist changes
const originalDeletePin = deletePin;
deletePin = function() {
    originalDeletePin();
    if (isRecording) {
        saveActiveSession();
    }
};
