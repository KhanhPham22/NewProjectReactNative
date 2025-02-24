import mongoose, { Schema } from "mongoose";
import { ProductParams } from "../dto/Product";
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: [
      {
        type: String,
        require: true,
      },
    ],
    price: {
      type: Number,
    },
    oldPrice: {
      type: Number,
    },
    description: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
      min: 0,
      max: 9999,
    },
    inStock: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
const PRODUCTS = mongoose.model<ProductParams>("products", ProductSchema);
export { PRODUCTS };
