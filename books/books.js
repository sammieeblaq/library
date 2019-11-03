const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/booksservices", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const Book = require("./Book");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
	res.send("This is our main endpoint");
});

// Create Functionalliy
app.post("/book", (req, res) => {
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		numberPages: req.body.numberPages,
		publisher: req.body.publisher
	})
	book.save()
		.then(() => {
			console.info(book)
			// console.log(`new book created`)
		}).catch((err) => {
			if (err) {
				throw err;
			}
		});
		res.status(201).json({
			"message": "new book created"
		});
});

app.get("/books", (req, res) => {
	Book.find()
		.select(" title author numberPages publisher ")
		.exec()
		.then(book => res.status(200).json(book))
		.catch(err => {
			if (error) {
				throw error;
			}
		})
});

app.get("/books/:id", (req, res) => {
	const id = req.params.id;
	Book.findById(id)
		.select(" title author numberPages publisher ")
		.exec()
		.then(book => {
			if (book) {
				res.status(201).json(book);
			}
			else {
				res.sendStatus(404);
			}
		})
		.catch(error => {
			if (error) {
				throw error;
			}
		})
});

// app.put("/books/:id", (req, res) => {
// 	const { id } = req.params.id;
// 	Book.update()
// });

app.delete("/books/:id", (req, res) => {
	const id = req.params.id;
	Book.findOneAndDelete(id)
		.exec()
		.then(() => {
			res.status(200).json({
				message: "Book Removed without error"
			});
		})
		.catch(err => {
			if (err) {
				throw err;
			}
		})
});

app.listen(3000, () => {
	console.log(`This is our Books service`);
});