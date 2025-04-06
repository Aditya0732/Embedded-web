"use client";

import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useWidget } from "@/lib/context/widget-context";

type Message = {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: Date;
};

export default function ChatWidget() {
  const { customization } = useWidget();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        customization.welcomeMessage || "Hello! How can I help you today?",
      sender: "system",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Add system response
      const systemResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your message. Our team will get back to you soon!",
        sender: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, systemResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md h-[400px] border shadow-lg">
      <CardHeader className="bg-primary/5 border-b p-3">
        <CardTitle className="text-lg font-medium">
          {customization.chatTitle || "Customer Support"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 overflow-y-auto h-[300px] flex flex-col space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start gap-2 max-w-[80%]">
              {message.sender === "system" && (
                <Avatar className="h-8 w-8 bg-primary-foreground border">
                  <span className="text-xs font-semibold">AI</span>
                </Avatar>
              )}
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 bg-secondary">
                  <span className="text-xs font-semibold">You</span>
                </Avatar>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2">
            <Avatar className="h-8 w-8 bg-primary-foreground border">
              <span className="text-xs font-semibold">AI</span>
            </Avatar>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isLoading}
          >
            <IoSendSharp className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
