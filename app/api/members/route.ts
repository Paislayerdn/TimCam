import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";



export async function GET() {

    const { data, error } = await supabase
        .from("members")
        .select(`
            id,
            name,
            groups (
                name
            )
        `)
        .order("id");


    if (error) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        );
    }


    const members = data.map((member: any) => ({
        id: member.id,
        name: member.name,
        group: member.groups?.name ?? member.groups?.[0]?.name ?? "Unknown"
    }));


    return NextResponse.json(members);
}





export async function POST(request: Request) {

    const body = await request.json();


    const { data, error } = await supabase
        .from("members")
        .insert({
            name: body.name,
            group_id: body.group_id
        })
        .select()
        .single();



    if (error) {

        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        );

    }



    const { data: memberWithGroup, error: fetchError } = await supabase
        .from("members")
        .select(`
            id,
            name,
            groups (
                name
            )
        `)
        .eq("id", data.id)
        .single();



    if (fetchError) {

        return NextResponse.json(
            {
                error: fetchError.message
            },
            {
                status:500
            }
        );

    }



    const result = memberWithGroup as any;


    return NextResponse.json({

        id: result.id,

        name: result.name,

        group:
            result.groups?.name ??
            result.groups?.[0]?.name ??
            "Unknown"

    });

}





export async function DELETE(request: Request) {

    const body = await request.json();


    const { error } = await supabase
        .from("members")
        .delete()
        .eq(
            "id",
            body.id
        );



    if (error) {

        return NextResponse.json(
            {
                error:error.message
            },
            {
                status:500
            }
        );

    }



    return NextResponse.json({
        success:true
    });

}