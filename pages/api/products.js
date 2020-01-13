import Product from '../../models/Product';
import connectDB from '../../utils/connectDb';

connectDB();

export default async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};
