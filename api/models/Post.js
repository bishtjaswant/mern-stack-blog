const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    postImage: {
        type: String,
        required: false,
        default: "no-image"
    },

    timestamp: {
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model("Post", postSchema);