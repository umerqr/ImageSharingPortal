const functions = require(`./functions`);

const RESOURCE = `users`;

module.exports = (api) => {
  api.post(`/login/`, functions.fetchUser);
  api.get(`/imageData/`, functions.fetchData);
  api.get(`/fetchUserInfo/`, functions.fetchUserInfo);
  api.get(`/fetchUserData/`, functions.fetchUserData);
};
