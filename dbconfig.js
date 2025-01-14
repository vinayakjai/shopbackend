const mongoose=require("mongoose");
async function callDb(){
    try{
        const mongoUri="mongodb://localhost:27017/Shop"
       const isConnected=await mongoose.connect(mongoUri);
       if(!isConnected){
        throw new Error("failde")
       }
    }catch(error){
       console.log(error)
    }
}
//mongodb://localhost:27017
//'mongodb+srv://shopDB:shopDB@vinayak.g0lxnfc.mongodb.net/shopDB'
module.exports=callDb;