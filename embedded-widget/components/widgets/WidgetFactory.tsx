"use client";

import React from "react";
import { useWidget } from "@/lib/context/widget-context";
import ChatWidget from "./ChatWidget";
import PaymentWidget from "./PaymentWidget";
import FeedbackWidget from "./FeedbackWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WidgetFactory() {
  const { widgetType, isAuthenticated, isLoading, error, initialize } =
    useWidget();

  // Error state
  if (error) {
    return (
      <Card className="w-full max-w-md border shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="my-4 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Widget Error</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button
            onClick={() => initialize("test_key_123", "chat")}
            className="mt-2"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full max-w-md border shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="my-8 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
          </div>
          <p className="text-muted-foreground">Loading widget...</p>
        </CardContent>
      </Card>
    );
  }

  // Not authenticated state
  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-md border shadow-lg">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Widget Not Initialized</h3>
          <p className="text-muted-foreground mb-4">
            This widget has not been initialized with a valid API key.
          </p>
          <div className="flex justify-center space-x-2">
            <Button
              onClick={() => initialize("test_key_123", "chat")}
              className="mt-2"
            >
              Init Chat Widget
            </Button>
            <Button
              onClick={() => initialize("test_key_123", "payment")}
              className="mt-2"
            >
              Init Payment Widget
            </Button>
            <Button
              onClick={() => initialize("test_key_123", "feedback")}
              className="mt-2"
            >
              Init Feedback Widget
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render the appropriate widget based on the widget type
  switch (widgetType) {
    case "chat":
      return <ChatWidget />;
    case "payment":
      return <PaymentWidget />;
    case "feedback":
      return <FeedbackWidget />;
    default:
      return (
        <div className="text-center p-4">
          <p>Unknown widget type: {widgetType}</p>
        </div>
      );
  }
}
