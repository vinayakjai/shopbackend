const Product = require("../model");
const products = require("../products");

async function createProduct(req, res) {
  try {
    const productInfo = req.body;
    //console.log(productInfo);

    const isProductCreated = await Product.create(productInfo);
    if (isProductCreated) {
      return res.json({
        message: "product created successfully",
      });
    } else {
      return res.json({
        message: "unable to create product",
      });
    }
  } catch (error) {
    // console.log("error in create product controller", error);
    return res.json({
      message: "some error occurred",
      error,
    });
  }
}

async function searchProductInfo(req, res) {
  const productName = req.params.name;
  console.log("----name", productName);
  const productInfo = await Product.findOne({ name: `${productName}` });
  console.log("info--<>", productInfo);
  return res.json({
    message: productInfo,
  });
}

async function searchProductName(req, res) {
  const productName = req.query.name;

  const productNames = await Product.find(
    { name: { $regex: `${productName}`, $options: "i" } },
    { name: 1 }
  );
  // console.log(productNames);

  return res.json({
    names: productNames,
  });
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    if (products) {
      return res.json({
        products,
      });
    } else {
      return res.json({
        message: "cannot load all products due to some error",
      });
    }
  } catch (error) {
    return res.json({
      message: "some error occurred",
      error,
    });
  }
}

async function updateNameOfProduct(req, res) {
  try {
    const updatedName = req.body.updatedName;
    const nameToBeUpdated = req.params.nameToBeUpdated;
    console.log(updatedName, nameToBeUpdated);
    if (!updatedName || !nameToBeUpdated) {
      res.json({
        message: "please provide required information",
      });
    } else {
      const isUpdated = await Product.updateOne(
        { name: nameToBeUpdated },
        { $set: { name: updatedName } }
      );
      console.log(isUpdated);
      if (isUpdated) {
        return res.json({
          message: "product name successfully updated",
        });
      } else {
        return res.json({
          message: "unable to update name of the product",
        });
      }
    }
  } catch (error) {
    return res.json({
      message: "some error occurred",
      error,
    });
  }
}

async function updatePurchaseRate(req, res) {
  try {
    let { purchaseRate, productName } = req.body;

    if (!purchaseRate || !productName) {
      return res.json({
        message: "please provide purchase rate and product name",
      });
    }
    console.log(purchaseRate, productName);

    const isProductAvailable = await Product.findOne({ name: productName });
    if (isProductAvailable) {
      if (purchaseRate == "null") {
        purchaseRate = null;
      }
      const isUpdated = await Product.updateOne(
        { name: productName },
        { $set: { purchaseRate } }
      );
      console.log(isUpdated);
      if (isUpdated) {
        return res.json({
          message: "purchase rate of product is updated successfully",
        });
      } else {
        return res.json({
          message: "unable to update purchase rate of the product",
        });
      }
    } else {
      return res.json({
        message: "Product not available",
      });
    }
  } catch (error) {
    return res.json({
      message: "some error occurred",
      error,
    });
  }
}

async function updateMinimum_Sel_Rate(req, res) {
  try {
    let { minimum_sell_rate, productName } = req.body;

    if (!minimum_sell_rate || !productName) {
      return res.json({
        message: "please provide purchase rate and product name",
      });
    }
    console.log(minimum_sell_rate, productName);

    const isProductAvailable = await Product.findOne({ name: productName });
    if (isProductAvailable) {
      if (minimum_sell_rate == "null") {
        purchaseRate = null;
      }
      const isUpdated = await Product.updateOne(
        { name: productName },
        { $set: { minimum_sell_rate } }
      );
      console.log(isUpdated);
      if (isUpdated) {
        return res.json({
          message: "minimum sell rate of product is updated successfully",
        });
      } else {
        return res.json({
          message: "unable to update minimum sell rate of the product",
        });
      }
    } else {
      return res.json({
        message: "Product not available",
      });
    }
  } catch (error) {
    return res.json({
      message: "some error occurred",
      error,
    });
  }
}

async function addNewWeightItemOgGivenProduct(req, res) {
  try {
    const { productName, weight, price } = req.body;
    if (!productName || !weight || !price) {
      return res.json({
        message: "please provide required information",
      });
    }
    const isAdded = await Product.updateOne(
      { name: productName },
      { $push: { info: { weight, price } } }
    );
    if (isAdded) {
      return res.json({
        message: "new packet of product added successfully",
      });
    } else {
      return res.json({
        message: "unable to add packet due to database related issue",
      });
    }
  } catch (error) {
    return res.json({
      message: "unable to update price",
      error,
    });
  }
}

async function updatePriceOfGivenWeight(req, res) {
  try {
    const { productName, weight, updatedPrice } = req.body;
    if (!productName || !weight || !updatedPrice) {
      return res.json({
        message: "please provide required information",
      });
    }
    const isUpdated = await Product.updateOne(
      { name: productName, "info.weight": weight }, // Filter condition
      { $set: { "info.$.price": updatedPrice } }        // Update operation
  );
  console.log(isUpdated)
    if (isUpdated) {
      return res.json({
        message: `price of product  of weight:${weight} updated successfully`,
      });
    } else {
      return res.json({
        message: `unable to price of product  of weight:${weight} due to database issue`,
      });
    }
  } catch (error) {
    return res.json({
      message: "unable to update price",
      error,
    });
  }
}


module.exports = {
  createProduct,
  searchProductInfo,
  searchProductName,
  getAllProducts,
  updateNameOfProduct,
  updatePurchaseRate,
  updateMinimum_Sel_Rate,
  addNewWeightItemOgGivenProduct,
  updatePriceOfGivenWeight,
 
};
