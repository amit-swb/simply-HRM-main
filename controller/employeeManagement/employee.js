const Employee = require("../../model/employee");
const express = require("express");
const response = require("../../helper/middlewere");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userType } = require("../../helper/enum/userType");
const company = require("../../model/company");
const holiday = require("../../model/holiday");

const cloudinary = require("cloudinary").v2;

//Employee registration
module.exports.employee_registration = async (req, res) => {
  try {
    const Employe_data = await Employee.findOne({
      email_id: req.body.email_id,
    });

    if (Employe_data) {
      res
        .status(422)
        .send(response.common("Employee already exist", false, undefined, 300));
    } else {
      const user = new Employee({
        first_Name: req.body.first_Name,
        last_name: req.body.last_name,
        middle_Name: req.body.middle_Name,
        date_of_birth: req.body.date_of_birth,
        email_id: req.body.email_id,
        password: req.body.password,
        mobile_number: req.body.mobile_number,
        alternate_number: req.body.alternate_number,
        father_number: req.body.father_number,
        mother_number: req.body.mother_number,
        current_address: req.body.current_address,
        permanent_address: req.body.permanent_address,
        designation: req.body.designation,
        date_of_joining: req.body.date_of_joining,
        company_id: req.body.company_id,
        employee_id: req.body.employee_id,
        user_type: userType.EMPLOYEES,
      });
      user.save().then(async (employeeData) => {
        if (employeeData) {
          res.send(
            response.common(
              "Registration Successfully ",
              true,
              employeeData,
              200
            )
          );
        } else {
          res
            .status(422)
            .send(response.common("Registration Failed", true, undefined, 400));
        }
      });
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, 600));
  }
};

//Employee Login
module.exports.employee_login = async (req, res) => {
  try {
    const email_id = req.body.email_id;
    const user = await Employee.findOne({ email_id: email_id });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      if (!validPassword) {
        res
          .status(422)
          .send(response.common("Login Failed..", false, undefined, 300));
      } else {
        const loginData = { user, token };
        res.send(response.common("Login Sucessfully", true, loginData, 200));
      }
    } else {
      res
        .status(422)
        .send(response.common("Email Not Valid", false, undefined, 400));
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, undefined, 500));
  }
};

// Update Employee Details

module.exports.update_employee_details = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(422)
        .send(response.common("Employee Not Found", false, undefined, 600));
    }

    let imageUrl = employee.employee_image; // Default to existing image if no new image is uploaded

    if (req.body.employee_image) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.employee_image, {
        folder: "employee_img",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      imageUrl = result.secure_url; // Get the URL of the uploaded image
    }

    const updateDetails = await Employee.findByIdAndUpdate(
      id,
      {
        first_Name: req.body.first_Name,
        last_name: req.body.last_name,
        middle_Name: req.body.middle_Name,
        date_of_birth: req.body.date_of_birth,
        mobile_number: req.body.mobile_number,
        alternate_number: req.body.alternate_number,
        father_number: req.body.father_number,
        mother_number: req.body.mother_number,
        current_address: req.body.current_address,
        permanent_address: req.body.permanent_address,
        designation: req.body.designation,
        date_of_joining: req.body.date_of_joining,
        pancard: req.body.pancard,
        ID_number: req.body.ID_number,
        bank_name: req.body.bank_name,
        bank_account: req.body.bank_account,
        number_bank: req.body.number_bank,
        IFSC_code: req.body.IFSC_code,
        upload_Document: req.body.upload_Document,
        employee_image: imageUrl,
      },
      {
        new: true,
      }
    );

    if (updateDetails) {
      res.send(
        response.common(
          "Employee updated successfully",
          true,
          updateDetails,
          200
        )
      );
    } else {
      res
        .status(422)
        .send(response.common("Employee Not updated", false, undefined, 300));
    }
  } catch (err) {
    console.error("Error updating employee details:", err);
    res.status(422).send(response.common(err.message, false, undefined, 500));
  }
};

// Employee Delete

module.exports.employee_delete = async (req, res) => {
  try {
    const userID = req.params.userID;
    const EmployeeID = await Employee.findById(userID);
    console.log(EmployeeID);
    if (EmployeeID) {
      const delet = await Employee.findByIdAndDelete(userID);
      res.send(
        response.common("Employee Deleted Successfully", true, delet, 200)
      );
    } else {
      res.status(422).send(response.common("Employee Not Found", false, 300));
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, 400));
  }
};

//Employee Get By ID

module.exports.get_employee = async (req, res) => {
  try {
    const id = req.params.id;
    const Employe_get = await Employee.find({ company_id: id });
    if (Employe_get.length > 0) {
      res.send(response.common("Get All Employee", true, Employe_get, 200));
    } else {
      res.status(422).send(response.common("Employee Not Found", false, 300));
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//all holiday BY CompanyID

module.exports.get_holiday = async (req, res) => {
  try {
    const id = req.params.id;
    const Holiday_get = await holiday.find({ company_id: id });
    if (Holiday_get.length > 0) {
      res.send(response.common("Get All Holiday", true, Holiday_get, 200));
    } else {
      res.status(422).send(response.common("Company Not Found", false, 300));
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Holiday Update
module.exports.holiday_update = async (req, res) => {
  try {
    const id = req.params.id;
    await holiday.findById(id).then(async (update) => {
      await holiday.findByIdAndUpdate(
        id,
        {
          date: req.body.date,
          day: req.body.day,
          holiday_name: req.body.holiday_name,
        },
        { new: true }
      );
      if (update) {
        res.send(
          response.common("Holiday updated successfully", true, update, 200)
        );
      } else {
        res
          .status(422)
          .send(response.common("Not Updated Holiday", false, 300));
      }
    });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//Holiday Delete
module.exports.holiday_delete = async (req, res) => {
  try {
    const id = req.params.id;
    holiday.findById(id).then(async (deleteHoliday) => {
      if (deleteHoliday) {
        const delet = await holiday.findByIdAndDelete(id);
        res.send(response.common("deleted success", true, delet, 200));
      } else {
        res.send(response.common("ID not found", false, 300));
      }
    });
  } catch (err) {
    res.send(response.common(err, false, 400));
  }
};
