// AI Hustle Framework - Review Responder
class ReviewResponder {
  constructor() {
    this.apiKey = localStorage.getItem("openaiApiKey") || "";
    this.form = document.getElementById("reviewForm");
    this.resultsContainer = document.getElementById("resultsContainer");
    this.loadingSpinner = document.getElementById("loadingSpinner");
    this.errorMessage = document.getElementById("errorMessage");
    this.successMessage = document.getElementById("successMessage");
    this.toneSelector = document.getElementById("toneSelector");
    this.selectedTone = "professional";

    // Use local config
    this.config = window.config;

    this.initializeEventListeners();
    this.loadSavedFormValues();
  }

  initializeEventListeners() {
    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Tone selection
    this.toneSelector.addEventListener("click", (e) =>
      this.handleToneSelection(e)
    );

    // Copy buttons
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("copy-btn")) {
        this.copyToClipboard(e.target.dataset.text);
      }
    });
  }

  handleToneSelection(e) {
    const toneOption = e.target.closest(".tone-option");
    if (!toneOption) return;

    this.toneSelector.querySelectorAll(".tone-option").forEach((option) => {
      option.classList.remove("selected");
    });

    toneOption.classList.add("selected");
    this.selectedTone = toneOption.dataset.tone;
    this.saveFormValues();
  }

  loadSavedFormValues() {
    const savedValues = JSON.parse(
      localStorage.getItem("reviewResponderFormValues") || "{}"
    );
    Object.keys(savedValues).forEach((key) => {
      const input = document.getElementById(key);
      if (input) {
        input.value = savedValues[key];
      }
    });
    if (savedValues.selectedTone) {
      const toneOption = this.toneSelector.querySelector(
        `[data-tone="${savedValues.selectedTone}"]`
      );
      if (toneOption) {
        this.toneSelector.querySelectorAll(".tone-option").forEach((option) => {
          option.classList.toggle("selected", option === toneOption);
        });
        this.selectedTone = savedValues.selectedTone;
      }
    }
  }

  saveFormValues() {
    const formValues = {
      businessType: document.getElementById("businessType").value,
      reviewText: document.getElementById("reviewText").value,
      selectedTone: this.selectedTone,
    };
    localStorage.setItem(
      "reviewResponderFormValues",
      JSON.stringify(formValues)
    );
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.apiKey) {
      this.showError(this.config.errors.missingApiKey);
      return;
    }

    const businessType = document.getElementById("businessType").value.trim();
    const reviewText = document.getElementById("reviewText").value.trim();

    if (!businessType) {
      this.showError(this.config.errors.missingBusinessType);
      return;
    }
    if (!reviewText) {
      this.showError(this.config.errors.missingReview);
      return;
    }

    this.showLoading(true);
    this.hideMessages();

    try {
      const response = await this.generateResponse(businessType, reviewText);
      this.saveFormValues();
      this.displayResults(reviewText, response);
      this.showSuccess(this.config.success.generated);
    } catch (error) {
      console.error("Error generating response:", error);
      this.showError(error.message || this.config.errors.requestFailed);
    } finally {
      this.showLoading(false);
    }
  }

  async generateResponse(businessType, reviewText) {
    const prompt = this.createPrompt(businessType, reviewText);

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
                  "You are an expert in customer service and review response management, skilled at crafting professional and appropriate responses to customer reviews.",
              },
              { role: "user", content: prompt },
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

  createPrompt(businessType, reviewText) {
    return `As a ${businessType}, craft a ${this.selectedTone} response to this customer review:

Review: "${reviewText}"

Please provide a thoughtful, ${this.selectedTone} response that:
- Acknowledges the customer's feedback
- Shows appreciation for their time
- Addresses any concerns or issues mentioned
- Maintains a professional and constructive tone
- Demonstrates commitment to customer satisfaction

Response:`;
  }

  displayResults(reviewText, response) {
    this.resultsContainer.innerHTML = `
      <div class="response-card">
        <h3>Generated Response</h3>
        <div class="review-text">${this.escapeHtml(reviewText)}</div>
        <div class="response-text">${this.escapeHtml(response)}</div>
        <div class="card-actions">
          <button class="btn btn-secondary copy-btn" data-text="${this.escapeHtml(
            response
          )}">
            Copy Response
          </button>
        </div>
      </div>
    `;
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showSuccess(this.config.success.copied);
    } catch (error) {
      this.showError(this.config.errors.copyFailed);
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  showLoading(show) {
    this.loadingSpinner.classList.toggle("active", show);
    this.form.querySelector('button[type="submit"]').disabled = show;
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = "block";
    this.errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  showSuccess(message) {
    this.successMessage.textContent = message;
    this.successMessage.style.display = "block";
  }

  hideMessages() {
    this.errorMessage.style.display = "none";
    this.successMessage.style.display = "none";
    this.resultsContainer.innerHTML = "";
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ReviewResponder();
});
