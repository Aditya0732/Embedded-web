import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Get the embed.js script
    const filePath = path.join(process.cwd(), "public", "embed.js");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Set CORS headers to allow embedding from any origin
    const response = new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "public, max-age=3600",
      },
    });

    return response;
  } catch (error) {
    console.error("Error serving embed script:", error);
    return new NextResponse("Error serving embed script", { status: 500 });
  }
}
