import { inngest } from "@/inngest/client";
import db from "@/lib/db";
import { StudyTypeContent } from "@/lib/db/schema";
import { flashcardFormatPrompt, quizFormatPrompt } from "@/lib/prompt";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid4 } from 'uuid';



export const POST = async(req: NextRequest) => {
    const {topics, studyId, type} = await req.json();


    let prompt = '';
    switch (type) {
        case 'flashcards':
            prompt = flashcardFormatPrompt({topics});
            break;
        case 'quiz':
            prompt = quizFormatPrompt({topics});
            break;
        case 'qa':
            prompt = ''
        default:
            return
    }

    // Insert Record to DB and set status to Generating
    const res = await db.insert(StudyTypeContent).values({
        id: uuid4(),
        type,
        studyId,
    }).returning({id: StudyTypeContent.id});
    console.log('res', res);


        // Trigger Inngest Function to generate FlashCards
        inngest.send(
            {name:'study_type_content.generate',
                data:{
                    prompt,
                    recordId:res[0].id,
                    type
                }
            },
        )

    return NextResponse.json(res[0].id, {status: 200});
}