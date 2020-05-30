import { commonService } from "../services";

const getService = () => {
  const apiEndpoints = "/services";
  return (dispatch) => {
    commonService.get(apiEndpoints).then((response) => {
      if (response.data) {
        dispatch(setServiceDetails(response.data));
      }
    });
  };
};

export function setServiceDetails(data) {
  return {
    type: "SERVICE_RESPONSE_SUCCESS",
    data: data,
  };
}

export const mapelServiceAction = {
  getService,
};
