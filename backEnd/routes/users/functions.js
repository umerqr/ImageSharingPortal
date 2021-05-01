const userDataset = require(`./users.json`);
const imageDataset = require(`./data.json`);
const jwt = require('jsonwebtoken');
const fetchUser = async (req, res) => {
  let responseObj = {};
  try {
    const { body } = req;
    const { email, password } = body;
    const users = userDataset.find(
      (x) => x.email === email && x.password === password
    );

    if (users) {
      jwt.sign({ user: users }, `secretkey`, (err, token) => {
        return res.json({
          token,
          userInfo: users,
        });
      });
    }
  } catch (e) {
    console.log(`error occured`);
  }
  //   finally {
  //     res.json(responseObj.result);
  //   }
};
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

const fetchData = async (req, res) => {
  let responseObj = {};
  try {
    const { body } = req;
    const { email } = body;
    const imageData = imageDataset.find((x) => x.email === email);
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (imageData) {
          res.json({
            imageData,
          });
        }
      }
    });
  } catch (e) {
    console.log(`error occured`);
  }
  //   finally {
  //     res.json(responseObj.result);
  //   }
};
module.exports = {
  fetchUser,
  verifyToken,
  fetchData,
};
