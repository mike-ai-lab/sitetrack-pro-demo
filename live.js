/**
 * LiveProspect — Manual Site Prospecting
 * Handles: FAB capture, GPS tracking, lead forms, photo storage,
 *          localStorage persistence, background tracking via SW.
 */

const LiveProspect = (() => {

    // ─── State ───────────────────────────────────────────────────────────────
    let map          = null;
    let isActive     = false;
    let sessionId    = null;
    let sessionStart = null;   // timestamp ms
    let sessionTimer = null;
    let sessionDist  = 0;
    let lastPos      = null;   // L.latLng
    let watchId      = null;
    let userDot      = null;   // Leaflet marker
    let pathLine     = null;   // Leaflet polyline
    let pathCoords   = [];
    let stations     = [];     // [{id,number,location,arrivalTime,address,contact,photos}]
    let pinMarkers   = [];     // [{id, marker}]

    const STORAGE_KEY     = 'lp_sessions';
    const ACTIVE_KEY      = 'lp_active_session';
    const SW_PATH         = 'sw.js';

    // ─── Utility ─────────────────────────────────────────────────────────────
    const $ = id => document.getElementById(id);
    const show = id => {
        const el = $(id);
        if (!el) return;
        if (id === 'live-fab') { el.style.display = 'flex'; return; }
        el.classList.remove('hidden');
    };
    const hide = id => {
        const el = $(id);
        if (!el) return;
        if (id === 'live-fab') { el.style.display = 'none'; return; }
        el.classList.add('hidden');
    };

    // ─── Init ────────────────────────────────────────────────────────────────
    function init(leafletMap) {
        map = leafletMap;
        _injectBodyElements();
        registerSW();
        loadPersistedSessions();
        restoreActiveSession();

        // Re-sync path when tab becomes visible again
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && isActive) {
                // Redraw path in case it was updated in background
                if (pathCoords.length > 1 && pathLine) {
                    pathLine.setLatLngs(pathCoords);
                }
                // Re-center on last known position
                if (lastPos) map.setView(lastPos, map.getZoom());
                refreshStationList();
                console.log(' LiveProspect: tab visible, path redrawn');
            }
        });
        // Expose for history-modal "Show Contact"
        window.LiveProspect = { openContactModal, openLeadForm, removePhoto,
            startSession, stopSession, capturePin, closeLeadForm, saveLeadForm,
            triggerPhotoUpload, onPhotosSelected, closeContactModal,
            deleteStation, deleteSession, _registerHistoryStation, init,
            isActive: () => isActive,
            _getStations: () => stations };  // Expose stations for Session Data tab
    }

    // ─── Inject FAB + photo input at body level (avoids overflow-hidden clipping) ─
    function _injectBodyElements() {
        // DISABLED: Old FAB implementation - will be replaced with new pin system
        console.log('⚠️ Old FAB button disabled - awaiting new pin implementation');
        
        /* OLD FAB CODE - DISABLED
        if (document.getElementById('live-fab')) return;
        const fab = document.createElement('button');
        fab.id = 'live-fab';
        fab.title = 'Add Lead';
        fab.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
        fab.style.cssText = [
            'display:flex', 'position:fixed', 'bottom:32px', 'left:32px', 'z-index:999',
            'width:64px', 'height:64px', 'background:#000', 'color:#fff', 'border:none',
            'border-radius:50%', 'box-shadow:0 10px 30px rgba(0,0,0,.3)', 'cursor:pointer',
            'align-items:center', 'justify-content:center', 'transition:transform .15s,opacity .2s',
            'pointer-events:auto'
        ].join(';');
        fab.addEventListener('click', capturePin);
        fab.addEventListener('mousedown', () => fab.style.transform='scale(.92)');
        fab.addEventListener('mouseup',   () => fab.style.transform='scale(1)');
        fab.addEventListener('touchstart', () => fab.style.transform='scale(.92)', { passive:true });
        fab.addEventListener('touchend',   () => fab.style.transform='scale(1)',   { passive:true });
        document.body.appendChild(fab);
        */

        // Hidden photo input (keep for potential reuse)
        if (document.getElementById('live-photo-input')) return;
        const photoInput = document.createElement('input');
        photoInput.id = 'live-photo-input';
        photoInput.type = 'file';
        photoInput.accept = 'image/*';
        photoInput.multiple = true;
        photoInput.setAttribute('capture', 'environment');
        photoInput.style.display = 'none';
        photoInput.addEventListener('change', () => onPhotosSelected(photoInput));
        document.body.appendChild(photoInput);
    }

    // ─── Service Worker + keep-alive ─────────────────────────────────────────
    let _keepAliveInterval = null;

    function registerSW() {
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.register(SW_PATH).then(reg => {
            console.log(' SW registered', reg.scope);
        }).catch(err => console.warn('SW registration failed:', err));
    }

    function startKeepAlive() {
        stopKeepAlive();
        // Ping SW every 25 s to prevent background suspension on mobile
        _keepAliveInterval = setInterval(() => {
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                const ch = new MessageChannel();
                navigator.serviceWorker.controller.postMessage({ type: 'KEEP_ALIVE' }, [ch.port2]);
            }
            // Also write a heartbeat to localStorage so the page can detect
            // it was in background and re-sync on visibility change
            localStorage.setItem('lp_heartbeat', Date.now());
        }, 25000);
    }

    function stopKeepAlive() {
        if (_keepAliveInterval) { clearInterval(_keepAliveInterval); _keepAliveInterval = null; }
    }

    // ─── localStorage helpers ─────────────────────────────────────────────────
    function saveAllSessions(sessions) {
        try {
            // Strip Leaflet objects before storing; photos kept as base64
            const clean = sessions.map(s => ({
                ...s,
                path: (s.path || []).map(p => ({ lat: p.lat ?? p[0], lng: p.lng ?? p[1] })),
                stations: (s.stations || []).map(st => ({ ...st }))
            }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
        } catch (e) {
            console.warn('LiveProspect: localStorage save failed', e);
        }
    }

    function loadPersistedSessions() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const saved = JSON.parse(raw);
            // Merge into window.recordingHistory
            if (!window.recordingHistory) window.recordingHistory = [];
            saved.forEach(s => {
                if (!window.recordingHistory.find(x => x.id === s.id)) {
                    window.recordingHistory.unshift(s);
                }
            });
        } catch (e) {
            console.warn('LiveProspect: localStorage load failed', e);
        }
    }

    function saveActiveState() {
        if (!isActive) { localStorage.removeItem(ACTIVE_KEY); return; }
        try {
            localStorage.setItem(ACTIVE_KEY, JSON.stringify({
                sessionId,
                sessionStart,
                sessionDist,
                stations,
                pathCoords: pathCoords.map(p => ({ lat: p.lat, lng: p.lng }))
            }));
        } catch (e) {}
    }

    function restoreActiveSession() {
        try {
            const raw = localStorage.getItem(ACTIVE_KEY);
            if (!raw) return;
            const s = JSON.parse(raw);
            // Resume the session silently
            sessionId    = s.sessionId;
            sessionStart = s.sessionStart;
            sessionDist  = s.sessionDist || 0;
            stations     = s.stations || [];
            pathCoords   = (s.pathCoords || []).map(p => L.latLng(p.lat, p.lng));
            isActive     = true;

            // Hide the global carMarker (used by Planner/Recorder)
            if (window.carMarker) {
                window.carMarker.setOpacity(0);
            }

            // Restore path on map
            if (pathCoords.length > 1) {
                pathLine = L.polyline(pathCoords, { color:'#000', weight:3, opacity:0.35, lineCap:'round' }).addTo(map);
            }

            // Restore pins
            stations.forEach(st => {
                const latlng = L.latLng(st.location.lat, st.location.lng);
                _dropPin(st, latlng);
            });

            // Resume GPS watch
            startGPS();
            startKeepAlive();

            // Update UI
            // FAB is always visible now
            hide('live-start-btn');
            show('live-stop-btn');
            show('live-stats-row');
            hide('live-empty-state');
            updateSiteCount();
            refreshStationList();
            sessionTimer = setInterval(tickTimer, 1000);

            // Disable Rec/Plan tab buttons
            _updateTabButtonStates();

            console.log(' LiveProspect session restored');
        } catch (e) {
            localStorage.removeItem(ACTIVE_KEY);
        }
    }

    // ─── Session start / stop ─────────────────────────────────────────────────
    function startSession() {
        if (isActive) return;
        isActive     = true;
        sessionId    = Date.now();
        sessionStart = Date.now();
        sessionDist  = 0;
        stations     = [];
        pinMarkers   = [];
        pathCoords   = [];
        lastPos      = null;
        pathLine     = null;

        // Hide the global carMarker (used by Planner/Recorder)
        if (window.carMarker) {
            window.carMarker.setOpacity(0);
        }

        // Disable Rec/Plan tab buttons visually
        _updateTabButtonStates();

        hide('live-start-btn');
        show('live-stop-btn');
        // FAB is always visible now
        show('live-stats-row');
        hide('live-empty-state');
        
        // Safely update stats if elements exist
        const distEl = $('live-stat-dist');
        const timeEl = $('live-stat-time');
        const sitesEl = $('live-stat-sites');
        const listEl = $('live-station-list');
        
        if (distEl) distEl.textContent = '0.00 km';
        if (timeEl) timeEl.textContent = '00:00';
        if (sitesEl) sitesEl.textContent = '0 sites';
        if (listEl) listEl.innerHTML = '';

        sessionTimer = setInterval(tickTimer, 1000);
        startGPS();
        startKeepAlive();
        saveActiveState();
        console.log(' LiveProspect session started');
    }

    function stopSession() {
        if (!isActive) return;
        isActive = false;

        clearInterval(sessionTimer);
        stopGPS();
        stopKeepAlive();
        persistSessionToHistory();
        localStorage.removeItem(ACTIVE_KEY);

        // Hide the red car
        if (userDot) {
            map.removeLayer(userDot);
            userDot = null;
        }

        // Re-enable Rec/Plan tab buttons
        _updateTabButtonStates();

        show('live-start-btn');
        hide('live-stop-btn');
        // FAB is always visible now

        console.log(' LiveProspect session stopped');
    }

    // ─── Update tab button states ─────────────────────────────────────────────
    function _updateTabButtonStates() {
        const plannerBtn = $('btn-planner');
        const recorderBtn = $('btn-recorder');
        
        if (isActive) {
            // Disable Rec/Plan buttons
            if (plannerBtn) {
                plannerBtn.style.opacity = '0.3';
                plannerBtn.style.cursor = 'not-allowed';
                plannerBtn.style.pointerEvents = 'none';
            }
            if (recorderBtn) {
                recorderBtn.style.opacity = '0.3';
                recorderBtn.style.cursor = 'not-allowed';
                recorderBtn.style.pointerEvents = 'none';
            }
        } else {
            // Re-enable Rec/Plan buttons
            if (plannerBtn) {
                plannerBtn.style.opacity = '';
                plannerBtn.style.cursor = '';
                plannerBtn.style.pointerEvents = '';
            }
            if (recorderBtn) {
                recorderBtn.style.opacity = '';
                recorderBtn.style.cursor = '';
                recorderBtn.style.pointerEvents = '';
            }
        }
    }

    // ─── GPS ──────────────────────────────────────────────────────────────────
    function startGPS() {
        if (!navigator.geolocation) return;
        watchId = navigator.geolocation.watchPosition(onGPS, onGPSErr, {
            enableHighAccuracy: true,
            maximumAge: 3000,
            timeout: 20000
        });
    }

    function stopGPS() {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
    }

    function onGPS(pos) {
        const pt = L.latLng(pos.coords.latitude, pos.coords.longitude);

        // User car marker (black to match main car)
        if (!userDot) {
            const carHtml = `
                <div class="car-icon-inner" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <svg width="40" height="40" viewBox="0 0 100 100" style="display: block;">
                        <rect x="25" y="10" width="50" height="80" rx="15" fill="#1a1a1a" />
                        <rect x="30" y="22" width="40" height="18" rx="4" fill="#444" />
                        <rect x="30" y="12" width="8" height="4" rx="1" fill="#FFFACD" />
                        <rect x="62" y="12" width="8" height="4" rx="1" fill="#FFFACD" />
                    </svg>
                </div>
            `;
            const icon = L.divIcon({
                html: carHtml,
                className: 'car-marker-icon', 
                iconSize: [40, 40], 
                iconAnchor: [20, 20]
            });
            userDot = L.marker(pt, { icon, zIndexOffset:900 }).addTo(map);
        } else {
            userDot.setLatLng(pt);
        }

        // Path & distance
        if (lastPos) {
            const dist = lastPos.distanceTo(pt);
            if (dist > 5) {
                sessionDist += dist / 1000;
                pathCoords.push(pt);
                if (!pathLine) {
                    pathLine = L.polyline(pathCoords, { color:'#000', weight:3, opacity:0.35, lineCap:'round' }).addTo(map);
                } else {
                    pathLine.setLatLngs(pathCoords);
                }
                if ($('live-stat-dist')) $('live-stat-dist').textContent = sessionDist.toFixed(2) + ' km';
                saveActiveState();  // persist path progress
            }
        } else {
            pathCoords.push(pt);
            map.setView(pt, 17);
        }
        lastPos = pt;
    }

    function onGPSErr(err) {
        console.warn('LiveProspect GPS error:', err.message);
    }

    // ─── Capture pin (FAB) ────────────────────────────────────────────────────
    function capturePin() {
        console.log('LiveProspect: capturePin called, isActive:', isActive);
        
        // Auto-start session if not active
        if (!isActive) {
            console.log('LiveProspect: Auto-starting session...');
            startSession();
        }

        const lat = lastPos ? lastPos.lat : map.getCenter().lat;
        const lng = lastPos ? lastPos.lng : map.getCenter().lng;
        const latlng = L.latLng(lat, lng);
        const stationId = Date.now();
        const num = stations.length + 1;

        console.log('LiveProspect: Creating station', num, 'at', lat, lng);

        const station = {
            id: stationId, number: num,
            location: { lat, lng },
            arrivalTime: new Date().toISOString(),
            address: '', contact: null, photos: []
        };
        stations.push(station);
        
        console.log('LiveProspect: Calling _dropPin...');
        _dropPin(station, latlng);
        
        updateSiteCount();
        refreshStationList();
        saveActiveState();

        // Update Session Data tab immediately
        if (window.renderSessionDataTab) {
            console.log('LiveProspect: Updating Session Data tab...');
            window.renderSessionDataTab();
        } else {
            console.warn('LiveProspect: renderSessionDataTab not found');
        }

        // Resolve address async
        reverseGeocode(lat, lng).then(addr => {
            station.address = addr;
            refreshStationList();
            saveActiveState();
            // Update Session Data tab again with address
            if (window.renderSessionDataTab) {
                window.renderSessionDataTab();
            }
        }).catch(() => {
            station.address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            refreshStationList();
            if (window.renderSessionDataTab) {
                window.renderSessionDataTab();
            }
        });

        openLeadForm(stationId);
    }

    function _dropPin(station, latlng) {
        console.log('LiveProspect: Dropping pin for station', station.id, 'at', latlng);
        
        if (!map) {
            console.error('LiveProspect: Map not initialized!');
            return;
        }
        
        const label = (station.contact && station.contact.name) ? station.contact.name : `#${station.number}`;
        const icon = L.divIcon({
            html: `<div style="width:20px;height:20px;background:#000;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.4);cursor:pointer;position:relative;">
                <div style="position:absolute;top:-22px;left:50%;transform:translateX(-50%);background:#000;color:#fff;font-size:9px;font-weight:900;padding:2px 6px;border-radius:20px;white-space:nowrap;">${label}</div>
            </div>`,
            className:'', iconSize:[20,20], iconAnchor:[10,10]
        });
        
        try {
            const marker = L.marker(latlng, { icon, zIndexOffset:1000 }).addTo(map);
            marker.on('click', () => openLeadForm(station.id));
            
            // Remove existing marker if any
            const existing = pinMarkers.find(m => m.id === station.id);
            if (existing) { 
                map.removeLayer(existing.marker); 
                pinMarkers = pinMarkers.filter(m => m.id !== station.id); 
            }
            
            pinMarkers.push({ id: station.id, marker });
            console.log('LiveProspect: Pin added successfully, total pins:', pinMarkers.length);
        } catch (error) {
            console.error('LiveProspect: Error adding marker to map:', error);
        }
    }

    function _refreshPin(station) {
        const entry = pinMarkers.find(m => m.id === station.id);
        if (!entry) return;
        const latlng = entry.marker.getLatLng();
        _dropPin(station, latlng);
    }

    // ─── Lead Form ────────────────────────────────────────────────────────────
    function openLeadForm(stationId) {
        const st = stations.find(s => s.id === stationId);
        if (!st) return;
        
        // Temporary: Just show an alert until we add the proper modal
        alert(`Lead form for #${st.number} - Coming in next step!\n\nPin has been added to the map at:\n${st.address || 'Loading address...'}`);
        
        // TODO: Add proper modal UI from standalone version
        /*
        const overlay = $('live-lead-overlay');
        if (!overlay) {
            console.error(' live-lead-overlay element not found in DOM!');
            console.log('Available elements:', Array.from(document.querySelectorAll('[id^="live-"]')).map(e => e.id));
            return;
        }
        overlay.setAttribute('data-station-id', stationId);
        const c = st.contact || {};
        $('lead-name').value   = c.name   || '';
        $('lead-role').value   = c.role   || '';
        $('lead-phone').value  = c.phone  || '';
        $('lead-phone2').value = c.phone2 || '';
        $('lead-notes').value  = c.notes  || '';
        $('lead-site-num').textContent  = `#${st.number}`;
        $('lead-site-addr').textContent = st.address || 'Resolving address…';
        renderPhotoThumbs(st);
        show('live-lead-overlay');
        setTimeout(() => overlay.querySelector('.live-modal-card').classList.remove('scale-95'), 10);
        */
    }

    function closeLeadForm() {
        const overlay = $('live-lead-overlay');
        overlay.querySelector('.live-modal-card').classList.add('scale-95');
        setTimeout(() => hide('live-lead-overlay'), 200);
    }

    function saveLeadForm() {
        const stId = parseInt($('live-lead-overlay').getAttribute('data-station-id'));
        const st = stations.find(s => s.id === stId);
        if (!st) return;
        st.contact = {
            name:   $('lead-name').value.trim(),
            role:   $('lead-role').value,
            phone:  $('lead-phone').value.trim(),
            phone2: $('lead-phone2').value.trim(),
            notes:  $('lead-notes').value.trim()
        };
        refreshStationList();
        _refreshPin(st);
        saveActiveState();
        closeLeadForm();
        
        // If this was a history edit, call the temp save handler
        if (window._tempHistorySave) {
            window._tempHistorySave();
        }
    }

    // ─── Photos ───────────────────────────────────────────────────────────────
    function triggerPhotoUpload() {
        $('live-photo-input').click();
    }

    function onPhotosSelected(input) {
        const stId = parseInt($('live-lead-overlay').getAttribute('data-station-id'));
        const st = stations.find(s => s.id === stId);
        if (!st || !input.files || !input.files.length) return;
        const files = Array.from(input.files);
        Promise.all(files.map(f => new Promise(res => {
            const r = new FileReader();
            r.onload = e => res(e.target.result);
            r.readAsDataURL(f);
        }))).then(urls => {
            st.photos = [...(st.photos || []), ...urls];
            renderPhotoThumbs(st);
            saveActiveState();
        });
        input.value = '';
    }

    function removePhoto(stId, idx) {
        const st = stations.find(s => s.id === stId);
        if (!st) return;
        st.photos.splice(idx, 1);
        renderPhotoThumbs(st);
        saveActiveState();
    }

    function renderPhotoThumbs(st) {
        const container = $('lead-photo-thumbs');
        if (!container) return;
        container.innerHTML = (st.photos || []).map((src, i) => `
            <div class="relative flex-shrink-0">
                <img src="${src}" class="w-16 h-16 object-cover rounded-xl border border-black/10">
                <button onclick="LiveProspect.removePhoto(${st.id},${i})"
                    class="absolute -top-1 -right-1 w-5 h-5 bg-black text-white rounded-full text-[10px] font-bold leading-none flex items-center justify-center">×</button>
            </div>`).join('');
    }

    // ─── Delete station ───────────────────────────────────────────────────────
    function deleteStation(stId) {
        if (!confirm('Delete this site pin and all its data?')) return;
        const idx = stations.findIndex(s => s.id === stId);
        if (idx === -1) return;
        stations.splice(idx, 1);
        // Re-number
        stations.forEach((s, i) => { s.number = i + 1; });
        // Remove pin
        const entry = pinMarkers.find(m => m.id === stId);
        if (entry) { map.removeLayer(entry.marker); pinMarkers = pinMarkers.filter(m => m.id !== stId); }
        // Refresh remaining pins with new numbers
        stations.forEach(s => _refreshPin(s));
        updateSiteCount();
        refreshStationList();
        saveActiveState();
    }

    // ─── Station list in panel ────────────────────────────────────────────────
    function refreshStationList() {
        const container = $('live-station-list');
        if (!container) return;
        if (!stations.length) { container.innerHTML = ''; return; }
        container.innerHTML = stations.map(s => {
            const c = s.contact || {};
            const hasContact = c.name || c.phone;
            return `<div class="flex items-start gap-3 py-2">
                <span class="text-[9px] font-bold text-black/25 mt-0.5 flex-shrink-0">#${s.number}</span>
                <div class="flex-1 min-w-0">
                    <p class="text-[11px] font-bold text-black truncate">${s.address || 'Resolving…'}</p>
                    ${hasContact ? `<p class="text-[9px] text-black/40">${c.name||''}${c.phone?' · '+c.phone:''}</p>` : ''}
                    <div class="flex gap-2 mt-1.5 flex-wrap">
                        <button onclick="LiveProspect.openLeadForm(${s.id})"
                            class="px-2.5 py-1 ${hasContact?'bg-black text-white':'border border-black/10 text-black'} rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            ${hasContact?'Edit Lead':'Add Lead'}
                        </button>
                        ${hasContact ? `<button onclick="LiveProspect.openContactModal(${s.id})"
                            class="px-2.5 py-1 border border-black/10 text-black rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            Show Contact
                        </button>` : ''}
                        <button onclick="LiveProspect.deleteStation(${s.id})"
                            class="px-2.5 py-1 border border-black/[0.08] text-black/30 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                            Delete
                        </button>
                    </div>
                </div>
            </div>`;
        }).join('<div class="w-[1px] h-2 bg-black/[0.05] ml-[10px]"></div>');
    }

    // ─── Contact view modal ───────────────────────────────────────────────────
    function openContactModal(stId) {
        // works for both active stations and history sessions
        const st = _findStationAnywhere(stId);
        if (!st) return;
        const c = st.contact || {};
        const overlay = $('live-contact-overlay');
        if (!overlay) {
            console.error(' live-contact-overlay element not found in DOM!');
            console.log('Available elements:', Array.from(document.querySelectorAll('[id^="live-"]')).map(e => e.id));
            return;
        }
        overlay.setAttribute('data-station-id', stId);
        $('contact-modal-num').textContent    = `Site #${st.number}`;
        $('contact-modal-addr').textContent   = st.address || '—';
        $('contact-modal-name').textContent   = c.name   || '—';
        $('contact-modal-role').textContent   = c.role   || '—';
        $('contact-modal-phone').textContent  = c.phone  || '—';
        $('contact-modal-phone2').textContent = c.phone2 || '—';
        $('contact-modal-notes').textContent  = c.notes  || '—';
        const pw = $('contact-modal-photos');
        if (st.photos && st.photos.length) {
            pw.innerHTML = st.photos.map(src =>
                `<img src="${src}" class="w-full h-32 object-cover rounded-xl border border-black/10 mb-2">`).join('');
            show('contact-modal-photos');
        } else {
            pw.innerHTML = '';
            hide('contact-modal-photos');
        }
        show('live-contact-overlay');
        setTimeout(() => overlay.querySelector('.live-modal-card').classList.remove('scale-95'), 10);
    }

    function closeContactModal() {
        const overlay = $('live-contact-overlay');
        overlay.querySelector('.live-modal-card').classList.add('scale-95');
        setTimeout(() => hide('live-contact-overlay'), 200);
    }

    function _findStationAnywhere(stId) {
        // active session first
        let st = stations.find(s => s.id === stId);
        if (st) return st;
        // search history
        if (window.recordingHistory) {
            for (const sess of window.recordingHistory) {
                st = (sess.stations || []).find(s => s.id === stId);
                if (st) return st;
            }
        }
        return null;
    }

    // ─── Delete entire session from history ───────────────────────────────────
    function deleteSession(sessionId) {
        if (!confirm('Delete this entire session?')) return;
        if (window.recordingHistory) {
            window.recordingHistory = window.recordingHistory.filter(s => s.id !== sessionId);
        }
        // sync localStorage
        const allSessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            .filter(s => s.id !== sessionId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allSessions));
        if (window.renderHistoryPanel) window.renderHistoryPanel();
    }

    // ─── Register history station for editing ─────────────────────────────────
    function _registerHistoryStation(station, session, stationIndex) {
        // Temporarily add this station to the active stations array so openLeadForm can find it
        // This allows editing contacts from history
        const tempStation = {
            ...station,
            id: station.id || Date.now(),
            number: station.number || stationIndex + 1,
            _isHistoryEdit: true,
            _historySession: session,
            _historyIndex: stationIndex
        };
        
        // Check if already in stations array
        const existing = stations.find(s => s.id === tempStation.id);
        if (!existing) {
            stations.push(tempStation);
        }
        
        // Set up the save handler
        window._tempHistorySave = () => {
            // Update the history session
            if (session && session.stations && session.stations[stationIndex]) {
                const updated = stations.find(s => s.id === tempStation.id);
                if (updated) {
                    session.stations[stationIndex] = { 
                        ...updated,
                        // Remove temp flags
                        _isHistoryEdit: undefined,
                        _historySession: undefined,
                        _historyIndex: undefined
                    };
                    // Persist to localStorage
                    const allSessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                    const idx = allSessions.findIndex(s => s.id === session.id);
                    if (idx !== -1) {
                        allSessions[idx] = session;
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(allSessions));
                    }
                    if (window.renderHistoryPanel) window.renderHistoryPanel();
                }
            }
            // Remove temp station from active array
            const tempIdx = stations.findIndex(s => s.id === tempStation.id);
            if (tempIdx !== -1) stations.splice(tempIdx, 1);
            window._tempHistorySave = null;
        };
        
        // Open the lead form
        openLeadForm(tempStation.id);
    }

    // ─── Stats ────────────────────────────────────────────────────────────────
    function tickTimer() {
        if (!sessionStart) return;
        const el = $('live-stat-time');
        if (!el) return;
        const e = Math.floor((Date.now() - sessionStart) / 1000);
        const m = Math.floor(e / 60), s = e % 60;
        el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }

    function updateSiteCount() {
        const el = $('live-stat-sites');
        if (el) el.textContent = `${stations.length} site${stations.length !== 1 ? 's' : ''}`;
    }

    // ─── Persist to recordingHistory + localStorage ───────────────────────────
    function persistSessionToHistory() {
        if (!stations.length && pathCoords.length < 2) return;
        const duration = Math.floor((Date.now() - sessionStart) / 1000);
        const startPos = pathCoords.length > 0 ? pathCoords[0] : null;
        const endPos   = pathCoords.length > 0 ? pathCoords[pathCoords.length-1] : null;

        const session = {
            id: sessionId,
            type: 'live',
            startLocation: startPos ? { lat: startPos.lat, lng: startPos.lng } : null,
            endLocation:   endPos   ? { lat: endPos.lat,   lng: endPos.lng   } : null,
            distance: parseFloat(sessionDist.toFixed(2)),
            duration,
            stopCount: stations.length,
            stations: stations.map(s => ({ ...s })),
            path: pathCoords.map(p => ({ lat: p.lat, lng: p.lng })),
            timestamp: new Date().toISOString(),
            startAddress: startPos ? `${startPos.lat.toFixed(4)}, ${startPos.lng.toFixed(4)}` : '—',
            endAddress:   endPos   ? `${endPos.lat.toFixed(4)}, ${endPos.lng.toFixed(4)}`   : '—'
        };

        if (!window.recordingHistory) window.recordingHistory = [];
        window.recordingHistory = window.recordingHistory.filter(s => s.id !== session.id);
        window.recordingHistory.unshift(session);

        // Persist all live sessions to localStorage
        const allSaved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            .filter(s => s.id !== session.id);
        allSaved.unshift(session);
        if (allSaved.length > 30) allSaved.length = 30;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allSaved));

        // Async address resolution
        if (startPos && endPos) {
            Promise.all([
                reverseGeocode(startPos.lat, startPos.lng),
                reverseGeocode(endPos.lat, endPos.lng)
            ]).then(([sa, ea]) => {
                session.startAddress = sa;
                session.endAddress   = ea;
                // update in storage too
                const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                const idx = stored.findIndex(s => s.id === session.id);
                if (idx !== -1) { stored[idx].startAddress = sa; stored[idx].endAddress = ea; }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
                if (window.renderHistoryPanel) window.renderHistoryPanel();
            }).catch(() => {});
        }

        if (window.renderHistoryPanel) window.renderHistoryPanel();
    }

    // ─── Reverse geocode ──────────────────────────────────────────────────────
    async function reverseGeocode(lat, lng) {
        const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const d = await r.json();
        const a = d.address || {};
        const road = a.road || a.street || '';
        const nbhd = a.neighbourhood || a.suburb || a.district || '';
        if (road && nbhd) return `${road}, ${nbhd}`;
        if (road) return road;
        if (nbhd) return nbhd;
        return (d.display_name || '').split(',').slice(0,2).join(',');
    }

    // ─── Public API ───────────────────────────────────────────────────────────
    return {
        init, startSession, stopSession, capturePin,
        openLeadForm, closeLeadForm, saveLeadForm,
        triggerPhotoUpload, onPhotosSelected, removePhoto,
        openContactModal, closeContactModal,
        deleteStation, deleteSession, _registerHistoryStation,
        isActive: () => isActive
    };

})();

window.LiveProspect = LiveProspect;
