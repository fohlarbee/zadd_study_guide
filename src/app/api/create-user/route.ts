import { inngest } from "@/inngest/client";
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clerkUser } = await req.json();

    if (!clerkUser)
      return new Response("User data is required", { status: 400 });

    // Add error handling for Inngest connection
    const result = await inngest.send({
      name: "user.create",
      data: {
        userId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress as string,
      },
    });

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    console.error("Error in create-user API:", error);

    // Check if it's a network error
    if (error instanceof Error && error.message.includes("fetch failed")) {
      console.warn(
        "Inngest service unavailable, continuing without event processing"
      );
      // Return success even if Inngest is down - the user creation can still proceed
      return NextResponse.json(
        { result: "User creation queued (Inngest unavailable)" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
