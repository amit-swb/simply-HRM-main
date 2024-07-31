const router = require("express").Router();
const authentiction = require("../controller/auth/authentiction");
const companyManagement = require("../controller/companyManagement/company");
const employeeManagement = require("../controller/employeeManagement/employee");
const hrManagement = require("../controller/hrManagement/hr");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const { storage } = require("../storage/storage");
const { storageEmployee } = require("../storage/storage");
const { storageHr } = require("../storage/storage");
const multer = require("multer");
const upload = multer({ storage });
const uploadEmployee = multer({ storageEmployee });
const uploadHr = multer({ storageHr });

//  user

router.post("/registration", upload.none(), authentiction.registration);
router.post("/login", upload.none(), authentiction.login);

// company

router.post(
  "/company_registration",
  upload.none(),
  companyManagement.company_registration
);
router.post("/company_login", upload.none(), companyManagement.company_login);
router.post(
  "/update_company_details/:id",
  upload.none(),
  companyManagement.update_company_details
);
router.get("/get_all_Company", upload.none(), companyManagement.getAllCompany);
router.get("/company/:id", upload.none(), companyManagement.companyById);
router.post("/add_holiday", upload.none(), companyManagement.add_holiday);

//Employee

router.post(
  "/employee_registration",
  upload.none(),
  employeeManagement.employee_registration
);
router.post(
  "/employee_login",
  upload.none(),
  employeeManagement.employee_login
);
router.post(
  "/update_employee_details/:id",
  uploadEmployee.single("employee_image"),
  employeeManagement.update_employee_details
);

router.delete(
  "/employee_delete/:userID",
  upload.none(),
  employeeManagement.employee_delete
);
router.get("/get_employee/:id", upload.none(), employeeManagement.get_employee);
router.get("/get_holiday/:id", upload.none(), employeeManagement.get_holiday);
router.post(
  "/holiday_update/:id",
  upload.none(),
  employeeManagement.holiday_update
);
router.delete(
  "/holiday_delete/:id",
  upload.none(),
  employeeManagement.holiday_delete
);

//HR Management

router.post("/hr_registration", upload.none(), hrManagement.hr_registration);
router.get("/get_hr/:id", upload.none(), hrManagement.get_hr);
router.post("/hr_login", upload.none(), hrManagement.hr_login);
router.post(
  "/update_hr_details/:id",
  uploadHr.single("hr_image"),
  hrManagement.update_hr_details
);
router.delete("/hr_delete/:id", upload.none(), hrManagement.hr_delete);
module.exports = router;
