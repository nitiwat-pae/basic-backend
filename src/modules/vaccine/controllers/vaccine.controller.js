const humps = require('humps')
const VaccineService = require('../services/vaccine.service')

//Mock-up database
// const vaccines = [
//     {
//         id: '001',
//         name: 'Sinovac',
//         efficiency: 30
//     },
//     {
//         id: '002',
//         name: 'Aztrazeneca',
//         efficiency: 60
//     },
//     {
//         id: '003',
//         name: 'Moderna',
//         efficiency: 70
//     },
//     {
//         id: '004',
//         name: 'Sinopharm',
//         efficiency: 50
//     },
//     {
//         id: '005',
//         name: 'mRNA',
//         efficiency: 95
//     },
//     {
//         id: '006',
//         name: 'Pfizer',
//         efficiency: 90
//     },
//     {
//         id: '007',
//         name: 'Johnson and Johnson',
//         efficiency: 99
//     }
// ]

const vaccineController = {
    async getVaccines(req, res){
        const { efficiency, amount } = humps.camelizeKeys(req.query)
        const query = {
            // การใช้ || อ่านว่า pipe operator หมายถึง ถ้าค่าข้างหน้าเช่น amount ไม่มีหรือไม่ถุกส่งมาจะเอาค่าข้างหลังมาใช้
            // { $ne:null } หมายถึง Not equal null คือการดึงข้อมูลที่ค่าๆนั้นไม่เท่ากับ null ออกมาแทน
            // เช่น amount: amount || { $ne: null }
            // { $gte: <variable> } หมายถึง greater equal
            // { $lte: <variable> } หมายถึง lower equal
            // { $gt: <variable> } หมายถึง greater
            // { $lt: <variable> } หมายถึง lower
            // Syntax ด้านล่างคือ ถ้า efficiency ถูกส่งมา(เป็น true) จะไปหา { $lte: <variable> }
            // Syntax ด้านล่างคือ ถ้า efficiency ไม่ถูกส่งมา(เป็น false) จะไปหา { $ne: null }
            efficiency: efficiency ? { $lte: efficiency } : { $ne: null },
            amount: amount ? { $lte: amount } : { $ne:null }
        }
        const found = await VaccineService.getAll(query)
        // const efficiency = req?.query?.efficiency || 0 //การใส่ ? เข้าไปคือเป็นการเช็คก่อนว่ามี req ส่งมาที่ req มั้ย ถ้ามีก็ไปต่อที่ query
        // const found = vaccines.filter((vaccine) => vaccine.efficiency >= +efficiency) //ใส่ + เพื่อให้ค่า params ที่รับมาเป็นตัวเลข
        res.json({
            success: true,
            data: found
        }).status(200)
    },

    async getVaccineById(req, res){
        const {id} = req.params //สามารถใช้แบบ const id = req.params.id ได้เช่นกัน
        //เหตุผลที่ใช้ {id} เพราะยืดหยุ่นกับการรับ params มากกว่าเช่น {id, name}
        const found = await VaccineService.getOneById(id)
        res.json({
            success: true,
            data: found
        }).status(200)
    },

    async getVaccineByName(req, res){
        const {name} = req.params //สามารถใช้แบบ const id = req.params.id ได้เช่นกัน
        //เหตุผลที่ใช้ {id} เพราะยืดหยุ่นกับการรับ params มากกว่าเช่น {id, name}
        const found = await VaccineService.getOneByName(name)
        res.json({
            success: true,
            data: found
        }).status(200)
    },

    // async และ await คือการบอกว่าเมื่อ javascript รันคำสั่งแต่ละบรรทัดแล้วเมื่อเจอ await จะต้องรอจนกว่าบรรทัดนั้น render เสร็จสิ้นจึงไปต่อได้
    // เพื่อป้องกันการ error and exception
    async createVaccine(req, res){
        const { name, amount, efficiency } = humps.camelizeKeys(req.body)
        const created = await VaccineService.create({ name, amount, efficiency })
        res.json({
            success: true,
            data: created
        }).status(201)
    }
}

module.exports = vaccineController