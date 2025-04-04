// AI Hustle Framework - Email Writer
class EmailWriter {
  constructor() {
    this.apiKey = localStorage.getItem("openaiApiKey") || "";
    this.form = document.getElementById("emailForm");
    this.resultsContainer = document.getElementById("result");
    this.loadingSpinner = document.getElementById("loading");
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

    // Copy buttons
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("copy-btn")) {
        this.copyToClipboard(e.target.dataset.text);
      }
    });
  }

  loadSavedFormValues() {
    const savedValues = JSON.parse(
      localStorage.getItem("lastEmailFormValues") || "{}"
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
    localStorage.setItem("lastEmailFormValues", JSON.stringify(values));
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
      const email = await this.generateEmail({
        goal: formData.get("goal"),
        audience: formData.get("audience"),
        tone: formData.get("tone"),
        callToAction: formData.get("callToAction"),
        additionalInfo: formData.get("additionalInfo"),
      });

      this.saveFormValues();
      this.displayResult(email);
      this.showSuccess(this.config.success.generated);
    } catch (error) {
      this.showError(error.message || this.config.errors.requestFailed);
    } finally {
      this.showLoading(false);
    }
  }

  async generateEmail(params) {
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
                  "You are an expert email copywriter who creates engaging, persuasive emails.",
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
    return `Create a professional email with the following specifications:

Goal: ${params.goal}
Target Audience: ${params.audience}
Tone: ${params.tone}
Call to Action: ${params.callToAction}

${
  params.additionalInfo
    ? `Additional Information: ${params.additionalInfo}`
    : ""
}

Please format the email with:
1. A compelling subject line
2. An engaging opening
3. Clear, persuasive body content
4. A strong call to action
5. A professional closing

Make the email concise, engaging, and focused on achieving the specified goal.`;
  }

  displayResult(email) {
    this.resultsContainer.innerHTML = `
      <div class="email-card">
        <pre>${email}</pre>
        <div class="email-actions">
          <button class="btn btn-secondary copy-btn" data-text="${email}">
            Copy to Clipboard
          </button>
          <button class="btn btn-primary" onclick="window.print()">
            Print
          </button>
        </div>
      </div>
    `;
    this.resultsContainer.style.display = "block";
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
  }

  hideMessages() {
    this.errorMessage.style.display = "none";
    this.successMessage.style.display = "none";
    this.resultsContainer.style.display = "none";
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new EmailWriter();
});
