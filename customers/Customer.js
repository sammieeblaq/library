const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
	name: {type: String, require: true },
	age: {type: Number, require: true },
	address: {type: String, require: true },
	group: { type: Number }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;