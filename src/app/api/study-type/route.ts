import db from "@/lib/db";
import { studyNotes, StudyTypeContent } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
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
        const contentMaterials = await 
        db.select().from(StudyTypeContent)
        .where(eq(StudyTypeContent.studyId, studyId));


        const res = {
        notes:notes,
        flashcards:contentMaterials?.find((i) => i.type === "flashcards") || null,
        quiz:contentMaterials?.find((i) => i.type === "quiz") || null,
        qa:contentMaterials?.find((i) => i.type === "qa") || null,

        }

        return NextResponse.json(res,{status:200});
    } else if (studyType === "notes") {
        const notes = await db.select().from(studyNotes)
        .where(eq(studyNotes.studyId, studyId))
        .orderBy(desc(studyNotes.id));
        
        return NextResponse.json(notes,{status:200});

    }else if ( studyType === "flashcards") {
        const flashcards = await db.select().from(StudyTypeContent)
        .where(
            and(
                eq(StudyTypeContent.studyId, studyId),
                eq(StudyTypeContent.type, "flashcards")
            )
        )
        .orderBy(desc(StudyTypeContent.created_at));

        return NextResponse.json(flashcards[0],{status:200});

    }else if (studyType === "quiz") {
        const quiz = await db.select().from(StudyTypeContent)
        .where(
            and(
                eq(StudyTypeContent.studyId, studyId),
                eq(StudyTypeContent.type, "quiz")
            )
        )
        .orderBy(desc(StudyTypeContent.created_at));

        return NextResponse.json(quiz[0],{status:200});
    }

}



    