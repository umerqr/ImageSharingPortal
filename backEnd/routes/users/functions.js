const userDataset = require(`./users.json`);
const userImageDataset = require(`./data.json`);
const imageDataset = require(`./availableData.json`);
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Users = require('./schema/users');
const DataAvailable = require('./schema/availableData');
const UserData = require('./schema/userData');
// const mongoose = require('mongoose');
const { userModel } = Users;
const { availableDataModel } = DataAvailable;
const { userDataModel } = UserData;
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
    userModel.findOne(
      { email: email, password: password },
      async (err, user) => {
        if (user) {
          await jwt.sign({ user: user }, `secretkey`, (err, token) => {
            responseObj = {
              status: 200,
              result: {
                token,
                userInfo: user,
              },
            };
            res.status(responseObj.status).json(responseObj.result);
          });
        } else {
          responseObj = {
            status: 404,
            result: {
              message: `not found`,
              err: err,
            },
          };
          res.status(responseObj.status).json(responseObj.result);
        }
      }
    );
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
const fetchAllUsers = async (req, res) => {
  let responseObj = {};
  try {
    const users = await userModel.find();
    const fetchDataSubFunction = () => {
      if (users) {
        responseObj = {
          status: 200,
          result: {
            allUsers: users,
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
    return fetchDataSubFunction();
  } catch (e) {
    responseObj = {
      status: 500,
      result: {
        message: `Error, unable to perform action, Server error.`,
      },
    };
    console.log(e, `error occured`);
  } finally {
    res.status(responseObj.status).json(responseObj.result);
  }
};
const registerNewUser = async (req, res) => {
  let responseObj = {};
  const postObj = req.body;
  const newUser = new userModel(postObj);
  try {
    await newUser.save();
    const fetchDataSubFunction = () => {
      if (newUser) {
        responseObj = {
          status: 201,
          result: {
            newUser,
          },
        };
      } else {
        responseObj = {
          status: 404,
          result: {
            message: `Unable to perform action.`,
          },
        };
      }
    };
    return fetchDataSubFunction();
  } catch (e) {
    responseObj = {
      status: 500,
      result: {
        message: `Error, unable to perform action, Server error.`,
      },
    };
    console.log(e, `error occured`);
  } finally {
    res.status(responseObj.status).json(responseObj.result);
  }
};
const addAvailableData = async (req, res) => {
  let responseObj = {};
  const postObj = req.body;
  const newData = new availableDataModel(postObj);
  try {
    await newData.save();
    const fetchDataSubFunction = () => {
      if (newData) {
        responseObj = {
          status: 201,
          result: {
            newData,
          },
        };
      } else {
        responseObj = {
          status: 404,
          result: {
            message: `Unable to perform action.`,
          },
        };
      }
    };
    return fetchDataSubFunction();
  } catch (e) {
    responseObj = {
      status: 500,
      result: {
        message: `Error, unable to perform action, Server error.`,
      },
    };
    console.log(e, `error occured`);
  } finally {
    res.status(responseObj.status).json(responseObj.result);
  }
};
const fetchData = async (req, res) => {
  let responseObj = {};
  try {
    const imageData = await availableDataModel.find();
    const { token } = req.headers;
    const fetchDataSubFunction = (authData) => {
      const {
        user: { email },
      } = authData;
      if (imageData) {
        userDataModel.findOne({ email: email }, async (err, dataFound) => {
          if (dataFound) {
            const filtedData = dataFound.filter((x) => {
              if (!imageData.some((y) => y.id === x.id)) {
                return x;
              }
            });
            responseObj = {
              status: 200,
              result: {
                token,
                userInfo: filtedData,
              },
            };
            res.status(responseObj.status).json(responseObj.result);
          } else {
            responseObj = {
              status: 200,
              result: {
                token,
                items: imageData,
              },
            };
            res.status(responseObj.status).json(responseObj.result);
          }
        });
      } else {
        console.log('did it come here?');
        responseObj = {
          status: 404,
          result: {
            message: `not found`,
            err: err,
          },
        };
        res.status(responseObj.status).json(responseObj.result);
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
  fetchAllUsers,
  registerNewUser,
  addAvailableData,
};
