const mongoose = require('mongoose');

 async function connectDB() {

    try {
        const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.noxnu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        await mongoose.connect(url);
         console.log("connected to  mongodb")
    } catch (error) {
        console.log(error)
    }

};

module.exports = connectDB;