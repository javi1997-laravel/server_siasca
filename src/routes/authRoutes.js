const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { nombreUser, email, password } = req.body;

	try {
		const user = new User({ nombreUser, email, password });
		await user.save();
	
   	const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
	} catch (err) {
		return res.status(422).send(err.message);
	}
});

router.post('/signin', async (req, res) => {
  const { nombreUser, password } = req.body;

  if (!nombreUser || !password) {
    return res.status(422).send({ error: 'Debe proporcionar correo electrónico y contraseña' });
  }

  const user = await User.findOne({ nombreUser });
  if (!user) {
    return res.status(422).send({ error: 'Contraseña no valido' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'usuario no válido' });
  }
});

router.get('/user', async (req, res) => {
  const user = await User.find();

  res.send(user);
});

router.put('/user/:idUser', async (req, res) => {
  const id = req.params.idUser;
  const actualizar = req.body; 

  User.findByIdAndUpdate(id, actualizar, (err, userUpdate) => {
    if (err) res.status(422).send({ error: "Error al actulizar el usuario" });

    res.send({ user: userUpdate });
  })

});

router.delete('/user/:idUser', async (req, res) => {
  const id = req.params.idUser;
  const user = new User();

  User.findById(id, (err, user) => {
    if (err) res.send.status(422).send({ error: "Error al borrar usuario" });


    user.remove(err => {
      if (err) res.status(422).send({ error: "Error al borrar usuario" });
    })
    res.send( { message: "Usuario eliminado" });


  });
});

module.exports = router;