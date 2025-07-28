const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./connection');
const salePointRouter = require('./routes/salePointRoutes');

//security packages
const helmet = require('helmet');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');

const notFound = require('./utils/notFound');
const errorHandler = require('./controllers/errorController');

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api/v1/salepoints', salePointRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    //Database
    await connectDB(
      process.env.MONGODB_URL.replace('<<PASSWORD>>', process.env.DBPASSWORD)
    );
    console.log('Databse is connected');

    //Server
    app.listen(PORT, () => {
      console.log(`Server  is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
