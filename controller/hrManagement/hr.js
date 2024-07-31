const Hr = require("../../model/hr");
const express = require("express");
const response = require("../../helper/middlewere");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userType } = require("../../helper/enum/userType");
const company = require("../../model/company");
const holiday = require("../../model/holiday");
const employee = require("../../model/employee");

const cloudinary = require("cloudinary").v2;

//HR Registration
module.exports.hr_registration = async (req, res) => {
  try {
    const Employe_data = await Hr.findOne({
      email_id: req.body.email_id,
    });

    if (Employe_data) {
      res
        .status(422)
        .send(response.common("HR already exist", false, undefined, 300));
    } else {
      const user = new Hr({
        first_Name: req.body.first_Name,
        last_name: req.body.last_name,
        middle_Name: req.body.middle_Name,
        date_of_birth: req.body.date_of_birth,
        email_id: req.body.email_id,
        password: req.body.password,
        mobile_number: req.body.mobile_number,
        alternate_number: req.body.alternate_number,
        father_number: req.body.father_number,
        current_address: req.body.current_address,
        permanent_address: req.body.permanent_address,
        designation: req.body.designation,
        date_of_joining: req.body.date_of_joining,
        company_id: req.body.company_id,
        hr_id: req.body.hr_id,
        user_type: userType.HR,
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

//HR Login

module.exports.hr_login = async (req, res) => {
  try {
    const email_id = req.body.email_id;
    const user = await Hr.findOne({ email_id: email_id });
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

//HR Update
// module.exports.update_hr_details = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const hr = await Hr.findById(id);

//     if (!hr) {
//       return res
//         .status(422)
//         .send(response.common("hr Not Found", false, undefined, 600));
//     }

//     let imageUrl = hr.hr_image; // Default to existing image if no new image is uploaded

//     if (req.body.hr_image) {
//       // Upload new image to Cloudinary
//       const result = await cloudinary.uploader.upload(req.body.hr_image, {
//         folder: "employee_img",
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//       });

//       imageUrl = result.secure_url; // Get the URL of the uploaded image
//     }

//     if (hr) {
//       const updateDetails = await Hr.findByIdAndUpdate(
//         id,
//         {
//           first_Name: req.body.first_Name,
//           last_name: req.body.last_name,
//           middle_Name: req.body.middle_Name,
//           date_of_birth: req.body.date_of_birth,
//           mobile_number: req.body.mobile_number,
//           alternate_number: req.body.alternate_number,
//           father_number: req.body.father_number,
//           current_address: req.body.current_address,
//           permanent_address: req.body.permanent_address,
//           designation: req.body.designation,
//           date_of_joining: req.body.date_of_joining,
//           pancard: req.body.pancard,
//           ID_number: req.body.ID_number,
//           bank_name: req.body.bank_name,
//           bank_account: req.body.bank_account,
//           number_bank: req.body.number_bank,
//           IFSC_code: req.body.IFSC_code,
//           upload_Document: req.body.upload_Document,
//           hr_image: imageUrl,
//         },
//         {
//           new: true,
//         }
//       );
//       if (updateDetails) {
//         res.send(
//           response.common("HR updated successfully", true, updateDetails, 200)
//         );
//       } else {
//         res
//           .status(422)
//           .send(response.common("HR Not updated", false, undefined, 300));
//       }
//     } else {
//       res
//         .status(422)
//         .send(response.common("HR Not Found", false, undefined, 600));
//     }
//   } catch (err) {
//     res.status(422).send(response.common(err, false, undefined, 500));
//   }
// };

module.exports.update_hr_details = async (req, res) => {
  try {
    const id = req.params.id;
    const hr = await Hr.findById(id);

    if (!hr) {
      return res
        .status(422)
        .send(response.common("hr Not Found", false, undefined, 600));
    }

    let imageUrl = hr.hr_image; // Default to existing image if no new image is uploaded

    if (req.body.hr_image) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.hr_image, {
        folder: "hr_img",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      imageUrl = result.secure_url; // Get the URL of the uploaded image
    }
    const updateDetails = await Hr.findByIdAndUpdate(
      id,
      {
        first_Name: req.body.first_Name,
        last_name: req.body.last_name,
        middle_Name: req.body.middle_Name,
        date_of_birth: req.body.date_of_birth,
        mobile_number: req.body.mobile_number,
        alternate_number: req.body.alternate_number,
        father_number: req.body.father_number,
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
        hr_image: imageUrl,
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
    console.error("Error updating hr details:", err);
    res.status(422).send(response.common(err, false, undefined, 500));
  }
};


//HR Delete

module.exports.hr_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const hrID = await Hr.findById(id);

    if (hrID) {
      const delet = await Hr.findByIdAndDelete(id);
      res.send(response.common("HR Deleted Successfully", true, delet, 200));
    } else {
      res.status(422).send(response.common("HR Not Found", false, 300));
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, 400));
  }
};

//GET Company-ID BY HR

module.exports.get_hr = async (req, res) => {
  try {
    const id = req.params.id;
    const HR_get = await Hr.find({ company_id: id });
    if (HR_get.length > 0) {
      res.send(response.common("Get Company By HR", true, HR_get, 200));
    } else {
      res.status(422).send(response.common("HR Not Found", false, 300));
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
