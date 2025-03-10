const CustomerInfo = require("../../model/customer_info");

async function addCustomerInfo(req, res) {
  try {
    const { name, sodexo } = req.body;
    if (!name || !sodexo) {
      return res.status(404).json({
        success: false,
        message: "please provide name and sodexo",
      });
    }
    const addinfo = await CustomerInfo.create(req.body);
    if (!addinfo) {
      return res.status(404).json({
        success: false,
        message: "unable to add customer info in db",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "customer information added successfully",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}
async function getCustomerInfo(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({
        success: false,
        message: "please enter customer name and product name",
      });
    }

    const getInfo = await CustomerInfo.findOne({ name });
    if (!getInfo) {
      return res.status(404).json({
        success: false,
        message: "unable to fetch customer information from database",
      });
    } else {
      return res.status(201).json({
        success: true,
        getInfo,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

async function save_customer_info(req, res) {
  try {
    const { name, customer_products } = req.body;
    console.log(name, customer_products);
    if (!name || !customer_products) {
      return res.status(404).json({
        success: false,
        message: "please provide name and products of customer",
      });
    }
    let customerInfo = await CustomerInfo.findOne({ name });
    //["kaju 200" "pushp achar"]
    
    if (customerInfo.products.length == 0) {
      console.log("here");
      
      customer_products.map((product)=>{
        customerInfo.products.push(product);
      })
      await customerInfo.save();
 
      return res.status(201).json({
        success: true,
        message: "customer information saved successfully",
      });
    } else {
      let merged_array = [...customerInfo.products, ...customer_products]; //atpresent not unique
      let unique_array=[...new Set(merged_array)]
      customerInfo.products=[];
      unique_array.map((product)=>{
        customerInfo.products.push(product);
      })
      await customerInfo.save();
    
    

     
      return res.status(201).json({
        success: true,
        message: "customer information saved successfully",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

module.exports = {
  addCustomerInfo,
  getCustomerInfo,
  save_customer_info,
};
