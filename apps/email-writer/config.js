// LaunchKit AI - Email Writer Configuration
const config = {
  // App Metadata
  appName: "Email Writer",
  appTagline: "Generate engaging marketing emails with AI",
  appDescription:
    "Create professional marketing and nurturing emails tailored to your audience and goals.",
  appVersion: "1.0.0",

  // Branding
  logoUrl: "https://via.placeholder.com/64", // Replace with actual logo URL

  // OpenAI Configuration
  openaiModel: "gpt-3.5-turbo",
  maxTokens: 1000,

  // Form Defaults
  emailGoals: [
    "Welcome",
    "Promotional",
    "Follow-Up",
    "Re-Engagement",
    "Newsletter",
  ],

  tones: ["Friendly", "Professional", "Excited", "Bold", "Empathetic"],

  // UI Text
  placeholders: {
    targetAudience:
      "e.g., Small business owners, Tech professionals, Fitness enthusiasts",
    callToAction:
      "e.g., Sign up for our free trial, Download the whitepaper, Schedule a call",
  },

  // Error Messages
  errors: {
    missingApiKey: "Please enter your OpenAI API key to continue.",
    invalidApiKey: "Invalid API key. Please check and try again.",
    requestFailed: "Failed to generate email. Please try again.",
    networkError: "Network error. Please check your connection.",
  },

  // Success Messages
  success: {
    copied: "Copied to clipboard!",
    generated: "Email generated successfully!",
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = config;
} else {
  window.config = config;
}
