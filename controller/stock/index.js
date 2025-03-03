const Stock = require("../../model/stock_model");
const schedule = require("node-schedule");
async function addProductToStock(req, res) {
  const {
    productName,
    current_stock,
    minimum_stock_signal,
    unit,
    varients,
    product_varients,
  } = req.body;
  console.log(req.body);
  if (
    !productName ||
    !current_stock ||
    !minimum_stock_signal ||
    !unit ||
    !varients
  ) {
    return res.status(404).json({
      success: false,
      message: "please provide required information",
    });
  }

  const isStockOfProductAdded = await Stock.create({
    name: productName,
    current_stock,
    minimum_stock_signal,
    today_start_stock: current_stock,
    unit,
    varients,
    product_varients,
  });
  if (isStockOfProductAdded) {
    return res.status(201).json({
      success: true,
      message: "stock of product added successfully",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "unable to add stock of product",
    });
  }
}
async function findMinimalStock(req, res) {
  try {
    /*
    await Stock.find({
      $expr: { $lte: ["$current_stock", "$minimum_stock_signal"] }, // Compare weight and minimum fields
    });
    */
    console.log("he");

    const products = await Stock.find({}); // Fetch all products

    // Filter products based on the criteria
    const lowStockItems = [];
    products.map((product) => {
      if (product.varients == "true") {
        product.product_varients.map((varient) => {
          if (varient.current_stock <= varient.minimum_stock_signal) {
            lowStockItems.push({
              name: product.name,
              current_stock: varient.current_stock,
              weightOfProduct: varient.weightOfProduct,
            });
          }
        });
      } else {
        if (product.current_stock <= product.minimum_stock_signal) {
          lowStockItems.push({
            name: product.name,
            current_stock: product.current_stock,
          });
        }
      }
    });

    if (!lowStockItems) {
      console.log("wj");
      return res.status(404).json({
        success: false,
        message: "unable to find stock with minimum wieghts due to db issue",
      });
    }
    if (lowStockItems.length == 0) {
      return res.status(201).json({
        success: false,
        message: "all items are with required stock",
      });
    }

    if (lowStockItems.length > 0) {
      return res.status(201).json({
        success: true,
        lowStockItems,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

async function findStockOfGivenProduct(req, res) {
  const { name } = req.params;
  const stockOfProduct = await Stock.findOne({ name });
  if (stockOfProduct) {
    return res.status(201).json({
      success: true,
      stockOfProduct,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "unable to find stock of product",
    });
  }
}

async function updateStockOfProducts(req, res) {
  /*
     for (const product of products) {
    // Find the stock item by name and update its weight
    const updatedStock = await Stock.findOneAndUpdate(
      { name: product.name }, // Match by name
      { $inc: { current_stock: -product.weight } }, // Decrease weight
      { new: true } // Return the updated document
    );
    console.log(updatedStock);
    if (!updatedStock) {
      return res.status(404).json({
        success: false,
        message: "unable to update stock due to db related issue",
      });
    }
  }

  return res.status(201).json({
    success: true,
    message: "updated stock successfully",
  });
    */

  try {
    const { products } = req.body;

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "please provide products to update stock",
      });
    }

    for (const product of products) {
      const stock_product = await Stock.findOne({ name: product.name });
      if (!stock_product) {
        console.log("coudnt found product");
        continue;
      }
      if (stock_product.varients === "true") {
        // Loop through product variants and update stock
        await Stock.updateOne(
          {
            name: product.name,
            product_varients: {
              $elemMatch: { weightOfProduct: product.weight }, // Explicitly match the variant by weight
            },
          },
          {
            $inc: {
              "product_varients.$.current_stock": -(
                product.weight * product.quantity
              ),
            }, // Deduct quantity from the variant's stock
          }
        );
      } else {
        // Update main product's stock
        await Stock.updateOne(
          { name: product.name },
          { $inc: { current_stock: -(product.weight * product.quantity) } }
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: "stock updated Successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

async function findTodayStockConsumption(req, res) {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(404).json({
        success: false,
        message: "please provide name of product",
      });
    }

    const product = await Stock.findOne({ name });
    console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "unable to find product",
      });
    }

    const NetProductConsumption =
      product.today_start_stock - product.current_stock;

    return res.status(201).json({
      success: true,
      NetProductConsumption,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

async function updateTodayStartStock(req, res) {
  await Stock.updateMany({ varients: "false" }, [
    { $set: { today_start_stock: "$current_stock" } },
  ]);

  return res.status(201).json({
    success: true,
    message: "updated today_start_stock to its initial state",
  });
}

async function getAllStocks(req, res) {
  const product_stocks = await Stock.find({});
  return res.status(201).json({
    success: true,
    product_stocks,
  });
}

async function assignStock(req, res) {
  try {
    const { name, varients, weightOfProduct, updated_stock_value } = req.body;
    //console.log(typeof updated_stock_value,varients)
    if (!name || !varients || !weightOfProduct || !updated_stock_value) {
      return res.status(404).json({
        success: false,
        message: "Please provide all information to server",
      });
    }
    if (varients == "false") {
      const isProductStockUpdated = await Stock.updateOne(
        {
          name,
        },
        [{ $set: { current_stock: Number(updated_stock_value),today_start_stock:updated_stock_value } }]
      );
      if (isProductStockUpdated) {
       
        return res.status(201).json({
          success: true,
          message: "stock updated successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "unable to update stock in server",
        });
      }
    } else {
      const isProductStockUpdated = await Stock.updateOne(
        {
          name,
          "product_varients.weightOfProduct": weightOfProduct,
        },
        {
          $set: {
            "product_varients.$.current_stock": updated_stock_value,
            
          },
        }
      );

      if (isProductStockUpdated) {
        return res.status(201).json({
          success: true,
          message: "stock updated successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "unable to update stock in server",
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

module.exports = {
  findMinimalStock,
  findStockOfGivenProduct,
  updateStockOfProducts,
  addProductToStock,
  findTodayStockConsumption,
  updateTodayStartStock,
  getAllStocks,
  assignStock

};
