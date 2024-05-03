import {
  CREATE_TAG_INITIAL,
  CREATE_TAG_REQUEST,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
} from "../actions/tags"; // Make sure the path is correct

export default function tags(
  state = {
    isFetching: false,
    tags: [],
  },
  action
) {
  switch (action.type) {
    case CREATE_TAG_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_TAG_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_TAG_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: "Tag created successfully",
      });
    case CREATE_TAG_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:
          "Due to security reasons tag creation is closed in demo version. Please setup locally to test",
      });
    case FETCH_TAGS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_TAGS_SUCCESS:
      if (action.tags.length) {
        return Object.assign({}, state, {
          isFetching: false,
          tags: action.tags,
        });
      } else {
        return Object.assign({}, state, {
          isFetching: false,
        });
      }
    case FETCH_TAGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: "Something wrong happened. Please come back later",
      });
    default:
      return state;
  }
}
