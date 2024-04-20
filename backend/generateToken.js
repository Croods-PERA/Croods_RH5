import jwt from 'jsonwebtoken';

const payload = {
  id: 1234,
  name: 'John Doe'
};

const secretKey = 'MYSECRETKEYFORJWT';

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log(token);