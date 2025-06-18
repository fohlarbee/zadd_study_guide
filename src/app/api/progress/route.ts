import db from "@/lib/db";
import { StudyMaterial, studyNotes, StudyTypeContent } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    const {userId} = await auth();
    if (!userId)
        return NextResponse.json({error: 'Unauthorized'}, {status:401});
    const { studyId, progress, type } = await req.json();

    switch(type){
        case 'notes':
            await db.update(studyNotes).set({
                completed: true
            }).where(eq(studyNotes.studyId, studyId));
            break;
        case 'flashcards':
            await db.update(StudyTypeContent).set({
                completed:true
            }).where(and(
                eq(StudyTypeContent.studyId, studyId),
                eq(StudyTypeContent.type, 'flashcards')
            ))
            break;
        case 'quiz':
             await db.update(StudyTypeContent).set({
                completed:true
            }).where(and(
                eq(StudyTypeContent.studyId, studyId),
                eq(StudyTypeContent.type, 'quiz')
            ))
            break;
        default:
            return
    }


    const studyMaterial = await db.select().from(StudyMaterial)
    .where(
        and(
            eq(StudyMaterial.courseId, studyId),
            eq(StudyMaterial.userId, userId)
        )
    );
    if (!studyMaterial)
        return NextResponse.json({error: 'StudyMaterial not found'}, {status:404});

    await db.update(StudyMaterial).set({
        progress
    }).where(
        eq(StudyMaterial.id, studyMaterial[0].id)
    )

    return NextResponse.json({msg:'Progress Updated'}, {status:200})

}