import { commonService } from "../services";

const getmapelProvider = () => {
  const apiEndpoints =
    "/providers?include=locations,schedules.location&page[number]=1&page[size]=10s";
  return (dispatch) => {
    commonService.get(apiEndpoints).then((response) => {
      if (response.data) {
        dispatch(setProviderDetails(response.data));
      }
    });
  };
};

export function setProviderDetails(data) {
  return {
    type: "PROVIDER_RESPONSE_SUCCESS",
    data: data,
  };
}
export function filterProviderDetails(data) {
  return {
    type: "PROVIDER_SELECTED",
    key: data,
  };
}

export const mapelProviderAction = {
  getmapelProvider,
  filterProviderDetails,
};
