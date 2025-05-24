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
    const {productName,price,quantity,weight,weightInBill,tax,category}=req.body;
    const {name}=req.params;
    if(!productName,!price,!quantity,!weight || !weightInBill || !name || !tax){
        return res.status(404).json({
           success:false,
           message:"please provide required information",
        })
    }
    const cart=await Cart.findOne({name});
    if(cart){
        cart.items.push({name:productName,price,weight,quantity,weightInBill,tax,category});
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

async function deleteCartItems(req,res){
    try{
        const {name}=req.params;
        if(!name){
            return res.status(404).json({
                success:false,
                message:"please provide name of the cart",
            })
        }

        const cart=await Cart.findOne({name});
        if(!cart){
            return res.status(404).json({
                success:false,
                message:`unable to cart of ${name}`
            })
        }
        cart.items=[];
        await cart.save();

        return res.status(201).json({
            success:true,
            message:"cart items deleted successfully",
        })

     
    }catch(error){
        return res.json({
            success:false,
            message:"unable to delete cart Items",
        })
    }
}

async function deleteItem(req,res){
    try{
        const {productName,price,quantity,weight}=req.body;
        const {name}=req.params;
        if(!productName || !price || !quantity || !weight || !name){
            return res.status(404).json({
               success:false,
               message:"please provide required information",
            })
        }
        const cart=await Cart.findOne({name});
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
        const {name}=req.params;
        if(!productName || !price || !updatedQuantity || !weight || !name){
            return res.status(404).json({
               success:false,
               message:"please provide required information",
            })
        }
        const cart=await Cart.findOne({name});

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
    let totalCount=cart.items.length;
    for(i=0;i<cart.items.length;i++){
        totalPrice=totalPrice+(cart.items[i].price*cart.items[i].quantity);
    }
    return res.status(201).json({
        success:true,
        totalPrice,
        totalCount,
        items:cart.items,

        name:cart.name
    })
}

module.exports={
    createCart,
    addToCart,
    deleteItem,
    updateQuantity,
    getCart,
    deleteCartItems
}

