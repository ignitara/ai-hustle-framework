// AI Hustle Framework - Social Post Generator
class SocialPostGenerator {
  constructor() {
    this.apiKey = localStorage.getItem("openaiApiKey") || "";
    this.form = document.getElementById("postGeneratorForm");
    this.resultsContainer = document.getElementById("resultsContainer");
    this.loadingSpinner = document.getElementById("loadingSpinner");
    this.errorMessage = document.getElementById("errorMessage");
    this.successMessage = document.getElementById("successMessage");

    // Use local config
    this.config = window.config;

    this.initializeEventListeners();
    this.loadSavedFormValues();
  }

  initializeEventListeners() {
    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // API key input
    const apiKeyInput = document.getElementById("apiKey");
    apiKeyInput.addEventListener("change", (e) => {
      this.apiKey = e.target.value;
      localStorage.setItem("openaiApiKey", this.apiKey);
    });

    // Copy buttons
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("copy-btn")) {
        this.copyToClipboard(e.target.dataset.text);
      }
    });
  }

  loadSavedFormValues() {
    const savedValues = JSON.parse(
      localStorage.getItem("lastFormValues") || "{}"
    );
    Object.keys(savedValues).forEach((key) => {
      const input = document.getElementById(key);
      if (input) {
        input.value = savedValues[key];
      }
    });
  }

  saveFormValues() {
    const formData = new FormData(this.form);
    const values = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });
    localStorage.setItem("lastFormValues", JSON.stringify(values));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.apiKey) {
      this.showError(this.config.errors.missingApiKey);
      return;
    }

    this.showLoading(true);
    this.hideMessages();

    try {
      const formData = new FormData(this.form);
      const posts = await this.generatePosts({
        businessType: formData.get("businessType"),
        targetAudience: formData.get("targetAudience"),
        tone: formData.get("tone"),
        platform: formData.get("platform"),
      });

      this.saveFormValues();
      this.displayResults(posts);
      this.showSuccess(this.config.success.generated);
    } catch (error) {
      this.showError(error.message || this.config.errors.requestFailed);
    } finally {
      this.showLoading(false);
    }
  }

  async generatePosts(params) {
    const prompt = this.createPrompt(params);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: this.config.openaiModel,
            messages: [
              {
                role: "system",
                content:
                  "You are an expert social media copywriter who creates engaging, platform-appropriate posts.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: this.config.maxTokens,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(this.config.errors.invalidApiKey);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      if (error.message === this.config.errors.invalidApiKey) {
        throw error;
      }
      throw new Error(this.config.errors.networkError);
    }
  }

  createPrompt(params) {
    return `Create 3 unique social media posts for a ${params.businessType} targeting ${params.targetAudience}. 
        Use a ${params.tone} tone and optimize for ${params.platform}. 
        Format each post with a clear number (1, 2, 3) and separate them with newlines. 
        Keep each post concise and engaging.`;
  }

  displayResults(posts) {
    this.resultsContainer.innerHTML = posts
      .map(
        (post, index) => `
            <div class="post-card">
                <p>${post}</p>
                <div class="post-actions">
                    <button class="btn btn-secondary copy-btn" data-text="${post}">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showSuccess(this.config.success.copied);
    } catch (error) {
      this.showError(this.config.errors.copyFailed);
    }
  }

  showLoading(show) {
    this.loadingSpinner.classList.toggle("active", show);
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = "block";
  }

  showSuccess(message) {
    this.successMessage.textContent = message;
    this.successMessage.style.display = "block";
    setTimeout(() => {
      this.hideMessages();
    }, 3000);
  }

  hideMessages() {
    this.errorMessage.style.display = "none";
    this.successMessage.style.display = "none";
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SocialPostGenerator();
});
