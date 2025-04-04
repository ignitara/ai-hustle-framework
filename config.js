// AI Hustle Framework - App Launcher Configuration
const config = {
  // App Metadata
  appName: "AI Hustle Framework",
  appTagline: "AI-Powered Tools for Non-Coders",
  appDescription:
    "A collection of simple, AI-powered tools you can monetize by selling access or using them as part of a service-based business.",
  appVersion: "1.0.0",

  // Branding
  logoUrl: "https://via.placeholder.com/64", // Replace with actual logo URL

  // Available Apps
  apps: [
    {
      id: "social-post-writer",
      name: "Social Post Generator",
      description:
        "Generate engaging social media posts tailored to your business and audience.",
      icon: "📱",
      path: "/apps/social-post-writer/index.html",
      category: "Content Creation",
    },
    {
      id: "email-writer",
      name: "Email Writer",
      description: "Generate professional marketing and nurturing emails",
      path: "/apps/email-writer/index.html",
      category: "Content Creation",
      icon: "✉️",
    },
    {
      id: "lead-magnet-generator",
      name: "Lead Magnet Generator",
      description: "Create benefit-driven lead magnet titles and descriptions",
      path: "/apps/lead-magnet-generator/index.html",
      category: "Lead Generation",
      icon: "🎯",
    },
    {
      id: "offer-refiner",
      name: "Offer Refiner",
      description:
        "Transform your offer into an irresistible pitch with compelling hooks",
      path: "/apps/offer-refiner/index.html",
      category: "Marketing",
      icon: "💎",
    },
    {
      id: "review-responder",
      name: "Review Responder",
      description:
        "Generate professional and thoughtful responses to customer reviews",
      path: "/apps/review-responder/index.html",
      category: "Customer Service",
      icon: "⭐",
    },
    {
      id: "landing-page-writer",
      name: "Landing Page Writer",
      description:
        "Generate high-converting landing page copy with headlines, benefits, and CTAs",
      path: "/apps/landing-page-writer/index.html",
      category: "Marketing",
      icon: "📝",
    },
    // Add more apps here as they are created
  ],

  // Categories for organizing apps
  categories: [
    "Content Creation",
    "Image Generation",
    "Text Analysis",
    "Business Tools",
    "Lead Generation",
    "Marketing",
    "Customer Service",
  ],

  // UI Text
  placeholders: {
    apiKey: "Enter your OpenAI API key",
  },

  // Error Messages
  errors: {
    missingApiKey: "Please enter your OpenAI API key to continue.",
    invalidApiKey: "Invalid API key. Please check and try again.",
    networkError: "Network error. Please check your connection and try again.",
  },

  // Success Messages
  success: {
    apiKeySaved: "API key saved successfully!",
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = config;
} else {
  window.config = config;
}
