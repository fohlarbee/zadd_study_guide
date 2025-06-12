import db from "@/lib/db";
import { StudyMaterial } from "@/lib/db/schema";
import { generateStudyGuide } from "@/lib/GenerateCourse";
import { formatStudyGuidePrompt } from "@/lib/prompt";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuid4 } from "uuid";
import { NextResponse } from "next/server"
import { inngest } from "@/inngest/client";

export const POST = async (req: Request) => {
    const {userId} = await auth();
    if (!userId) 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { studyType, topic, difficulty } = await req.json();
    if (!studyType || !topic || !difficulty) 
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    
    const prompt = formatStudyGuidePrompt({topic, studyType, difficulty});

    let  guide = await generateStudyGuide(prompt);
    guide = guide.trim().replace(/^```(?:json)?|```$/g, ''); // Remove code block markers
    console.log("Sanitized guide output:", guide);
    const res = JSON.parse(guide);
    

    const dbResult = await db.insert(StudyMaterial).values({
        id: uuid4(),
        courseId: uuid4(),
        userId: userId,
        topic,
        difficulty,
        studyType,
        courseLayout: res
    }).returning();    


    // Trigger Inngest function
    const notes = await inngest.send({
        name:'notes.generate',
        data:{
            studyMaterial: dbResult[0]
        }
    });

    console.log('response from generate notes', notes)
    return NextResponse.json({res:dbResult[0]}, { status: 200 });
}