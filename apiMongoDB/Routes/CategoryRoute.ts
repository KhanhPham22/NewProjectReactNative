import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../Controllers/CategoryControllers";
import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

const router = express.Router();
const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const images = multer({ storage: imagesStorage }).array("images");

router.post("/createCategory", images, createCategory);
router.get("/getCategory/:id", getCategory);
router.get("/getAllCategory", getAllCategories);
router.put("/updateCategory/:id", images, updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
export { router as CategoryRoute };
