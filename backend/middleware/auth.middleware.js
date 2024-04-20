import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRETKEY;

const isAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
      }

      req.userId = decoded.id;
      next();
    });
  },
};

export default isAuth;