const Usuarios = require('../models/Codigos');

/* -------------------------------------------------------- */
/* -------> GET ------------------------------------------- */
// Lista todos los códigos registrados.
async function getCodigos(req, res){
    try{
        const listCodigos = await Codigos.findAll();
        res.json({
            data:listCodigos
        });
    }catch(e){
        console.log(e);
    }
}

// Lista los CODIGOS por Id de Usuario.
async function getCodigoByIdUser(req, res){
    try {
        const { usuarios_id } = req.params;
        const listCodigos = await Codigos.findAll({
            where: { usuarios_id }
        });
        res.json({
            data:listCodigos
        });
    } catch (e) {
        console.log(e);
    }
}

// Muestra Código por ID.
async function getCodigoById(req, res){
    try {
        const { id } = req.params;
           const project = await Codigos.findOne({
                where:{ id }
            });
            res.json(project);        
    } catch (e) {
        console.log(e);
    }
}

/* --------------------------------------------------------- */
/* -------> POST ------------------------------------------- */
async function createCodigo(req, res){
    const {usuarios_id, mensaje, ruta_url, fec_creacion, fec_actualizacion, estado} = req.body;
    try {
        let newCodigo = await Codigos.create({
            usuarios_id,
            mensaje,
            ruta_url,
            fec_creacion,
            fec_actualizacion,
            estado
        },{
            fields:['usuarios_id','mensaje','ruta_url','fec_creacion','fec_actualizacion','estado']
        });

        if (newCodigo){
            return res.json({
                message: 'Codigo created successfully',
                data: newCodigo
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
