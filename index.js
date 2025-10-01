require('dotenv').config(); // Carga variables desde .env en local
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas usando variable de entorno
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Esquema y modelo de receta
const recetaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  tiempo: String,
  dificultad: String,
  porciones: Number,
  categoria: String,
  imagen: String
});

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

// Ruta POST para agregar una receta
app.post('/api/recetas', async (req, res) => {
  try {
    const nuevaReceta = new Receta(req.body);
    const recetaGuardada = await nuevaReceta.save();
    res.status(201).json(recetaGuardada);
  } catch (error) {
    res.status(400).json({ error: 'Error al guardar receta' });
  }
});

// Puerto para Render o local
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
