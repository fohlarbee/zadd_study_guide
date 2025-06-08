import db from "@/lib/db";
import { StudyMaterial } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
    const { userId } = await auth();
    if (!userId) 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studyMaterials = 
    await db
    .select()
    .from(StudyMaterial)
    .where(eq(StudyMaterial.userId, userId));

    console.log("Fetched Study Materials:", studyMaterials);
    return NextResponse.json({ studyMaterials: studyMaterials || [] }, { status: 200 });
}