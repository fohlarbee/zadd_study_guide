import db from "@/lib/db";
import { Users } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
    const {userId} = await auth();
    if (!userId)
        return NextResponse.json({msg:'Unauthorized'}, {status: 401});

    const user = await db.select().from(Users).where(eq(Users.id, userId));

   return NextResponse.json({isMember: user[0]?.isMember}, {status: 200});
};