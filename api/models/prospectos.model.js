const mongoose = require('mongoose');

const prospectoSchema = new mongoose.Schema({
  ApellidoP: { type: String, required: true },
  ApellidoM: { type: String },
  Nombres: { type: String, required: true },
  CURP: { type: String, required: true },
  FDia: { type: Number, required: true },
  FMes: { type: Number, required: true },
  FYear: { type: Number, required: true },
  FNac: { type: Date, required: true },
  LNac: { type: String, required: true },
  Domicilio: { type: String, required: true },
  CP: { type: Number, required: true },
  municipio: { type: String, required: true },
  Estado: { type: String, required: true },
  Pais: { type: String, required: true },
  Cel: { type: String, required: true },
  Tel: { type: String },
  Email: { type: String, required: true },
  Sangre: { type: String, required: true },
  Padece: { type: Boolean, default: false },
  Enfermedad: { type: String },
  Medicamento: { type: String },
  EmergenciaNombre: { type: String, required: true },
  EmergenciaParentesco: { type: String, required: true },
  EmergenciaTel: { type: String, required: true },
});

const Prospecto = mongoose.model('Prospecto', prospectoSchema);

module.exports = Prospecto;