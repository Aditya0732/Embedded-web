/**
 * Embedded Widget System
 * Use this script to embed widgets in your website.
 */

(function () {
  // Widget base URL (would be your production domain in a real app)
  const WIDGET_BASE_URL = "http://localhost:3000";

  // Widget types
  const WIDGET_TYPES = ["chat", "payment", "feedback"];

  // Widget themes
  const WIDGET_THEMES = ["light", "dark", "system"];

  /**
   * Widget class
   */
  class EmbeddedWidget {
    constructor(config) {
      this.apiKey = config.apiKey;
      this.type = config.type || "chat";
      this.target = config.target;
      this.theme = config.theme || "system";
      this.customization = config.customization || {};
      this.iframe = null;

      // Validate configuration
      this.validateConfig();

      // Initialize the widget
      this.init();
    }

    validateConfig() {
      // Check if API key is provided
      if (!this.apiKey) {
        throw new Error("API key is required");
      }

      // Check if target element exists
      if (!this.target) {
        throw new Error("Target element selector is required");
      }

      // Check if widget type is valid
      if (!WIDGET_TYPES.includes(this.type)) {
        throw new Error(
          `Invalid widget type: ${
            this.type
          }. Supported types: ${WIDGET_TYPES.join(", ")}`
        );
      }

      // Check if theme is valid
      if (!WIDGET_THEMES.includes(this.theme)) {
        throw new Error(
          `Invalid theme: ${this.theme}. Supported themes: ${WIDGET_THEMES.join(
            ", "
          )}`
        );
      }
    }

    init() {
      try {
        // Find target element
        const targetElement = document.querySelector(this.target);
        if (!targetElement) {
          throw new Error(`Target element not found: ${this.target}`);
        }

        // Create iframe
        this.iframe = document.createElement("iframe");
        this.iframe.style.width = "100%";
        this.iframe.style.height = "450px";
        this.iframe.style.border = "none";
        this.iframe.style.borderRadius = "8px";
        this.iframe.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        this.iframe.allow = "payment; microphone; camera";

        // Set iframe src with widget config
        const widgetParams = new URLSearchParams({
          api_key: this.apiKey,
          type: this.type,
          theme: this.theme,
          ...this.customization,
        });

        this.iframe.src = `${WIDGET_BASE_URL}/widget?${widgetParams.toString()}`;

        // Append iframe to target element
        targetElement.appendChild(this.iframe);

        // Setup message listeners for cross-frame communication
        this.setupMessageListeners();
      } catch (error) {
        console.error("Failed to initialize widget:", error);
        this.renderError(error.message);
      }
    }

    setupMessageListeners() {
      window.addEventListener("message", (event) => {
        // Make sure the message is from our widget iframe
        if (event.source !== this.iframe.contentWindow) return;

        const { type, data } = event.data;

        switch (type) {
          case "WIDGET_READY":
            console.log("Widget is ready");
            this.sendMessage("WIDGET_INIT", {
              apiKey: this.apiKey,
              type: this.type,
              theme: this.theme,
              customization: this.customization,
            });
            break;

          case "WIDGET_HEIGHT":
            if (data && data.height) {
              this.iframe.style.height = `${data.height}px`;
            }
            break;

          case "WIDGET_EVENT":
            // Trigger custom event for parent page
            const widgetEvent = new CustomEvent("widget:event", {
              detail: data,
            });
            window.dispatchEvent(widgetEvent);
            break;

          default:
            break;
        }
      });
    }

    sendMessage(type, data) {
      if (!this.iframe || !this.iframe.contentWindow) return;

      this.iframe.contentWindow.postMessage(
        {
          type,
          data,
        },
        "*"
      );
    }

    renderError(message) {
      const targetElement = document.querySelector(this.target);
      if (!targetElement) return;

      targetElement.innerHTML = `
        <div style="border: 1px solid #f1aeb5; border-radius: 8px; padding: 16px; background-color: #f8d7da; color: #58151c;">
          <h3 style="margin-top: 0; margin-bottom: 8px;">Widget Error</h3>
          <p style="margin: 0;">${message}</p>
        </div>
      `;
    }
  }

  // Initialize the global object
  window.EmbeddedWidget = {
    initialize: function (config) {
      return new EmbeddedWidget(config);
    },
  };
})();
