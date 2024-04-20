export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    // Determine the cookie name based on the user's roleconst cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
    const cookieName = user.role === 'Admin' ? 'adminToken' :
                       user.role === 'Patient' ? 'patientToken' :
                       user.role === 'Doctor' ? 'doctorToken' :
                       user.role === 'Lab_Assistant' ? 'labAssistantToken' :
                       user.role === 'Data_Analyst' ? 'dataAnalystToken' :
                       user.role === 'PHI' ? 'phiToken' :
                       'defaultToken';
    
  
    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        message,
        user,
        token,
      });
  };