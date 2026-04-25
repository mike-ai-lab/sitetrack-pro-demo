# Quick Test Guide - LiveProspect Features

## 🚀 Quick Start Test

### 1. Test FAB Visibility (Most Important)
1. Open the app in your browser
2. Click the "Live" tab in the control panel
3. Click the ▶ (Play) button to start a session
4. **Look for the black circular + button** at the bottom-right of the screen
   - It should be positioned to the LEFT of the layer/locate/traffic buttons
   - If you see it, the fix worked! ✅

### 2. Test Pin Dropping
1. With the session active, click the + (FAB) button
2. A pin should appear on the map with a number label
3. A form should open to add contact details
4. Fill in some info and click "Save Lead"
5. The pin label should update with the contact name

### 3. Test Background Operation
1. Start a Live session
2. Drop a pin or two
3. **Close the browser tab** (don't quit the browser)
4. Wait 30 seconds
5. **Reopen the tab**
6. The session should still be active with all your pins

### 4. Test Page Reload Persistence
1. Start a Live session
2. Drop 2-3 pins with contact info
3. Walk around a bit (or just wait for GPS to update)
4. **Press F5 to reload the page**
5. After reload:
   - Session should resume automatically
   - All pins should be visible
   - Path should be drawn
   - Timer should continue from where it left off

### 5. Test Station Editing & Deletion
1. In an active session, click a pin or use the station list
2. Click "Edit Lead" to modify contact info
3. Make changes and save
4. Click "Delete" on a station
5. Remaining stations should renumber automatically

### 6. Test History Features
1. Complete a Live session (click Stop)
2. Go to History tab
3. Find your session and expand it
4. Click "Edit Contact" on a station
5. Modify the contact and save
6. Click the trash icon to delete the entire session

## 🔍 Troubleshooting

### FAB Not Visible?
- Check browser console (F12) for errors
- Look for "✅ LiveProspect initialized" message
- Verify you're on the Live tab and clicked Start

### Session Not Persisting?
- Check if localStorage is enabled in your browser
- Open console and type: `localStorage.getItem('lp_active_session')`
- Should show JSON data if session is active

### Background Tracking Not Working?
- Check if Service Worker registered: `navigator.serviceWorker.getRegistrations()`
- Some browsers may still suspend after 10+ minutes
- This is a browser limitation, not a bug

## 📱 Mobile Testing

On mobile, also test:
1. Start session, switch to another app, come back
2. Lock phone screen, unlock after 1 minute
3. Close browser (swipe away), reopen
4. All data should persist

## ✅ Success Criteria

You'll know everything works if:
- ✅ FAB button appears when you start a Live session
- ✅ Pins drop when you click the FAB
- ✅ Session continues after closing/reopening browser
- ✅ Page reload restores your active session
- ✅ You can edit and delete stations
- ✅ History sessions can be edited and deleted

## 🐛 If Something Doesn't Work

1. Open browser console (F12)
2. Look for error messages
3. Check the Network tab for failed requests
4. Share any error messages for debugging

## 🎯 Key Features to Verify

| Feature | Test | Expected Result |
|---------|------|-----------------|
| FAB Visibility | Start Live session | Black + button appears bottom-right |
| Pin Dropping | Click FAB | Pin with number appears on map |
| Contact Form | Click pin | Form opens with fields |
| Background GPS | Close tab, reopen | Path continues tracking |
| Page Reload | F5 during session | Session resumes with all data |
| Station Delete | Click Delete button | Pin removed, others renumber |
| Session Delete | Click trash in history | Session removed from list |
| History Edit | Edit contact in history | Changes persist |

## 💡 Tips

- The FAB only appears when a Live session is active
- GPS tracking works best outdoors with clear sky view
- Background tracking extends battery life vs keeping screen on
- localStorage has ~5-10MB limit - old sessions may need cleanup
- Photos are stored as base64 - they use significant space

## 🔧 Developer Console Commands

```javascript
// Check if LiveProspect initialized
window.LiveProspect

// Check active session
localStorage.getItem('lp_active_session')

// Check saved sessions
localStorage.getItem('lp_sessions')

// Check Service Worker
navigator.serviceWorker.getRegistrations()

// Clear all data (reset)
localStorage.clear()
```
