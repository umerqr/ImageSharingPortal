const functions = require(`./functions`);

const RESOURCE = `users`;

module.exports = (api) => {
  api.post(`/login/`, functions.fetchUser);
  api.get(`/imageData/`, functions.verifyToken, functions.fetchData);
  api.get(`/fetchUserInfo/`, functions.verifyToken, functions.fetchUserInfo);
  api.get(`/fetchUserData/`, functions.verifyToken, functions.fetchUserData);
  api.get(`/fetchAllUsers/`, functions.fetchAllUsers);
  api.post(`/registerNewUser/`, functions.registerNewUser);
  api.post(`/addAvailableData/`, functions.addAvailableData);
  api.post(`/postUserImage/`, functions.verifyToken, functions.postUserImage);
};
