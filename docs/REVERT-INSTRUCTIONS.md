# Revert Instructions - Return to Stable Version

**Date:** April 26, 2026

## Quick Revert Steps

### Option 1: Git Revert (Recommended)

```bash
# Check your git log to find the last working commit
git log --oneline

# Find the commit from ~50 minutes ago (before routing changes)
# Replace COMMIT_HASH with the actual hash
git revert HEAD --no-commit
git revert HEAD~1 --no-commit
# ... continue until you reach the stable version

# Or reset hard to specific commit
git reset --hard COMMIT_HASH

# Force push if needed (be careful!)
git push --force
```

### Option 2: Manual File Restoration

If you have backups from 50 minutes ago:

1. **Restore these files:**
   - `index.html`
   - `live.js`
   - `panel.js`
   - `history-modal.js`

2. **Delete these new files:**
   - `TEST-ROUTING.html`
   - `docs/ROUTING-REFACTOR.md`
   - `docs/LIVE-JS-FIXES.md`
   - `docs/FEATURES-TO-IMPLEMENT.md` (this file - after reading)
   - `docs/REVERT-INSTRUCTIONS.md` (this file - after reading)

3. **Clear browser completely:**
   ```
   - Clear cache
   - Clear cookies
   - Clear local storage
   - Close all tabs
   - Restart browser
   ```

4. **Restart server:**
   ```bash
   # Stop current server (Ctrl+C)
   # Start fresh
   npm start
   ```

### Option 3: Vercel Rollback

If deployed on Vercel:

1. Go to Vercel dashboard
2. Find your project
3. Go to "Deployments"
4. Find the last working deployment
5. Click "..." menu
6. Click "Promote to Production"

---

## What Was Changed (To Revert)

### Files Modified
- `index.html` - Routing system replaced (BROKEN)
- `live.js` - Added null checks, changed car color
- `panel.js` - (check if modified)
- `history-modal.js` - (check if modified)

### Files Created
- `TEST-ROUTING.html` - Test file (DELETE)
- `docs/ROUTING-REFACTOR.md` - Documentation (DELETE)
- `docs/LIVE-JS-FIXES.md` - Documentation (DELETE)
- `docs/FEATURES-TO-IMPLEMENT.md` - Keep for reference
- `docs/REVERT-INSTRUCTIONS.md` - This file

---

## Verification After Revert

✅ Check these work:
1. Open app in browser
2. Only ONE black car visible
3. No console errors
4. Can switch between tabs
5. No duplicate markers
6. Map loads correctly
7. All existing features work

---

## Starting Fresh - Checklist

Before implementing ANY new features:

1. ✅ App is stable and working
2. ✅ No console errors
3. ✅ All existing features tested
4. ✅ Git commit of stable version
5. ✅ Read FEATURES-TO-IMPLEMENT.md
6. ✅ Plan which feature to add first
7. ✅ Implement ONE feature only
8. ✅ Test thoroughly
9. ✅ Git commit
10. ✅ Repeat for next feature

---

## Key Lessons Learned

1. **Don't implement multiple features at once**
2. **Test after each small change**
3. **Keep features isolated**
4. **One car marker at a time**
5. **Proper cleanup on state changes**
6. **Reference working standalone versions**
7. **Don't rush - quality over speed**

---

## Reference Files to Keep

These files have working implementations:
- `.USER/FIELDPROSPECTINGTOOL_claude.html` - Lead pins + routing (WORKING)
- Last deployed version - Stable base (WORKING)

Use these as reference when implementing features fresh.

---

## Support

If you need help after reverting:
1. Verify the stable version works
2. Read FEATURES-TO-IMPLEMENT.md
3. Start with Phase 1 only
4. Test each step
5. Don't skip testing

---

**Remember:** A working app with fewer features is better than a broken app with many features.
