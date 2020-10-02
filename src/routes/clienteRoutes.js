const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Clientes = mongoose.model('Clientes');

const router = express.Router();

router.get('/clientes', async (req, res) => {
	const clientes = await Clientes.find();

	res.send(clientes);
});


router.post('/clientes', async (req, res) => {
	const { nombreCliente, apellido, direccion, identificacion } = req.body;

	if (!nombreCliente || !identificacion) {
		return res.status(422).send({ error: 'Debe almenos ingresar un nombre e identificacion'});
	}
	try {
		const cliente = new Clientes({ nombreCliente, apellido, direccion, identificacion });
		await cliente.save();
		res.send(cliente);
	} catch (err) {
		res.status(411).send({ error: err.message });
	}
});

router.put('/clientes/:idCliente', async (req, res) => {
	const id = req.params.idCliente;
	const actualizar = req.body; 

	Clientes.findByIdAndUpdate(id, actualizar, (err, clienteUpdate) => {
		if (err) res.status(422).send({ error: "Error al actulizar el cliente" });

		res.send({ cliente: clienteUpdate });
	})

});

router.delete('/clientes/:idCliente', async (req, res) => {
	const id = req.params.idCliente;
	const cliente = new Clientes();

	Clientes.findById(id, (err, cliente) => {
		if (err) res.send.status(422).send({ error: "Error al borrar cliente" });


		cliente.remove(err => {
			if (err) res.status(422).send({ error: "Error al borrar cliente" });
		})
		res.send( { message: "Cliente eliminado" });


	});
});

module.exports = router;