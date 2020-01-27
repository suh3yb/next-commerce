import Product from '../../models/Product';
import connectDB from '../../utils/connectDb';

export default async (req, res) => {
  try {
    await connectDB();

    const { page, size } = req.query;
    const pageNum = Number(page);
    const pageSize = Number(size);
    let products = [];
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);
    if (pageNum === 1) {
      products = await Product.find().limit(pageSize);
    } else {
      const skips = pageSize * (pageNum - 1);
      products = await Product.find()
        .skip(skips)
        .limit(pageSize);
    }
    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error in getting products');
  }
};
