const Prospecto = require('../models/prospectos.model');
const BitacoraController = require("./bitacora.controller");

exports.registrar = async (req, res) => {
  try {
    const nuevoProspecto = new Prospecto(req.body);
    await nuevoProspecto.save();
    if(nuevoProspecto){
      BitacoraController.registrar("registro al prospecto con id: "+nuevoProspecto.id);
    }
    res.status(201).json(nuevoProspecto);
  } catch (error) {
    console.error('Error al guardar el prospecto:', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar el prospecto' });
  }
};