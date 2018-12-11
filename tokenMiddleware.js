const jwt = require('jsonwebtoken');

function tokenMiddleware(req, app){

    return new Promise(function(resolve, reject) {
        // check body for the token
        var token = req.body['token'];
    
        // decode token
        if (token) {
    
            // verifies secret and checks if the token is expired
            jwt.verify(token, app.get('Secret'), (err, decoded) => {
                if (err) {
                    reject('invalid token' );
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    console.log(req.decoded);
                    resolve();
                }
            });
    
        } else {
            // if there is no token
            reject('No token provided.' );
    
        }
    });

}

module.exports = tokenMiddleware;
