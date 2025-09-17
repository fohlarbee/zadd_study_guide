// import db from "@/lib/db";
// import { Users } from "@/lib/db/schema";
import { auth, clerkClient} from "@clerk/nextjs/server"
// import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import axios from "axios";

const SyncUser = async() => {
    try {
        const {userId} = await auth();
        if (!userId) throw new Error("User not found");
        const baseUrl = process.env.NEXT_PUBLIC_URL as string;

        const client = await clerkClient();
        const clerkUser = await client.users.getUser(userId);

        try {
            await axios.post(`${baseUrl}/api/create-user`, {clerkUser});
        } catch (apiError) {
            console.error("API call failed:", apiError);
            // Continue to dashboard even if API call fails
            console.warn("Continuing to dashboard despite API error");
        }

        return redirect('/dashboard');
    } catch (error) {
        console.error("Error in SyncUser:", error);
        // Redirect to dashboard even if there's an error
        return redirect('/dashboard');
    }
}

export default SyncUser;