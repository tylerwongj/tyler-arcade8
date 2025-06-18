// Branding utilities and components
// This file provides functions to inject consistent branding across all games

// Load brand config
const BRAND = (typeof require !== 'undefined') 
  ? require('./brand-config.js') 
  : window.BRAND_CONFIG;

/**
 * Creates a branded footer element
 * @param {string} position - CSS position (default: 'fixed')
 * @returns {HTMLElement} Footer element
 */
function createBrandedFooter(position = 'fixed') {
  const footer = document.createElement('div');
  footer.id = 'branded-footer';
  footer.innerHTML = `<span>${BRAND.name}</span>`;
  
  // Styling
  footer.style.cssText = `
    position: ${position};
    bottom: 10px;
    right: 10px;
    background: rgba(15, 23, 42, 0.8);
    color: ${BRAND.colors.text};
    padding: 4px 8px;
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 12px;
    font-weight: 500;
    z-index: 1000;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(99, 102, 241, 0.2);
    transition: opacity 0.3s ease;
  `;
  
  // Hover effect
  footer.addEventListener('mouseenter', () => {
    footer.style.opacity = '0.7';
  });
  footer.addEventListener('mouseleave', () => {
    footer.style.opacity = '1';
  });
  
  return footer;
}

/**
 * Injects branded meta tags into document head
 */
function injectBrandedMetaTags() {
  const head = document.head;
  
  // Basic meta tags
  const metaTags = [
    { name: 'description', content: BRAND.description },
    { name: 'keywords', content: BRAND.keywords.join(', ') },
    { name: 'author', content: BRAND.creator },
    
    // Open Graph
    { property: 'og:title', content: `${document.title} | ${BRAND.name}` },
    { property: 'og:description', content: BRAND.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${document.title} | ${BRAND.name}` },
    { name: 'twitter:description', content: BRAND.description },
  ];
  
  // Add Twitter handle if available
  if (BRAND.social.twitter) {
    metaTags.push({ name: 'twitter:creator', content: BRAND.social.twitter });
  }
  
  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    if (tag.name) meta.name = tag.name;
    if (tag.property) meta.setAttribute('property', tag.property);
    meta.content = tag.content;
    head.appendChild(meta);
  });
}

/**
 * Adds branded console message
 */
function addBrandedConsoleMessage() {
  const styles = [
    'color: #6366f1',
    'font-size: 16px',
    'font-weight: bold',
    'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)'
  ].join(';');
  
  console.log(`%c🎮 ${BRAND.name}`, styles);
  console.log(`%cBuilt by ${BRAND.creator} | ${BRAND.website}`, 'color: #94a3b8; font-size: 12px;');
}

/**
 * Applies branded CSS custom properties to document
 */
function applyBrandedColors() {
  const root = document.documentElement;
  Object.entries(BRAND.colors).forEach(([key, value]) => {
    root.style.setProperty(`--brand-${key}`, value);
  });
}

/**
 * Creates a branded loading screen
 * @param {string} gameName - Name of the game loading
 * @returns {HTMLElement} Loading screen element
 */
function createBrandedLoadingScreen(gameName) {
  const loading = document.createElement('div');
  loading.id = 'branded-loading';
  loading.innerHTML = `
    <div class="loading-content">
      <div class="loading-logo">${BRAND.shortName}</div>
      <div class="loading-title">${BRAND.name}</div>
      <div class="loading-game">Loading ${gameName}...</div>
      <div class="loading-spinner"></div>
    </div>
  `;
  
  loading.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${BRAND.colors.background}, ${BRAND.colors.surface});
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: ${BRAND.colors.text};
  `;
  
  // Add CSS for loading animation
  const style = document.createElement('style');
  style.textContent = `
    .loading-content {
      text-align: center;
      animation: fadeIn 0.5s ease-in;
    }
    .loading-logo {
      font-size: 48px;
      font-weight: bold;
      color: ${BRAND.colors.primary};
      margin-bottom: 16px;
    }
    .loading-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .loading-game {
      font-size: 16px;
      color: ${BRAND.colors.textSecondary};
      margin-bottom: 32px;
    }
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid ${BRAND.colors.surface};
      border-top: 3px solid ${BRAND.colors.primary};
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  
  return loading;
}

/**
 * Removes the branded loading screen
 */
function removeBrandedLoadingScreen() {
  const loading = document.getElementById('branded-loading');
  if (loading) {
    loading.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => loading.remove(), 300);
  }
}

/**
 * Initialize all branding for a game
 * @param {Object} options - Branding options
 * @param {string} options.gameName - Name of the current game
 * @param {boolean} options.showFooter - Whether to show footer (default: true)
 * @param {boolean} options.showLoading - Whether to show loading screen (default: false)
 */
function initializeBranding(options = {}) {
  const { 
    gameName = 'Game', 
    showFooter = true, 
    showLoading = false 
  } = options;
  
  // Apply branded colors
  applyBrandedColors();
  
  // Inject meta tags
  injectBrandedMetaTags();
  
  // Add console message
  addBrandedConsoleMessage();
  
  // Add footer if requested
  if (showFooter) {
    document.body.appendChild(createBrandedFooter());
  }
  
  // Show loading screen if requested
  if (showLoading) {
    const loading = createBrandedLoadingScreen(gameName);
    document.body.appendChild(loading);
    
    // Auto-remove after 2 seconds (or call removeBrandedLoadingScreen manually)
    setTimeout(() => removeBrandedLoadingScreen(), 2000);
  }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BRAND,
    createBrandedFooter,
    injectBrandedMetaTags,
    addBrandedConsoleMessage,
    applyBrandedColors,
    createBrandedLoadingScreen,
    removeBrandedLoadingScreen,
    initializeBranding
  };
} else {
  // Browser globals
  window.BRAND = BRAND;
  window.createBrandedFooter = createBrandedFooter;
  window.injectBrandedMetaTags = injectBrandedMetaTags;
  window.addBrandedConsoleMessage = addBrandedConsoleMessage;
  window.applyBrandedColors = applyBrandedColors;
  window.createBrandedLoadingScreen = createBrandedLoadingScreen;
  window.removeBrandedLoadingScreen = removeBrandedLoadingScreen;
  window.initializeBranding = initializeBranding;
}