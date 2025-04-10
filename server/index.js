const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const summaryRoutes = require('./routes/summary'); // ✅ NEW

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes); // ✅ NEW

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
