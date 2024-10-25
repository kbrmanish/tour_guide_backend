const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/auth');

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers'],
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRoutes);

const PORT =  process.env.PORT

app.listen(PORT, () => {
  console.log("Server running on http://localhost:"+PORT);
});
