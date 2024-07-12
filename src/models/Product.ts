import mongoose, { Schema, Document } from 'mongoose';

// Define the enum types
enum ProductType {
  Slipper = 'Slipper',
  Slide = 'Slide',
  Crocs = 'Crocs',
  FlipFlop = 'Flip Flop',
  Walker = 'Walker',
  Shoes = 'Shoes'
}

enum Category {
  Men = 'Men',
  Women = 'Women',
  Kids = 'Kids'
}

enum Color {
  Black = 'Black',
  White = 'White',
  Red = 'Red',
  Other = 'Other'
}

enum Brand {
  Campus = 'Campus',
  Sparx = 'Sparx',
  Lakhani = 'Lakhani',
  Touch = 'Touch',
  Abros = 'Abros',
  Addoxy = 'Addoxy',
  Trv = 'TRV',
  Nike = 'Nike',
  Puma = 'Puma',
  Adidas = 'Adidas',
  Asics = 'Asics',
  VkcPride = 'VKC Pride',
  Walkaro = 'Walkaro',
  Paragon = 'Paragon',
  Indus = 'Indus',
  IPlus = 'I Plus',
  LooseChappal = 'Loose Chappal',
  NonBrandOther = 'Non Brand Other',
  Appoxy = 'Appoxy',
  SkyGold = 'Sky Gold',
  FlyMax = 'Fly Max'
}

enum PaymentMethod {
  Online = 'Online',
  Cash = 'Cash',
}

// Define the interface for the document
export interface IProduct extends Document {
  product_name: string;
  product_type: ProductType;
  category: Category;
  size: string | number;
  color: Color;
  salePrice: number;
  costPrice: number;
  profitPercentage: number | any;
  customer_name: string;
  cashAmount: number;
  dueAmount: number;
  quantity: number;
  description: string;
  brand: Brand;
  payment_method: PaymentMethod;
  profitMargin: number;
  product_image: string[];
}

// Create the schema
const ProductSchema: Schema = new Schema({
  product_name: { type: String },
  product_type: { type: String, enum: Object.values(ProductType), },
  category: { type: String, enum: Object.values(Category), },
  size: { type: Schema.Types.Mixed, },
  color: { type: String, enum: Object.values(Color), },
  salePrice: { type: Number, },
  costPrice: { type: Number, },
  profitPercentage: { type: Number || String, default: 0 },
  customer_name: { type: String, },
  cashAmount: { type: Number, },
  dueAmount: { type: Number, default: 0 },
  quantity: { type: Number, },
  description: { type: String },
  brand: { type: String, enum: Object.values(Brand), },
  payment_method: { type: String, enum: Object.values(PaymentMethod), },
  profitMargin: { type: Number, },
  product_image: [{ type: String }]
});

// Create and export the model
export default mongoose.model<IProduct>('Product', ProductSchema);
