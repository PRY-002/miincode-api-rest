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

async function deleteCodigoById(req, res){
    const { id } = req.params;
    try {
        const user = await  Codigos.findOne({ where: { id }})
      //  res.json(user);
        if (!user) {
            return res.status(403).json({message: 'Error! No se encontro datos con el ID enviado.'})
        } else {
            let deleteCodigo = await Codigos.destroy( { where: { id:id }} ).then();
            if (deleteCodigo) {
                return res.json({
                    message: 'Codigo eliminado satisfactioriamente.',
                    estado: true
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

module.exports={
    getCodigos:getCodigos,
    deleteCodigoById:deleteCodigoById,
    getCodigoByIdUser:getCodigoByIdUser,
    getCodigoById:getCodigoById,
    createCodigo:createCodigo
    }
    