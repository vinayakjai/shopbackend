const mongoose=require("mongoose");
async function callDb(){
    try{
        const mongoUri='mongodb+srv://shopDB:shopDB@vinayak.g0lxnfc.mongodb.net/shopDB'
       const isConnected=await mongoose.connect(mongoUri);
       if(!isConnected){
        throw new Error("failde")
       }
    }catch(error){
       console.log(error)
    }
}
module.exports=callDb;