const mongoose=require("mongoose");
async function callDb(){
    try{
        const mongoUri='mongodb://127.0.0.1:27017/Shop'
       const isConnected=await mongoose.connect(mongoUri);
       if(!isConnected){
        throw new Error("failde")
       }
    }catch(error){
       console.log(error)
    }
}
module.exports=callDb;