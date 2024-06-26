import { combineReducers } from "redux";
import auth from "./auth";
import runtime from "./runtime";
import navigation from "./navigation";
import articles from "./articles";
import tags from "./tags";
import user from "./user";

export default combineReducers({
  auth,
  runtime,
  navigation,
  articles,
  tags,
  user,
});
