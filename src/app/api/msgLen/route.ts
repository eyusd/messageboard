import { NextResponse } from "next/server";
import { get } from '@/lib/messageStore';

export async function GET() {

  const messages = await get("messages")
  .then((messages) => messages ?? [])

  return NextResponse.json(messages.length, { status: 200 });
}
