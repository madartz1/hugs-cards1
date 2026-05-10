const Stripe = require("stripe");

const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY
  );

const {
  addVIPMember
} = require("./vip-store");

exports.handler = async (event) => {

  const signature =
    event.headers[
      "stripe-signature"
    ];

  let stripeEvent;

  try{

    stripeEvent =
      stripe.webhooks.constructEvent(
        event.body,
        signature,
        process.env
          .STRIPE_WEBHOOK_SECRET
      );

  }catch(error){

    return {
      statusCode:400,

      body:
        "Webhook Error: "
        + error.message
    };
  }

  try{

    if(
      stripeEvent.type
      ===
      "checkout.session.completed"
    ){

      const session =
        stripeEvent.data.object;

      const email =
        session.customer_details?.email
        ||
        session.customer_email;

      const name =
        session.customer_details?.name
        ||
        "HUGS Supporter";

      const amount =
        session.amount_total || 0;

      if(
        email &&
        amount >= 1000
      ){

        await addVIPMember({
          email,
          name,
          amount,
          sessionId:session.id
        });
      }
    }

    return {
      statusCode:200,

      body:JSON.stringify({
        received:true
      })
    };

  }catch(error){

    return {
      statusCode:500,

      body:JSON.stringify({
        error:error.message
      })
    };
  }
};
