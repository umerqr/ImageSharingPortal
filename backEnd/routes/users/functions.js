const userDataset = require(`./users.json`);
const userImageDataset = require(`./data.json`);
const imageDataset = require(`./availableData.json`);
const jwt = require('jsonwebtoken');
const fs = require('fs');

const fetchUser = async (req, res) => {
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
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(`error occured`);
  }
  //   finally {
  //     res.json(responseObj.result);
  //   }
};
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['token'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader;
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

const fetchData = async (req, res) => {
  try {
    const imageData = imageDataset.items;
    const { token } = req.headers;
    jwt.verify(token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const {
          user: { email },
        } = authData;
        const userDataset = userImageDataset.find((x) => x.email === email)
          .items;

        const filtedData = imageData.filter((x) => {
          if (!userDataset.some((y) => y.id === x.id)) {
            return x;
          }
        });
        if (imageData) {
          res.json({
            items: filtedData,
          });
        }
      }
    });
  } catch (e) {
    console.log(`error occured`);
  }
};
const fetchUserData = async (req, res) => {
  try {
    const { token } = req.headers;
    jwt.verify(token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const imageData = userImageDataset.find(
          (x) => x.email === authData.user.email
        );
        if (imageData) {
          res.json({
            items: imageData.items,
          });
        } else {
          res.sendStatus(404);
        }
      }
    });
  } catch (e) {
    console.log(`error occured`);
  }
};
const fetchUserInfo = async (req, res) => {
  const { token } = req.headers;
  try {
    jwt.verify(token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          userInfo: authData.user,
          token,
        });
      }
    });
  } catch (e) {
    console.log(`error occured`);
  }
};

const postUserImage = async (req, res) => {
  const { token } = req.headers;
  const { body } = req;
  const { items } = body;
  try {
    jwt.verify(token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (items) {
          fs.readFile(
            './routes/users/data.json',
            'utf8',
            function readFileCallback(err, data) {
              if (err) {
              } else {
                let obj = JSON.parse(data); //now it an object
                obj.find((x) => x.email === authData.user.email).items = items; //add some data
                let json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('./routes/users/data.json', json, function (err) {
                  if (err) throw err;
                }); // write it back
              }
            }
          );
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      }
    });
  } catch (e) {
    console.log(`error occured`);
  }
};

module.exports = {
  fetchUser,
  verifyToken,
  fetchData,
  fetchUserInfo,
  fetchUserData,
  postUserImage,
};
