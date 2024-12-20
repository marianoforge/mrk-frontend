import { NextResponse } from "next/server";
import drugsData from "@/app/api/data/mock-drugs.json";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const drug = drugsData.find((drug) => drug.id === id);

  if (!drug) {
    return NextResponse.json({ error: "Drug not found" }, { status: 404 });
  }

  return NextResponse.json(drug, { status: 200 });
}
