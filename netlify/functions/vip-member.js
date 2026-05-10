const {
  getData,
  cleanEmail
} = require("./vip-store");

exports.handler = async (event) => {

  try{

    const email =
      cleanEmail(
        event.queryStringParameters
        ?.email
      );

    if(!email){

      return {
        statusCode:400,

        body:JSON.stringify({
          error:"Email required"
        })
      };
    }

    const data =
      await getData();

    const member =
      data.members[email];

    if(!member){

      return {
        statusCode:404,

        body:JSON.stringify({
          error:"VIP member not found"
        })
      };
    }

    return {
      statusCode:200,
      body:JSON.stringify(member)
    };

  }catch(error){

    return {
      statusCode:500,

      body:JSON.stringify({
        error:"Member lookup failed"
      })
    };
  }
};
