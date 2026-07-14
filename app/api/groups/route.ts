import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const groups = db
        .prepare(`
            SELECT id, name
            FROM groups
            ORDER BY id
        `)
        .all();

    return NextResponse.json(groups);
}