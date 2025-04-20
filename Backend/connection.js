const mongoose = require('mongoose');
require("dotenv").config();

const url = process.env.MONGO_URI;

mongoose.connect(url)
    .then((result) => {
        console.log("Conntected to the database");
    }).catch((err) => {
        console.log(err);

    });

module.exports = mongoose;