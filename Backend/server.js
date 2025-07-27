const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Route imports
const authRoutes = require('./routes/auth');
const JobsRouter = require('./routes/jobs');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// ✅ CORS Setup (before routes!)
const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,
};
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json());

// ✅ Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/jobs', JobsRouter);

// Root sanity check
app.get('/', (req, res) => {
  res.send('Sasefield API is running 🏃‍♂️💨');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
