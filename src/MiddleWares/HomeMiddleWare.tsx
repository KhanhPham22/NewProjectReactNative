import React from "react";
import { FetchProductsParam, ProductListParams } from "../TypesCheck/HomeProps";
import axios from "axios";

interface ICatProps {
  setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface IProdByCatProps {
  catID: string;
  setGetProductsByCatID: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
}

export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
  try {
    const response = await axios.get(
      "http://10.106.22.244:8000/category/getAllCategory"
    );
    console.log("API Response:", response.data);

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.106.22.244")
        ),
      }));
      setGetCategory(fixedData);
    } else {
      console.warn(
        "fetchCategories: Dữ liệu API không phải là mảng",
        response.data
      );
      setGetCategory([]);
    }
  } catch (err: any) {
    console.error("Axios GET error:", err);
    if (err.response) {
      console.error("Response Data:", err.response.data);
      console.error("Response Status:", err.response.status);
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {
      console.error("Error setting up request:", err.message);
    }
    setGetCategory([]);
  }
};

export const fetchProductsByCatID = async ({
  setGetProductsByCatID,
  catID,
}: IProdByCatProps) => {
  try {
    const response: FetchProductsParam = await axios.get(
      `http://10.106.22.244:8000/product/getProductByCatID/${catID}`
    );
    console.log("API Response:", response.data);
    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.106.22.244")
        ),
      }));
      setGetProductsByCatID(fixedData);
    } else {
      console.warn(
        "fetchProductsByCatID: Dữ liệu API không phải là mảng",
        response.data
      );
    }
  } catch (err) {
    console.log("axios get error", err);
    setGetProductsByCatID([]);
  }
};

export const fetchFeaturedProducts = async ({
  setGetFeaturedProducts,
  catID, // Add catID as a parameter
}: {
  setGetFeaturedProducts: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
  catID: string; // Define the type for catID
}) => {
  try {
    const response: FetchProductsParam = await axios.get(
      `http://10.106.22.244:8000/product/getFeaturedProducts/${catID}` // Include catID in the URL
    );
    console.log("API Response:", response.data); // Log the response data
    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.106.22.244")
        ),
      }));
      setGetFeaturedProducts(fixedData);
    } else {
      console.warn(
        "fetchFeaturedProducts: Dữ liệu API không phải là mảng",
        response.data
      );
      setGetFeaturedProducts([]);
    }
  } catch (err) {
    console.log("axios get error", err);
    setGetFeaturedProducts([]);
  }
};
