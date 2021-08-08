const statusEnum = require('../../../common/status.enum')
const VaccineDocument = require('../models/vaccine.schema')

const VaccineService = {
    create(payload) {
        return new VaccineDocument(payload).save() //save ใน mongoDB คือการ Insert ของ SQL
    },
    getAll(query){
        return VaccineDocument.find({ ...query, status: statusEnum.ACTIVE })
    },
    getOneById(id){
        return VaccineDocument.findOne({ _id: id })
    },
    getOneByName(name){
        return VaccineDocument.findOne({ name: name })
    }
}

module.exports = VaccineService