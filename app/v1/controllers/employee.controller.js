const Employee = require('../models/Employee'); // Adjust the path as necessary

// Create Employee
const createEmployee = async (req, res, next) => {
    try {
        const {
            name, dateOfBirth, inServiceForm, address, city, email, vcaNr, bic, bnsNr,
            hrId, outOfService, postalCode, country, mobile, ibn
        } = req.body;
        const { employeeImage } = req.files || {};

        if (!name || !dateOfBirth || !inServiceForm || !address || !city || !email || !vcaNr || !bic ||
            !bnsNr || !hrId || !outOfService || !postalCode || !country || !mobile || !ibn) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "All fields are required."
            });
        }

        const files = [];
        if (employeeImage && Array.isArray(employeeImage)) {
            employeeImage.forEach((img) => {
                const publicFileUrl = `/images/employees/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        const newEmployee = new Employee({
            name,
            dateOfBirth,
            inServiceForm,
            address,
            city,
            employeeImage: files[0],
            email,
            vcaNr,
            bic,
            bnsNr,
            hrId,
            outOfService,
            postalCode,
            country,
            mobile,
            ibn,
        });

        await newEmployee.save();

        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Employee created successfully.",
            data: newEmployee
        });
    } catch (error) {
        next(error);
    }
};

// Get All Employees
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};

// Get Employee by ID
const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.query;
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

// Update Employee by ID
const updateEmployee = async (req, res, next) => {
    try {
        const { id } = req.query;
        const {
            name, dateOfBirth, inServiceForm, address, city, email, vcaNr, bic, bnsNr,
            hrId, outOfService, postalCode, country, mobile, ibn
        } = req.body;
        const { employeeImage } = req.files || {};

        const files = [];
        if (employeeImage && Array.isArray(employeeImage)) {
            employeeImage.forEach((img) => {
                const publicFileUrl = `/images/employees/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        const updatedEmployeeData = {
            name,
            dateOfBirth,
            inServiceForm,
            address,
            city,
            email,
            vcaNr,
            bic,
            bnsNr,
            hrId,
            outOfService,
            postalCode,
            country,
            mobile,
            ibn,
        };

        if (files[0]) {
            updatedEmployeeData.employeeImage = files[0];
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedEmployeeData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Employee updated successfully.",
            data: updatedEmployee
        });
    } catch (error) {
        next(error);
    }
};

// Delete Employee by ID
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.query;
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Employee deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};