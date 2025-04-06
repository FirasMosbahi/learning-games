import { NextRequest, NextResponse } from "next/server";
import { Message } from "@learning-game/types/message";

// In-memory message store (resets on each function invocation in serverless)
let messages: Message[] = [];

export async function GET() {
  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest) {
  try {
    const { text, sender } = await req.json();
    if (!text || !sender) {
      return NextResponse.json(
        { error: "Missing text or sender" },
        { status: 400 },
      );
    }

    const newMessage: Message = {
      text,
      sender,
      time: new Date().toLocaleTimeString(),
    };
    messages.push(newMessage);

    return NextResponse.json({ status: "Message added", messages });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 },
    );
  }
}

// Optional: Clear messages (for testing)
export async function DELETE() {
  messages = [];
  return NextResponse.json({ status: "Messages cleared" });
}
