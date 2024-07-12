import { Request, Response } from "express";
import Product, { IProduct } from "../../models/Product";
import { handleError } from "../../utils/errorHandle";
import Joi from "joi";
import { deleteImageFile } from "../../services/deleteImages";
import { sendEmail } from "../../services/otpService";
import { uploadProductImages } from "../../services/uploadImage"

const APP_URL = process.env.APP_URL as string;



interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

// export const addProduct = async (req: Request, res: Response) => {
//   try {
//     const {
//       product_name,
//       product_type,
//       category,
//       size,
//       color,
//       salePrice,
//       costPrice,
//       discountPercentage,
//       customer_name,
//       cashAmount,
//       dueAmount,
//       quantity,
//       description,
//       brand,
//       payment_method,
//       profitMargin,
//     } = req.body;


//     let product_images: string[] = [];

//     if ((req as MulterRequest).files && (req as MulterRequest).files.length > 0) {
//       product_images = (req as MulterRequest).files.map((file) => file.filename);
//     }

//     console.log("Request body:", req.body);
//     console.log("Uploaded files:", (req as MulterRequest).files);

//     // Create a new product instance
//     const newProduct = new Product({
//       product_name,
//       product_type,
//       category,
//       size,
//       color,
//       salePrice,
//       costPrice,
//       discountPercentage,
//       customer_name,
//       cashAmount,
//       dueAmount,
//       quantity,
//       description,
//       brand,
//       payment_method,
//       profitMargin,
//       product_image: product_images
//     });

//     const savedProduct = await newProduct.save();

//     // Send the success response
//     return res.status(200).json({
//       success: true,
//       status: 200,
//       message: "Product added successfully",
//       data: savedProduct
//     });

//   } catch (error) {
//     // Handle different types of errors
//     if (error instanceof Error) {
//       if (error.name === 'ValidationError') {
//         return res.status(400).json({
//           success: false,
//           status: 400,
//           message: "Validation Error",
//           data: error.message
//         });
//       }
//     }

//     // Generic error response
//     return res.status(500).json({
//       success: false,
//       status: 500,
//       message: "An error occurred while adding the product",
//       data: null
//     });
//   }
// };



// export const addProduct = async (req: Request, res: Response) => {
//   try {
//     const {
//       product_name,
//       product_type,
//       category,
//       size,
//       color,
//       salePrice,
//       costPrice,
//       customer_name,
//       cashAmount,
//       dueAmount,
//       quantity,
//       description,
//       brand,
//       payment_method,
//     } = req.body;

//     // Convert salePrice and costPrice to numbers
//     const salePriceNum = Number(salePrice);
//     const costPriceNum = Number(costPrice);


//     const profitMargin = salePriceNum - costPriceNum;
//     const profitAmount = salePriceNum - costPriceNum;
//     const profitPercentage = (profitAmount / costPriceNum) * 100;



//     console.log(profitPercentage, "profitPercentage")

//     let product_images: string[] = [];

//     if ((req as MulterRequest).files && (req as MulterRequest).files.length > 0) {
//       product_images = (req as MulterRequest).files.map((file) => file.filename);
//     }

//     console.log("Request body:", req.body);
//     console.log("Uploaded files:", (req as MulterRequest).files);

//     // Create a new product instance
//     const newProduct = new Product({
//       product_name,
//       product_type,
//       category,
//       size,
//       color,
//       salePrice: salePriceNum,
//       costPrice: costPriceNum,
//       profitPercentage: Math.max(0, profitPercentage.toFixed(2)),
//       customer_name,
//       cashAmount,
//       dueAmount,
//       quantity,
//       description,
//       brand,
//       payment_method,
//       profitMargin: profitMargin.toFixed(2),
//       product_image: product_images
//     });

//     const savedProduct = await newProduct.save();

//     // Send the success response
//     return res.status(200).json({
//       success: true,
//       status: 200,
//       message: "Product added successfully",
//       data: savedProduct
//     });

//   } catch (error) {
//     console.error("Error in addProduct:", error);

//     // Handle different types of errors
//     if (error instanceof Error) {
//       if (error.name === 'ValidationError') {
//         return res.status(400).json({
//           success: false,
//           status: 400,
//           message: "Validation Error",
//           data: error.message
//         });
//       }
//     }

//     // Generic error response
//     return res.status(500).json({
//       success: false,
//       status: 500,
//       message: "An error occurred while adding the product",
//       data: null
//     });
//   }
// };


export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      product_name,
      product_type,
      category,
      size,
      color,
      salePrice,
      costPrice,
      customer_name,
      cashAmount,
      quantity,
      description,
      brand,
      payment_method,
    } = req.body;
    const salePriceNum = parseFloat(salePrice);
    const costPriceNum = parseFloat(costPrice);

    if (isNaN(salePriceNum) || isNaN(costPriceNum)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid salePrice or costPrice",
        data: null
      });
    }
    const profitMargin = salePriceNum - costPriceNum;
    const profitPercentage = (profitMargin / costPriceNum) * 100;
    let product_images: string[] = [];

    if ((req as MulterRequest).files && (req as MulterRequest).files.length > 0) {
      product_images = (req as MulterRequest).files.map((file) => file.filename);
    }

    let dueAmount = Number(salePrice) - Number(cashAmount)

    const newProduct = new Product({
      product_name,
      product_type,
      category,
      size,
      color,
      salePrice: salePriceNum,
      costPrice: costPriceNum,
      profitPercentage: Math.max(0, parseFloat(profitPercentage.toFixed(2))),
      customer_name,
      cashAmount,
      dueAmount: dueAmount,
      quantity,
      description,
      brand,
      payment_method,
      profitMargin: profitMargin.toFixed(2),
      product_image: product_images
    });

    const savedProduct = await newProduct.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Product added successfully",
      data: savedProduct
    });

  } catch (error) {
    console.error("Error in addProduct:", error);


    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Validation Error",
          data: error.message
        });
      }
    }

    return res.status(500).json({
      success: false,
      status: 500,
      message: "An error occurred while adding the product",
      data: null
    });
  }
};


export const getAddProduct = (req: Request, res: Response) => {
  return  res.render("add-product.ejs")
}