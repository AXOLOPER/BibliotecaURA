// @/main.js
const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
var cors = require('cors');
const prospectosRoute = require('./routes/prospectos.routes');
const usuariosRoute = require('./routes/usuarios.routes');
const bitacoraRoute = require('./routes/bitacora.routes');
const Usuario = require('./models/usuarios.model');

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

app.use('/api/usuarios',usuariosRoute);
app.use('/api/bitacora',bitacoraRoute);
app.use('/api/prospectos',prospectosRoute);


// The secret should be an unguessable long string (you can use a password generator for this!)
const JWT_SECRET ="goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

// Ruta de login
app.post("/api/authenticate",async (req, res) => {
  const usuario  = req.body.Usuario;
  const secret  = req.body.Secret;
  console.log(`${usuario} is trying to login ..`);

  const U = await Usuario.findOne({Usuario:usuario, estado:true});
  if(!U){
    return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
  }

  const valid = await bcrypt.compare(secret,U.Secret);
  console.log(valid);
  if(!valid){
    return res.status(401)
    .json({ 
      message: "The username and password your provided are invalid"
    });
  }
    
  console.log(`${usuario} has loggedin successfully ..`);
  return res.status(200).json({
    token: jwt.sign({ user: U.Usuario, privilegios:U.privilegios, id:U._id }, JWT_SECRET,{expiresIn:"600000"}),
    message: `${usuario} has loggedin successfully ..`
  });
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

const start = async () => {
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/mongoose?authSource=admin");
    console.log("Conexion BD: "+db);
    app.use(allowCrossDomain);
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();