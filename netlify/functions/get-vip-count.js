const {
  getData,
  LIMIT
} = require("./vip-store");

exports.handler = async () => {

  try{

    const data =
      await getData();

    return {
      statusCode:200,

      body:JSON.stringify({
        count:data.count || 0,
        limit:LIMIT
      })
    };

  }catch(error){

    return {
      statusCode:500,

      body:JSON.stringify({
        error:"Counter failed"
      })
    };
  }
};
