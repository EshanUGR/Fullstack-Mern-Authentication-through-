import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'
import bodyParser from 'body-parser';

dotenv.config();
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended
  :true
}))

app.listen(4000,()=>
{
  console.log('Server listening on port 4000!');


})

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use('/api/user',userRoutes);

app.use("/api/auth",authRoutes)


app.use((err,req,res,next)=>
{
  const statusCode=err.statusCode || 500;

  const message=err.message ||'Internal Server Error';

  return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
  })
})


