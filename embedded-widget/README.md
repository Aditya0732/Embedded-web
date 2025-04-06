# Embedded Widget System

A modular widget system that can be embedded in any website with a simple API. It provides chat, payment, and feedback functionality that can be easily integrated into parent websites.

## Features

- **Multiple Widget Types**: Chat support, Payment processing, and Feedback collection
- **Easy Integration**: Simple JavaScript API for embedding widgets
- **Customization**: Customize appearance and behavior through configuration
- **Responsive Design**: Works on all device sizes
- **Cross-Origin Support**: Securely communicates across domains
- **Modern UI**: Built with Next.js and shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the widget documentation and demo.

## Integration Guide

### 1. Add the script to your website

```html
<script src="https://your-widget-domain.com/widget/embed" defer></script>
```

### 2. Initialize the widget

```javascript
document.addEventListener("DOMContentLoaded", function () {
  EmbeddedWidget.initialize({
    apiKey: "your_api_key_here",
    type: "chat", // or 'payment', 'feedback'
    target: "#widget-container",
    theme: "light", // or 'dark', 'system'
    customization: {
      // Custom options depending on widget type
      chatTitle: "Customer Support",
      welcomeMessage: "How can we help you today?",
    },
  });
});
```

### 3. Add a container element

```html
<div id="widget-container"></div>
```

## Widget Types

### Chat Widget

A customer support chat interface with real-time messaging.

**Customization options:**

- `chatTitle`: Title of the chat window
- `welcomeMessage`: Initial message from the system

### Payment Widget

A secure payment form for processing transactions.

**Customization options:**

- `paymentTitle`: Title of the payment form
- `amount`: Payment amount (e.g., "25.00")

### Feedback Widget

A feedback form with rating system and comments.

**Customization options:**

- `feedbackTitle`: Title of the feedback form

## Events

Listen for widget events using the custom event system:

```javascript
window.addEventListener("widget:event", function (e) {
  console.log("Widget event:", e.detail);

  // Handle specific events
  if (e.detail.type === "payment_complete") {
    // Handle payment completion
  }
});
```

## Demo Websites

The repository includes three demo parent websites that showcase different widget integrations:

1. **E-commerce Site**: Demonstrates the chat widget for customer support
2. **Finance App**: Shows the payment widget for processing transactions
3. **SaaS Dashboard**: Implements the feedback widget for user feedback collection

To view the demos, open the HTML files in the `parent-websites` directory in your browser.

## License

MIT
