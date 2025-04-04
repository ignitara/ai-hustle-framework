// AI Hustle Framework - Review Responder Configuration
window.config = {
  // App Metadata
  name: "Review Responder",
  tagline: "Professional review responses in seconds",
  description:
    "Generate polished, professional responses to online reviews—positive or negative.",
  version: "1.0.0",

  // Branding
  branding: {
    logo: "https://placehold.co/100x100/2563eb/ffffff?text=RR",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
  },

  // OpenAI Configuration
  openaiModel: "gpt-3.5-turbo",
  maxTokens: 500,

  // Form Labels
  formLabels: {
    review: "Paste the review",
    tone: "Response tone",
    businessType: "Business type",
    generate: "Generate Response",
  },

  // Response Tones
  tones: ["Professional", "Friendly", "Apologetic", "Bold"],

  // Placeholders
  placeholders: {
    review: "e.g. The staff was rude and the wait time was awful.",
    businessType: "e.g. Dental office, Bakery, Car dealership",
  },

  // Error Messages
  errors: {
    missingApiKey: "Please enter your OpenAI API key to continue.",
    invalidApiKey: "Invalid API key. Please check your key and try again.",
    networkError: "Network error. Please check your connection and try again.",
    requestFailed: "Failed to generate response. Please try again.",
    copyFailed: "Failed to copy text to clipboard.",
    missingReview: "Please paste a review to respond to.",
    missingBusinessType: "Please enter your business type.",
  },

  // Success Messages
  success: {
    generated: "Response generated successfully!",
    copied: "Copied to clipboard!",
  },

  // Loading States
  loading: {
    text: "Crafting your professional response...",
  },
};
