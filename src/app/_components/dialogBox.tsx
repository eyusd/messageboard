"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message, { MessageProps } from "./message";
import { Textarea } from "@/components/ui/textarea";

export default function DialogBox() {
  
  const [messages, setMessages] = React.useState<MessageProps[]>([
    {
      timestamp: "2021-08-27T14:00:00.000Z",
      username: "Sarah Day",
      textContent: "Hey, how are you doing?",
    },
    {
      timestamp: "2021-08-27T14:00:00.000Z",
      username: "Sarah Day",
      textContent: "Hey, how are you doing?",
    },
    {
      timestamp: "2021-08-27T14:00:00.000Z",
      username: "Sarah Day",
      textContent: "Hey, how are you doing?",
    },
    {
      timestamp: "2021-08-27T14:00:00.000Z",
      username: "Sarah Day",
      textContent: "Hey, how are you doing?",
    },
    {
      timestamp: "2021-08-27T14:00:00.000Z",
      username: "Sarah Day",
      textContent: "Hey, how are you doing?",
    },
    {
      timestamp: "2021-08-27T14:00:00.000Z",
      username: "Sarah Day",
      textContent: "Hey, how are you doing?",
    }
  ]);

  return (
    <div className="flex flex-col h-[600px] max-w-sm rounded-lg border">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="h-full grid gap-4 p-6">
            {messages.map((message, key) => (
              <Message key={key} {...message} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="border-t p-4">
        <form className="flex w-full">
          <Textarea className="flex-1" placeholder="Type a message" />
          <Button className="ml-4" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}