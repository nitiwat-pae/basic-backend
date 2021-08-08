// 2 บรรทัดแรกสามารถรวบเป็น 1 บรรทัดได้ด้วย const { Schema, model } = require('mongoose')

const mongoose = require('mongoose')
const { Schema, model } = mongoose //จะใช้ const Schema = mongoose.Schema ก็ได้
const StatusEnum = require('../../../common/status.enum')

//Sample Schema
//timestamp มีไว้เพื่อเมื่อมีการเพิ่มข้อมูลเข้ามาระบบจะทำการ timestamp อัตโนมัติ
//strict มีไว้เพื่อป้องกันตัวแปรอื่นๆเข้ามาโดยจะกำหนดให้ตัวแปร name, amount และ effieiency เข้ามาได้แค่นี้
const vaccineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    efficiency: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: StatusEnum.ACTIVE
    }
}, {timestamps: true, strict: true})

//VaccineModel ใช้ควบคุม Stock และใน model() จะส่ง parameters เข้าไป Database name, Schema name
const VaccineModel = model('vaccines',vaccineSchema)
module.exports = VaccineModel