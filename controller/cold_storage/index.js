const ColdStorage = require("../../model/cold_storage")

async function addItemInColdStorage(req,res){
    try{
      const {product_name,stock,reciept_no,deposite_date}=req.body;
      if(!product_name || !stock || !reciept_no || !deposite_date){
        return res.status(404).json({
            error:"please provide all information of cold storage"
        })
      }
      const coldStorage_info=req.body;
      const isColdStoageInfoAdded=await ColdStorage.create(coldStorage_info);
      if(!isColdStoageInfoAdded){
        return res.status(404).json({
            error:"unable to add coldstorage info in db"
        })
      }

      return res.status(201).json({
        message:"information stored successfully",
      })


    }catch(error){
        console.log(error)
        return res.status(404).json({
            error
        })
    }
}

async function getColdStorageInfo(req,res){
    try{
    const product_name=req.params.name;
    if(!product_name){
        return res.status(404).json({
            error:"please provide name of product"
        })
    }

    const coldStorage_info=await ColdStorage.findOne({product_name});
    if(!coldStorage_info){
        return res.status(404).json({
            error:"unable to get cold storage information"
        })
    }

    return res.status(201).json({
        success:true,
        coldStorage_info

    })

    }catch(error){
        return res.status(404).json({
            error
        })
    }
}

module.exports={
    addItemInColdStorage,
    getColdStorageInfo
}