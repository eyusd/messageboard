"use client";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import moment from "moment";
import React from "react";

export interface MessageProps extends React.ComponentPropsWithoutRef<"div"> {
  timestamp: string;
  username: string;
  textContent: string;
  isMine: boolean;
  index: number;
}

export default function Message({
  timestamp,
  username,
  textContent,
  isMine,
  index,
}: MessageProps) {
  const timeAgo = moment(timestamp).fromNow();
  const avatar = `https://avatar.vercel.sh/${username}`;

  const handleDelete = async () => {
    await fetch(`/api/msg?index=${index}`, {
      method: "DELETE",
      cache: "no-store",
    })
  }

  if (isMine) {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex justify-end items-center space-x-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="font-semibold">You</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {timeAgo}
              </div>
            </div>
            <div className="rounded-xl p-4 bg-green-100 dark:bg-gray-800">
              {textContent}
            </div>
          </div>
          <img
            alt={username}
            className="rounded-full"
            height={40}
            src={avatar}
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width={40}
          />
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={handleDelete}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  } else {
    return (
      <div className="flex items-center space-x-4">
        <img
          alt={username}
          className="rounded-full"
          height={40}
          src={avatar}
          style={{
            aspectRatio: "40/40",
            objectFit: "cover",
          }}
          width={40}
        />
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <div className="font-semibold">{username}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {timeAgo}
            </div>
          </div>
          <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-800">
            {textContent}
          </div>
        </div>
      </div>
    );
  }
}
