import { NextResponse } from "next/server";
import drugsData from "@/app/api/data/mock-drugs.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");

    if (isNaN(limit) || isNaN(offset)) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    let filteredData = drugsData;
    if (filter) {
      filteredData = filteredData.filter(
        (drug) => drug.status.toLowerCase() === filter.toLowerCase()
      );
    }

    if (search) {
      filteredData = filteredData.filter((drug) =>
        drug.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Paginate the filtered data
    const paginatedData = filteredData.slice(offset, offset + limit);

    return NextResponse.json(
      {
        data: paginatedData,
        total: filteredData.length,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching drug data:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
