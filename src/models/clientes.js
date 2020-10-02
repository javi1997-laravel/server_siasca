const mongoose = require('mongoose');

const clientesSchema = new mongoose.Schema({
	nombreCliente: {
		type: String,
		require: true
	},
	apellido: {
		type: String,
		default: ''
	},
	direccion: {
		type: String,
		default: ''
	},
	identificacion: {
		type: String,
		require: true,
		unique: true
	}
});

mongoose.model('Clientes', clientesSchema);