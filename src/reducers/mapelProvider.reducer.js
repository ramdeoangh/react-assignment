const initialState = {
  providerResponse: null,
  filterResponse: null,
};

//parsing data for services
const parseData = (dt) => {
  let tp = [];

  if (dt === null) return tp;

  if (dt.included !== null) {
    const c = dt.included.filter((t) => {
      return t.type === "schedules" && t.attributes.service;
    });

    c.forEach((element) => {
      let temp = { s: "", pid: [], pnm: [] };
      if (tp.some((el) => el.s === element.attributes.service)) {
        let d = tp.filter((item) => item.s === element.attributes.service);
        d[0].pid.push(element.id);
      } else {
        temp.s = element.attributes.service;
        temp.pid.push(element.id);
        tp.push(temp);
      }
    });

    tp.forEach((t) => {
      t.pid.forEach((pid) => {
        dt.data.forEach((m) => {
          if (m.relationships.schedules.data.length > 0) {
            if (
              m.relationships.schedules.data.filter((item) => item.id === pid)
                .length > 0
            ) {
              t.pnm.push(m.attributes.name);
            }
          }
        });
      });
    });
  }

  return tp;
};

//it will return filter response when we select the services
const filterData = (state, data) => {
  return state.providerResponse.filter((d) => {
    return d.s === data;
  });
};

const mapelProviderReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case "PROVIDER_RESPONSE_SUCCESS":
      return {
        ...state,
        providerResponse: parseData(action.data),
      };
    case "PROVIDER_SELECTED":
      return {
        ...state,
        filterResponse: filterData(state, action.key),
      };
    default:
      return state;
  }
};

export default mapelProviderReducers;
