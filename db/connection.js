const mongoose = require("mongoose");

const conn = () => {
    mongoose.connect(process.env.DATABASE_URI).then(res => {
        console.log("connected")
    }).catch((err) => {
        console.log(err)
    })
}
module.exports = conn;