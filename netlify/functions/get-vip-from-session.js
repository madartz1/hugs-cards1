const Stripe = require("stripe");

const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY
  );

const {
  addVIPMember
} = require("./vip-store");

exports.handler = async (event) => {

  try{

    const sessionId =
      event.queryStringParameters
      ?.session_id;

    if(!sessionId){

      return {
        statusCode:400,

        body:JSON.stringify({
          error:"Missing session ID"
        })
      };
    }

    const session =
      await stripe.checkout.sessions.retrieve(
        sessionId
      );

    if(
      session.payment_status !== "paid"
    ){

      return {
        statusCode:402,

        body:JSON.stringify({
          error:"Payment not complete"
        })
      };
    }

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

    if(amount < 1000){

      return {
        statusCode:400,

        body:JSON.stringify({
          error:"Minimum $10 purchase"
        })
      };
    }

    const member =
      await addVIPMember({
        email,
        name,
        amount,
        sessionId
      });

    return {
      statusCode:200,
      body:JSON.stringify(member)
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
