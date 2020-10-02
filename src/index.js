require('./models/User');
require('./models/productos');
require('./models/clientes');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(productoRoutes);
app.use(clienteRoutes);

const mongoUri = 'mongodb+srv://admin:contrasena@cluster0.6e6j3.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

app.set('port', process.env.PORT || 3000);

mongoose.connection.on('connected', () => {
	console.log('Te conectastes a mongo');
});
mongoose.connection.on('error', (err) => {
	console.error('Error no te conectastes a mongo', err);
});

app.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});
