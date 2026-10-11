import { NextResponse } from "next/server";
import { todos } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(todos.all());
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  return NextResponse.json(todos.create(title), { status: 201 });
}
