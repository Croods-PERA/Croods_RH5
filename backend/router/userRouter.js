import express from "express";

import{
    registerPatient,
    registerDoctor,
    registerLabAssistant,
    registerDataAnalyst,
    registerPHI,
    loginPatient,
    loginOtherUsers,
    logoutPatient,
    logoutOther,
    getPatientProfile,
    getOtherUsersProfile,
    getDoctorProfile,
    addDoctor,
    removeDoctor
} from "../controller/userController.js";

import{
    isAuthenticatedPatient,
    isAuthenticatedDoctor,
    isAuthenticatedAdmin,
    isAuthenticatedLabAssistant,
    isAuthenticatedDataAnalyst,
    isAuthenticatedPHI
} from "..middlewares/auth.js";