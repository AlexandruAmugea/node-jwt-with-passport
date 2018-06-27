var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    text: {
      type: String,
      required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    publisher: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Article', ArticleSchema);