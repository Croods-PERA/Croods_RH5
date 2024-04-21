#from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Load the saved ML model
model = joblib.load("Model\Kidney_Prediction_Model.joblib")
x = pd.DataFrame([60.0,90.0,1.015,3.0,0.0,0,0,0,0,74.0,25.0,1.1,142.0,3.2,12.2,39,7800,4.4,1,1,0,1,1,0]).transpose()
print(model.predict(x))