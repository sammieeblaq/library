const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
	CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
	BookID: { type: mongoose.Schema.Types.ObjectId, "ref": "Book",  required: true},
	InitialDate: { type: Date, required: true },
	DeliveryDate: { type: Date, required: true},
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;