import { Product } from "../model/productModel.js";

export const getProducts = async (req, res) => {
    try {
       const product = await Product.find({})
        res.status(200).json({success: true, allProduct : product})
    } catch (error) {
        res.status(500).json({success : false, message :"Internal sever error"})
        console.log(`Error in getAll product controller`)
    }
};

export const addProducts = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.img) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(`Error in addProduct controller`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params
   try {
    const product =  await Product.findByIdAndDelete(id)
    res.status(200).json({success : true, message : "successfully deleted", deleted : product})
   } catch (error) {
        res.status(500).json({success : false,  message : "Product not found"})
        console.log(`Error in deleteProduct controller`)
   }
};

export const updateProduct = async (req,res) => {
    const {id} = req.params
    const product = req.body
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product)
        res.status(200).json({success :true, message : "Updated successfully", Updated : updatedProduct})
    } catch (error) {
        res.status(500).json({success : false, message :"Internal server error"})
        console.log(`Error in updatedProduct controller`)
    }
} 