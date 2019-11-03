const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const axios = require("axios");

mongoose.connect("mongodb://localhost/orders-service", { useNewUrlParser: true });

const Order = require("./Order");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Creqte a new order
app.post("/order", (req, res) => {
	const order = new Order({ 
		CustomerID: mongoose.Schema.Types.ObjectId(req.body.CustomerID),
		BookID: mongoose.Schema.Types.ObjectId(req.body.BookID),
		InitialDate: req.body.InitialDate,
		DeliveryDate: req.body.DeliveryDate
	})
	order.save()
		.then(() =>
			res.status(200).json({ "message": "Order Created" }))
		.catch(err => {
			if (err) {
				throw err;
			}
		})
});

app.get("/orders", (req, res) => {
	Order.find()
		.select(" CustomerID BookID InitialDate DeliveryDate ")
		.exec()
		.then(books => res.status(200).json({ books: books}))
		.catch(err => {
			if (err) {
				throw err;
			}
		})
});

app.get("/order/:id", (req, res) => {
	const id = req.params.id;
	Order.findById({_id: id })
		.then(order => {
			if (order) {
				axios.get(`http://localhost:5000/customers/${order.CustomerID}`)
					.then(response => {
						console.log(response);
					})
				res.send("Quick Response");
			} else {
				res.send("Invalid Order");;
			}
		})
});




app.listen(7000, () => {
	console.log(`Server started on port`);
});