const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const app = express();
const router = require('./router/index');
const userRouter = require('./router/userRoute');
const authRouter = require('./router/authRoute');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path'); // Import the path module  <---- Add this line
const messageRoute = require('./router/messageRoute');
const eventRouter = require('./router/eventRoute')
const bookRoutes = require('./router/bookRoute')

dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5005;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.options('*', cors());

app.use('/blogs', router);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/messages', messageRoute);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Now path is defined
// app.use("/events", eventRouter);
app.use('/books', bookRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.post('/auth/google', async (req, res) => {
  console.log('Google Auth request received:', req.body);
  res.json({ message: 'Google Auth route işləyir' });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected!');
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  });

module.exports = admin;