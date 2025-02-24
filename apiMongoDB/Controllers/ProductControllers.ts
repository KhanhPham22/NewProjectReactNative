import { error } from "console";
import { getAllCategories } from "./CategoryControllers";
import express, { Request, Response } from "express";
import { PRODUCTS } from "../Models/ProductModel";
import { ProductParams, UpdateProduct } from "../dto/Product";

const path = "http://localhost:8000/assets/";

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    price,
    oldPrice,
    description,
    quantity,
    inStock,
    isFeatured,
    category,
  } = <ProductParams>req.body;

  const files = req.files as [Express.Multer.File];
  const images = files.map((file: Express.Multer.File) => path + file.filename);

  const product = new PRODUCTS({
    name: name,
    images: images,
    price,
    oldPrice,
    description,
    quantity,
    inStock,
    isFeatured,
    category,
  });

  try {
    console.log(product);
    await product.save();
    res.status(200).json(`Product create successfully :-) + ${path}!!!`);
  } catch (error) {
    res.status(500).json(`Failed to create Product ${error} :-( `);
  }
};
export const getProductbyCatID = async (req: Request, res: Response) => {
  console.log(req.params.CatID);
  try {
    const result = await PRODUCTS.find({ category: req.params.CatID });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`ProductByID fetch failed ${err}:-(`);
  }
};

export const getProductByID = async (req: Request, res: Response) => {
  try {
    const result = await PRODUCTS.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Product fetch failed ${err} :-(`);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await PRODUCTS.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Products not found ${err}`);
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  const {
    name,
    category,
    description,
    inStock,
    isFeatured,
    oldPrice,
    price,
    quantity,
  } = <UpdateProduct>req.body;
  const files = req.files as Express.Multer.File[];
  const path = "http://localhost:8000/assets/";

  if (files) {
    const images = files.map((file) => `${path}${file.filename}`);
    try {
      const catUpdate = await PRODUCTS.findByIdAndUpdate(req.params.id, {
        name: name,
        category: category,
        description: description,
        inStock: inStock,
        isFeatured: isFeatured,
        oldPrice: oldPrice,
        price: price,
        quantity: quantity,
      });
      res.status(200).json(` Product updated succesfilly`);
    } catch (err) {
      res.status(500).json(`The Product cannot be updated ${err}`);
    }
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await PRODUCTS.findByIdAndDelete(req.params.id);

    res.status(200).json("Product removed succesfully");
  } catch (err) {
    res.status(500).json(`Product delete failed ${err}`);
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  const { CatID } = req.params;
  try {
    const result = await PRODUCTS.find({
      category: CatID,
      isFeatured: true,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Failed to fetch featured products: ${err}`);
  }
};
