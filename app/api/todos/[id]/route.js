import { NextResponse } from "next/server";
import { todos } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const updated = todos.update(Number(id), {
    title: typeof body.title === "string" ? body.title.trim() || undefined : undefined,
    done: typeof body.done === "boolean" ? body.done : undefined,
  });

  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  if (!todos.remove(Number(id))) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
