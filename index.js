const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect('mongodb+srv://recetario_user:SuperRecetarioEstrersxd@recetario.mfnquq1.mongodb.net/recetario?retryWrites=true&w=majority&appName=Recetario')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Esquema de receta
const recetaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  tiempo: String,
  dificultad: String,
  porciones: Number,
  categoria: String,
  imagen: String
});

// Modelo
const Receta = mongoose.model('Receta', recetaSchema);

// Ruta GET para obtener todas las recetas
app.get('/api/recetas', async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
});

// Ruta POST para agregar una nueva receta
app.post('/api/recetas', async (req, res) => {
  try {
    const nuevaReceta = new Receta(req.body);
    await nuevaReceta.save();
    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ error: 'Error al guardar receta' });
  }
});

// Iniciar el servidor
app.listen(4000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:4000');
});
