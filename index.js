// Librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

// Enrutadores
const mascotas = require(__dirname + '/routes/mascotas');
const restaurantes = require(__dirname + '/routes/restaurantes');
const contactos = require(__dirname + '/routes/contactos');

const Contacto = require(__dirname + '/models/contacto');

// Conexión con la BD
mongoose.connect('mongodb://127.0.0.1:27017/contactos');

// Servidor Express
let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// let contacto1 = new Contacto({
//     nombre: "Natalia",
//     telefono: "654654654", 
//     edad: 30
// });
// contacto1.save().then(resultado => {
//     console.log("Contacto añadido:", resultado);
// }).catch(error => {
//     console.log("ERROR añadiendo contacto:", error);
// });

// Middleware para peticiones POST y PUT
// Middleware para estilos Bootstrap
// Enrutadores para cada grupo de rutas
app.use(express.json());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));
app.use('/mascotas', mascotas);
app.use('/restaurantes', restaurantes);
app.use('/contactos', contactos);

// Puesta en marcha del servidor
app.listen(8081);