import db from "@/lib/db";
import { Users } from "@/lib/db/schema";
import { auth, clerkClient} from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const SyncUser = async() => {
    const {userId} = await auth();
    if (!userId) throw new Error("User not found");

    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);


    const user = await db.select().from(Users).where(eq(Users.id, userId));
    if ( user.length === 0) {
        const user = await db.insert(Users).values({
            id: userId!,
            email: clerkUser.emailAddresses[0]?.emailAddress as string,
            name: clerkUser.fullName as string,

        }).returning({id: Users.id})
        console.log("User created in database:", user);
    }


    return redirect('/dashboard');
}

export default SyncUser;