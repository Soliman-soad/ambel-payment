
const Wallet = require("../models/paymentManagement/wallet");
const stripe = require("../utils/stripe");
const catchAsync = require("../utils/catchAsync")

const payment_controller = {};


payment_controller.create_setup_intent = catchAsync(async (req, res, next) => {
    const wallet = await Wallet.findOne({ user: req.user._id });
    const stripe_cus_id = wallet.stripe_cus_id;
    const setupIntent = await stripe.setupIntents.create({
        customer: stripe_cus_id,
        payment_method_types: ["card"],
    });
    res.json(setupIntent);
});
payment_controller.connectionToken = catchAsync(async (req, res, next) => {
    const token = await stripe.terminal.connectionTokens.create();
    res.send({
        success: true,
        data: token.secret
    });
});
// 
payment_controller.createIntentForPos = catchAsync(async (req, res, next) => {

    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card', 'link', 'card_present']
        });

        res.send({
            success: true,
            client_secret: paymentIntent['client_secret'],
        })
    } catch (err) {
        console.log(err)
    }

});

payment_controller.webhook = async (req, res, next) => {
    
    let event = req.body;
    const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET;
    // console.log("io", io);

    // console.log("app in webhook", app);

    try {
        if (endpointSecret) {
            const signature = req.headers["stripe-signature"];

            try {
                event = await stripe.webhooks.constructEvent(
                    req["rawBody"],
                    signature,
                    endpointSecret
                );
            } catch (err) {
                console.log(
                    `⚠️  Webhook signature verification failed.`,
                    err.message
                );
                return res.sendStatus(400);
            }
        }

        let paymentIntent;
        switch (event.type) {
            case "payment_intent.created":
                console.log("payment intent", event.data.object);

                break;
            case "payment_intent.succeeded":
                paymentIntent = event.data.object;

                console.log("payment intent", paymentIntent);

                if (paymentIntent.description == "Add Balance") {
                    updateWallet(paymentIntent).then(() => {
                        const socketIo = req.app.get("socketIo");
                        socketIo.emit("updateWallet", {
                            message: "update your wallet",
                        });
                    });
                } else if (paymentIntent.description == "Package Purchase") {
                }

                break;

            case "setup_intent.succeeded":
                console.log("setup intent succeeded", event.data.object);
                const { payment_method, customer, metadata } =
                    event.data.object;
                if (
                    metadata.payment_method_type &&
                    metadata.payment_method_type == "default"
                ) {
                    await stripe.customers.update(customer, {
                        invoice_settings: {
                            default_payment_method: payment_method,
                        },
                    });
                }

                break;

            case "payment_intent.payment_failed":
                const payment_intent_id = paymentIntent.id;
                await Transaction.findOneAndUpdate(
                    { payment_intent_id },
                    { status: "cancelled" }
                );
            case "setup_intent.created":
                break;
            case "payment_method.attached":
                // const { customer, id } = event.data.object;
                // console.log("payment Method attached Event", event.data.object);
                // const newCustomer = await stripe.customers.update(customer, {
                //   invoice_settings: { default_payment_method: id },
                // });
                break;
            case "charge.succeeded":
                break;
            case "checkout.session.completed":
                const session = event.data.object;
                updateOrder(session);
                // console.log(paymentIntent);
                break;

            case "invoice.payment_succeeded":
                break;
            case "invoice.payment_failed":
                console.log("invoice failed");
                break;
            case "invoice.created":
                console.log(event.data.object);
                // res.redirect(event.data.object.hosted_invoice_url);
                break;
            case "invoice.updated":
                console.log(event.data.object);
                break;
            case "invoice.paid":
                console.log(event.data.object);
                res.redirect(event.data.object.hosted_invoice_url);
                break;
            case "customer.subscription.created":
                
                console.log(`Subscription created ${event.data.object.id}`);

                break;

            case "customer.subscription.updated":
                console.log(event.data.object);
                

                console.log(`Subscription ${event.data.object.id} is charged`);
                break;

            default:
                console.log(`Unhandled event type ${event.type}.`);
        }

        res.end();
    } catch (e) {
        console.log(e);
    }
};


module.exports = payment_controller;
