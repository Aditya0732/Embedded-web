import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Widget request schema for validation
const widgetRequestSchema = z.object({
  api_key: z.string().min(1, "API key is required"),
  widget_type: z.enum(["chat", "payment", "feedback"]),
  theme: z.enum(["light", "dark", "system"]).optional().default("system"),
  customization: z.record(z.string()).optional(),
});

// Mock API key validation (in a real app, you'd check against a database)
const validateApiKey = (apiKey: string): boolean => {
  const validKeys = ["test_key_123", "live_key_456"];
  return validKeys.includes(apiKey);
};

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    // Validate the request data
    const result = widgetRequestSchema.safeParse(requestData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { api_key, widget_type, theme, customization } = result.data;

    // Validate API key
    if (!validateApiKey(api_key)) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Generate widget configuration
    const widgetConfig = {
      id: `widget_${Date.now()}`,
      type: widget_type,
      theme,
      customization: customization || {},
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      widget: widgetConfig,
      embed_script: `<script src="https://yourdomain.com/widget/${widgetConfig.id}" defer></script>`,
    });
  } catch (error) {
    console.error("Widget API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
