const { getStore } = require("@netlify/blobs");

const LIMIT = 333;

function cleanEmail(email){
  return String(email || "")
    .trim()
    .toLowerCase();
}

async function getVIPStore(){
  return getStore("hugs-vip-members");
}

async function getData(){

  const store = await getVIPStore();

  const data = await store.get(
    "vip-data",
    { type:"json" }
  );

  return data || {
    count:0,
    members:{}
  };
}

async function saveData(data){

  const store = await getVIPStore();

  await store.setJSON(
    "vip-data",
    data
  );
}

async function addVIPMember({
  email,
  name,
  amount,
  sessionId
}){

  const safeEmail =
    cleanEmail(email);

  if(!safeEmail){
    throw new Error(
      "Customer email missing"
    );
  }

  const data =
    await getData();

  if(data.members[safeEmail]){
    return data.members[safeEmail];
  }

  if(data.count >= LIMIT){
    throw new Error(
      "VIP limit reached"
    );
  }

  const vipNumber =
    data.count + 1;

  const member = {
    email:safeEmail,
    name:name || "HUGS Supporter",
    vip_number:vipNumber,
    amount:amount || 0,
    session_id:sessionId || "",
    created_at:new Date().toISOString()
  };

  data.count = vipNumber;

  data.members[safeEmail] =
    member;

  await saveData(data);

  return member;
}

module.exports = {
  LIMIT,
  cleanEmail,
  getData,
  addVIPMember
};
