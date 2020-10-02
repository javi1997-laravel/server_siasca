const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
	nombreProducto: {
		type: String,
		unique: true,
		require: true
	},
	cantidad: {
		type: Number,
		default: 0
	},
	descripcion: {
		type: String,
		default: ''
	}
});


mongoose.model('Productos', prodSchema);