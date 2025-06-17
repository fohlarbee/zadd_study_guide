import db from "@/lib/db";
import { StudyMaterial, Users } from "@/lib/db/schema";
import { generateStudyGuide } from "@/lib/GenerateCourse";
import { formatStudyGuidePrompt } from "@/lib/prompt";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuid4 } from "uuid";
import { NextResponse } from "next/server"
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export const POST = async (req: Request) => {
    const {userId} = await auth();
    if (!userId) 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = await db.select().from(Users).where(eq(Users.id, userId));

    const studyMaterials = await db.select()
    .from(StudyMaterial)
    .where(eq(StudyMaterial.userId, userId));

    if (user[0].isMember === false && studyMaterials.length >= 5) {
        return NextResponse.json({ error: "You have reached the limit of 5 study materials. Please upgrade to a premium plan to create more." }, { status: 403 });  
    }


    const { studyType, topic, difficulty } = await req.json();
    if (!studyType || !topic || !difficulty) 
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    
    const prompt = formatStudyGuidePrompt({topic, studyType, difficulty});

    let  guide = await generateStudyGuide(prompt);
    guide = guide.trim().replace(/^```(?:json)?|```$/g, ''); // Remove code block markers
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
    await inngest.send({
        name:'notes.generate',
        data:{
            studyMaterial: dbResult[0]
        }
    });

    return NextResponse.json({res:dbResult[0]}, { status: 200 });
}