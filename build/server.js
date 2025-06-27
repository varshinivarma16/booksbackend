"use strict";
const express = require('express');
const reviewRoutes = require('../../routes/figma/review');
const app = express();
app.use(express.json());
app.use('/api/reviews', reviewRoutes);
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`);
});
