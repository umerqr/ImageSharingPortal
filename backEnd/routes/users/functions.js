const userDataset = require(`./users.json`);
const userImageDataset = require(`./data.json`);
const imageDataset = require(`./availableData.json`);
const jwt = require('jsonwebtoken');
const fs = require('fs');

const middleWareForVerifyToken = (incomingToken, incomingFunction) => {
  jwt.verify(incomingToken, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      incomingFunction(authData);
    }
  });
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

const fetchUser = async (req, res) => {
  let responseObj = {};
  try {
    const { body } = req;
    const { email, password } = body;
    const users = userDataset.find(
      (x) => x.email === email && x.password === password
    );

    if (users) {
      await jwt.sign({ user: users }, `secretkey`, (err, token) => {
        responseObj = {
          status: 200,
          result: {
            token,
            userInfo: users,
          },
        };
        res.status(responseObj.status).json(responseObj.result);
      });
    } else {
      responseObj = {
        status: 404,
        result: {
          message: `not found`,
        },
      };
      res.status(responseObj.status).json(responseObj.result);
    }
  } catch (e) {
    responseObj = {
      status: 404,
      result: {
        message: `not found`,
      },
    };
    res.status(responseObj.status).json(responseObj.result);
  }
};

const fetchData = async (req, res) => {
  let responseObj = {};
  try {
    const imageData = imageDataset.items;
    const { token } = req.headers;
    const fetchDataSubFunction = (authData) => {
      const {
        user: { email },
      } = authData;
      const userDataset = userImageDataset.find((x) => x.email === email).items;
      const filtedData = imageData.filter((x) => {
        if (!userDataset.some((y) => y.id === x.id)) {
          return x;
        }
      });
      if (imageData) {
        responseObj = {
          status: 200,
          result: {
            items: filtedData,
          },
        };
      } else {
        responseObj = {
          status: 404,
          result: {
            message: `No data found.`,
          },
        };
      }
    };
    return middleWareForVerifyToken(token, fetchDataSubFunction);
  } catch (e) {
    responseObj = {
      status: 500,
      result: {
        message: `Error, unable to perform action, Server error.`,
      },
    };
    console.log(`error occured`);
  } finally {
    res.status(responseObj.status).json(responseObj.result);
  }
};
const fetchUserData = async (req, res) => {
  try {
    const { token } = req.headers;
    const fetchUserDataSubFunction = (authData) => {
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
    };
    return middleWareForVerifyToken(token, fetchUserDataSubFunction);
  } catch (e) {
    responseObj = {
      status: 500,
      result: {
        message: `Error, unable to perform action, Server error.`,
      },
    };
    console.log(`error occured`);
  }
};
const fetchUserInfo = async (req, res) => {
  let responseObj = {};
  const { token } = req.headers;
  try {
    const fetchUserInfoSubFunction = (authData) => {
      responseObj = {
        status: 200,
        result: {
          userInfo: authData.user,
          token,
        },
      };
    };
    return middleWareForVerifyToken(token, fetchUserInfoSubFunction);
  } catch (e) {
    responseObj = {
      status: 500,
      result: {
        message: `Error, unable to perform action, Server error.`,
      },
    };
    console.log(`error occured`);
  } finally {
    res.status(responseObj.status).json(responseObj.result);
  }
};

const postUserImage = async (req, res) => {
  let responseObj = {};
  const { token } = req.headers;
  const { body } = req;
  const { items } = body;
  try {
    const postUserImageSubFunction = (authData) => {
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
        responseObj = {
          status: 200,
          result: {
            message: `Successfully updated.`,
          },
        };
      } else {
        responseObj = {
          status: 500,
          result: {
            message: `Error, unable to perform action, Server error.`,
          },
        };
      }
    };
    return middleWareForVerifyToken(token, postUserImageSubFunction);
  } catch (e) {
    responseObj = {
      status: 500,
      result: {
        message: `Error, unable to perform action, Server error.`,
      },
    };
    console.log(`error occured`);
  } finally {
    res.status(responseObj.status).json(responseObj.result);
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
