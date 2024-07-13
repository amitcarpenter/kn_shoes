import Product from "../../models/Product";
import { Request, Response } from "express";

export const getSalesData = async (req: Request, res: Response) => {
  try {
    const salesOverTime = await Product.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$salePrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const salesByProductType = await Product.aggregate([
      { $group: { _id: "$product_type", totalSales: { $sum: "$salePrice" } } },
    ]);

    const salesByCategory = await Product.aggregate([
      { $group: { _id: "$category", totalSales: { $sum: "$salePrice" } } },
    ]);

    const salesByBrand = await Product.aggregate([
      { $group: { _id: "$brand", totalSales: { $sum: "$salePrice" } } },
    ]);

    const topSellingProducts = await Product.aggregate([
      {
        $group: { _id: "$product_name", totalQuantity: { $sum: "$quantity" } },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ]);

    const profitMargins = await Product.aggregate([
      {
        $project: {
          product_name: 1,
          profitMargin: { $subtract: ["$salePrice", "$costPrice"] },
        },
      },
    ]);

    const paymentMethods = await Product.aggregate([
      { $group: { _id: "$payment_method", count: { $sum: 1 } } },
    ]);

    console.log(
      salesOverTime,
      salesByProductType,
      salesByCategory,
      salesByBrand,
      topSellingProducts,
      profitMargins,
      paymentMethods
    );

    return res.render("dashboard.ejs", {
      salesOverTime,
      salesByProductType,
      salesByCategory,
      salesByBrand,
      topSellingProducts,
      profitMargins,
      paymentMethods,
    });
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};
