
const express = require('express');


const authenticateUser = require('../../../middlewares/auth');
const upload = require('../../../middlewares/fileupload');
const { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employee.controller');

const router = express.Router()

router.post('/createEmployee',authenticateUser,upload,createEmployee)
router.patch('/updateEmployee',authenticateUser,upload,updateEmployee)
router.get('/getEmployeeById',getEmployeeById)
router.get('/getAllEmployees',getAllEmployees)
router.delete('/deleteEmployee',deleteEmployee)


module.exports=router
