// Authentication Logic

let currentUser = null;

// Check authentication state
function checkAuth() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        currentUser = user;
        
        // Check user status in Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
          // New user - create pending account
          await createPendingUser(user);
          resolve({ 
            authenticated: true, 
            status: 'pending', 
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL
            }
          });
        } else {
          const userData = userDoc.data();
          
          // Update last login
          await db.collection('users').doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
          });
          
          resolve({ 
            authenticated: true, 
            status: userData.status,
            role: userData.role,
            user: { 
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              ...userData 
            }
          });
        }
      } else {
        // User is signed out
        resolve({ authenticated: false });
      }
    });
  });
}

// Create pending user
async function createPendingUser(user) {
  const isAdmin = user.email === ADMIN_EMAIL;
  
  const userData = {
    email: user.email,
    displayName: user.displayName || 'Unknown',
    photoURL: user.photoURL || '',
    role: isAdmin ? 'admin' : 'member',
    status: isAdmin ? 'active' : 'pending',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  try {
    await db.collection('users').doc(user.uid).set(userData);
    console.log(`✅ User created: ${user.email} (${userData.status})`);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    // If permission denied, it means rules are blocking
    // This shouldn't happen for admin email, but we'll handle it
    throw error;
  }
}

// Sign in with Google
async function signInWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

// Sign out
async function signOut() {
  try {
    await auth.signOut();
    currentUser = null;
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

// Get current user data
async function getCurrentUserData() {
  if (!currentUser) return null;
  
  const userDoc = await db.collection('users').doc(currentUser.uid).get();
  return userDoc.exists ? { ...currentUser, ...userDoc.data() } : null;
}

// Check if user is admin
async function isAdmin() {
  const userData = await getCurrentUserData();
  return userData && userData.role === 'admin';
}

// Check invite code
async function checkInviteCode(code) {
  try {
    // Clean the code - remove any invalid characters
    const cleanCode = code.trim().replace(/[^a-zA-Z0-9]/g, '');
    
    if (!cleanCode) {
      return { valid: false, message: 'Invalid invite code format' };
    }
    
    const inviteDoc = await db.collection('invites').doc(cleanCode).get();
    
    if (!inviteDoc.exists) {
      return { valid: false, message: 'Invalid invite code' };
    }
    
    const invite = inviteDoc.data();
    
    if (invite.used) {
      return { valid: false, message: 'Invite code already used' };
    }
    
    if (invite.expiresAt && invite.expiresAt.toDate() < new Date()) {
      return { valid: false, message: 'Invite code expired' };
    }
    
    return { valid: true, invite };
  } catch (error) {
    console.error('Error checking invite code:', error);
    return { valid: false, message: 'Error validating invite code: ' + error.message };
  }
}

// Use invite code
async function useInviteCode(code, userId) {
  try {
    // Clean the code
    const cleanCode = code.trim().replace(/[^a-zA-Z0-9]/g, '');
    
    await db.collection('invites').doc(cleanCode).update({
      used: true,
      usedBy: userId,
      usedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Auto-approve user
    await db.collection('users').doc(userId).update({
      status: 'active',
      invitedBy: cleanCode
    });
  } catch (error) {
    console.error('Error using invite code:', error);
    throw error;
  }
}

console.log('Auth module loaded');
