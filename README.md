ZADD Study Guild SaaS App Documentation 

 Document Version: 1.0 
 Date: June 1, 2025 
 Author: Zayadd 
 Contact: +234 810 468 9537 
 Project: ZADD Study Guild 
 Slogan: “Learn Fast. Teach Better. Grow Smarter.” 

 

Table of Contents 

    Executive Summary 

    Introduction 

    Background and Related Work 

    Problem Statement 

    Objectives 

    System Design and Methodology 
     6.1 System Architecture 
     6.2 Process Flow 
     6.3 Technical Implementation 

    Evaluation and Projected Outcomes 

    Business Model 

    Discussion 

    Conclusion 

    Future Work 

    Glossary 

    References 

1. Executive Summary 

ZADD Study Guild is an AI-powered learning management system that allows creators to design interactive courses and modules, and enables learners to engage in intelligent, progress-driven learning journeys. The platform blends traditional course content with flashcards, quizzes, and AI-generated resources, creating a dynamic and personalized educational experience. 

2. Introduction 

In today’s knowledge economy, learning must be flexible, engaging, and intelligent. ZADD Study Guild empowers creators to build modular, AI-enhanced courses while giving learners a smart dashboard that tracks progress and tailors content using generative AI. 

Whether you're an individual coach, educator, or startup academy, ZADD Study Guild provides the tools to build and deliver exceptional digital learning experiences. 

3. Problem Statement 

Most LMS platforms either focus on static content (video-only) or overcomplicate learning with bloated features. There's a gap in tools that: 

    Allow creators/users to build courses with both learning and memory-recall features 

    Include lightweight, gamified assessments like flashcards and quizzes 

    Visually track learner progress across modules. 

There’s a need for a lightweight, creator-first, AI-enhanced LMS that can serve as both a creator tool and a personal tutor for learners. 

4. Objectives 

    ✅ Allow creators to create and publish AI-assisted courses and modules 

    ✅ Include quizzes, flashcards, and dynamic AI-generated learning summaries 

    ✅ Let learners track progress and receive real-time feedback 

    ✅ Use generative AI to recommend content and auto-generate flashcards 

    ✅ Support a clean SaaS onboarding model with monetization capability 

 

 

 

5. Core Features 

🔹 For Creators 

    Create structured courses and modules 

    Auto-generate flashcards and quiz questions using AI 

    Use AI-generated flashcards for quick recall 

    Take module-level quizzes with feedback 

    Track lesson/module progress 

    Get AI-based content suggestions 

    Manage learning and see progress analytics 

6. Technology Stack 

Layer 
	

Tech Stack 

Frontend 
	

Next.js 15 (App Router), TailwindCSS 

Component UI 
	

ShadCN UI, Radix UI 

State Mgmt 
	

React Query / Zustand 

Backend 
	

Next.js Server Actions, Prisma 

Auth 
	

Clerk (OAuth + email/password) 

DB 
	

PostgreSQL (via PlanetScale) 

AI Layer 
	

Gemini API 

File Uploads 
	

Uploadthing or Azure blob storage 

Deployment 
	

Vercel (frontend + backend) 

 

7. Workflow Overview 

    Creator logs in and creates a new course 

    Course has multiple modules/lessons 

    For each module, creator adds: 

    Video 

    Optional markdown/HTML content 

    Flashcards (manual or AI-generated) 

    Quizzes (manual or AI-generated) 

    Creator can also, enrolls in course 

    Creator goes through content, takes quizzes, flips flashcards 

    Progress is tracked and stored per course/module 

8. Data Models (Simplified) 

Picture 

9. Evaluation Metrics 

Metric 
	

Target 

Course creation time 
	

< 10 minutes 

Learner satisfaction (SUS) 
	

> 85% 

AI flashcard usefulness 
	

> 75% 

Repeat login rate (weekly) 
	

> 60% 

 

10. Business Model 

    Free Tier: Create 5 course, 3 modules max 

    Pro Tier (#5k/mo): Unlimited courses, AI flashcards, insights 

    Team Tier (#10k/mo): Multi-creator, analytics, branding, priority AI 

Stripe integration optional for course monetization. 

11. References 

    Stripe Docs – https://stripe.com/docs 

    Clerk Auth – https://clerk.dev 

    Next.js App Router – https://nextjs.org/docs/app 

    React Email – https://react.email 

    Prisma ORM – https://www.prisma.io/docs 

    PlanetScale – https://planetscale.com 

 

 

 

 

 

 