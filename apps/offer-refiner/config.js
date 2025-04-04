// AI Hustle Framework - Offer Refiner Configuration
window.config = {
  // App Metadata
  name: "Offer Refiner",
  tagline: "Transform your offer into an irresistible pitch",
  description:
    "Clarify your core offer and generate compelling marketing hooks that convert.",
  version: "1.0.0",

  // Branding
  branding: {
    logo: "https://placehold.co/100x100/2563eb/ffffff?text=OR",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
  },

  // OpenAI Configuration
  openaiModel: "gpt-3.5-turbo",
  maxTokens: 500,

  // Form Labels
  formLabels: {
    product: "What are you selling?",
    audience: "Who is it for?",
    transformation: "What's the big transformation?",
    objections: "What objections do people have?",
    generate: "Generate Offer & Hooks",
  },

  // Placeholders
  placeholders: {
    product: "e.g. 1:1 coaching for women who want to lose weight",
    audience: "e.g. Women over 40 who struggle with dieting",
    transformation:
      "e.g. Help them lose 20 pounds in 90 days without strict dieting",
    objections: "e.g. They think they don't have time, and they hate meal prep",
  },

  // Error Messages
  errors: {
    missingApiKey: "Please enter your OpenAI API key to continue.",
    invalidApiKey: "Invalid API key. Please check your key and try again.",
    networkError: "Network error. Please check your connection and try again.",
    requestFailed: "Failed to generate offer. Please try again.",
    copyFailed: "Failed to copy text to clipboard.",
  },

  // Success Messages
  success: {
    generated: "Offer and hooks generated successfully!",
    copied: "Copied to clipboard!",
  },

  // Loading States
  loading: {
    text: "Crafting your perfect offer...",
  },
};
