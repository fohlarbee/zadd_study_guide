import db from "@/lib/db";
import { studyNotes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const {userId} = await auth();
    if (!userId) 
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const {studyId, studyType} = await req.json();

    if (studyType === "All"){
        const notes = await db.select().from(studyNotes)
        .where(eq(studyNotes.studyId, studyId))
        .orderBy(desc(studyNotes.id));

        // Get other type of materials


        const res = {
        notes:notes,
        flashcards:null,
        quiz:null,
        qa:null

        }

        return NextResponse.json(res,{status:200});
    } else if (studyType === "Notes") {
        const notes = await db.select().from(studyNotes)
        .where(eq(studyNotes.studyId, studyId))
        .orderBy(desc(studyNotes.id));
        
        return NextResponse.json(notes,{status:200});

    }

}



    