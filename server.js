const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const https = require('https')
const fs = require('fs')
const app = express();
const port = 3500;


const env = 'dev';
let connection = {};

// Middleware
app.use(bodyParser.json());
app.use(cors());

if (env == 'dev') {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2112',
        database: 'sistemaTelefonia'
    });
    connection.connect(err => {
        if (err) {
            console.error('Error al conectar a MySQL:', err);
        } else {
            console.log('Conexión exitosa a MySQL');
        }
    });
} else {

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'naza_root',
        password: 'naza2112',
        database: 'naza_sistemaTelefonia'
    });
    connection.connect(err => {
        if (err) {
            console.error('Error al conectar a MySQL:', err);
        } else {
            console.log('Conexión exitosa a MySQL');
        }
    });
}

// Verifica si la conexión se estableció correctamente

const saltRounds = 10; // Número de rounds de salting
const secretKey = 'tu_clave_secreta'; // Cambia esto a una clave secreta segura

// Función para generar un token JWT
function generarToken(usuarioId) {
    const payload = { usuarioId };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expira en 1 hora
}

// Función para verificar si un usuario está autenticado mediante token JWT
function usuarioAutenticado(token) {
    //const token = req.headers.authorization;

    if (token) {
        return false;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return true;
    } catch (error) {
        return false;
    }
}




// Ruta para registrar un usuario



app.post('/register', (req, res) => {
    console.log('entro a register');
    const { usuario, contraseña, nombre, apellido, email, telefono } = req.body;

    // Hashea la contraseña antes de almacenarla en la base de datos
    bcrypt.hash(contraseña, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error al hashear la contraseña:', err);
            res.status(500).json({ message: 'Error al registrar usuario' });
        } else {
            // Guarda el hash en la base de datos junto con el usuario
            const query = 'INSERT INTO usuarios (usuario, contraseña, nombre, apellido, email, telefono) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(query, [usuario, hash, nombre, apellido, email, telefono], (err, result) => {
                if (err) {
                    console.error('Error al registrar usuario:', err);
                    res.status(500).json({ message: 'Error al registrar usuario' });
                } else {
                    res.status(200).json({ message: 'Usuario registrado exitosamente' });
                }
            });
        }
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;

    // Consulta el hash almacenado en la base de datos para el usuario
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    connection.query(query, [usuario], (err, result) => {
        if (err) {
            console.error('Error al consultar usuario:', err);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        } else {
            if (result.length === 1) {
                const storedHash = result[0].contraseña;
                const usuarioId = result[0].id; // Cambia esto a la columna adecuada en tu tabla de usuarios
                const nombre = result[0].nombre; // Campo de nombre personal
                const nomUsuario = result[0].usuario;

                // Compara la contraseña ingresada con el hash almacenado
                bcrypt.compare(contraseña, storedHash, (err, result) => {
                    if (err) {
                        console.error('Error al comparar contraseñas:', err);
                        res.status(500).json({ message: 'Error al iniciar sesión' });
                    } else {
                        if (result) {
                            const token = generarToken(usuarioId); // Modifica la función generarToken para aceptar el nombre personal
                            res.status(200).json({ message: 'Inicio de sesión exitoso', token, nombre, nomUsuario, usuarioId });
                        } else {
                            res.status(401).json({ message: 'Credenciales inválidas' });
                        }
                    }
                });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        }
    });
});


//Cargar BAF
app.post('/baf', (req, res) => {
    const {
        apellido,
        nombre,
        tipo_documento,
        documento,
        telefono,
        telefonoAlt,
        fecha,
        email,
        converge,
        barrio,
        calleMza,
        numLote,
        piso,
        dpto,
        entreCalles,
        razon,
        cuit,
        ingresosBrutos,
        servicio,
        velocidad,
        sellout,
        numTvs,
        portaFija,
        observaciones,
        usuarioId,
    } = req.body;

    // Realiza la inserción en la base de datos
    const query = `
        INSERT INTO cliente_baf (apellido, nombre, tipo_documento, documento, telefono, telefono_alt,
        fecha_nacimiento, email, converge, barrio, calle_mza, num_lote, piso, dpto, entre_calles, razon_social,
        cuit, ingresos_brutos, servicio, velocidad, sellout, num_tvs, portabilidad_fija, observaciones, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [
        apellido,
        nombre,
        tipo_documento,
        documento,
        telefono,
        telefonoAlt,
        fecha,
        email,
        converge,
        barrio,
        calleMza,
        numLote,
        piso,
        dpto,
        entreCalles,
        razon,
        cuit,
        ingresosBrutos,
        servicio,
        velocidad,
        sellout,
        numTvs,
        portaFija,
        observaciones,
        usuarioId
    ], (err, result) => {
        if (err) {
            console.error('Error al insertar cliente:', err);
            res.status(500).json({ message: 'Error al insertar cliente' });
        } else {
            res.status(200).json({ message: 'Cliente insertado exitosamente' });
        }
    });
});

app.get("/bafinformes", (req, res) => {
    const usuario_id = req.query.usuario_id;
    // Realiza una consulta a la base de datos para obtener los informes
    const query = "SELECT * FROM cliente_baf WHERE usuario_id = ?"; // Ajusta la consulta según tu esquema de base de datos
    connection.query(query, [usuario_id], (err, results) => {
        if (err) {
            console.error("Error al obtener los informes:", err);
            res.status(500).json({ message: "Error al obtener los informes" });
        } else {
            res.status(200).json(results);
        }
    });
});

// Carga clientes portabilidad
app.post('/portabilidad', (req, res) => {
    const {
        apellido,
        nombre,
        tipo_documento,
        documento,
        telefono,
        telefono_alt,
        razon_social,
        cuit,
        ingresos_brutos,
        modalidad,
        abono,
        converge,
        sellout,
        observaciones,
        usuarioId
    } = req.body;

    const insertQuery = `
      INSERT INTO cliente_portabilidad
      (apellido, nombre, tipo_documento, documento, telefono, telefono_alt, razon_social, cuit, ingresos_brutos, modalidad, abono, converge, sellout, observaciones, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        insertQuery, [
            apellido,
            nombre,
            tipo_documento,
            documento,
            telefono,
            telefono_alt,
            razon_social,
            cuit,
            ingresos_brutos,
            modalidad,
            abono,
            converge,
            sellout,
            observaciones,
            usuarioId
        ],
        (err, result) => {
            if (err) {
                console.error('Error al insertar en la base de datos: ' + err.message);
                res.status(500).json({ error: 'Error al procesar la solicitud.' });
            } else {
                console.log('Registro insertado correctamente.');
                res.status(200).json({ message: 'Registro insertado correctamente.' });
            }
        }
    );
});

app.get("/portinformes", (req, res) => {
    // Realiza una consulta a la base de datos para obtener los informes
    const usuario_id = req.query.usuario_id;

    const query = "SELECT * FROM cliente_portabilidad WHERE usuario_id = ?"; // Ajusta la consulta según tu esquema de base de datos

    connection.query(query, [usuario_id], (err, results) => {
        if (err) {
            console.error("Error al obtener los informes:", err);
            res.status(500).json({ message: "Error al obtener los informes" });
        } else {
            res.status(200).json(results);
        }
    });
});

// ... Otras rutas y configuraciones


if (env == 'dev') {
    app.listen(port, () => {
        console.log(`Servidor funcionando en el puerto ${port}`);
    })
} else {


    // Inicia el servidor
    const privateKey = fs.readFileSync('clave.pem', 'utf8');
    const certificate = fs.readFileSync('certificado.pem', 'utf8');

    const credentials = { key: privateKey, cert: certificate };

    // Crea el servidor HTTPS
    const httpsServer = https.createServer(credentials, app);

    // Escucha en el puerto HTTPS (por ejemplo, el puerto 3500)
    httpsServer.listen(port, () => {
        console.log(`Servidor en funcionamiento en el puerto ${port} (HTTPS)`);
    });
}