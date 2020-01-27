import jwt from 'jsonwebtoken';
import connectDB from '../../utils/connectDb';
import Order from '../../models/Order';

connectDB();

export default async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'products.product',
        model: 'Product',
      });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(402).send('Please login again');
  }
};
