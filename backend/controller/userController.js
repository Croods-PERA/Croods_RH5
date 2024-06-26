import bcrypt from "bcrypt";

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User, Patient, Admin, Doctor, LabAssistant, DataAnalyst, PHI } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";

// Test
// export const returnString = (req, res) => {
//     res.status(200).send("HELOOOOO");
//   };

// export const createAdmin = async (req, res) => {
//     const hashedpassword = await bcrypt.hash("admin123", 8);
//     const admin = await Admin.create({
//         firstName: "Admin",
//         lastName: "Admin",
//         email: "admin@croods.pera",
//         password: hashedpassword,
//         role: "Admin",
//     });
//     console.log("Admin created: ", admin);
//     res.status(200).json({
//         success: true,
//         admin,
//     });
// };

// Register a Patient => /api/v1/register
export const registerPatient = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, gender, password } = req.body;
    if (!firstName ||!lastName ||!email ||!phone ||!dob ||!gender ||!password) { 
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const isRegistered = await Patient.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Email already registered", 400));
    }
    const hashedpassword = await bcrypt.hash(password, 8);
    // console.log("Hashed password: ", hashedpassword);
    const patient = await Patient.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password: hashedpassword,
        role: "Patient",
    });
    generateToken(patient, "Patient Registered Successfully!", 201, res);
});

// Register an Admin => /api/v2/register_admin
export const registerAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const isRegistered = await Admin
    .findOne
    ({ email });
    if (isRegistered) { return next(new ErrorHandler("Email already registered", 400));}
    const hashedpassword = await bcrypt.hash(password, 8);
    // console.log("Hashed password: ", hashedpassword);
    const admin = await Admin.create({
        firstName,
        lastName,
        email,
        password: hashedpassword,
        role: "Admin",
    });
    generateToken(admin, "Admin Registered Successfully!", 201, res);
});

// Register a Doctor => /api/v2/register_doctor
export const registerDoctor = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password , specialization } = req.body;
    if (!firstName || !lastName || !email || !password || !specialization) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const isRegistered = await Doctor.findOne({ email });
    if (isRegistered) { return next(new ErrorHandler("Email already registered", 400));}
    const hashedpassword = await bcrypt.hash(password, 8);
    // console.log("Hashed password: ", hashedpassword);
    const doctor = await Doctor.create({
        firstName,
        lastName,
        email,
        password: hashedpassword,
        specialization,
        role: "Doctor",
    });
    generateToken(doctor, "Doctor Registered Successfully!", 201, res);
});

// Register a Lab Assistant => /api/v2/register_lab_assistant
export const registerLabAssistant = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const isRegistered = await LabAssistant.findOne({ email });
    if (isRegistered) { return next(new ErrorHandler("Email already registered", 400));}
    const hashedpassword = await bcrypt.hash(password, 8);
    // console.log("Hashed password: ", hashedpassword);
    const labAssistant = await LabAssistant.create({
        firstName,
        lastName,
        email,
        password: hashedpassword,
        role: "Lab_Assistant",
    });
    generateToken(labAssistant, "Lab Assistant Registered Successfully!", 201, res);
});

// Register a Data Analyst => /api/v2/register_data_analyst
export const registerDataAnalyst = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const isRegistered = await DataAnalyst.findOne({ email });
    if (isRegistered) { return next(new ErrorHandler("Email already registered", 400));}
    const hashedpassword = await bcrypt.hash(password, 8);
    // console.log("Hashed password: ", hashedpassword);
    const dataAnalyst = await DataAnalyst.create({
        firstName,
        lastName,
        email,
        password: hashedpassword,
        role: "Data_Analyst",
    });
    generateToken(dataAnalyst, "Data Analyst Registered Successfully!", 201, res);
});

// Register a PHI => /api/v2/register_phi
export const registerPHI = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const isRegistered = await PHI.findOne({ email });
    if (isRegistered) { return next(new ErrorHandler("Email already registered", 400));}
    const hashedpassword = await bcrypt.hash(password, 8);
    // console.log("Hashed password: ", hashedpassword);
    const phi = await PHI.create({
        firstName,
        lastName,
        email,
        password: hashedpassword,
        role: "PHI",
    });
    generateToken(phi, "PHI Registered Successfully!", 201, res);
});

// Login Patient => /api/v1/login
export const loginPatient = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const patient = await Patient.findOne({ email }).select("+password");
    if (!patient) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const isPasswordMatched = await patient.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    generateToken(patient, "Patient Logged In Successfully!", 200, res);
});

// Login Other Users => /api/v2/login
export const loginOtherUsers = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    let user;
    if (role === "Admin") {
        user = await Admin.findOne({
            email,
        }).select("+password");
    } else if (role === "Doctor") {
        user = await Doctor.findOne({
            email,
        }).select("+password");
    } else if (role === "Lab_Assistant") {
        user = await LabAssistant.findOne({
            email,
        }).select("+password");
    } else if (role === "Data_Analyst") {
        user = await DataAnalyst.findOne({
            email,
        }).select("+password");
    }   else if (role === "PHI") {
        user = await PHI.findOne({
            email,
        }).select("+password");
    }

    if (!user) {
        return next(new ErrorHandler("Invalid Email, Password or Role", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    if (role === "Admin") {
        generateToken(user, "Admin Logged In Successfully!", 200, res);
    }
    if (role === "Doctor") {
        generateToken(user, "Doctor Logged In Successfully!", 200, res);
    }
    if (role === "Lab_Assistant") {
        generateToken(user, "Lab Assistant Logged In Successfully!", 200, res);
    }
    if (role === "Data_Analyst") {
        generateToken(user, "Data Analyst Logged In Successfully!", 200, res);
    }
    if (role === "PHI") {
        generateToken(user, "PHI Logged In Successfully!", 200, res);
    }
});

// Logout => /api/v1/logout
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully!",
    });
});

// Logout => /api/v2/logout
export const logoutOther = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully!",
    });
});

// Get Patient Profile => /api/v1/me
export const getPatientProfile = catchAsyncErrors(async (req, res, next) => {
    const patient = await Patient.findById(req.user.id);
    res.status(200).json({
        success: true,
        patient,
    });
});

// Get Other Users Profile => /api/v2/me
export const getOtherUsersProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// get Doctor Profile => /api/v1/doctor_profile
export const getDoctorProfile = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.user.id);
    res.status(200).json({
        success: true,
        doctor,
    });
});

// add a doctor to patients docrots list=> /api/v1/add_doctor
export const addDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }
    const patient = await Patient.findById(req.user.id);
    if (patient.doctors.includes(req.params.id)) {
        return next(new ErrorHandler("Doctor already added", 400));
    }
    patient.doctors.push(req.params.id);
    await patient.save();
    res.status(200).json({
        success: true,
        message: "Doctor added successfully",
    });
});

// remove a doctor from patients docrots list=> /api/v1/remove_doctor
export const removeDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }
    const patient = await Patient.findById(req.user.id);
    if (!patient.doctors.includes(req.params.id)) {
        return next(new ErrorHandler("Doctor not added", 400));
    }
    const index = patient.doctors.indexOf(req.params.id);
    patient.doctors.splice(index, 1);
    await patient.save();
    res.status(200).json({
        success: true,
        message: "Doctor removed successfully",
    });
});