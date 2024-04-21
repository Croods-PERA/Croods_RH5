import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Patient", "Doctor", "Admin", "Lab_Assistant", "Data_Analyst", "PHI"],
  },
});

// Additional fields for Patient
const patientSchema = new mongoose.Schema({
    ...userSchema.obj,
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  }],
  });
  
  // Additional fields for Doctor
  const doctorSchema = new mongoose.Schema({
    ...userSchema.obj,
    // Add additional fields for Doctor here
    specialization: {
        type: String,
        required: [true, "Specialization Is Required!"],
    }
  });
  
  // Additional fields for Admin
  const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    // Add additional fields for Admin here
  });
  
  // Additional fields for Lab Assistant
  const labAssistantSchema = new mongoose.Schema({
    ...userSchema.obj,
    // Add additional fields for Lab Assistant here
  });
  
  // Additional fields for Data Analyst
  const dataAnalystSchema = new mongoose.Schema({
    ...userSchema.obj,
    // Add additional fields for Data Analyst here
  });

  const phiSchema = new mongoose.Schema({
    ...userSchema.obj,
    // Add additional fields for PHI here
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

patientSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// patientSchema.methods.generateJsonWebToken = function () {
//   // console.log(process.env.JWT_EXPIRES);
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expires: process.env.JWT_EXPIRES,
//   });
// };
patientSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET_KEY);
};

export const User = mongoose.model("User", userSchema);
export const Patient = mongoose.model("Patient", patientSchema);
export const Doctor = mongoose.model("Doctor", doctorSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const LabAssistant = mongoose.model("LabAssistant", labAssistantSchema);
export const DataAnalyst = mongoose.model("DataAnalyst", dataAnalystSchema);
export const PHI = mongoose.model("PHI", phiSchema);

// Path: backend/models/userSchema.js