import db from "@/lib/db";
import { StudyMaterial } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth();
    if (!userId) 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (req) {
        const reqUrl = req.url;
        const searchParams = new URL(reqUrl).searchParams;
        

        const studyId = searchParams.get("studyId");

        if (studyId) {
            const studyMaterial = await db.select().from(StudyMaterial).where(
                eq(StudyMaterial.courseId, studyId!),
            );
            return NextResponse.json({ studyMaterial: studyMaterial[0] }, { status: 200 });
        }
    }

    const studyMaterials = 
        await db
        .select()
        .from(StudyMaterial)
        .where(eq(StudyMaterial.userId, userId))
        .orderBy(desc(StudyMaterial.created_at));

    return NextResponse.json({ studyMaterials: studyMaterials }, { status: 200 });
}