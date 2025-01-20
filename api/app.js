const express = require('express');
// const morgan = require('morgan');
// const helmet = require('helmet');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// require('dotenv').config();

// const middlewares = require('./middlewares');
// const api = require('./index');

const app = express();

// Conexión a MongoDB
const uri = "mongodb+srv://agusskate34:Espetero1@agusskate.jgob4.mongodb.net/?retryWrites=true&w=majority&appName=agusskate";
let database;

MongoClient.connect(uri)
  .then(client => {
    database = client.db('express_despliegue');
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.error('Error no se pudo conectar a MongoDB:', err);
  });

// app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
app.use(express.json());

//Obtener los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const collection = database.collection('alumnos');
    const users = await collection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

//El primer usuario
app.get('/api/users/user1/', async (req, res) => {
  try {
    const collection = database.collection('alumnos');
    const user = await collection.findOne();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

//usuario por ID
app.get('/api/users/:id', async (req, res) => {
  const id_search = req.params.id;
  try {
    const collection = database.collection('alumnos');
    const user = await collection.findOne({ id: parseInt(id_search) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado o no existe' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

//Nuevo usuario
app.post('/api/users', async (req, res) => {
  const { nombre, apellido, tlfn } = req.body;
  const collection = database.collection('alumnos');

  try {
    const userCount = await collection.countDocuments();
    const newUser = {
      id: userCount + 1,
      nombre,
      apellido,
      tlfn
    };  
    const result = await collection.insertOne(newUser);
    res.status(201).json(result.insertedId);
  } catch (error) {
    console.error('Error al agregar el usuario:', error);
    res.status(500).json({ error: 'Error al agregar el usuario' });
  }
});

// app.use('/api/v1', api);
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

module.exports = app;
