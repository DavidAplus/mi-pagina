require('dotenv').config(); //Carga las variables del archivo .env a process.env.
console.log("URL:", process.env.DATABASE_URL); //Muestra en consola el valor de la variable de entorno. no es realmente necesario, solo es pa verificar las cosas
const express = require('express'); //Importa la librería Express. Express sirve para crear servidores web y APIs. Guarda la función principal de Express dentro de la variable:
const app = express(); //app es tu servidor. asi es como uno puede hacer app.listen, app.post, etc
const { Pool } = require('pg'); //Importa la clase Pool de la librería PostgreSQL. Un pool es un conjunto de conexiones reutilizables a la base de datos.
const cors = require('cors'); //Permite que tu frontend haga peticiones a tu API aunque estén en dominios o puertos diferentes. Sin CORS el navegador bloquea la petición. por eso hacemos app.use(cors());

// CONEXION A LA BASE DE DATOS EN SUPA BASEE

const basededatos = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors());

app.listen(3000, function () {
    console.log('el mejol'); 
});

app.get('/cedula/:valor', async function (req, res) {

    const cedula = req.params.valor;

    try {
        const result = await basededatos.query(
            'SELECT * FROM "BASE DE DATOS" WHERE "CEDULA" = $1', [cedula]
        );
        res.json(result.rows);

    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        res.status(500).send('Error al conectar a la base de datos');
    }
});