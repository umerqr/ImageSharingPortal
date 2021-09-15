import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const postUtil = (url, data) => axios.post(url, data);

const putUtil = (url, data) =>
  axios({
    method: `put`,
    url,
    data,
  });

const patchUtil = (url, data) =>
  axios({
    method: `patch`,
    url,
    data,
  });

const getUtil = (url, data = null) =>
  axios.get(url, {
    params: data,
  });

const deleteUtil = (url, data = null) =>
  axios.delete(url, {
    params: data,
  });

const deleteUtilWithBody = (url, data) =>
  axios({
    method: `delete`,
    url,
    data,
  });

export {
  postUtil,
  getUtil,
  putUtil,
  patchUtil,
  deleteUtil,
  deleteUtilWithBody,
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    let errorMsg = {};
    if (error.response && error.response.status === 401) {
      localStorage.clear();
    }
    if (
      error.response.status === 401 ||
      error.response.status === 400 ||
      error.response.status === 404 ||
      error.response.status === 500
    ) {
      errorMsg = {
        status: error.response.status,
        message: error.response.data.result.data,
      };
    }
    return errorMsg;
  }
);
