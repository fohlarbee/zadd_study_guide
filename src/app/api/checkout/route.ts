import db from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {  NextResponse } from "next/server";
import Stripe from "stripe";

const return_url = process.env.NEXT_PUBLIC_URL + '/';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion:'2025-05-28.basil'
    });
export const POST = async () => {
    const {userId} = await auth();
    const user = await currentUser();
    if (!userId) 
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion:'2025-05-28.basil'
    });
    const priceId = process.env.STRIPE_MONTHLY_PLAN_ID;

    try {
         const _userSubscriptions = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
            if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId){
                //Trying to cancel the subscription
                const stripeSesion = await stripe.billingPortal.sessions.create({
                    customer:_userSubscriptions[0].stripeCustomerId,
                    return_url
                });
                return NextResponse.json({url: stripeSesion.url}) 
            }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types:['card'],
            billing_address_collection:"auto",
            customer_email:user?.emailAddresses[0].emailAddress,
            line_items:[
                {
                    price: priceId!,
                    //  price_data:{
                    //     currency:'usd',
                    //     product_data:{
                    //         name:'Zadd-Study-Guide Pro',
                    //         description:'Unlimited access to Study Materials, Flashcards, and Quizzes',
                            
                    //     },
                    //     unit_amount: 999,
                    //     recurring:{
                    //         interval:'month'
                    //     }
                    // },
                    quantity: 1
                    }
            ],
            success_url: `${process.env.NEXT_PUBLIC_URL}/upgrade`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/upgrade`,
            metadata:{
                customerId: userId,
            }
        });
        return NextResponse.json({url: session.url}, {status: 200});    
    } catch (error) {
        console.log(error)
        if (error instanceof Error) return NextResponse.json({error:error.message}, {status:500});
    }

   
}


// import db from "@/lib/db";
// import { subscriptions } from "@/lib/db/schema";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";


// const return_url = process.env.NEXT_PUBLIC_URL + '/';
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion:'2025-05-28.basil'
// });
 
// export async function GET(){
//     try{
//         const {userId}  = await auth();
//         const user = await currentUser();

//         if (!userId) return NextResponse.json({error:'Unauthorized'}, {status:401});

//         const _subscriptions = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
//         if (_subscriptions[0] && _subscriptions[0].stripeCustomerId){
//             //Trying to cancel the subscription
//             const stripeSesion = await stripe.billingPortal.sessions.create({
//                 customer:_subscriptions[0].stripeCustomerId,
//                 return_url
//             });
//             return NextResponse.json({url: stripeSesion.url}) 
//         }

//         // User first time trying to subscribe
//         const session = await stripe.checkout.sessions.create({
//             success_url: `${process.env.NEXT_PUBLIC_URL}/upgrade`,
//             cancel_url: `${process.env.NEXT_PUBLIC_URL}/upgrade`,
//             payment_method_types:['card',],
//             mode:"subscription",
//             billing_address_collection:"auto",
//             customer_email:user?.emailAddresses[0].emailAddress,
//             line_items:[
//                 {
//                     price_data:{
//                         currency:'usd',
//                         product_data:{
//                            name:'Zadd-Study-Guide Pro',
//                            description:'Unlimited access to Study Materials, Flashcards, and Quizzes',
                            
//                         },
//                         unit_amount: 999,
//                         recurring:{
//                             interval:'month'
//                         }
//                     },
//                     quantity:1
//                 }
//             ],
//             metadata:{
//                 customerId:userId
//             }
//         });
//         return NextResponse.json({url: session.url});
//     }catch(err){
//         console.log(err)
//         if (err instanceof Error) return NextResponse.json({error:err.message}, {status:500});
//     }
// }