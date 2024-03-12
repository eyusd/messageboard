import moment from "moment";
import React from "react";

export interface MessageProps extends React.ComponentPropsWithoutRef<"div"> {
  timestamp: string;
  username: string;
  textContent: string;
}

export default function Message({ timestamp, username, textContent }: MessageProps) {

  const timeAgo = moment(timestamp).fromNow();
  const avatar = `https://avatar.vercel.sh/${username}`;

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
          <div className="font-semibold">Sarah Day</div>
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
