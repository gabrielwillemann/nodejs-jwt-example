let secretKey = 'my-secret-key';

let app = require('express')();
let bodyParser = require('body-parser');

let jwt = require('jsonwebtoken');
let jwtMiddleware = require('express-jwt')({
  secret: 'my-secret-key'
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

app.post('/login', (req, res, next) => {
  if ((req.body.user == 'john') && (req.body.password == '123456')) { // DANGER: Don't use this in production software
    res.setHeader('Content-Type', 'application/json');
    res.send({
      token: tokenGenerate()
    });
  } else {
    res.sendStatus(401);
  }
});

app.get('/cars', jwtMiddleware, (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send([{
    id: 1,
    name: 'Ferrari'
  }, {
    id: 2,
    name: 'Mercedes'
  }]);
});

function tokenGenerate() {
  let tomorow = new Date();
  tomorow.setDate(tomorow.getDate() + 1);
  return jwt.sign({
    exp: tomorow.getTime()
  }, secretKey)
}
