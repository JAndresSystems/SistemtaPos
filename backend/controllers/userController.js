const userModel = require('../models/userModel');
//import { message } from 'antd';

// login user items
const loginController = async (req, res) => {
    try {
        const { userId, password } = req.body;

        // Validar que los datos no estén vacíos
        if (!userId || !password) {
            return res.status(400).json({
                message: "Por favor ingrese ambos campos: userId y password"
            });
        }

        // Buscar al usuario en la base de datos
        const user = await userModel.findOne({ userId, verified: true });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({
                message: "Ingreso Fallido: Usuario no encontrado o no verificado"
            });
        }

        // Comparar la contraseña directamente (suponiendo que está en texto plano)
        if (user.password !== password) {
            return res.status(401).json({
                message: "Ingreso Fallido: Contraseña incorrecta"
            });
        }

        // Si todo es válido, devolver la información del usuario
        res.status(200).json({
            message: "Ingreso exitoso",
            user: {
                userId: user.userId, // Puedes personalizar qué información devolver
                name: user.name,
                email: user.email,
                // Otros campos relevantes
            },
        });

    } catch (error) {
        // En lugar de usar `error` directamente, enviar un mensaje descriptivo o el error como objeto.
        res.status(500).json({
            message: "Error en el servidor durante el login.",
            error: error.message || error,
        });
        console.log(error);
    }
};

//Register 
const registerController = async (req, res) => {
    try {
        const newUser = new userModel({ ...req.body, verified: true });
        await newUser.save();
        res.status(201).send("Usuario creado con éxito!");
    } catch (error) {
        // En lugar de usar `error` directamente, enviar un mensaje descriptivo o el error como objeto.
        res.status(400).json({
            message: "Error al crear el usuario.",
            error: error.message || error, // Puedes enviar más detalles si es necesario
        });
        console.log(error);
    }
};



 
  

module.exports = {loginController,registerController}