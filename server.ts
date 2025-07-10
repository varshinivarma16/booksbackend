import express from 'express';
import mongoose from 'mongoose';
import reviewRoutes from './routes/hospital/hospitalroutes';
import loginroutes from './routes/hospital/login'; // ✅ adjust path as needed
import productToolRoutes from './routes/stocks/stockroutes';
import doctorreview from './routes/hospital/doctorreview';
import schedule from './routes/education/schedule';
import document from './routes/education/document';
import  bmi from './fitness/routes/bmi'; 
import clothing from './clothing/routes/navigationcateogry';
import ecommerce from './E-Commerce/routes/payment';
import homepage from './bookstore/routes/homepage';
import stockroutes from './Stocks/routes/stockroutes';
import teacher from './Education/routes/teacher';
import content from './bookstore/routes/content';
import category from './bookstore/routes/category';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/hospital', reviewRoutes);
app.use('/api/login', loginroutes);
app.use('/api/producttools', productToolRoutes);
app.use('/api/doctorreview', doctorreview);
app.use('/api/schedule', schedule);
app.use('/api/document', document);
app.use('/api/fitness', bmi);
app.use('/api/clothing', clothing);
app.use('/api/ecommerce', ecommerce);
app.use('/api/bookstore', homepage);
app.use('/api/bookstore/content', content);
app.use('/api/bookstore/category', category);
app.use('/api/stocks',stockroutes);
app.use('/api/education',teacher);

const MONGO_URI = process.env.MONGO_URI!;
console.log("Connecting to:", MONGO_URI);

mongoose.set('strictQuery', true); // optional but safe
mongoose.connect(MONGO_URI, { dbName: "goldData" })
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = parseInt(process.env.PORT || '3000', 10);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });