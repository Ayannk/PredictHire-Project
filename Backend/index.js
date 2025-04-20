const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const resumeRoutes = require('./routers/resumeRouter');
const userRouter = require('./routers/userRouter')

require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use('/api/resume', resumeRoutes);
app.use('/user', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
