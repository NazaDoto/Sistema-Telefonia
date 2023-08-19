const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://192.168.0.11:8080' // Cambia esto si tu servidor de desarrollo está en un dominio diferente
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2112',
    database: 'sistemaTelefonia'
});

// Verifica si la conexión se estableció correctamente
connection.connect(err => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
    } else {
        console.log('Conexión exitosa a MySQL');
    }
});

const saltRounds = 10; // Número de rounds de salting
const secretKey = 'tu_clave_secreta'; // Cambia esto a una clave secreta segura

// Función para generar un token JWT
function generarToken(usuarioId) {
    const payload = { usuarioId };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expira en 1 hora
}

// Función para verificar si un usuario está autenticado mediante token JWT
function usuarioAutenticado(req) {
    const token = req.headers.authorization;

    if (!token) {
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
    const { username, password } = req.body;

    // Hashea la contraseña antes de almacenarla en la base de datos
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error al hashear la contraseña:', err);
            res.status(500).json({ message: 'Error al registrar usuario' });
        } else {
            // Guarda el hash en la base de datos junto con el usuario
            const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
            connection.query(query, [username, hash], (err, result) => {
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
    const { username, password } = req.body;

    // Consulta el hash almacenado en la base de datos para el usuario
    const query = 'SELECT * FROM usuarios WHERE username = ?';
    connection.query(query, [username], (err, result) => {
        if (err) {
            console.error('Error al consultar usuario:', err);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        } else {
            if (result.length === 1) {
                const storedHash = result[0].password;
                // Compara la contraseña ingresada con el hash almacenado
                bcrypt.compare(password, storedHash, (err, result) => {
                    if (err) {
                        console.error('Error al comparar contraseñas:', err);
                        res.status(500).json({ message: 'Error al iniciar sesión' });
                    } else {
                        if (result) {
                            const usuarioId = result[0].id; // Cambia esto a la columna adecuada en tu tabla de usuarios
                            const token = generarToken(usuarioId);
                            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
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

// Ruta protegida que requiere autenticación
app.get('/rutaProtegida', (req, res) => {
    if (usuarioAutenticado(req)) {
        res.status(200).json({ message: 'Acceso permitido' });
    } else {
        res.status(401).json({ message: 'Acceso denegado' });
    }
});

// ... Otras rutas y configuraciones

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});