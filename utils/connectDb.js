import mongoose from 'mongoose';

const connection = {};

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('Using existing DB connection');
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
