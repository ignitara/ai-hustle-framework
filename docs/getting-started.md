# Getting Started with AI Hustle Framework

Welcome to AI Hustle Framework! This guide will help you get up and running with our collection of AI-powered tools.

## 🚀 Quick Start

1. **Download the Framework**

   ```bash
   git clone https://github.com/yourusername/ai-hustle-framework.git
   cd ai-hustle-framework
   ```

2. **Open the Launcher**

   - Open `index.html` in your web browser
   - You can do this by:
     - Double-clicking the file
     - Dragging it into your browser
     - Using a local server (recommended)

3. **Set Up Your API Key**

   - Get an OpenAI API key (see [API Key Setup](./api-key-setup.md))
   - Enter it in the launcher page
   - The key will be saved securely in your browser

4. **Start Using Tools**
   - Browse available tools by category
   - Click on any tool card to begin
   - Follow the tool-specific instructions

## 💻 Running Locally

### Using a Local Server (Recommended)

1. **Python**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Node.js**

   ```bash
   # Install http-server globally
   npm install -g http-server

   # Run the server
   http-server
   ```

3. **PHP**
   ```bash
   php -S localhost:8000
   ```

Then open `http://localhost:8000` in your browser.

### Why Use a Local Server?

- Avoids CORS issues with API requests
- Better security for API key handling
- More realistic testing environment
- Closer to production setup

## 🛠️ Available Tools

### Content Creation

- [Social Post Generator](./apps/social-post-writer.md)
  - Generate engaging social media posts
  - Customize tone and platform
  - Get multiple variations

More tools coming soon!

## 📱 Browser Support

The framework works best with modern browsers:

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔒 Security Considerations

1. **API Key Storage**

   - Keys are stored locally in your browser
   - Never share your API key
   - Clear browser data to remove stored keys

2. **Data Privacy**

   - No data is sent to external servers
   - All processing happens in your browser
   - No tracking or analytics

3. **Best Practices**
   - Use HTTPS in production
   - Regularly rotate API keys
   - Monitor API usage

## 🎯 Next Steps

1. **Explore Documentation**

   - Read tool-specific guides
   - Check best practices
   - Review examples

2. **Start Creating**

   - Choose your first tool
   - Follow the usage guide
   - Experiment with options

3. **Monetize**
   - Review [Monetization Guide](./monetization.md)
   - Choose your business model
   - Start offering services

## ❓ Need Help?

- Check the [FAQ](./faq.md)
- Review [Common Issues](./common-issues.md)
- Open a GitHub issue
- Contact support

## 📝 Contributing

We welcome contributions! See our [Contributing Guide](../CONTRIBUTING.md) for details.
