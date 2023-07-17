// inicializamos jwt
const jwt = require('jsonwebtoken');

// crear un jwt que expira en 1h [autorización]
const token = jwt.sign({ 
    username: 'admin', 
    role: 'administrador' 
}, 'claveSecreta', { expiresIn: '5s' });

console.log(token);

// autorización
jwt.verify(token, 'claveSecreta', function(err, decoded) {
    if (err) {
        // El token no es válido
        console.log('DANGER! DANGER! DANGER!');
    } else {
        // El token es válido, se pueden acceder los datos del usuario mediante decoded
        console.log(decoded.username);
        // console.log(decoded.role);
    }
});
