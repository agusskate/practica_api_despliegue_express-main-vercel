const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});



// api/index.js
const express = require('express');
const router = express.Router(); // Usamos router de express

// Definir rutas
router.get('/users', async (req, res) => {
  try {
    const collection = database.collection('alumnos');
    const users = await collection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Puedes agregar más rutas aquí si es necesario

// Exportar el enrutador
module.exports = router;  
