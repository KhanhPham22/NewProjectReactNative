import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getAllProducts,
  getProductbyCatID,
  getProductByID,
  getFeaturedProducts,
} from "../Controllers";
import {
  deleteProduct,
  updateProduct,
} from "../Controllers/ProductControllers";

const router = express.Router();
const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const images = multer({ storage: imagesStorage }).array(`images`);

router.post(`/createProduct`, images, createProduct);
router.get(`/getProductByCatID/:CatID`, getProductbyCatID);
router.get(`/getProductByID/:id`, getProductByID);
router.get(`/getAllProducts`, getAllProducts);
router.put("/updateProduct/:id", images, updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getFeaturedProducts/:CatID", getFeaturedProducts);

export { router as ProductRoute };
