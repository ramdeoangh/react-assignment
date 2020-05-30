import { combineReducers } from "redux";

import mapelProviderReducers from "./mapelProvider.reducer";
import mapelServiceReducers from "./mapelService.reducer";
const rootReducer = combineReducers({
  mapelProviderReducers,
  mapelServiceReducers,
});

export default rootReducer;
