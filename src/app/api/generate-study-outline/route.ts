import db from "@/lib/db";
import { StudyMaterial } from "@/lib/db/schema";
import { generateStudyGuide } from "@/lib/GenerateCourse";
import { formatStudyGuidePrompt } from "@/lib/prompt";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuid4 } from "uuid";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const {userId} = await auth();
    if (!userId) 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { studyType, topic, difficulty } = await req.json();
    if (!studyType || !topic || !difficulty) 
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    
    const prompt = formatStudyGuidePrompt({topic, studyType, difficulty});

    const guide = await generateStudyGuide(prompt);
    const res = JSON.parse(guide);
    

    const dbResult =await db.insert(StudyMaterial).values({
        id: uuid4(),
        courseId: uuid4(),
        userId: userId,
        topic,
        difficulty,
        studyType,
        courseLayout: res
    }).returning({ id: StudyMaterial.id });    

    console.log("DB Result:", dbResult);

    return NextResponse.json({res:dbResult[0]}, { status: 200 });
}