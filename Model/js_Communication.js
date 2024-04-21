const { spawn } = require('child_process');

// Path to your Python script
const pythonScriptPath = "Model\Communication.py";

// Data to be sent to the Python script
const inputData = 'Hello, Python!';

// Spawn a new Python process
const pythonProcess = spawn('python', [pythonScriptPath]);

// Send data to the Python script
pythonProcess.stdin.write(inputData);
pythonProcess.stdin.end();

// Listen for output from the Python script
pythonProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log('Output from Python:', output);
});

// Listen for errors from the Python script
pythonProcess.stderr.on('data', (data) => {
    const error = data.toString();
    console.error('Error from Python:', error);
});

// Handle Python process exit
pythonProcess.on('close', (code) => {
    console.log('Python process exited with code:', code);
});