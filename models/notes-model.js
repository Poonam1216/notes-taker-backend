const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdTime: {
        type: String,
        default: function () {
            const formatedDate = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
            return formatedDate;
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

module.exports = mongoose.model("notes", notesSchema)