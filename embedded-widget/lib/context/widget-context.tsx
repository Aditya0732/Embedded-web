"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

// Define widget types
export type WidgetType = "chat" | "payment" | "feedback";
export type WidgetTheme = "light" | "dark" | "system";

interface WidgetContextType {
  apiKey: string | null;
  widgetType: WidgetType;
  theme: WidgetTheme;
  customization: Record<string, string>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialize: (
    apiKey: string,
    widgetType: WidgetType,
    theme?: WidgetTheme,
    customization?: Record<string, string>
  ) => Promise<void>;
}

const defaultContext: WidgetContextType = {
  apiKey: null,
  widgetType: "chat",
  theme: "system",
  customization: {},
  isAuthenticated: false,
  isLoading: false,
  error: null,
  initialize: async () => {},
};

const WidgetContext = createContext<WidgetContextType>(defaultContext);

export const useWidget = () => useContext(WidgetContext);

export const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [widgetType, setWidgetType] = useState<WidgetType>("chat");
  const [theme, setTheme] = useState<WidgetTheme>("system");
  const [customization, setCustomization] = useState<Record<string, string>>(
    {}
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializingRef = useRef(false);

  // Initialize the widget
  const initialize = async (
    key: string,
    type: WidgetType,
    themeOption: WidgetTheme = "system",
    customOptions: Record<string, string> = {}
  ) => {
    // Prevent multiple concurrent initialization attempts
    if (initializingRef.current) return;

    initializingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // For testing purposes, we're accepting hardcoded API keys
      if (key === "test_key_123" || key === "live_key_456") {
        setApiKey(key);
        setWidgetType(type);
        setTheme(themeOption);
        setCustomization(customOptions);
        setIsAuthenticated(true);

        // In a real app, you would make an API call here
        // const response = await fetch('/api/v1/widget', { ... })
      } else {
        throw new Error("Invalid API key");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
      initializingRef.current = false;
    }
  };

  return (
    <WidgetContext.Provider
      value={{
        apiKey,
        widgetType,
        theme,
        customization,
        isAuthenticated,
        isLoading,
        error,
        initialize,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};
