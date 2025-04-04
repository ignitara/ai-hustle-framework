// AI Hustle Framework - Lead Magnet Generator
class LeadMagnetGenerator {
  constructor() {
    this.apiKey = localStorage.getItem("openaiApiKey") || "";
    this.form = document.getElementById("leadMagnetForm");
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
      const results = await this.generateLeadMagnets({
        niche: formData.get("niche"),
        audience: formData.get("audience"),
        outcome: formData.get("outcome"),
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

  async generateLeadMagnets(params) {
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
                  "You are an expert lead magnet creator who specializes in creating compelling, benefit-driven titles and descriptions that convert visitors into leads.",
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
    return `I'm creating a lead magnet in the ${params.niche} space. 
The target audience is ${params.audience}, and the lead magnet should help them ${params.outcome}.

Please provide exactly 3 compelling and high-converting lead magnet ideas in the following format:

TITLE: [First Lead Magnet Title]
DESCRIPTION: [1-2 sentence pitch describing the value and benefits]

TITLE: [Second Lead Magnet Title]
DESCRIPTION: [1-2 sentence pitch describing the value and benefits]

TITLE: [Third Lead Magnet Title]
DESCRIPTION: [1-2 sentence pitch describing the value and benefits]`;
  }

  parseResponse(content) {
    const lines = content.split("\n").filter((line) => line.trim());
    const results = [];
    let currentTitle = "";
    let currentDescription = "";

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.toLowerCase().startsWith("title:")) {
        // If we have a complete pair, save it
        if (currentTitle && currentDescription) {
          results.push({
            title: currentTitle,
            description: currentDescription,
          });
        }
        // Start new pair
        currentTitle = trimmedLine.substring(6).trim();
        currentDescription = "";
      } else if (trimmedLine.toLowerCase().startsWith("description:")) {
        currentDescription = trimmedLine.substring(12).trim();
      } else if (currentDescription && trimmedLine) {
        // Append to existing description for multi-line descriptions
        currentDescription += " " + trimmedLine;
      }
    }

    // Don't forget to add the last pair
    if (currentTitle && currentDescription) {
      results.push({ title: currentTitle, description: currentDescription });
    }

    return {
      titles: results.map((r) => r.title),
      descriptions: results.map((r) => r.description),
    };
  }

  displayResults(results) {
    const { titles, descriptions } = results;

    this.resultsContainer.innerHTML = titles
      .map(
        (title, index) => `
        <div class="magnet-card">
          <h3>Lead Magnet</h3>
          <div class="title">${title}</div>
          <div class="description">${descriptions[index]}</div>
          <div class="magnet-actions">
            <button class="btn btn-secondary copy-btn" data-text="${title}">
              Copy Title
            </button>
            <button class="btn btn-secondary copy-btn" data-text="${descriptions[index]}">
              Copy Description
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
  new LeadMagnetGenerator();
});
