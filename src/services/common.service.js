import axios from "axios";
import config from "../config/config";

const get = (apiEndpoint) => {
  return axios
    .get(config.baseUrl + apiEndpoint)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const commonService = {
  get,
};
