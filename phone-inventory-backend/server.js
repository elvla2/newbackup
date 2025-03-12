const express = require('express');
const cors = require('cors');
require('dotenv').config();

const phoneRoutes = require('./routes/phones');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/phones', phoneRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
