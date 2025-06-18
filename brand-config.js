// Brand Configuration
// Change these values to rebrand the entire arcade

const BRAND_CONFIG = {
  // Core branding
  name: "Tyler Arcade", // Change this to rebrand (e.g., "Neural Games", "AI Games", etc.)
  shortName: "TA", // Used for favicon, logos
  tagline: "Multiplayer Games Hub",
  
  // Creator info
  creator: "Tyler",
  creatorHandle: "@tylerwongj",
  
  // Colors (CSS custom properties)
  colors: {
    primary: "#6366f1", // Indigo
    secondary: "#8b5cf6", // Purple
    accent: "#06b6d4", // Cyan
    background: "#0f172a", // Dark blue
    surface: "#1e293b", // Lighter dark
    text: "#f1f5f9", // Light gray
    textSecondary: "#94a3b8" // Medium gray
  },
  
  // URLs and links
  website: "https://tyler-arcade.com", // Update when deployed
  github: "https://github.com/tylerwongj",
  portfolio: "https://tylerwong.dev", // Your portfolio site
  
  // SEO and meta
  description: "Play amazing multiplayer games with friends. Real-time gaming experiences built for the web.",
  keywords: ["games", "multiplayer", "arcade", "browser games", "real-time"],
  
  // Social media (optional)
  social: {
    twitter: "@tylerwongj",
    discord: null, // Add if you create a game server
    youtube: null
  }
};

// Export for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BRAND_CONFIG;
} else {
  window.BRAND_CONFIG = BRAND_CONFIG;
}