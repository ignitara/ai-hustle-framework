// AI Hustle Framework - Landing Page Writer
class LandingPageWriter {
  constructor() {
    this.apiKey = localStorage.getItem("openaiApiKey") || "";
    this.form = document.getElementById("landingPageForm");
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

    // Copy buttons
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("copy-btn")) {
        this.copyToClipboard(e.target.dataset.text);
      }
    });
  }

  loadSavedFormValues() {
    const savedValues = JSON.parse(
      localStorage.getItem("landingPageFormValues") || "{}"
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
    localStorage.setItem("landingPageFormValues", JSON.stringify(values));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.apiKey) {
      this.showError(this.config.errors.missingApiKey);
      return;
    }

    const formData = new FormData(this.form);
    const offer = formData.get("offer").trim();
    const audience = formData.get("audience").trim();
    const result = formData.get("result").trim();
    const cta = formData.get("cta").trim();

    if (!offer) {
      this.showError(this.config.errors.missingOffer);
      return;
    }
    if (!audience) {
      this.showError(this.config.errors.missingAudience);
      return;
    }
    if (!result) {
      this.showError(this.config.errors.missingResult);
      return;
    }
    if (!cta) {
      this.showError(this.config.errors.missingCta);
      return;
    }

    this.showLoading(true);
    this.hideMessages();

    try {
      const copy = await this.generateCopy({
        offer,
        audience,
        result,
        cta,
      });

      this.saveFormValues();
      this.displayResults(copy);
      this.showSuccess(this.config.success.generated);
    } catch (error) {
      console.error("Error generating copy:", error);
      this.showError(error.message || this.config.errors.requestFailed);
    } finally {
      this.showLoading(false);
    }
  }

  async generateCopy(params) {
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
                  "You are an expert copywriter who specializes in creating high-converting landing page copy.",
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
      return this.parseResponse(data.choices[0].message.content);
    } catch (error) {
      if (error.message === this.config.errors.invalidApiKey) {
        throw error;
      }
      throw new Error(this.config.errors.networkError);
    }
  }

  createPrompt(params) {
    return `You're helping someone write landing page copy.

They are offering: ${params.offer}
Their audience is: ${params.audience}
The outcome they help people achieve is: ${params.result}
The action they want visitors to take is: ${params.cta}

Please generate:
1. A strong headline
2. A supporting subheadline
3. 3 bullet points that highlight the key benefits or features
4. A CTA block with button text and short persuasive copy

Format your response exactly like this:

HEADLINE: [Your headline here]
SUBHEADLINE: [Your subheadline here]
BULLET_1: [First bullet point]
BULLET_2: [Second bullet point]
BULLET_3: [Third bullet point]
CTA_BUTTON: [Button text]
CTA_COPY: [Persuasive copy before the button]`;
  }

  parseResponse(content) {
    const lines = content.split("\n").filter((line) => line.trim());
    const results = {
      headline: "",
      subheadline: "",
      bullets: [],
      ctaButton: "",
      ctaCopy: "",
    };

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("HEADLINE:")) {
        results.headline = trimmedLine
          .substring(trimmedLine.indexOf(":") + 1)
          .trim();
      } else if (trimmedLine.startsWith("SUBHEADLINE:")) {
        results.subheadline = trimmedLine
          .substring(trimmedLine.indexOf(":") + 1)
          .trim();
      } else if (trimmedLine.startsWith("BULLET_")) {
        const bullet = trimmedLine
          .substring(trimmedLine.indexOf(":") + 1)
          .trim();
        results.bullets.push(bullet);
      } else if (trimmedLine.startsWith("CTA_BUTTON:")) {
        results.ctaButton = trimmedLine
          .substring(trimmedLine.indexOf(":") + 1)
          .trim();
      } else if (trimmedLine.startsWith("CTA_COPY:")) {
        results.ctaCopy = trimmedLine
          .substring(trimmedLine.indexOf(":") + 1)
          .trim();
      }
    }

    return results;
  }

  displayResults(copy) {
    this.resultsContainer.innerHTML = `
      <div class="copy-section">
        <h3>${this.config.sections.headline}</h3>
        <div class="content">${this.escapeHtml(copy.headline)}</div>
        <div class="section-actions">
          <button class="btn btn-secondary copy-btn" data-text="${this.escapeHtml(
            copy.headline
          )}">
            ${this.config.buttons.copy}
          </button>
        </div>
      </div>

      <div class="copy-section">
        <h3>${this.config.sections.subheadline}</h3>
        <div class="content">${this.escapeHtml(copy.subheadline)}</div>
        <div class="section-actions">
          <button class="btn btn-secondary copy-btn" data-text="${this.escapeHtml(
            copy.subheadline
          )}">
            ${this.config.buttons.copy}
          </button>
        </div>
      </div>

      <div class="copy-section">
        <h3>${this.config.sections.bullets}</h3>
        <ul class="bullets-list">
          ${copy.bullets
            .map(
              (bullet) => `
            <li>${this.escapeHtml(bullet)}</li>
          `
            )
            .join("")}
        </ul>
        <div class="section-actions">
          <button class="btn btn-secondary copy-btn" data-text="${this.escapeHtml(
            copy.bullets.join("\n")
          )}">
            ${this.config.buttons.copy}
          </button>
        </div>
      </div>

      <div class="copy-section">
        <h3>${this.config.sections.ctaBlock}</h3>
        <div class="cta-block">
          <div class="content">${this.escapeHtml(copy.ctaCopy)}</div>
          <div class="button-text">${this.escapeHtml(copy.ctaButton)}</div>
        </div>
        <div class="section-actions">
          <button class="btn btn-secondary copy-btn" data-text="${this.escapeHtml(
            `${copy.ctaCopy}\n\nButton Text: ${copy.ctaButton}`
          )}">
            ${this.config.buttons.copy}
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
  new LandingPageWriter();
});
