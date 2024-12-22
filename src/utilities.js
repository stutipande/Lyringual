import toast, { Toaster } from 'react-hot-toast';

export function customToast(content, icon) {
  toast(
    content, {
  duration: 4000,
  position: 'bottom-right',

  // Styling
  style: {color: 'white'},
  className: 'card',

  // Custom Icon
  icon: icon,

  // Change colors of success/error/loading icon
  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },

  // Aria
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
  });
}

export function getFirebaseErrorMessage(error) {
  const errorMessages = {
      "auth/invalid-email": "The email address is not valid.",
      "auth/user-disabled": "This user account has been disabled.",
      "auth/user-not-found": "No user found with this email address.",
      "auth/wrong-password": "The password is incorrect.",
      "auth/email-already-in-use": "This email address is already in use.",
      "auth/weak-password": "The password is too weak. Please use a stronger password.",
      "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
      "auth/requires-recent-login": "This operation requires recent authentication. Please log in again.",
      "auth/network-request-failed": "A network error occurred. Please check your connection.",
      "auth/too-many-requests": "Too many requests. Please try again later.",
      "auth/argument-error": "An invalid argument was provided.",
      "auth/timeout": "The operation timed out. Please try again.",
      "auth/quota-exceeded": "Quota exceeded. Please try again later.",
      "auth/captcha-check-failed": "Captcha verification failed. Please try again.",
      "auth/missing-email": "An email address is required.",
      // Add more Firebase error codes and messages as needed.
  };

  return errorMessages[error.code] || "An unknown error occurred. Please try again.";
}

export function getFlagFromLanguageCode(languageCode) {
    const languageFlags = {
      "en": "🇺🇸", 
      "sv": "🇸🇪", 
      "es": "🇪🇸", 
      "fr": "🇫🇷", 
      "de": "🇩🇪", 
      "it": "🇮🇹", 
      "pt": "🇵🇹", 
      "nl": "🇳🇱", 
      "ru": "🇷🇺", 
      "ja": "🇯🇵", 
      "ko": "🇰🇷", 
      "zh": "🇨🇳", 
      "ar": "🇸🇦",
      "hi": "🇮🇳",
      "tr": "🇹🇷", 
      "pl": "🇵🇱",
      "da": "🇩🇰", 
      "no": "🇳🇴", 
      "fi": "🇫🇮", 
      "el": "🇬🇷"  
    };

    return languageFlags[languageCode] || "🏳️‍🌈";
}

export function xpForLevel(level) {
    if (level <= 1) return 0;
    return 10 * Math.pow(level - 1, 2); 
  }
  

  export function currentLevel(xp) {
    for (let level = 1; level <= 25; level++) {
      if (xp < xpForLevel(level + 1)) {
        return level;
      }
    }
    return 25;
  }
  
  export function currentLevelXP(xp) {
    const level = currentLevel(xp);
    return xpForLevel(level);
  }
  
  export function nextLevelXP(xp) {
    const level = currentLevel(xp) + 1; 
    return xpForLevel(level);
  }