const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Productos = mongoose.model('Productos');

const router = express.Router();

router.get('/product', async (req, res) => {
	const productos = await Productos.find();

	res.send(productos);
});

router.post('/product', async (req, res) => {
	const { nombreProducto, cantidad, descripcion } = req.body;

	if (!nombreProducto) {
		return res.status(422).send({ error: 'Debe almenos ingresar un nombre al producto'});
	}
	try {
		const producto = new Productos({ nombreProducto, cantidad, descripcion });
		await producto.save();
		res.send(producto);
	} catch (err) {
		res.status(422).send({ error: err.message });
	}
});

router.put('/product/:idProduct', async (req, res) => {
	const id = req.params.idProduct;
	const actualizar = req.body; 

	Productos.findByIdAndUpdate(id, actualizar, (err, productUpdated) => {
		if (err) res.status(422).send({ error: "Error al actulizar el producto" });

		res.send({ product: actualizar, datos: productUpdated });
	})

});

router.delete('/product/:idProduct', async (req, res) => {
	const id = req.params.idProduct;
	const producto = new Productos();

	Productos.findById(id, (err, producto) => {
		if (err) res.send.status(422).send({ error: "Error al borrar producto" });


		producto.remove(err => {
			if (err) res.status(422).send({ error: "Error al borrar producto" });
		})
		res.send( { message: "Producto eliminado" });


	});
});



module.exports = router;