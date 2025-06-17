import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../checkout/route";
import Stripe from "stripe";
import db from "@/lib/db";
import { subscriptions, Users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
    
   const body = await req.text();
   const signature = (await headers()).get('Stripe-Signature') as string;
   let event: Stripe.Event;   
   try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

   }catch(error){
    console.log('error', error);
        return NextResponse.json({error: 'Webhook Error'}, {status:400});

   }

    const session = event.data.object as Stripe.Checkout.Session;

   if (event.type === 'checkout.session.completed'){

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    console.log('subscription from checkout', subscription);


        if (!session?.metadata?.customerId)
            return NextResponse.json({error: 'Customer ID not found'}, {status: 400});

        const subStart = new Date(subscription.start_date * 1000);
        const oneMonthLater = new Date(subStart);
        oneMonthLater.setMonth(subStart.getMonth() + 1);
        // console.log('subStart, oneMonthLater from checkout.completed', subStart, oneMonthLater);
        await db.insert(subscriptions).values({
            id: subscription.id,
            sessionId: session.id,
            userId: session.metadata.customerId,
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(oneMonthLater),
        });

        await db.update(Users).set({
            isMember: true,
        }).where(eq(Users.id, session.metadata.customerId));
    }


    // Subscription renewed
    if (event.type === 'customer.subscription.updated'){

        const subscription = await stripe.subscriptions
        .retrieve(
            session?.subscription as string,
        )
        console.log('subscription from invoice', subscription);
        
        const subStart = new Date(subscription.start_date * 1000);
        const oneMonthLater = new Date(subStart);
        oneMonthLater.setMonth(subStart.getMonth() + 1);
        //  console.log('subStart, oneMonthLater from invoice', subStart, oneMonthLater);

        await db.update(subscriptions).set({
            stripeCurrentPeriodEnd: new Date(oneMonthLater),
            stripePriceId: subscription.items.data[0].price.id
        }).where(eq(subscriptions.stripeSubscriptionId, subscription.id));
    }

    return NextResponse.json(null, {status: 200});
} 