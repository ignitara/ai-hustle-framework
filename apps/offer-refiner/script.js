// AI Hustle Framework - Offer Refiner
class OfferRefiner {
  constructor() {
    this.apiKey = localStorage.getItem("openaiApiKey") || "";
    this.form = document.getElementById("offerForm");
    this.resultsContainer = document.getElementById("resultsContainer");
    this.loadingSpinner = document.getElementById("loadingSpinner");
    this.errorMessage = document.getElementById("errorMessage");
    this.successMessage = document.getElementById("successMessage");

    // Use local config
    this.config = window.config;

    // Clear any saved form values
    localStorage.removeItem("lastFormValues");

    this.initializeEventListeners();
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
      const results = await this.generateOffer({
        product: formData.get("product"),
        audience: formData.get("audience"),
        transformation: formData.get("transformation"),
        objections: formData.get("objections"),
      });

      this.saveFormValues();
      this.displayResults(results);
      this.showSuccess(this.config.success.generated);
    } catch (error) {
      this.showError(error.message || this.config.errors.requestFailed);
    } finally {
      this.showLoading(false);
    }
  }

  async generateOffer(params) {
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
                  "You are an expert copywriter and offer strategist who helps businesses create clear, compelling offers and marketing hooks.",
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
      return this.parseResponse(data.choices[0].message.content);
    } catch (error) {
      if (error.message === this.config.errors.invalidApiKey) {
        throw error;
      }
      throw new Error(this.config.errors.networkError);
    }
  }

  createPrompt(params) {
    return `I help people write better offers. Here's the context:

What they're selling: ${params.product}
Who it's for: ${params.audience}
What transformation they deliver: ${params.transformation}
Objections the audience might have: ${params.objections}

Please provide your response in exactly this format:

OFFER_STATEMENT: [Write a clear, benefit-driven offer statement that combines what they're selling, who it's for, and the transformation]

HOOK_1: [Write first attention-grabbing marketing hook]
HOOK_2: [Write second attention-grabbing marketing hook]
HOOK_3: [Write third attention-grabbing marketing hook]`;
  }

  parseResponse(content) {
    const lines = content.split("\n").filter((line) => line.trim());
    let offerStatement = "";
    const hooks = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.toLowerCase().startsWith("offer_statement:")) {
        offerStatement = trimmedLine
          .substring(trimmedLine.indexOf(":") + 1)
          .trim();
      } else if (trimmedLine.toLowerCase().startsWith("hook_")) {
        const hook = trimmedLine.substring(trimmedLine.indexOf(":") + 1).trim();
        if (hook) {
          hooks.push(hook);
        }
      }
    }

    return {
      offerStatement: offerStatement || "No offer statement generated.",
      hooks: hooks.length ? hooks : ["No hooks generated."],
    };
  }

  displayResults(results) {
    const { offerStatement, hooks } = results;

    this.resultsContainer.innerHTML = `
      <div class="offer-card">
        <h3>Refined Offer Statement</h3>
        <div class="statement">${offerStatement}</div>
        <div class="card-actions">
          <button class="btn btn-secondary copy-btn" data-text="${offerStatement}">
            Copy Offer
          </button>
        </div>
      </div>
      <h3>Marketing Hooks</h3>
      ${hooks
        .map(
          (hook) => `
          <div class="hook-card">
            <div class="hook">${hook}</div>
            <div class="card-actions">
              <button class="btn btn-secondary copy-btn" data-text="${hook}">
                Copy Hook
              </button>
            </div>
          </div>
        `
        )
        .join("")}
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
  new OfferRefiner();
});
