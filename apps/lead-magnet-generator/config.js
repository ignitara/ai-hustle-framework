// AI Hustle Framework - Lead Magnet Generator Configuration
window.config = {
  // App Metadata
  name: "Lead Magnet Generator",
  tagline: "Create Compelling Lead Magnets That Convert",
  description:
    "Generate benefit-driven lead magnet titles and descriptions to attract your ideal customers.",
  version: "1.0.0",

  // Branding
  branding: {
    logo: "https://placehold.co/100x100/2563eb/ffffff?text=LM",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
  },

  // OpenAI Configuration
  openaiModel: "gpt-3.5-turbo",
  maxTokens: 500,

  // Form Labels
  formLabels: {
    niche: "Niche or Topic",
    audience: "Target Audience",
    outcome: "Desired Outcome",
    generate: "Generate Lead Magnets",
  },

  // Placeholders
  placeholders: {
    niche: "e.g. Fitness coaching",
    audience: "e.g. Busy moms over 40",
    outcome: "e.g. Lose weight without going to the gym",
  },

  // Error Messages
  errors: {
    missingApiKey: "Please enter your OpenAI API key to continue.",
    invalidApiKey: "Invalid API key. Please check your key and try again.",
    networkError: "Network error. Please check your connection and try again.",
    requestFailed: "Failed to generate lead magnets. Please try again.",
    copyFailed: "Failed to copy text to clipboard.",
  },

  // Success Messages
  success: {
    generated: "Lead magnets generated successfully!",
    copied: "Copied to clipboard!",
  },

  // Loading States
  loading: {
    text: "Generating lead magnets...",
  },
};
