import products from '../../public/static/products.json';
import connectDB from '../../utils/connectDb';

connectDB();

export default (req, res) => {
  res.status(200).json(products);
};
