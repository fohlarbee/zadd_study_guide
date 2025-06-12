import { inngest } from "./client";
import { DrizzleStudyMaterial, StudyMaterial, studyNotes, Users } from "@/lib/db/schema";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { generateChapterContentPrompt } from "@/lib/prompt";
import { generateStudyGuide } from "@/lib/GenerateCourse";
import {v4 as uuid4} from 'uuid';

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

export const generateNotes = inngest.createFunction(
  {id:'generate_study_materials'},
  {event:'notes.generate'},
  async({event, step}) => {
    const studyMaterial = event.data?.studyMaterial as DrizzleStudyMaterial;

    // Define the expected type for courseLayout
    type CourseLayout = {
      studyGuideTitle: string;
      levelOfDifficulty: string;
      studySummary: string;
      chapters: { chapterTitle: string; summary: string; topics: string[] }[];
    };

    // Generate notes for each chapters
    try {
      const notes =  await step.run("Generate study notes", async() => {
          const courseLayout = studyMaterial?.courseLayout as CourseLayout;
          const chapters = courseLayout?.chapters;
          let index = 0;

          if(Array.isArray(chapters)){
            for (const c  of chapters){
               const prompt = generateChapterContentPrompt({
                chapterTitle: c.chapterTitle,
                summary: c.summary,
                topics: c.topics
                });

                const res = await generateStudyGuide(prompt);
                // Sanitize the response
                
                // console.log('Generated Notes for Chapter:', c.chapterTitle, res);
                await db.insert(studyNotes).values({
                  id: uuid4(), 
                  studyId: studyMaterial.courseId,
                  chapterId: index.toString(),
                  notes: res
                })
                index += 1;

            }
          }
          return 'Completed'
      });
     console.log('All notes generated', notes);


     // Update staus to Ready
    const studyMaterialUpdate = await step.run('Update StudyLayout status', async() => {
      const res = await db.update(StudyMaterial).set({
        status:"Ready"
      }).where(eq(StudyMaterial.courseId, studyMaterial.courseId));
      console.log('Res', res);
      return 'Success'
    });


    console.log('Study Material Update:', studyMaterialUpdate);

    return 'Successful'
      
    } catch (error) {
      console.error('Error generating notes:', error);
      throw new Error('Failed to generate notes');
      
    }
  }
);


// Used to generate FlashCards, Quiz and Q&A
export const generateStudyTypeContent = inngest.createFunction(
  {id: 'generate_study_type_content'},
  {event: 'study_type_content.generate'},
  async({event, step}) => {
    const {studyType, prompt, studyId} = event.data;
    
  }

);