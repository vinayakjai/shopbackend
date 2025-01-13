const Cart = require("../../model/Cart_model");
async function createCart(req,res){
    const {name}=req.params;
    if(!name){
        return res.json({
            success:false
        })
    }
    const cart=await Cart.create({name,items:[]});
    if(!cart){
        return res.status(404).json({
            success:false,
            message:"unable to create cart",
        })
    }
    else{
        return res.status(201).json({
            success:true,
            message:"cart created successfully",
            cart
        })
    }
}
async function addToCart(req,res){
    try{
    const {productName,price,quantity,weight,weightInBill}=req.body;
    if(!productName,!price,!quantity,!weight || !weightInBill){
        return res.status(404).json({
           success:false,
           message:"please provide required information",
        })
    }
    const cart=await Cart.findOne({});
    if(cart){
        cart.items.push({name:productName,price,weight,quantity,weightInBill});
        await cart.save();
        return res.status(201).json({
            success:true,
            message:"item added to cart successfully"
        })
    }
    }catch(error){
        return res.json({
            success:false,
            message:"unable to create cart",
        })
    }
}

async function deleteCart(req,res){
    try{
     
    }catch(error){
        return res.json({
            success:false,
            message:"unable to delete cart",
        })
    }
}

async function deleteItem(req,res){
    try{
        const {productName,price,quantity,weight}=req.body;
        if(!productName,!price,!quantity,!weight){
            return res.status(404).json({
               success:false,
               message:"please provide required information",
            })
        }
        const cart=await Cart.findOne({});
        let targetIndexOfProduct=null;

        let cartProducts = cart.items;
    
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartProducts[i].name == productName) {
            targetIndexOfProduct = i;
            break;
          }
        }
    
        cartProducts.splice(targetIndexOfProduct, 1);
        await cart.save();
    
        return res.status(201).json({
          success:true,
          message: "product removed from cart successfully",
         
        });


    }catch(error){
        return res.status(404).json({
           success:false,
           message:"unable to delete",
        })
    }
}

async function updateQuantity(req,res){
    try{
        const {productName,price,updatedQuantity,weight}=req.body;
        if(!productName,!price,!updatedQuantity,!weight){
            return res.status(404).json({
               success:false,
               message:"please provide required information",
            })
        }
        const cart=await Cart.findOne({});

        cart.items.map((product)=>{
            if(product.name==productName && product.weight==weight){
              product.quantity=updatedQuantity;
            }
         })
    
         await cart.save();
    
         return res.status(201).json({
            success:true,
          message:'quantity of product updated successfully',
          
         })
    
        


    }catch(error){
        return res.status(404).json({
            success:false,
            message:"unable to update quantity of the product",
            error
        })
    }
}

async function getCart(req,res){
    const name=req.params.name;
    if(!name){
        return res.status(404).json({
            success:false,
            message:"please provide username"
        })
    }
    const cart=await Cart.findOne({name});
    if(!cart){
        return res.status(404).json({
            success:false,
            message:"Invalid user"
        })
    }
    let totalPrice=0;
    for(i=0;i<cart.items.length;i++){
        totalPrice=totalPrice+(cart.items[i].price*cart.items[i].quantity);
    }
    return res.status(201).json({
        success:true,
        totalPrice,
        items:cart.items,
        name:cart.name
    })
}

module.exports={
    createCart,
    addToCart,
    deleteItem,
    updateQuantity,
    getCart
}