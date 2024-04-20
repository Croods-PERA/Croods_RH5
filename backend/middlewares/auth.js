import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Check if patient is authenticated or not
export const isAuthenticatedPatient = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.patient = await User.findById(decoded.id);

  next();
});

// Check if doctor is authenticated or not
export const isAuthenticatedDoctor = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.doctor = await User.findById(decoded.id);

  next();
});

// Check if admin is authenticated or not
export const isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.admin = await User.findById(decoded.id);

  next();
});

// Check if lab assistant is authenticated or not
export const isAuthenticatedLabAssistant = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.labAssistant = await User.findById(decoded.id);

  next();
});

// Check if data analyst is authenticated or not
export const isAuthenticatedDataAnalyst = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.dataAnalyst = await User.findById(decoded.id);

  next();
});

// Check if PHI is authenticated or not
export const isAuthenticatedPHI = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.phi = await User.findById(decoded.id);

  next();
});

// Handling user roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.patient.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.patient.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};