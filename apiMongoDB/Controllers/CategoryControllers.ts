import express, { Request, Response } from "express";
import { CATEGORIES } from "../Models/CategoryModel";
import multer from "multer";
import { CategoryObj, UpdateCategory } from "../dto/Categories";
import { error } from "console";

const path = "http://localhost:8000/assets/"; // Đường dẫn lưu ảnh


export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const files = req.files as [Express.Multer.File];
  const images = files.map((file:Express.Multer.File) => path + file.filename);

  const category = new CATEGORIES({
    name: name,
    images: images,
  });

  try {
    console.log(category);
    await category.save();
    res.status(200).json({ message: "Category created successfully!", data: category });
  } catch (error) {
    res.status(500).json({ message: `Failed to create Category`, error });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const result = await CATEGORIES.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Category fetch failed ${err}:=(`);
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CATEGORIES.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Category not found ${err} : -(`);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name } = <UpdateCategory>req.body;
  const files = req.files as Express.Multer.File[];
  const path = "http://localhost:8000/assets/";

  if (files) {
    const images = files.map((file) => `${path}${file.filename}`);
    try {
      const catUpdate = await CATEGORIES.findByIdAndUpdate(req.params.id, {
        name: name,
      });
      res.status(200).json(` category updated succesfilly`);
    } catch (err) {
      res.status(500).json(`The category cannot be updated ${err}`);
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await CATEGORIES.findByIdAndDelete(req.params.id);

    res.status(200).json("Category removed succesfully");
  } catch (err) {
    res.status(500).json(`Category delete failed ${err}`);
  }
};
