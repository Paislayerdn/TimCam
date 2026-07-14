import { NextResponse } from "next/server";
import db from "@/lib/db";


export async function GET() {
    const members = db
        .prepare(`
            SELECT
                members.id,
                members.name,
                groups.name AS "group"
            FROM members
            JOIN groups
            ON members.group_id = groups.id
        `)
        .all();

    return NextResponse.json(members);
}


export async function POST(request: Request) {
    const body = await request.json();

    const name = body.name;
    const group_id = body.group_id;


    if (!name || !group_id) {
        return NextResponse.json(
            { error: "Missing data" },
            { status: 400 }
        );
    }


    const result = db
        .prepare(`
            INSERT INTO members
            (name, group_id)
            VALUES (?, ?)
        `)
        .run(
            name,
            group_id
        );


    const insertedMember = db
        .prepare(`
            SELECT
                members.id,
                members.name,
                groups.name AS "group"
            FROM members
            JOIN groups
            ON members.group_id = groups.id
            WHERE members.id = ?
        `)
        .get(Number(result.lastInsertRowid));


    return NextResponse.json(insertedMember);
}

export async function DELETE(request: Request) {
    const body = await request.json();

    const id = body.id;


    db.prepare(`
        DELETE FROM members
        WHERE id = ?
    `)
    .run(id);


    return NextResponse.json({
        success: true
    });
}

export async function PUT(request: Request) {
    const body = await request.json();

    const id = body.id;
    const name = body.name;
    const group_id = body.group_id;


    db.prepare(`
        UPDATE members
        SET
            name = ?,
            group_id = ?
        WHERE id = ?
    `)
    .run(
        name,
        group_id,
        id
    );


    const updatedMember = db
        .prepare(`
            SELECT
                members.id,
                members.name,
                groups.name AS "group"
            FROM members
            JOIN groups
            ON members.group_id = groups.id
            WHERE members.id = ?
        `)
        .get(id);


    return NextResponse.json(updatedMember);
}