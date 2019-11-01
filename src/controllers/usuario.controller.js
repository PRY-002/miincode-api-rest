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

async function editUsuario(req, res){

    const {id, uid, email, password, nombres, apepat, apemat, fec_nacimiento, genero, dni, url_foto, nro_movil, fec_actualizacion} = req.body;
    
    try {
        let userIdExist = await  Usuarios.findOne({ where: { id: id}})
        if ( !userIdExist ) {
            return res.status(401).json({
                message: 'El id ingresado no esta registrado.',
                estado: false
                })
        } else {
            var values  = { uid:uid, email:email, password:password, nombres:nombres, apepat:apepat, apemat:apemat, 
                fec_nacimiento:fec_nacimiento, genero:genero, dni:dni, url_foto:url_foto, nro_movil:nro_movil, fec_actualizacion:fec_actualizacion};
            var selector = { where: { id: id} };

            let editUsuario = await Usuarios.update(values,selector).then();
            if ( editUsuario ){
                return res.json({
                    message: 'Usuario actualizado satisfactoriamente.',
                    estado: true
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error al intentar actualizar datos del usuario, '+ error,
            estado: false
        })
    }
}

async function deshabilitarUsuario(req, res){
    const {id, fec_actualizacion} = req.body;    
    try {
        let userIdExist = await  Usuarios.findOne({ where: { id: id}})
        if ( !userIdExist ) {
            return res.status(401).json({
                message: 'El id ingresado no esta registrado.',
                estado: false
                })
        } else {
            var values  = { fec_actualizacion:fec_actualizacion, estado:false };
            var selector = { where: { id: id} };

            let editUsuario = await Usuarios.update(values, selector).then();
            if ( editUsuario ){
                return res.json({
                    message: 'Usuario [' + id + '] fue deshabilitado satisfactoriamente.',
                    estado: true
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error al intentar deshabilitar al usuario, '+ error,
            estado: false
        })
    }  

}

async function habilitarUsuario(req, res){
    const {id, fec_actualizacion} = req.body;    
    try {
        let userIdExist = await  Usuarios.findOne({ where: { id: id}})
        if ( !userIdExist ) {
            return res.status(401).json({
                message: 'El id ingresado no esta registrado.',
                estado: false
                })
        } else {
            var values  = { fec_actualizacion:fec_actualizacion, estado:true };
            var selector = { where: { id: id} };

            let editUsuario = await Usuarios.update(values, selector).then();
            if ( editUsuario ){
                return res.json({
                    message: 'Usuario [' + id + '] fue habilitado satisfactoriamente.',
                    estado: true
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error al intentar habilitar el usuario, '+ error,
            estado: false
        })
    }  

}

// Elimina al usuario registrado siempre en cuando NO tenga relación con otra tabla.
async function deleteUsuarioById(req, res){
    const { id } = req.params;
    try {
        const user = await  Usuarios.findOne({ where: { id }})
      //  res.json(user);
        if (!user) {
            return res.status(403).json({message: 'Error! No se encontro datos con el ID enviado.'})
        } else {
            let deleteUsuario = await Usuarios.destroy( { where: { id:id }} ).then();
            if (deleteUsuario) {
                return res.json({
                    message: 'Usuario eliminado.'
                });
            }
        }
    } catch (error) {           
        res.status(400).json({
            message:'Error Delete. \n[' + id + '] - ' + error,
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

async function findByEmail(req, res){
    const { email } = req.params;
    try {
        const user = await  Usuarios.findOne({ where: { email }})
      //  res.json(user);
        if (!user) {
            return res.status(403).json({message: 'Error! No se encontro datos con el email enviado.'})
        }      
        if (user){
            return res.json({
                message: 'Email encontrado.',
                data: user
            });
        }
    } catch (error) {           
        res.status(400).json({
            message:'Error Search. \n' + email + '-' + error,
            estado: false
        })
    }   

}

// Lista todos los usuarios registrados cuyo estado sea TRUE.
async function getUsuarios(req, res){
    try {
        const listUsuarios = await Usuarios.findAll({ where: { estado: true}});
        res.json({data:listUsuarios});
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
        const project = await Usuarios.findOne({ where:{ id }});
        res.json(project);        
    } catch (e) {
        res.status(400).json({
            message:'Error al obtener el usuario.' +id + '- '+ e,
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
    editUsuario:editUsuario,
    deleteUsuarioById:deleteUsuarioById,
    habilitarUsuario:habilitarUsuario,
    deshabilitarUsuario:deshabilitarUsuario,
    getUsuarios:getUsuarios,
    getUsuarioById:getUsuarioById,
    findByCredentials:findByCredentials,
    findByEmail:findByEmail,
    message:message
    }   