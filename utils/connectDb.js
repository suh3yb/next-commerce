import mongoose from 'mongoose';

const connection = {};
let count = 0;

const connectDB = async () => {
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
  console.log('DB connected', ++count);
  connection.isConnected = db.connections[0].readyState;
};

export default connectDB;
