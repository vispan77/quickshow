// import stripe from "stripe";
// import Booking from '../models/Booking.js'
// import { inngest } from "../inngest/index.js";

// export const stripeWebhooks = async (request, response)=>{
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`);
//     }

//     try {
//         switch (event.type) {
//             case "payment_intent.succeeded": {
//                 const paymentIntent = event.data.object;
//                 const sessionList = await stripeInstance.checkout.sessions.list({
//                     payment_intent: paymentIntent.id
//                 })

//                 const session = sessionList.data[0];
//                 const { bookingId } = session.metadata;

//                 await Booking.findByIdAndUpdate(bookingId, {
//                     isPaid: true,
//                     paymentLink: ""
//                 })

//                  // Send Confirmation Email
//                  await inngest.send({
//                     name: "app/show.booked",
//                     data: {bookingId}
//                  })
                
//                 break;
//             }
        
//             default:
//                 console.log('Unhandled event type:', event.type)
//         }
//         response.json({received: true})
//     } catch (err) {
//         console.error("Webhook processing error:", err);
//         response.status(500).send("Internal Server Error");
//     }
// }




//correct stripe code from gpt
import stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

export const stripeWebhooks = async (request, response) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers["stripe-signature"];

    let event;

    // ✅ 1. Verify webhook
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("❌ Signature Error:", error.message);
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        console.log("🔥 Webhook hit:", event.type);

        // ✅ 2. Handle correct event
        if (event.type === "checkout.session.completed") {

            const session = event.data.object;

            console.log("👉 FULL SESSION:", session);

            const bookingId = session.metadata?.bookingId;

            console.log("👉 BOOKING ID:", bookingId);

            // 🚨 VERY IMPORTANT CHECK
            if (!bookingId) {
                console.error("❌ bookingId missing in metadata");
                return response.json({ received: true });
            }

            // ✅ 3. Update DB
            const updatedBooking = await Booking.findByIdAndUpdate(
                bookingId,
                {
                    isPaid: true,
                    paymentLink: ""
                },
                { new: true } // return updated doc
            );

            console.log("✅ UPDATED BOOKING:", updatedBooking);

            // ✅ 4. Trigger email event
            await inngest.send({
                name: "app/show.booked",
                data: { bookingId }
            });
        }

        response.json({ received: true });

    } catch (error) {
        console.error("❌ Webhook Processing Error:", error.message);
        response.status(500).send("Internal Server Error");
    }
};
