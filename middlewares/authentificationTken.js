const jwt = require('jsonwebtoken');
secretKey="raja"
function verifierToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      jwt.verify(req.token, secretKey, (err, decoded) => {
        if (err) {
          return res.sendStatus(403); 
        }
        
        req.userId = decoded.userId;  
        req.userRole = decoded.role;  
  
        next();
      });
    } else {
      res.sendStatus(403); 
    }
      
    } 

    function autoriserAdmin(role){
      return (req, res, next) => {
        if (req.userRole === role || req.userRole === 'admin') {
          next();
        } else {
          res.status(403).json({ message: 'Insufficient permissions' });
        }
      };

    }
    /*
  function  autoriserUsers(role){
      return (req, res, next) => {
        if (req.userRole === role || req.userRole === 'user') {
          next();
        } else {
          res.status(403).json({ message: 'Insufficient permissions' });
        }
      };


    }
  */
  
 
  
  
  module.exports = { verifierToken,autoriserAdmin};
  
  