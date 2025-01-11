import { NextResponse } from "next/server";
import { testConnection } from "@/app/utils/testConnection";

export async function GET() {
    const result = await testConnection();
    return NextResponse.json(result);
}
