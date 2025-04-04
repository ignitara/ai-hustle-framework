# AI Hustle Framework

An open-source, no-code framework for creating AI-powered tools that run in the browser using vanilla HTML, CSS, and JavaScript.

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- An OpenAI API key
- Basic understanding of HTML and CSS (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/aihustleframework.git
cd aihustleframework
```

2. Open the `index.html` file in your browser to access the launcher page.

3. Enter your OpenAI API key in the launcher page settings.

### Getting an OpenAI API Key

1. Visit [OpenAI's website](https://openai.com)
2. Create an account or sign in
3. Navigate to the API section
4. Generate a new API key
5. Copy the key and paste it into the launcher page

> ⚠️ **Important**: Keep your API key secure and never share it publicly. The key is stored locally in your browser and is only used to make requests to OpenAI's API.

## 🛠️ Available Tools

### Content Creation

- **Social Post Generator**: Create engaging social media posts for various platforms
- **Email Writer**: Generate professional marketing and nurturing emails
- **Lead Magnet Generator**: Create benefit-driven lead magnet titles and descriptions

### Marketing

- **Offer Refiner**: Transform your offer into an irresistible pitch with compelling hooks
- **Landing Page Writer**: Generate high-converting landing page copy with headlines, benefits, and CTAs

### Customer Service

- **Review Responder**: Generate professional and thoughtful responses to customer reviews

More tools coming soon!

## 💡 Usage Guide

### Using the Launcher Page

1. Open the launcher page in your browser
2. Enter your OpenAI API key in the settings
3. Browse available tools by category
4. Click on a tool to start using it

### Using Individual Tools

1. Select the tool you want to use
2. Fill in the required information
3. Click generate to create content
4. Copy or download the results

## 🔧 Technical Details

### Project Structure

```
ai-hustle-framework/
├── index.html          # Launcher page
├── config.js           # Global configuration
├── styles.css          # Global styles
├── apps/              # Individual tools
│   ├── social-post-writer/
│   ├── email-writer/
│   ├── landing-page-writer/
│   ├── lead-magnet-generator/
│   ├── offer-refiner/
│   └── review-responder/
└── docs/              # Documentation
    ├── index.md
    ├── getting-started.md
    ├── api-key-setup.md
    └── apps/
        ├── social-post-writer.md
        ├── email-writer.md
        ├── landing-page-writer.md
        ├── lead-magnet-generator.md
        ├── offer-refiner.md
        └── review-responder.md
```

### Creating a New App

#### AI Prompt Template

Use this prompt with ChatGPT or similar AI to help generate a new app for the framework:

```
I want to create a new app for the AI Hustle Framework. Here are the details:

Framework Requirements:
- Uses vanilla HTML, CSS, and JavaScript
- Integrates with OpenAI API
- Follows framework's standard UI components and styles
- Includes error handling and loading states
- Stores form values in localStorage
- Has copy-to-clipboard functionality

Please help me create an app with these specifications:

1. App Name: [Your app name]
2. Purpose: [What the app does]
3. Target Users: [Who will use it]
4. Input Fields Needed:
   - [List required input fields]
5. Output Format:
   - [Describe the expected output]
6. Special Features:
   - [Any unique features]

Please provide:
1. App configuration (config.js)
2. HTML structure (index.html)
3. JavaScript functionality (script.js)
4. Any app-specific styles (styles.css)
5. OpenAI prompt template
6. Documentation outline
```

#### Standard App Template

To create a new app for the framework, use this template:

```markdown
### 📁 App Structure

apps/your-app-name/
├── index.html # App interface
├── styles.css # App-specific styles
├── script.js # App functionality
└── config.js # App configuration

### ✅ Required Components

1. **App Config**

   - App metadata (name, description, version)
   - Form labels and placeholders
   - Error and success messages
   - OpenAI configuration

2. **HTML Structure**

   - Standard header with logo and title
   - Form with required inputs
   - Loading spinner
   - Error/success messages
   - Results container
   - Framework footer

3. **JavaScript Class**

   - Constructor with standard initialization
   - Event listeners for form and buttons
   - Form value persistence
   - OpenAI API integration
   - Error handling
   - Results display
   - Copy functionality

4. **Documentation**
   - Feature list
   - Use cases
   - Usage instructions
   - Best practices
   - Monetization ideas
   - Technical details

### 🔄 Integration Steps

1. Create app folder and files
2. Add app to root config.js
3. Create documentation in docs/apps/
4. Update root README.md
5. Test all functionality
6. Ensure mobile responsiveness
```

### Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- OpenAI API

## 🔒 Security

### API Key Handling

- API keys are stored securely in browser localStorage
- Keys are never sent to external servers
- Keys can be cleared from the launcher settings

### Data Privacy

- All content generation happens locally in your browser
- No data is stored on external servers
- Generated content is not shared with third parties

## 💰 Monetization Ideas

### Service-Based

- Offer content creation services
- Provide consulting services
- Create custom tools for clients

### Product-Based

- Sell premium templates
- Create industry-specific tools
- Develop specialized features

### Education

- Create online courses
- Offer workshops
- Write educational content

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the API
- Contributors and maintainers
- The open-source community

## 📞 Support

For support, please:

1. Check the documentation
2. Open an issue
3. Join the community forum

---

Made with ❤️ for non-coders everywhere
