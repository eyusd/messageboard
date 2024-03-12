"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Message, { MessageProps } from "./message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  textContent: z.string().min(1, {
    message: "Message must be at least 1 character.",
  }),
});

export default function DialogBox() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "John Doe",
      textContent: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await fetch("/api/msg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })
      .then(() => {
        form.reset({
          username: form.getValues().username,
          textContent: "",
        });
      })
      .catch(() => {
        form.setError("textContent", { message: "Something wrong happened" });
      });
  }

  const [messages, setMessages] = React.useState<MessageProps[]>([]);

  //fetch messages every second

  useEffect(() => {
    const id = setInterval(() => {
      fetch("/api/msg", { cache: "no-store" })
        .then((result) => result.json())
        .then((messages) => {
          setMessages(messages);
        })
        .catch(() => {
          console.error("Something wrong happened");
        });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-[600px] max-w-sm rounded-lg border">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="h-full grid gap-4 p-6">
            {messages &&
              messages.map((message, key) => (
                <Message key={key} {...message} />
              ))}
          </div>
        </ScrollArea>
      </div>
      <div className="border-t p-4">
        <Form {...form}>
          <form className="flex w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="textContent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="flex-1"
                      placeholder="Write your message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-4 flex-col ml-4">
              <Button type="submit">Send</Button>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger>
                      <img
                        alt={form.getValues().username}
                        className="rounded-full"
                        height={20}
                        src={`https://avatar.vercel.sh/${
                          form.getValues().username
                        }`}
                        style={{
                          aspectRatio: "20/20",
                          objectFit: "cover",
                        }}
                        width={20}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
