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
router.post("/other/register/doctor", isAuthenticatedDoctor, registerDoctor);
router.post("/other/register/lab_assistant", isAuthenticatedLabAssistant, registerLabAssistant);
router.post("/other/register/data_analyst", isAuthenticatedDataAnalyst, registerDataAnalyst);
router.post("/other/register/phi", isAuthenticatedPHI, registerPHI);
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
router.post("/other/admin/add_doctor", isAuthenticatedAdmin, addDoctor);
router.delete("/other/admin/remove_doctor", isAuthenticatedAdmin, removeDoctor);
// router.get("/test/test", returnString);

export default router;