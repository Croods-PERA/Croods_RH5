import express from "express";

import{
    getAllTestReports,
    getAllKidneyTestReports,
    getPatientTestReports,
    getPatientKidneyTestReports,
    getPatientTestReportsDoctor,
    addKidneyTestReport
} from "../controller/testController.js";

import{
    isAuthenticatedPatient,
    isAuthenticatedDoctor,
    isAuthenticatedAdmin,
    isAuthenticatedLabAssistant,
    isAuthenticatedDataAnalyst,
    isAuthenticatedPHI
} from "../middlewares/auth.js";

const router = express.Router();

router.get("/other/test_reports", isAuthenticatedPHI || isAuthenticatedDataAnalyst, getAllTestReports);
router.get("/other/kidney_test_reports", isAuthenticatedPHI || isAuthenticatedDataAnalyst, getAllKidneyTestReports);
router.get("/patient/:id/test_reports", isAuthenticatedPatient, getPatientTestReports);
router.get("/patient/:id/kidney_test_reports", isAuthenticatedPatient, getPatientKidneyTestReports);
router.post("/other/kidney_test_report", isAuthenticatedLabAssistant, addKidneyTestReport);
router.get("/other/patient/:id/test_reports", isAuthenticatedDoctor, getPatientTestReportsDoctor);


export default router;