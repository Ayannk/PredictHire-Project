const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const resumeRoutes = require('./routers/resumeRouter');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');

require("dotenv").config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
