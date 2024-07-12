const Company = require("../../model/company");
const express = require("express");
const response = require("../../helper/middlewere");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userType } = require("../../helper/enum/userType");
const { login } = require("../auth/authentiction");
const Holiday = require("../../model/holiday");
const { v4: uuidv4 } = require('uuid');

//Company registration
module.exports.company_registration = async (req, res) => {
  try {
    const email_id = req.body.email_id;
    const company_name = req.body.company_name;
    const Email = await Company.findOne({
      email_id: email_id,
    });
    const Company_Name = await Company.findOne({
      company_name: company_name,
    });
    if (Email || Company_Name) {
      res
        .status(422)
        .send(response.common("User already exists", false, undefined, 300));
    } else {
      // const company_id = `company_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const company_id = uuidv4(); // Generate a unique company ID

      const user = new Company({
        company_name: req.body.company_name,
        email_id: req.body.email_id,
        password: req.body.password,
        company_id // Add the generated company ID here
      });
      user.save().then(async (companyData) => {
        if (companyData) {
          res.send(
            response.common(
              "Registration Successfully ",
              true,
              companyData,
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
    res.status(422).send(response.common(err, false, undefined, 600));
  }
};

//Company Login
module.exports.company_login = async (req, res) => {
  try {
    const email_id = req.body.email_id;
    const user = await Company.findOne({ email_id: email_id });
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
        const data = { user, token };
        res.send(response.common("Login Successfully", true, data, 200));
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

//company profile update
module.exports.update_company_details = async (req, res) => {
  try {
    const id = req.params.id;
    const Company_Id = await Company.findById(id);
    if (!Company_Id) {
      res.status(422).send(response.common("Company Not Found"));
    } else {
      const updateDetails = await Company.findByIdAndUpdate(
        id,
        {
          company_name: req.body.company_name,
          company_website_url: req.body.company_website_url,
          //   Company_logo: req.body.Company_logo,
          industry_business_location: req.body.industry_business_location,
          company_address: req.body.company_address,
          country: req.body.country,
          city: req.body.city,
          zip_code: req.body.zip_code,
          mobile_number: req.body.mobile_number,
          phone_number: req.body.phone_number,
          contact_person: req.body.contact_person,
          time_zone: req.body.time_zone,
          date_format: req.body.date_format,
          company_number: req.body.company_number,
          company_tax_id: req.body.company_tax_id,
        },
        {
          new: true,
        }
      );
      if (updateDetails) {
        res.send(
          response.common(
            "Company Updated Successfully",
            true,
            updateDetails,
            200
          )
        );
      } else {
        res
          .status(422)
          .send(response.common("Company Not Updated", false, undefined, 300));
      }
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, undefined, 500));
  }
};

//All Company Get

module.exports.getAllCompany = async (req, res) => {
  try {
    const Company_get = await Company.find();
    if (Company_get) {
      res.send(response.common("Get All Company", true, Company_get, 200));
    } else {
      res.status(422).send(response.common("Company Not Found", false, 300));
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, undefined, 500));
  }
};

//Get ID BY Company

module.exports.companyById = async (req, res) => {
  try {
    const id = req.params.id;
    const company_get = await Company.findById(id);
    if (company_get) {
      res.send(response.common("Get company", true, company_get, 200));
    } else {
      res.status(422).send(response.common("company Not Found", false, 300));
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, undefined, 500));
  }
};

//Add Holiday

module.exports.add_holiday = async (req, res) => {
  try {
    const holiday = new Holiday({
      holiday_name: req.body.holiday_name,
      date: req.body.date,
      day: req.body.day,
      company_id: req.body.company_id,
    });
    const newholiday = holiday.save();
    if (newholiday) {
      res.send(
        response.common("Holiday Add Successfully ", true, holiday, 200)
      );
    } else {
      res
        .status(422)
        .send(response.common("Holiday Not Add", false, undefined, 400));
    }
  } catch (err) {
    res.status(422).send(response.common(err, false, undefined, 600));
  }
};
