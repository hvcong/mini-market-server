const services = require('../aws/S3')

const controller = {
    upload: async (req,res) =>{
        const file = req.file
        console.log(file)
        const result = await services.uploadFile(file)
        console.log(result)
        return res.send('ok')
    }
}

module.exports = controller