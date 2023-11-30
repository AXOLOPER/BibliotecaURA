const express = require('express');
var md_auth = require('../middleware/authenticated');
const Prospectos = require("../models/prospectos.model");
const prospectoController = require("../controllers/prospecto.controller");

const api = express.Router();

    api.get("/", async (req, res) => {
        const allProspectos = await Prospectos.find();
        return res.status(200).json(allProspectos);
    });
  
    api.get("/:id", async (req, res) => {
        const { id } = req.params;
        const prospecto = await Prospecto.findById(id);
        return res.status(200).json(prospecto);
    });
  
    // Ruta de registro
    api.post("/",md_auth.ensureAuth,prospectoController.registrar);
  
    api.put("/:id", async (req, res) => {
        const { id } = req.params;
        await Prospecto.updateOne({ id }, req.body);
        const updatedProspecto = await Prospecto.findById(id);
        return res.status(200).json(updatedProspecto);
    });
  
  
    api.delete("/:id", async (req, res) => {
        const { id } = req.params;
        const deletedProspecto = await Prospecto.findByIdAndDelete(id);
        return res.status(200).json(deletedProspecto);
    });

module.exports = api;