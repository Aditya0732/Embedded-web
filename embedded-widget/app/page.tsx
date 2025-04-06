import WidgetFactory from "@/components/widgets/WidgetFactory";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-5xl w-full flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center">
          Embedded Widget System
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          This is an embeddable widget system for web applications. Use it to
          add chat, payment, or feedback functionality to any website with just
          a few lines of code.
        </p>

        <div className="mt-8 w-full max-w-md mx-auto">
          <WidgetFactory />
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4">Integration Guide</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Get your API key</h3>
              <p className="text-muted-foreground">
                Sign up for an account and get your API key from the dashboard.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                2. Add the script to your website
              </h3>
              <pre className="bg-black text-white p-4 rounded-md overflow-x-auto">
                <code>{`<script src="https://widget.example.com/api/embed.js" defer></script>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                3. Initialize the widget
              </h3>
              <pre className="bg-black text-white p-4 rounded-md overflow-x-auto">
                <code>{`<script>
  document.addEventListener('DOMContentLoaded', function() {
    EmbeddedWidget.initialize({
      apiKey: 'your_api_key_here',
      type: 'chat', // or 'payment', 'feedback'
      target: '#widget-container',
      theme: 'light', // or 'dark', 'system'
      customization: {
        // Custom options depending on widget type
        chatTitle: 'Customer Support',
        welcomeMessage: 'How can we help you today?'
      }
    });
  });
</script>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                4. Add a container element
              </h3>
              <pre className="bg-black text-white p-4 rounded-md overflow-x-auto">
                <code>{`<div id="widget-container"></div>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
