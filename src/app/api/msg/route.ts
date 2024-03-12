import { NextRequest, NextResponse } from "next/server";
import { get, getSessionIdAndCreateIfMissing, set } from '@/lib/messageStore';

export async function GET(req: NextRequest) {
  const sessionId = getSessionIdAndCreateIfMissing();

  const indexTry = req.nextUrl.searchParams.get("index");
  if (indexTry) {
    try {
      const index = parseInt(indexTry);

      const messages = await get("messages")
      .then((messages) => messages as any[] ?? [])
      .then(unformatted => unformatted.map(
        (item) => ({ ...item, isMine: item.sessionId === sessionId })
      ));

      if (messages.length > index) {
        return NextResponse.json(messages[index], { status: 200 });
      } else {
        return NextResponse.json("Index does not exist", { status: 400 });
      }
    } catch {
      return NextResponse.json("Invalid request body", { status: 400 });
    }
  }

  const messages = await get("messages")
  .then((messages) => messages as any[] ?? [])
  .then(unformatted => unformatted.map(
    (item) => ({ ...item, isMine: item.sessionId === sessionId })
  ));

  return NextResponse.json(messages, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { username, textContent } = await req.json();

  if (typeof username !== "string" || typeof textContent !== "string") {
    return NextResponse.json("Invalid request body", { status: 400 });
  }

  const messages = await get("messages")
    .then((messages) => messages ?? [])
    .catch((e) => {
      console.log(e);
      return []
    })

  const sessionId = getSessionIdAndCreateIfMissing();
  
  const newMessage = {
    username,
    textContent,
    sessionId,
    timestamp: new Date().toISOString(),
  };

  const newMessages = [...messages, newMessage];
  await set("messages", JSON.stringify(newMessages));

  return NextResponse.json("ok", { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const indexTry = req.nextUrl.searchParams.get("index");

  if (typeof indexTry !== "string") {
    return NextResponse.json("Invalid request body", { status: 400 });
  }

  try {
    const index = parseInt(indexTry);

    const messages = await get("messages")
    .then((messages) => messages ?? [])

    if (messages.length > index) {
      
      const newMessages = messages.filter((_: any, i: number) => i !== index);
      await set("messages", JSON.stringify(newMessages));

      return NextResponse.json("ok", { status: 200 });
    } else {
      return NextResponse.json("Index does not exist", { status: 400 });
    }
  } catch {
    return NextResponse.json("Invalid request body", { status: 400 });
  }
}