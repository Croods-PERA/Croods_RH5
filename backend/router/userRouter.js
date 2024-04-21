import express from "express";

import{
    registerPatient,
    registerAdmin,
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
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", registerPatient);
router.post("/other/register/admin", registerAdmin);
router.post("/other/register/doctor", isAuthenticatedAdmin, registerDoctor);
router.post("/other/register/lab_assistant", isAuthenticatedAdmin, registerLabAssistant);
router.post("/other/register/data_analyst", isAuthenticatedAdmin, registerDataAnalyst);
router.post("/other/register/phi", isAuthenticatedAdmin, registerPHI);
router.post("/patient/login", loginPatient);
router.post("/other/login", loginOtherUsers);
router.get("/patient/logout", isAuthenticatedPatient, logoutPatient);
router.get("/other/logout", isAuthenticatedAdmin || 
                            isAuthenticatedDoctor || 
                            isAuthenticatedLabAssistant || 
                            isAuthenticatedDataAnalyst ||
                            isAuthenticatedPHI, logoutOther);
router.get("/patient/profile", isAuthenticatedPatient, getPatientProfile);
router.get("/other/doctor/mypatient_profile", isAuthenticatedDoctor, getPatientProfile);
router.get("/other/profile", isAuthenticatedAdmin || 
                            isAuthenticatedDoctor || 
                            isAuthenticatedLabAssistant || 
                            isAuthenticatedDataAnalyst ||
                            isAuthenticatedPHI, getOtherUsersProfile);
router.get("/patient/mydoctor_profile", isAuthenticatedPatient, getDoctorProfile);
router.post("/patient/add_doctor", isAuthenticatedPatient, addDoctor);
router.delete("/patient/remove_doctor", isAuthenticatedPatient, removeDoctor);
// router.get("/test/test", returnString);

export default router;