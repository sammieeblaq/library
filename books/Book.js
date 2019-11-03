const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	title: { type: String, require: true },
	author: { type: String, require: true },
	numberPages: { type: Number, require: false },
	publisher: { type: String, require: false }
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;