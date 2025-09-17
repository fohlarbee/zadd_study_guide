import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "Zadd-study-guide",
  // Add proper configuration for development
  ...(process.env.NODE_ENV === "development" && {
    eventKey: process.env.INNGEST_EVENT_KEY,
    signingKey: process.env.INNGEST_SIGNING_KEY,
  })
});

