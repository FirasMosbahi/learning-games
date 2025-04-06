import { Message } from "@learning-game/types/message";

export default function ChatMessage({
  message,
  user,
}: {
  message: Message;
  user: string;
}) {
  return (
    <div className={`${user === message.sender ? "ml-8" : "mr-8"} text-black`}>
      <div
        className={`${user === message.sender ? "flex-row" : "flex-row-reverse"} flex gap-8`}
      >
        <div className="flex-1">
          <p
            className={`${user === message.sender ? "bg-blue-400 text-white" : "bg-gray-400 text-black"}  text-right px-4 border border-transparent rounded-xl`}
          >
            {message.text}
          </p>
          <p
            className={`${user === message.sender ? "text-left" : "text-right"} text-xs`}
          >
            {message.time}
          </p>
        </div>
        <p>{message.sender} </p>
      </div>
    </div>
  );
}
