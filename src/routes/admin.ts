import express from "express";
import { uploadProductImages } from "../services/uploadImage";
//==================================== Import Controller ==============================

import * as productControllers from "../controllers/admin/productController";
import * as dashboardControllers from "../controllers/admin/dashboardController";

const router = express.Router();

//==================================== Product ==============================
router.get("/add-product", productControllers.getAddProduct);
router.post("/add-product", uploadProductImages, productControllers.addProduct);

//==================================== Dashboard ==============================
router.get("/dashboard", dashboardControllers.getSalesData);


export default router;
