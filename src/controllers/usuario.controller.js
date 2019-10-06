const Usuarios = require('../models/Usuarios');

async function createUsuario(req, res){

    const {uid, email, nombres, apepat, apemat, fec_nacimiento, genero, dni, url_foto, nro_movil, fec_creacion, fec_actualizacion, estado} = req.body;

    try {
        let newUsuario = await Usuarios.create({
            uid,
            email,
            nombres,
            apepat,
            apemat, 
            fec_nacimiento,
            genero,
            dni,
            url_foto,
            nro_movil,
            fec_creacion,
            fec_actualizacion,
            estado
        },{
            fields:['uid','email','nombres','apepat','apemat', 'fec_nacimiento', 'genero', 'dni', 'url_foto', 'nro_movil', 'fec_creacion', 'fec_actualizacion', 'estado', 'perfiles_id']
        });

        if (newUsuario){
            return res.json({
                message: 'Usuario created successfully',
                data: newUsuario
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Something goes wrong',
            data: {

            }
        })
    }

  //  console.log(req.body);
   

}

async function findByCredentials(req, res){
    const {email, password} = req.body;
    try {
        let user = await  Usuarios.findOne({ where: { email: email}})
        if (!user) {
            return res.status(401).json({message: 'Login failed! Check email authentication credentials'})
        }
        //const isPasswordMatch = await bcrypt.compare(password, user.password)
        let isPasswordMatch = await  Usuarios.findOne({ where: { password: password}})
        if (!isPasswordMatch) {
            return res.status(401).json({message: 'Login failed! Check password authentication credentials'})
        }
      
        if (user){
            return res.json({
                message: 'Usuario autenticado exitosamente.',
                data: isPasswordMatch
            });
        }
    } catch (error) {
        console.log('ERROR: '+error);        
        res.status(500).json({
            message:'There was a problem finding the user.',
            data: {

            }
        })
    }

  //  console.log(req.body);
   

}

// Lista todos los usuarios regisutrados.
async function getUsuarios(req, res){
    try {
        const listUsuarios = await Usuarios.findAll();
        res.json({
            data:listUsuarios
        });
    } catch (e) {
        console.log(e.message);
    }
}

// Muestra Usuario por ID.
async function getUsuarioById(req, res){
    try {
        const { id } = req.params;
           const project = await Usuarios.findOne({
                where:{ id }
            });
            res.json(project);        
    } catch (e) {
        console.log(e);
    }
}

async function message(req, res){
    try {
        return res.json({
            message: 'Welcome Miincode',
            data: "sIPIRIRIIIIIIIIIIIIIIIII"
        });       
    } catch (e) {
        console.log(e);
    }
}

module.exports={
    createUsuario:createUsuario,
    getUsuarios:getUsuarios,
    getUsuarioById:getUsuarioById,
    findByCredentials:findByCredentials,
    message:message
    }