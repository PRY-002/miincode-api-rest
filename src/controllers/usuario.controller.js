const Usuarios = require('../models/Usuarios');

async function createUsuario(req, res){

    const {uid, email, nombres, password, apepat, apemat, fec_nacimiento, genero, dni, url_foto, nro_movil, fec_creacion, fec_actualizacion, estado, perfiles_id} = req.body;
    try {
        let userEmailExist = await  Usuarios.findOne({ where: { email: email}})
        if (userEmailExist) {
            return res.status(401).json({
                message: 'El correo ingresado ya se encuentra registrado.',
                estado: false
                })
        } else {
            let newUsuario = await Usuarios.create({
                uid, email, password, nombres, apepat, apemat, fec_nacimiento, genero, dni, url_foto, nro_movil, fec_creacion, fec_actualizacion, estado, perfiles_id
            },{
                fields:['uid','email','nombres','password','apepat','apemat', 'fec_nacimiento', 'genero', 'dni', 'url_foto', 'nro_movil', 'fec_creacion', 'fec_actualizacion', 'estado', 'perfiles_id']
            });
    
            if (newUsuario){
                return res.json({
                    message: 'Usuario creado satisfactoriamente.',
                    estado: true
                    //data: [newUsuario]
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error al intentar registrar, '+ error,
            estado: false
        })
    }  

}

async function findByCredentials(req, res){
    const {email, password} = req.body;
    try {
        let user = await  Usuarios.findOne({ where: { email: email, password: password }})
        if (!user) {
            return res.status(401).json({message: 'Error login! Revisar las credenciales de autenticación, email o password incorrecto.'})
        }
      
        if (user){
            return res.json({
                message: 'Usuario autenticado exitosamente.',
                data: user
            });
        }
    } catch (error) {           
        res.status(400).json({
            message:'Error Login.' + error,
            estado: false
        })
    }   

}

// Lista todos los usuarios regisutrados.
async function getUsuarios(req, res){
    try {
        const listUsuarios = await Usuarios.findAll();
        res.json({
            data:listUsuarios
        });
    } catch (e) {
        res.status(400).json({
            message:'Error al obtener los usuarios. ' + e,
            estado: false
        })   
    }
}

// Muestra Usuario por ID.
async function getUsuarioById(req, res){
    const { id } = req.params;

    try {
        const project = await Usuarios.findOne({
            where:{ id }
        });
        res.json(project);        
    } catch (e) {
        res.status(400).json({
            message:'Error al obtener el usuario.' +id + '- '+ error,
            estado: false
        })        
    }
}

async function message(req, res){
    try {
        return res.json({
            message: 'Welcome Miincode',
            data: "La data del modelo Usuario esta actualizada"
        });       
    } catch (e) {
        res.status(400).json({
            message:'Error al intentar mostrar el mensaje. '+ error,
            estado: false
        })                    
    }
}

module.exports={
    createUsuario:createUsuario,
    getUsuarios:getUsuarios,
    getUsuarioById:getUsuarioById,
    findByCredentials:findByCredentials,
    message:message
    }