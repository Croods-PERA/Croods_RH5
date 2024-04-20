import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { TestReport, KidneyTestReport } from "../models/testReport.js";
import ErrorHandler from "../middlewares/error.js";

// Get all test reports
export const getAllTestReports = catchAsyncErrors(async (req, res, next) => {
  const testReports = await TestReport.find();

  res.status(200).json({
    success: true,
    testReports,
  });
});

// Get all kidney test reports
export const getAllKidneyTestReports = catchAsyncErrors(async (req, res, next) => {
  const kidneyTestReports = await KidneyTestReport.find();

  res.status(200).json({
    success: true,
    kidneyTestReports,
  });
});

// Get a Patient's Test Reports
export const getPatientTestReports = catchAsyncErrors(async (req, res, next) => {
  const testReports = await TestReport.find({ patient: req.params.id });

  res.status(200).json({
    success: true,
    testReports,
  });
});

// Get a Patient's Kidney Test Reports
export const getPatientKidneyTestReports = catchAsyncErrors(async (req, res, next) => {
  const kidneyTestReports = await KidneyTestReport.find({ patient: req.params.id });

  res.status(200).json({
    success: true,
    kidneyTestReports,
  });
});

// add a kidney test report
export const addKidneyTestReport = catchAsyncErrors(async (req, res, next) => {
  const {
    testID,
    patientID,
    testDate,
    testType,
    blood_pressure,
    specific_gravity,
    albumin,
    sugar,
    red_blood_cells,
    pus_cell,
    pus_cell_clumps,
    bacteria,
    blood_glucose_random,
    blood_urea,
    serum_creatinine,
    sodium,
    potassium,
    hemoglobin,
    packed_cell_volume,
    white_blood_cell_count,
    red_blood_cell_count,
    hypertension,
    diabetes_mellitus,
    coronary_artery_disease,
    appetite,
    pedal_edema,
    anemia,
    class_of_ckd,
    } = req.body;
    if (
        !testID || !patientID || !testDate || !testType || !blood_pressure || !specific_gravity || !albumin || !sugar || !red_blood_cells || !pus_cell || !pus_cell_clumps || !bacteria || !blood_glucose_random || !blood_urea || !serum_creatinine || !sodium || !potassium || !hemoglobin || !packed_cell_volume || !white_blood_cell_count || !red_blood_cell_count || !hypertension || !diabetes_mellitus || !coronary_artery_disease || !appetite || !pedal_edema || !anemia || !class_of_ckd
    ) {
        return next(new ErrorHandler("Please fill in all the fields", 400));
    }
    const kidneyTestReport = await KidneyTestReport.create(req.body);
    res.status(200).json({
        success: true,
        message: "Kidney Test Report Created Successfully",
        kidneyTestReport,
    });  
});