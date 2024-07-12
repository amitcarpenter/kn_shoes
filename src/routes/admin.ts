import express from "express";
import { uploadProductImages } from "../services/uploadImage"
//==================================== Import Controller ==============================

import * as productControllers from "../controllers/admin/productController";


const router = express.Router();

//==================================== User ==============================
router.get("/add-product", productControllers.getAddProduct)
router.post("/add-product", uploadProductImages, productControllers.addProduct)


export default router;