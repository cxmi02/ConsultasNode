const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sepulvedagiraldocamila:IAw9xmtt7wXcTtIL@db-1.idpnodb.mongodb.net/');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error de coneccion a la base de datos'));

db.once('open', function () {
    console.log('coneccion a la base de datos');

    userShema = mongoose.Schema({
        nombre: String,
        apellido: String
    });

    const User = mongoose.model('users', userShema);
    const app = express();
    app.use(express.json());


    // 1. Obtener todos los usuarios que sean mayores de 18 años.
    app.get('/api/users/mayores/18', async (req, res) => {
        const users = await User.find(
            { edad: { $gt: 18 } }
        );
        res.json(users);
    });

    // 2. Obtener todos los usuarios que sean de Londres o de París.
    app.get('/api/users/ciudad/londres/paris', async (req, res) => {
        const users = await User.find(
            { ciudad: { $in: ['Londres', 'París'] } }
        );
        res.json(users);
    });

    // 3. Obtener a todos los usuarios que ganen más de $2000 al mes y tengan menos de 30 años.
    app.get('/api/users/salario/2000/menores/30', async (req, res) => {
        const users = await User.find(
            {
                salario: { $gt: 2000 },
                edad: { $lt: 30 }
            }
        );
        res.json(users);
    });

    // 4. Obtener a todos los usuarios que sean de España y ganen más de $3000 al mes
    app.get('/api/users/pais/espana/salario/3000', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: "España" },
                salario: { $gt: 3000 }
            }
        );
        res.json(users);
    });

    // 5. Obtener todos los usuarios que tengan entre 25 y 35 años.
    app.get('/api/users/mayor/25/menor/35', async (req, res) => {
        const users = await User.find(
            {
                $and: [
                    { edad: { $gt: 25 } },
                    { edad: { $lt: 35 } }
                ]
            }
        );
        res.json(users);
    });

    // 6. Obtener a todos los usuarios que no sean de Estados Unidos.
    app.get('/api/users/pais/estadosUnidos', async (req, res) => {
        const users = await User.find(
            { pais: { $ne: 'Estados Unidos' } }
        );
        res.json(users);
    });

    // 7. Obtener a todos los usuarios que sean de Londres y que ganen más de $2500 o que tengan más de 30 años.
    app.get('/api/users/ciudad/londres/salario/2500/edad/30', async (req, res) => {
        const users = await User.find(
            {
                ciudad: { $eq: 'Londres' },
                $or: [
                    { salario: { $gt: 2500 } },
                    { edad: { $gt: 30 } }
                ]
            }
        );
        res.json(users);
    });

    // 8. Obtener a todos los usuarios que sean de Australia y tengan un peso mayor a 140 libras.
    app.get('/api/users/pais/australia/peso/140', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: "Australia" },
                peso: { $gt: 140 }
            }
        );
        res.json(users);
    });

    // 9. Obtener a todos los usuarios que no sean de Londres ni de París.
    app.get('/api/users/no/pais/londres/paris', async (req, res) => {
        const users = await User.find(
            {
                $nor: [
                    { ciudad: { $eq: 'Londres' } },
                    { ciudad: { $eq: 'París' } }
                ]
            }
        );
        res.json(users);
    });

    // 10. Obtener a todos los usuarios que ganen menos de $2000 al mes o que tengan más de 40 años.
    app.get('/api/users/salario/2000/edad/40', async (req, res) => {
        const users = await User.find(
            {
                $or: [
                    { salario: { $lt: 2000 } },
                    { edad: { $gt: 40 } }
                ]
            }
        );
        res.json(users);
    });

    // 11. Obtener a todos los usuarios que sean de Canadá y ganen más de $4000 al mes o que tengan una altura mayor a 180 cm
    app.get('/api/users/pais/canada/salario/4000/altura/180', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: 'Canada' },
                $or: [
                    { salario: { $gt: 4000 } },
                    { altura: { $gt: 180 } }
                ]
            }
        );
        res.json(users);
    });

    // 12. Obtener todos los usuarios que sean de Italia y tengan entre 20 y 30 años.
    app.get('/api/users/pais/italia/edad/20/30', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: 'Italia' },
                $and: [
                    { edad: { $gt: 20 } },
                    { edad: { $lt: 30 } }
                ]
            }
        );
        res.json(users);
    });

    // 13. Obtener todos los usuarios que no tengan un correo electrónico registrado.
    app.get('/api/users/correo/null', async (req, res) => {
        const users = await User.find(
            {
                correo: { $eq: null }
            }
        );
        res.json(users);
    });

    // 14. Obtener todos los usuarios que sean de Francia y que su salario esté entre $3000 y $5000 al mes.
    app.get('/api/users/pais/francia/salario/3000/5000', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: 'Francia' },
                $and: [
                    { salario: { $gt: 3000 } },
                    { salario: { $lt: 5000 } }
                ]
            }
        );
        res.json(users);
    });

    // 15. Obtener todos los usuarios que sean de Brasil y que tengan un peso menor a 120 libras o más de 140 libras.
    app.get('/api/users/pais/brasil/peso/120/140', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: 'Brasil' },
                $or: [
                    { salario: { $lt: 120 } },
                    { salario: { $gt: 140 } }
                ]
            }
        );
        res.json(users);
    });

    // 16. Obtener todos los usuarios que sean de Argentina o de Chile y que tengan una edad menor a 25 años.
    app.get('/api/users/pais/argentina/chile/edad/25', async (req, res) => {
        const users = await User.find(
            {
                $or: [
                    { pais: { $eq: 'Argentina' } },
                    { pais: { $eq: 'Chile' } },
                ],
                edad: { $lt: 25 }
            }
        );
        res.json(users);
    });

    // 17. Obtener a todos los usuarios que no sean de España ni de México y que ganen menos de $3000 al mes.
    app.get('/api/users/no/pais/espana/mexico/salario/3000', async (req, res) => {
        const users = await User.find(
            {
                $nor: [
                    { pais: { $eq: 'España' } },
                    { pais: { $eq: 'Mexico' } },
                ],
                salario: { $lt: 3000 }
            }
        );
        res.json(users);
    });

    // 18. Obtener todos los usuarios que sean de Alemania y que tengan un salario menor a $4000 o una edad mayor a 35 años.
    app.get('/api/users/pais/alemania/salario/4000/edad/35', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: 'Alemania' },
                $or: [
                    { salario: { $lt: 4000 } },
                    { edad: { $gt: 35 } },
                ]
            }
        );
        res.json(users);
    });

    // 19. Obtener todos los usuarios que no sean de Colombia y que su altura sea menor a 170 cm.
    app.get('/api/users/no/pais/colombia/altura/170', async (req, res) => {
        const users = await User.find(
            {
                pais: { $ne: 'Colombia' },
                altura: { $lt: 170 }
            }
        );
        res.json(users);
    });

    // 20. Obtener todos los usuarios que sean de India y que no tengan un salario registrado.
    app.get('/api/users/pais/india/no/salario', async (req, res) => {
        const users = await User.find(
            {
                pais: { $eq: 'India' },
                salario: { $eq: null }
            }
        );
        res.json(users);
    });


    app.listen(3000, () => {
        console.log('servidor escuchando en el puerto 3000');
    });
});