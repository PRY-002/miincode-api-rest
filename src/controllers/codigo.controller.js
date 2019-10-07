const Codigos = require('../models/Codigos');

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
        res.status(400).json({
            message: 'Error al intentar obtener la lista de codigos, '+ e,
            estado: false
        })
    }
}

// Lista los CODIGOS por Id de Usuario.
async function getCodigoByIdUser(req, res){
    const { usuarios_id } = req.params;
    try {        
        const listCodigos = await Codigos.findAll({
            where: { usuarios_id }
        });
        res.json({
            data:listCodigos
        });
    } catch (e) {
        res.status(400).json({
            message: 'Error al intentar obtener los codigos del idUser '+usuarios_id +', '+ e,
            estado: false
        })
    }
}

// Muestra Código por ID.
async function getCodigoById(req, res){
    const { id } = req.params;
    try {        
        const project = await Codigos.findOne({
            where:{ id }
        });
        res.json(project);        
    } catch (e) {
        res.status(400).json({
            message: 'Error al intentar obtener los codigos del '+usuarios_id +', '+ e,
            estado: false
        })
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
        res.status(400).json({
            message: 'Error al intentar registrar el codigo, '+ error,
            data: {
            }
        })
    }
  //  console.log(req.body);
}

module.exports={
    getCodigos:getCodigos,
    getCodigoByIdUser:getCodigoByIdUser,
    getCodigoById:getCodigoById,
    createCodigo:createCodigo
    }
    