import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connectDB from '../../utils/connectDb';
import User from '../../models/User';

export default async (req, res) => {
  try {
    await connectDB();

    switch (req.method) {
      case 'GET':
        await handleGetRequest(req, res);
        break;
      case 'PUT':
        await handlePutRequest(req, res);
        break;
      default:
        res.status(405).send(`Method ${req.method} not allowed`);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to server');
  }
};

const handleGetRequest = async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};

const handlePutRequest = async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
  );

  const { _id, role, passwords } = req.body;

  try {
    if (role) {
      await User.findByIdAndUpdate({ _id }, { role });
      res.status(203).send('User updated');
    } else if (passwords) {
      const { currentPassword, newPassword } = passwords;
      const user = await User.findOne({ _id: userId }).select('+password');
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).send('Check the current password');
      }
      if (currentPassword === newPassword) {
        return res
          .status(400)
          .send('New password must be different than current password');
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.status(203).send('Password updated');
    }
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};
