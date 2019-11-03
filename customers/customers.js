const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

mongoose.connect("mongodb://localhost/customer-service", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const Customer = require("./Customer");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/customers", (req, res) => {
	Customer.find()
		.select(" name age address ")
		.exec()
		.then(customer => {
			if (customer) {
				res.status(200).json(customer);
			} else {
				res.status(404).json({ 
					"message": "Can't find customers" 
				});
			}
		})
		.catch(err => {
			if (err) {
				throw err;
			}
		})
});

app.post("/customers", (req, res) => {
	const customer = new Customer({
		name: req.body.name,
		age: req.body.age,
		address: req.body.address,
		group: []

	})
	customer.save()
		.then((result) => {
			console.log(result);
			res.status(200).json({ "message": "Customer created" });
		}).catch((err) => {
			if (err) {
				throw err;
			}
		});
});


app.get("/customers/:id", (req, res) => {
	const id = req.params.id;
	Customer.findById({ _id: id })
		.select(" name age address ")
		.exec()
		.then(customer => {
			if (customer) {
				res.status(200).json(customer);
			} else {
				res.send("Invalid ID!");
			}
		})
		.catch(err => {
			if (err) {
				throw err;
			}
		});
});

app.delete("/customers/:id", (req, res) => {
	const id = req.params.id;
	Customer.findByIdAndRemove({ _id: id })
		.then(() => res.send("Customer Deleted"))
		.catch(err => {
			if (err) {
				throw err;
			}
		})
});


 app.listen(5000, () => {
	 console.log("Customer Service- UP and running");
 });