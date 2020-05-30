const initialState = {
  serviceResponse: null,
};

const mapelServiceReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SERVICE_RESPONSE_SUCCESS":
      return {
        ...state,
        serviceResponse: action.data.data,
      };
    default:
      return state;
  }
};

export default mapelServiceReducers;
