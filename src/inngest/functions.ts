import { inngest } from "./client";
import { Users } from "@/lib/db/schema";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


export const createNewUser = inngest.createFunction(
  {id:'create-new-user'},
  {event:'user.create'},
  async ({event, step}) => {
    // Get Event Data
    // console.log(event.data);
    const {userId, email} = event.data;
    const result = await step.run('Check user and send mail', async () => {

      if (!userId || !email) throw new Error("User not found");

      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);


      const user = await db.select().from(Users).where(eq(Users.id, userId));
      if ( user.length === 0) {
          const user = await db.insert(Users).values({
              id: userId!,
              email: clerkUser.emailAddresses[0]?.emailAddress as string,
              name: clerkUser.fullName as string,

          }).returning({id: Users.id});
          return user[0];
      }
      });
      console.log("user", result);
      return "Success";
  }

  // Step to send Welcome email

  // Step to send notification mail 3 days later
);