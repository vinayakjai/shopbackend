const Stock = require("../../model/stock_model");
async function addProductToStock(req,res){
    const {productName,current_stock,minimum_stock_signal}=req.body;
    if(!productName || !current_stock || !minimum_stock_signal){
        return res.status(404).json({
            success:false,
            message:"please provide required information",
        })
    }

    const isStockOfProductAdded=await Stock.create({name:productName,current_stock,minimum_stock_signal});
    if(isStockOfProductAdded){
        return res.status(201).json({
            success:true,
            message:"stock of product added successfully",
        })
    }else{
        return res.status(404).json({
            success:false,
            message:"unable to add stock of product",
        })
    }
}
async function findMinimalStock(req,res){

    const lowStockItems = await Stock.find({
        $expr: { $lte: ["$current_stock", "$minimum_stock_signal"] }, // Compare weight and minimum fields
      });

      if(!lowStockItems){
        return res.status(404).json({
            success:false,
            message:"unable to find stock with minimum wieghts due to db issue"
        })
      }
      if(lowStockItems.length==0){
        return res.status(201).json({
            success:false,
            message:"all items are with required stock"
        })
      }

      if(lowStockItems.length>0){
        return res.status(201).json({
            success:true,
            lowStockItems,
        })
      }
     return res.status(201).json({
        success:true,
        minimalStockProducts,
    })
}

async function findStockOfGivenProduct(req,res){
    const {productName}=req.body;
    const stockOfProduct=await Stock.findOne({name:productName});
    if(stockOfProduct){
        return res.status(201).json({
            success:true,
            stockOfProduct
        })
    }else{
        return res.status(404).json({
            success:false,
            message:"unable to find stock of product",
        })
    }
}

async function updateStockOfProducts(req,res){
    const {products}=req.body;
    console.log(products)
    /**
     * products:[
     *      {
     *         name:"badam american",
     *         weight:100
     * 
     *      },...
     * 
     * 
     * ]
     */
    if(!products){
        return res.status(404).json({
            success:false,
            message:"please provide products to update stock",
        })
    }
    /*
    const stockOfAllProducts=await Stock.find({});
    console.log(stockOfAllProducts)
    let pointerToProducts=0;
    let pointerToStocks=0;
    while(pointerToProducts<products.length){
        if(products[pointerToProducts].name==stockOfAllProducts[pointerToStocks].name){
            stockOfAllProducts[pointerToStocks].current_stock=stockOfAllProducts[pointerToStocks].current_stock-products[pointerToProducts].weight;
            pointerToProducts++;
        }else{
            pointerToStocks++;
        }
    }
    */
    for (const product of products) {
        // Find the stock item by name and update its weight
        const updatedStock = await Stock.findOneAndUpdate(
          { name: product.name }, // Match by name
          { $inc: { current_stock: -product.weight } }, // Decrease weight
          { new: true } // Return the updated document
        );
        console.log(updatedStock)
        if (!updatedStock) {
          return res.status(404).json({
            success:false,
            message:"unable to update stock due to db related issue"
          })
        } else {
           return res.status(201).json({
            success:true,
            message:"updated stock successfully",
           })
        }
      }


  
}

module.exports={
    findMinimalStock,
    findStockOfGivenProduct,
    updateStockOfProducts,
    addProductToStock

}