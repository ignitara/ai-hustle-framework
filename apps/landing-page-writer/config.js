// AI Hustle Framework - Landing Page Writer Configuration
const config = {
  // App Metadata
  name: "Landing Page Writer",
  tagline: "Generate high-converting landing page copy",
  description:
    "Create compelling landing page copy that converts visitors into customers",
  version: "1.0.0",

  // OpenAI Configuration
  openaiModel: "gpt-3.5-turbo",
  maxTokens: 1000,

  // Form Labels
  labels: {
    offer: "What are you offering?",
    audience: "Who is it for?",
    result: "What result does it help them achieve?",
    cta: "What action do you want them to take?",
  },

  // Form Placeholders
  placeholders: {
    offer: "e.g. A free 5-day fitness challenge for busy moms",
    audience: "e.g. Moms over 35 who want to lose weight at home",
    result: "e.g. Lose their first 5 pounds without meal prepping or a gym",
    cta: "e.g. Sign up for the free challenge",
  },

  // Section Headers
  sections: {
    headline: "Headline",
    subheadline: "Supporting Subheadline",
    bullets: "Key Benefits & Features",
    ctaBlock: "Call-to-Action Block",
  },

  // Button Labels
  buttons: {
    generate: "Generate Landing Page Copy",
    copy: "Copy Text",
  },

  // Success Messages
  success: {
    generated: "Landing page copy generated successfully!",
    copied: "Copied to clipboard!",
  },

  // Error Messages
  errors: {
    missingApiKey: "Please enter your OpenAI API key in the settings.",
    invalidApiKey: "Invalid API key. Please check your settings.",
    networkError: "Network error. Please check your connection.",
    requestFailed: "Failed to generate copy. Please try again.",
    copyFailed: "Failed to copy text. Please try again.",
    missingOffer: "Please describe what you're offering.",
    missingAudience: "Please specify who this is for.",
    missingResult: "Please describe the result they'll achieve.",
    missingCta: "Please specify the desired action.",
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = config;
} else {
  window.config = config;
}
