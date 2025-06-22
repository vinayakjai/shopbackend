const Dryfruits_perday_Info = require("../../model/dryfruits_perday");

function storeData(req,res,next){
    try{
      const products_in_cart=req.body;
      console.log("--",products_in_cart);
      if(!products_in_cart){
        return res.status(404).json({
            success:false,
            error:"please provide products in cart"
        })
      }

      const dryfruits=products_in_cart.products.filter((product)=>product.category==true);
      console.log(dryfruits);
         
      dryfruits.map(async (dryfruit)=>{
            await Dryfruits_perday_Info.updateOne(
                     { name: dryfruit.name },
                     { $inc: { weight: +(dryfruit.weight*dryfruit.quantity) } }
            );
      });

      return res.status(201).json({
        success:true,
        message:"dryfruits data stored successfully"
      })

    

    }catch(error){
        return res.status(404).json({
            success:false,
            error
        })
    }
}

async function get_today_sales(req,res,next){
    const dryfruits_sales=await Dryfruits_perday_Info.find({});
    return res.status(201).json({
        success:true,
        dryfruits_sales
    })
}

async function make_dryfruits_perday_zero(req,res,next){
    const is_reset=await Dryfruits_perday_Info.updateMany({},{$set:{weight:0}});
    if(is_reset){
        return res.status(201).json({
            success:true,
            message:"dryfruit sales reset successfully"
        })
    }else{
         return res.status(401).json({
            success:false,
            message:"some problem occured"
        })
    }
}

function make_dryfruits_avg_zero(req,res,next){

}

module.exports={
    storeData,
    get_today_sales,
    make_dryfruits_perday_zero,
}