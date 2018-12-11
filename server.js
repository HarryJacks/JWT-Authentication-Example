const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    config = require('./server-config'),
    app = express();

const tokenMiddleware = require("./tokenMiddleware.js");

//set secret (for JWTs)
app.set('Secret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

// Anything under /api will now be protected
const ProtectedRoutes = express.Router();
app.use('/api', ProtectedRoutes);

// Adding Middleware for protected routes
ProtectedRoutes.use((req, res, next) => {
    tokenMiddleware(req, app)
        .then(function(value) {
            next();
        })
        .catch(error => {
            console.log('Error: ', error);
            res.send({"message": error});
        });
});

app.get('/', function (req, res) {
    res.send('App is running at http://localhost:3000/');
});

// Authenticate route (username and password needed)
app.post('/authenticate', (req, res) => {

    if (req.body.username === "Harry") {

        if (req.body.password === "12345") {
            //if eveything is okay let's create the token 

            const payload = {
                check: true
            };

            var token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 1440 // expires in 24 hours
            });

            res.json({
                message: 'authentication complete.',
                token: token
            });

        } else {
            res.json({ message: "Password is incorrect." })
        }

    } else {
        res.json({ message: "Username doesn't exist." })
    }

})

// Get Information Route (Needs token)
ProtectedRoutes.post('/getInformation',(req,res) => {
    let data = {
        information: [
            {
                id: 1,
                name: "Harry"
            },
            {
                id: 2,
                name: "Jacks"
            }
        ],
        message: "Successfully fetched data using token."
    }

    res.json(data);
});