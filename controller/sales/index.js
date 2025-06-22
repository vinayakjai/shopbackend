const Sale = require("../../model/sales");

async function updatesSales(req, res, next) {
  try {
    const incrementValue = req.params.incrementValue;
    if (!incrementValue) {
      return res.status(404).json({
        success: false,
        message: "please provide incrmenetvalue",
      });
    }
    const update_sales = await Sale.updateOne(
      { id: 1 },
      { $inc: { amount: incrementValue } }
    );
    if(update_sales){
        return res.status(201).json({
         success:true,
         message:"sales updated",
        })
    }else{
         return res.status(404).json({
         success:true,
         message:"unable to update sale",
        })
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "unable to update sales",
    });
  }
}


async function createsale(req,res){
    const create_sale=await Sale.create({id:1,amount:0});
    return res.status(201).json({
        success:true,
        
    })
}

async function fetchsale(req,res){
    const result=await Sale.findOne({id:1});
    return res.status(201).json({
        success:true,
        data:result.amount
        
    })
}

module.exports={
    updatesSales,
    createsale,
    fetchsale,
}
