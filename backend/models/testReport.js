import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const testReportSchema = new mongoose.Schema({
    testId: {
        type: Number,
        required: true,
        unique: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    },
    testDate: {
        type: Date,
        required: true
    },
    testType: {
        type: String,
        required: true,
        enum : ["Kidnaey", "Other"]
    },
});

// Add the auto-increment plugin to the schema
testReportSchema.plugin(autoIncrement.plugin, {
    model: "TestReport",
    field: "testId",
    startAt: 1, // The starting test ID
    incrementBy: 1 // The increment value for each new test
});

const kidneyTestReportSchema = new mongoose.Schema({
    ...testReportSchema.obj,
    blood_pressure: {
        type: String,
        required: true
    },
    specific_gravity: {
        type: String,
        required: true
    },
    albumin: {
        type: String,
        required: true
    },
    sugar: {
        type: String,
        required: true
    },
    red_blood_cells: {
        type: String,
        required: true
    },
    pus_cell: {
        type: String,
        required: true
    },
    pus_cell_clumps: {
        type: String,
        required: true
    },
    bacteria: {
        type: String,
        required: true
    },
    blood_glucose_random: {
        type: String,
        required: true
    },
    blood_urea: {
        type: String,
        required: true
    },
    serum_creatinine: {
        type: String,
        required: true
    },
    sodium: {
        type: String,
        required: true
    },
    potassium: {
        type: String,
        required: true
    },
    haemoglobin: {
        type: String,
        required: true
    },
    packed_cell_volume: {
        type: String,
        required: true
    },
    white_blood_cell_count: {
        type: String,
        required: true
    },
    red_blood_cell_count: {
        type: String,
        required: true
    },
    hypertension: {
        type: String,
        required: true
    },
    diabetes_mellitus: {
        type: String,
        required: true
    },
    coronary_artery_disease: {
        type: String,
        required: true
    },
    appetite: {
        type: String,
        required: true
    },
    peda_edema: {
        type: String,
        required: true
    },
    anemia: {
        type: String,
        required: true
    },
    class_of_ckd: {
        type: String,
        required: true
    },
});

const TestReport = mongoose.model("TestReport", testReportSchema);
const KidneyTestReport = mongoose.model("KidneyTestReport", kidneyTestReportSchema);

export { TestReport };
export { KidneyTestReport };