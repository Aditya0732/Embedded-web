"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import WidgetFactory from "@/components/widgets/WidgetFactory";
import { useWidget } from "@/lib/context/widget-context";
import { WidgetType, WidgetTheme } from "@/lib/context/widget-context";

export default function WidgetPage() {
  const searchParams = useSearchParams();
  const { initialize } = useWidget();
  const hasInitializedRef = useRef(false);

  // Extract configuration from URL params
  useEffect(() => {
    if (hasInitializedRef.current) return;

    const apiKey = searchParams.get("api_key");
    const widgetType = (searchParams.get("type") as WidgetType) || "chat";
    const theme = (searchParams.get("theme") as WidgetTheme) || "system";

    // Get customization options
    const customization: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (!["api_key", "type", "theme"].includes(key)) {
        customization[key] = value;
      }
    });

    if (apiKey) {
      hasInitializedRef.current = true;
      // Initialize widget
      initialize(apiKey, widgetType, theme, customization)
        .then(() => {
          // Widget is now initialized
          if (window.parent !== window) {
            window.parent.postMessage({ type: "WIDGET_READY" }, "*");
          }
        })
        .catch((err) => console.error("Failed to initialize widget:", err));
    }

    // Setup cross-origin communication
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === "WIDGET_INIT") {
        if (hasInitializedRef.current) return;

        const { apiKey, type, theme, customization } = event.data.data;

        if (apiKey) {
          hasInitializedRef.current = true;
          initialize(
            apiKey,
            type as WidgetType,
            theme as WidgetTheme,
            customization
          )
            .then(() => {
              // Notify parent that widget is initialized
              window.parent.postMessage({ type: "WIDGET_READY" }, "*");
            })
            .catch((err) => console.error("Failed to initialize widget:", err));
        }
      }
    }

    window.addEventListener("message", handleMessage);

    // Let parent know widget is loaded
    if (window.parent !== window) {
      window.parent.postMessage({ type: "WIDGET_LOADED" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [initialize, searchParams]);

  return (
    <div className="p-4 md:p-0">
      <WidgetFactory />
    </div>
  );
}
