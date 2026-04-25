# Testing Guide - Background Operation & Persistence

## Quick Test Scenarios

### ✅ Test 1: Basic Session Persistence

**Steps:**
1. Open the app: https://field-prospecting-lite.vercel.app
2. Click "START SESSION"
3. Add 2-3 pins
4. Record some path (move around or use simulation mode)
5. **Close the browser tab completely**
6. Reopen the app

**Expected Result:**
- ✅ Session automatically restores
- ✅ All pins are visible
- ✅ Path is drawn on map
- ✅ Recording continues from where you left off
- ✅ Distance and time are preserved

---

### ✅ Test 2: Background Operation

**Steps:**
1. Start a recording session
2. Switch to another app or browser tab
3. Wait 2-3 minutes
4. Return to the app

**Expected Result:**
- ✅ Session is still active
- ✅ GPS tracking continued in background
- ✅ Path updated with new points
- ✅ No data loss

---

### ✅ Test 3: Browser Crash Recovery

**Steps:**
1. Start a recording session
2. Add several pins with contact info
3. Record a path
4. Force close the browser (Task Manager or Force Quit)
5. Reopen browser and navigate to app

**Expected Result:**
- ✅ Session fully restored
- ✅ All pins with contact data intact
- ✅ Photos preserved
- ✅ Path completely restored
- ✅ Can continue recording

---

### ✅ Test 4: Simulation Mode Persistence

**Steps:**
1. Start session
2. Enable "SIM MODE"
3. Click on map to create routes
4. Add pins along the route
5. Refresh the page (F5 or Ctrl+R)

**Expected Result:**
- ✅ Simulation mode still enabled
- ✅ All routes preserved
- ✅ Pins restored
- ✅ Can continue clicking to add routes

---

### ✅ Test 5: Photo Persistence

**Steps:**
1. Start session
2. Add a pin
3. Upload 2-3 photos to the pin
4. Add contact information
5. Close browser
6. Reopen app

**Expected Result:**
- ✅ Pin restored with all photos
- ✅ Contact information intact
- ✅ Photos display correctly
- ✅ Can add more photos

---

### ✅ Test 6: Session History

**Steps:**
1. Complete a full session (start → record → stop)
2. Start a new session
3. Complete it
4. Repeat 2-3 times
5. Check localStorage in browser DevTools

**Expected Result:**
- ✅ All sessions saved to history
- ✅ Each session has complete data
- ✅ Sessions stored in `fp_lite_sessions` key
- ✅ Maximum 30 sessions kept

---

### ✅ Test 7: Service Worker Registration

**Steps:**
1. Open app
2. Open browser DevTools (F12)
3. Go to "Application" tab (Chrome) or "Storage" (Firefox)
4. Check "Service Workers" section

**Expected Result:**
- ✅ Service Worker registered
- ✅ Status: "activated and running"
- ✅ Scope: "/"
- ✅ No errors in console

---

### ✅ Test 8: Keep-Alive Heartbeat

**Steps:**
1. Start recording session
2. Open browser console (F12)
3. Watch for heartbeat messages
4. Background the tab for 30+ seconds
5. Return to tab

**Expected Result:**
- ✅ Heartbeat messages every 25 seconds
- ✅ `fp_lite_heartbeat` updated in localStorage
- ✅ Session continues after backgrounding
- ✅ No GPS interruption

---

### ✅ Test 9: Offline Capability

**Steps:**
1. Load the app once (to cache files)
2. Open DevTools → Network tab
3. Enable "Offline" mode
4. Refresh the page

**Expected Result:**
- ✅ App loads from cache
- ✅ UI fully functional
- ✅ Can view saved sessions
- ✅ Map tiles may not load (expected)

---

### ✅ Test 10: PWA Installation

**Steps (Chrome/Edge):**
1. Open app
2. Look for install icon in address bar
3. Click "Install"
4. App opens in standalone window

**Expected Result:**
- ✅ App installs as PWA
- ✅ Appears in app drawer/start menu
- ✅ Runs without browser UI
- ✅ Better background operation

---

## Debugging Tools

### Check localStorage

```javascript
// In browser console:

// View active session
JSON.parse(localStorage.getItem('fp_lite_active_session'))

// View session history
JSON.parse(localStorage.getItem('fp_lite_sessions'))

// View heartbeat
localStorage.getItem('fp_lite_heartbeat')

// Clear all data (reset)
localStorage.clear()
```

### Check Service Worker

```javascript
// In browser console:

// Check registration
navigator.serviceWorker.getRegistrations()
  .then(regs => console.log(regs))

// Check controller
console.log(navigator.serviceWorker.controller)

// Unregister (for testing)
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(reg => reg.unregister()))
```

### Monitor Background Activity

```javascript
// Add to console to monitor heartbeats
setInterval(() => {
  const hb = localStorage.getItem('fp_lite_heartbeat');
  const age = Date.now() - parseInt(hb);
  console.log(`Heartbeat age: ${age}ms`);
}, 5000);
```

---

## Common Issues & Solutions

### Issue: Session Not Restoring

**Symptoms:**
- Page reloads but session is lost
- Pins disappear after refresh

**Solutions:**
1. Check if in private/incognito mode (localStorage disabled)
2. Check browser console for errors
3. Verify localStorage quota not exceeded
4. Try clearing cache and reload

**Debug:**
```javascript
// Check if data exists
console.log(localStorage.getItem('fp_lite_active_session'));
```

---

### Issue: Background GPS Stops

**Symptoms:**
- GPS tracking stops when app is backgrounded
- Path has gaps

**Solutions:**
1. Ensure Service Worker is registered
2. On iOS: Install as PWA for better results
3. Keep app in foreground when possible
4. Check device battery saver settings

**Debug:**
```javascript
// Check SW status
navigator.serviceWorker.ready.then(reg => {
  console.log('SW ready:', reg.active.state);
});
```

---

### Issue: Photos Not Saving

**Symptoms:**
- Photos disappear after reload
- localStorage quota exceeded error

**Solutions:**
1. Photos stored as base64 (large size)
2. Limit photos per pin (3-5 recommended)
3. Compress images before upload
4. Clear old sessions to free space

**Debug:**
```javascript
// Check storage usage
const data = localStorage.getItem('fp_lite_active_session');
console.log(`Storage used: ${data.length / 1024}KB`);
```

---

### Issue: Service Worker Not Registering

**Symptoms:**
- Console error: "Service Worker registration failed"
- Background operation doesn't work

**Solutions:**
1. Must be served over HTTPS (or localhost)
2. Check sw.js file exists and is accessible
3. Check browser supports Service Workers
4. Clear browser cache and reload

**Debug:**
```javascript
// Check SW support
console.log('SW supported:', 'serviceWorker' in navigator);
```

---

## Performance Benchmarks

### Expected Performance

| Metric | Value |
|--------|-------|
| Initial Load | < 2 seconds |
| Session Restore | < 500ms |
| Auto-save | < 100ms |
| Keep-alive Overhead | < 1KB/25s |
| Memory Usage | 10-20MB |
| Battery Impact | ~2-3%/hour |

### Storage Limits

| Data Type | Typical Size |
|-----------|--------------|
| Active Session | 1-3MB |
| Session History (30) | 5-10MB |
| Per Photo (base64) | 100-500KB |
| Total Limit | ~5-10MB |

---

## Mobile Testing Checklist

### iOS Safari

- [ ] Service Worker registers
- [ ] Session persists after reload
- [ ] GPS continues in background (limited)
- [ ] PWA installation works
- [ ] Photos save correctly
- [ ] Keep-alive heartbeat active

### Android Chrome

- [ ] Service Worker registers
- [ ] Session persists after reload
- [ ] GPS continues in background
- [ ] PWA installation works
- [ ] Photos save correctly
- [ ] Keep-alive heartbeat active
- [ ] Better background operation than iOS

### Desktop Chrome

- [ ] All features work
- [ ] DevTools show SW active
- [ ] localStorage persists
- [ ] No console errors

---

## Automated Testing (Future)

### Unit Tests

```javascript
// Example test structure
describe('Session Persistence', () => {
  it('should save session to localStorage', () => {
    // Test saveActiveSession()
  });
  
  it('should restore session from localStorage', () => {
    // Test restoreActiveSession()
  });
  
  it('should handle corrupted data gracefully', () => {
    // Test error handling
  });
});
```

### Integration Tests

```javascript
describe('Background Operation', () => {
  it('should register service worker', async () => {
    // Test SW registration
  });
  
  it('should send keep-alive heartbeats', () => {
    // Test heartbeat mechanism
  });
});
```

---

## Success Criteria

A successful implementation should:

✅ Restore sessions 100% of the time (unless localStorage cleared)
✅ Continue GPS tracking in background for 5+ minutes
✅ Save data every 10 seconds without performance impact
✅ Handle browser crashes gracefully
✅ Work on both iOS and Android
✅ Support offline operation
✅ Maintain < 20MB memory footprint
✅ Have < 3% battery impact per hour

---

## Reporting Issues

If you find issues during testing:

1. **Check browser console** for errors
2. **Export localStorage data** for debugging
3. **Note device/browser version**
4. **Describe exact steps to reproduce**
5. **Include screenshots if possible**

**Export Debug Data:**
```javascript
// Copy this to console and save output
console.log(JSON.stringify({
  activeSession: localStorage.getItem('fp_lite_active_session'),
  sessions: localStorage.getItem('fp_lite_sessions'),
  heartbeat: localStorage.getItem('fp_lite_heartbeat'),
  swRegistered: 'serviceWorker' in navigator,
  userAgent: navigator.userAgent
}, null, 2));
```

---

## Next Steps

After testing:

1. ✅ Verify all test scenarios pass
2. ✅ Test on multiple devices/browsers
3. ✅ Monitor performance in production
4. ✅ Collect user feedback
5. ✅ Iterate and improve

Happy Testing! 🚀
