// AI Hustle Framework - Social Post Generator Configuration
const config = {
  // App Metadata
  appName: "Social Post Generator",
  appTagline: "Create engaging social media posts with AI",
  appDescription:
    "Generate 3 unique social media posts tailored to your business and audience.",
  appVersion: "1.0.0",

  // Branding
  logoUrl: "https://via.placeholder.com/64", // Replace with actual logo URL

  // OpenAI Configuration
  openaiModel: "gpt-3.5-turbo",
  maxTokens: 500,

  // Form Defaults
  defaultTones: [
    "Professional",
    "Casual",
    "Friendly",
    "Humorous",
    "Inspirational",
    "Educational",
  ],

  defaultPlatforms: ["Twitter", "LinkedIn", "Facebook", "Instagram", "TikTok"],

  // UI Text
  placeholders: {
    businessType: "e.g., Coffee Shop, Tech Startup, Fitness Trainer",
    targetAudience: "e.g., Young Professionals, Parents, Students",
    apiKey: "Enter your OpenAI API key",
  },

  // Error Messages
  errors: {
    missingApiKey: "Please enter your OpenAI API key to continue.",
    invalidApiKey: "Invalid API key. Please check and try again.",
    requestFailed: "Failed to generate posts. Please try again.",
    networkError: "Network error. Please check your connection.",
  },

  // Success Messages
  success: {
    copied: "Copied to clipboard!",
    generated: "Posts generated successfully!",
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = config;
} else {
  window.config = config;
}
