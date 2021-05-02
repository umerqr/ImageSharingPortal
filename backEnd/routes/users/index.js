const functions = require(`./functions`);

const RESOURCE = `users`;

module.exports = (api) => {
  api.post(`/login/`, functions.fetchUser);
  api.get(`/imageData/`, functions.verifyToken, functions.fetchData);
  api.get(`/fetchUserInfo/`, functions.verifyToken, functions.fetchUserInfo);
  api.get(`/fetchUserData/`, functions.verifyToken, functions.fetchUserData);
  api.post(`/postUserImage/`, functions.verifyToken, functions.postUserImage);
};
